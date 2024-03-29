<script lang="ts">
	import type { PageData } from './$types';
	import { Grid, TextInput, SaveButton, DeleteModal, CenteredHeader } from '$lib/components';
	import { Toggle, Heading } from 'flowbite-svelte';
	import { deleteUser, deleteZone, updateSensor, updateUser, updateZone } from '$lib/api';

	export let data: PageData;

	async function handleDeleteUser() {
		await deleteUser(data.user.id);
		window.history.back();
	}

	async function handleUpdateUser() {
		await updateUser(data.user);
		window.history.back();
	}
</script>

<Grid>
	<TextInput id="email" label="Mail" bind:value={data.user.email} required />
	<TextInput id="firstName" label="First Name" bind:value={data.user.firstName} required />
	<TextInput id="lastName" label="Name" bind:value={data.user.lastName} required />
	<Toggle id="isAdmin" label="Admin" bind:checked={data.user.isAdmin}>Administrator</Toggle>
	<SaveButton on:click={async () => await handleUpdateUser()} />
	<DeleteModal
		title="Delete user {data.user.email}"
		handleDelete={async () => await handleDeleteUser()}
	>
		Are you sure you want to delete this user?
	</DeleteModal>
</Grid>
