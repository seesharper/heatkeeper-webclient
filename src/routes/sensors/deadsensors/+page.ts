import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { DeadSensor } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {
    const { fetch: svelteFetch } = loadEvent;
    const deadSensors = await Get<DeadSensor[]>(svelteFetch, `${baseUrl}api/sensors/deadSensors/`);
    return { deadSensors: deadSensors }
}) satisfies PageLoad;