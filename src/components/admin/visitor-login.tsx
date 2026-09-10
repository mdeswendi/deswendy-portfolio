"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/visitors/actions";

export default function VisitorLogin() {
  const [error, action, pending] = useActionState(login, "");
  return <form action={action} className="mt-8 max-w-md space-y-5 rounded-2xl border border-line bg-ink-soft p-6">
    <label htmlFor="admin-password" className="block text-sm">Password admin</label>
    <input id="admin-password" name="password" type="password" autoComplete="current-password" required maxLength={1024} className="w-full rounded-lg border border-line bg-ink px-4 py-3" />
    {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
    <button disabled={pending} className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-ink disabled:opacity-50">{pending ? "Memeriksa…" : "Masuk dashboard"}</button>
  </form>;
}
