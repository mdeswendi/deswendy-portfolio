This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Dashboard kunjungan

Dashboard privat tersedia di `/admin/visitors`, dengan login password, total
kunjungan, hitungan hari ini (WIB), 100 kunjungan terakhir, dan notifikasi baru
yang diperbarui setiap 15 detik selama dashboard terbuka. Tidak mengirim push
notification ketika dashboard ditutup.

### Aktivasi

1. Buat database Redis di Upstash. Salin REST URL dan REST Token dari dashboard
   database: [panduan REST API](https://upstash.com/docs/redis/features/restapi).
2. Salin `.env.example` ke `.env.local`, lalu isi `UPSTASH_REDIS_REST_URL`,
   `UPSTASH_REDIS_REST_TOKEN` (token baca/tulis), dan `VISITOR_ADMIN_PASSWORD`
   dengan password acak unik minimal 16 karakter. Jangan commit kredensial.
3. Untuk hosting, isi tiga variabel yang sama di environment deployment,
   lalu deploy ulang. Gunakan database terpisah untuk pengujian/preview agar
   tidak mencampur data produksi. Dibutuhkan server Next.js; static export
   tidak mendukung API pencatatan dan login.
4. Buka `/admin/visitors` dan masuk. Sesi berlangsung 12 jam. Mengganti password
   membatalkan sesi lama. Tanpa konfigurasi lengkap, pencatatan nonaktif dan
   dashboard menampilkan informasi aktivasi.
5. Buka portfolio di browser lain/incognito, lalu perbarui dashboard. Untuk
   menguji notifikasi, biarkan dashboard terbuka sebelum kunjungan baru.

### Perilaku dan privasi

Jalankan `npm run test:visitors` untuk memeriksa sesi, proteksi API, validasi
input, dan deduplikasi browser secara lokal dengan storage pengujian tiruan.
Uji integrasi Redis dan notifikasi di browser setelah kredensial diisi.

- Script ringan berjalan setelah halaman siap, termasuk halaman CV Indonesia
  dan Inggris. Hanya halaman pertama per jendela 30 menit yang dicatat.
- ID acak di localStorage membedakan browser; deduplikasi di Redis berlaku
  lintas instance server. Ini hitungan kunjungan, bukan orang unik atau semua
  pageview. Menghapus localStorage atau memakai browser berbeda dihitung lagi.
- Nama, IP, query string, dan referrer lengkap tidak disimpan. Riwayat berisi
  waktu, pathname, hostname sumber, dan kategori perangkat dari user-agent.
  Hanya 100 catatan terakhir disimpan; total kumulatif tetap dipertahankan.
- Browser admin yang login, halaman admin/API, serta user-agent bot umum
  diabaikan. Pemblokir script/storage dan kunjungan dengan JavaScript mati
  tidak dihitung. Pendeteksian bot tidak menjamin semua bot tersaring.
- API menolak origin berbeda dan body berlebihan. Endpoint pengumpulan
  bersifat publik; data adalah analitik indikatif, bukan audit terverifikasi.
  Terapkan rate limit di hosting jika menerima trafik otomatis berlebihan.
- Login dibatasi 20 percobaan per 5 menit secara global menggunakan Redis.
  Kegagalan database tidak menghalangi pengunjung membuka portfolio.
- Polling hanya aktif saat tab terlihat. Biaya/kuota Redis mengikuti pemakaian.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
