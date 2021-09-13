<script lang="ts">
	import { onMount } from 'svelte';

	let modes = [
		{
			name: 'Jag har aldrig',
			href: '/play/never'
		},
		{
			name: 'Pekleken',
			href: '/play/point'
		}
	];

	onMount(async () => {});
</script>

<div class="play-container">
	<h1>Vad vill du spela?</h1>
	<div class="games-selector">
		{#each modes as { name, href }}
			<a class="game-mode" {href}>
				<h4>{name}</h4>
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	@use '../../styles/colors';
	@use '../../styles/sizing';
	@use 'sass:math';

	.play-container {
		width: 100%;
		padding: 0 sizing.$spacing * 4;
	}

	h1 {
		margin: sizing.$spacing * 4 0;
		text-align: center;
		color: colors.$light-primary;
	}

	.games-selector {
		width: 100%;
	}
	.game-mode {
		display: block;
		color: colors.$dark-primary;
		background: transparentize(colors.$light-primary, 0.05);
		padding: sizing.$spacing * 2;
		margin-bottom: sizing.$spacing * 2;
		border-radius: math.div(sizing.$spacing, 2);
		cursor: pointer;
	}
</style>
