import { browser } from '$app/environment';
import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { DashboardLocation, ZoneReading } from '$lib/models';
import { getPermission } from '$lib/notifications';
import type { LayoutLoad } from '../$types';

export const load = (async (loadEvent) => {

    if (browser) {
        await getPermission();
    }

    const { fetch: svelteFetch } = loadEvent;

    const dashboardLocations = await Get<DashboardLocation[]>(svelteFetch, `${baseUrl}api/dashboard/locations`);

    return { dashboardLocations: dashboardLocations }
}) satisfies LayoutLoad;