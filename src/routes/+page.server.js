import { fetchQuestions } from '$lib/server/questions.js';
import { categories } from '$lib/categories.js';

export const load = async ({ locals: { supabase } }) => {
	const [latest, qCount, aCount, uCount, catRows] = await Promise.all([
		fetchQuestions(supabase, { limit: 8 }),
		supabase.from('questions').select('*', { count: 'exact', head: true }),
		supabase.from('answers').select('*', { count: 'exact', head: true }),
		supabase.from('profiles').select('*', { count: 'exact', head: true }),
		supabase.from('questions').select('category').limit(2000)
	]);

	const perCategory = {};
	for (const r of catRows.data ?? []) perCategory[r.category] = (perCategory[r.category] ?? 0) + 1;

	// Tips harian: berganti tiap hari
	const day = Math.floor(Date.now() / 86400000);
	const cat = categories[day % categories.length];
	const tip = cat.tips[day % cat.tips.length];

	return {
		latest,
		perCategory,
		stats: { questions: qCount.count ?? 0, answers: aCount.count ?? 0, users: uCount.count ?? 0 },
		tipOfDay: { ...tip, cat: { slug: cat.slug, emoji: cat.emoji, short: cat.short } }
	};
};
