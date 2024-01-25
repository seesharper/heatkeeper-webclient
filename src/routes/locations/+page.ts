import { baseUrl } from '$lib/environment';
import type { LocationInfo } from '$lib/models';
import type { PageLoad } from './$types';
export const ssr = false;


export const load = (async (loadEvent) => {

    const { fetch } = loadEvent;



    var request = new Request(`${baseUrl}api/locations`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    let settings: RequestInit = {
        credentials: 'include'
    };

    const response = await fetch(request, settings);
    var locations = await response.json() as LocationInfo[];


    return { result: locations }
}) satisfies PageLoad;