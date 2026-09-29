<script>
  import { categories } from '$lib/categories.js';
  let { data, form } = $props();
  let preview = $state(null);
  function pick(e) {
    const file = e.currentTarget.files?.[0];
    preview = file ? URL.createObjectURL(file) : null;
  }
</script>
<svelte:head><title>Ajukan Pertanyaan | LokiTalk</title></svelte:head>
<div class="wrap section" style="max-width:820px">
  <form class="card" method="POST" enctype="multipart/form-data">
    <h2>Ajukan pertanyaan 🌱</h2>
    <p class="muted">Semakin jelas ceritamu, semakin tepat jawabannya. Sebutkan jenis, umur, cuaca, dan yang sudah kamu coba.</p>
    {#if form?.error}<div class="alert err">{form.error}</div>{/if}
    <div class="field">
      <label for="category">Forum</label>
      <select id="category" name="category">
        {#each categories as c}<option value={c.slug} selected={(form?.category ?? data.forum) === c.slug}>{c.emoji} {c.name}</option>{/each}
      </select>
    </div>
    <div class="field"><label for="title">Judul</label><input id="title" name="title" maxlength="150" value={form?.title ?? ''} placeholder="Contoh: Daun cabai keriting dan menguning, apa penyebabnya?" required /></div>
    <div class="field"><label for="body">Deskripsi</label><textarea id="body" name="body" maxlength="5000" required placeholder="Ceritakan masalahmu selengkap mungkin…">{form?.body ?? ''}</textarea></div>
    <div class="field">
      <label for="image">Foto (opsional)</label>
      <input id="image" name="image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onchange={pick} />
      <div class="hint">JPG, PNG, WEBP, atau GIF. Maksimal 3 MB.</div>
      {#if preview}<img src={preview} alt="Pratinjau foto" style="margin-top:10px;max-height:220px;border-radius:14px;border:2px solid var(--line)" />{/if}
    </div>
    <button class="btn teal" type="submit">Kirim pertanyaan</button>
  </form>
</div>
