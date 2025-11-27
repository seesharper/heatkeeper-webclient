<script lang="ts">
	import { Input, Label, Helper } from 'flowbite-svelte';
	export let longitude: number = 0;
	export let latitude: number = 0;
	export let label: string = 'Geo Location';

	// Regex patterns for validation
	// Longitude: -180 to 180 with up to 8 decimal places
	const longitudePattern = '^-?(180(\\.0+)?|1[0-7]\\d(\\.\\d+)?|\\d{1,2}(\\.\\d+)?)$';
	// Latitude: -90 to 90 with up to 8 decimal places
	const latitudePattern = '^-?(90(\\.0+)?|[1-8]?\\d(\\.\\d+)?)$';

	let longitudeError = false;
	let latitudeError = false;

	function validateLongitude(event: Event) {
		const target = event.currentTarget as HTMLInputElement;
		if (!target) return;
		const value = target.value;
		const regex = new RegExp(longitudePattern);
		const num = parseFloat(value);
		longitudeError = !regex.test(value) || num < -180 || num > 180;
	}

	function validateLatitude(event: Event) {
		const target = event.currentTarget as HTMLInputElement;
		if (!target) return;
		const value = target.value;
		const regex = new RegExp(latitudePattern);
		const num = parseFloat(value);
		latitudeError = !regex.test(value) || num < -90 || num > 90;
	}
</script>

<div class="space-y-4">
	<Label class="mb-2">{label}</Label>
	
	<div>
		<Label for="longitude" class="mb-2">Longitude</Label>
		<Input
			id="longitude"
			type="number"
			step="any"
			bind:value={longitude}
			on:input={validateLongitude}
			color={longitudeError ? 'red' : 'base'}
			placeholder="Enter longitude (-180 to 180)"
		/>
		{#if longitudeError}
			<Helper class="mt-2" color="red">
				Longitude must be between -180 and 180
			</Helper>
		{/if}
	</div>

	<div>
		<Label for="latitude" class="mb-2">Latitude</Label>
		<Input
			id="latitude"
			type="number"
			step="any"
			bind:value={latitude}
			on:input={validateLatitude}
			color={latitudeError ? 'red' : 'base'}
			placeholder="Enter latitude (-90 to 90)"
		/>
		{#if latitudeError}
			<Helper class="mt-2" color="red">
				Latitude must be between -90 and 90
			</Helper>
		{/if}
	</div>
</div>
