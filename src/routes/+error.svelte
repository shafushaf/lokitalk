<script>
	import { page } from '$app/stores';
</script>

<svelte:head><title>Ups - LokiTalk</title></svelte:head>

<div class="container err">
	<img src="/images/loki.webp" alt="" />
	<h1>{$page.status}</h1>
	<p>{$page.error?.message ?? 'Terjadi kesalahan.'}</p>
	<a class="btn btn-primary" href="/">Kembali ke beranda</a>
</div>

<style>
	.err {
		text-align: center;
		padding-block: 50px;
	}
	img {
		width: 240px;
		margin: 0 auto;
		mix-blend-mode: multiply;
	}
	h1 {
		font-size: 4rem;
		margin: 0;
		color: var(--t600);
	}
</style>
