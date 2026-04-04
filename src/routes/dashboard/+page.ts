import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { DashboardEntry } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {
    const { fetch: svelteFetch } = loadEvent;
    const entries = await Get<DashboardEntry[]>(svelteFetch, `${baseUrl}api/dashboard/locations`);
    return { entries };
}) satisfies PageLoad;
