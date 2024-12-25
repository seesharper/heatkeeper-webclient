<script lang="ts">
	import { createEnergyPriceArea } from '$lib/api';
	import { CenteredHeader, Grid, SaveButton, SelectInput, TextInput } from '$lib/components';
	import type { NewEnergyPriceArea } from '$lib/models';
	import NumericInput from '../../../components/NumericInput.svelte';
	let newEnergyPriceArea: NewEnergyPriceArea = {
		eiC_Code: '',
		name: '',
		vatRateId: 0,
		description: '',
		displayOrder: 0
	};
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<CenteredHeader>New Energy Price Area</CenteredHeader>
<Grid>
	<TextInput id="name" label="Name" bind:value={newEnergyPriceArea.name} required />
	<TextInput id="description" label="Description" bind:value={newEnergyPriceArea.description} />
	<TextInput id="eicCode" label="EIC Code" bind:value={newEnergyPriceArea.eiC_Code} required />
	<NumericInput id="displayOrder" label="DisplayOrder" bind:value={newEnergyPriceArea.displayOrder}
	></NumericInput>
	<SelectInput
		label="Vat Rate"
		placeholder="Choose the vat rate for this price area"
		items={data.vatRates}
		bind:value={newEnergyPriceArea.vatRateId}
	></SelectInput>
	<SaveButton on:click={async () => await createEnergyPriceArea(newEnergyPriceArea)} />
</Grid>
