import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { UnassignedSensorInfo } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {
    const { fetch: svelteFetch } = loadEvent;
    const sensors = await Get<UnassignedSensorInfo[]>(svelteFetch, `${baseUrl}api/sensors`);    
    return { sensors: sensors }

}) satisfies PageLoad;