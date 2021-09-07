<script lang="ts">
	import { config } from '@/config';
	import { getAsync, postAsync } from '@/helpers/request.helper';
	import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
	import { onMount } from 'svelte';
	import Button from './layout/Button.svelte';

	export let password: string;

	let stripe: Stripe;
	let card: HTMLDivElement;
	let secret: string;
	let elements: StripeElements;

	let isLoading = false;

	onMount(() => {
		initStripe();
	});

	const initStripe = async () => {
		stripe = await loadStripe(config.STRIPE_API_KEY);
		secret = await createIntent();
		elements = stripe.elements();

		const cardElement = elements.create('card');
		cardElement.mount(card);
	};

	const createIntent = async () => {
		const intent = await postAsync<{ secret: string }>('payments/intent');
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
			localStorage.setItem('ld-token', token);
			password = token;
		}
	};

	$: btnDisabled = !stripe || !secret;
</script>

<div class="payment-container">
	<div class="input" bind:this={card} />
	<Button block on:click={confirmPayment} {isLoading} disabled={btnDisabled}>Betala</Button>
	<p>Betalningen sköts via <a href="https://stripe.com/" target="_blank">Stripe</a></p>
</div>

<style lang="scss">
	@use '../styles/sizing';

	.input {
		margin: sizing.$spacing * 4 0;
	}

	p {
		font-size: 0.8em;
		margin-top: sizing.$spacing;
		text-align: right;
	}
</style>
