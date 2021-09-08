<script lang="ts">
	import Button from '@/components/layout/Button.svelte';
	import { getAsync } from '@/helpers/request.helper';
	import { onMount } from 'svelte';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import ImSpinner8 from 'svelte-icons-pack/im/ImSpinner8';

	let questions = [];
	let isLoading = false;

	onMount(async () => {
		isLoading = true;
		const { questions: response } = await getAsync('games/nhie/questions');
		questions = response;
		isLoading = false;
	});

	$: hasQuestions = questions.length > 0;

	const nextQuestion = (curr: string) => () => {
		// Remove current question
		questions = questions.filter((q) => q != curr);
	};

	$: question = questions[0];
</script>

<div class="never-container">
	{#if isLoading}
		<div class="loading">
			<Icon src={ImSpinner8} className="loading-icon" />
			<p class="question-text loading-text">Laddar frågor...</p>
		</div>
	{:else if hasQuestions}
		<div class="question-wrapper" on:click={nextQuestion(question)}>
			<h2 class="nhie-text">Jag har aldrig</h2>
			<p class="question-text">
				{question}
			</p>
			<span class="helper-text"> Tryck var som helst för att gå vidare </span>
		</div>
	{:else}
		<div class="empty">
			<p class="question-text">Där var tyvärr frågorna slut</p>

			<Button href="/play">Gå tillbaka hem</Button>
		</div>
	{/if}
</div>

<style lang="scss">
	@use '../../styles/colors';
	@use '../../styles/sizing';
	@use '../../styles/keyframes';

	.never-container {
		height: 100%;
		width: 100%;
		color: colors.$light-primary;
		display: flex;
		align-items: center;
		text-align: center;
	}

	.question-wrapper,
	.empty,
	.loading {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0 sizing.$spacing * 2;
	}

	.question-wrapper {
		cursor: pointer;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
	}

	.loading-text {
		font-size: 1.4rem;
	}

	:global(.loading-icon) {
		font-size: 2em;
		animation: rotate 1s linear infinite;

		:global(path) {
			fill: colors.$light-primary;
		}
	}

	.nhie-text {
		font-size: 1.4em;
		font-weight: normal;
	}

	.question-text {
		font-size: 2em;
		font-weight: bold;
		margin: sizing.$spacing * 2;
		word-break: break-word;
	}

	.helper-text {
		font-size: 0.8em;
		font-style: italic;
		opacity: 0.7;
	}

	.helper-text,
	.nhie-text,
	.question-text {
		user-select: none;
	}
</style>
