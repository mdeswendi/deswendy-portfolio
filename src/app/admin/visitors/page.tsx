import type { Metadata } from "next";
import { cookies } from "next/headers";
import VisitorLogin from "@/components/admin/visitor-login";
import VisitorDashboard from "@/components/admin/visitor-dashboard";
import { ADMIN_COOKIE, configured, validSession } from "@/lib/visitors";

export const metadata: Metadata = { title: "Kunjungan portfolio", robots: { index: false, follow: false } };

export default async function VisitorsPage() {
  const ready = configured();
  const authenticated = validSession((await cookies()).get(ADMIN_COOKIE)?.value);
  return <section lang="id" className="mx-auto w-full max-w-6xl px-6 py-14 lg:py-20">
    <p className="text-xs tracking-[0.2em] text-gold uppercase">Ruang admin</p>
    <h1 className="mt-4 font-display text-3xl font-semibold md:text-5xl">Kunjungan portfolio</h1>
    <p className="mt-4 max-w-2xl text-muted">Pantau kunjungan anonim, halaman pertama yang dibuka, dan sumber kunjungannya.</p>
    {!ready ? <div role="status" className="mt-8 rounded-2xl border border-line bg-ink-soft p-6">Dashboard belum diaktifkan. Lengkapi koneksi database dan password admin sesuai panduan README project.</div> : authenticated ? <VisitorDashboard /> : <VisitorLogin />}
  </section>;
}
