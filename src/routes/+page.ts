import type { PageLoad } from './$types';

import { getDashboardLocations } from '$lib/api';

export const load = (async () => {
    let result = await getDashboardLocations();
    return { result: result }
}) satisfies PageLoad;