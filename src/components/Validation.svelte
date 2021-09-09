<script lang="ts">
	import { goto } from '$app/navigation';
	import { config } from '@/config';
	import { getAsync } from '@/helpers/request.helper';
	import Icon from 'svelte-icons-pack';
	import FiCreditCard from 'svelte-icons-pack/fi/FiCreditCard';
	import FiUnlock from 'svelte-icons-pack/fi/FiUnlock';
	import Button from './layout/Button.svelte';
	import Payment from './Payment.svelte';

	const selections = [
		{
			icon: FiUnlock,
			label: 'Japp',
			step: 2
		},
		{
			icon: FiCreditCard,
			label: 'Nej',
			step: 1
		}
	];

	let step = 0;

	let code = '';

	const setStep = (s: number) => () => {
		step = s;
	};

	const validateCode = () => {
		if (!code) {
			return;
		}

		getAsync('password/validate', { headers: { 'x-ld-pw': code } })
			.then(() => {
				localStorage.setItem(config.LOCALSTORAGE_KEY, code);
				goto('/play');
			})
			.catch(() => {
				console.log('err');
			});
	};
</script>

<div>
	<!-- Selection -->
	{#if step === 0}
		<h3>Har du en kod?</h3>

		<div class="selections-container">
			{#each selections as { icon, label, step }}
				<div class="selection-box" on:click={setStep(step)}>
					<Icon src={icon} size="1.5em" />
					<span>{label}</span>
				</div>
			{/each}
		</div>

		<!-- Payment -->
	{:else if step === 1}
		<Payment />

		<!-- Code input -->
	{:else}
		<form on:submit|preventDefault={validateCode}>
			<h3>Skriv in din kod</h3>
			<input type="text" bind:value={code} class="discount-code-input" placeholder="Kod" />
			<div class="btn-container">
				<Button block on:click={validateCode}>Kontrollera</Button>
			</div>
		</form>
	{/if}
</div>

<style lang="scss">
	@use '../styles/colors';
	@use '../styles/sizing';
	@use 'sass:math';

	.selections-container {
		display: flex;
		gap: sizing.$spacing * 2;
		margin-top: sizing.$spacing * 3;
	}

	.selection-box {
		width: 100%;
		height: 100px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		background: colors.$pink-primary;
		border-radius: sizing.$spacing;
		padding: sizing.$spacing;
		color: white;
		font-weight: bold;
		gap: sizing.$spacing;
		transition: background 100ms;

		&:focus,
		&:hover {
			background: colors.$purple-primary;
		}
	}

	.discount-code-input {
		margin-top: sizing.$spacing * 2;
		height: 40px;
		width: 100%;
		background: colors.$gray-primary;
		border: none;
		border: 1px solid colors.$gray-primary;
		padding: sizing.$spacing;
		border-radius: math.div(sizing.$spacing, 2);

		&:focus {
			outline: none;
			border-color: colors.$dark-primary;
		}
	}

	.btn-container {
		margin-top: sizing.$spacing * 2;
	}
</style>
