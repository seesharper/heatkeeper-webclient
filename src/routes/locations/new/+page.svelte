<script lang="ts">
	import { createLocation, updateLocation } from '$lib/api';
	import { CenteredHeader, Grid, SaveButton, TextInput } from '$lib/components';
	import type { NewLocation } from '$lib/models';
	let newLocation: NewLocation = { name: '', description: '', longitude: 0, latitude: 0 };
</script>

<CenteredHeader>New location</CenteredHeader>
<Grid>
	<TextInput id="name" label="Name" bind:value={newLocation.name} required />
	<TextInput id="description" label="Description" bind:value={newLocation.description} />
	<SaveButton on:click={async () => await createLocation(newLocation)} />
</Grid>
