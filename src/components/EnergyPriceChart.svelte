<script lang="ts">
	import { Chart, Card } from 'flowbite-svelte';
	import type { ApexOptions } from 'apexcharts';
	import { CenteredHeader } from '$lib/components';
	import type { EnergyPrice } from '$lib/models';

	export let priceData: { x: Date; y: number }[];
	export let priceAfterSubsidyData: { x: Date; y: number }[];
	export let rawPrices: EnergyPrice[];
	export let title: string;

	// Calculate statistics
	$: priceStats = calculateStats(rawPrices.map((p) => p.price));
	$: priceAfterSubsidyStats = calculateStats(rawPrices.map((p) => p.priceAfterSubsidy));

	function calculateStats(values: number[]) {
		if (values.length === 0) return { min: 0, max: 0, avg: 0 };

		const min = Math.min(...values);
		const max = Math.max(...values);
		const avg = values.reduce((sum, val) => sum + val, 0) / values.length;

		return { min, max, avg };
	}

	let options: ApexOptions = {
		chart: {
			type: 'line',
			height: 350,
			toolbar: {
				show: false
			},
			foreColor: '#FFF'
		},
		series: [
			{
				name: 'Price',
				data: priceData
			},
			{
				name: 'Price After Subsidy',
				data: priceAfterSubsidyData
			}
		],
		stroke: {
			width: [2, 2],
			curve: 'smooth'
		},
		colors: ['#3b82f6', '#10b981'],
		xaxis: {
			tickAmount: 10,
			labels: {
				formatter: function (value) {
					return new Date(value).getHours().toString();
				},
				hideOverlappingLabels: false
			}
		},
		yaxis: {
			labels: {
				formatter: function (value) {
					return value.toFixed(2);
				}
			}
		},
		legend: {
			show: true,
			position: 'top'
		}
	};
</script>

<Card>
	<CenteredHeader>{title}</CenteredHeader>
	<Chart {options} />

	<!-- Statistics Section -->
	<div class="mt-6 grid grid-cols-2 gap-4">
		<!-- Price Statistics -->
		<div class="space-y-2">
			<h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Price</h4>
			<div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
				<div class="flex justify-between">
					<span>Min:</span>
					<span class="font-medium">{priceStats.min.toFixed(2)}</span>
				</div>
				<div class="flex justify-between">
					<span>Max:</span>
					<span class="font-medium">{priceStats.max.toFixed(2)}</span>
				</div>
				<div class="flex justify-between">
					<span>Avg:</span>
					<span class="font-medium">{priceStats.avg.toFixed(2)}</span>
				</div>
			</div>
		</div>

		<!-- Price After Subsidy Statistics -->
		<div class="space-y-2">
			<h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Price After Subsidy</h4>
			<div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
				<div class="flex justify-between">
					<span>Min:</span>
					<span class="font-medium">{priceAfterSubsidyStats.min.toFixed(2)}</span>
				</div>
				<div class="flex justify-between">
					<span>Max:</span>
					<span class="font-medium">{priceAfterSubsidyStats.max.toFixed(2)}</span>
				</div>
				<div class="flex justify-between">
					<span>Avg:</span>
					<span class="font-medium">{priceAfterSubsidyStats.avg.toFixed(2)}</span>
				</div>
			</div>
		</div>
	</div>
</Card>
