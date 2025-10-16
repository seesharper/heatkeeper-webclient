<script lang="ts">
	import { SaveButton } from '$lib/components';
	import { createTrigger } from '$lib/api';
	import type { NewTrigger } from '$lib/models';
	import { TextInput } from '$lib/components';
	import { Heading } from 'flowbite-svelte';

	let trigger: NewTrigger = {
		name: ''
	};

	async function save() {
		await createTrigger(trigger);
	}
</script>

<Heading tag="h3" class="text-center">New Trigger</Heading>

<div class="grid gap-4 mb-4 md:grid-cols-2">
	<TextInput label="Name" bind:value={trigger.name} />
	<div />
</div>

<SaveButton on:click={save} />
