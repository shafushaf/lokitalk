export const load = async ({ locals }) => {
  const sb = locals.supabase;
  const [latest, q, a, p] = await Promise.all([
    sb.from('questions').select('id,title,body,category,image_path,created_at,profiles(username),answers(count)').order('created_at', { ascending: false }).limit(6),
    sb.from('questions').select('*', { count: 'exact', head: true }),
    sb.from('answers').select('*', { count: 'exact', head: true }),
    sb.from('profiles').select('*', { count: 'exact', head: true })
  ]);
  return { latest: latest.data ?? [], stats: { q: q.count ?? 0, a: a.count ?? 0, p: p.count ?? 0 } };
};
