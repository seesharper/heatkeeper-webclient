<script lang="ts">
	import { Grid, TextInput, SaveButton, CenteredHeader } from '$lib/components';
	import { Toggle } from 'flowbite-svelte';
	import { createUser } from '$lib/api';
	import type { NewUser } from '$lib/models';

	export let newUser: NewUser = {
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		confirmedPassword: '',
		isAdmin: false
	};

	async function handleCreateUser() {
		await createUser(newUser);
		window.history.back();
	}
</script>

<CenteredHeader>{newUser.firstName} {newUser.lastName}</CenteredHeader>
<Grid>
	<TextInput id="email" label="E-mail" bind:value={newUser.email} required />
	<TextInput id="firstName" label="First Name" bind:value={newUser.firstName} required />
	<TextInput id="lastName" label="Name" bind:value={newUser.lastName} required />
	<TextInput
		id="password"
		label="Password"
		type="password"
		bind:value={newUser.password}
		required
	/>
	<TextInput
		id="passwordConfirmation"
		label="Password Confirmation"
		type="password"
		bind:value={newUser.confirmedPassword}
		required
	/>
	<Toggle id="isAdmin" label="Admin" bind:checked={newUser.isAdmin}>Administrator</Toggle>
	<SaveButton on:click={async () => await handleCreateUser()} />
</Grid>
