<script lang="ts">
	import { CenteredHeader, TabLinks, TabLinkItem } from '$lib/components';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<CenteredHeader>{data.location.name}</CenteredHeader>
<TabLinks>
	<TabLinkItem link="/locations/{data.location.id}" title="Details"></TabLinkItem>
	<TabLinkItem link="/locations/{data.location.id}/zones" title="Zones"></TabLinkItem>
	<TabLinkItem link="/locations/{data.location.id}/programs" title="Programs"></TabLinkItem>
</TabLinks>

<slot />
