import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "portfolio-admin";
export const SESSION_SECONDS = 60 * 60 * 12;
const PREFIX = "portfolio:visitors:";

export type Visit = { id: string; path: string; referrer: string; device: string; at: string };
export type VisitorSummary = { total: number; today: number; visits: Visit[]; yesterday: number; week: number; previousWeek: number; month: number; previousMonth: number };

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

export function periodKeys(now = new Date()) {
  const local = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
  const day = new Date(local); day.setHours(0, 0, 0, 0);
  const format = (date: Date) => date.toISOString().slice(0, 10);
  const monday = new Date(day); monday.setDate(day.getDate() - ((day.getDay() + 6) % 7));
  const previousMonday = new Date(monday); previousMonday.setDate(monday.getDate() - 7);
  const month = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}`;
  const previous = new Date(day.getFullYear(), day.getMonth() - 1, 1);
  return { today: format(day), yesterday: format(new Date(day.getTime() - 86400000)), week: format(monday), previousWeek: format(previousMonday), month, previousMonth: `${previous.getFullYear()}-${String(previous.getMonth() + 1).padStart(2, "0")}` };
}

// Deduplicate and write atomically, including across serverless instances.
export async function recordVisit(visitorId: string, visit: Visit) {
  const periods = periodKeys();
  return redis<number>(["EVAL", `
    if redis.call('EXISTS', KEYS[1]) == 1 then return 0 end
    redis.call('SET', KEYS[1], '1', 'EX', 1800)
    redis.call('INCR', KEYS[2])
    for i = 2, 8 do redis.call('INCR', KEYS[i]); redis.call('EXPIRE', KEYS[i], 400 * 86400) end
    redis.call('LPUSH', KEYS[9], ARGV[1])
    redis.call('LTRIM', KEYS[9], 0, 99)
    return 1
  `, 9, `${PREFIX}session:${sign(visitorId)}`, `${PREFIX}total`, `${PREFIX}day:${periods.today}`, `${PREFIX}day:${periods.yesterday}`, `${PREFIX}week:${periods.week}`, `${PREFIX}week:${periods.previousWeek}`, `${PREFIX}month:${periods.month}`, `${PREFIX}month:${periods.previousMonth}`, `${PREFIX}recent`, JSON.stringify(visit)]);
}

export async function getSummary(): Promise<VisitorSummary> {
  const periods = periodKeys();
  const result = await redis<[string | null, string | null, string | null, string | null, string | null, string | null, string | null, string[]]>(["EVAL", `
    return {redis.call('GET', KEYS[1]) or '0', redis.call('GET', KEYS[2]) or '0', redis.call('GET', KEYS[3]) or '0', redis.call('GET', KEYS[4]) or '0', redis.call('GET', KEYS[5]) or '0', redis.call('GET', KEYS[6]) or '0', redis.call('GET', KEYS[7]) or '0', redis.call('LRANGE', KEYS[8], 0, 99)}
  `, 8, `${PREFIX}total`, `${PREFIX}day:${periods.today}`, `${PREFIX}day:${periods.yesterday}`, `${PREFIX}week:${periods.week}`, `${PREFIX}week:${periods.previousWeek}`, `${PREFIX}month:${periods.month}`, `${PREFIX}month:${periods.previousMonth}`, `${PREFIX}recent`]);
  return { total: Number(result[0]), today: Number(result[1]), yesterday: Number(result[2]), week: Number(result[3]), previousWeek: Number(result[4]), month: Number(result[5]), previousMonth: Number(result[6]), visits: result[7].map((item) => JSON.parse(item) as Visit) };
}

export async function allowLogin() {
  // Shared limit avoids trusting spoofable forwarded IP headers.
  const attempts = await redis<number>(["EVAL", "local n = redis.call('INCR', KEYS[1]); if n == 1 then redis.call('EXPIRE', KEYS[1], 300) end; return n", 1, `${PREFIX}login-attempts`]);
  return attempts <= 20;
}
