import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { ScheduledJob } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {

    const { fetch } = loadEvent;
    var jobs = await Get<ScheduledJob[]>(fetch, `${baseUrl}api/jobs`);

    return { jobs }
}) satisfies PageLoad;
