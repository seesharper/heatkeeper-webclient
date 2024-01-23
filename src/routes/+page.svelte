<script lang="ts">
	import { Heading, Table, TableBody, TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>


<Table divClass="relative overflow-x-auto rounded-md mt-5" hoverable={true}>
	<TableBody>
		{#each data.result as item}
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