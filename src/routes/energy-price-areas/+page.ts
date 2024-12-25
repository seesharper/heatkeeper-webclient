import { baseUrl } from '$lib/environment';
import type { EnergyPriceAreaInfo } from '$lib/models';
import type { PageLoad } from './$types';
export const ssr = false;


export const load = (async (loadEvent) => {

    const { fetch } = loadEvent;

    var request = new Request(`${baseUrl}api/energy-price-areas`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    let settings: RequestInit = {
        credentials: 'include'
    };

    const response = await fetch(request, settings);
    var locations = await response.json() as EnergyPriceAreaInfo[];

    return { result: locations }
}) satisfies PageLoad;