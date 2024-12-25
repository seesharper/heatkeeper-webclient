import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { EnergyPrice, EnergyPriceAreaInfo, ZoneInsights } from '$lib/models';


import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {
    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;

    const energyPriceAreas = await Get<EnergyPriceAreaInfo[]>(svelteFetch, `${baseUrl}api/energy-price-areas/`);


    let chartTimeSeries: { title: string; chartData: { x: Date, y: number }[] }[] = [];

    var day = new Date().toISOString().split('T')[0];
    console.log(params.day);
    if (params.day == "2") {
        var today = new Date();
        today.setDate(today.getDate() + 1);
        day = today.toISOString().split('T')[0];
    }


    for (const priceArea of energyPriceAreas) {
        const energyPrices = await Get<EnergyPrice[]>(svelteFetch, `${baseUrl}api/energy-prices/?date=${day}&EnergyPriceAreaId=${priceArea.id}`);
        if (energyPrices.length > 0) {

            chartTimeSeries.push({ title: priceArea.name, chartData: energyPrices.map(p => ({ x: new Date(p.timeStart), y: p.priceAfterSubsidy })) });
        }
    }



    return { chartTimeSeries: chartTimeSeries }
}) satisfies PageLoad;