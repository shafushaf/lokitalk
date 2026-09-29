<script>
	import { enhance } from '$app/forms';
	import { categories } from '$lib/categories.js';
	export let data;
	export let form;

	let preview = null;
	let fileName = '';
	let loading = false;
	let selected = form?.values?.category ?? data.kategori;
	$: cat = categories.find((c) => c.slug === selected);

	function onFile(e) {
		const f = e.currentTarget.files?.[0];
		if (preview) URL.revokeObjectURL(preview);
		preview = f ? URL.createObjectURL(f) : null;
		fileName = f ? f.name : '';
	}
	function clearFile() {
		const input = document.getElementById('image');
		input.value = '';
		preview = null;
		fileName = '';
	}
</script>

<svelte:head><title>Ajukan pertanyaan - LokiTalk</title></svelte:head>

<div class="container wrap">
	<div class="formcol">
		<h1>Ajukan pertanyaan</h1>
		<p class="muted">Semakin jelas ceritamu, semakin tepat jawaban yang kamu dapat.</p>

		<form
			class="card"
			method="POST"
			enctype="multipart/form-data"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					await update({ reset: false });
					loading = false;
				};
			}}
		>
			{#if form?.message}<div class="alert err" role="alert">{form.message}</div>{/if}

			<div class="field">
				<label for="category">Forum</label>
				<select id="category" name="category" bind:value={selected}>
					{#each categories as c}<option value={c.slug}>{c.emoji} {c.name}</option>{/each}
				</select>
			</div>
			<div class="field">
				<label for="title">Judul pertanyaan</label>
				<input id="title" name="title" type="text" maxlength="150" required value={form?.values?.title ?? ''} placeholder="Contoh: Daun cabai keriting dan menguning, penyebabnya apa?" />
			</div>
			<div class="field">
				<label for="body">Deskripsi</label>
				<textarea id="body" name="body" rows="8" maxlength="5000" required placeholder="Ceritakan kondisi lapangan: jenis tanaman/hewan, umur, lokasi, cuaca, dan yang sudah kamu coba.">{form?.values?.body ?? ''}</textarea>
			</div>
			<div class="field">
				<label for="image">Foto <span class="opt">(tidak wajib)</span></label>
				<input id="image" name="image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" on:change={onFile} />
				<div class="hint">JPG, PNG, WEBP, atau GIF. Maksimal 4 MB.</div>
				{#if preview}
					<div class="prev">
						<img src={preview} alt="Pratinjau foto" />
						<div><b>{fileName}</b><button type="button" class="btn btn-danger" on:click={clearFile}>Hapus foto</button></div>
					</div>
				{/if}
			</div>

			<button class="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Mengirim...' : 'Kirim pertanyaan'}</button>
		</form>
	</div>

	<aside class="side">
		<div class="mascot card">
			<img src="/images/loki.webp" alt="Loki, maskot LokiTalk" />
			<h3>Tips dari forum {cat?.short}</h3>
			<ul>
				{#each (cat?.slug === 'tanya-jawab' ? cat.tips : categories.find((c) => c.slug === 'tanya-jawab').tips).slice(0, 3) as t}
					<li><b>{t.title}.</b> {t.text}</li>
				{/each}
			</ul>
		</div>
	</aside>
</div>

<style>
	.wrap {
		display: grid;
		grid-template-columns: 1fr 340px;
		gap: 30px;
		padding-top: 34px;
		align-items: start;
	}
	h1 {
		margin: 0 0 4px;
		font-size: clamp(1.8rem, 3.6vw, 2.6rem);
	}
	.muted {
		color: var(--muted);
		margin: 0 0 18px;
	}
	.opt {
		font-weight: 500;
		color: var(--muted);
	}
	input[type='file'] {
		width: 100%;
		background: var(--t50);
		border: 2px dashed var(--t300);
		border-radius: 14px;
		padding: 14px;
		font: 500 0.95rem var(--body);
	}
	.prev {
		display: flex;
		gap: 14px;
		align-items: center;
		margin-top: 12px;
	}
	.prev img {
		width: 120px;
		height: 90px;
		object-fit: cover;
		border-radius: 14px;
		border: 1.5px solid var(--line);
	}
	.prev div {
		display: grid;
		gap: 8px;
		justify-items: start;
		word-break: break-all;
	}
	.side {
		position: sticky;
		top: 132px;
	}
	.mascot img {
		width: 100%;
		height: 200px;
		object-fit: cover;
		border-radius: 16px;
		mix-blend-mode: multiply;
	}
	.mascot h3 {
		margin: 10px 0 6px;
	}
	.mascot ul {
		padding-left: 18px;
		margin: 0;
		color: var(--muted);
		font-size: 0.92rem;
	}
	.mascot li {
		margin-bottom: 8px;
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
