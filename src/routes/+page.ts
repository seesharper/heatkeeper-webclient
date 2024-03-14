import { goto } from '$app/navigation';
import type { PageLoad } from './$types';
export const ssr = false;
export const load = (async (loadEvent) => {
    await goto('/dashboard/temperatures/1');
}) satisfies PageLoad;