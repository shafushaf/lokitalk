-- =====================================================
-- LokiTalk - skema database Supabase
-- Jalankan seluruh isi file ini di Supabase > SQL Editor
-- =====================================================

-- 1. PROFIL PENGGUNA ---------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'username'), ''), split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. PERTANYAAN --------------------------------------
create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  category text not null check (category in ('tani','ternak','ikan','ramah-lingkungan','tanya-jawab')),
  title text not null check (char_length(title) between 8 and 150),
  body text not null check (char_length(body) between 10 and 5000),
  image_url text,
  image_path text,
  accepted_answer_id uuid,
  created_at timestamptz not null default now()
);
create index if not exists questions_category_idx on public.questions (category, created_at desc);
create index if not exists questions_created_idx on public.questions (created_at desc);

-- 3. JAWABAN -----------------------------------------
create table if not exists public.answers (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  body text not null check (char_length(body) between 2 and 3000),
  created_at timestamptz not null default now()
);
create index if not exists answers_question_idx on public.answers (question_id, created_at);

-- 4. VOTE (suka pertanyaan) --------------------------
create table if not exists public.votes (
  user_id uuid not null references public.profiles (id) on delete cascade,
  question_id uuid not null references public.questions (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

-- 5. ROW LEVEL SECURITY ------------------------------
alter table public.profiles  enable row level security;
alter table public.questions enable row level security;
alter table public.answers   enable row level security;
alter table public.votes     enable row level security;

drop policy if exists "profiles_read"  on public.profiles;
drop policy if exists "profiles_update" on public.profiles;
create policy "profiles_read"   on public.profiles for select using (true);
create policy "profiles_update" on public.profiles for update using (auth.uid() = id);

drop policy if exists "questions_read"   on public.questions;
drop policy if exists "questions_insert" on public.questions;
drop policy if exists "questions_update" on public.questions;
drop policy if exists "questions_delete" on public.questions;
create policy "questions_read"   on public.questions for select using (true);
create policy "questions_insert" on public.questions for insert with check (auth.uid() = user_id);
create policy "questions_update" on public.questions for update using (auth.uid() = user_id);
create policy "questions_delete" on public.questions for delete using (auth.uid() = user_id);

drop policy if exists "answers_read"   on public.answers;
drop policy if exists "answers_insert" on public.answers;
drop policy if exists "answers_delete" on public.answers;
create policy "answers_read"   on public.answers for select using (true);
create policy "answers_insert" on public.answers for insert with check (auth.uid() = user_id);
create policy "answers_delete" on public.answers for delete using (auth.uid() = user_id);

drop policy if exists "votes_read"   on public.votes;
drop policy if exists "votes_insert" on public.votes;
drop policy if exists "votes_delete" on public.votes;
create policy "votes_read"   on public.votes for select using (true);
create policy "votes_insert" on public.votes for insert with check (auth.uid() = user_id);
create policy "votes_delete" on public.votes for delete using (auth.uid() = user_id);

-- 6. STORAGE (foto pertanyaan) -----------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('question-images', 'question-images', true, 4194304,
        array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do nothing;

drop policy if exists "qimg_read"   on storage.objects;
drop policy if exists "qimg_insert" on storage.objects;
drop policy if exists "qimg_delete" on storage.objects;
create policy "qimg_read" on storage.objects for select
  using (bucket_id = 'question-images');
create policy "qimg_insert" on storage.objects for insert to authenticated
  with check (bucket_id = 'question-images' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "qimg_delete" on storage.objects for delete to authenticated
  using (bucket_id = 'question-images' and (storage.foldername(name))[1] = auth.uid()::text);
