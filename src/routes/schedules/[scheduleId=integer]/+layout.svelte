<script lang="ts">
	import { CenteredHeader, TabLinks, TabLinkItem } from '$lib/components';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<CenteredHeader>{data.schedule.name}</CenteredHeader>
<TabLinks>
	<TabLinkItem link="/schedules/{data.schedule.id}" title="Details"></TabLinkItem>
	<TabLinkItem link="/schedules/{data.schedule.id}/setpoints" title="SetPoints"></TabLinkItem>
</TabLinks>

<slot />
