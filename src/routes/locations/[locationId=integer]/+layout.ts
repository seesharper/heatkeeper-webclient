import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { LocationDetails, LocationInfo, ZoneInfo } from '$lib/models';
import type { LayoutLoad, PageLoad } from './$types';

export const load = (async (loadEvent) => {
    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;
    const location = await Get<LocationDetails>(svelteFetch, `${baseUrl}api/locations/${params.locationId}`);
    return { location: location }
}) satisfies LayoutLoad;