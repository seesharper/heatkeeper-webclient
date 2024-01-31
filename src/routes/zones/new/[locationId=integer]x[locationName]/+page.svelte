<script lang="ts">
	import { createLocation, updateLocation } from '$lib/api';
	import { CenteredHeader, Grid, SaveButton, TextInput } from '$lib/components';
	import type { NewLocation, NewZone } from '$lib/models';
	import { page } from '$app/stores';
	let newLocation: NewZone = { name: '', description: '', locationId: 0 };
	let locId = $page.params.locationId;
</script>

<CenteredHeader>New zone</CenteredHeader>
<h6 class="text-center">{$page.params.locationName}</h6>
<Grid>
	<TextInput id="name" label="Name" bind:value={newLocation.name} required />
	<TextInput id="description" label="Description" bind:value={newLocation.description} />
	<SaveButton on:click={async () => await createLocation(newLocation)} />
</Grid>
