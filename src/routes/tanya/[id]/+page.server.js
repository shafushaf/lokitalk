import { error, fail, redirect } from '@sveltejs/kit';
import { fetchQuestions } from '$lib/server/questions.js';

export const load = async ({ params, locals: { supabase, safeGetSession } }) => {
	const { user } = await safeGetSession();

	const { data: q } = await supabase
		.from('questions')
		.select('id, title, body, category, image_url, image_path, created_at, user_id, accepted_answer_id, profiles(username), votes(count)')
		.eq('id', params.id)
		.maybeSingle();
	if (!q) error(404, 'Pertanyaan tidak ditemukan');

	const { data: answers } = await supabase
		.from('answers')
		.select('id, body, created_at, user_id, profiles(username)')
		.eq('question_id', params.id)
		.order('created_at', { ascending: true });

	let voted = false;
	if (user) {
		const { data: v } = await supabase
			.from('votes')
			.select('question_id')
			.eq('question_id', params.id)
			.eq('user_id', user.id)
			.maybeSingle();
		voted = !!v;
	}

	const related = (await fetchQuestions(supabase, { category: q.category, limit: 6 }))
		.filter((x) => x.id !== q.id)
		.slice(0, 4);

	// Jawaban yang diterima tampil paling atas
	const list = (answers ?? []).slice().sort((a, b) => (b.id === q.accepted_answer_id) - (a.id === q.accepted_answer_id));

	return {
		question: { ...q, author: q.profiles?.username ?? 'Anonim', vote_count: q.votes?.[0]?.count ?? 0 },
		answers: list.map((a) => ({ ...a, author: a.profiles?.username ?? 'Anonim' })),
		voted,
		related
	};
};

async function requireUser(locals, url) {
	const { user } = await locals.safeGetSession();
	if (!user) redirect(303, `/login?redirectTo=${encodeURIComponent(url.pathname)}`);
	return user;
}

export const actions = {
	answer: async ({ request, params, url, locals }) => {
		const user = await requireUser(locals, url);
		const form = await request.formData();
		const body = String(form.get('body') ?? '').trim();
		if (body.length < 2 || body.length > 3000)
			return fail(400, { message: 'Jawaban harus 2–3000 karakter.', body });

		const { error: err } = await locals.supabase
			.from('answers')
			.insert({ question_id: params.id, user_id: user.id, body });
		if (err) return fail(500, { message: 'Gagal mengirim jawaban: ' + err.message, body });
		return { success: true };
	},

	vote: async ({ params, url, locals }) => {
		const user = await requireUser(locals, url);
		const { data: existing } = await locals.supabase
			.from('votes')
			.select('question_id')
			.eq('question_id', params.id)
			.eq('user_id', user.id)
			.maybeSingle();
		if (existing) {
			await locals.supabase.from('votes').delete().eq('question_id', params.id).eq('user_id', user.id);
		} else {
			await locals.supabase.from('votes').insert({ question_id: params.id, user_id: user.id });
		}
		return { voted: true };
	},

	accept: async ({ request, params, url, locals }) => {
		const user = await requireUser(locals, url);
		const form = await request.formData();
		const answerId = String(form.get('answer_id') ?? '');
		const { data: q } = await locals.supabase
			.from('questions')
			.select('user_id, accepted_answer_id')
			.eq('id', params.id)
			.maybeSingle();
		if (!q || q.user_id !== user.id) return fail(403, { message: 'Hanya penanya yang bisa menandai jawaban terbaik.' });

		const next = q.accepted_answer_id === answerId ? null : answerId;
		await locals.supabase.from('questions').update({ accepted_answer_id: next }).eq('id', params.id);
		return { accepted: true };
	},

	deleteAnswer: async ({ request, params, url, locals }) => {
		const user = await requireUser(locals, url);
		const form = await request.formData();
		const answerId = String(form.get('answer_id') ?? '');
		await locals.supabase.from('answers').delete().eq('id', answerId).eq('user_id', user.id);
		// bersihkan tanda jawaban terbaik bila jawaban itu dihapus
		await locals.supabase
			.from('questions')
			.update({ accepted_answer_id: null })
			.eq('id', params.id)
			.eq('accepted_answer_id', answerId);
		return { deleted: true };
	},

	deleteQuestion: async ({ params, url, locals }) => {
		const user = await requireUser(locals, url);
		const { data: q } = await locals.supabase
			.from('questions')
			.select('user_id, image_path, category')
			.eq('id', params.id)
			.maybeSingle();
		if (!q || q.user_id !== user.id) return fail(403, { message: 'Kamu hanya bisa menghapus postinganmu sendiri.' });

		if (q.image_path) await locals.supabase.storage.from('question-images').remove([q.image_path]);
		const { error: err } = await locals.supabase.from('questions').delete().eq('id', params.id).eq('user_id', user.id);
		if (err) return fail(500, { message: 'Gagal menghapus: ' + err.message });
		redirect(303, `/forum/${q.category}`);
	}
};
