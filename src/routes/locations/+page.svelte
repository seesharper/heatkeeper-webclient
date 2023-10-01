<script lang="ts">
	import type { PageData } from './$types';
	import {
		Button,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Heading
	} from 'flowbite-svelte';
	export let data: PageData;
</script>

<Heading tag="h3" class="text-center">Locations</Heading>

<div class="m-8">
	<Table divClass="relative overflow-x-auto rounded-md" hoverable={true}>
		<TableHead>
			<TableHeadCell>Name</TableHeadCell>
			<TableHeadCell />
		</TableHead>
		<TableBody>
			{#each data.result as item}
				<TableBodyRow>
					<TableBodyCell>{item.name}</TableBodyCell>
					<TableBodyCell class="text-end">
						<Button size="sm" href="locations/{item.id}">Edit</Button>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
