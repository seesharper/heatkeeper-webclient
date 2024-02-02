<script lang="ts">
	import { CenteredHeader } from '$lib/components';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<CenteredHeader>{data.location.name}</CenteredHeader>
<slot />
