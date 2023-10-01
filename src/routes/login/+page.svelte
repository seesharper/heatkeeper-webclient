<script lang="ts">
	import { Input, Label, Button } from 'flowbite-svelte';
	import { login } from '$lib/api';
	import { currentUser } from '$lib/stores';
	import { goto } from '$app/navigation';
	let email = '';
	let password = '';

	async function submit() {
		console.log('submit');
		let user = await login({ password: password, email: email });
		// console.log(user);
		$currentUser = user;
		goto('/');
	}
</script>

<form class="m-10">
	<div class="grid gap-6 grid-cols-1">
		<div>
			<Label for="user_name" class="mb-2">Username</Label>
			<Input bind:value={email} type="text" id="user_name" required />
		</div>
		<div>
			<Label for="password" class="mb-2">Password</Label>
			<Input bind:value={password} type="password" id="password" required />
		</div>
		<div class="mt-4">
			<Button style="width: 100%;" class="mb-2" type="submit" on:click={submit}>Login</Button>
		</div>
</form>
