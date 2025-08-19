<script lang="ts">
	import { createSchedule } from '$lib/api';
	import { Grid, SaveButton, TextInput, CronSelector } from '$lib/components';
	import type { NewSchedule } from '$lib/models';
	import { page } from '$app/stores';
	let newSchedule: NewSchedule = {
		name: '',
		cronExpression: ''
	};
	var programId = $page.params.programId;

	async function handleCreateSchedule() {
		await createSchedule(newSchedule, programId);
		window.history.back();
	}
</script>

<h6 class="mt-3 text-center">Create a new schedule</h6>
<Grid>
	<TextInput id="name" label="Name" bind:value={newSchedule.name} required />
	<CronSelector id="cronExpression" label="Schedule" bind:value={newSchedule.cronExpression} />
	<SaveButton on:click={async () => await handleCreateSchedule()} />
</Grid>
