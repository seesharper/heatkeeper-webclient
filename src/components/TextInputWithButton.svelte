<script lang="ts">
	import { Input, Label, type InputType, Button } from 'flowbite-svelte';
	export let value = '';
	export let label = '';
	export let id = '';
	export let type = 'text' as InputType;
</script>

<div>
	<Label for={id} class="mb-2">{label}</Label>
	<div class="flex">
		<Input {...$$restProps} bind:value {type} />
		<Button class="ml-2" on:click>Verify</Button>
	</div>
</div>
