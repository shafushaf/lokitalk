import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals: { safeGetSession } }) => {
	const { user } = await safeGetSession();
	if (user) redirect(303, '/');
	return {};
};

export const actions = {
	default: async ({ request, url, locals: { supabase } }) => {
		const form = await request.formData();
		const username = String(form.get('username') ?? '').trim();
		const email = String(form.get('email') ?? '').trim();
		const password = String(form.get('password') ?? '');
		const values = { username, email };

		if (username.length < 3 || username.length > 30)
			return fail(400, { message: 'Nama tampilan harus 3–30 karakter.', values });
		if (!email) return fail(400, { message: 'Email wajib diisi.', values });
		if (password.length < 6) return fail(400, { message: 'Password minimal 6 karakter.', values });

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: { data: { username }, emailRedirectTo: `${url.origin}/auth/confirm` }
		});
		if (error) return fail(400, { message: error.message, values });

		// Jika konfirmasi email dimatikan di Supabase, sesi langsung aktif
		if (data.session) redirect(303, '/');

		return { success: true, message: 'Akun dibuat. Cek email kamu untuk konfirmasi, lalu masuk.', values };
	}
};
