import { fail, redirect } from '@sveltejs/kit';
import { safeRedirect } from '$lib/utils.js';

export const load = async ({ url, locals: { safeGetSession } }) => {
	const { user } = await safeGetSession();
	const redirectTo = safeRedirect(url.searchParams.get('redirectTo'));
	if (user) redirect(303, redirectTo);
	return { redirectTo };
};

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const form = await request.formData();
		const email = String(form.get('email') ?? '').trim();
		const password = String(form.get('password') ?? '');
		const redirectTo = safeRedirect(String(form.get('redirectTo') ?? '/'));

		if (!email || !password) return fail(400, { message: 'Email dan password wajib diisi.', email });

		const { error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			const msg = /confirm/i.test(error.message)
				? 'Email kamu belum dikonfirmasi. Cek kotak masuk email.'
				: 'Email atau password salah.';
			return fail(400, { message: msg, email });
		}
		redirect(303, redirectTo);
	}
};
