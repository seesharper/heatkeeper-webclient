import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { ScheduleInfo, ZoneInfo } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {

    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;
    const schedules = await Get<ScheduleInfo[]>(svelteFetch, `${baseUrl}api/programs/${params.programId}/schedules`);
    return { schedules: schedules }

}) satisfies PageLoad;