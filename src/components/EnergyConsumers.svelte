<script lang="ts">
	import { onDestroy } from 'svelte';
	import { baseUrl } from '$lib/environment';
	import { createSseStore } from '$lib/stores/sse';
	import type { EnergyConsumer } from '$lib/models';
	import { Badge, Checkbox, Label } from 'flowbite-svelte';

	export let locationId: number;

	let showAll = false;

	function buildUrl(showAll: boolean) {
		return `${baseUrl}api/locations/${locationId}/energy-consumers?showAll=${showAll}`;
	}

	let energyStore = createSseStore<EnergyConsumer[]>(buildUrl(false));

	function onShowAllChange() {
		energyStore.close();
		energyStore = createSseStore<EnergyConsumer[]>(buildUrl(showAll));
	}

	onDestroy(() => energyStore.close());

	function formatPower(watts: number): string {
		if (watts >= 1000) {
			return (watts / 1000).toFixed(2) + ' kW';
		}
		return watts.toFixed(0) + ' W';
	}

	function formatUpdated(updated: string): string {
		return new Date(updated).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
	}

	const statusColor = (status: string) => {
		switch (status) {
			case 'open': return 'green';
			case 'connecting': return 'yellow';
			case 'error': return 'red';
			default: return 'dark';
		}
	};
</script>

<div class="flex flex-wrap items-center gap-3 mb-4">
	<h2 class="text-xl font-semibold">Energy Consumers</h2>
	<Badge color={statusColor($energyStore.status)}>{$energyStore.status}</Badge>
	{#if $energyStore.lastUpdated}
		<span class="text-sm text-gray-500">{$energyStore.lastUpdated.toLocaleTimeString()}</span>
	{/if}
</div>

<div class="flex items-center gap-2 mb-4">
	<Checkbox id="showAll" bind:checked={showAll} on:change={onShowAllChange} />
	<Label for="showAll">Show all (including inactive)</Label>
</div>

{#if $energyStore.status === 'connecting' && !$energyStore.data}
	<p class="text-sm text-gray-500">Connecting...</p>
{:else if $energyStore.status === 'error' && !$energyStore.data}
	<p class="text-sm text-red-600">{$energyStore.error ?? 'Connection error'}</p>
{:else}
	{@const consumers = ($energyStore.data ?? []).slice().sort((a, b) => b.activePowerImport - a.activePowerImport)}
	<div class="flex flex-col gap-2">
		{#each consumers as consumer (consumer.sensorId)}
			<div class="rounded-lg border border-gray-700 bg-gray-800 px-4 py-3">
				<div class="font-medium text-white truncate">{consumer.sensorName}</div>
				<div class="flex items-center justify-between mt-1">
					<span class="font-mono text-lg text-white">{formatPower(consumer.activePowerImport)}</span>
					<span class="text-sm text-gray-400">{formatUpdated(consumer.updated)}</span>
				</div>
			</div>
		{:else}
			<p class="text-sm text-gray-500">No consumers found</p>
		{/each}
	</div>

	{#if consumers.length > 0}
		{@const total = consumers.reduce((sum, c) => sum + c.activePowerImport, 0)}
		<div class="mt-4 rounded-lg border border-gray-600 bg-gray-700 px-4 py-3">
			<div class="font-medium text-gray-300">Total</div>
			<div class="mt-1">
				<span class="font-mono text-lg text-white">{formatPower(total)}</span>
			</div>
		</div>
	{/if}
{/if}
