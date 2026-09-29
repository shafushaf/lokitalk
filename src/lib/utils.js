export function timeAgo(date) {
	const s = (Date.now() - new Date(date).getTime()) / 1000;
	if (s < 60) return 'baru saja';
	const m = Math.floor(s / 60);
	if (m < 60) return `${m} menit lalu`;
	const h = Math.floor(m / 60);
	if (h < 24) return `${h} jam lalu`;
	const d = Math.floor(h / 24);
	if (d < 30) return `${d} hari lalu`;
	return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function safeRedirect(path) {
	if (typeof path === 'string' && path.startsWith('/') && !path.startsWith('//')) return path;
	return '/';
}
