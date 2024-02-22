import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { ScheduleInfo } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {

    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;

    const scheduleInfos = await Get<ScheduleInfo[]>(svelteFetch, `${baseUrl}api/programs/${params.programId}/schedules`);

    var schedules = scheduleInfos.map((location) => ({ value: location.id, name: location.name }));
    return { schedules: schedules }
}) satisfies PageLoad;