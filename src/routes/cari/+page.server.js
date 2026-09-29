import { fetchQuestions } from '$lib/server/questions.js';

export const load = async ({ url, locals: { supabase } }) => {
	const q = url.searchParams.get('q') ?? '';
	const sort = url.searchParams.get('sort') ?? 'terbaru';
	const questions = await fetchQuestions(supabase, { q, sort, limit: 60 });
	return { q, sort, questions };
};
