import { error, fail, redirect } from '@sveltejs/kit';

export const load = async ({ params, locals }) => {
  const { data: question } = await locals.supabase
    .from('questions').select('id,user_id,category,title,body,image_path,created_at,profiles(username)')
    .eq('id', params.id).maybeSingle();
  if (!question) throw error(404, 'Pertanyaan tidak ditemukan');
  const { data: answers } = await locals.supabase
    .from('answers').select('id,user_id,body,created_at,profiles(username)')
    .eq('question_id', params.id).order('created_at', { ascending: true });
  return { question, answers: answers ?? [] };
};

export const actions = {
  answer: async ({ request, params, locals }) => {
    const user = await locals.getUser();
    if (!user) throw redirect(303, '/login');
    const body = String((await request.formData()).get('body') ?? '').trim();
    if (body.length < 2 || body.length > 3000) return fail(400, { error: 'Jawaban harus 2–3000 karakter.', body });
    const { error: e } = await locals.supabase.from('answers').insert({ question_id: params.id, user_id: user.id, body });
    if (e) return fail(500, { error: 'Gagal mengirim jawaban.', body });
    return { ok: true };
  },

  deleteAnswer: async ({ request, locals }) => {
    const user = await locals.getUser();
    if (!user) throw redirect(303, '/login');
    const id = String((await request.formData()).get('id') ?? '');
    await locals.supabase.from('answers').delete().eq('id', id).eq('user_id', user.id);
    return { deleted: true };
  },

  deleteQuestion: async ({ params, locals }) => {
    const user = await locals.getUser();
    if (!user) throw redirect(303, '/login');
    const { data: q } = await locals.supabase.from('questions').select('category,image_path').eq('id', params.id).eq('user_id', user.id).maybeSingle();
    if (!q) return fail(403, { error: 'Kamu hanya bisa menghapus postingan milikmu.' });
    if (q.image_path) await locals.supabase.storage.from('question-images').remove([q.image_path]);
    const { error: e } = await locals.supabase.from('questions').delete().eq('id', params.id).eq('user_id', user.id);
    if (e) return fail(500, { error: 'Gagal menghapus postingan.' });
    throw redirect(303, `/forum/${q.category}`);
  }
};
