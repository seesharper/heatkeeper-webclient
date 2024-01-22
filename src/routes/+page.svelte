<script lang="ts">
	import { Heading, Table, TableBody, TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<Heading tag="h6" class="text-center">Updated {new Date().toLocaleString()}</Heading>
<Table divClass="relative overflow-x-auto rounded-md mt-5" hoverable={true}>
	<TableBody>
		{#each data.result as item}
			<TableBodyRow>
				<TableBodyCell
					><div>
						{item.name}
					</div>
					<div>
						{new Date(item.updated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
					</div>
				</TableBodyCell>
				<TableBodyCell
					><Heading tag="h6">{item.temperature}° / {item.humidity}%</Heading></TableBodyCell
				>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
