<script lang="ts">
	import { CenteredHeader, TabLinks, TabLinkItem } from '$lib/components';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<CenteredHeader>{data.program.name}</CenteredHeader>
<TabLinks>
	<TabLinkItem link="/programs/{data.program.id}" title="Details"></TabLinkItem>
	<TabLinkItem link="/programs/{data.program.id}/schedules" title="Schedules"></TabLinkItem>
</TabLinks>

<slot />
