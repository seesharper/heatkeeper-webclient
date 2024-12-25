<script lang="ts">
	import { createVatRate } from '$lib/api';
	import { CenteredHeader, Grid, SaveButton, TextInput } from '$lib/components';
	import type { NewVatRate } from '$lib/models';
	import NumericInput from '../../../components/NumericInput.svelte';
	let newVatRate: NewVatRate = { name: '', rate: 0 };
</script>

<CenteredHeader>New VAT Rate</CenteredHeader>
<Grid>
	<TextInput id="name" label="Name" bind:value={newVatRate.name} required />
	<NumericInput id="rate" label="Rate" bind:value={newVatRate.rate} />
	<SaveButton on:click={async () => await createVatRate(newVatRate)} />
</Grid>
