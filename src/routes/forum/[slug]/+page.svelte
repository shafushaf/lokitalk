<script>
	import { categories } from '$lib/categories.js';
	import Scene from '$lib/components/Scene.svelte';
	import QuestionCard from '$lib/components/QuestionCard.svelte';
	export let data;
	$: c = data.category;
	const sorts = [
		['terbaru', 'Terbaru'],
		['populer', 'Terpopuler'],
		['belum', 'Belum terjawab']
	];
</script>

<svelte:head><title>{c.name} - LokiTalk</title></svelte:head>

<section class="banner" style="--accent: {c.color}">
	<div class="bgscene"><Scene kind={c.scene} slug={c.slug} /></div>
	<div class="shade"></div>
	<div class="container inner">
		<div>
			<span class="pill">{c.emoji} Forum</span>
			<h1>{c.name}</h1>
			<p>{c.description}</p>
			<div class="chips">
				{#each c.topics as t}<a class="chip" href="/forum/{c.slug}?q={encodeURIComponent(t)}">{t}</a>{/each}
			</div>
		</div>
		<img class="mascot" src="/images/loki.webp" alt="" />
	</div>
</section>

<div class="container layout">
	<div>
		<section class="info card" id="panduan">
			<h2>{c.emoji} Panduan singkat: {c.short}</h2>
			<p class="muted">{c.tagline} Klik judul untuk membuka isi tips.</p>
			<div class="acc">
				{#each c.tips as t, i}
					<details open={i === 0}>
						<summary>{t.title}</summary>
						<p>{t.text}</p>
					</details>
				{/each}
			</div>
		</section>

		<div class="section-head qhead">
			<div>
				<h2>Tanya jawab di forum ini</h2>
				<p>{data.questions.length} pertanyaan{data.q ? ` untuk "${data.q}"` : ''}</p>
			</div>
			<a class="btn btn-primary" href="/tanya/baru?kategori={c.slug}">+ Ajukan pertanyaan</a>
		</div>

		<form class="tools" method="GET">
			<input type="search" name="q" value={data.q} placeholder="Cari di forum {c.short}..." />
			<div class="tabs">
				{#each sorts as [v, label]}
					<button name="sort" value={v} class:on={data.sort === v}>{label}</button>
				{/each}
			</div>
		</form>

		<div class="list">
			{#each data.questions as q (q.id)}
				<QuestionCard {q} />
			{:else}
				<div class="empty">
					<img src="/images/loki.webp" alt="" />
					<h3>Belum ada pertanyaan di sini</h3>
					<p>Mulai diskusi pertama di forum {c.short}.</p>
					<a class="btn btn-primary" href="/tanya/baru?kategori={c.slug}">Tulis pertanyaan</a>
				</div>
			{/each}
		</div>
	</div>

	<aside class="side">
		<div class="card">
			<h3 style="margin-top:0">Forum lainnya</h3>
			<div class="others">
				{#each categories.filter((x) => x.slug !== c.slug) as o}
					<a href="/forum/{o.slug}" style="--accent:{o.color}">
						<span class="th"><Scene kind={o.scene} slug={o.slug} /></span>
						<span><b>{o.emoji} {o.short}</b><small>{o.tagline}</small></span>
					</a>
				{/each}
			</div>
		</div>
	</aside>
</div>

<style>
	.banner {
		position: relative;
		overflow: hidden;
		color: #fff;
		min-height: 300px;
		display: flex;
		align-items: center;
	}
	.bgscene {
		position: absolute;
		inset: 0;
	}
	.shade {
		position: absolute;
		inset: 0;
		background: linear-gradient(100deg, rgba(11, 61, 59, 0.94) 25%, rgba(13, 143, 133, 0.55) 70%, rgba(13, 143, 133, 0.15));
	}
	.inner {
		position: relative;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 20px;
		padding-block: 42px 0;
	}
	.pill {
		background: rgba(255, 255, 255, 0.18);
		padding: 5px 14px;
		border-radius: 999px;
		font-weight: 700;
		font-size: 0.85rem;
	}
	h1 {
		font-size: clamp(2rem, 4.6vw, 3.2rem);
		margin: 12px 0 8px;
		max-width: 18ch;
		text-wrap: balance;
	}
	.inner p {
		max-width: 56ch;
		color: #d8fbf4;
		margin: 0 0 16px;
	}
	.inner .chips {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		padding-bottom: 34px;
	}
	.mascot {
		height: 260px;
		width: 260px;
		object-fit: cover;
		border-radius: 30px 30px 0 0;
		border: 4px solid #fff;
		border-bottom: 0;
		flex: none;
		align-self: flex-end;
	}
	.layout {
		display: grid;
		grid-template-columns: 1fr 320px;
		gap: 30px;
		padding-top: 34px;
		align-items: start;
	}
	.info h2 {
		margin: 0;
	}
	.muted {
		color: var(--muted);
		margin: 4px 0 14px;
	}
	.acc {
		display: grid;
		gap: 8px;
	}
	details {
		background: var(--t50);
		border: 1.5px solid var(--line);
		border-radius: 16px;
		padding: 12px 16px;
	}
	details[open] {
		background: #fff;
		border-color: var(--t300);
	}
	summary {
		font-weight: 700;
		cursor: pointer;
	}
	details p {
		margin: 8px 0 0;
		color: var(--muted);
	}
	.qhead {
		margin-top: 36px;
	}
	.tools {
		display: flex;
		gap: 10px;
		margin-bottom: 16px;
		flex-wrap: wrap;
	}
	.tools input {
		flex: 1 1 220px;
		border-radius: 999px;
	}
	.tabs {
		display: flex;
		gap: 4px;
		background: #fff;
		border: 1.5px solid var(--line);
		border-radius: 999px;
		padding: 4px;
		flex-wrap: wrap;
	}
	.tabs button {
		border: 0;
		background: transparent;
		font: 700 0.85rem var(--body);
		color: var(--muted);
		padding: 7px 14px;
		border-radius: 999px;
		cursor: pointer;
	}
	.tabs button.on {
		background: var(--t600);
		color: #fff;
	}
	.side {
		position: sticky;
		top: 132px;
	}
	.others {
		display: grid;
		gap: 10px;
	}
	.others a {
		display: flex;
		gap: 12px;
		align-items: center;
		padding: 8px;
		border-radius: 16px;
		transition: background 0.2s;
	}
	.others a:hover {
		background: var(--t50);
	}
	.th {
		width: 62px;
		height: 62px;
		border-radius: 14px;
		overflow: hidden;
		flex: none;
		border: 2px solid var(--accent);
	}
	.others small {
		display: block;
		color: var(--muted);
		font-size: 0.78rem;
		line-height: 1.3;
	}
	@media (max-width: 900px) {
		.layout {
			grid-template-columns: 1fr;
		}
		.side {
			position: static;
		}
		.mascot {
			display: none;
		}
		.inner .chips {
			padding-bottom: 30px;
		}
	}
</style>
