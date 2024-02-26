<script lang="ts">
	import type { PageData } from './$types';
	import { CenteredHeader, Grid, SaveButton, DeleteModal, NumericInput } from '$lib/components';
	import { Range, Heading } from 'flowbite-svelte';
	import { deleteSetPoint, updateSetPoint } from '$lib/api';

	export let data: PageData;

	async function handleDeleteSetPoint() {
		await deleteSetPoint(data.setPoint.id);
		window.history.back();
	}

	async function handleUpdateSetPoint() {
		await updateSetPoint(data.setPoint);
		window.history.back();
	}
</script>

<CenteredHeader>{data.setPoint.scheduleName}</CenteredHeader>
<Heading tag="h6" class="text-center">{data.setPoint.zoneName}</Heading>
<Grid>
	<NumericInput id="value" label="Temperature" bind:value={data.setPoint.value}></NumericInput>
	<Range min="0" max="30" step="0.5" bind:value={data.setPoint.value}></Range>

	<NumericInput id="value" label="Hysteresis" bind:value={data.setPoint.hysteresis}></NumericInput>
	<Range min="0" max="5" step="0.5" bind:value={data.setPoint.hysteresis}></Range>
	<SaveButton on:click={async () => await handleUpdateSetPoint()} />
	<DeleteModal title="Delete set " handleDelete={async () => await handleDeleteSetPoint()}>
		Are you sure you want to delete this setpoint?
	</DeleteModal>
</Grid>
