import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import Module, { createRequire } from 'node:module';
import ts from 'typescript';
import { NextRequest } from 'next/server.js';

const require = createRequire(import.meta.url);

function load(file, overrides = {}) {
  const filename = path.resolve(file);
  const mod = new Module(filename);
  mod.filename = filename;
  mod.require = (name) => overrides[name] ?? require(name);
  mod._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, filename);
  return mod.exports;
}

async function main() {
  process.env.VISITOR_ADMIN_PASSWORD = 'test-only-long-password';
  process.env.UPSTASH_REDIS_REST_URL = 'https://redis.example.invalid';
  process.env.UPSTASH_REDIS_REST_TOKEN = 'test-only-token';
  const visitors = load('src/lib/visitors.ts');
  const expires = String(Date.now() + 60000);
  const token = `${expires}.${visitors.sign(`admin:${expires}`)}`;
  assert.equal(visitors.validSession(token), true);
  assert.equal(visitors.validSession(`${token}x`), false);
  assert.equal(visitors.validSession(`${token}.extra`), false);
  assert.equal(visitors.validSession(`1.${visitors.sign('admin:1')}`), false);
  process.env.VISITOR_ADMIN_PASSWORD = 'changed-test-password';
  assert.equal(visitors.validSession(token), false);
  process.env.VISITOR_ADMIN_PASSWORD = 'test-only-long-password';

  let writes = 0;
  let recorded;
  const post = load('src/app/api/visits/route.ts', { '@/lib/visitors': {
    ...visitors, recordVisit: async (id, visit) => { writes++; recorded = visit; },
  } }).POST;
  const payload = { visitorId: '12345678-1234-1234-1234-123456789abc', path: '/projects', referrer: 'https://search.example/?private=secret' };
  const request = (body, headers = {}) => new NextRequest('https://portfolio.example/api/visits', {
    method: 'POST', headers: { origin: 'https://portfolio.example', 'content-type': 'application/json', 'user-agent': 'Mozilla/5.0 Mobile', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
  assert.equal((await post(request(payload))).status, 204);
  assert.equal(writes, 1);
  assert.equal(recorded.referrer, 'search.example');
  assert.equal(recorded.device, 'Mobile');
  assert.equal('ip' in recorded, false);
  assert.equal((await post(request(payload, { origin: 'https://attacker.example' }))).status, 403);
  assert.equal((await post(request(payload, { cookie: `portfolio-admin=${token}` }))).status, 204);
  assert.equal((await post(request(payload, { 'user-agent': 'Googlebot' }))).status, 204);
  for (const badPath of ['/admin/visitors', '/api/visits', '//external.example', '/?secret=1', '/bad\\path']) {
    assert.equal((await post(request({ ...payload, path: badPath }))).status, 400);
  }
  assert.equal((await post(request('not json'))).status, 400);
  assert.equal((await post(request('x'.repeat(2049)))).status, 413);
  assert.equal(writes, 1);
  const get = load('src/app/api/admin/visitors/route.ts', { '@/lib/visitors': {
    ...visitors, getSummary: async () => ({ total: 1, today: 1, visits: [recorded] }),
  } }).GET;
  assert.equal((await get(new NextRequest('https://portfolio.example/api/admin/visitors'))).status, 401);
  const result = await get(new NextRequest('https://portfolio.example/api/admin/visitors', { headers: { cookie: `portfolio-admin=${token}` } }));
  assert.equal(result.status, 200);
  assert.equal(result.headers.get('cache-control'), 'private, no-store');
  assert.equal((await result.json()).total, 1);
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  assert.equal(visitors.validSession(token), false);
  assert.equal((await post(request(payload))).status, 503);

  const script = fs.readFileSync('public/visit-tracker.js', 'utf8');
  const store = new Map();
  let sent = 0;
  const context = {
    location: { pathname: '/' }, navigator: {}, crypto: { randomUUID: () => payload.visitorId },
    document: { visibilityState: 'visible', referrer: '', removeEventListener() {} },
    localStorage: { getItem: (key) => store.get(key), setItem: (key, value) => store.set(key, value) },
    fetch: async () => { sent++; return { ok: true }; },
  };
  vm.runInNewContext(script, context);
  await new Promise(setImmediate);
  vm.runInNewContext(script, context);
  assert.equal(sent, 1, 'refresh should not send a second visit');
  store.set('portfolio-visit-at', String(Date.now() - 1800001));
  vm.runInNewContext(script, context);
  await new Promise(setImmediate);
  assert.equal(sent, 2, 'new 30-minute window should send');
  context.location.pathname = '/admin/visitors';
  store.clear();
  vm.runInNewContext(script, context);
  assert.equal(sent, 2, 'admin page should never track');
  console.log('Visitor checks passed: session security, private API, input limits, bot/admin exclusion, referrer privacy, disabled configuration, browser deduplication.');
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
