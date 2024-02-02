import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { LocationInfo, ZoneInfo } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {

    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;
    const zoneInfos = await Get<ZoneInfo[]>(svelteFetch, `${baseUrl}api/locations/${params.locationId}/zones`);
    const zones = zoneInfos.map((zone) => ({ value: zone.id, name: zone.name }));
    return { zones: zones }
}) satisfies PageLoad;