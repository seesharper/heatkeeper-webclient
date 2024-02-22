<script lang="ts">
	import type { PageData } from './$types';
	import { deleteProgram, updateProgram } from '$lib/api';
	import { Grid, TextInput, SaveButton, SelectInput, DeleteModal } from '$lib/components';
	export let data: PageData;

	async function handleDeleteProgram() {
		await deleteProgram(data.program.id);
		window.history.back();
	}

	async function handleUpdateProgram() {
		await updateProgram(data.program);
		window.history.back();
	}
</script>

<Grid>
	<TextInput id="name" label="Name" bind:value={data.program.name} required />

	<TextInput id="description" label="Description" bind:value={data.program.description} />

	<SelectInput
		label="Active Schedule"
		placeholder="Choose the active schedule"
		items={data.schedules}
		bind:value={data.program.activeScheduleId}
	></SelectInput>

	<SaveButton on:click={async () => await handleUpdateProgram()} />

	<DeleteModal
		title="Delete location {data.program.name}"
		handleDelete={async () => await handleDeleteProgram()}
	>
		Are you sure you want to delete this location? All data associated with this location will be
		deleted.
	</DeleteModal>
</Grid>
