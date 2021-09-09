<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import FiX from 'svelte-icons-pack/fi/FiX';
	import { backOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import Button from './Button.svelte';
	import IconButton from './IconButton.svelte';

	export let visible = false;
	export let okText = 'Godkänn';
	export let cancelText = 'Avbryt';
	export let showOk = true;
	export let showCancel = true;

	const dispatch = createEventDispatcher();

	$: {
		if (typeof window !== 'undefined') {
			if (visible) {
				window.addEventListener('keyup', closeOnEsc);
			} else {
				window.removeEventListener('keyup', closeOnEsc);
			}
		}
	}

	const closeOnEsc = (e: KeyboardEvent) => {
		if (e.key === 'Escape' && visible) {
			close();
		}
	};

	const close = () => {
		dispatch('close');
	};

	const pop = (_: HTMLDivElement, { duration }: { duration?: number } = {}) => {
		return {
			duration,
			css: (t: number) => {
				const scale = backOut(t);

				return `
					--scale: ${scale};
					--opacity: ${t}`;
			}
		};
	};
</script>

{#if visible}
	<div class="modal-overlay" transition:fade={{ duration: 300 }} on:click={close} />
	<div class="modal" transition:pop={{ duration: 300 }}>
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
{/if}

<style lang="scss">
	@use '../../styles/colors';
	@use '../../styles/sizing';

	$padding: sizing.$spacing * 4;

	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.3);
	}

	.modal {
		--scale: 1;
		--opacity: 1;
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
		opacity: var(--opacity);
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
