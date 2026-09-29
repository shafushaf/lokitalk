import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => { if (await locals.getUser()) throw redirect(303, '/'); };

export const actions = {
  default: async ({ request, locals, url }) => {
    const f = await request.formData();
    const username = String(f.get('username') ?? '').trim();
    const email = String(f.get('email') ?? '').trim();
    const password = String(f.get('password') ?? '');
    const values = { username, email };
    if (username.length < 3 || username.length > 30) return fail(400, { ...values, error: 'Nama pengguna 3–30 karakter.' });
    if (!email) return fail(400, { ...values, error: 'Email wajib diisi.' });
    if (password.length < 6) return fail(400, { ...values, error: 'Kata sandi minimal 6 karakter.' });

    const { data, error } = await locals.supabase.auth.signUp({
      email, password,
      options: { data: { username }, emailRedirectTo: `${url.origin}/login` }
    });
    if (error) return fail(400, { ...values, error: error.message });
    if (data.session) throw redirect(303, '/');
    return { ...values, success: 'Pendaftaran berhasil! Cek email kamu untuk konfirmasi, lalu masuk.' };
  }
};
