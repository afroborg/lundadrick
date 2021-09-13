<script>
	import FiInfo from 'svelte-icons-pack/fi/FiInfo';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import Modal from './Modal.svelte';

	const questionAuthors = [
		{
			name: 'Alexandra Wallin',
			url: null
		},
		{
			name: 'Elin Lundqvist',
			url: null
		}
	];

	const developers = [
		{
			name: 'Axel Froborg',
			url: 'https://axel.froborg.com'
		}
	];

	let showModal = false;

	const toggleModal = () => {
		showModal = !showModal;
	};
</script>

<footer>
	<button on:click={toggleModal}>
		<Icon src={FiInfo} title="Info" className="info-icon" />
		<span>Mer info</span>
	</button>
</footer>

<Modal visible={showModal} showOk={false} cancelText="Stäng" on:close={toggleModal}>
	<h2>KLundka</h2>
	<h3>Drick som en äkta lundastudent</h3>
	<p>Byggt med ❤️ och 🍺 i Lund</p>

	<div class="creds-container">
		<h3>Frågor</h3>
		{#each questionAuthors as { name, url }}
			<a href={url} target="_blank">{name}</a>
		{/each}

		<h3>Programmering</h3>
		{#each developers as { name, url }}
			<a href={url} target="_blank">{name}</a>
		{/each}
	</div>
</Modal>

<style lang="scss">
	@use '../../styles/colors';
	@use '../../styles/sizing';

	footer {
		height: 100%;
		display: flex;
		align-items: center;
		padding: 0 sizing.$spacing * 2;
		font-size: 0.9em;

		button {
			outline: none;
			background: none;
			border: none;
			display: flex;
			gap: sizing.$spacing;
			color: white;
			cursor: pointer;

			:global(.info-icon) {
				color: white;
			}
		}
	}

	.creds-container {
		margin-top: sizing.$spacing;
	}

	h3,
	p,
	a {
		font-size: 0.9em;
		color: inherit;
		display: block;
	}

	h3 {
		margin-top: sizing.$spacing;
	}
</style>
