"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { logout } from "@/app/admin/visitors/actions";
import type { VisitorSummary } from "@/lib/visitors";

export default function VisitorDashboard() {
  const [data, setData] = useState<VisitorSummary | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState("");
  const total = useRef<number | null>(null);
  const busy = useRef(false);
  const load = useCallback(async () => {
    if (busy.current) return;
    busy.current = true;
    setLoading(true);
    try {
      const response = await fetch("/api/admin/visitors", { cache: "no-store", signal: AbortSignal.timeout(10000) });
      if (response.status === 401) { window.location.reload(); return; }
      if (!response.ok) throw new Error("Koneksi database terganggu. Data akan dicoba lagi otomatis.");
      const next: VisitorSummary = await response.json();
      const added = total.current === null ? 0 : Math.max(0, next.total - total.current);
      if (added > 0) setNotice((count) => count + added);
      total.current = next.total;
      setData(next);
      setError("");
      setUpdated(new Date().toLocaleTimeString("id-ID", { timeZone: "Asia/Jakarta" }));
    } catch (err) { setError(err instanceof Error ? err.message : "Gagal memuat kunjungan."); }
    finally { busy.current = false; setLoading(false); }
  }, []);
  useEffect(() => {
    void load();
    const timer = setInterval(() => { if (document.visibilityState === "visible") void load(); }, 15000);
    const visible = () => { if (document.visibilityState === "visible") void load(); };
    document.addEventListener("visibilitychange", visible);
    return () => { clearInterval(timer); document.removeEventListener("visibilitychange", visible); };
  }, [load]);
  return <div className="mt-10 space-y-6">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <p className="text-sm text-muted">Pembaruan setiap 15 detik{updated && ` · Terakhir ${updated} WIB`}</p>
      <div className="flex gap-4"><button onClick={() => void load()} disabled={loading} className="text-sm text-gold disabled:opacity-50">{loading ? "Memuat…" : "Perbarui"}</button><form action={logout}><button className="text-sm text-muted">Keluar</button></form></div>
    </div>
    <div aria-live="polite" aria-atomic="true">{notice > 0 && <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gold/40 bg-gold/10 p-4 text-gold"><span>● {notice} kunjungan baru sejak dashboard dibuka</span><button onClick={() => setNotice(0)} className="text-sm underline">Tandai dibaca</button></div>}</div>
    {error && <p role="alert" className="rounded-xl border border-red-400/30 p-4 text-sm text-red-400">{error}{data && " Menampilkan data terakhir yang berhasil dimuat."}</p>}
    <div className="grid gap-4 sm:grid-cols-3">{[["Hari ini · WIB", data?.today], ["Total kunjungan", data?.total], ["Riwayat tersimpan", data?.visits.length]].map(([label, value]) => <div key={label} className="rounded-2xl border border-line bg-ink-soft p-6"><p className="text-sm text-muted">{label}</p><p className="mt-3 font-display text-4xl">{value ?? "—"}</p></div>)}</div>
    <div className="overflow-hidden rounded-2xl border border-line bg-ink-soft">
      <div className="border-b border-line p-6"><h2 className="font-display text-xl">Kunjungan terbaru</h2><p className="mt-2 text-sm text-muted">100 kunjungan terakhir · sekali per browser setiap 30 menit.</p></div>
      {!data ? <p className="p-8 text-muted">{error ? "Data belum tersedia." : "Memuat riwayat…"}</p> : data.visits.length === 0 ? <div className="p-10 text-center"><p>Belum ada kunjungan.</p><p className="mt-2 text-sm text-muted">Kunjungan akan muncul saat portfolio dibuka pengunjung. Browser admin yang sedang masuk tidak dihitung.</p></div> : <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-muted"><tr>{["Waktu (WIB)", "Halaman masuk", "Sumber", "Perangkat"].map((title) => <th key={title} scope="col" className="px-6 py-4 font-medium">{title}</th>)}</tr></thead><tbody>{data.visits.map((visit) => <tr key={visit.id} className="border-t border-line"><td className="whitespace-nowrap px-6 py-4 text-muted">{new Date(visit.at).toLocaleString("id-ID", { timeZone: "Asia/Jakarta", dateStyle: "medium", timeStyle: "short" })}</td><td className="max-w-xs break-all px-6 py-4 text-gold">{visit.path}</td><td className="max-w-xs break-all px-6 py-4">{visit.referrer}</td><td className="px-6 py-4 text-muted">{visit.device}</td></tr>)}</tbody></table></div>}
    </div>
    <p className="text-xs leading-relaxed text-muted">Hitungan kunjungan bukan jumlah orang unik. Nama dan IP tidak disimpan. Pemblokir pelacakan, browser tanpa penyimpanan lokal, dan bot dapat memengaruhi akurasi. Notifikasi muncul selama dashboard dibuka.</p>
  </div>;
}
