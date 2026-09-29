<script>
	import { getCategory } from '$lib/categories.js';
	import { timeAgo } from '$lib/utils.js';
	export let q;
	$: cat = getCategory(q.category);
</script>

<article class="qcard" style="--accent: {cat?.color ?? '#0d8f85'}">
	<div class="qstats">
		<div class="stat"><b>{q.vote_count}</b><span>suka</span></div>
		<div class="stat" class:solved={q.solved} class:has={q.answer_count > 0}>
			<b>{q.answer_count}</b><span>jawaban</span>
		</div>
	</div>
	<div class="qmain">
		<div class="qtop">
			{#if cat}<a class="badge" href="/forum/{cat.slug}">{cat.emoji} {cat.short}</a>{/if}
			{#if q.solved}<span class="badge ok">✔ Terjawab</span>{/if}
		</div>
		<h3><a href="/tanya/{q.id}">{q.title}</a></h3>
		<p>{q.body}</p>
		<div class="qmeta"><b>{q.author}</b> bertanya {timeAgo(q.created_at)}</div>
	</div>
	{#if q.image_url}
		<a class="qthumb" href="/tanya/{q.id}"><img src={q.image_url} alt="" loading="lazy" /></a>
	{/if}
</article>

<style>
	.qcard {
		display: grid;
		grid-template-columns: 74px 1fr auto;
		gap: 16px;
		background: #fff;
		border: 1.5px solid var(--line);
		border-left: 6px solid var(--accent);
		border-radius: 18px;
		padding: 16px 18px 16px 14px;
		transition: box-shadow 0.2s, transform 0.2s;
	}
	.qcard:hover {
		box-shadow: 0 10px 30px -14px rgba(11, 61, 59, 0.35);
		transform: translateY(-2px);
	}
	.qstats {
		display: flex;
		flex-direction: column;
		gap: 8px;
		align-items: center;
	}
	.stat {
		width: 100%;
		text-align: center;
		padding: 6px 0;
		border-radius: 12px;
		background: var(--t50);
		color: var(--muted);
		font-size: 0.72rem;
		line-height: 1.1;
	}
	.stat b {
		display: block;
		font-family: var(--display);
		font-size: 1.15rem;
		color: var(--ink);
	}
	.stat.has {
		background: var(--t100);
	}
	.stat.solved {
		background: var(--t600);
		color: #d9fff7;
	}
	.stat.solved b {
		color: #fff;
	}
	.qtop {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
		margin-bottom: 6px;
	}
	h3 {
		font-family: var(--display);
		font-size: 1.15rem;
		line-height: 1.25;
		margin: 0 0 6px;
	}
	h3 a:hover {
		color: var(--t600);
	}
	p {
		margin: 0 0 10px;
		color: var(--muted);
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		font-size: 0.95rem;
	}
	.qmeta {
		font-size: 0.8rem;
		color: var(--muted);
	}
	.qmeta b {
		color: var(--t700);
	}
	.qthumb img {
		width: 110px;
		height: 90px;
		object-fit: cover;
		border-radius: 14px;
		border: 1.5px solid var(--line);
	}
	@media (max-width: 640px) {
		.qcard {
			grid-template-columns: 1fr;
		}
		.qstats {
			flex-direction: row;
		}
		.stat {
			width: auto;
			padding: 6px 14px;
		}
		.qthumb img {
			width: 100%;
			height: 150px;
		}
	}
</style>
