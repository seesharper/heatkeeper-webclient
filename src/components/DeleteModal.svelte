<script lang="ts">
	import { DeleteButton } from '$lib/components';
	import { Modal, Button } from 'flowbite-svelte';
	export let title = '';
	export let handleDelete = async () => {};
	let showDeleteModal = false;
</script>

<DeleteButton on:click={() => (showDeleteModal = true)} />
<Modal {title} bind:open={showDeleteModal} autoclose>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		<slot />
	</p>
	<svelte:fragment slot="footer">
		<Button on:click={async () => await handleDelete()}>I accept</Button>
		<Button color="alternative">Decline</Button>
	</svelte:fragment>
</Modal>
