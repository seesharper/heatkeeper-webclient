<script lang="ts">
	import { NumberInput, Label } from 'flowbite-svelte';
	export let value = 0;
	export let label = '';
	export let id = '';
</script>

<div>
	<Label for={id} class="mb-2">{label}</Label>
	<NumberInput {...$$restProps} bind:value />
</div>
