import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { UserDetails, UserInfo } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {

    const { fetch: svelteFetch } = loadEvent;
    const usersInfos = await Get<UserDetails[]>(svelteFetch, `${baseUrl}api/users/`);
    const users = usersInfos.map((userInfo) => ({ id: userInfo.id, name: userInfo.firstName + ' ' + userInfo.lastName }));

    return { users: users }
}) satisfies PageLoad;