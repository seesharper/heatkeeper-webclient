import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { LocationDetails, LocationInfo, ZoneInfo } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {

    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;
    const location = await Get<LocationDetails>(svelteFetch, `${baseUrl}api/locations/${params.locationId}`);
    const zoneInfos = await Get<ZoneInfo[]>(svelteFetch, `${baseUrl}api/locations/${params.locationId}/zones`);
    console.log(location);
    const zones = zoneInfos.map((zone) => ({ value: zone.id, name: zone.name }));
    return { location: location, zones: zones }
}) satisfies PageLoad;