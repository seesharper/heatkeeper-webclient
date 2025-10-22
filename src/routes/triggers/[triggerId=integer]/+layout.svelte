<script lang="ts">
	import { SaveButton, DeleteButton, SelectInput, CreateButton } from '$lib/components';
	import { updateTrigger, deleteTrigger } from '$lib/api';
	import type { TriggerDefinition, PatchTrigger, Condition } from '$lib/models';
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

	export let data: LayoutData;
	let trigger: TriggerDefinition = { ...data.trigger };

	// Initialize conditions array if it doesn't exist
	if (!trigger.conditions) {
		trigger.conditions = [];
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
								<TextInput bind:value={condition.propertyName} />
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
