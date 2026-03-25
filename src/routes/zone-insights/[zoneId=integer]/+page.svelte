<script lang="ts">
	import { goto } from '$app/navigation';
	import { baseUrl } from '$lib/environment';
	import type { ZoneInsights, ZoneSetPoint } from '$lib/models';
	import { Resolution } from '$lib/models';
	import { CenteredHeader, EnergyCostChart, Grid, SelectInput, SaveButton } from '$lib/components';
	import { Chart, Card, Range, Heading } from 'flowbite-svelte';
	import type { ApexOptions } from 'apexcharts';
	import type { PageData } from './$types';
	import { updateSetPoint } from '$lib/api';

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
	let setPoints: ZoneSetPoint[] = data.zoneInsights.setPoints ?? [];

	async function handleSaveSetPoints() {
		for (const sp of setPoints) {
			await updateSetPoint({ id: sp.id, value: sp.value, hysteresis: sp.hysteresis });
		}
	}

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
				type: 'area',
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
			fill: {
				type: 'gradient',
				gradient: {
					shadeIntensity: 1,
					opacityFrom: 0.5,
					opacityTo: 0.05,
					stops: [0, 90, 100]
				}
			},
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
			legend: { show: false },
			grid: {
				borderColor: '#ffffff15'
			}
		};
	}
</script>

<CenteredHeader>Zone Insights</CenteredHeader>
<Grid>
	{#if setPoints.length > 0}
		<Card>
			<CenteredHeader>Setpoints</CenteredHeader>
			{#each setPoints as sp}
				<Heading tag="h6" class="mt-4">{sp.scheduleName}</Heading>
				<p class="text-sm text-gray-400">{sp.value.toFixed(1)} °C</p>
				<Range min={0} max={30} step={0.5} bind:value={sp.value} />
			{/each}
			<div class="mt-4">
				<SaveButton on:click={async () => await handleSaveSetPoints()} />
			</div>
		</Card>
	{/if}
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
