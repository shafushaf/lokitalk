-- =====================================================================
-- LokiTalk: SCHEMA LENGKAP (reset + buat ulang)
-- Cara pakai: Supabase > SQL Editor > New query > tempel semua > Run
-- PERINGATAN: baris "drop table" di bawah MENGHAPUS semua pertanyaan
-- dan jawaban yang sudah ada. Akun user (auth) tidak dihapus.
-- =====================================================================

-- 1. Bersihkan tabel lama
drop table if exists public.answers cascade;
drop table if exists public.questions cascade;
drop table if exists public.profiles cascade;

-- 2. Tabel
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null,
  display_name text,
  created_at timestamptz not null default now()
);

create table public.questions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  category text not null,               -- bertani, peternakan, perikanan, ramah-lingkungan, tanya-jawab
  title text not null check (char_length(title) between 5 and 200),
  body text not null check (char_length(body) between 5 and 5000),
  image_path text,                      -- dipakai kode LokiTalk
  image_url text,                       -- cadangan jika kode memakai nama ini
  created_at timestamptz not null default now()
);

create table public.answers (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 3000),
  created_at timestamptz not null default now()
);

create index questions_category_idx on public.questions (category, created_at desc);
create index answers_question_idx on public.answers (question_id, created_at);

-- 3. Profil otomatis saat user mendaftar
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data->>'username',''), split_part(new.email,'@',1)),
    coalesce(nullif(new.raw_user_meta_data->>'username',''), split_part(new.email,'@',1))
  )
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Isi profil untuk user yang SUDAH terdaftar sebelumnya
insert into public.profiles (id, username, display_name)
select id,
       coalesce(nullif(raw_user_meta_data->>'username',''), split_part(email,'@',1)),
       coalesce(nullif(raw_user_meta_data->>'username',''), split_part(email,'@',1))
from auth.users
on conflict (id) do nothing;

-- 4. Row Level Security
alter table public.profiles  enable row level security;
alter table public.questions enable row level security;
alter table public.answers   enable row level security;

create policy "profiles dibaca semua" on public.profiles for select using (true);
create policy "profil sendiri bisa diubah" on public.profiles for update using (auth.uid() = id);

create policy "pertanyaan dibaca semua" on public.questions for select using (true);
create policy "user membuat pertanyaan" on public.questions for insert with check (auth.uid() = user_id);
create policy "user hapus pertanyaan sendiri" on public.questions for delete using (auth.uid() = user_id);

create policy "jawaban dibaca semua" on public.answers for select using (true);
create policy "user membuat jawaban" on public.answers for insert with check (auth.uid() = user_id);
create policy "user hapus jawaban sendiri" on public.answers for delete using (auth.uid() = user_id);

-- 5. Storage foto (maks 3 MB, hanya gambar)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('question-images', 'question-images', true, 3145728, array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do update set public = true, file_size_limit = 3145728,
  allowed_mime_types = array['image/jpeg','image/png','image/webp','image/gif'];

drop policy if exists "foto pertanyaan dibaca semua" on storage.objects;
drop policy if exists "user upload foto ke foldernya" on storage.objects;
drop policy if exists "user hapus foto miliknya" on storage.objects;

create policy "foto pertanyaan dibaca semua" on storage.objects for select using (bucket_id = 'question-images');
create policy "user upload foto ke foldernya" on storage.objects for insert to authenticated
  with check (bucket_id = 'question-images' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "user hapus foto miliknya" on storage.objects for delete to authenticated
  using (bucket_id = 'question-images' and (storage.foldername(name))[1] = auth.uid()::text);

-- 6. Muat ulang cache API Supabase
notify pgrst, 'reload schema';
