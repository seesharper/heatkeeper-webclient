import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { ScheduleDetails } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {
    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;
    const schedule = await Get<ScheduleDetails>(svelteFetch, `${baseUrl}api/schedules/${params.scheduleId}`);
    return { schedule: schedule }
}) satisfies PageLoad;