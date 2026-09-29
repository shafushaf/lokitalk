export const QUESTION_SELECT =
	'id, title, body, category, image_url, created_at, accepted_answer_id, profiles(username), answers(count), votes(count)';

function shape(x) {
	return {
		...x,
		answer_count: x.answers?.[0]?.count ?? 0,
		vote_count: x.votes?.[0]?.count ?? 0,
		author: x.profiles?.username ?? 'Anonim',
		solved: !!x.accepted_answer_id
	};
}

/**
 * Ambil daftar pertanyaan.
 * sort: 'terbaru' | 'populer' | 'belum'
 */
export async function fetchQuestions(supabase, { category = null, q = '', sort = 'terbaru', limit = 40 } = {}) {
	let query = supabase
		.from('questions')
		.select(QUESTION_SELECT)
		.order('created_at', { ascending: false })
		.limit(limit);

	if (category) query = query.eq('category', category);

	const clean = (q ?? '').replace(/[%,()*]/g, ' ').trim();
	if (clean) query = query.or(`title.ilike.%${clean}%,body.ilike.%${clean}%`);

	const { data } = await query;
	let list = (data ?? []).map(shape);

	if (sort === 'populer') list.sort((a, b) => b.vote_count + b.answer_count - (a.vote_count + a.answer_count));
	if (sort === 'belum') list = list.filter((x) => x.answer_count === 0);
	return list;
}
