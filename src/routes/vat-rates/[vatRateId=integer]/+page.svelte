<script lang="ts">
	import type { PageData } from './$types';
	import { deleteVatRate, updateVatRate } from '$lib/api';
	import { Grid, TextInput, SaveButton, DeleteModal, NumericInput } from '$lib/components';
	export let data: PageData;

	async function handleDeleteVatRate() {
		await deleteVatRate(data.vatRate.id);
		window.history.back();
	}

	async function handleUpdateVatRate() {
		await updateVatRate(data.vatRate);
		window.history.back();
	}
</script>

<Grid>
	<TextInput id="name" label="Name" bind:value={data.vatRate.name} required />
	<NumericInput id="rate" label="Rate" bind:value={data.vatRate.rate} />

	<SaveButton on:click={async () => await handleUpdateVatRate()} />

	<DeleteModal
		title="Delete VAT Rate {data.vatRate.name}"
		handleDelete={async () => await handleDeleteVatRate()}
	>
		Are you sure you want to delete this VAT Rate?
	</DeleteModal>
</Grid>
