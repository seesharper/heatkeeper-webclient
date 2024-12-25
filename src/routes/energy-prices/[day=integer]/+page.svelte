<script lang="ts">
	import { EnergyPriceChart } from '$lib/components';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	export let data: PageData;
</script>

{#key $page.params}
	<div class="mt-5">
		{#each data.chartTimeSeries as chartTimeSerie}
			<EnergyPriceChart
				bind:chartTimeSeries={chartTimeSerie.chartData}
				bind:title={chartTimeSerie.title}
			></EnergyPriceChart>
			<div class="mt-5"></div>
		{/each}
	</div>
{/key}
