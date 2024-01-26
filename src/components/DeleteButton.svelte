<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { TrashBinOutline } from 'flowbite-svelte-icons';
</script>

<Button outline color="red" class="w-full" type="button" on:click
	><TrashBinOutline class="w-4 h-4 me-2" />Delete</Button
>
