<script lang="ts">
	import type { PageData } from './$types';
	import { updateLocation } from '$lib/api';
	import { CenteredHeader, Grid, TextInput, SaveButton } from '$lib/components';
	import {
		Button,
		Label,
		Select,
		TabItem,
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyRow,
		TableBodyCell,
		Tabs
	} from 'flowbite-svelte';

	export let data: PageData;
</script>

<CenteredHeader>Location</CenteredHeader>
<Tabs class="mt-5">
	<TabItem open title="Details">
		<Grid>
			<TextInput id="name" label="Name" bind:value={data.location.name} required />
			<TextInput id="description" label="Description" bind:value={data.location.description} />
			<div>
				<Label class="mb-2">Default Outside Zone</Label>
				<Select
					placeholder="Choose the default outside zone"
					items={data.zones}
					bind:value={data.location.defaultOutsideZoneId}
				></Select>
			</div>
			<div>
				<Label class="mb-2">Default Inside Zone</Label>
				<Select
					placeholder="Choose the default inside zone"
					items={data.zones}
					bind:value={data.location.defaultInsideZoneId}
				></Select>
			</div>
			<SaveButton on:click={async () => await updateLocation(data.location)} />
		</Grid>
	</TabItem>
	<TabItem open title="Zones">
		<Table divClass="relative overflow-x-auto rounded-md mt-5" hoverable={true}>
			<TableHead>
				<TableHeadCell>Name</TableHeadCell>
				<TableHeadCell />
			</TableHead>
			<TableBody>
				{#each data.zones as item}
					<TableBodyRow>
						<TableBodyCell>{item.name}</TableBodyCell>
						<TableBodyCell class="text-end">
							<Button size="sm" href="/zones/{item.value}">Edit</Button>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</TabItem>
</Tabs>
