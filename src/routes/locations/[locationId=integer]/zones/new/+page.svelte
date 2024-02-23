<script lang="ts">
	import { createZone } from '$lib/api';
	import { Grid, SaveButton, TextInput } from '$lib/components';
	import type { NewZone } from '$lib/models';
	import { page } from '$app/stores';
	let newLocation: NewZone = { name: '', description: '' };
	var locationId = $page.params.locationId;

	async function handleCreateZone() {
		await createZone(newLocation, locationId);
		window.history.back();
	}
</script>

<h6 class="mt-3 text-center">Create a new zone in this location</h6>
<Grid>
	<TextInput id="name" label="Name" bind:value={newLocation.name} required />
	<TextInput id="description" label="Description" bind:value={newLocation.description} />
	<SaveButton on:click={async () => await handleCreateZone()} />
</Grid>
