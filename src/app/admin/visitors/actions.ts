"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, SESSION_SECONDS, allowLogin, configured, equal, sign } from "@/lib/visitors";

export async function login(_previous: string, form: FormData) {
  if (!configured()) return "Konfigurasi dashboard belum lengkap.";
  try {
    if (!await allowLogin()) return "Terlalu banyak percobaan. Coba lagi dalam 5 menit.";
    const password = form.get("password");
    if (typeof password !== "string" || password.length > 1024 || !equal(sign(password), sign(process.env.VISITOR_ADMIN_PASSWORD!))) return "Password salah.";
    const expires = String(Date.now() + SESSION_SECONDS * 1000);
    (await cookies()).set(ADMIN_COOKIE, `${expires}.${sign(`admin:${expires}`)}`, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: SESSION_SECONDS });
  } catch { return "Tidak dapat masuk. Periksa koneksi database."; }
  redirect("/admin/visitors");
}

export async function logout() {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect("/admin/visitors");
}
