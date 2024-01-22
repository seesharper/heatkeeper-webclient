<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow	} from 'flowbite-svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<Table divClass="relative overflow-x-auto rounded-md mt-5" hoverable={true}>
	<TableBody>
		{#each data.result as item}
			<TableBodyRow>
				<TableBodyCell>{item.name}</TableBodyCell>
				<TableBodyCell>{item.temperature}&#8451; / {item.humidity}%</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
