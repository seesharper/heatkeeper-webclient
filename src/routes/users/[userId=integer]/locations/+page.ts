import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { UserDetails, UserInfo, UserLocationAccess } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {

    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;
    const userLocationsAccess = await Get<UserLocationAccess[]>(svelteFetch, `${baseUrl}api/users/${params.userId}/locations-access`);

    return { userLocationsAccess: userLocationsAccess }
}) satisfies PageLoad;