<script>
	import { enhance } from '$app/forms';
	import AuthShell from '$lib/components/AuthShell.svelte';
	export let data;
	export let form;
	let loading = false;
</script>

<svelte:head><title>Masuk - LokiTalk</title></svelte:head>

<AuthShell>
	<span slot="quote">Ngobrolin Tani, Ternak, dan Ikan.</span>
	<h1>Masuk ke LokiTalk</h1>
	<p class="muted">Lanjutkan diskusi dan bantu petani lain.</p>

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
		<input type="hidden" name="redirectTo" value={data.redirectTo} />
		<div class="field">
			<label for="email">Email</label>
			<input id="email" name="email" type="email" autocomplete="email" required value={form?.email ?? ''} />
		</div>
		<div class="field">
			<label for="password">Password</label>
			<input id="password" name="password" type="password" autocomplete="current-password" required />
		</div>
		<button class="btn btn-primary full" type="submit" disabled={loading}>{loading ? 'Memproses...' : 'Masuk'}</button>
	</form>
	<p class="alt">Belum punya akun? <a href="/daftar">Daftar gratis</a></p>
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
