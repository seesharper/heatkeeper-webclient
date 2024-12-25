import { baseUrl } from '$lib/environment';
import type { VatRateInfo } from '$lib/models';
import type { PageLoad } from './$types';
export const ssr = false;


export const load = (async (loadEvent) => {

    const { fetch } = loadEvent;

    var request = new Request(`${baseUrl}api/vat-rates`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    let settings: RequestInit = {
        credentials: 'include'
    };

    const response = await fetch(request, settings);
    var locations = await response.json() as VatRateInfo[];

    return { result: locations }
}) satisfies PageLoad;