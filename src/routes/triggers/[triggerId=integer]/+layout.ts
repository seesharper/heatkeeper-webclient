import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { TriggerDefinition, EventInfo, ActionInfo } from '$lib/models';
import type { LayoutLoad } from './$types';

export const load = (async (loadEvent) => {

    const { fetch: svelteFetch, params } = loadEvent;
    const trigger = await Get<TriggerDefinition>(svelteFetch, `${baseUrl}api/triggers/${params.triggerId}`);
    const eventInfos = await Get<EventInfo[]>(svelteFetch, `${baseUrl}api/events`);
    const actionInfos = await Get<ActionInfo[]>(svelteFetch, `${baseUrl}api/actions`);
    const eventTypes = eventInfos.map((event) => ({ value: event.name, name: event.name }));
    const actionOptions = actionInfos.map((action) => ({ value: action.id, name: action.displayName }));
    console.log("trigger loaded:", trigger);
    return { trigger: trigger, triggerId: parseInt(params.triggerId), eventTypes: eventTypes, eventInfos: eventInfos, actionInfos: actionInfos, actionOptions: actionOptions }
}) satisfies LayoutLoad;