<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { baseUrl } from '$lib/environment';
	import type { EnergyCost, SensorInfo } from '$lib/models';
	import { CenteredHeader, EnergyCostChart, Grid, SelectInput } from '$lib/components';
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

	let selectedLocationId: number | null = data.locations[0]?.value ?? null;
	let selectedSensorId: number = 0;
	let selectedTimePeriod: number = 6;

	onMount(() => onLocationChange());
	let sensors: { value: number; name: string }[] = [];
	let energyCost: EnergyCost | null = null;

	async function apiFetch<T>(url: string): Promise<T | null> {
		const response = await fetch(url, { credentials: 'include' });
		if (response.status === 401) {
			goto('/login');
			return null;
		}
		return response.json() as Promise<T>;
	}

	async function onLocationChange() {
		if (!selectedLocationId) return;
		selectedSensorId = 0;
		sensors = [];
		energyCost = null;
		const sensorInfos = await apiFetch<SensorInfo[]>(
			`${baseUrl}api/energy-costs/sensors?locationId=${selectedLocationId}`
		);
		if (sensorInfos) {
			sensors = sensorInfos.map((s) => ({ value: s.id, name: s.name }));
		}
		await loadEnergyCosts();
	}

	async function loadEnergyCosts() {
		if (!selectedLocationId) return;
		let url = `${baseUrl}api/energy-costs?locationId=${selectedLocationId}&timePeriod=${selectedTimePeriod}`;
		if (selectedSensorId !== 0) {
			url += `&sensorId=${selectedSensorId}`;
		}
		energyCost = await apiFetch<EnergyCost>(url);
	}
</script>

<CenteredHeader>Energy Costs</CenteredHeader>
<Grid>
	<div class="flex flex-col gap-4">
		<SelectInput
			label="Location"
			placeholder="Select a location"
			items={data.locations}
			bind:value={selectedLocationId}
			on:change={onLocationChange}
		/>
		<SelectInput
			label="Sensor"
			placeholder="Select a sensor"
			items={[{ value: 0, name: 'All' }, ...sensors]}
			bind:value={selectedSensorId}
			on:change={loadEnergyCosts}
		/>
		<SelectInput
			label="Time Period"
			items={timePeriods}
			bind:value={selectedTimePeriod}
			on:change={loadEnergyCosts}
		/>
	</div>
	{#if energyCost && energyCost.timeSeries.length > 0}
		{#key energyCost}
			<EnergyCostChart timeSeries={energyCost.timeSeries} resolution={energyCost.resolution} />
		{/key}
	{:else if selectedLocationId}
		<p class="text-gray-500 mt-4">No data available for the selected filters.</p>
	{/if}
</Grid>
