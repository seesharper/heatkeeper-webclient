import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { EnergyPrice, ZoneInsights } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {
    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;
    const energyPrices = await Get<EnergyPrice[]>(svelteFetch, `${baseUrl}api/energy-prices/?date=2024-12-17&EnergyPriceAreaId=1`);
    return { energyPrices: energyPrices }
}) satisfies PageLoad;