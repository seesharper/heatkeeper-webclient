import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { LocationDetails } from '$lib/models';
import type { LayoutLoad } from './$types';

export const load = (async (loadEvent) => {
    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;

    let url = `${baseUrl}api/locations/${params.locationId}`;

    var request = new Request(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const config: RequestInit = {
        credentials: 'include'
    };

    const response = await svelteFetch(request, config);
    const location = await response.json() as LocationDetails;

    //const location = await Get<LocationDetails>(svelteFetch, `${baseUrl}api/locations/${params.locationId}`);
    return { location: location }
}) satisfies LayoutLoad;