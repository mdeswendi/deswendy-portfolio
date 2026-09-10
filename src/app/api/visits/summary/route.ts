import { NextResponse } from "next/server";
import { configured, getSummary } from "@/lib/visitors";

export async function GET() {
  if (!configured()) return NextResponse.json({ error: "Visitor analytics is not configured." }, { status: 503 });
  try { const data = await getSummary(); return NextResponse.json({ today: data.today, yesterday: data.yesterday, week: data.week, previousWeek: data.previousWeek, month: data.month, previousMonth: data.previousMonth, total: data.total }, { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } }); }
  catch { return NextResponse.json({ error: "Visitor analytics unavailable." }, { status: 503 }); }
}
