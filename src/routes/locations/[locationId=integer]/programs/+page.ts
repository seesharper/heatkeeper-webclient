import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { ProgramInfo, ZoneInfo } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {

    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;
    const programs = await Get<ProgramInfo[]>(svelteFetch, `${baseUrl}api/locations/${params.locationId}/programs`);
    return { programs: programs }

}) satisfies PageLoad;