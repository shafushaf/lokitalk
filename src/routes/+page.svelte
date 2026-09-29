<script>
  import { categories, bySlug } from '$lib/categories.js';
  import QuestionList from '$lib/QuestionList.svelte';
  let { data } = $props();
</script>

<section class="hero">
  <span class="leaf" style="left:4%;top:12%">🍃</span><span class="leaf" style="left:46%;bottom:8%">🌿</span><span class="leaf" style="right:6%;top:6%">🍃</span>
  <div class="wrap">
    <div>
      <div class="logo-plate"><img src="/images/lokitalk-logo.jpg" alt="LokiTalk" /></div>
      <h1>Ngobrolin Tani, Ternak, dan Ikan.</h1>
      <p class="lead"><b>Satu Forum, Banyak Solusi.</b> Tanya masalah di kebun, kandang, atau kolam kamu, dapatkan jawaban dari sesama pegiat, dan baca panduan praktis di tiap forum. 🌱🐄🐟</p>
      <div class="cta">
        <a class="btn" href="/tanya/baru">Ajukan pertanyaan</a>
        <a class="btn alt" href="#forum">Jelajahi forum</a>
      </div>
    </div>
    <div class="stage">
      <div class="disc"></div>
      <img src="/images/loki-karakter.jpg" alt="Loki, maskot LokiTalk, sedang berkebun" />
      <span class="chip a">🌱 Tips bertani</span><span class="chip b">🐟 Kolam sehat</span><span class="chip c">🐄 Ternak sehat</span>
    </div>
  </div>
</section>

<div class="wrap">
  <div class="stats">
    <div class="stat"><b>{data.stats.q}</b><span>pertanyaan<br />diajukan</span></div>
    <div class="stat"><b>{data.stats.a}</b><span>jawaban<br />dibagikan</span></div>
    <div class="stat"><b>{data.stats.p}</b><span>anggota<br />bergabung</span></div>
  </div>
</div>

<section class="section wrap" id="forum">
  <h2>Pilih forum, mulai ngobrol</h2>
  <p class="muted" style="margin-bottom:22px">Setiap forum berisi panduan singkat dan ruang tanya jawab khusus.</p>
  <div class="cats">
    {#each categories as c}
      <a class="cat" href={`/forum/${c.slug}`} style={`--soft:${c.soft};--accent:${c.color}`}>
        <span class="em">{c.emoji}</span>
        <h3>{c.name}</h3>
        <p>{c.desc}</p>
        <span class="go">Masuk forum</span>
      </a>
    {/each}
  </div>
</section>

<section class="section wrap" style="padding-top:8px">
  <h2>Dari lahan, kandang, dan kolam</h2>
  <div class="gallery">
    <div class="tile big" style="background:linear-gradient(135deg,#bbf7d0,#4ade80)">🌾<span>Sawah & kebun</span></div>
    <div class="tile" style="background:linear-gradient(135deg,#fde68a,#f59e0b)">🐄<span>Ternak</span></div>
    <div class="tile" style="background:linear-gradient(135deg,#bae6fd,#38bdf8)">🐟<span>Kolam ikan</span></div>
    <div class="tile wide" style="background:linear-gradient(135deg,#99f6e4,#14b8a6)">♻️ 🪱 🍂<span>Kompos & maggot</span></div>
  </div>
  <p class="hint">Tambahkan foto asli ke <code>static/images/galeri</code> lalu tampilkan di sini (lihat README).</p>
</section>

<section class="section wrap" style="padding-top:8px">
  <div class="row" style="margin-bottom:14px">
    <h2 style="margin:0">Pertanyaan terbaru</h2>
    <a class="btn sm alt" href="/tanya/baru">+ Tanya sekarang</a>
  </div>
  <QuestionList items={data.latest} showBadge />
</section>

<section class="section wrap" style="padding-top:8px">
  <h2>Kenapa LokiTalk?</h2>
  <div class="features">
    <div class="feature"><div class="ic">📖</div><h3>Panduan di tiap forum</h3><p class="muted">Tips praktis bertani, beternak, dan budidaya ikan sebelum kamu bertanya.</p></div>
    <div class="feature"><div class="ic">📸</div><h3>Tanya pakai foto</h3><p class="muted">Unggah foto daun, ternak, atau kolam agar masalahnya lebih mudah dikenali.</p></div>
    <div class="feature"><div class="ic">🤝</div><h3>Jawaban dari sesama</h3><p class="muted">Berbagi pengalaman lapangan, dari petani, peternak, hingga pembudidaya ikan.</p></div>
    <div class="feature"><div class="ic">♻️</div><h3>Ramah lingkungan</h3><p class="muted">Ide memanfaatkan limbah jadi pupuk dan pakan alternatif.</p></div>
  </div>
</section>
