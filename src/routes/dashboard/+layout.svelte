<script lang="ts">
	import { CenteredHeader, TabLinks, TabLinkItem } from '$lib/components';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<TabLinks>
	{#each data.dashboardLocations as item}
	<TabLinkItem link="/dashboard/temperatures/{item.id}" title="{item.name}"></TabLinkItem>	
	{/each}
</TabLinks>

<slot />
