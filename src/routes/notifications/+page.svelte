<script lang="ts">
	import { CreateButton } from '$lib/components';
	import type { NotificationSubscriptionInfo } from '$lib/models';
	import type { PageData } from './$types';
	import {
		Button,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Heading,
		Toggle
	} from 'flowbite-svelte';
	import { createNotificationSubscription, deleteNotificationSubscription } from '$lib/api';
	export let data: PageData;

	async function handleSubscriptionChanged(item: NotificationSubscriptionInfo) {
		if (item.isSubscribed) {
			await createNotificationSubscription({ notificationId: item.id });
		} else {
			await deleteNotificationSubscription(item.id);
		}
	}
</script>

<Heading tag="h3" class="text-center">Notifications</Heading>

<Table divClass="relative overflow-x-auto rounded-md mt-5" hoverable={false}>
	<TableHead>
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell />
	</TableHead>
	<TableBody>
		{#each data.result as item}
			<TableBodyRow>
				<TableBodyCell class="text-end">
					<Toggle
						bind:checked={item.isSubscribed}
						on:change={async () => handleSubscriptionChanged(item)}>{item.name}</Toggle
					>
				</TableBodyCell>
				<TableBodyCell class="text-end">
					<Button size="sm" href="/notifications/{item.id}">Edit</Button>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
		{#if data.result.length === 0}
			<TableBodyRow>
				<TableBodyCell colspan="2" class="text-center">No notifications found</TableBodyCell>
			</TableBodyRow>
		{/if}
	</TableBody>
</Table>
<CreateButton href="notifications/new">Add notification</CreateButton>
