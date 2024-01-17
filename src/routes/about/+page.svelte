<script lang="ts">
	import { Heading } from 'flowbite-svelte';

	const gitTag = import.meta.env.VITE_GIT_TAG;
</script>

<Heading tag="h3" class="text-center">Version {gitTag}</Heading>
