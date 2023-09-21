<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<main>
	<div class="flex justify-center items-center mb-10 m-10">
		<Card href="/cards">
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				Noteworthy technology acquisitions 2021 {data.result[1].insideHumidity}
			</h5>
			<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
				chronological order.
			</p>
		</Card>
	</div>

	<div class="flex justify-center items-center mb-10 m-10">
		<Card href="/cards">
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				Noteworthy technology acquisitions 2021
			</h5>
			<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
				chronological order.
			</p>
		</Card>
	</div>
</main>
