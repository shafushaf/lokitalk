# Progress LokiTalk

## Sudah dibuat
- [x] Setup SvelteKit + adapter Vercel + Supabase SSR (`hooks.server.js`)
- [x] Skema database, RLS, trigger profil otomatis, bucket storage (`supabase/schema.sql`)
- [x] Auth email + kata sandi: daftar, masuk, keluar
- [x] Beranda: hero dengan karakter Loki & logo, statistik, kartu 5 forum, galeri, pertanyaan terbaru
- [x] Halaman forum: panduan/tips + fakta khusus tiap forum, daftar pertanyaan, pencarian
- [x] Buat pertanyaan (judul, deskripsi, foto opsional + pratinjau)
- [x] Detail pertanyaan, kirim jawaban, hapus pertanyaan & jawaban milik sendiri
- [x] Desain tosca responsif, README deploy

## Catatan
- Kode belum dijalankan/diuji di lingkungan ini (tanpa akses internet untuk `npm install`); build pertama terjadi di Vercel.
- Galeri di beranda masih memakai ilustrasi emoji; foto asli bisa ditambahkan (lihat README).

## Ide berikutnya
- [ ] Foto asli di galeri & dashboard
- [ ] Vote/jawaban terbaik, edit postingan, halaman profil
- [ ] Paginasi, notifikasi, moderasi/laporan
