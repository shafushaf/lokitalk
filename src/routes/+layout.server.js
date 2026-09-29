export const load = async ({ locals }) => {
  const user = await locals.getUser();
  let profile = null;
  if (user) {
    const { data } = await locals.supabase.from('profiles').select('username').eq('id', user.id).maybeSingle();
    profile = data;
  }
  return { user: user ? { id: user.id, email: user.email } : null, profile };
};
