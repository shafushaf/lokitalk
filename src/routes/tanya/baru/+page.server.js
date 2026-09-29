import { fail, redirect } from '@sveltejs/kit';
import { categories } from '$lib/categories.js';

const TYPES = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif' };
const MAX = 3 * 1024 * 1024;

export const load = async ({ locals, url }) => {
  if (!(await locals.getUser())) throw redirect(303, '/login');
  return { forum: url.searchParams.get('forum') ?? 'tanya-jawab' };
};

export const actions = {
  default: async ({ request, locals }) => {
    const user = await locals.getUser();
    if (!user) throw redirect(303, '/login');

    const f = await request.formData();
    const category = String(f.get('category') ?? '');
    const title = String(f.get('title') ?? '').trim();
    const body = String(f.get('body') ?? '').trim();
    const file = f.get('image');
    const values = { category, title, body };

    if (!categories.some((c) => c.slug === category)) return fail(400, { ...values, error: 'Pilih forum yang valid.' });
    if (title.length < 10 || title.length > 150) return fail(400, { ...values, error: 'Judul harus 10–150 karakter.' });
    if (body.length < 10 || body.length > 5000) return fail(400, { ...values, error: 'Deskripsi harus 10–5000 karakter.' });

    let image_path = null;
    if (file && typeof file === 'object' && file.size > 0) {
      if (!TYPES[file.type]) return fail(400, { ...values, error: 'Foto harus berformat JPG, PNG, WEBP, atau GIF.' });
      if (file.size > MAX) return fail(400, { ...values, error: 'Ukuran foto maksimal 3 MB.' });
      image_path = `${user.id}/${crypto.randomUUID()}.${TYPES[file.type]}`;
      const { error } = await locals.supabase.storage.from('question-images').upload(image_path, file, { contentType: file.type });
      if (error) return fail(500, { ...values, error: 'Gagal mengunggah foto. Coba lagi.' });
    }

    const { data, error } = await locals.supabase
      .from('questions').insert({ user_id: user.id, category, title, body, image_path }).select('id').single();
    if (error) {
      if (image_path) await locals.supabase.storage.from('question-images').remove([image_path]);
      return fail(500, { ...values, error: 'Gagal menyimpan pertanyaan. Coba lagi.' });
    }
    throw redirect(303, `/q/${data.id}`);
  }
};
