<script lang="ts">
	import type { PageData } from './$types';
	import { EnergyConsumers } from '$lib/components';

	export let data: PageData;
</script>

<svelte:head>
	<title>Energy Consumers</title>
</svelte:head>

<EnergyConsumers locationId={data.locationId} />
