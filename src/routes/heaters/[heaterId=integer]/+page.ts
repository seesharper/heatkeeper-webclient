import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { HeaterDetails } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {
    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;
    const heater = await Get<HeaterDetails>(svelteFetch, `${baseUrl}api/heaters/${params.heaterId}`);
    console.log(heater);
    return { heater: heater }
}) satisfies PageLoad;