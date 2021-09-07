<script></script>

<div class="page-wrapper">
	<main class="content-container">
		<slot />
	</main>
</div>

<style lang="scss">
	@use '../styles/colors';

	@import url('https://fonts.googleapis.com/css2?family=Signika+Negative:wght@400;700&display=swap');

	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		font-family: 'Signika Negative', sans-serif;
	}

	:global(a) {
		text-decoration: none;
		color: colors.$pink-primary;

		&:hover,
		&:focus {
			color: colors.$purple-primary;
		}
	}

	.page-wrapper {
		height: 100vh;
		width: 100%;
		display: grid;
		overflow: hidden;
	}

	.content-container {
		height: 100%;
		width: 100%;
		display: grid;
		place-items: center;
		background: colors.$purple-primary;
	}
</style>
