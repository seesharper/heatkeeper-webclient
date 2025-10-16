<script lang="ts">
	import { CreateButton } from '$lib/components';
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

<Heading tag="h3" class="text-center">Triggers</Heading>

<Table divClass="relative overflow-x-auto rounded-md mt-5" hoverable={true}>
	<TableHead>
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell />
	</TableHead>
	<TableBody>
		{#each data.triggers as trigger}
			<TableBodyRow>
				<TableBodyCell>{trigger.name}</TableBodyCell>
				<TableBodyCell class="text-end">
					<Button size="sm" href="/triggers/{trigger.id}">Edit</Button>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
		{#if data.triggers.length === 0}
			<TableBodyRow>
				<TableBodyCell colspan="2" class="text-center">No triggers found</TableBodyCell>
			</TableBodyRow>
		{/if}
	</TableBody>
</Table>

<CreateButton href="/triggers/new">Create new trigger</CreateButton>
