import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, getSummary, validSession } from "@/lib/visitors";

export async function GET(request: NextRequest) {
  const headers = { "Cache-Control": "private, no-store" };
  if (!validSession(request.cookies.get(ADMIN_COOKIE)?.value)) return NextResponse.json({ error: "Silakan masuk kembali." }, { status: 401, headers });
  try { return NextResponse.json(await getSummary(), { headers }); }
  catch { return NextResponse.json({ error: "Data kunjungan belum dapat dimuat. Periksa koneksi database." }, { status: 503, headers }); }
}
