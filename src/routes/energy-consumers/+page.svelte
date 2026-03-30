<script lang="ts">
	import type { PageData } from './$types';
	import { EnergyConsumers, SelectInput } from '$lib/components';

	export let data: PageData;

	let selectedLocationId: number | null = data.locations[0]?.id ?? null;

	$: locationItems = data.locations.map((l) => ({ value: l.id, name: l.name }));
</script>

<svelte:head>
	<title>Energy Consumers</title>
</svelte:head>

<h1 class="text-2xl font-semibold mb-6">Energy Consumers</h1>

<div class="mb-6 max-w-sm">
	<SelectInput
		label="Location"
		items={locationItems}
		bind:value={selectedLocationId}
		placeholder="Select a location"
	/>
</div>

{#key selectedLocationId}
	{#if selectedLocationId}
		<EnergyConsumers locationId={selectedLocationId} />
	{/if}
{/key}
