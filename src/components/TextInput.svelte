<script lang="ts">
	import { Input, Label, type InputType } from 'flowbite-svelte';
	export let value = '';
	export let label = '';
	export let id = '';
	export let type = 'text' as InputType;
</script>

<div>
	<Label for={id} class="mb-2">{label}</Label>
	<Input {...$$restProps} bind:value {type} />
</div>
