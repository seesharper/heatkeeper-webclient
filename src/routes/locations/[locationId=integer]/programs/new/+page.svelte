<script lang="ts">
	import { createProgram } from '$lib/api';
	import { Grid, SaveButton, TextInput } from '$lib/components';
	import type { NewProgram } from '$lib/models';
	import { page } from '$app/stores';
	let newProgram: NewProgram = { name: '', description: '' };
	var locationId = $page.params.locationId;

	async function handleCreateProgram() {
		await createProgram(newProgram, locationId);
		window.history.back();
	}
</script>

<h6 class="mt-3 text-center">Create a new program in this location</h6>
<Grid>
	<TextInput id="name" label="Name" bind:value={newProgram.name} required />
	<TextInput id="description" label="Description" bind:value={newProgram.description} />
	<SaveButton on:click={async () => await handleCreateProgram()} />
</Grid>
