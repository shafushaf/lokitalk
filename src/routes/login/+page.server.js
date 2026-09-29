import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => { if (await locals.getUser()) throw redirect(303, '/'); };

export const actions = {
  default: async ({ request, locals }) => {
    const f = await request.formData();
    const email = String(f.get('email') ?? '').trim();
    const password = String(f.get('password') ?? '');
    if (!email || !password) return fail(400, { error: 'Email dan kata sandi wajib diisi.', email });
    const { error } = await locals.supabase.auth.signInWithPassword({ email, password });
    if (error) return fail(400, { error: 'Email atau kata sandi salah, atau email belum dikonfirmasi.', email });
    throw redirect(303, '/');
  }
};
