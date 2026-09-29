<script>
	import { categories } from '$lib/categories.js';
	import Scene from '$lib/components/Scene.svelte';
	import QuestionCard from '$lib/components/QuestionCard.svelte';
	export let data;
</script>

<section class="hero">
	<div class="blob b1"></div>
	<div class="blob b2"></div>
	<div class="container hgrid">
		<div class="copy">
			<span class="pill">🌱 Forum petani, peternak, dan pembudidaya ikan</span>
			<h1>Ngobrolin Tani, Ternak, dan Ikan.</h1>
			<p class="sub">Satu Forum, Banyak Solusi. 🌱🐄🐟</p>
			<p class="lead">
				Tanyakan masalah di kebun, kandang, atau kolam. Dapatkan jawaban dari sesama pelaku lapangan
				dan baca panduan singkat di setiap forum.
			</p>
			<div class="cta">
				<a class="btn btn-sun" href="/tanya/baru">Ajukan pertanyaan</a>
				<a class="btn btn-ghost" href="#forum">Lihat semua forum</a>
			</div>
			<dl class="stats">
				<div><dt>{data.stats.questions}</dt><dd>pertanyaan</dd></div>
				<div><dt>{data.stats.answers}</dt><dd>jawaban</dd></div>
				<div><dt>{data.stats.users}</dt><dd>anggota</dd></div>
			</dl>
		</div>

		<div class="art">
			<div class="frame">
				<img class="loki" src="/images/loki.webp" alt="Loki, maskot LokiTalk, berjongkok sambil membawa sekop dan bibit" width="1000" height="900" />
			</div>
			<div class="tile t1"><Scene kind="tani" slug="tani" /></div>
			<div class="tile t2"><Scene kind="ternak" slug="ternak" /></div>
			<div class="tile t3"><Scene kind="ikan" slug="ikan" /></div>
			<div class="float f1">🌾 Panen naik 30%?</div>
			<div class="float f2">🐟 Air kolam keruh</div>
		</div>
	</div>
</section>

