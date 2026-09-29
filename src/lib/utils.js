import { env } from '$env/dynamic/public';

export const imageUrl = (path) =>
  path ? `${env.PUBLIC_SUPABASE_URL}/storage/v1/object/public/question-images/${path}` : null;

export function timeAgo(iso) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return 'baru saja';
  const steps = [[60, 'menit'], [3600, 'jam'], [86400, 'hari'], [2592000, 'bulan'], [31536000, 'tahun']];
  let out = 'baru saja';
  for (let i = 0; i < steps.length; i++) {
    if (s >= steps[i][0]) out = `${Math.floor(s / steps[i][0])} ${steps[i][1]} lalu`;
  }
  return out;
}
