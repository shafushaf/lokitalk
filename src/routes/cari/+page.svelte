<script>
	import QuestionCard from '$lib/components/QuestionCard.svelte';
	export let data;
	const sorts = [
		['terbaru', 'Terbaru'],
		['populer', 'Terpopuler'],
		['belum', 'Belum terjawab']
	];
</script>

<svelte:head><title>{data.q ? `Cari "${data.q}"` : 'Semua pertanyaan'} - LokiTalk</title></svelte:head>

<div class="container wrap">
	<div class="section-head">
		<div>
			<h1>{data.q ? `Hasil untuk "${data.q}"` : 'Semua pertanyaan'}</h1>
			<p>{data.questions.length} pertanyaan ditemukan</p>
		</div>
		<a class="btn btn-primary" href="/tanya/baru">+ Ajukan pertanyaan</a>
	</div>

	<form class="tools" method="GET">
		<input type="search" name="q" value={data.q} placeholder="Cari judul atau isi pertanyaan..." />
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
				<h3>Tidak ada hasil</h3>
				<p>Coba kata kunci lain, atau tanyakan langsung ke komunitas.</p>
				<a class="btn btn-primary" href="/tanya/baru">Tulis pertanyaan</a>
			</div>
		{/each}
	</div>
</div>

<style>
	.wrap {
		padding-top: 34px;
	}
	h1 {
		margin: 0;
		font-size: clamp(1.6rem, 3.4vw, 2.4rem);
	}
	.tools {
		display: flex;
		gap: 10px;
		margin-bottom: 16px;
		flex-wrap: wrap;
	}
	.tools input {
		flex: 1 1 240px;
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
</style>
