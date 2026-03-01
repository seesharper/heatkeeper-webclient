<script lang="ts">
	import type {
		ConditionGroup,
		ConditionNode,
		LogicalNode,
		EventPropertyInfo
	} from '$lib/models';
	import { ComparisonOperator, LogicalOperator } from '$lib/models';
	import { SelectInput, SmartInput } from '$lib/components';
	import { Button } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';

	export let node: ConditionGroup;
	export let propertyOptions: { value: string; name: string }[] = [];
	export let eventProperties: EventPropertyInfo[] = [];
	export let allLeafValues: Record<string, string> = {};

	const dispatch = createEventDispatcher<{ change: ConditionGroup }>();

	const comparisonOperatorOptions = [
		{ value: ComparisonOperator.Equals, name: 'Equals' },
		{ value: ComparisonOperator.NotEquals, name: 'Not Equals' },
		{ value: ComparisonOperator.GreaterThan, name: 'Greater Than' },
		{ value: ComparisonOperator.GreaterOrEqual, name: 'Greater or Equal' },
		{ value: ComparisonOperator.LessThan, name: 'Less Than' },
		{ value: ComparisonOperator.LessOrEqual, name: 'Less or Equal' },
		{ value: ComparisonOperator.Contains, name: 'Contains' },
		{ value: ComparisonOperator.StartsWith, name: 'Starts With' },
		{ value: ComparisonOperator.EndsWith, name: 'Ends With' }
	];

	function getLookupUrl(propertyName: string): string | undefined {
		return eventProperties.find((p) => p.name === propertyName)?.lookupUrl;
	}

	function addCondition(operator: LogicalOperator) {
		const newLeaf: ConditionNode = {
			type: 'condition',
			propertyName: '',
			operator: ComparisonOperator.Equals,
			value: ''
		};
		if (node === null) {
			dispatch('change', newLeaf);
		} else {
			dispatch('change', {
				type: 'logical',
				operator,
				left: node,
				right: newLeaf
			} satisfies LogicalNode);
		}
	}

	function handleDelete() {
		dispatch('change', null);
	}

	function handleLeftChange(event: CustomEvent<ConditionGroup>) {
		if (node?.type !== 'logical') return;
		const newLeft = event.detail;
		if (newLeft === null) {
			// Left child deleted: replace this logical node with the right child
			dispatch('change', node.right);
		} else {
			dispatch('change', { ...node, left: newLeft });
		}
	}

	function handleRightChange(event: CustomEvent<ConditionGroup>) {
		if (node?.type !== 'logical') return;
		const newRight = event.detail;
		if (newRight === null) {
			// Right child deleted: replace this logical node with the left child
			dispatch('change', node.left);
		} else {
			dispatch('change', { ...node, right: newRight });
		}
	}

	function toggleOperator() {
		if (node?.type !== 'logical') return;
		dispatch('change', {
			...node,
			operator: node.operator === LogicalOperator.And ? LogicalOperator.Or : LogicalOperator.And
		});
	}

	// Reactive typed views — derived from `node` so bind:value works (unlike {@const})
	$: leafNode = node?.type === 'condition' ? (node as ConditionNode) : null;
	$: logicalNode = node?.type === 'logical' ? (node as LogicalNode) : null;
</script>

{#if node === null}
	<div class="flex items-center gap-3 py-2 text-gray-500 dark:text-gray-400">
		<span class="text-sm">No conditions — fires on every matching event</span>
		<Button size="xs" color="light" on:click={() => addCondition(LogicalOperator.And)}>
			+ Add Condition
		</Button>
	</div>
{:else if leafNode !== null}
	<div
		class="flex flex-wrap gap-2 items-end p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
	>
		<div class="flex-1 min-w-[140px]">
			<SelectInput
				items={propertyOptions}
				bind:value={leafNode.propertyName}
				placeholder="Property"
			/>
		</div>
		<div class="w-44">
			<SelectInput items={comparisonOperatorOptions} bind:value={leafNode.operator} />
		</div>
		<div class="flex-1 min-w-[120px]">
			<SmartInput
				bind:value={leafNode.value}
				lookupUrl={getLookupUrl(leafNode.propertyName)}
				dependencyValues={allLeafValues}
			/>
		</div>
		<Button size="xs" color="red" on:click={handleDelete} title="Delete condition">✕</Button>
	</div>
	<div class="flex gap-2 mt-2 ml-1">
		<Button size="xs" color="light" on:click={() => addCondition(LogicalOperator.And)}>
			+ AND
		</Button>
		<Button size="xs" color="light" on:click={() => addCondition(LogicalOperator.Or)}>
			+ OR
		</Button>
	</div>
{:else if logicalNode !== null}
	<div class="border border-blue-200 dark:border-blue-700 rounded-lg p-3 space-y-3">
		<div class="flex items-center justify-between">
			<button
				type="button"
				class="px-3 py-1 text-xs font-bold rounded cursor-pointer transition-colors
					{logicalNode.operator === LogicalOperator.And
					? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800'
					: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-800'}"
				on:click={toggleOperator}
				title="Click to toggle AND / OR"
			>
				{logicalNode.operator === LogicalOperator.And ? 'AND' : 'OR'}
			</button>
			<Button size="xs" color="red" on:click={handleDelete}>Delete Group</Button>
		</div>

		<svelte:self
			node={logicalNode.left}
			{propertyOptions}
			{eventProperties}
			{allLeafValues}
			on:change={handleLeftChange}
		/>

		<div class="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
			<div class="flex-1 border-t border-gray-200 dark:border-gray-600"></div>
			<span class="font-semibold">
				{logicalNode.operator === LogicalOperator.And ? 'AND' : 'OR'}
			</span>
			<div class="flex-1 border-t border-gray-200 dark:border-gray-600"></div>
		</div>

		<svelte:self
			node={logicalNode.right}
			{propertyOptions}
			{eventProperties}
			{allLeafValues}
			on:change={handleRightChange}
		/>
	</div>
{/if}
