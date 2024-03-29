<script lang="ts">
	import { assignLocationToUser, removeLocationFromUser } from '$lib/api';
	import type { UserLocationAccess } from '$lib/models';
	import type { PageData } from './$types';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Toggle
	} from 'flowbite-svelte';
	export let data: PageData;

	async function handleAccessChanged(item: UserLocationAccess) {
		if (item.hasAccess) {
			await assignLocationToUser(data.user.id, item.locationId);
		} else {
			await removeLocationFromUser(data.user.id, item.locationId);
		}
	}
</script>

<Table divClass="relative overflow-x-auto rounded-md mt-5" hoverable={true}>
	<TableHead>
		<TableHeadCell>Name</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each data.userLocationsAccess as item}
			<TableBodyRow>
				<TableBodyCell class="text-end">
					<Toggle bind:checked={item.hasAccess} on:change={async () => handleAccessChanged(item)}
						>{item.locationName}</Toggle
					>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
