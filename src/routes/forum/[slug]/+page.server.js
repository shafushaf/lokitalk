import { error } from '@sveltejs/kit';
import { bySlug } from '$lib/categories.js';

export const load = async ({ params, url, locals }) => {
  const category = bySlug(params.slug);
  if (!category) throw error(404, 'Forum tidak ditemukan');
  const q = (url.searchParams.get('q') ?? '').replace(/[%_,()]/g, ' ').trim().slice(0, 60);
  let query = locals.supabase
    .from('questions')
    .select('id,title,body,category,image_path,created_at,profiles(username),answers(count)')
    .eq('category', category.slug)
    .order('created_at', { ascending: false })
    .limit(40);
  if (q) query = query.ilike('title', `%${q}%`);
  const { data } = await query;
  return { category, questions: data ?? [], q };
};
