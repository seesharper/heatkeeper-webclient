<script lang="ts">
	import { Button } from 'flowbite-svelte';
</script>

<div class="mt-5">
	<Button {...$$restProps} class="w-full" type="button" on:click><slot /></Button>
</div>
