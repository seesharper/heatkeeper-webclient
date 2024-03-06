<script lang="ts">
	import type { PageData } from './$types';
	import {
		Grid,
		TextInput,
		TextInputWithButton,
		SaveButton,
		DeleteModal,
		CenteredHeader
	} from '$lib/components';
	import { Heading, Toast } from 'flowbite-svelte';
	import { deleteHeater, updateHeater, publishMqttMessage } from '$lib/api';
	import { blur } from 'svelte/transition';

	export let data: PageData;

	let showOnPayloadToast = false;
	let showOffPayloadToast = false;

	async function handleDeleteHeater() {
		await deleteHeater(data.heater.id);
		window.history.back();
	}

	async function handleUpdateHeater() {
		console.log(data.heater);
		await updateHeater(data.heater);
		window.history.back();
	}

	async function handleTestOnPayload() {
		await publishMqttMessage(data.heater.mqttTopic, data.heater.onPayload);
		showOnPayloadToast = true;
		showOffPayloadToast = false;
	}

	async function handleTestOffPayload() {
		await publishMqttMessage(data.heater.mqttTopic, data.heater.offPayload);
		showOffPayloadToast = true;
		showOnPayloadToast = false;
	}
</script>

<CenteredHeader>{data.heater.name}</CenteredHeader>
<Heading tag="h6" class="text-center">{data.heater.zoneName}</Heading>
<Grid>
	<TextInput id="name" label="Name" bind:value={data.heater.name} required />
	<TextInput id="description" label="Description" bind:value={data.heater.description} />
	<TextInput id="mqttTopic" label="MQTT Topic" bind:value={data.heater.mqttTopic} />
	<TextInputWithButton
		label="MQTT Payload(ON)"
		bind:value={data.heater.onPayload}
		on:click={handleTestOnPayload}
	/>
	<Toast transition={blur} params={{ amount: 10 }} bind:open={showOnPayloadToast}>
		Check your heater and verify that is has turned on.</Toast
	>
	<TextInputWithButton
		label="MQTT Payload(OFF)"
		bind:value={data.heater.offPayload}
		on:click={handleTestOffPayload}
	/>
	<Toast transition={blur} params={{ amount: 10 }} bind:open={showOffPayloadToast}>
		Check your heater and verify that is has turned off.</Toast
	>
	<SaveButton on:click={async () => await handleUpdateHeater()} />
	<DeleteModal
		title="Delete schedule {data.heater.name}"
		handleDelete={async () => await handleDeleteHeater()}
	>
		Are you sure you want to delete this heater? All data associated with this heater will be
		deleted.
	</DeleteModal>
</Grid>
