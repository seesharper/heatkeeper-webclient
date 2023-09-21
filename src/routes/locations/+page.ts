import type { LocationInfo } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async () => {

    let locations: LocationInfo[] = [
        { id: 1, name: 'test', description: 'test' },
        { id: 2, name: 'test2', description: 'test2' },
        { id: 3, name: 'test3', description: 'test4' }];
    return { result: locations }
}) satisfies PageLoad;