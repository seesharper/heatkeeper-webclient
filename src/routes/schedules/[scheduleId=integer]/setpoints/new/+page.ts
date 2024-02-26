import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { SetPointInfo, ZoneInfo } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {

    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;
    const zoneInfos = await Get<ZoneInfo[]>(svelteFetch, `${baseUrl}api/schedules/${params.scheduleId}/zones`);
    var zones = zoneInfos.map((zone) => ({ value: zone.id, name: zone.name }));
    return { zones: zones }

}) satisfies PageLoad;