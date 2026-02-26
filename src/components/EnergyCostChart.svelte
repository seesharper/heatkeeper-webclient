<script lang="ts">
	import { Chart, Card } from 'flowbite-svelte';
	import type { ApexOptions } from 'apexcharts';
	import { CenteredHeader } from '$lib/components';
	import { Resolution } from '$lib/models';
	import type { EnergyCostEntry } from '$lib/models';

	export let timeSeries: EnergyCostEntry[];
	export let resolution: Resolution;

	function aggregatePairs(entries: EnergyCostEntry[]): EnergyCostEntry[] {
		const result: EnergyCostEntry[] = [];
		for (let i = 0; i < entries.length; i += 2) {
			const a = entries[i];
			const b = entries[i + 1];
			result.push({
				timestamp: a.timestamp,
				powerImport: a.powerImport + (b?.powerImport ?? 0),
				costInLocalCurrency: a.costInLocalCurrency + (b?.costInLocalCurrency ?? 0),
				costInLocalCurrencyAfterSubsidy:
					a.costInLocalCurrencyAfterSubsidy + (b?.costInLocalCurrencyAfterSubsidy ?? 0),
				costInLocalCurrencyWithFixedPrice:
					a.costInLocalCurrencyWithFixedPrice + (b?.costInLocalCurrencyWithFixedPrice ?? 0)
			});
		}
		return result;
	}

	const isHourly = resolution === Resolution.Hourly;
	const displaySeries = isHourly ? aggregatePairs(timeSeries) : timeSeries;

	function formatTimestamp(value: string): string {
		const date = new Date(value);
		if (isHourly) {
			return date.getHours().toString();
		} else if (resolution === Resolution.Daily) {
			return date.toLocaleDateString('en-GB', { weekday: 'short' });
		} else {
			return date.toLocaleDateString('en-GB', { month: 'short' });
		}
	}

	const categories = displaySeries.map((e) => formatTimestamp(e.timestamp));

	const n = displaySeries.length || 1;

	const stats = [
		{
			label: 'Cost',
			total: displaySeries.reduce((s, e) => s + e.costInLocalCurrency, 0),
			avg: displaySeries.reduce((s, e) => s + e.costInLocalCurrency, 0) / n
		},
		{
			label: 'Cost After Subsidy',
			total: displaySeries.reduce((s, e) => s + e.costInLocalCurrencyAfterSubsidy, 0),
			avg: displaySeries.reduce((s, e) => s + e.costInLocalCurrencyAfterSubsidy, 0) / n
		},
		{
			label: 'Cost With Fixed Price',
			total: displaySeries.reduce((s, e) => s + e.costInLocalCurrencyWithFixedPrice, 0),
			avg: displaySeries.reduce((s, e) => s + e.costInLocalCurrencyWithFixedPrice, 0) / n
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
				data: displaySeries.map((e) => e.costInLocalCurrency)
			},
			{
				name: 'Cost After Subsidy',
				data: displaySeries.map((e) => e.costInLocalCurrencyAfterSubsidy)
			},
			{
				name: 'Cost With Fixed Price',
				data: displaySeries.map((e) => e.costInLocalCurrencyWithFixedPrice)
			}
		],
		colors: ['#3b82f6', '#10b981', '#f59e0b'],
		xaxis: {
			type: 'category',
			categories,
			labels: { hideOverlappingLabels: true }
		},
		yaxis: {
			labels: {
				formatter: (value) => value.toFixed(0)
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
