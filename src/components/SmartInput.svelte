<script lang="ts">
	/**
	 * SmartInput - An intelligent input component that automatically switches between
	 * text input and select/lookup input based on the presence of a lookupUrl.
	 *
	 * When lookupUrl is provided:
	 * - Fetches lookup options from the API endpoint
	 * - Supports parameterized URLs (e.g., "api/zones/{locationId}")
	 * - Handles dependencies: waits for required parameters before loading
	 * - Displays select dropdown with fetched options
	 *
	 * When lookupUrl is not provided:
	 * - Falls back to a standard text input
	 *
	 * @prop {string} label - Input label
	 * @prop {string} value - Two-way bound input value
	 * @prop {string | undefined} lookupUrl - Optional API endpoint for lookup options
	 * @prop {Record<string, string>} dependencyValues - Parameter values for URL resolution
	 * @prop {string} placeholder - Placeholder text
	 */
	import { SelectInput, TextInput } from '$lib/components';
	import type { LookupItem } from '$lib/models';
	import { onMount } from 'svelte';
	import { baseUrl } from '$lib/environment';
	import { Get } from '$lib/api';

	export let label: string = '';
	export let value: string;
	export let lookupUrl: string | undefined = undefined;
	export let dependencyValues: Record<string, string> = {};
	export let placeholder: string = '';

	let lookupItems: { value: string; name: string }[] = [];
	let isLoadingLookup = false;
	let lookupError: string | null = null;
	let previousDependencyValues: string = '';
	let displayValue: string = '';

	$: hasLookup = !!lookupUrl;
	$: canLoadLookup = hasLookup && areDependenciesSatisfied();

	// Watch for dependency changes and value changes
	$: dependencyValuesString = JSON.stringify(dependencyValues);
	$: if (dependencyValuesString !== previousDependencyValues && canLoadLookup) {
		previousDependencyValues = dependencyValuesString;
		loadLookupData();
	}

	// Also watch for initial value - if we have a value but no items, try loading
	$: if (hasLookup && value && lookupItems.length === 0 && !isLoadingLookup && canLoadLookup) {
		loadLookupData();
	}

	// Update display value when lookup items or value changes
	$: if (hasLookup && lookupItems.length > 0) {
		const item = lookupItems.find((i) => i.value === value);
		displayValue = item ? item.name : value;
	} else {
		displayValue = value;
	}

	onMount(() => {
		if (canLoadLookup) {
			loadLookupData();
		}
	});

	function areDependenciesSatisfied(): boolean {
		if (!lookupUrl) return false;

		// Extract parameter names from the URL (e.g., {locationId})
		const paramMatches = lookupUrl.matchAll(/\{([^}]+)\}/g);
		const paramNames = Array.from(paramMatches, (m) => m[1]);

		// Check if all required dependencies have values (case-insensitive matching)
		return paramNames.every((paramName) => {
			// Try exact match first
			if (dependencyValues[paramName]) {
				return true;
			}

			// Try case-insensitive match
			const lowerParamName = paramName.toLowerCase();
			for (const [key, value] of Object.entries(dependencyValues)) {
				if (key.toLowerCase() === lowerParamName && value) {
					return true;
				}
			}

			return false;
		});
	}

	function resolveUrl(): string {
		if (!lookupUrl) return '';

		let resolvedUrl = lookupUrl;

		// Replace all {paramName} placeholders with actual values (case-insensitive)
		const paramMatches = lookupUrl.matchAll(/\{([^}]+)\}/g);
		for (const match of paramMatches) {
			const paramName = match[1];
			let value = dependencyValues[paramName];

			// If not found, try case-insensitive match
			if (!value) {
				const lowerParamName = paramName.toLowerCase();
				for (const [key, val] of Object.entries(dependencyValues)) {
					if (key.toLowerCase() === lowerParamName) {
						value = val;
						break;
					}
				}
			}

			if (value) {
				resolvedUrl = resolvedUrl.replace(`{${paramName}}`, value);
			}
		}

		return `${baseUrl}${resolvedUrl}`;
	}

	async function loadLookupData() {
		if (!canLoadLookup) {
			lookupItems = [];
			return;
		}

		isLoadingLookup = true;
		lookupError = null;

		try {
			const url = resolveUrl();
			console.log('SmartInput loading lookup from:', url, 'current value:', value);
			const response = await Get<LookupItem[]>(fetch, url);

			// Ensure response is an array
			if (!Array.isArray(response)) {
				console.error('Lookup API did not return an array:', response);
				lookupError = 'Invalid response format';
				lookupItems = [];
				return;
			}

			lookupItems = response.map((item) => ({
				value: item.id.toString(),
				name: item.name
			}));
			console.log('SmartInput loaded', lookupItems.length, 'items');
		} catch (error) {
			console.error('Failed to load lookup data:', error);
			lookupError = 'Failed to load options';
			lookupItems = [];
		} finally {
			isLoadingLookup = false;
		}
	}
</script>

{#if hasLookup}
	{#if !canLoadLookup}
		<SelectInput
			{label}
			items={lookupItems}
			bind:value
			placeholder="Select required dependencies first"
			disabled={lookupItems.length === 0}
		/>
	{:else if isLoadingLookup && lookupItems.length === 0}
		<SelectInput {label} items={[]} bind:value placeholder="Loading options..." disabled />
	{:else if lookupError && lookupItems.length === 0}
		<TextInput {label} bind:value placeholder={lookupError} />
	{:else}
		<SelectInput
			{label}
			items={lookupItems}
			bind:value
			placeholder={placeholder || 'Select an option'}
		/>
	{/if}
{:else}
	<TextInput {label} bind:value {placeholder} />
{/if}
