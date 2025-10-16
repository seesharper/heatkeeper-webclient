import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { TriggerInfo } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {

    const { fetch: svelteFetch } = loadEvent;
    const triggers = await Get<TriggerInfo[]>(svelteFetch, `${baseUrl}api/triggers`);

    return { triggers: triggers }
}) satisfies PageLoad;