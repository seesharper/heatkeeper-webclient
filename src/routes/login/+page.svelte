<script lang="ts">
	import { Input, Label, Button, Checkbox, A } from 'flowbite-svelte';
</script>

<main>
	<form class="m-10">
		<div class="grid gap-6 grid-cols-1">
			<div>
				<Label for="user_name" class="mb-2">Username</Label>
				<Input type="text" id="user_name" required />
			</div>
			<div>
				<Label for="password" class="mb-2">Password</Label>
				<Input type="password" id="password" required />
			</div>
			<div class="mt-4">
				<Button style="width: 100%;" class="mb-2" type="submit">Login</Button>
			</div>
		</div>
	</form>
</main>
