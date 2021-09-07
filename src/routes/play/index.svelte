<script lang="ts">
	import { onMount } from 'svelte';

	let modes = [];
	let isLoading = false;

	onMount(async () => {});
</script>

<div class="games-selector">
	{#each modes as mode}
		<div class="game-mode">
			{JSON.stringify(mode)}
		</div>
	{/each}
</div>

<style>
	/* your styles go here */
</style>