<section class="section" id="forum">
	<div class="container">
		<div class="section-head">
			<div>
				<h2>Pilih forum</h2>
				<p>Setiap forum punya panduan singkat dan ruang tanya jawab sendiri.</p>
			</div>
		</div>
		<div class="fgrid">
			{#each categories as c, i}
				<a class="fcard" class:wide={i === 0} href="/forum/{c.slug}" style="--accent: {c.color}">
					<div class="fimg"><Scene kind={c.scene} slug={c.slug} /></div>
					<div class="fbody">
						<h3>{c.emoji} {c.name}</h3>
						<p>{c.tagline}</p>
						<div class="fmeta">
							<span class="badge">{data.perCategory[c.slug] ?? 0} pertanyaan</span>
							<span class="go">Masuk forum</span>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<section class="section">
	<div class="container two">
		<div>
			<div class="section-head">
				<div>
					<h2>Pertanyaan terbaru</h2>
					<p>Bantu jawab, atau cari yang mirip dengan masalahmu.</p>
				</div>
				<a class="btn btn-ghost btn-sm" href="/cari">Lihat semua</a>
			</div>
			<div class="list">
				{#each data.latest as q (q.id)}
					<QuestionCard {q} />
				{:else}
					<div class="empty">
						<img src="/images/loki.webp" alt="" />
						<h3>Belum ada pertanyaan</h3>
						<p>Jadilah yang pertama bertanya di LokiTalk.</p>
						<a class="btn btn-primary" href="/tanya/baru">Tulis pertanyaan</a>
					</div>
				{/each}
			</div>
		</div>

		<aside class="side">
			<div class="tipcard">
				<h3>Tips hari ini</h3>
				<span class="badge">{data.tipOfDay.cat.emoji} {data.tipOfDay.cat.short}</span>
				<h4>{data.tipOfDay.title}</h4>
				<p>{data.tipOfDay.text}</p>
				<a href="/forum/{data.tipOfDay.cat.slug}" class="more">Tips lainnya di forum ini</a>
			</div>
			<div class="photo-stack">
				<div class="ph ph1"><Scene kind="eco" slug="ramah-lingkungan" /></div>
				<div class="ph ph2"><Scene kind="tani" slug="tani" /></div>
				<p>Foto kebun, kandang, dan kolam kamu bisa dipasang di sini. Lihat README.</p>
			</div>
			<div class="card">
				<h3 style="margin-top:0">Topik ramai</h3>
				<div class="chips">
					{#each categories.flatMap((c) => c.topics.slice(0, 3)) as t}
						<a class="chip" href="/cari?q={encodeURIComponent(t)}">{t}</a>
					{/each}
				</div>
			</div>
		</aside>
	</div>
</section>

<section class="container join">
	<div class="joinbox">
		<div>
			<h2>Punya pengalaman di lapangan?</h2>
			<p>Satu jawabanmu bisa menyelamatkan panen, ternak, atau kolam orang lain.</p>
			<div class="cta">
				<a class="btn btn-sun" href="/daftar">Gabung gratis</a>
				<a class="btn" style="background:rgba(255,255,255,.16);color:#fff" href="/cari?sort=belum">Jawab yang belum terjawab</a>
			</div>
		</div>
		<img src="/images/loki.webp" alt="" class="jloki" />
	</div>
</section>

<style>
	.hero {
		position: relative;
		overflow: hidden;
		padding: 46px 0 70px;
	}
	.blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(6px);
		z-index: 0;
	}
	.b1 {
		width: 520px;
		height: 520px;
		right: -120px;
		top: -140px;
		background: radial-gradient(circle at 30% 30%, #7fe6d2, #14b0a0 70%);
		opacity: 0.35;
	}
	.b2 {
		width: 260px;
		height: 260px;
		left: -80px;
		bottom: -60px;
		background: radial-gradient(circle, #ffe38a, transparent 70%);
		opacity: 0.6;
	}
	.hgrid {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: 1.05fr 0.95fr;
		gap: 40px;
		align-items: center;
	}
	.pill {
		display: inline-block;
		background: #fff;
		border: 1.5px solid var(--t200);
		color: var(--t700);
		font-weight: 700;
		font-size: 0.85rem;
		padding: 6px 14px;
		border-radius: 999px;
		margin-bottom: 16px;
	}
	h1 {
		font-size: clamp(2.5rem, 6vw, 4.4rem);
		margin: 0 0 8px;
		color: var(--t900);
		text-wrap: balance;
	}
	.sub {
		font-family: var(--display);
		font-weight: 800;
		font-size: clamp(1.2rem, 2.4vw, 1.7rem);
		color: var(--t600);
		margin: 0 0 14px;
	}
	.lead {
		max-width: 52ch;
		color: var(--muted);
		font-size: 1.08rem;
	}
	.cta {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
		margin: 22px 0;
	}
	.stats {
		display: flex;
		gap: 12px;
		margin: 26px 0 0;
		flex-wrap: wrap;
	}
	.stats div {
		background: #fff;
		border: 1.5px solid var(--line);
		border-radius: 18px;
		padding: 10px 18px;
		min-width: 104px;
	}
	.stats dt {
		font-family: var(--display);
		font-weight: 800;
		font-size: 1.6rem;
		color: var(--t700);
		line-height: 1.1;
	}
	.stats dd {
		margin: 0;
		font-size: 0.82rem;
		color: var(--muted);
	}

	.art {
		position: relative;
		aspect-ratio: 1 / 1;
		max-width: 520px;
		margin-inline: auto;
		width: 100%;
	}
	.frame {
		position: absolute;
		inset: 6% 8% 6% 8%;
		border-radius: 46% 54% 42% 58% / 52% 44% 56% 48%;
		background: linear-gradient(160deg, #e3fbf5, #b8f0e3);
		border: 4px solid #fff;
		box-shadow: 0 30px 60px -28px rgba(11, 61, 59, 0.55);
		overflow: hidden;
	}
	.loki {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		mix-blend-mode: multiply;
	}
	.tile {
		position: absolute;
		width: 27%;
		aspect-ratio: 1;
		border-radius: 22px;
		overflow: hidden;
		border: 4px solid #fff;
		box-shadow: 0 16px 30px -14px rgba(11, 61, 59, 0.5);
	}
	.t1 {
		left: -2%;
		top: 10%;
		transform: rotate(-7deg);
	}
	.t2 {
		right: -2%;
		top: 30%;
		transform: rotate(6deg);
	}
	.t3 {
		left: 4%;
		bottom: 2%;
		transform: rotate(4deg);
	}
	.float {
		position: absolute;
		background: #fff;
		border-radius: 16px;
		padding: 8px 14px;
		font-weight: 700;
		font-size: 0.85rem;
		color: var(--t800);
		box-shadow: 0 14px 26px -14px rgba(11, 61, 59, 0.55);
		animation: bob 4.5s ease-in-out infinite;
	}
	.f1 {
		right: 4%;
		top: 4%;
	}
	.f2 {
		right: 6%;
		bottom: 8%;
		animation-delay: -2s;
	}
	@keyframes bob {
		50% {
			transform: translateY(-8px);
		}
	}

	/* Forum cards */
	.fgrid {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 18px;
	}
	.fcard {
		grid-column: span 2;
		background: #fff;
		border: 1.5px solid var(--line);
		border-radius: 26px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
	}
	.fcard.wide {
		grid-column: span 4;
		flex-direction: row;
	}
	.fcard:nth-child(2),
	.fcard:nth-child(3) {
		grid-column: span 2;
	}
	.fcard:hover {
		transform: translateY(-4px);
		border-color: var(--accent);
		box-shadow: 0 18px 34px -18px var(--accent);
	}
	.fimg {
		height: 170px;
	}
	.fcard.wide .fimg {
		width: 46%;
		height: auto;
		min-height: 220px;
		flex: none;
	}
	.fbody {
		padding: 18px 20px 20px;
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.fbody h3 {
		margin: 0 0 6px;
		font-size: 1.2rem;
	}
	.fbody p {
		margin: 0 0 14px;
		color: var(--muted);
	}
	.fmeta {
		margin-top: auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.go {
		font-weight: 700;
		color: var(--accent);
	}

	.two {
		display: grid;
		grid-template-columns: 1fr 340px;
		gap: 30px;
		align-items: start;
	}
	.side {
		display: grid;
		gap: 18px;
		position: sticky;
		top: 132px;
	}
	.tipcard {
		background: linear-gradient(160deg, var(--t600), var(--t800));
		color: #e8fffa;
		border-radius: 24px;
		padding: 22px;
	}
	.tipcard h3 {
		margin: 0 0 8px;
		color: #fff;
	}
	.tipcard h4 {
		font-size: 1.1rem;
		margin: 12px 0 4px;
		color: var(--sun);
	}
	.tipcard p {
		margin: 0 0 10px;
	}
	.more {
		font-weight: 700;
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.photo-stack {
		position: relative;
		height: 210px;
	}
	.ph {
		position: absolute;
		border-radius: 22px;
		overflow: hidden;
		border: 4px solid #fff;
		box-shadow: 0 14px 28px -14px rgba(11, 61, 59, 0.5);
	}
	.ph1 {
		width: 62%;
		height: 130px;
		left: 0;
		top: 0;
		transform: rotate(-3deg);
	}
	.ph2 {
		width: 58%;
		height: 120px;
		right: 0;
		top: 40px;
		transform: rotate(4deg);
	}
	.photo-stack p {
		position: absolute;
		bottom: 0;
		margin: 0;
		font-size: 0.8rem;
		color: var(--muted);
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.join {
		margin-top: 20px;
	}
	.joinbox {
		position: relative;
		overflow: hidden;
		background: linear-gradient(120deg, var(--t800), var(--t500));
		color: #fff;
		border-radius: 34px;
		padding: 44px 48px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
	}
	.joinbox h2 {
		font-size: clamp(1.6rem, 3.4vw, 2.4rem);
		margin: 0 0 8px;
	}
	.joinbox p {
		margin: 0;
		max-width: 46ch;
		color: #d5fbf3;
	}
	.jloki {
		height: 250px;
		width: auto;
		margin: -30px 0 -50px;
		border-radius: 30px;
		object-fit: cover;
		aspect-ratio: 1;
		flex: none;
		opacity: 0.98;
	}

	@media (max-width: 980px) {
		.hgrid {
			grid-template-columns: 1fr;
		}
		.two {
			grid-template-columns: 1fr;
		}
		.side {
			position: static;
		}
		.fgrid {
			grid-template-columns: repeat(2, 1fr);
		}
		.fcard,
		.fcard.wide,
		.fcard:nth-child(2),
		.fcard:nth-child(3) {
			grid-column: span 1;
			flex-direction: column;
		}
		.fcard.wide {
			grid-column: span 2;
		}
		.fcard.wide .fimg {
			width: 100%;
			min-height: 0;
			height: 170px;
		}
	}
	@media (max-width: 600px) {
		.fgrid {
			grid-template-columns: 1fr;
		}
		.fcard.wide {
			grid-column: span 1;
		}
		.joinbox {
			padding: 30px 24px;
			flex-direction: column;
			align-items: flex-start;
		}
		.jloki {
			display: none;
		}
		.tile {
			width: 24%;
		}
	}
</style>
