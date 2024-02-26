<script lang="ts">
	import { createSetPoint } from '$lib/api';
	import { Grid, SaveButton, SelectInput, TextInput } from '$lib/components';
	import type { NewSchedule, NewSetPoint } from '$lib/models';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
	let newSchedule: NewSetPoint = {
		zoneId: 0
	};

	var scheduleId = $page.params.scheduleId;

	async function handleCreateSetPoint() {
		await createSetPoint(newSchedule, scheduleId);
		window.history.back();
	}
</script>

<h6 class="mt-3 text-center">Add a new zone to this schedule</h6>
<Grid>
	<SelectInput
		label="Zone"
		placeholder="Choose zone to be added to schedule"
		items={data.zones}
		bind:value={newSchedule.zoneId}
	></SelectInput>

	<SaveButton on:click={async () => await handleCreateSetPoint()} />
</Grid>
