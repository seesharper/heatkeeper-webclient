<script lang="ts">
	import type { PageData } from './$types';
	import { CenteredHeader, Grid, TextInput, SaveButton, DeleteModal } from '$lib/components';
	import { Toggle, Modal, Button } from 'flowbite-svelte';
	import { deleteZone, updateZone } from '$lib/api';

	let showDeleteModal = false;

	export let data: PageData;

	async function handleDeleteZone() {
		await deleteZone(data.zone.id);
		window.history.back();
	}

	async function handleUpdateZone() {
		await updateZone(data.zone);
		window.history.back();
	}
</script>

<Grid>
	<TextInput id="name" label="Name" bind:value={data.zone.name} required />
	<TextInput id="description" label="Description" bind:value={data.zone.description} />
	<TextInput id="mqttTopic" label="MQTT Topic" bind:value={data.zone.mqttTopic} />
	<Toggle bind:checked={data.zone.isDefaultOutsideZone}>Default outside zone</Toggle>
	<Toggle bind:checked={data.zone.isDefaultInsideZone}>Default inside zone</Toggle>
	<SaveButton on:click={async () => await handleUpdateZone()} />
	<DeleteModal
		title="Delete zone {data.zone.name}"
		handleDelete={async () => await handleDeleteZone()}
	>
		Are you sure you want to delete this zone? All data associated with this zone will be deleted.
	</DeleteModal>
</Grid>
