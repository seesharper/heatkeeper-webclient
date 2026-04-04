<script lang="ts">
	import type { PageData } from './$types';
	import type { DashboardEntry } from '$lib/models';
	import SunriseIcon from '../../components/SunriseIcon.svelte';
	import SunsetIcon from '../../components/SunsetIcon.svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;

	function formatTime(iso: string): string {
		return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}

	function formatDate(iso: string): string {
		return new Date(iso).toLocaleDateString([], { day: 'numeric', month: 'long' });
	}

	function formatHour(iso: string): string {
		return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }).slice(0, 2);
	}

	function formatPeriodRange(from: string, to: string): string {
		const h1 = new Date(from).getHours().toString().padStart(2, '0');
		const h2 = new Date(to).getHours().toString().padStart(2, '0');
		return `${h1}–${h2}`;
	}

	function formatTemp(temp: number | null): string {
		if (temp === null) return '–';
		return `${Math.round(temp)}°`;
	}

</script>

<div class="grid grid-cols-1 gap-6 mt-4 lg:grid-cols-2">
	{#each data.entries as entry}
		<div class="rounded-2xl overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-xl cursor-pointer" role="button" tabindex="0" on:click={() => goto(`/dashboard/temperatures/${entry.location.id}`)} on:keypress={(e) => e.key === 'Enter' && goto(`/dashboard/temperatures/${entry.location.id}`)}>
			<!-- Top section -->
			<div class="flex justify-between items-start p-5 pb-3">
				<!-- Left: icon + current temp -->
				<div class="flex items-center gap-3">
					<img
						src="/weather-icons/{entry.forecast.instant.symbolCode}.png"
						alt={entry.forecast.instant.symbolCode}
						class="w-16 h-16 drop-shadow-lg"
					/>
					<span class="text-5xl font-thin">{formatTemp(entry.forecast.instant.temperature)}</span>
				</div>

				<!-- Right: location name, date, time -->
				<div class="text-right">
					<div class="text-sm font-semibold text-gray-300 mb-1">{entry.location.name}</div>
					<div class="text-sm text-gray-400">{formatDate(entry.forecast.instant.from)}</div>
					<div class="text-3xl font-light">{formatHour(entry.forecast.instant.from)}:{new Date(entry.forecast.instant.from).getMinutes().toString().padStart(2, '0')}</div>
				</div>
			</div>

			<!-- Inside/outside temps + sun -->
			<div class="flex items-center gap-5 px-5 pb-3 text-sm text-gray-300">
				{#if entry.location.outsideTemperature !== null}
					<span class="flex items-center gap-1">
						<svg class="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
						</svg>
						Out {formatTemp(entry.location.outsideTemperature)}
					</span>
				{/if}
				{#if entry.location.insideTemperature !== null}
					<span class="flex items-center gap-1">
						<svg class="w-4 h-4 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
						</svg>
						In {formatTemp(entry.location.insideTemperature)}
					</span>
				{/if}
				<span class="flex items-center gap-1 ml-auto">
					<SunriseIcon size={16} />
					{formatTime(entry.sunEvents.sunriseUtc)}
				</span>
				<span class="flex items-center gap-1">
					<SunsetIcon size={16} />
					{formatTime(entry.sunEvents.sunsetUtc)}
				</span>
			</div>

			<!-- Divider -->
			<div class="border-t border-white/10 mx-4"></div>

			<!-- Forecast periods -->
			<div class="grid grid-cols-4 px-2 py-3">
				{#each [entry.forecast.firstPeriod, entry.forecast.secondPeriod, entry.forecast.thirdPeriod, entry.forecast.fourthPeriod] as period}
					{#if period}
						<div class="flex flex-col items-center gap-1 px-2">
							<span class="text-xs text-gray-400">{formatPeriodRange(period.from, period.to)}</span>
							<img
								src="/weather-icons/{period.symbolCode}.png"
								alt={period.symbolCode}
								class="w-9 h-9"
							/>
							<span class="text-sm font-medium">{formatTemp(period.temperature)}</span>
						</div>
					{:else}
						<div class="flex flex-col items-center gap-1 px-2"></div>
					{/if}
				{/each}
			</div>

			<!-- Footer: program/schedule info -->
			<div class="px-5 pb-3 text-xs text-gray-500 flex justify-between">
				<span>{entry.location.programName} / {entry.location.scheduleName}</span>
				<span>Updated {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
			</div>
		</div>
	{/each}
</div>
