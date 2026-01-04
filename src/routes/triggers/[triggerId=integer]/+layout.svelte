<script lang="ts">
	import { SaveButton, DeleteButton, SelectInput, CreateButton, SmartInput } from '$lib/components';
	import {
		updateTrigger,
		deleteTrigger,
		getEventDetails,
		getActionDetails,
		testAction
	} from '$lib/api';
	import type {
		TriggerDefinition,
		PatchTrigger,
		Condition,
		EventDetails,
		ActionDetails,
		ActionBinding,
		EventPropertyInfo
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
		Button,
		Toast
	} from 'flowbite-svelte';
	import type { LayoutData } from './$types';
	import Grid from '../../../components/Grid.svelte';
	import { ComparisonOperator } from '$lib/models';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { blur } from 'svelte/transition';

	export let data: LayoutData;
	let trigger: TriggerDefinition = { ...data.trigger };
	let previousEventId = trigger.eventId;
	let eventDetails: EventDetails | null = null;
	let propertyOptions: { value: string; name: string }[] = [];
	let mounted = false;
	let actionDetailsMap: Map<number, ActionDetails> = new Map();
	let testSuccessToasts: boolean[] = [];
	let testErrorToasts: boolean[] = [];

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

	// Fetch event details when event ID changes
	$: if (
		trigger.eventId !== previousEventId &&
		previousEventId !== undefined &&
		mounted
	) {
		trigger.conditions = [];
		previousEventId = trigger.eventId;
		loadEventDetails();
	}

	async function loadEventDetails() {
		if (!browser || !trigger.eventId) {
			eventDetails = null;
			propertyOptions = [];
			return;
		}

		// Load event details using the event ID
		eventDetails = await getEventDetails(fetch, trigger.eventId);
		propertyOptions = eventDetails.properties.map((prop) => ({
			value: prop.name,
			name: prop.name
		}));
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

	async function testActionHandler(index: number) {
		const actionBinding = trigger.actions[index];
		const response = await testAction(fetch, actionBinding);

		if (response.ok) {
			testSuccessToasts[index] = true;
			testSuccessToasts = testSuccessToasts;
			setTimeout(() => {
				testSuccessToasts[index] = false;
				testSuccessToasts = testSuccessToasts;
			}, 3000);
		} else {
			testErrorToasts[index] = true;
			testErrorToasts = testErrorToasts;
			setTimeout(() => {
				testErrorToasts[index] = false;
				testErrorToasts = testErrorToasts;
			}, 3000);
		}
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

	// Helper function to build dependency map for conditions
	function buildDependencyMap(
		conditions: Condition[],
		currentIndex: number
	): Record<string, string> {
		const deps: Record<string, string> = {};

		// Include values from previous conditions
		for (let i = 0; i < currentIndex; i++) {
			const cond = conditions[i];
			if (cond.propertyName && cond.value) {
				deps[cond.propertyName] = cond.value;
			}
		}

		return deps;
	}

	// Helper function to build dependency map for action parameters
	function buildActionDependencyMap(
		parameterMap: Record<string, string>,
		currentParamName: string
	): Record<string, string> {
		const deps: Record<string, string> = {};

		// Include all other parameters that have values
		for (const [key, value] of Object.entries(parameterMap)) {
			if (key !== currentParamName && value) {
				deps[key] = value;
			}
		}

		return deps;
	}

	// Helper to get property details by name
	function getPropertyByName(propertyName: string): EventPropertyInfo | undefined {
		return eventDetails?.properties.find((p) => p.name === propertyName);
	}

	// Helper to get lookup URL for a property
	function getLookupUrl(propertyName: string): string | undefined {
		return getPropertyByName(propertyName)?.lookupUrl;
	}
</script>

<Heading tag="h3" class="text-center">Edit Trigger</Heading>

<Grid>
	<TextInput label="Name" bind:value={trigger.name} />

	<SelectInput
		label="Applies to Event"
		placeholder="Choose the event for this trigger"
		items={data.eventOptions}
		bind:value={trigger.eventId}
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
								<SmartInput
									bind:value={condition.value}
									lookupUrl={getPropertyByName(condition.propertyName)?.lookupUrl}
									dependencyValues={buildDependencyMap(trigger.conditions, index)}
								/>
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
							<SmartInput
								label="Value"
								bind:value={condition.value}
								lookupUrl={getPropertyByName(condition.propertyName)?.lookupUrl}
								dependencyValues={buildDependencyMap(trigger.conditions, index)}
							/>
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
															<SmartInput
																bind:value={actionBinding.parameterMap[param.name]}
																placeholder={param.required ? 'Required' : 'Optional'}
																lookupUrl={param.lookupUrl}
																dependencyValues={buildActionDependencyMap(
																	actionBinding.parameterMap,
																	param.name
																)}
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
												<SmartInput
													bind:value={actionBinding.parameterMap[param.name]}
													placeholder={param.required ? 'Required' : 'Optional'}
													lookupUrl={param.lookupUrl}
													dependencyValues={buildActionDependencyMap(
														actionBinding.parameterMap,
														param.name
													)}
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

						<div class="mt-4 space-y-2">
							<Button
								size="sm"
								color="blue"
								class="w-full"
								on:click={() => testActionHandler(actionIndex)}
							>
								Test
							</Button>
							{#if testSuccessToasts[actionIndex]}
								<Toast
									transition={blur}
									params={{ amount: 10 }}
									bind:open={testSuccessToasts[actionIndex]}
									color="green"
									class="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200"
								>
									<svelte:fragment slot="icon">
										<svg
											class="w-5 h-5"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											></path>
										</svg>
									</svelte:fragment>
									Action test completed successfully.
								</Toast>
							{/if}
							{#if testErrorToasts[actionIndex]}
								<Toast
									transition={blur}
									params={{ amount: 10 }}
									bind:open={testErrorToasts[actionIndex]}
									color="red"
									class="bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200"
								>
									<svelte:fragment slot="icon">
										<svg
											class="w-5 h-5"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
												clip-rule="evenodd"
											></path>
										</svg>
									</svelte:fragment>
									Action test failed. Please check the configuration.
								</Toast>
							{/if}
							<Button
								size="sm"
								color="red"
								class="w-full"
								on:click={() => deleteAction(actionIndex)}
							>
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
