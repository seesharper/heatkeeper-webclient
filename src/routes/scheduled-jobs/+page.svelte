<script lang="ts">
	import type { PageData } from './$types';
	import {
		Button,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Heading
	} from 'flowbite-svelte';
	import { runJob } from '$lib/api';
	export let data: PageData;

	async function handleRunJob(jobName: string) {
		await runJob({ jobName });
		// Reload the page to refresh the job list
		window.location.reload();
	}
</script>

<Heading tag="h3" class="text-center">Scheduled Jobs</Heading>

<Table divClass="relative overflow-x-auto rounded-md mt-5" hoverable={false}>
	<TableHead>
		<TableHeadCell>Job</TableHeadCell>
		<TableHeadCell />
	</TableHead>
	<TableBody>
		{#each data.jobs as job}
			<TableBodyRow>
				<TableBodyCell>
					<div class="font-medium">{job.name}</div>
					<div class="text-sm text-gray-500 dark:text-gray-400">
						{job.state}
						{#if job.nextOccurrence}
							• Next: {new Date(job.nextOccurrence).toLocaleString()}
						{/if}
					</div>
				</TableBodyCell>
				<TableBodyCell class="text-end">
					<Button size="sm" on:click={() => handleRunJob(job.name)}>Run</Button>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
		{#if data.jobs.length === 0}
			<TableBodyRow>
				<TableBodyCell colspan="2" class="text-center">No scheduled jobs found</TableBodyCell>
			</TableBodyRow>
		{/if}
	</TableBody>
</Table>
