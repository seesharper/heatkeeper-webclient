import type { LocationInfo } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async () => {

    let locations: LocationInfo[] = [
        { id: 1, name: 'Home', description: 'Home Description' },
        { id: 2, name: 'Cabin', description: 'Cabin Description' },
    ]
    return { result: locations }
}) satisfies PageLoad;