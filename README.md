# 🌱 LokiTalk

**Ngobrolin Tani, Ternak, dan Ikan. Satu Forum, Banyak Solusi.** 🌱🐄🐟

Forum tanya jawab (ala StackOverflow) untuk pertanian, peternakan, dan perikanan.

**Teknologi:** SvelteKit 2 (Svelte 5) · Supabase (Auth, Postgres, Storage) · Vercel

---

## Fitur

- Daftar & masuk dengan **email + password** (Supabase Auth)
- **5 forum**, masing-masing punya panduan/tips sendiri + ruang tanya jawab
- Posting pertanyaan: **judul, deskripsi, foto (opsional)**
- Menjawab pertanyaan, **suka** pertanyaan, **tandai jawaban terbaik** (oleh penanya)
- **Hapus** pertanyaan (beserta fotonya) dan hapus jawaban milik sendiri
- Pencarian, urut terbaru / terpopuler / belum terjawab
- Dashboard: statistik, tips harian, pertanyaan terbaru, topik ramai

---

## Langkah 1 - Siapkan Supabase

1. Buat akun & project baru di <https://supabase.com>.
2. Buka **SQL Editor → New query**, salin seluruh isi `supabase/schema.sql`, lalu **Run**.
   Ini membuat tabel, aturan keamanan (RLS), trigger profil, dan bucket foto `question-images`.
3. Buka **Project Settings → API**, catat:
   - **Project URL** → `PUBLIC_SUPABASE_URL`
   - **anon public key** → `PUBLIC_SUPABASE_ANON_KEY`
4. (Disarankan saat uji coba) **Authentication → Providers → Email**: matikan *Confirm email*
   agar pendaftar langsung bisa masuk. Jika dibiarkan aktif, pengguna harus klik tautan di email dulu.

## Langkah 2 - Coba di komputer (opsional)

```bash
cp .env.example .env      # isi dengan URL & anon key Supabase
npm install
npm run dev
```

Buka <http://localhost:5173>.

## Langkah 3 - Deploy ke Vercel

> Vercel **tidak menerima upload file ZIP langsung** di dashboard. Ekstrak dulu ZIP ini, lalu pilih salah satu cara berikut.

### Cara A - Lewat GitHub (paling mudah)

1. Ekstrak ZIP, buat repository baru di GitHub, lalu upload/push seluruh isi folder `lokitalk`.
2. Di <https://vercel.com/new>, klik **Import** pada repository tadi.
3. Framework akan terdeteksi otomatis sebagai **SvelteKit**. Biarkan pengaturan build default.
4. Buka **Environment Variables**, tambahkan:

   | Nama | Nilai |
   |---|---|
   | `PUBLIC_SUPABASE_URL` | Project URL Supabase |
   | `PUBLIC_SUPABASE_ANON_KEY` | anon public key Supabase |

5. Klik **Deploy**.

### Cara B - Lewat Vercel CLI (tanpa GitHub)

```bash
npm i -g vercel
cd lokitalk
vercel            # ikuti pertanyaan, lalu tambahkan env di dashboard
vercel env add PUBLIC_SUPABASE_URL
vercel env add PUBLIC_SUPABASE_ANON_KEY
vercel --prod
```

## Langkah 4 - Atur URL di Supabase

Setelah dapat domain Vercel (misalnya `https://lokitalk.vercel.app`):

1. Supabase → **Authentication → URL Configuration**
2. **Site URL**: isi domain Vercel kamu.
3. **Redirect URLs**: tambahkan `https://lokitalk.vercel.app/**` (dan `http://localhost:5173/**` untuk lokal).

Bila *Confirm email* aktif, ubah template **Confirm signup** di *Authentication → Email Templates* agar tautannya:

```
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email
```

---

## Memasang foto sendiri

Ilustrasi vektor sudah tampil di tiap forum. Untuk mengganti dengan **foto asli**, taruh file JPG di folder `static/photos/` dengan nama sesuai forum:

```
static/photos/tani.jpg
static/photos/ternak.jpg
static/photos/ikan.jpg
static/photos/ramah-lingkungan.jpg
static/photos/tanya-jawab.jpg
```

Foto otomatis muncul di kartu forum, banner forum, dan dashboard. Jika file tidak ada, ilustrasi tetap dipakai. Disarankan foto lanskap ±1200×800 px dan di bawah 300 KB.

## Mengubah konten tips per forum

Semua teks forum (nama, deskripsi, tips, topik) ada di `src/lib/categories.js`.

## Catatan

- Foto pertanyaan dibatasi **4 MB** (batas ukuran request di Vercel ±4,5 MB).
- Keamanan data diatur lewat **Row Level Security**: semua orang bisa membaca, tetapi hanya pemilik yang bisa menghapus/mengubah datanya.
- Kunci `anon` memang boleh publik. **Jangan** pernah memakai `service_role` key di proyek ini.

## Struktur proyek

```
src/
  hooks.server.js          Koneksi Supabase + sesi login
  lib/categories.js        Data & tips 5 forum
  lib/components/          Scene (ilustrasi), QuestionCard, AuthShell
  routes/
    +page.svelte           Dashboard
    forum/[slug]           Halaman forum + panduan + tanya jawab
    tanya/baru             Form pertanyaan (+ foto)
    tanya/[id]             Detail, jawaban, suka, hapus
    cari                   Pencarian
    login, daftar, logout  Otentikasi
static/images/             Maskot Loki + logo LokiTalk
supabase/schema.sql        Skema database & storage
```
