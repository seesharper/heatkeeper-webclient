import { browser } from '$app/environment';
import { getPermission } from '$lib/notifications';
import type { LayoutLoad } from './$types';

export const load = (async () => {
    if (browser) {
        await getPermission();
    }
}) satisfies LayoutLoad;
