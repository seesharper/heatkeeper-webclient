<script lang="ts">
	import { Heading, Table, TableBody, TableBodyCell, TableBodyRow, Card } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import SelectInput from '../../../../components/SelectInput.svelte';
	import WindDirection from '../../../../components/WindDirection.svelte';
	import SunriseIcon from '../../../../components/SunriseIcon.svelte';
	import SunsetIcon from '../../../../components/SunsetIcon.svelte';
	import { activateProgram } from '$lib/api';
	import type { ZoneReading } from '$lib/models';
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';

	export let data: PageData;

	function formatTime(date: Date): string {
		return new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
	}

	function formatDate(date: Date): string {
		return new Date(date).toLocaleDateString('en-US', {
			weekday: 'long',
			month: 'long',
			day: 'numeric'
		});
	}
	async function handleClick(zoneReading: ZoneReading) {
		goto('/zone-details/' + zoneReading.zoneId);
	}
</script>

{#key $page.params}
	<div class="mt-2">
		<SelectInput
			label="Active Program"
			placeholder="Choose the active schedule"
			items={data.programs}
			bind:value={data.activeProgramId}
			on:change={async () => {
				await activateProgram(data.activeProgramId);
			}}
		></SelectInput>
	</div>
	<Table divClass="relative overflow-x-auto rounded-md mt-5" hoverable={true}>
		<TableBody>
			{#each data.temperatures as item}
				<TableBodyRow on:click={() => handleClick(item)}>
					<TableBodyCell
						><div>
							{item.name}
						</div>
					</TableBodyCell>
					<TableBodyCell class="text-right"
						><Heading tag="h6">{item.temperature}° / {item.humidity}%</Heading></TableBodyCell
					>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>

	<!-- Forecast Section -->
	<div class="mt-8">
		<Heading tag="h4" class="mb-4">Weather Forecast</Heading>
	</div>
	<div class="relative overflow-x-auto rounded-md space-y-4">
		{#each data.forecasts as forecast}
			<Card class="p-4 bg-gray-50 dark:bg-gray-800">
				<!-- Date Header -->
				<div class="mb-3">
					<Heading tag="h5" class="text-base font-medium text-gray-400 dark:text-gray-500">
						{formatDate(forecast.utcDate)}
					</Heading>
				</div>

				<!-- Sunrise/Sunset -->
				<div class="flex gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3 pl-2">
					<span class="flex items-center gap-1">
						<SunriseIcon size={16} />
						{formatTime(forecast.utcSunRise)}
					</span>
					<span class="flex items-center gap-1">
						<SunsetIcon size={16} />
						{formatTime(forecast.utcSunSet)}
					</span>
				</div>

				<!-- Hourly Forecast List -->
				<div class="space-y-2">
					{#each forecast.timeSeries as hour}
						<div
							class="flex items-center justify-between px-3 py-2 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
						>
							<!-- Time Range -->
							<div class="text-sm font-medium w-16 text-gray-600 dark:text-gray-300">
								{String(hour.hour).padStart(2, '0')}-{String((hour.hour + 1) % 24).padStart(2, '0')}
							</div>

							<!-- Weather Icon -->
							<div class="flex-shrink-0 mx-2">
								<img
									src="/weather-icons/{hour.symbolCode}.png"
									alt={hour.symbolCode}
									class="w-10 h-10"
								/>
							</div>

							<!-- Temperature -->
							<div class="text-lg font-medium w-12 text-center">
								{hour.temperature !== null ? `${Math.round(hour.temperature)}°` : 'N/A'}
							</div>

							<!-- Precipitation -->
							<div class="text-sm w-16 text-center text-gray-600 dark:text-gray-400">
								{hour.precipitationAmount > 0 ? `${hour.precipitationAmount.toFixed(1)}` : '0'}
							</div>

							<!-- Wind Speed and Direction -->
							<div class="flex items-center gap-2 justify-end min-w-[80px]">
								<span class="text-sm font-medium">
									{hour.windSpeed !== null ? Math.round(hour.windSpeed) : '0'}
									<span class="text-xs text-gray-500"
										>({hour.windSpeed !== null ? Math.round(hour.windSpeed * 3.6) : '0'})</span
									>
								</span>
								<WindDirection direction={hour.windFromDirection} size={20} />
							</div>
						</div>
					{/each}
				</div>
			</Card>
		{/each}
	</div>

	<Heading tag="h6" class="text-center mt-5">Updated {new Date().toLocaleString()}</Heading>
{/key}
