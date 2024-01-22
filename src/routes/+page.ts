import { baseUrl } from '$lib/environment';
import type { ZoneReading } from '$lib/models';
import type { PageLoad } from './$types';

export const ssr = false;
export const load = (async (loadEvent) => {

    const { fetch } = loadEvent;

    var request = new Request(`${baseUrl}api/dashboard/temperatures`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    let settings: RequestInit = {
        credentials: 'include'
    };

    const response = await fetch(request, settings);
    var readings = await response.json() as ZoneReading[];

    return { result: readings }
}) satisfies PageLoad;