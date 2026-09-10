import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, configured, recordVisit, validSession } from "@/lib/visitors";

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) return new NextResponse(null, { status: 403 });
  if (!configured()) return new NextResponse(null, { status: 503 });
  const agent = request.headers.get("user-agent") ?? "";
  if (validSession(request.cookies.get(ADMIN_COOKIE)?.value) || /bot|crawler|spider|headless|preview/i.test(agent)) return new NextResponse(null, { status: 204 });
  if (!request.headers.get("content-type")?.startsWith("application/json")) return new NextResponse(null, { status: 415 });
  try {
    // Bound the streamed body too; Content-Length is not required or trusted.
    const reader = request.body?.getReader();
    if (!reader) return new NextResponse(null, { status: 400 });
    let text = "";
    let size = 0;
    const decoder = new TextDecoder();
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 2048) { await reader.cancel(); return new NextResponse(null, { status: 413 }); }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
    const body = JSON.parse(text);
    if (!body || typeof body.path !== "string" || !/^\/(?!\/)[^?#\s\\]*$/.test(body.path) || body.path.length > 300 || /^\/(admin|api)(\/|$)/.test(body.path) || typeof body.visitorId !== "string" || !/^[a-f0-9-]{36}$/i.test(body.visitorId)) return new NextResponse(null, { status: 400 });
    let referrer = "Langsung";
    if (typeof body.referrer === "string" && body.referrer) {
      try { const url = new URL(body.referrer); if (/^https?:$/.test(url.protocol)) referrer = url.hostname.slice(0, 200); } catch { /* Ignore invalid referrers. */ }
    }
    await recordVisit(body.visitorId, { id: randomUUID(), path: body.path, referrer, device: /ipad|tablet/i.test(agent) ? "Tablet" : /mobi|android|iphone/i.test(agent) ? "Mobile" : "Desktop", at: new Date().toISOString() });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse(null, { status: error instanceof SyntaxError ? 400 : 503 });
  }
}
