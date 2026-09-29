# Progress LokiTalk

Terakhir diperbarui: 29 September 2026

## Sudah dibuat

### Fondasi
- [x] Proyek SvelteKit 2 + Svelte 5, adapter Vercel
- [x] Koneksi Supabase sisi server (`@supabase/ssr`), sesi lewat cookie
- [x] Skema database: `profiles`, `questions`, `answers`, `votes`
- [x] Row Level Security di semua tabel
- [x] Bucket storage `question-images` (publik, maks 4 MB, hanya gambar) + policy per pengguna
- [x] Trigger otomatis membuat profil saat pendaftaran

### Fitur
- [x] Daftar (nama tampilan, email, password), masuk, keluar
- [x] Halaman konfirmasi email `/auth/confirm`
- [x] 5 forum: Tani, Ternak, Ikan, Ramah Lingkungan, Tanya Jawab
- [x] Panduan/tips khusus di tiap forum (accordion) + topik populer
- [x] Buat pertanyaan: judul, deskripsi, foto opsional (dengan pratinjau)
- [x] Jawab pertanyaan
- [x] Suka pertanyaan, tandai jawaban terbaik (hanya penanya)
- [x] Hapus pertanyaan (foto di storage ikut terhapus) dan hapus jawaban sendiri
- [x] Pencarian + urut terbaru / terpopuler / belum terjawab
- [x] Pertanyaan terkait di halaman detail

### Tampilan
- [x] Tema hijau tosca, font Bricolage Grotesque + Figtree
- [x] Dashboard: hero dengan maskot Loki, statistik, kartu forum, tips harian, pertanyaan terbaru, topik ramai, ajakan bergabung
- [x] Logo LokiTalk di navbar, footer, dan halaman login/daftar
- [x] Maskot Loki di hero, banner forum, form tanya, halaman kosong, login, error 404
- [x] Ilustrasi vektor per forum (tani, ternak, ikan, ramah lingkungan, tanya jawab) dengan opsi foto asli di `static/photos/`
- [x] Responsif untuk HP dan mendukung `prefers-reduced-motion`

### Dokumentasi
- [x] README cara setup Supabase dan deploy Vercel
- [x] `supabase/schema.sql`

## Belum diuji
- [ ] Build dan uji langsung dengan project Supabase asli (dibuat tanpa akses internet, jadi belum pernah dijalankan). Jika ada error saat `npm run build`, kirim pesan errornya untuk diperbaiki.

## Ide pengembangan berikutnya
- [ ] Halaman profil pengguna dan ganti nama tampilan
- [ ] Edit pertanyaan dan jawaban
- [ ] Komentar bertingkat / balasan jawaban
- [ ] Lebih dari satu foto per pertanyaan
- [ ] Tag per pertanyaan dan halaman tag
- [ ] Notifikasi saat pertanyaan dijawab
- [ ] Lapor konten dan moderasi admin
- [ ] Reset password lewat email
- [ ] Foto asli untuk tiap forum (lihat README)
