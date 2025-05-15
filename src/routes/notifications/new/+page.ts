import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { NotificationTypeInfo, VatRateInfo } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {
    const { fetch: svelteFetch } = loadEvent;
    const notificationTypeInfos = await Get<NotificationTypeInfo[]>(svelteFetch, `${baseUrl}api/notification-types`);
    const notificationTypes = notificationTypeInfos.map((zone) => ({ value: zone.id, name: zone.name }));
    return { notificationTypes: notificationTypes }
}) satisfies PageLoad;