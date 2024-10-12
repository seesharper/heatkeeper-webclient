<script lang="ts">
	import type { PageData } from './$types';
	import { Chart, Card, A, Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import type { ApexOptions } from 'apexcharts';
	export let data: PageData;

	let temperatureSeriesData = data.zoneInsights.temperatureMeasurements.map((measurement) => {
		return {
			x: new Date(measurement.created),
			y: measurement.value
		};
	});

	let options: ApexOptions = {
		chart: {
			type: 'line',
			height: 350
		},
		series: [
			{
				name: 'temperatures',
				data: temperatureSeriesData
			}
		],
		xaxis: {
			tickAmount: 10,
            labels: {
				formatter: function (value) {
					return new Date(value).toLocaleTimeString();
				},
				hideOverlappingLabels: true
			}
		}
	};
</script>

<div>
	<Chart {options}></Chart>
</div>
<h1>Zone insights</h1>
