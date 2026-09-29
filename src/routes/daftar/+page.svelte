<script>
	import { enhance } from '$app/forms';
	import AuthShell from '$lib/components/AuthShell.svelte';
	export let form;
	let loading = false;
</script>

<svelte:head><title>Daftar - LokiTalk</title></svelte:head>

<AuthShell>
	<span slot="quote">Satu Forum, Banyak Solusi.</span>
	<h1>Buat akun LokiTalk</h1>
	<p class="muted">Gratis. Cukup email dan password.</p>

	{#if form?.success}
		<div class="alert ok" role="status">{form.message}</div>
		<a class="btn btn-primary full" href="/login">Ke halaman masuk</a>
	{:else}
		<form
			method="POST"
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
				<label for="username">Nama tampilan</label>
				<input id="username" name="username" type="text" minlength="3" maxlength="30" required value={form?.values?.username ?? ''} placeholder="Contoh: Pak Tani Budi" />
			</div>
			<div class="field">
				<label for="email">Email</label>
				<input id="email" name="email" type="email" autocomplete="email" required value={form?.values?.email ?? ''} />
			</div>
			<div class="field">
				<label for="password">Password</label>
				<input id="password" name="password" type="password" autocomplete="new-password" minlength="6" required />
				<div class="hint">Minimal 6 karakter.</div>
			</div>
			<button class="btn btn-primary full" type="submit" disabled={loading}>{loading ? 'Memproses...' : 'Daftar'}</button>
		</form>
	{/if}
	<p class="alt">Sudah punya akun? <a href="/login">Masuk</a></p>
</AuthShell>

<style>
	h1 {
		margin: 0 0 4px;
		font-size: 2rem;
	}
	.muted {
		color: var(--muted);
		margin: 0 0 20px;
	}
	.full {
		width: 100%;
	}
	.alt {
		text-align: center;
		margin-top: 18px;
		color: var(--muted);
	}
	.alt a {
		color: var(--t600);
		font-weight: 700;
		text-decoration: underline;
	}
	button:disabled {
		opacity: 0.6;
	}
</style>
