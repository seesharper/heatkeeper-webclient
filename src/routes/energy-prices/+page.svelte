<script lang="ts">
	import type { PageData } from './$types';
	import {
		Chart,
		Card,
		A,
		Button,
		Dropdown,
		DropdownItem,
		Input,
		Datepicker,
		Label
	} from 'flowbite-svelte';
	import type { ApexOptions } from 'apexcharts';
	import { redirect } from '@sveltejs/kit';
	import { CenteredHeader } from '$lib/components';
	export let data: PageData;

	let energyPriceTimeSeries = data.energyPrices.map((energyPrice) => {
		return {
			x: new Date(energyPrice.timeStart),
			y: energyPrice.priceAfterSubsidy
		};
	});

	let options: ApexOptions = {
		chart: {
			type: 'line',
			height: 350,
			toolbar: {
				show: false
			},
			foreColor: '#FFF'
		},
		series: [
			{
				name: 'enery prices',
				data: energyPriceTimeSeries
			}
		],
		xaxis: {
			tickAmount: 10,
			labels: {
				formatter: function (value) {
					return new Date(value).getHours().toString();
				},
				hideOverlappingLabels: false
			}
		},
		yaxis: {
			labels: {
				formatter: function (value) {
					return value.toFixed(2);
				}
			}
		}
	};
</script>

<div>
	<CenteredHeader>Energy Prices</CenteredHeader>
	<div class="items-center flex justify-center mt-5">
		<Input class="w-1/2" type="date"></Input>
	</div>
	<Chart {options}></Chart>
</div>
