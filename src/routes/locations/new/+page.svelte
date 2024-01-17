<script>
	import { updateLocation } from '$lib/api';
	import { CenteredHeader, Grid, SaveButton, TextInput } from '$lib/components';
	let name = '';
	let description = '';
</script>

<CenteredHeader>New location</CenteredHeader>
<Grid>
	<TextInput id="name" label="Name" bind:value={name} required />
	<TextInput id="description" label="Description" bind:value={description} />
	<SaveButton on:click={async () => await updateLocation(data.location)} />
</Grid>
