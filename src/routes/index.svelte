<script lang="ts">
	import Button from '@/components/layout/Button.svelte';
	import IconButton from '@/components/layout/IconButton.svelte';
	import Modal from '@/components/layout/Modal.svelte';
	import Payment from '@/components/Payment.svelte';
	import FiCopy from 'svelte-icons-pack/fi/FiCopy';

	let showPaymentModal = false;
	let password: string;

	const checkForToken = () => {
		showPaymentModal = true;
	};

	const closeModal = () => {
		showPaymentModal = false;
	};
</script>

<div class="welcome-container">
	<h1>Öka din promille</h1>
	<h2>med Lundadrick</h2>

	<div class="btn-container">
		<Button on:click={checkForToken}>Häng med!</Button>
	</div>
</div>

<Modal visible={showPaymentModal} showOk={false} showCancel={false} on:close={closeModal}>
	{#if password == null}
		<h3>Betala för att fortsätta</h3>
		<p>För 10kr får du access i 24h</p>

		{#if showPaymentModal}
			<Payment bind:password />
		{/if}
	{:else}
		<h3>Tack för din betalning</h3>
		<p>Ditt lösenord, giltigt i 24h är:</p>
		<div class="pwd-container">
			<span>{password}</span>

			<IconButton icon={FiCopy} title="Klicka för att kopiera" size="1.3em" />
		</div>

		<Button href="/play" block>Börja spela!</Button>
	{/if}
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
		margin-top: sizing.$spacing * 4;
	}

	.pwd-container {
		background: colors.$gray-primary;
		border-radius: sizing.$spacing;
		margin: sizing.$spacing * 2 0;
		padding: sizing.$spacing * 2;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
