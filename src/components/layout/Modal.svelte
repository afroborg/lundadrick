<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import FiX from 'svelte-icons-pack/fi/FiX';
	import Button from './Button.svelte';
	import IconButton from './IconButton.svelte';

	export let visible = false;
	export let okText = 'Godkänn';
	export let cancelText = 'Avbryt';
	export let showOk = true;
	export let showCancel = true;

	const dispatch = createEventDispatcher();

	const close = () => {
		dispatch('close');
	};
</script>

<div class="modal" class:visible>
	<div class="modal-header">
		<IconButton on:click={close} icon={FiX} title="Close modal" size="1.5em" />
	</div>
	<slot />

	{#if showOk || showCancel}
		<div class="modal-footer">
			{#if showCancel}
				<Button on:click={close}>{cancelText}</Button>
			{/if}

			{#if showOk}
				<Button>{okText}</Button>
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	@use '../../styles/colors';
	@use '../../styles/sizing';

	$padding: sizing.$spacing * 4;

	.modal {
		--scale: 0.85;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(var(--scale));
		background: colors.$light-primary;
		padding: $padding;
		width: min(80%, 500px);
		border-radius: sizing.$spacing;
		display: flex;
		flex-direction: column;
		transition: all 100ms linear;
		opacity: 0;
		pointer-events: none;

		&.visible {
			--scale: 1;
			opacity: 1;
			pointer-events: all;
			transition-timing-function: cubic-bezier(0, 0, 0.3, 2.35);
			transition-duration: 300ms;
		}
	}

	.modal-header {
		display: flex;
		justify-content: flex-end;
		position: absolute;
		top: $padding;
		right: $padding;
	}

	.modal-footer {
		margin-top: auto;
		display: flex;
		justify-content: flex-end;
	}
</style>
