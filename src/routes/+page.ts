import { goto } from '$app/navigation';
import { baseUrl } from '$lib/environment';
import type { PageLoad } from './$types';
export const ssr = false;
export const load = (async (loadEvent) => {

    // const { fetch : svelteFetch} = loadEvent;

    // const dashboardLocations = await Get<DashboardLocation[]>(svelteFetch, `${baseUrl}api/dashboard/locations`);
    await goto('/dashboard/temperatures/1');
    // return { dashboardLocations: dashboardLocations }
}) satisfies PageLoad;