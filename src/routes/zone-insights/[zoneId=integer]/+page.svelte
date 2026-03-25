<script lang="ts">
	import { goto } from '$app/navigation';
	import { baseUrl } from '$lib/environment';
	import type { ZoneInsights } from '$lib/models';
	import { Resolution } from '$lib/models';
	import { CenteredHeader, EnergyCostChart, Grid, SelectInput } from '$lib/components';
	import { Chart, Card } from 'flowbite-svelte';
	import type { ApexOptions } from 'apexcharts';
	import type { PageData } from './$types';

	export let data: PageData;

	const timePeriods = [
		{ value: 1, name: 'Today' },
		{ value: 2, name: 'Yesterday' },
		{ value: 3, name: 'Last Week' },
		{ value: 4, name: 'This Month' },
		{ value: 6, name: 'This Week' },
		{ value: 7, name: 'Last Month' },
		{ value: 8, name: 'This Year' },
		{ value: 9, name: 'Last Year' }
	];

	let selectedTimePeriod: number = 1;
	let insights: ZoneInsights = data.zoneInsights;

	async function apiFetch<T>(url: string): Promise<T | null> {
		const response = await fetch(url, { credentials: 'include' });
		if (response.status === 401) {
			goto('/login');
			return null;
		}
		return response.json() as Promise<T>;
	}

	async function loadInsights() {
		const result = await apiFetch<ZoneInsights>(
			`${baseUrl}api/zones/${data.zoneId}/insights?timePeriod=${selectedTimePeriod}`
		);
		if (result) {
			insights = result;
		}
	}

	function buildTemperatureOptions(data: ZoneInsights): ApexOptions {
		const resolution = data.temperatures.resolution;
		const timeSeries = data.temperatures.timeSeries;
		const isHourly = resolution === Resolution.Hourly;

		function formatTimestamp(value: string): string {
			const date = new Date(value);
			if (isHourly) {
				return date.getHours().toString();
			} else if (resolution === Resolution.Daily) {
				return timeSeries.length > 7
					? date.getDate().toString()
					: date.toLocaleDateString('en-GB', { weekday: 'short' });
			} else {
				return date.toLocaleDateString('en-GB', { month: 'short' });
			}
		}

		return {
			chart: {
				type: 'line',
				height: 350,
				toolbar: { show: false },
				foreColor: '#FFF'
			},
			series: [
				{
					name: 'Temperature',
					data: timeSeries.map((e) => e.temperature)
				}
			],
			colors: ['#f59e0b'],
			xaxis: {
				type: 'category',
				categories: timeSeries.map((e) => formatTimestamp(e.timestamp)),
				labels: { hideOverlappingLabels: true }
			},
			yaxis: {
				labels: {
					formatter: (value) => value.toFixed(1) + ' °C'
				}
			},
			stroke: { curve: 'smooth', width: 2 },
			markers: { size: 0 },
			dataLabels: { enabled: false },
			legend: { show: false }
		};
	}
</script>

<CenteredHeader>Zone Insights</CenteredHeader>
<Grid>
	<div class="flex flex-col gap-4">
		<SelectInput
			label="Time Period"
			items={timePeriods}
			bind:value={selectedTimePeriod}
			on:change={loadInsights}
		/>
	</div>
	{#key insights}
		{#if insights.temperatures.timeSeries.length > 0}
			<Card>
				<CenteredHeader>Temperature</CenteredHeader>
				<Chart options={buildTemperatureOptions(insights)} />
			</Card>
		{/if}
		{#if insights.energyCosts.timeSeries.length > 0}
			<EnergyCostChart
				timeSeries={insights.energyCosts.timeSeries}
				resolution={insights.energyCosts.resolution}
			/>
		{/if}
	{/key}
</Grid>
