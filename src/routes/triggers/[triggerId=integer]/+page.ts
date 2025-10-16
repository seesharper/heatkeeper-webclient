import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { TriggerDefinition, EventInfo } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {

    const { fetch: svelteFetch, params } = loadEvent;
    const trigger = await Get<TriggerDefinition>(svelteFetch, `${baseUrl}api/triggers/${params.triggerId}`);
    const eventInfos = await Get<EventInfo[]>(svelteFetch, `${baseUrl}api/events`);
    const eventTypes = eventInfos.map((event) => ({ value: event.name, name: event.name }));

    return { trigger: trigger, triggerId: parseInt(params.triggerId), eventTypes: eventTypes }
}) satisfies PageLoad;