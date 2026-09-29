# 🌱 LokiTalk

**Ngobrolin Tani, Ternak, dan Ikan. Satu Forum, Banyak Solusi.**

Forum tanya jawab (mirip StackOverflow) untuk pertanian, peternakan, dan perikanan.
Stack: **SvelteKit** (frontend + server), **Supabase** (auth, database, storage), **Vercel** (hosting).

## Fitur
- Daftar & masuk dengan email + kata sandi (Supabase Auth)
- 5 forum, masing-masing punya panduan/tips dan ruang diskusi sendiri
- Buat pertanyaan: judul, deskripsi, foto opsional (maks 3 MB)
- Jawab pertanyaan; hapus pertanyaan/jawaban milik sendiri (foto ikut terhapus)
- Cari pertanyaan per forum, tampilan responsif

## Cara deploy

### 1. Siapkan Supabase
1. Buat akun di https://supabase.com lalu **New project**.
2. Buka **SQL Editor > New query**, tempel seluruh isi `supabase/schema.sql`, klik **Run**.
   Ini membuat tabel, aturan keamanan (RLS), dan bucket storage `question-images`.
3. Buka **Project Settings > API**, salin:
   - **Project URL** → `PUBLIC_SUPABASE_URL`
   - **anon public key** → `PUBLIC_SUPABASE_ANON_KEY`
4. Buka **Authentication > Providers > Email**. Untuk mencoba cepat, matikan **Confirm email**.
   Kalau tetap aktif, user harus klik link di email sebelum bisa masuk.

### 2. Upload ke Vercel
Vercel butuh repo Git (paling mudah) atau CLI:

**Lewat GitHub (disarankan)**
1. Ekstrak zip ini, lalu upload isinya ke repository GitHub baru (file `package.json` harus berada di root repo).
2. Di https://vercel.com klik **Add New > Project**, pilih repo tersebut.
3. Framework terdeteksi otomatis sebagai **SvelteKit**. Biarkan pengaturan build default.
4. Di **Environment Variables**, tambahkan:
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`
5. Klik **Deploy**.

**Lewat Vercel CLI**
```bash
npm i -g vercel
cd lokitalk
vercel        # ikuti petunjuk, lalu tambahkan env di dashboard
vercel --prod
```

### 3. Atur URL di Supabase
Setelah deploy, buka **Authentication > URL Configuration**:
- **Site URL**: `https://nama-projekmu.vercel.app`
- **Redirect URLs**: tambahkan `https://nama-projekmu.vercel.app/**`

## Jalankan lokal
```bash
cp .env.example .env    # isi kunci Supabase
npm install
npm run dev
```

## Keamanan
- Hanya **anon key** yang dipakai; jangan pernah memakai `service_role` key di proyek ini.
- Semua tabel dilindungi RLS: siapa saja boleh membaca, tapi hanya pemilik yang bisa menulis/menghapus datanya.
- Upload foto dibatasi tipe (JPG/PNG/WEBP/GIF), ukuran 3 MB, dan hanya ke folder milik user sendiri.
- Login memakai `auth.getUser()` yang memverifikasi token ke server Supabase.
- Batas body request Vercel sekitar 4,5 MB, jadi batas foto 3 MB sudah aman.

## Menambah foto galeri
Taruh foto di `static/images/galeri/` (mis. `sawah.jpg`), lalu di `src/routes/+page.svelte` ganti isi tile galeri dengan
`<img src="/images/galeri/sawah.jpg" alt="Sawah" />`.

## Struktur
```
src/hooks.server.js        klien Supabase per-request (cookie)
src/lib/categories.js      data forum + panduan tiap forum
src/routes/                beranda, forum/[slug], q/[id], tanya/baru, login, register, logout
supabase/schema.sql        tabel, RLS, trigger profil, storage
static/images/             karakter Loki & logo LokiTalk
```
