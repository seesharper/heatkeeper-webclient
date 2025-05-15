import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { NotificationSubscriptionInfo } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {

    const { fetch } = loadEvent;
    var locations = await Get<NotificationSubscriptionInfo[]>(fetch, `${baseUrl}api/notification-subscriptions`);

    return { result: locations }
}) satisfies PageLoad;