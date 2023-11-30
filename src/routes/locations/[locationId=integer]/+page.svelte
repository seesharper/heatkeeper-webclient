<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { updateLocation } from '$lib/api';
	import { CenteredHeader, Grid, TextInput, SaveButton } from '$lib/components';

	export let location: PageData;
</script>

<CenteredHeader>Edit location {$page.params.locationId}</CenteredHeader>
<Grid>
	<TextInput id="name" label="Name" bind:value={location.name} required />
	<TextInput id="description" label="Description" bind:value={location.description} />
	<SaveButton on:click={async () => await updateLocation(location)} />
</Grid>
