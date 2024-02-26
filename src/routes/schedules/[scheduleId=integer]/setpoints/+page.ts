import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { SetPointInfo } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {

    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;
    const setPoints = await Get<SetPointInfo[]>(svelteFetch, `${baseUrl}api/schedules/${params.scheduleId}/setpoints`);
    return { setPoints: setPoints }

}) satisfies PageLoad;