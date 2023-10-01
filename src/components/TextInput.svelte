<script lang="ts">
	import { Input, Label } from 'flowbite-svelte';
	export let value = '';
	export let label = '';
	export let id = '';
</script>

<div>
	<Label for={id} class="mb-2">{label}</Label>
	<Input {...$$restProps} bind:value type="text" />
</div>
