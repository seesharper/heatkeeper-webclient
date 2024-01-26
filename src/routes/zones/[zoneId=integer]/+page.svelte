<script lang="ts">
	import type { PageData } from './$types';
	import { CenteredHeader, Grid, TextInput, SaveButton, DeleteButton } from '$lib/components';
	import { Label, Select, Toggle } from 'flowbite-svelte';

	export let data: PageData;

	async function deleteZone() {
		console.log('deleteZone');
		window.history.back();
	}
	async function updateZone() {
		console.log('updateZone');
		window.history.back();
	}
</script>

<CenteredHeader>Zone</CenteredHeader>
<Grid>
	<TextInput id="name" label="Name" bind:value={data.zone.name} required />
	<TextInput id="description" label="Description" bind:value={data.zone.description} />
	<TextInput id="mqttTopic" label="MQTT Topic" bind:value={data.zone.mqttTopic} />
	<div>
		<Label class="mb-2">Location</Label>
		<Select
			placeholder="Choose the default inside zone"
			items={data.locations}
			bind:value={data.zone.locationId}
		></Select>
	</div>
	<Toggle>Default inside zone</Toggle>
	<Toggle>Default outside zone</Toggle>
	<SaveButton on:click={async () => await updateZone()} />
	<DeleteButton on:click={async () => await deleteZone()} />
</Grid>
