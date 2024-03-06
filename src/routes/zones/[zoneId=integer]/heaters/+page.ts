import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { HeaterInfo, SetPointInfo } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {

    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;
    const heaters = await Get<HeaterInfo[]>(svelteFetch, `${baseUrl}api/zones/${params.zoneId}/heaters`);
    return { heaters: heaters }

}) satisfies PageLoad;