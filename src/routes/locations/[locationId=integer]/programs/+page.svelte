<script lang="ts">
	import { CreateButton } from '$lib/components';
	import type { PageData } from './$types';
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
</script>

<Table divClass="relative overflow-x-auto rounded-md mt-5" hoverable={true}>
	<TableHead>
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell />
	</TableHead>
	<TableBody>
		{#each data.programs as item}
			<TableBodyRow>
				<TableBodyCell>{item.name}</TableBodyCell>
				<TableBodyCell class="text-end">
					<Button size="sm" href="/programs/{item.id}">Edit</Button>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
<CreateButton href="zones/new">Create new program</CreateButton>
