<script lang="ts">
	import Icon from 'svelte-icons-pack/Icon.svelte';

	export let title: string;
	export let size = '1em';
	export let icon: any;
</script>

<button on:click>
	<Icon src={icon} {size} {title} />
</button>

<style lang="scss">
	button {
		outline: none;
		border: none;
		background: none;
		height: 2em;
		width: 2em;
		border-radius: 50%;
		display: grid;
		place-items: center;
		cursor: pointer;

		&:hover {
			background: #eee;
		}
	}
</style>
