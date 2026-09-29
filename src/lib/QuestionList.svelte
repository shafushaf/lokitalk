<script>
  import { bySlug } from '$lib/categories.js';
  import { imageUrl, timeAgo } from '$lib/utils.js';
  let { items = [], showBadge = false, empty = 'Belum ada pertanyaan. Jadilah yang pertama bertanya!' } = $props();
</script>

{#if items.length === 0}
  <div class="empty">
    <img src="/images/loki-karakter.jpg" alt="" />
    <p>{empty}</p>
    <a class="btn sm" href="/tanya/baru">Ajukan pertanyaan</a>
  </div>
{:else}
  <div class="qlist">
    {#each items as q}
      {@const c = bySlug(q.category)}
      {@const n = q.answers?.[0]?.count ?? 0}
      <a class="q" href={`/q/${q.id}`} style={`--accent:${c?.color ?? '#0d9488'};--soft:${c?.soft ?? '#ccfbf1'}`}>
        <div>
          <h3>{q.title}</h3>
          <p>{q.body.length > 130 ? q.body.slice(0, 130) + '…' : q.body}</p>
          <div class="meta">
            {#if showBadge && c}<span class="badge">{c.emoji} {c.name.split('&')[0].trim()}</span>{/if}
            <span>👤 {q.profiles?.username ?? 'anonim'}</span><span>{timeAgo(q.created_at)}</span>
          </div>
        </div>
        <div style="display:flex;gap:12px;align-items:center">
          {#if q.image_path}<img class="thumb" src={imageUrl(q.image_path)} alt="" loading="lazy" />{/if}
          <div class="count" class:has={n > 0}>{n}<small>jawaban</small></div>
        </div>
      </a>
    {/each}
  </div>
{/if}
