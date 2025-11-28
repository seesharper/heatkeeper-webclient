<script lang="ts">
	import { baseUrl } from '$lib/environment';
	import type { SmartMeterReadings } from '$lib/models';
	import { Card, Badge } from 'flowbite-svelte';
	import { createSseStore } from '$lib/stores/sse';
	import Sparkline from '../../components/Sparkline.svelte';
	import Gauge from '../../components/Gauge.svelte';

	// Reusable SSE store for smart meter
	const smart = createSseStore<SmartMeterReadings>(`${baseUrl}api/smart-meter`, {
		withCredentials: true
	});

	// Keep a short history of active power for sparkline
	let powerHistory: number[] = [];
	const maxPoints = 120; // ~last 120 updates
	$: maxGauge = Math.max(5000, Math.max(0, ...powerHistory));

	// Update history when new data arrives
	$: if ($smart.data?.activePowerImport !== undefined) {
		powerHistory = [...powerHistory.slice(-(maxPoints - 1)), $smart.data.activePowerImport];
	}

	const format = (v: number | null | undefined, fractionDigits = 2) =>
		typeof v === 'number' ? v.toFixed(fractionDigits) : '—';

	const badgeColor = () => {
		switch ($smart.status) {
			case 'open':
				return 'green';
			case 'connecting':
				return 'yellow';
			case 'error':
				return 'red';
			case 'closed':
			default:
				return 'dark';
		}
	};
</script>

<svelte:head>
	<title>Smart Meter</title>
</svelte:head>

<div class="flex items-center gap-3 mb-6">
	<h1 class="text-2xl font-semibold">Smart Meter</h1>
	<Badge color={badgeColor()}>{$smart.status}</Badge>
	{#if $smart.lastUpdated}
		<span class="text-sm text-gray-500">Updated {$smart.lastUpdated.toLocaleTimeString()}</span>
	{/if}
	{#if $smart.error}
		<span class="text-sm text-red-600">{$smart.error}</span>
	{/if}
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
	<Card class="h-full">
		<h5 class="text-sm text-gray-500 mb-2">Active Power Import</h5>
		<div class="flex items-center gap-4">
			<Gauge
				value={$smart.data?.activePowerImport ?? 0}
				min={0}
				max={maxGauge}
				size={140}
				thickness={12}
				units="W"
			/>
			<div class="flex-1 min-w-0">
				<p class="text-2xl font-medium">
					{format($smart.data?.activePowerImport, 1)} <span class="text-base text-gray-500">W</span>
				</p>
				<div class="mt-2">
					<Sparkline
						values={powerHistory}
						width={280}
						height={60}
						stroke="#1e40af"
						strokeWidth={2}
						fill="rgba(30,64,175,0.12)"
					/>
				</div>
			</div>
		</div>
	</Card>
	<Card class="h-full">
		<h5 class="text-sm text-gray-500">Cumulative Power Import</h5>
		<p class="text-2xl font-medium">
			{format($smart.data?.cumulativePowerImport, 3)}
			<span class="text-base text-gray-500">kWh</span>
		</p>
	</Card>
	<Card class="h-full">
		<h5 class="text-sm text-gray-500">Current Phase 1</h5>
		<p class="text-2xl font-medium">
			{format($smart.data?.currentPhase1, 2)} <span class="text-base text-gray-500">A</span>
		</p>
	</Card>
	<Card class="h-full">
		<h5 class="text-sm text-gray-500">Current Phase 2</h5>
		<p class="text-2xl font-medium">
			{format($smart.data?.currentPhase2, 2)} <span class="text-base text-gray-500">A</span>
		</p>
	</Card>
	<Card class="h-full">
		<h5 class="text-sm text-gray-500">Current Phase 3</h5>
		<p class="text-2xl font-medium">
			{format($smart.data?.currentPhase3, 2)} <span class="text-base text-gray-500">A</span>
		</p>
	</Card>
	<Card class="h-full">
		<h5 class="text-sm text-gray-500">Voltage L1–L2</h5>
		<p class="text-2xl font-medium">
			{format($smart.data?.voltageBetweenPhase1AndPhase2, 0)}
			<span class="text-base text-gray-500">V</span>
		</p>
	</Card>
	<Card class="h-full">
		<h5 class="text-sm text-gray-500">Voltage L1–L3</h5>
		<p class="text-2xl font-medium">
			{format($smart.data?.voltageBetweenPhase1AndPhase3, 0)}
			<span class="text-base text-gray-500">V</span>
		</p>
	</Card>
	<Card class="h-full">
		<h5 class="text-sm text-gray-500">Voltage L2–L3</h5>
		<p class="text-2xl font-medium">
			{format($smart.data?.voltageBetweenPhase2AndPhase3, 0)}
			<span class="text-base text-gray-500">V</span>
		</p>
	</Card>
</div>
