<script>
	import { enhance } from '$app/forms';
	import { getCategory } from '$lib/categories.js';
	import { timeAgo } from '$lib/utils.js';
	import QuestionCard from '$lib/components/QuestionCard.svelte';

	export let data;
	export let form;

	$: q = data.question;
	$: cat = getCategory(q.category);
	$: mine = data.user && data.user.id === q.user_id;
	let sending = false;
	let answerText = '';

	function confirmDelete(msg) {
		return (e) => {
			if (!confirm(msg)) e.preventDefault();
		};
	}
</script>

<svelte:head><title>{q.title} - LokiTalk</title></svelte:head>

<div class="container wrap">
	<div>
		<nav class="crumb">
			<a href="/">Beranda</a> / <a href="/forum/{cat.slug}">{cat.emoji} {cat.short}</a>
		</nav>

		{#if form?.message && !form?.body}<div class="alert err" role="alert">{form.message}</div>{/if}

		<article class="card qbox" style="--accent:{cat.color}">
			<div class="qhead">
				<span class="badge">{cat.emoji} {cat.name}</span>
				{#if q.accepted_answer_id}<span class="badge ok">✔ Terjawab</span>{/if}
			</div>
			<h1>{q.title}</h1>
			<div class="meta"><b>{q.author}</b> bertanya {timeAgo(q.created_at)}</div>
			<div class="body">{q.body}</div>
			{#if q.image_url}
				<a href={q.image_url} target="_blank" rel="noopener"><img class="qimg" src={q.image_url} alt="Foto pada pertanyaan: {q.title}" /></a>
			{/if}

			<div class="actions">
				<form method="POST" action="?/vote" use:enhance>
					<button class="btn btn-sm {data.voted ? 'btn-primary' : 'btn-ghost'}" type="submit">
						👍 {data.voted ? 'Disukai' : 'Suka'} · {q.vote_count}
					</button>
				</form>
				{#if mine}
					<form method="POST" action="?/deleteQuestion" on:submit={confirmDelete('Hapus pertanyaan ini beserta semua jawabannya?')}>
						<button class="btn btn-danger" type="submit">🗑 Hapus postingan</button>
					</form>
				{/if}
			</div>
		</article>

		<div class="section-head" style="margin-top:34px">
			<h2>{data.answers.length} Jawaban</h2>
		</div>

		<div class="list">
			{#each data.answers as a (a.id)}
				{@const best = a.id === q.accepted_answer_id}
				<div class="ans" class:best>
					{#if best}<span class="badge ok">✔ Jawaban terbaik</span>{/if}
					<div class="body">{a.body}</div>
					<div class="ameta">
						<span><b>{a.author}</b> menjawab {timeAgo(a.created_at)}</span>
						<span class="arow">
							{#if mine}
								<form method="POST" action="?/accept" use:enhance>
									<input type="hidden" name="answer_id" value={a.id} />
									<button class="btn btn-ghost btn-sm" type="submit">{best ? 'Batalkan tanda terbaik' : '✔ Tandai terbaik'}</button>
								</form>
							{/if}
							{#if data.user && data.user.id === a.user_id}
								<form method="POST" action="?/deleteAnswer" on:submit={confirmDelete('Hapus jawaban ini?')}>
									<input type="hidden" name="answer_id" value={a.id} />
									<button class="btn btn-danger" type="submit">🗑 Hapus</button>
								</form>
							{/if}
						</span>
					</div>
				</div>
			{:else}
				<div class="empty">
					<h3>Belum ada jawaban</h3>
					<p>Punya pengalaman serupa? Jadilah yang pertama membantu.</p>
				</div>
			{/each}
		</div>

		<section class="card reply">
			<h3 style="margin-top:0">Jawaban kamu</h3>
			{#if data.user}
				{#if form?.message && form?.body !== undefined}<div class="alert err" role="alert">{form.message}</div>{/if}
				<form
					method="POST"
					action="?/answer"
					use:enhance={() => {
						sending = true;
						return async ({ result, update }) => {
							if (result.type === 'success') answerText = '';
							await update({ reset: false });
							sending = false;
						};
					}}
				>
					<div class="field">
						<label for="body" class="sr">Isi jawaban</label>
						<textarea id="body" name="body" rows="5" required bind:value={answerText} placeholder="Tulis solusi atau pengalamanmu dengan jelas dan sopan..."></textarea>
					</div>
					<button class="btn btn-primary" type="submit" disabled={sending}>{sending ? 'Mengirim...' : 'Kirim jawaban'}</button>
				</form>
			{:else}
				<p>Masuk dulu untuk ikut menjawab.</p>
				<a class="btn btn-primary" href="/login?redirectTo=/tanya/{q.id}">Masuk</a>
				<a class="btn btn-ghost" href="/daftar">Buat akun</a>
			{/if}
		</section>
	</div>

	<aside class="side">
		<div class="tip card">
			<img src="/images/loki.webp" alt="" />
			<h3>Panduan {cat.short}</h3>
			<p>{cat.tips[0].title}: {cat.tips[0].text}</p>
			<a class="btn btn-ghost btn-sm" href="/forum/{cat.slug}#panduan">Baca panduan lengkap</a>
		</div>
		{#if data.related.length}
			<div class="card">
				<h3 style="margin-top:0">Pertanyaan terkait</h3>
				<div class="rel">
					{#each data.related as r}
						<a href="/tanya/{r.id}"><b>{r.title}</b><small>{r.answer_count} jawaban</small></a>
					{/each}
				</div>
			</div>
		{/if}
	</aside>
</div>

<style>
	.wrap {
		display: grid;
		grid-template-columns: 1fr 330px;
		gap: 30px;
		padding-top: 24px;
		align-items: start;
	}
	.crumb {
		font-size: 0.88rem;
		color: var(--muted);
		margin-bottom: 12px;
	}
	.crumb a:hover {
		color: var(--t600);
	}
	.qbox {
		border-top: 6px solid var(--accent);
	}
	.qhead {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
	}
	h1 {
		font-size: clamp(1.6rem, 3.4vw, 2.3rem);
		margin: 12px 0 6px;
		text-wrap: balance;
	}
	.meta {
		color: var(--muted);
		font-size: 0.88rem;
		margin-bottom: 16px;
	}
	.meta b,
	.ameta b {
		color: var(--t700);
	}
	.body {
		white-space: pre-wrap;
		word-break: break-word;
		font-size: 1.04rem;
	}
	.qimg {
		margin-top: 18px;
		width: 100%;
		max-height: 460px;
		object-fit: cover;
		border-radius: 18px;
		border: 1.5px solid var(--line);
	}
	.actions {
		display: flex;
		gap: 8px;
		margin-top: 18px;
		flex-wrap: wrap;
	}
	.actions form {
		margin: 0;
	}
	.ans {
		background: #fff;
		border: 1.5px solid var(--line);
		border-radius: 18px;
		padding: 18px 20px;
	}
	.ans.best {
		border-color: var(--t500);
		background: var(--t50);
		box-shadow: 0 0 0 4px rgba(20, 176, 160, 0.12);
	}
	.ameta {
		display: flex;
		justify-content: space-between;
		gap: 10px;
		align-items: center;
		flex-wrap: wrap;
		margin-top: 12px;
		font-size: 0.85rem;
		color: var(--muted);
	}
	.arow {
		display: flex;
		gap: 8px;
	}
	.arow form {
		margin: 0;
	}
	.reply {
		margin-top: 24px;
		background: linear-gradient(180deg, #fff, var(--t50));
	}
	.sr {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
	}
	.side {
		display: grid;
		gap: 18px;
		position: sticky;
		top: 132px;
	}
	.tip img {
		width: 100%;
		height: 170px;
		object-fit: cover;
		border-radius: 14px;
		mix-blend-mode: multiply;
	}
	.tip h3 {
		margin: 10px 0 6px;
	}
	.tip p {
		color: var(--muted);
		margin: 0 0 12px;
		font-size: 0.93rem;
	}
	.rel {
		display: grid;
		gap: 4px;
	}
	.rel a {
		padding: 8px 10px;
		border-radius: 12px;
	}
	.rel a:hover {
		background: var(--t50);
	}
	.rel small {
		display: block;
		color: var(--muted);
	}
	button:disabled {
		opacity: 0.6;
		cursor: wait;
	}
	@media (max-width: 900px) {
		.wrap {
			grid-template-columns: 1fr;
		}
		.side {
			position: static;
		}
	}
</style>
