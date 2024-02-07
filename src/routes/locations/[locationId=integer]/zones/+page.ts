import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { ZoneInfo } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {

    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;
    const zones = await Get<ZoneInfo[]>(svelteFetch, `${baseUrl}api/locations/${params.locationId}/zones`);
    return { zones: zones }

}) satisfies PageLoad;