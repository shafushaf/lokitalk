import { error } from '@sveltejs/kit';
import { getCategory } from '$lib/categories.js';
import { fetchQuestions } from '$lib/server/questions.js';

export const load = async ({ params, url, locals: { supabase } }) => {
	const category = getCategory(params.slug);
	if (!category) error(404, 'Forum tidak ditemukan');

	const sort = url.searchParams.get('sort') ?? 'terbaru';
	const q = url.searchParams.get('q') ?? '';
	const questions = await fetchQuestions(supabase, { category: params.slug, sort, q, limit: 60 });
	return { category, questions, sort, q };
};
