<script lang="ts">
	import Button from '@/components/layout/Button.svelte';
	import { onMount } from 'svelte';

	let questions = ['ätit en snorkråka'];

	onMount(async () => {
		// questions = await getAsync('games/never');
	});

	$: hasQuestions = questions.length > 0;

	const nextQuestion = (curr: string) => () => {
		// Remove current question
		questions = questions.filter((q) => q != curr);
	};

	$: question = questions[0];
</script>

<div class="never-container">
	{#if hasQuestions}
		<div class="question-wrapper" on:click={nextQuestion(question)}>
			<h2>Jag har aldrig</h2>
			<p>
				{question}
			</p>
			<span class="helper-text"> Tryck var som helst för att gå vidare </span>
		</div>
	{:else}
		<div class="empty">
			<p>Där var tyvärr frågorna slut</p>

			<Button href="/play">Gå tillbaka hem</Button>
		</div>
	{/if}
</div>

<style lang="scss">
	@use '../../styles/colors';
	@use '../../styles/sizing';

	.never-container {
		height: 100%;
		width: 100%;
		color: colors.$light-primary;
		display: flex;
		align-items: center;
		text-align: center;
	}

	.question-wrapper,
	.empty {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0 sizing.$spacing * 2;

		&.question-wrapper {
			cursor: pointer;
		}
	}

	h2 {
		font-size: 1.4em;
		font-weight: normal;
	}

	p {
		font-size: 2em;
		font-weight: bold;
		margin: sizing.$spacing * 2;
		word-break: break-word;
	}

	span {
		font-size: 0.8em;
		font-style: italic;
		opacity: 0.7;
	}
</style>
