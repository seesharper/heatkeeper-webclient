<script lang="ts">
	import { CenteredHeader, TabLinks, TabLinkItem } from '$lib/components';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<CenteredHeader>{data.user.firstName} {data.user.lastName}</CenteredHeader>
<TabLinks>
	<TabLinkItem link="/users/{data.user.id}" title="Details"></TabLinkItem>
	<TabLinkItem link="/users/{data.user.id}/locations" title="Locations"></TabLinkItem>
</TabLinks>

<slot />
