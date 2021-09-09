<script>
	import FiInfo from 'svelte-icons-pack/fi/FiInfo';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import Modal from './Modal.svelte';

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
	<h2>Lundadrick</h2>
	<p>Byggt med ❤️ och 🍺 i Lund</p>

	<div class="creds-container">
		<h3>Programmering</h3>
		<a href="https://axel.froborg.com" target="_blank">Axel Froborg</a>

		<h3>Frågor</h3>
		<p>Alexandra Wallin</p>
		<p>Elin Lundqvist</p>
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
	}

	h3 {
		margin-top: sizing.$spacing;
	}
</style>
