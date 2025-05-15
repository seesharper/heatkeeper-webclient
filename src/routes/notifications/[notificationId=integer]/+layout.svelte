<script lang="ts">
	import { CenteredHeader, TabLinks, TabLinkItem } from '$lib/components';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<CenteredHeader>{data.notification.name}</CenteredHeader>
<TabLinks>
	<TabLinkItem link="/notifications/{data.notification.id}" title="Details"></TabLinkItem>
	<TabLinkItem link="/notifications/{data.notification.id}/conditions" title="Conditions"
	></TabLinkItem>
</TabLinks>

<slot />
