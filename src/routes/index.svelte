<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '@/components/layout/Button.svelte';
	import Modal from '@/components/layout/Modal.svelte';
	import Payment from '@/components/Payment.svelte';
	import { getAsync } from '@/helpers/request.helper';

	let showPaymentModal = false;
	let isValidating = false;

	const checkForToken = async () => {
		isValidating = true;
		try {
			await getAsync<void>('password/validate');
			goto('/play');
		} catch {
			showPaymentModal = true;
		}
		isValidating = false;
	};

	const closeModal = () => {
		showPaymentModal = false;
	};
</script>

<div class="welcome-container">
	<h1>Öka din promille</h1>
	<h2>med Lundadrick</h2>

	<div class="btn-container">
		<Button on:click={checkForToken} isLoading={isValidating} loadingText="Validerar"
			>Häng med!</Button
		>
	</div>
</div>

<Modal visible={showPaymentModal} showOk={false} showCancel={false} on:close={closeModal}>
	<Payment />
</Modal>

<style lang="scss">
	@use '../styles/colors';
	@use '../styles/sizing';

	h1,
	h2 {
		color: colors.$light-primary;
	}

	h2 {
		font-size: 1.4em;
		font-weight: normal;
	}

	.welcome-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.btn-container {
		margin-top: sizing.$spacing * 2;
	}
</style>
