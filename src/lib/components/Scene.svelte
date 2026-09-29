<script>
	// Ilustrasi vektor tiap forum. Jika ada foto di /photos/<slug>.jpg, foto itu tampil di atasnya.
	export let kind = 'tani';
	export let slug = '';
	let photoOk = true;
</script>

<div class="scene">
	<svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
		<defs>
			<linearGradient id="sky-{kind}" x1="0" y1="0" x2="0" y2="1">
				{#if kind === 'ikan'}
					<stop offset="0" stop-color="#8fe3f0" /><stop offset="1" stop-color="#1e88c9" />
				{:else if kind === 'forum'}
					<stop offset="0" stop-color="#36c9b4" /><stop offset="1" stop-color="#0b6f6a" />
				{:else}
					<stop offset="0" stop-color="#bff3ea" /><stop offset="1" stop-color="#effcf6" />
				{/if}
			</linearGradient>
		</defs>
		<rect width="400" height="260" fill="url(#sky-{kind})" />

		{#if kind === 'tani'}
			<circle cx="315" cy="60" r="34" fill="#ffd95a" />
			<circle cx="315" cy="60" r="50" fill="#ffd95a" opacity=".25" />
			<path d="M0 150 Q100 100 210 140 T400 120 V260 H0Z" fill="#7fd6a0" />
			<path d="M0 185 Q120 140 240 175 T400 160 V260 H0Z" fill="#3fb47a" />
			{#each [0, 1, 2, 3] as row}
				{#each Array(14) as _, i}
					<g transform="translate({20 + i * 28 + row * 8} {200 + row * 14})">
						<path d="M0 10 V0" stroke="#0f6b4c" stroke-width="2" />
						<path d="M0 3 Q-8 -2 -9 -8 Q-1 -7 0 3Z" fill="#a6f0b8" />
						<path d="M0 5 Q8 0 9 -6 Q1 -5 0 5Z" fill="#c9ffd5" />
					</g>
				{/each}
			{/each}
		{:else if kind === 'ternak'}
			<circle cx="70" cy="55" r="28" fill="#ffd95a" />
			<path d="M0 160 Q120 110 250 150 T400 135 V260 H0Z" fill="#8fdc9a" />
			<path d="M0 200 Q150 165 400 190 V260 H0Z" fill="#54bb70" />
			<rect x="255" y="95" width="105" height="80" fill="#e0693f" />
			<path d="M245 100 L307 55 L370 100Z" fill="#a8452a" />
			<rect x="292" y="125" width="30" height="50" fill="#fbe6cf" />
			<path d="M292 125 L322 175 M322 125 L292 175" stroke="#a8452a" stroke-width="3" />
			<g stroke="#f4e7cf" stroke-width="5" stroke-linecap="round">
				<path d="M0 190 H240" /><path d="M0 208 H240" />
				{#each [15, 75, 135, 195] as x}<path d="M{x} 178 V222" />{/each}
			</g>
			<g transform="translate(95 150)">
				<ellipse cx="45" cy="30" rx="42" ry="24" fill="#fff" />
				<ellipse cx="30" cy="24" rx="11" ry="8" fill="#2c3b3a" />
				<ellipse cx="60" cy="38" rx="9" ry="7" fill="#2c3b3a" />
				<rect x="18" y="46" width="8" height="24" rx="3" fill="#fff" />
				<rect x="62" y="46" width="8" height="24" rx="3" fill="#fff" />
				<rect x="-14" y="6" width="34" height="30" rx="14" fill="#fff" />
				<ellipse cx="-4" cy="28" rx="10" ry="7" fill="#ffb7a5" />
				<circle cx="-2" cy="14" r="2.4" fill="#2c3b3a" />
				<path d="M-12 4 L-18 -4 M18 4 L24 -4" stroke="#f0c98a" stroke-width="4" stroke-linecap="round" />
			</g>
		{:else if kind === 'ikan'}
			<path d="M0 60 Q50 45 100 60 T200 60 T300 60 T400 60 V0 H0Z" fill="#dff8fb" opacity=".9" />
			<path d="M0 90 Q50 75 100 90 T200 90 T300 90 T400 90 V260 H0Z" fill="#ffffff" opacity=".12" />
			<path d="M0 220 Q60 200 130 225 T260 215 T400 225 V260 H0Z" fill="#0f6aa6" opacity=".6" />
			<g transform="translate(110 120)">
				<ellipse cx="0" cy="0" rx="46" ry="26" fill="#ff9d4d" />
				<path d="M40 0 L72 -22 L72 22Z" fill="#ff7a2f" />
				<path d="M-6 -24 Q10 -44 26 -22Z" fill="#ff7a2f" />
				<circle cx="-24" cy="-6" r="5" fill="#fff" /><circle cx="-25" cy="-6" r="2.4" fill="#123" />
				<path d="M-2 -18 Q6 0 -2 18" stroke="#fff" stroke-width="4" fill="none" opacity=".7" />
			</g>
			<g transform="translate(270 170) scale(.7)">
				<ellipse cx="0" cy="0" rx="46" ry="26" fill="#ffe27a" />
				<path d="M-40 0 L-72 -22 L-72 22Z" fill="#ffc93c" />
				<circle cx="24" cy="-6" r="5" fill="#fff" /><circle cx="25" cy="-6" r="2.4" fill="#123" />
			</g>
			{#each [[190, 90, 6], [200, 68, 4], [186, 50, 3], [330, 120, 5], [340, 96, 3]] as [x, y, r]}
				<circle cx={x} cy={y} r={r} fill="none" stroke="#fff" stroke-width="2" opacity=".8" />
			{/each}
		{:else if kind === 'eco'}
			<circle cx="90" cy="55" r="26" fill="#ffd95a" />
			<path d="M0 180 Q150 140 400 175 V260 H0Z" fill="#6cc46a" />
			<path d="M0 215 Q200 190 400 215 V260 H0Z" fill="#3c9a4c" />
			<rect x="232" y="105" width="18" height="80" rx="6" fill="#8a5a36" />
			<circle cx="241" cy="90" r="46" fill="#3fae5a" />
			<circle cx="212" cy="112" r="30" fill="#55c46c" />
			<circle cx="272" cy="112" r="30" fill="#2f9a4c" />
			<g transform="translate(96 150)" fill="none" stroke="#0f7a55" stroke-width="7" stroke-linecap="round">
				<path d="M-32 -6 A34 34 0 0 1 22 -26" />
				<path d="M34 8 A34 34 0 0 1 -6 34" />
				<path d="M-24 26 A34 34 0 0 1 -34 -4" />
			</g>
			<g fill="#0f7a55">
				<path d="M22 -34 L38 -22 L18 -14Z" transform="translate(96 150)" />
				<path d="M-16 40 L-28 26 L-6 24Z" transform="translate(96 150)" />
				<path d="M-40 4 L-28 -10 L-22 8Z" transform="translate(96 150)" />
			</g>
			<g transform="translate(330 205)"><path d="M0 12 V0" stroke="#0f6b4c" stroke-width="3" /><path d="M0 4 Q-14 -2 -15 -14 Q-1 -12 0 4Z" fill="#a6f0b8" /><path d="M0 6 Q13 0 15 -10 Q2 -8 0 6Z" fill="#c9ffd5" /></g>
		{:else}
			<circle cx="60" cy="210" r="90" fill="#fff" opacity=".07" />
			<circle cx="350" cy="50" r="70" fill="#fff" opacity=".08" />
			<g>
				<rect x="50" y="50" width="180" height="76" rx="22" fill="#fff" />
				<path d="M80 126 L72 152 L108 126Z" fill="#fff" />
				<rect x="72" y="70" width="110" height="10" rx="5" fill="#36c9b4" />
				<rect x="72" y="92" width="80" height="10" rx="5" fill="#b7efe5" />
			</g>
			<g>
				<rect x="170" y="150" width="185" height="76" rx="22" fill="#ffd95a" />
				<path d="M330 226 L344 250 L302 226Z" fill="#ffd95a" />
				<rect x="192" y="170" width="120" height="10" rx="5" fill="#a3720c" opacity=".55" />
				<rect x="192" y="192" width="84" height="10" rx="5" fill="#a3720c" opacity=".3" />
			</g>
		{/if}
	</svg>
	{#if slug && photoOk}
		<img class="photo" src="/photos/{slug}.jpg" alt="" loading="lazy" on:error={() => (photoOk = false)} />
	{/if}
</div>

<style>
	.scene {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	svg,
	.photo {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
	.photo {
		object-fit: cover;
	}
</style>
