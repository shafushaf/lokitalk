<script>
  let { form } = $props();
</script>
<svelte:head><title>Masuk | LokiTalk</title></svelte:head>
<div class="wrap auth">
  <div class="side"><img src="/images/loki-karakter.jpg" alt="Loki" /><h2>Selamat datang kembali!</h2><p class="muted">Masuk untuk bertanya dan menjawab di LokiTalk.</p></div>
  <form class="card" method="POST">
    <h2>Masuk</h2>
    {#if form?.error}<div class="alert err">{form.error}</div>{/if}
    <div class="field"><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="email" value={form?.email ?? ''} required /></div>
    <div class="field"><label for="password">Kata sandi</label><input id="password" name="password" type="password" autocomplete="current-password" required /></div>
    <button class="btn teal" type="submit">Masuk</button>
    <p class="muted">Belum punya akun? <a href="/register">Daftar gratis</a></p>
  </form>
</div>
