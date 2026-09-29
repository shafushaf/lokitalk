<div class="auth">
	<div class="art">
		<img src="/images/lokitalk-logo.webp" alt="LokiTalk" class="logo" />
		<div class="frame"><img src="/images/loki.webp" alt="Loki, maskot LokiTalk" /></div>
		<p><slot name="quote" /></p>
	</div>
	<div class="formside"><slot /></div>
</div>

<style>
	.auth {
		width: min(1000px, 100% - 32px);
		margin: 40px auto 0;
		display: grid;
		grid-template-columns: 1fr 1fr;
		background: #fff;
		border: 1.5px solid var(--line);
		border-radius: 34px;
		overflow: hidden;
		box-shadow: 0 30px 60px -36px rgba(11, 61, 59, 0.5);
	}
	.art {
		background: linear-gradient(160deg, #dffaf3, #a9eddd);
		padding: 26px;
		display: grid;
		justify-items: center;
		align-content: center;
		gap: 10px;
		text-align: center;
	}
	.logo {
		width: 200px;
		mix-blend-mode: multiply;
	}
	.frame {
		width: min(340px, 100%);
		aspect-ratio: 1;
		border-radius: 42% 58% 46% 54% / 50% 44% 56% 50%;
		overflow: hidden;
		border: 4px solid #fff;
		background: #e6fbf6;
	}
	.frame img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		mix-blend-mode: multiply;
	}
	.art p {
		margin: 0;
		font-family: var(--display);
		font-weight: 800;
		font-size: 1.25rem;
		color: var(--t800);
		max-width: 24ch;
	}
	.formside {
		padding: 40px 38px;
		align-self: center;
	}
	@media (max-width: 800px) {
		.auth {
			grid-template-columns: 1fr;
		}
		.art {
			display: none;
		}
		.formside {
			padding: 28px 22px;
		}
	}
</style>
