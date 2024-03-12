<script lang="ts">
	import { Heading, Table, TableBody, TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import SelectInput from '../../../../components/SelectInput.svelte';	
	import { activateProgram } from '$lib/api';	
	export let data: PageData;
	
	$: (async() => {
			await activateProgram(data.activeProgramId);			
	})();
</script>
<div class="mt-2">
	<SelectInput
		label="Active Program"
		placeholder="Choose the active schedule"
		items={data.programs}
		bind:value={data.activeProgramId}			
	></SelectInput>
</div>
<Table divClass="relative overflow-x-auto rounded-md mt-5" hoverable={true}>
	<TableBody>
		{#each data.temperatures as item}
			<TableBodyRow>
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