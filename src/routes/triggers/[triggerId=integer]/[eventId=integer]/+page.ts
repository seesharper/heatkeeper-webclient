import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { EventDetails } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {

    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;
    const eventDetails = await Get<EventDetails>(svelteFetch, `${baseUrl}api/events/${params.eventId}`);
    console.log("Event Details:", eventDetails);
    return { eventDetails: eventDetails }

}) satisfies PageLoad;