<script lang="ts">
	import { Input, Label } from 'flowbite-svelte';
	import type { InputType } from 'flowbite-svelte/dist/types';
	export let value = '';
	export let label = '';
	export let id = '';
	export let type = 'text' as InputType;
</script>

<div>
	<Label for={id} class="mb-2">{label}</Label>
	<Input {...$$restProps} bind:value {type} />
</div>
