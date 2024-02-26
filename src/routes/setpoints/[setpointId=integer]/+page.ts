import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { SetPointDetails } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {
    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;
    const setPoint = await Get<SetPointDetails>(svelteFetch, `${baseUrl}api/setpoints/${params.setpointId}`);
    return { setPoint: setPoint }
}) satisfies PageLoad;