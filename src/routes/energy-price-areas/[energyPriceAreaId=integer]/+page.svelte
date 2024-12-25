<script lang="ts">
	import { deleteEnergyPriceArea, updateEnergyPriceArea } from '$lib/api';
	import {
		CenteredHeader,
		DeleteModal,
		Grid,
		NumericInput,
		SaveButton,
		SelectInput,
		TextInput
	} from '$lib/components';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<CenteredHeader>Edit Energy Price Area</CenteredHeader>
<Grid>
	<TextInput id="name" label="Name" bind:value={data.priceArea.name} required />
	<TextInput id="description" label="Description" bind:value={data.priceArea.description} />
	<TextInput id="eicCode" label="EIC Code" bind:value={data.priceArea.eiC_Code} required />
	<NumericInput id="displayOrder" label="DisplayOrder" bind:value={data.priceArea.displayOrder}
	></NumericInput>
	<SelectInput
		label="Vat Rate"
		placeholder="Choose the vat rate for this price area"
		items={data.vatRates}
		bind:value={data.priceArea.vatRateId}
	></SelectInput>
	<SaveButton on:click={async () => await updateEnergyPriceArea(data.priceArea)} />
	<DeleteModal
		title="Delete Energy Price Area {data.priceArea.name}"
		handleDelete={async () => await deleteEnergyPriceArea(data.priceArea.id)}
	>
		Are you sure you want to delete this Energy Price Area?
	</DeleteModal>
</Grid>
