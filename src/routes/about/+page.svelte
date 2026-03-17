<script lang="ts">
	import { onMount } from 'svelte';
	import { Card } from 'flowbite-svelte';
	import { baseUrl } from '$lib/environment';

	const gitTag = import.meta.env.VITE_GIT_TAG;
	let serverVersion: string | null = null;

	onMount(async () => {
		const response = await fetch(`${baseUrl}api/version`);
		if (response.ok) {
			const data: { value: string } = await response.json();
			serverVersion = data.value;
		}
	});
</script>

<div class="flex justify-center pt-16">
	<Card class="w-full max-w-sm text-center">
		<div class="mb-6">
			<h1 class="text-3xl font-bold text-blue-500">HeatKeeper</h1>
	</div>
		<div class="divide-y divide-gray-200 dark:divide-gray-700">
			<div class="py-3">
				<p class="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">Client</p>
				<p class="mt-1 font-mono text-lg font-semibold text-gray-800 dark:text-white">{gitTag}</p>
			</div>
			<div class="py-3">
				<p class="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">Server</p>
				<p class="mt-1 font-mono text-lg font-semibold text-gray-800 dark:text-white">
					{serverVersion ?? '…'}
				</p>
			</div>
		</div>
	</Card>
</div>
