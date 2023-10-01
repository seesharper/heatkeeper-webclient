import type { LocationInfo } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async () => {
    let location: LocationInfo = { id: 1, name: 'Home', description: 'Home Description' };
    return location;
}) satisfies PageLoad;