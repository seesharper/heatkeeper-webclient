import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { ZoneInsights } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {
    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;
    const zoneInsights = await Get<ZoneInsights>(svelteFetch, `${baseUrl}api/zones/${params.zoneId}/insights?range=1`);
    return { zoneInsights: zoneInsights }
}) satisfies PageLoad;