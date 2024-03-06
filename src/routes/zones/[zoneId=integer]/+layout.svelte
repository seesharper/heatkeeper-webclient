<script lang="ts">
	import { CenteredHeader, TabLinks, TabLinkItem } from '$lib/components';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<CenteredHeader>{data.zone.name}</CenteredHeader>
<TabLinks>
	<TabLinkItem link="/zones/{data.zone.id}" title="Details"></TabLinkItem>
	<TabLinkItem link="/zones/{data.zone.id}/heaters" title="Heaters"></TabLinkItem>
	<TabLinkItem link="/zones/{data.zone.id}/sensors" title="Sensors"></TabLinkItem>
</TabLinks>

<slot />
