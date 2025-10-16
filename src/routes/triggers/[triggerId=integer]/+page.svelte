<script lang="ts">
	import { SaveButton, DeleteButton, SelectInput } from '$lib/components';
	import { updateTrigger, deleteTrigger } from '$lib/api';
	import type { TriggerDefinition, PatchTrigger } from '$lib/models';
	import { TextInput } from '$lib/components';
	import { Heading } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import Grid from '../../../components/Grid.svelte';

	export let data: PageData;
	let trigger: TriggerDefinition = { ...data.trigger };

	async function save() {
		const patchTrigger: PatchTrigger = {
			id: data.triggerId,
			trigger: trigger
		};
		await updateTrigger(patchTrigger);
	}

	async function deleteTriggerHandler() {
		await deleteTrigger(data.triggerId);
	}
</script>

<Heading tag="h3" class="text-center">Edit Trigger</Heading>

<Grid>
	<TextInput label="Name" bind:value={trigger.name} />

	<SelectInput
		label="Applies to Event Type"
		placeholder="Choose the event type for this trigger"
		items={data.eventTypes}
		bind:value={trigger.appliesToEventType}
	/>
	<SaveButton on:click={save} />
	<DeleteButton on:click={deleteTriggerHandler} />
</Grid>
