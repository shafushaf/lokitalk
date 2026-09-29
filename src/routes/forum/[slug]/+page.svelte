<script>
  import QuestionList from '$lib/QuestionList.svelte';
  let { data } = $props();
  const c = $derived(data.category);
</script>

<svelte:head><title>{c.name} | LokiTalk</title></svelte:head>

<section class="fhero" style={`--soft:${c.soft}`}>
  <div class="wrap">
    <div>
      <div class="em">{c.emoji}</div>
      <h1 style="font-size:clamp(1.9rem,4.5vw,3rem)">{c.name}</h1>
      <p style="max-width:40em;font-size:1.05rem">{c.desc}</p>
      <a class="btn" href={`/tanya/baru?forum=${c.slug}`}>Tanya di forum ini</a>
    </div>
    <img src="/images/loki-karakter.jpg" alt="Loki" />
  </div>
</section>

<section class="section wrap" style={`--soft:${c.soft}`}>
  <h2>📖 Informasi & panduan</h2>
  <p class="muted" style="margin-bottom:18px">{c.intro}</p>
  <div class="tips">
    {#each c.tips as t}
      <div class="tip"><div class="ic">{t.icon}</div><div><h4>{t.title}</h4><p>{t.text}</p></div></div>
    {/each}
  </div>
  <div class="facts"><h3>💡 Tahukah kamu?</h3><ul>{#each c.facts as f}<li>{f}</li>{/each}</ul></div>
</section>

<section class="section wrap" style={`padding-top:8px;--soft:${c.soft}`}>
  <div class="toolbar">
    <h2 style="margin:0">Diskusi {c.emoji}</h2>
    <form class="search" method="GET">
      <input name="q" value={data.q} placeholder="Cari judul pertanyaan…" aria-label="Cari pertanyaan" />
      <button class="btn sm teal" type="submit">Cari</button>
    </form>
  </div>
  <QuestionList items={data.questions} empty={data.q ? 'Tidak ada pertanyaan yang cocok.' : 'Forum ini masih sepi. Mulai diskusi pertamamu!'} />
</section>
