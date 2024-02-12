<script lang="ts">
	import { page } from '$app/stores';
	export let link: string;
	export let title: string;
	let selectedClass =
		'inline-block p-3 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500';
	let unselectedClass =
		'inline-block p-3 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300';
</script>

<li class="me-2">
	<a href={link} class={link === $page.url.pathname ? selectedClass : unselectedClass}>{title}</a>
</li>
