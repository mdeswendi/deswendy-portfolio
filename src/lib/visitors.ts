import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "portfolio-admin";
export const SESSION_SECONDS = 60 * 60 * 12;
const PREFIX = "portfolio:visitors:";

export type Visit = { id: string; path: string; referrer: string; device: string; at: string };
export type VisitorSummary = { total: number; today: number; visits: Visit[] };

export function configured() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN && (process.env.VISITOR_ADMIN_PASSWORD?.length ?? 0) >= 16);
}

export function sign(value: string) {
  const secret = process.env.VISITOR_ADMIN_PASSWORD;
  if (!secret || secret.length < 16) throw new Error("Visitor configuration missing");
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function equal(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function validSession(token?: string) {
  if (!configured() || !token) return false;
  const [expires, signature, extra] = token.split(".");
  return !extra && /^\d+$/.test(expires) && Number(expires) > Date.now() && equal(signature ?? "", sign(`admin:${expires}`));
}

export async function redis<T>(command: (string | number)[]): Promise<T> {
  const response = await fetch(process.env.UPSTASH_REDIS_REST_URL!, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error("Visitor storage unavailable");
  const data = await response.json();
  if (data.error) throw new Error("Visitor storage command failed");
  return data.result as T;
}

export function dayKey() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

// Deduplicate and write atomically, including across serverless instances.
export async function recordVisit(visitorId: string, visit: Visit) {
  return redis<number>(["EVAL", `
    if redis.call('EXISTS', KEYS[1]) == 1 then return 0 end
    redis.call('SET', KEYS[1], '1', 'EX', 1800)
    redis.call('INCR', KEYS[2])
    redis.call('INCR', KEYS[3])
    redis.call('EXPIRE', KEYS[3], 172800)
    redis.call('LPUSH', KEYS[4], ARGV[1])
    redis.call('LTRIM', KEYS[4], 0, 99)
    return 1
  `, 4, `${PREFIX}session:${sign(visitorId)}`, `${PREFIX}total`, `${PREFIX}day:${dayKey()}`, `${PREFIX}recent`, JSON.stringify(visit)]);
}

export async function getSummary(): Promise<VisitorSummary> {
  const result = await redis<[string | null, string | null, string[]]>(["EVAL", `
    return {redis.call('GET', KEYS[1]) or '0', redis.call('GET', KEYS[2]) or '0', redis.call('LRANGE', KEYS[3], 0, 99)}
  `, 3, `${PREFIX}total`, `${PREFIX}day:${dayKey()}`, `${PREFIX}recent`]);
  return { total: Number(result[0]), today: Number(result[1]), visits: result[2].map((item) => JSON.parse(item) as Visit) };
}

export async function allowLogin() {
  // Shared limit avoids trusting spoofable forwarded IP headers.
  const attempts = await redis<number>(["EVAL", "local n = redis.call('INCR', KEYS[1]); if n == 1 then redis.call('EXPIRE', KEYS[1], 300) end; return n", 1, `${PREFIX}login-attempts`]);
  return attempts <= 20;
}
