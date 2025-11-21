<script lang="ts">
	import { SaveButton, DeleteButton, SelectInput, CreateButton } from '$lib/components';
	import { updateTrigger, deleteTrigger, getEventDetails, getActionDetails } from '$lib/api';
	import type {
		TriggerDefinition,
		PatchTrigger,
		Condition,
		EventDetails,
		ActionDetails,
		ActionBinding
	} from '$lib/models';
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
	let actionDetailsMap: Map<number, ActionDetails> = new Map();

	// Initialize conditions array if it doesn't exist
	if (!trigger.conditions) {
		trigger.conditions = [];
	}

	// Initialize actions array if it doesn't exist
	if (!trigger.actions) {
		trigger.actions = [];
	}

	onMount(() => {
		mounted = true;
		loadEventDetails();
		loadActionDetails();
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

	async function loadActionDetails() {
		if (!browser || !trigger.actions) {
			return;
		}

		// Load details for each unique action
		const uniqueActionIds = [...new Set(trigger.actions.map((a) => a.actionId))];
		for (const actionId of uniqueActionIds) {
			if (!actionDetailsMap.has(actionId)) {
				const details = await getActionDetails(fetch, actionId);
				actionDetailsMap.set(actionId, details);
			}
		}
		// Trigger reactivity
		actionDetailsMap = actionDetailsMap;
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

	async function addAction() {
		// Add a new action binding with empty parameter map
		const newAction: ActionBinding = {
			actionId: 0, // Will be set by user
			parameterMap: {}
		};
		trigger.actions = [...trigger.actions, newAction];
	}

	async function deleteAction(index: number) {
		trigger.actions = trigger.actions.filter((_, i) => i !== index);
	}

	// When action ID changes, fetch its details and initialize parameter map
	async function onActionIdChange(index: number, newActionId: number) {
		if (!browser || newActionId === 0) return;

		// Fetch action details if not already cached
		if (!actionDetailsMap.has(newActionId)) {
			const details = await getActionDetails(fetch, newActionId);
			actionDetailsMap.set(newActionId, details);
			actionDetailsMap = actionDetailsMap; // Trigger reactivity
		}

		// Initialize parameter map with empty values for all parameters
		const actionDetails = actionDetailsMap.get(newActionId);
		if (actionDetails) {
			const paramMap: Record<string, string> = {};
			actionDetails.parameterSchema.forEach((param) => {
				paramMap[param.name] = trigger.actions[index].parameterMap[param.name] || '';
			});
			trigger.actions[index].parameterMap = paramMap;
			trigger.actions = trigger.actions; // Trigger reactivity
		}
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
		<div class="col-span-full space-y-4">
			<!-- Desktop Table View - Hidden on mobile -->
			<div class="hidden md:block">
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
									<Button size="xs" color="red" on:click={() => deleteCondition(index)}
										>Delete</Button
									>
								</TableBodyCell>
							</TableBodyRow>
						{/each}
					</TableBody>
				</Table>
			</div>

			<!-- Mobile Card View - Visible on mobile only -->
			<div class="md:hidden space-y-4">
				{#each trigger.conditions as condition, index}
					<div
						class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
					>
						<div class="space-y-3">
							<SelectInput
								label="Property Name"
								items={propertyOptions}
								bind:value={condition.propertyName}
								placeholder="Select property"
							/>
							<SelectInput
								label="Operator"
								items={operatorOptions}
								bind:value={condition.operator}
							/>
							<TextInput label="Value" bind:value={condition.value} />
							<Button size="sm" color="red" class="w-full" on:click={() => deleteCondition(index)}>
								Delete Condition
							</Button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<div class="col-span-full text-center text-gray-500 dark:text-gray-400 py-4">
			No conditions defined
		</div>
	{/if}

	<CreateButton on:click={addCondition}>Add Condition</CreateButton>

	<!-- Action Bindings Section -->
	{#if trigger.actions && trigger.actions.length > 0}
		<div class="col-span-full mt-8">
			<Heading tag="h5" class="mb-4">Actions</Heading>
			<div class="space-y-6">
				{#each trigger.actions as actionBinding, actionIndex}
					{@const actionDetails = actionDetailsMap.get(actionBinding.actionId)}
					<div
						class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
					>
						<div class="mb-3">
							<SelectInput
								label="Action"
								items={data.actionOptions}
								bind:value={actionBinding.actionId}
								placeholder="Select an action"
								on:change={() => onActionIdChange(actionIndex, actionBinding.actionId)}
							/>
						</div>

						{#if actionDetails}
							{#if actionDetails.description}
								<p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
									{actionDetails.description}
								</p>
							{/if}

							{#if actionDetails.parameterSchema && actionDetails.parameterSchema.length > 0}
								<div class="mt-4">
									<h6 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
										Parameter Mappings
									</h6>
									<!-- Desktop Table View -->
									<div class="hidden md:block">
										<Table divClass="relative overflow-x-auto rounded-md">
											<TableHead>
												<TableHeadCell>Parameter</TableHeadCell>
												<TableHeadCell>Type</TableHeadCell>
												<TableHeadCell>Required</TableHeadCell>
												<TableHeadCell>Mapped Value</TableHeadCell>
											</TableHead>
											<TableBody>
												{#each actionDetails.parameterSchema as param}
													<TableBodyRow>
														<TableBodyCell>
															<div>
																<div class="font-medium">{param.name}</div>
																{#if param.description}
																	<div class="text-xs text-gray-500 dark:text-gray-400">
																		{param.description}
																	</div>
																{/if}
															</div>
														</TableBodyCell>
														<TableBodyCell>
															<span
																class="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded"
															>
																{param.type}
															</span>
														</TableBodyCell>
														<TableBodyCell>
															{#if param.required}
																<span class="text-red-600 dark:text-red-400">Yes</span>
															{:else}
																<span class="text-gray-500">No</span>
															{/if}
														</TableBodyCell>
														<TableBodyCell>
															<TextInput
																bind:value={actionBinding.parameterMap[param.name]}
																placeholder={param.required ? 'Required' : 'Optional'}
															/>
														</TableBodyCell>
													</TableBodyRow>
												{/each}
											</TableBody>
										</Table>
									</div>

									<!-- Mobile Card View -->
									<div class="md:hidden space-y-3">
										{#each actionDetails.parameterSchema as param}
											<div
												class="p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600"
											>
												<div class="font-medium text-gray-900 dark:text-white mb-1">
													{param.name}
													{#if param.required}
														<span class="text-red-600 dark:text-red-400 text-xs ml-1"
															>(Required)</span
														>
													{/if}
												</div>
												{#if param.description}
													<div class="text-xs text-gray-600 dark:text-gray-400 mb-2">
														{param.description}
													</div>
												{/if}
												<div class="mb-2">
													<span
														class="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-600 rounded"
													>
														{param.type}
													</span>
												</div>
												<TextInput
													bind:value={actionBinding.parameterMap[param.name]}
													placeholder={param.required ? 'Required' : 'Optional'}
												/>
											</div>
										{/each}
									</div>
								</div>
							{:else}
								<p class="text-sm text-gray-500 dark:text-gray-400">No parameters</p>
							{/if}
						{:else if actionBinding.actionId !== 0}
							<div class="text-gray-500 dark:text-gray-400">Loading action details...</div>
						{/if}

						<div class="mt-4">
							<Button size="sm" color="red" on:click={() => deleteAction(actionIndex)}>
								Delete Action
							</Button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<div class="col-span-full text-center text-gray-500 dark:text-gray-400 py-4 mt-8">
			No actions defined
		</div>
	{/if}

	<CreateButton on:click={addAction}>Add Action</CreateButton>

	<SaveButton on:click={save} />
	<DeleteButton on:click={deleteTriggerHandler} />
</Grid>
