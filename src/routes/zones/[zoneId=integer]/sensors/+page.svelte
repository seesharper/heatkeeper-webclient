<script lang="ts">
	import { removeZoneFromSensor } from '$lib/api';
	import { CreateButton, DeleteButton } from '$lib/components';
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
	async function handleRemoveSensor() {
		if (selectedSensorIndex != -1) {
			await removeZoneFromSensor(data.sensors[selectedSensorIndex].id);
		}
	}

	function selectRow(rowIndex: number) {
		selectedSensorIndex = rowIndex;
	}
</script>

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
<CreateButton href="sensors/new">Assign a sensor to this zone</CreateButton>
<div class="mt-5">
	<CreateButton on:click={async () => await handleRemoveSensor()}
		>Remove selected sensor from zone</CreateButton
	>
</div>
