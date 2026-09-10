"use client";

import { useEffect, useState } from "react";

type Stats = { today: number; yesterday: number; week: number; previousWeek: number; month: number; previousMonth: number; total: number };

function Eye() { return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" /></svg>; }

export default function VisitorBadge() {
  const [open, setOpen] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  useEffect(() => { if (!open || stats) return; fetch("/api/visits/summary").then((response) => response.ok ? response.json() : null).then(setStats).catch(() => {}); }, [open, stats]);
  const rows = stats ? [["Hari ini", stats.today], ["Kemarin", stats.yesterday], ["Minggu ini", stats.week], ["Minggu lalu", stats.previousWeek], ["Bulan ini", stats.month], ["Bulan lalu", stats.previousMonth]] : [];
  return <div className="fixed bottom-5 left-5 z-40"><div className={`mb-3 w-64 origin-bottom-left rounded-2xl border border-line bg-ink-soft/95 p-4 shadow-2xl backdrop-blur transition-all ${open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`} aria-hidden={!open}><div className="flex items-center justify-between border-b border-line pb-3"><span className="text-xs tracking-[0.18em] text-gold uppercase">Kunjungan</span><span className="text-xs text-muted">{stats ? "Live" : "Memuat…"}</span></div>{stats && <div className="mt-2">{rows.map(([label, value]) => <div key={label} className="flex justify-between border-b border-line/60 py-2 text-sm"><span className="text-muted">{label}</span><strong>{value}</strong></div>)}<div className="flex justify-between pt-3 text-sm font-semibold"><span>Total kunjungan</span><strong className="text-gold">{stats.total}</strong></div></div>}</div><button type="button" aria-expanded={open} aria-label={open ? "Tutup statistik kunjungan" : "Lihat statistik kunjungan"} onClick={() => setOpen((value) => !value)} className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/70 bg-ink-soft text-gold shadow-lg transition hover:bg-gold hover:text-ink"><Eye /></button></div>;
}
