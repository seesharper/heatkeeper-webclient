<script lang="ts">
	import { createNotification } from '$lib/api';
	import {
		CenteredHeader,
		Grid,
		SaveButton,
		SelectInput,
		TextInput,
		CronSelector
	} from '$lib/components';
	import type { NewNotification } from '$lib/models';
	import NumericInput from '../../../components/NumericInput.svelte';
	let newNotification: NewNotification = {
		name: '',
		description: '',
		notificationType: 0,
		cronExpression: '',
		hoursToSnooze: 0
	};
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<CenteredHeader>New Notification</CenteredHeader>
<Grid>
	<TextInput id="name" label="Name" bind:value={newNotification.name} required />
	<TextInput id="description" label="Description" bind:value={newNotification.description} />
	<CronSelector id="cronExpression" label="Schedule" bind:value={newNotification.cronExpression} />
	<NumericInput
		id="hoursToSnooze"
		label="Hours To Snooze"
		bind:value={newNotification.hoursToSnooze}
	></NumericInput>
	<SelectInput
		label="Notification Type"
		placeholder="Choose the notification type"
		items={data.notificationTypes}
		bind:value={newNotification.notificationType}
	></SelectInput>
	<SaveButton on:click={async () => await createNotification(newNotification)} />
</Grid>
