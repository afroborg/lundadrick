<script lang="ts">
	import { config } from '@/config';
	import { getAsync, postAsync } from '@/helpers/request.helper';
	import type { Stripe, StripeCardElement, StripeElements } from '@stripe/stripe-js';
	import { loadStripe } from '@stripe/stripe-js/pure.js';
	import { onDestroy, onMount } from 'svelte';
	import FiCopy from 'svelte-icons-pack/fi/FiCopy';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import ImSpinner8 from 'svelte-icons-pack/im/ImSpinner8';
	import Button from './layout/Button.svelte';
	import IconButton from './layout/IconButton.svelte';

	let stripe: Stripe;
	let card: HTMLDivElement;
	let secret: string;
	let paymentId: string;
	let elements: StripeElements;
	let cardElement: StripeCardElement;

	let isLoading = false;
	let password: string | null = null;

	let withCode = false;
	let code = '';

	onMount(async () => {
		await initStripe();
	});

	onDestroy(async () => {
		await cancelIntent();
	});

	const toggleCode = async () => {
		withCode = !withCode;
	};

	const cancelIntent = async () => {
		if (!password) {
			await postAsync(`payments/intent/${paymentId}/cancel`, null, {
				query: { cancellation_reason: 'abandoned' }
			});
		}
	};

	const initStripe = async () => {
		stripe = await loadStripe(config.STRIPE_API_KEY);
		elements = stripe.elements();
		secret = await createIntent();

		cardElement = elements.create('card');
		cardElement.mount(card);
	};

	const createIntent = async () => {
		const intent = await postAsync<{ secret: string; id: string }>('payments/intent');
		paymentId = intent.id;
		return intent.secret;
	};

	const validatePayment = async (id: string) => {
		const resp = await getAsync<{ token: string; expires: number }>(`payments/validate`, {
			query: { id }
		});

		return resp;
	};

	const confirmPayment = async () => {
		isLoading = true;
		if (!secret) {
			return;
		}

		const payload = await stripe.confirmCardPayment(secret, {
			payment_method: {
				card: elements.getElement('card')
			}
		});

		if (payload.error) {
			// TODO: Handle error
			isLoading = false;
			return;
		}

		const { token } = await validatePayment(payload.paymentIntent.id);

		if (token != null) {
			localStorage.setItem(config.LOCALSTORAGE_KEY, token);
			password = token;
		}
	};

	$: btnDisabled = !stripe || !secret;
</script>

<div class="payment-container">
	{#if !password}
		<h3>Betala för att fortsätta</h3>
		<p>För 10kr får du access i 24h</p>

		<!-- {#if !withCode} -->
		<div class="input" bind:this={card}>
			<Icon src={ImSpinner8} className="btn-spinner" />
			<span class="loading-text">Laddar betalning</span>
		</div>
		<!-- {:else}
			<input class="discount-code-input" placeholder="Kod" type="text" bind:value={code} />
		{/if} -->

		<p class="discount-text" on:click={toggleCode}>
			{withCode ? 'Tillbaka till betalning' : 'Jag har en kod'}
		</p>

		<Button
			block
			on:click={confirmPayment}
			{isLoading}
			disabled={btnDisabled}
			loadingText="Validerar betalning">Betala</Button
		>

		<p class="stripe-info">
			Betalningen sköts via <a href="https://stripe.com/" target="_blank">Stripe</a>
		</p>
	{:else}
		<h3>Tack för din betalning</h3>
		<p>Ditt lösenord, giltigt i 24h är:</p>

		<div class="pwd-container">
			<span>{password}</span>

			<IconButton icon={FiCopy} title="Klicka för att kopiera" size="1.3em" />
		</div>

		<Button href="/play" block>Börja spela!</Button>
	{/if}
</div>

<style lang="scss">
	@use '../styles/sizing';
	@use '../styles/colors';
	@use 'sass:math';

	.input {
		margin-top: sizing.$spacing * 4;
	}

	.stripe-info {
		font-size: 0.8em;
		margin-top: sizing.$spacing;
		text-align: right;
	}

	.discount-text {
		margin: sizing.$spacing * 2 0;
		font-size: 0.85em;
		opacity: 0.8;
	}

	// .discount-code-input {
	// 	margin-top: sizing.$spacing * 2;
	// 	height: 40px;
	// 	width: 100%;
	// 	background: colors.$gray-primary;
	// 	border: none;
	// 	border: 1px solid colors.$gray-primary;
	// 	padding: sizing.$spacing;
	// 	border-radius: math.div(sizing.$spacing, 2);

	// 	&:focus {
	// 		outline: none;
	// 		border-color: colors.$dark-primary;
	// 	}
	// }

	.pwd-container {
		background: colors.$gray-primary;
		border-radius: sizing.$spacing;
		margin: sizing.$spacing * 2 0;
		padding: sizing.$spacing * 2;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.loading-text {
		margin-left: sizing.$spacing;
	}
</style>
