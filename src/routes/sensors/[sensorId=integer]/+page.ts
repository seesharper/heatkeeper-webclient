import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { SensorDetails } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {
    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;
    const sensor = await Get<SensorDetails>(svelteFetch, `${baseUrl}api/sensors/${params.sensorId}`);
    return { sensor: sensor }
}) satisfies PageLoad;