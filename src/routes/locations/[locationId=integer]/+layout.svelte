<script lang="ts">
	import { CenteredHeader } from '$lib/components';
	import type { LayoutData } from './$types';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { page } from '$app/stores';
	export let data: LayoutData;
	//export const ssr = false;
	let selectedTab = 0;
	let selectedClass =
		'inline-block p-3 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500';
	let unselectedClass =
		'inline-block p-3 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300';
</script>

<CenteredHeader>{data.location.name}</CenteredHeader>
<ul
	class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
>
	<li class="me-2">
		<a
			href="/locations/{data.location.id}"
			aria-current="page"
			class={selectedTab === 0 ? selectedClass : unselectedClass}
			on:click={() => {
				selectedTab = 0;
				console.log($page.url.pathname);
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
