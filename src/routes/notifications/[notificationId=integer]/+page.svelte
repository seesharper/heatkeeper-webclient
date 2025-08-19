<script lang="ts">
	import { createNotification, deleteNotification, updateNotification } from '$lib/api';
	import {
		CenteredHeader,
		DeleteModal,
		Grid,
		SaveButton,
		SelectInput,
		TextInput,
		CronSelector
	} from '$lib/components';
	import type { NewNotification } from '$lib/models';
	import NumericInput from '../../../components/NumericInput.svelte';

	import type { PageData } from './$types';
	export let data: PageData;

	async function handleDeleteNotification() {
		await deleteNotification(data.notification.id);
		window.history.back();
	}

	async function handleUpdateNotification() {
		await updateNotification(data.notification);
		window.history.back();
	}
</script>

<Grid>
	<TextInput id="name" label="Name" bind:value={data.notification.name} required />
	<TextInput id="description" label="Description" bind:value={data.notification.description} />
	<CronSelector id="cronExpression" label="Schedule" bind:value={data.notification.cronExpression} />
	<NumericInput
		id="hoursToSnooze"
		label="Hours To Snooze"
		bind:value={data.notification.hoursToSnooze}
	></NumericInput>
	<!-- <SelectInput
		label="Notification Type"
		placeholder="Choose the notification type"
		items={data.notificationTypes}
		bind:value={newNotification.notificationType}
	></SelectInput> -->
	<SaveButton on:click={async () => await handleUpdateNotification()} />

	<DeleteModal
		title="Delete notification {data.notification.name}"
		handleDelete={async () => await handleDeleteNotification()}
	>
		Are you sure you want to delete this notification? All data associated with this notification
		will be deleted.
	</DeleteModal>
</Grid>
