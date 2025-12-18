<script lang="ts">
	import { CenteredHeader } from '$lib/components';
	import { executeQuery } from '$lib/api';
	import type { DatabaseQuery, Table } from '$lib/models';
	import {
		Button,
		Textarea,
		Table as FlowbiteTable,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyRow,
		TableBodyCell
	} from 'flowbite-svelte';

	let query: DatabaseQuery = { sql: '' };
	let result: Table | null = null;
	let error: string | null = null;
	let isExecuting = false;
	let textareaElement: HTMLTextAreaElement;

	function getSelectedText(): string | null {
		if (!textareaElement) return null;

		const start = textareaElement.selectionStart;
		const end = textareaElement.selectionEnd;

		if (start !== end) {
			return textareaElement.value.substring(start, end);
		}

		return null;
	}

	async function handleExecuteQuery() {
		// Check if there's selected text
		const selectedText = getSelectedText();
		const sqlToExecute = selectedText || query.sql;

		if (!sqlToExecute.trim()) {
			error = 'Please enter a SQL query';
			return;
		}

		error = null;
		result = null;
		isExecuting = true;

		try {
			result = await executeQuery({ sql: sqlToExecute });
		} catch (e) {
			error = e instanceof Error ? e.message : 'An error occurred while executing the query';
		} finally {
			isExecuting = false;
		}
	}
</script>

<CenteredHeader>Query Console</CenteredHeader>

<div class="space-y-4">
	<div>
		<label for="sql" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
			SQL Query
		</label>
		<textarea
			id="sql"
			bind:this={textareaElement}
			bind:value={query.sql}
			placeholder="Enter your SQL query here..."
			rows="8"
			class="font-mono block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
		></textarea>
	</div>

	<div class="flex gap-2">
		<Button on:click={handleExecuteQuery} disabled={isExecuting}>
			{isExecuting ? 'Executing...' : 'Execute Query'}
		</Button>
	</div>

	{#if error}
		<div
			class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
		>
			{error}
		</div>
	{/if}

	{#if result}
		<div class="mt-6">
			<h3 class="text-lg font-semibold mb-3">Results</h3>
			{#if result.rows.length === 0}
				<p class="text-gray-500">No rows returned</p>
			{:else}
				<FlowbiteTable divClass="relative overflow-x-auto rounded-md">
					<TableHead>
						{#each result.columns as column}
							<TableHeadCell>{column.name}</TableHeadCell>
						{/each}
					</TableHead>
					<TableBody>
						{#each result.rows as row}
							<TableBodyRow>
								{#each row.cells as cell}
									<TableBodyCell>{cell.value !== null ? cell.value : 'NULL'}</TableBodyCell>
								{/each}
							</TableBodyRow>
						{/each}
					</TableBody>
				</FlowbiteTable>
				<p class="mt-2 text-sm text-gray-500">
					{result.rows.length} row{result.rows.length === 1 ? '' : 's'} returned
				</p>
			{/if}
		</div>
	{/if}
</div>
