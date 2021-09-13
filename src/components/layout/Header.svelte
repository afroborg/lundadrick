<script lang="ts">
	import { questions, totalNbrOfQuestions } from '@/stores/questions-store';

	$: length = $questions.length;
	$: scale = 1 - length / $totalNbrOfQuestions ?? 0;
</script>

<header>
	<div class="logo-container" />
	{#if length}
		<div class="progress-container">
			<div class="progress-indicator" style={`--scale:${scale};`} />
			<div class="progress-counter">
				{Math.abs(length - $totalNbrOfQuestions - 1)} / {$totalNbrOfQuestions}
			</div>
		</div>
	{/if}
</header>

<style lang="scss">
	@use '../../styles/sizing';
	@use '../../styles/colors';

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 sizing.$spacing * 2;
	}

	.progress-container {
		width: min(30vw, 200px);
		height: 20px;
		background: colors.$gray-primary;
		border-radius: 99px;
		overflow: hidden;
		position: relative;
	}

	.progress-indicator {
		--scale: 0.5;
		width: 100%;
		height: 100%;
		background: colors.$pink-primary;
		transform: scaleX(var(--scale));
		transform-origin: left;
		transition: transform 100ms linear;
	}

	.progress-counter {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 0.8em;
		font-weight: bold;
	}
</style>
