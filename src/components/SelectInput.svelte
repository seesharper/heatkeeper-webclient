<script lang="ts">
	import { Label, Select } from 'flowbite-svelte';
	export let label = '';
	export let value: any;
</script>

<div>
	<Label class="mb-2">{label}</Label>
	<Select {...$$restProps} bind:value></Select>
</div>
