<script lang="ts">
	import { Chart, Card } from 'flowbite-svelte';
	import type { ApexOptions } from 'apexcharts';
	import { CenteredHeader } from '$lib/components';
	import { Resolution } from '$lib/models';
	import type { EnergyCostEntry } from '$lib/models';

	export let timeSeries: EnergyCostEntry[];
	export let resolution: Resolution;

	function formatTimestamp(value: string): string {
		const date = new Date(value);
		if (resolution === Resolution.Hourly) {
			return date.getHours().toString().padStart(2, '0') + ':00';
		} else if (resolution === Resolution.Daily) {
			return date.toLocaleDateString('en-GB', { weekday: 'short' });
		} else {
			return date.toLocaleDateString('en-GB', { month: 'short' });
		}
	}

	const categories = timeSeries.map((e) => formatTimestamp(e.timestamp));

	const n = timeSeries.length || 1;

	const stats = [
		{
			label: 'Cost',
			total: timeSeries.reduce((s, e) => s + e.costInLocalCurrency, 0),
			avg: timeSeries.reduce((s, e) => s + e.costInLocalCurrency, 0) / n
		},
		{
			label: 'Cost After Subsidy',
			total: timeSeries.reduce((s, e) => s + e.costInLocalCurrencyAfterSubsidy, 0),
			avg: timeSeries.reduce((s, e) => s + e.costInLocalCurrencyAfterSubsidy, 0) / n
		},
		{
			label: 'Cost With Fixed Price',
			total: timeSeries.reduce((s, e) => s + e.costInLocalCurrencyWithFixedPrice, 0),
			avg: timeSeries.reduce((s, e) => s + e.costInLocalCurrencyWithFixedPrice, 0) / n
		}
	];

	const options: ApexOptions = {
		chart: {
			type: 'bar',
			height: 400,
			toolbar: { show: false },
			foreColor: '#FFF'
		},
		series: [
			{
				name: 'Cost',
				data: timeSeries.map((e) => e.costInLocalCurrency)
			},
			{
				name: 'Cost After Subsidy',
				data: timeSeries.map((e) => e.costInLocalCurrencyAfterSubsidy)
			},
			{
				name: 'Cost With Fixed Price',
				data: timeSeries.map((e) => e.costInLocalCurrencyWithFixedPrice)
			}
		],
		colors: ['#3b82f6', '#10b981', '#f59e0b'],
		xaxis: {
			categories,
			labels: { hideOverlappingLabels: true }
		},
		yaxis: {
			labels: {
				formatter: (value) => value.toFixed(2)
			}
		},
		legend: {
			show: true,
			position: 'top'
		},
		dataLabels: { enabled: false },
		plotOptions: {
			bar: { columnWidth: '80%' }
		}
	};
</script>

<Card>
	<CenteredHeader>Energy Costs</CenteredHeader>
	<Chart {options} />
	<div class="mt-6 grid grid-cols-4 gap-2 text-sm">
		<div></div>
		{#each stats as stat, i}
			<div class="font-semibold" style="color: {options.colors[i]}">{stat.label}</div>
		{/each}

		<div class="font-medium text-gray-600 dark:text-gray-400">Total</div>
		{#each stats as stat}
			<div class="text-gray-600 dark:text-gray-400">{stat.total.toFixed(2)}</div>
		{/each}

		<div class="font-medium text-gray-600 dark:text-gray-400">Avg</div>
		{#each stats as stat}
			<div class="text-gray-600 dark:text-gray-400">{stat.avg.toFixed(2)}</div>
		{/each}
	</div>
</Card>
