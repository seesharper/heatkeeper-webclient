<script lang="ts">
	import { Heading, Table, TableBody, TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import SelectInput from '../../../../components/SelectInput.svelte';
	import { activateProgram } from '$lib/api';
	import type { ZoneReading } from '$lib/models';
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';

	export let data: PageData;
	async function handleClick(zoneReading: ZoneReading) {
		goto('/zone-details/' + zoneReading.zoneId);
	}
</script>

{#key $page.params}
	<div class="mt-2">
		<SelectInput
			label="Active Program"
			placeholder="Choose the active schedule"
			items={data.programs}
			bind:value={data.activeProgramId}
			on:change={async () => {
				await activateProgram(data.activeProgramId);
			}}
		></SelectInput>
	</div>
	<Table divClass="relative overflow-x-auto rounded-md mt-5" hoverable={true}>
		<TableBody>
			{#each data.temperatures as item}
				<TableBodyRow on:click={() => handleClick(item)}>
					<TableBodyCell
						><div>
							{item.name}
						</div>
					</TableBodyCell>
					<TableBodyCell class="text-right"
						><Heading tag="h6">{item.temperature}° / {item.humidity}%</Heading></TableBodyCell
					>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
	<Heading tag="h6" class="text-center mt-5">Updated {new Date().toLocaleString()}</Heading>
{/key}
