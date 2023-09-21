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
			<TableBodyRow>
				<TableBodyCell>Apple MacBook Pro 17"</TableBodyCell>
				<TableBodyCell class="text-end"><Button size="sm">Edit</Button></TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>Apple MacBook Pro 17"</TableBodyCell>
				<TableBodyCell class="text-end"><Button size="sm">Edit</Button></TableBodyCell>
			</TableBodyRow>
		</TableBody>
	</Table>
</div>
