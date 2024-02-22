<script lang="ts">
	import type { PageData } from './$types';
	import { deleteLocation, updateLocation } from '$lib/api';
	import { Grid, TextInput, SaveButton, SelectInput, DeleteModal } from '$lib/components';
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

	<SelectInput
		label="Default Outside Zone"
		placeholder="Choose the default outside zone"
		items={data.zones}
		bind:value={data.location.defaultOutsideZoneId}
	></SelectInput>

	<SelectInput
		label="Default Inside Zone"
		placeholder="Choose the default inside zone"
		items={data.zones}
		bind:value={data.location.defaultInsideZoneId}
	></SelectInput>

	<SaveButton on:click={async () => await handleUpdateLocation()} />

	<DeleteModal
		title="Delete location {data.location.name}"
		handleDelete={async () => await handleDeleteLocation()}
	>
		Are you sure you want to delete this location? All data associated with this location will be
		deleted.
	</DeleteModal>
</Grid>
