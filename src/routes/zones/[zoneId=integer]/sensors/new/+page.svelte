<script lang="ts">
	import { assignZoneToSensor } from '$lib/api';
	import { CreateButton, Grid, SaveButton, SelectInput } from '$lib/components';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import {
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyRow,
		TableBodyCell,
		Button
	} from 'flowbite-svelte';
	export let data: PageData;
	let selectedSensorIndex: number = -1;
	async function handleAssignSensor() {
		if (selectedSensorIndex != -1) {
			await assignZoneToSensor($page.params.zoneId, data.sensors[selectedSensorIndex].id);
			window.history.back();
		}
	}

	function selectRow(rowIndex: number) {
		selectedSensorIndex = rowIndex;
	}
</script>

<h6 class="mt-3 text-center">Assign a new sensor to this zone.</h6>
<Table divClass="relative overflow-x-auto rounded-md mt-5" hoverable={true}>
	<TableHead>
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell />
	</TableHead>
	<TableBody>
		{#each data.sensors as item, i}
			<TableBodyRow on:click={() => selectRow(i)}>
				<TableBodyCell>{item.name}</TableBodyCell>
				<TableBodyCell class="text-end">
					<Button size="sm" href="/sensors/{item.id}">Edit</Button>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
<CreateButton on:click={async () => await handleAssignSensor()}>Add selected sensor to zone</CreateButton>
