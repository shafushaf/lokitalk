<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { categories } from '$lib/categories.js';

	export let data;
	$: name = data.profile?.username ?? data.user?.email?.split('@')[0] ?? '';
	$: path = $page.url.pathname;
</script>

<svelte:head>
	<title>LokiTalk - Forum Tani, Ternak, dan Ikan</title>
	<meta
		name="description"
		content="Ngobrolin Tani, Ternak, dan Ikan. Satu Forum, Banyak Solusi. Forum tanya jawab pertanian, peternakan, dan perikanan."
	/>
</svelte:head>

<header class="top">
	<div class="container bar">
		<a href="/" class="brand" aria-label="LokiTalk beranda">
			<img src="/images/lokitalk-logo.webp" alt="LokiTalk" width="150" height="48" />
		</a>

		<form class="search" action="/cari" method="GET" role="search">
			<input type="search" name="q" placeholder="Cari masalah cabai, lele, kambing..." aria-label="Cari pertanyaan" />
			<button class="btn btn-primary btn-sm" type="submit">Cari</button>
		</form>

		<div class="acts">
			<a class="btn btn-sun btn-sm" href="/tanya/baru">+ Tanya</a>
			{#if data.user}
				<span class="me" title={data.user.email}><i>{name.slice(0, 1).toUpperCase()}</i>{name}</span>
				<form method="POST" action="/logout">
					<button class="btn btn-ghost btn-sm" type="submit">Keluar</button>
				</form>
			{:else}
				<a class="btn btn-ghost btn-sm" href="/login">Masuk</a>
				<a class="btn btn-primary btn-sm hide-s" href="/daftar">Daftar</a>
			{/if}
		</div>
	</div>
	<nav class="cats" aria-label="Forum">
		<div class="container catrow">
			<a href="/" class:on={path === '/'}>🏡 Beranda</a>
			{#each categories as c}
				<a href="/forum/{c.slug}" class:on={path === `/forum/${c.slug}`}>{c.emoji} {c.short}</a>
			{/each}
		</div>
	</nav>
</header>

<main>
	<slot />
</main>

<footer class="foot">
	<div class="container fgrid">
		<div>
			<img class="flogo" src="/images/lokitalk-logo.webp" alt="LokiTalk" width="170" height="55" />
			<p class="tag">Ngobrolin Tani, Ternak, dan Ikan. Satu Forum, Banyak Solusi. 🌱🐄🐟</p>
		</div>
		<div>
			<h4>Forum</h4>
			{#each categories as c}<a href="/forum/{c.slug}">{c.emoji} {c.short}</a>{/each}
		</div>
		<div>
			<h4>Mulai</h4>
			<a href="/tanya/baru">Ajukan pertanyaan</a>
			<a href="/cari">Cari pertanyaan</a>
			<a href="/daftar">Buat akun</a>
			<a href="/login">Masuk</a>
		</div>
	</div>
	<div class="container copy">© {new Date().getFullYear()} LokiTalk. Dibuat untuk petani, peternak, dan pembudidaya ikan Indonesia.</div>
</footer>

<style>
	.top {
		position: sticky;
		top: 0;
		z-index: 50;
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(14px);
		border-bottom: 1.5px solid var(--line);
	}
	.bar {
		display: flex;
		align-items: center;
		gap: 16px;
		padding-block: 8px;
	}
	.brand img {
		height: 48px;
		width: auto;
		mix-blend-mode: multiply;
	}
	.search {
		flex: 1;
		display: flex;
		gap: 8px;
		max-width: 480px;
		margin-inline: auto;
	}
	.search input {
		padding: 9px 16px;
		border-radius: 999px;
	}
	.acts {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.acts form {
		margin: 0;
	}
	.me {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-weight: 700;
		font-size: 0.9rem;
		color: var(--t800);
		max-width: 130px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.me i {
		font-style: normal;
		flex: none;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		background: linear-gradient(135deg, var(--t400), var(--t700));
		color: #fff;
	}
	.cats {
		background: linear-gradient(90deg, var(--t700), var(--t500));
	}
	.catrow {
		display: flex;
		gap: 4px;
		overflow-x: auto;
		padding-block: 6px;
		scrollbar-width: none;
	}
	.catrow a {
		flex: none;
		color: #dffbf5;
		font-weight: 700;
		font-size: 0.9rem;
		padding: 6px 14px;
		border-radius: 999px;
		transition: background 0.2s;
	}
	.catrow a:hover {
		background: rgba(255, 255, 255, 0.16);
	}
	.catrow a.on {
		background: #fff;
		color: var(--t800);
	}

	.foot {
		margin-top: 60px;
		background: var(--t900);
		color: #bfeee6;
		padding-top: 40px;
	}
	.fgrid {
		display: grid;
		grid-template-columns: 1.6fr 1fr 1fr;
		gap: 30px;
	}
	.flogo {
		background: #fff;
		border-radius: 14px;
		padding: 6px 12px;
		height: 60px;
		width: auto;
	}
	.tag {
		max-width: 320px;
	}
	.foot h4 {
		color: #fff;
		margin: 0 0 10px;
	}
	.foot a {
		display: block;
		padding: 3px 0;
	}
	.foot a:hover {
		color: #fff;
	}
	.copy {
		margin-top: 30px;
		padding-block: 18px;
		border-top: 1px solid rgba(255, 255, 255, 0.12);
		font-size: 0.85rem;
	}

	@media (max-width: 860px) {
		.bar {
			flex-wrap: wrap;
		}
		.search {
			order: 3;
			flex-basis: 100%;
			max-width: none;
		}
		.brand {
			margin-right: auto;
		}
		.fgrid {
			grid-template-columns: 1fr;
		}
		.me {
			display: none;
		}
	}
	@media (max-width: 480px) {
		.hide-s {
			display: none;
		}
	}
</style>
