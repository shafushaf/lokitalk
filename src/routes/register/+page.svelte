<script>
  let { form } = $props();
</script>
<svelte:head><title>Daftar | LokiTalk</title></svelte:head>
<div class="wrap auth">
  <div class="side"><img src="/images/loki-karakter.jpg" alt="Loki" /><h2>Gabung LokiTalk</h2><p class="muted">Satu Forum, Banyak Solusi untuk tani, ternak, dan ikan.</p></div>
  <form class="card" method="POST">
    <h2>Buat akun</h2>
    {#if form?.error}<div class="alert err">{form.error}</div>{/if}
    {#if form?.success}<div class="alert ok">{form.success}</div>{/if}
    <div class="field"><label for="username">Nama pengguna</label><input id="username" name="username" value={form?.username ?? ''} minlength="3" maxlength="30" required /></div>
    <div class="field"><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="email" value={form?.email ?? ''} required /></div>
    <div class="field"><label for="password">Kata sandi</label><input id="password" name="password" type="password" autocomplete="new-password" minlength="6" required /><div class="hint">Minimal 6 karakter.</div></div>
    <button class="btn teal" type="submit">Daftar</button>
    <p class="muted">Sudah punya akun? <a href="/login">Masuk</a></p>
  </form>
</div>
