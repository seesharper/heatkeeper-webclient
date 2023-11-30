<script lang="ts">
	import { login } from '$lib/api';
	import { currentUser } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { CenteredHeader, Grid, TextInput, SaveButton } from '$lib/components';
	let email = '';
	let password = '';

	async function submit() {
		console.log('submit');
		let user = await login({ password: password, email: email });
		$currentUser = user;
		goto('/');
	}
</script>

<CenteredHeader>Login</CenteredHeader>
<Grid>
	<TextInput id="user_name" label="Username" bind:value={email} required />
	<TextInput id="password" label="Password" type="password" bind:value={password} />
	<SaveButton on:click={async () => await submit()} />
</Grid>
