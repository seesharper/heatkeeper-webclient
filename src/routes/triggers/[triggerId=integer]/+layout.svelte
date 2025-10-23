<script lang="ts">
	import { SaveButton, DeleteButton, SelectInput, CreateButton } from '$lib/components';
	import { updateTrigger, deleteTrigger, getEventDetails } from '$lib/api';
	import type { TriggerDefinition, PatchTrigger, Condition, EventDetails } from '$lib/models';
	import { TextInput } from '$lib/components';
	import {
		Heading,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Button
	} from 'flowbite-svelte';
	import type { LayoutData } from './$types';
	import Grid from '../../../components/Grid.svelte';
	import { ComparisonOperator } from '$lib/models';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let data: LayoutData;
	let trigger: TriggerDefinition = { ...data.trigger };
	let previousEventType = trigger.appliesToEventType;
	let eventDetails: EventDetails | null = null;
	let propertyOptions: { value: string; name: string }[] = [];
	let mounted = false;

	// Initialize conditions array if it doesn't exist
	if (!trigger.conditions) {
		trigger.conditions = [];
	}

	onMount(() => {
		mounted = true;
		loadEventDetails();
	});

	// Fetch event details when event type changes
	$: if (
		trigger.appliesToEventType !== previousEventType &&
		previousEventType !== undefined &&
		mounted
	) {
		trigger.conditions = [];
		previousEventType = trigger.appliesToEventType;
		loadEventDetails();
	}

	async function loadEventDetails() {
		if (!browser || !trigger.appliesToEventType) {
			eventDetails = null;
			propertyOptions = [];
			return;
		}

		// Find the event info that matches the selected event type
		const eventInfo = data.eventInfos.find((e) => e.name === trigger.appliesToEventType);
		if (eventInfo) {
			eventDetails = await getEventDetails(fetch, eventInfo.id);
			propertyOptions = eventDetails.properties.map((prop) => ({
				value: prop.name,
				name: prop.name
			}));
		}
	}

	// Operator options for the select dropdown
	const operatorOptions = [
		{ value: ComparisonOperator.Equals, name: 'Equals' },
		{ value: ComparisonOperator.NotEquals, name: 'Not Equals' },
		{ value: ComparisonOperator.GreaterThan, name: 'Greater Than' },
		{ value: ComparisonOperator.GreaterOrEqual, name: 'Greater Or Equal' },
		{ value: ComparisonOperator.LessThan, name: 'Less Than' },
		{ value: ComparisonOperator.LessOrEqual, name: 'Less Or Equal' },
		{ value: ComparisonOperator.Contains, name: 'Contains' },
		{ value: ComparisonOperator.StartsWith, name: 'Starts With' },
		{ value: ComparisonOperator.EndsWith, name: 'Ends With' }
	];

	function getOperatorLabel(operator: ComparisonOperator): string {
		const option = operatorOptions.find((opt) => opt.value === operator);
		return option ? option.name : 'Unknown';
	}

	function addCondition() {
		trigger.conditions = [
			...trigger.conditions,
			{
				propertyName: '',
				operator: ComparisonOperator.Equals,
				value: ''
			}
		];
	}

	function deleteCondition(index: number) {
		trigger.conditions = trigger.conditions.filter((_, i) => i !== index);
	}

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

	{#if trigger.conditions && trigger.conditions.length > 0}
		<div class="col-span-full">
			<Table divClass="relative overflow-x-auto rounded-md mt-5">
				<TableHead>
					<TableHeadCell>Property Name</TableHeadCell>
					<TableHeadCell>Operator</TableHeadCell>
					<TableHeadCell>Value</TableHeadCell>
					<TableHeadCell>Actions</TableHeadCell>
				</TableHead>
				<TableBody>
					{#each trigger.conditions as condition, index}
						<TableBodyRow>
							<TableBodyCell>
								<SelectInput
									items={propertyOptions}
									bind:value={condition.propertyName}
									placeholder="Select property"
								/>
							</TableBodyCell>
							<TableBodyCell>
								<SelectInput items={operatorOptions} bind:value={condition.operator} />
							</TableBodyCell>
							<TableBodyCell>
								<TextInput bind:value={condition.value} />
							</TableBodyCell>
							<TableBodyCell>
								<Button size="xs" color="red" on:click={() => deleteCondition(index)}>Delete</Button
								>
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</div>
	{:else}
		<div class="col-span-full text-center text-gray-500 dark:text-gray-400 py-4">
			No conditions defined
		</div>
	{/if}

	<CreateButton on:click={addCondition}>Add Condition</CreateButton>

	<SaveButton on:click={save} />
	<DeleteButton on:click={deleteTriggerHandler} />
</Grid>
