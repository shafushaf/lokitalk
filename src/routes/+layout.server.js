export const load = async ({ locals: { safeGetSession, supabase } }) => {
	const { user } = await safeGetSession();
	let profile = null;
	if (user) {
		const { data } = await supabase.from('profiles').select('id, username').eq('id', user.id).maybeSingle();
		profile = data;
	}
	return {
		user: user ? { id: user.id, email: user.email } : null,
		profile
	};
};
