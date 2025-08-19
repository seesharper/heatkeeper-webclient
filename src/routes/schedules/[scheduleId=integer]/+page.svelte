<script lang="ts">
	import type { PageData } from './$types';
	import {
		CenteredHeader,
		Grid,
		TextInput,
		SaveButton,
		DeleteModal,
		CronSelector
	} from '$lib/components';
	import { deleteSchedule, deleteZone, updateSchedule, updateZone } from '$lib/api';

	export let data: PageData;

	async function handleDeleteSchedule() {
		await deleteSchedule(data.schedule.id);
		window.history.back();
	}

	async function handleUpdateSchedule() {
		await updateSchedule(data.schedule);
		window.history.back();
	}
</script>

<Grid>
	<TextInput id="name" label="Name" bind:value={data.schedule.name} required />
	<CronSelector id="cronExpression" label="Schedule" bind:value={data.schedule.cronExpression} />

	<SaveButton on:click={async () => await handleUpdateSchedule()} />
	<DeleteModal
		title="Delete schedule {data.schedule.name}"
		handleDelete={async () => await handleDeleteSchedule()}
	>
		Are you sure you want to delete this schedule? All data associated with this schedule will be
		deleted.
	</DeleteModal>
</Grid>
