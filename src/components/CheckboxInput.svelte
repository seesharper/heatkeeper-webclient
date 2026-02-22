<script lang="ts">
	import { Checkbox, Label } from 'flowbite-svelte';
	export let checked = false;
	export let label = '';
	export let id = '';
</script>

<div>
	<Label for={id} class="mb-2">{label}</Label>
	<Checkbox {id} bind:checked {...$$restProps} />
</div>
