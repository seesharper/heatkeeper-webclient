import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { LocationInfo, ZoneDetails, ZoneInfo } from '$lib/models';
import type { LayoutLoad } from './$types';

export const load = (async (loadEvent) => {
    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;
    const locationInfos = await Get<LocationInfo[]>(svelteFetch, `${baseUrl}api/locations`);
    var locations = locationInfos.map((location) => ({ value: location.id, name: location.name }));
    const zone = await Get<ZoneDetails>(svelteFetch, `${baseUrl}api/zones/${params.zoneId}`);
    return { zone: zone, locations: locations }
}) satisfies LayoutLoad;