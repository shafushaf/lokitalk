import { fail, redirect } from '@sveltejs/kit';
import { categorySlugs } from '$lib/categories.js';

const MAX_IMAGE = 4 * 1024 * 1024; // 4 MB (batas request Vercel ~4,5 MB)
const TYPES = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif' };

export const load = async ({ url, locals: { safeGetSession } }) => {
	const { user } = await safeGetSession();
	if (!user) redirect(303, `/login?redirectTo=${encodeURIComponent('/tanya/baru' + url.search)}`);
	const kategori = url.searchParams.get('kategori');
	return { kategori: categorySlugs.includes(kategori) ? kategori : 'tanya-jawab' };
};

export const actions = {
	default: async ({ request, locals: { supabase, safeGetSession } }) => {
		const { user } = await safeGetSession();
		if (!user) redirect(303, '/login');

		const form = await request.formData();
		const title = String(form.get('title') ?? '').trim();
		const body = String(form.get('body') ?? '').trim();
		const category = String(form.get('category') ?? '');
		const image = form.get('image');
		const values = { title, body, category };

		if (title.length < 8 || title.length > 150)
			return fail(400, { message: 'Judul harus 8–150 karakter.', values });
		if (body.length < 10 || body.length > 5000)
			return fail(400, { message: 'Deskripsi harus 10–5000 karakter.', values });
		if (!categorySlugs.includes(category)) return fail(400, { message: 'Pilih forum yang valid.', values });

		let image_url = null;
		let image_path = null;

		// Foto bersifat opsional
		if (image && typeof image === 'object' && image.size > 0) {
			const ext = TYPES[image.type];
			if (!ext) return fail(400, { message: 'Foto harus berformat JPG, PNG, WEBP, atau GIF.', values });
			if (image.size > MAX_IMAGE) return fail(400, { message: 'Ukuran foto maksimal 4 MB.', values });

			image_path = `${user.id}/${crypto.randomUUID()}.${ext}`;
			const { error: upErr } = await supabase.storage
				.from('question-images')
				.upload(image_path, image, { contentType: image.type, upsert: false });
			if (upErr) return fail(500, { message: 'Gagal mengunggah foto: ' + upErr.message, values });

			image_url = supabase.storage.from('question-images').getPublicUrl(image_path).data.publicUrl;
		}

		const { data, error } = await supabase
			.from('questions')
			.insert({ user_id: user.id, category, title, body, image_url, image_path })
			.select('id')
			.single();

		if (error) {
			if (image_path) await supabase.storage.from('question-images').remove([image_path]);
			return fail(500, { message: 'Gagal menyimpan pertanyaan: ' + error.message, values });
		}

		redirect(303, `/tanya/${data.id}`);
	}
};
