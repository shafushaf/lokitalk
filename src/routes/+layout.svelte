<script>
  import '../app.css';
  import { page } from '$app/state';
  import { categories } from '$lib/categories.js';
  let { data, children } = $props();
</script>

<svelte:head>
  <title>LokiTalk | Forum Tani, Ternak, dan Ikan</title>
  <meta name="description" content="Ngobrolin Tani, Ternak, dan Ikan. Satu Forum, Banyak Solusi." />
</svelte:head>

<header class="nav">
  <div class="wrap">
    <a class="brand" href="/" aria-label="LokiTalk beranda"><img src="/images/lokitalk-logo.jpg" alt="LokiTalk" /></a>
    <nav class="links" aria-label="Navigasi utama">
      <a href="/" class:on={page.url.pathname === '/'}>Beranda</a>
      {#each categories.slice(0, 4) as c}
        <a href={`/forum/${c.slug}`} class:on={page.url.pathname === `/forum/${c.slug}`} title={c.name}>{c.emoji}</a>
      {/each}
      <a href="/forum/tanya-jawab" class:on={page.url.pathname === '/forum/tanya-jawab'}>💬 Tanya Jawab</a>
      {#if data.user}
        <span class="who">Hai, {data.profile?.username ?? 'teman'}</span>
        <a class="btn sm" href="/tanya/baru">+ Tanya</a>
        <form method="POST" action="/logout" style="display:inline"><button class="linkbtn" type="submit">Keluar</button></form>
      {:else}
        <a href="/login">Masuk</a>
        <a class="btn sm" href="/register">Daftar</a>
      {/if}
    </nav>
  </div>
</header>

<main>{@render children()}</main>

<footer class="foot">
  <div class="wrap">
    <img src="/images/lokitalk-logo.jpg" alt="LokiTalk" />
    <div>
      {#each categories as c}<a href={`/forum/${c.slug}`}>{c.emoji} {c.name.split('&')[0].trim()}</a>{/each}
    </div>
    <small>Ngobrolin Tani, Ternak, dan Ikan. Satu Forum, Banyak Solusi. 🌱🐄🐟</small>
  </div>
</footer>
