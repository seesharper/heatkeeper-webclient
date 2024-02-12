<script lang="ts">
	import { CenteredHeader } from '$lib/components';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	export let data: LayoutData;
	let selectedTab = 0;
	let selectedClass =
		'inline-block p-3 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500';
	let unselectedClass =
		'inline-block p-3 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300';

	const links = [
		{ name: 'Home', path: `/locations/${data.location.id}` },
		{ name: 'About', path: '/about' },
		{ name: 'Contact', path: '/contact' }
	];
</script>

<CenteredHeader>{data.location.name}</CenteredHeader>
<ul
	class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
>
	<!-- {#each links as link}
		<li>
			<a
				href={link.path}
				class={link.path === $page.url.pathname ? selectedClass : unselectedClass}
				on:click={() => {
					selectedTab = 0;
				}}>{link.name}</a
			>
		</li>
	{/each} -->
	<li class="me-2">
		<a
			href="/locations/{data.location.id}"
			class={`/locations/${data.location.id}` === $page.url.pathname
				? selectedClass
				: unselectedClass}
			on:click={() => {
				selectedTab = 0;
				console.log($page.url.pathname);
				console.log(data.location.id);
			}}>Details</a
		>
	</li>
	<li class="me-2">
		<a
			href="/locations/{data.location.id}/zones"
			class={selectedTab === 1 ? selectedClass : unselectedClass}
			on:click={() => {
				selectedTab = 1;
				console.log($page.url.pathname);
			}}>Zones</a
		>
	</li>
	<li class="me-2">
		<a
			href="#"
			class={selectedTab === 2 ? selectedClass : unselectedClass}
			on:click={() => {
				selectedTab = 2;
			}}>Programs</a
		>
	</li>
</ul>

<slot />
