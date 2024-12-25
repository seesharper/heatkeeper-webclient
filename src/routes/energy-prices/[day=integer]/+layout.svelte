<script lang="ts">
	import { CenteredHeader, TabLinkItem, TabLinks } from '$lib/components';
	import { Radio, RadioButton } from 'flowbite-svelte';
</script>

<CenteredHeader>Energy Prices</CenteredHeader>
<TabLinks>
	<TabLinkItem link="/energy-prices/1" title="Today"></TabLinkItem>
	<TabLinkItem link="/energy-prices/2" title="Tomorrow"></TabLinkItem>
</TabLinks>
<slot />
