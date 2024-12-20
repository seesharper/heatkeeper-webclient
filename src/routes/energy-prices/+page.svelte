<script lang="ts">
	import { EnergyPriceChart } from '$lib/components';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

{#each data.chartTimeSeries as chartTimeSerie}
	<EnergyPriceChart
		bind:chartTimeSeries={chartTimeSerie.chartData}
		bind:title={chartTimeSerie.title}
	></EnergyPriceChart>
	<div class="mt-5"></div>
{/each}
