<script lang="ts">
	import type { PageData } from './$types';
	import {
		Grid,
		TextInput,
		SaveButton,
		DeleteModal,
		CenteredHeader,
		NumericInput
	} from '$lib/components';
	import { Heading } from 'flowbite-svelte';
	import { updateSensor } from '$lib/api';

	export let data: PageData;

	async function handleDeleteSensor() {
		//await deleteZone(data.zone.id);
		window.history.back();
	}

	async function handleRemoveZoneFromSensor() {
		//await updateZone(data.zone);
		window.history.back();
	}

	async function handleUpdateSensor() {
		await updateSensor(data.sensor);
		window.history.back();
	}
</script>

<CenteredHeader>{data.sensor.name}</CenteredHeader>
<Heading tag="h6" class="text-center">{data.sensor.zoneName}</Heading>
<Grid>
	<TextInput id="name" label="Name" bind:value={data.sensor.name} required />
	<TextInput id="description" label="Description" bind:value={data.sensor.description} />
	<TextInput id="externalid" label="External Id" bind:value={data.sensor.externalId} />
	<NumericInput
		id="numberOfMinutesBeforeConsideredDead"
		label="Minutes Before Considered Dead"
		bind:value={data.sensor.minutesBeforeConsideredDead}
	/>
	<SaveButton on:click={async () => await handleUpdateSensor()} />
	<DeleteModal
		title="Delete zone {data.sensor.name}"
		handleDelete={async () => await handleDeleteSensor()}
	>
		Are you sure you want to delete this zone? All data associated with this zone will be deleted.
	</DeleteModal>
</Grid>
