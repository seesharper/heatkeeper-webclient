<script lang="ts">
	import { Chart, Card } from 'flowbite-svelte';
	import type { ApexOptions } from 'apexcharts';
	import { CenteredHeader } from '$lib/components';
	export let chartTimeSeries: { x: Date; y: number }[];
    export let title: string;
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
				name: title,
				data: chartTimeSeries
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

<Card>
	<CenteredHeader>{title}</CenteredHeader>
    <Chart {options} />
</Card>
