import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { UserDetails } from '$lib/models';
import type { LayoutLoad } from './$types';

export const load = (async (loadEvent) => {
    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;
    const user = await Get<UserDetails>(svelteFetch, `${baseUrl}api/users/${params.userId}`);
    return { user: user }
}) satisfies LayoutLoad;