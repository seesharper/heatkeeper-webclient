import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { SensorInfo } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {
    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;
    const sensors = await Get<SensorInfo[]>(svelteFetch, `${baseUrl}api/zones/${params.zoneId}/sensors`);
    return { sensors: sensors }

}) satisfies PageLoad;