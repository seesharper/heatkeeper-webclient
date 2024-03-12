import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { DashboardLocation, ZoneReading } from '$lib/models';
import type { LayoutLoad } from '../$types';

export const load = (async (loadEvent) => {

    const { fetch : svelteFetch} = loadEvent;

    const dashboardLocations = await Get<DashboardLocation[]>(svelteFetch, `${baseUrl}api/dashboard/locations`);
   
    return { dashboardLocations: dashboardLocations }
}) satisfies LayoutLoad;