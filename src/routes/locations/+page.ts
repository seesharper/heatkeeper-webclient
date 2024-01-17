import type { LocationInfo } from '$lib/models';
import type { PageLoad } from './$types';
export const ssr = false;


export const load = (async (loadEvent) => {

    const { fetch } = loadEvent;

    var request = new Request('https://localhost:7167/api/locations', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    let settings: RequestInit = {
        credentials: 'include'
    };

    const response = await fetch(request, settings);

    let locations: LocationInfo[] = [
        { id: 1, name: 'Home', description: 'Home Description' },
        { id: 2, name: 'Cabin', description: 'Cabin Description' },
    ]
    return { result: locations }
}) satisfies PageLoad;