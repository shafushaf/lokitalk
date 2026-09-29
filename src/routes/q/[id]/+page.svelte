<script>
  import { enhance } from '$app/forms';
  import { bySlug } from '$lib/categories.js';
  import { imageUrl, timeAgo } from '$lib/utils.js';
  let { data, form } = $props();
  const c = $derived(bySlug(data.question.category));
  const mine = $derived(data.user?.id === data.question.user_id);
  let sending = $state(false);
</script>
<svelte:head><title>{data.question.title} | LokiTalk</title></svelte:head>

<div class="wrap section" style={`max-width:860px;--soft:${c?.soft}`}>
  <p><a href={`/forum/${data.question.category}`}>← {c?.emoji} {c?.name}</a></p>

  <article class="post">
    <h1 style="font-size:clamp(1.6rem,3.6vw,2.3rem)">{data.question.title}</h1>
    <div class="meta" style="margin:0 0 14px"><span>👤 {data.question.profiles?.username ?? 'anonim'}</span><span>{timeAgo(data.question.created_at)}</span><span class="badge">{c?.emoji} {c?.name.split('&')[0].trim()}</span></div>
    <div class="body">{data.question.body}</div>
    {#if data.question.image_path}<img class="photo" src={imageUrl(data.question.image_path)} alt="Foto dari penanya" />{/if}
    {#if mine}
      <form method="POST" action="?/deleteQuestion" style="margin-top:18px" onsubmit={(e) => { if (!confirm('Hapus pertanyaan ini beserta semua jawabannya?')) e.preventDefault(); }}>
        <button class="btn sm danger" type="submit">🗑️ Hapus postingan</button>
      </form>
    {/if}
    {#if form?.error && !form?.body}<div class="alert err" style="margin-top:12px">{form.error}</div>{/if}
  </article>

  <h2 style="margin-top:34px">{data.answers.length} Jawaban</h2>
  <div class="answers">
    {#each data.answers as a (a.id)}
      <div class="answer">
        <div class="body">{a.body}</div>
        <div class="row meta"><span>👤 {a.profiles?.username ?? 'anonim'} · {timeAgo(a.created_at)}</span>
          {#if data.user?.id === a.user_id}
            <form method="POST" action="?/deleteAnswer" use:enhance onsubmit={(e) => { if (!confirm('Hapus jawaban ini?')) e.preventDefault(); }}>
              <input type="hidden" name="id" value={a.id} /><button class="btn sm danger" type="submit">Hapus</button>
            </form>
          {/if}
        </div>
      </div>
    {:else}
      <div class="empty"><p>Belum ada jawaban. Bagikan pengalaman atau solusimu!</p></div>
    {/each}
  </div>

  {#if data.user}
    <form class="card" method="POST" action="?/answer" use:enhance={() => { sending = true; return async ({ update }) => { await update(); sending = false; }; }}>
      <h3>Tulis jawabanmu</h3>
      {#if form?.error && form?.body !== undefined}<div class="alert err">{form.error}</div>{/if}
      <div class="field"><textarea name="body" maxlength="3000" required placeholder="Bagikan solusi atau pengalamanmu…">{form?.body ?? ''}</textarea></div>
      <button class="btn teal" type="submit" disabled={sending}>{sending ? 'Mengirim…' : 'Kirim jawaban'}</button>
    </form>
  {:else}
    <div class="empty"><p><a href="/login">Masuk</a> atau <a href="/register">daftar</a> untuk menjawab pertanyaan ini.</p></div>
  {/if}
</div>
