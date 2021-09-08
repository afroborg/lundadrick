<script lang="ts">
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import ImSpinner8 from 'svelte-icons-pack/im/ImSpinner8';

	export let type = 'primary';
	export let block = false;
	export let isLoading = false;
	export let disabled = false;
	export let href: string = null;

	$: blank = href && href.startsWith('http');
</script>

{#if href}
	<a {href} target={blank ? '_blank' : '_self'} class="btn" {disabled} class:block on:click>
		<span>
			{#if isLoading}
				<Icon src={ImSpinner8} className="btn-spinner" />
			{:else}
				<slot />
			{/if}
		</span>
	</a>
{:else}
	<button class="btn" {disabled} class:block on:click>
		<span>
			{#if isLoading}
				<Icon src={ImSpinner8} className="btn-spinner" />
			{:else}
				<slot />
			{/if}
		</span>
	</button>
{/if}

<style lang="scss">
	@use '../../styles/colors';
	@use '../../styles/sizing';
	@use '../../styles/keyframes';
	@use "sass:math";

	button,
	a {
		background: colors.$pink-primary;
		border: none;
		outline: none;
		padding: sizing.$spacing sizing.$spacing * 4;
		border-radius: math.div(sizing.$spacing, 2);
		overflow: hidden;
		border: 2px solid transparent;
		color: black;
		display: block;
		text-align: center;
		width: fit-content;

		span {
			font-size: 1rem;
			font-weight: bold;
		}

		&.block {
			width: 100%;
		}

		&:hover,
		&:focus {
			border-color: lighten(colors.$pink-primary, 20);
		}
	}
	:global(.btn-spinner) {
		animation: rotate 1s linear infinite;
	}
</style>
