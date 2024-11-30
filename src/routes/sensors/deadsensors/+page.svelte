<script lang="ts">
	import { CenteredHeader } from '$lib/components';
	import type { PageData } from './$types';
	import { AccordionItem, Accordion } from 'flowbite-svelte';
	export let data: PageData;
</script>

<CenteredHeader>Dead sensors</CenteredHeader>
<Accordion class="mt-3">
	{#each data.deadSensors as item}
		<AccordionItem>
			<span class="text-red-500" slot="header">{item.name}</span>
			<p>Location: {item.location}</p>
			<p>Zone: {item.zone}</p>
			<p>External Id: {item.externalId}</p>
			<p>Last seen: {item.lastSeen}</p>
		</AccordionItem>
	{/each}
</Accordion>
