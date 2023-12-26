<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { updateLocation } from '$lib/api';
	import { CenteredHeader, Grid, TextInput, SaveButton } from '$lib/components';

	export let data: PageData;
</script>

<CenteredHeader>Edit location {$page.params.locationId}</CenteredHeader>
<Grid>
	<TextInput id="name" label="Name" bind:value={data.location.name} required />
	<TextInput id="description" label="Description" bind:value={data.location.description} />
	<SaveButton on:click={async () => await updateLocation(data.location)} />
</Grid>
