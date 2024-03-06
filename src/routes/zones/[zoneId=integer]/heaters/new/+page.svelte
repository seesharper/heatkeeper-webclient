<script lang="ts">
	import { createHeater } from '$lib/api';
	import { Grid, SaveButton, TextInput } from '$lib/components';
	import type { NewHeater } from '$lib/models';
	import { page } from '$app/stores';
	let newHeater: NewHeater = { name: '', description: '' };
	var zoneId = $page.params.zoneId;

	async function handleCreateHeater() {
		await createHeater(newHeater, zoneId);
		window.history.back();
	}
</script>

<h6 class="mt-3 text-center">Create a new heater in this zone.</h6>
<Grid>
	<TextInput id="name" label="Name" bind:value={newHeater.name} required />
	<TextInput id="description" label="Description" bind:value={newHeater.description} />
	<SaveButton on:click={async () => await handleCreateHeater()} />
</Grid>
