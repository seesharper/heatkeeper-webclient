import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { NotificationDetails } from '$lib/models';
import type { LayoutLoad } from './$types';

export const load = (async (loadEvent) => {
    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;
    const notification = await Get<NotificationDetails>(svelteFetch, `${baseUrl}api/notifications/${params.notificationId}`);
    return { notification: notification }
}) satisfies LayoutLoad;