<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { updateLocation } from '$lib/api';
	import { CenteredHeader, Grid, TextInput, SaveButton } from '$lib/components';
	import { Label, Select } from 'flowbite-svelte';

	export let data: PageData;
</script>

<CenteredHeader>Location</CenteredHeader>
<Grid>
	<TextInput id="name" label="Name" bind:value={data.location.name} required />
	<TextInput id="description" label="Description" bind:value={data.location.description} />
	<div>
		<Label class="mb-2">Default Outside Zone</Label>
		<Select
			placeholder="Choose the default outside zone"
			items={data.zones}
			bind:value={data.location.defaultOutsideZoneId}
		></Select>
	</div>
	<div>
		<Label class="mb-2">Default Inside Zone</Label>
		<Select
			placeholder="Choose the default inside zone"
			items={data.zones}
			bind:value={data.location.defaultInsideZoneId}
		></Select>
	</div>
	<SaveButton on:click={async () => await updateLocation(data.location)} />
</Grid>
