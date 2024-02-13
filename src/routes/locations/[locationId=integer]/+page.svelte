<script lang="ts">
	import type { PageData } from './$types';
	import { deleteLocation, updateLocation } from '$lib/api';
	import { Grid, TextInput, SaveButton, DeleteButton } from '$lib/components';
	import { Label, Modal, Select, Button } from 'flowbite-svelte';
	let showDeleteModal = false;
	export let data: PageData;

	async function handleDeleteLocation() {
		await deleteLocation(data.location.id);
		window.history.back();
	}

	async function handleUpdateLocation() {
		await updateLocation(data.location);
		window.history.back();
	}
</script>

<Grid>
	<TextInput id="name" label="Name" bind:value={data.location.name} required />
	<TextInput id="description" label="Description" bind:value={data.location.description} />
	<div>
		<Label class="mb-2">Default Outside Zone</Label>
		<Select
			placeholder="Choose the default outside zone"
			items={data.zones}
			bind:value={data.location.defaultOutsideZoneId}
		></Select>
	</div>
	<div>
		<Label class="mb-2">Default Inside Zone</Label>
		<Select
			placeholder="Choose the default inside zone"
			items={data.zones}
			bind:value={data.location.defaultInsideZoneId}
		></Select>
	</div>
	<SaveButton on:click={async () => await handleUpdateLocation()} />
	<DeleteButton on:click={() => (showDeleteModal = true)} />

	<Modal title="Delete zone {data.location.name}" bind:open={showDeleteModal} autoclose>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			Are you sure you want to delete this location? All data associated with this location will be
			deleted.
		</p>
		<svelte:fragment slot="footer">
			<Button on:click={async () => await handleDeleteLocation()}>I accept</Button>
			<Button color="alternative">Decline</Button>
		</svelte:fragment>
	</Modal>
</Grid>
