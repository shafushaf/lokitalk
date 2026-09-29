import { redirect } from '@sveltejs/kit';

// Menangani tautan konfirmasi email dari Supabase (token_hash) atau kode PKCE.
export const GET = async ({ url, locals: { supabase } }) => {
	const token_hash = url.searchParams.get('token_hash');
	const type = url.searchParams.get('type');
	const code = url.searchParams.get('code');

	if (token_hash && type) {
		const { error } = await supabase.auth.verifyOtp({ token_hash, type });
		if (!error) redirect(303, '/');
	} else if (code) {
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) redirect(303, '/');
	}
	redirect(303, '/login');
};
