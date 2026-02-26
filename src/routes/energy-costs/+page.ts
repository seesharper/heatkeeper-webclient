import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { LocationInfo } from '$lib/models';
import type { PageLoad } from './$types';

export const ssr = false;

export const load = (async (loadEvent) => {
	const { fetch: svelteFetch } = loadEvent;
	const locationInfos = await Get<LocationInfo[]>(svelteFetch, `${baseUrl}api/locations`);
	const locations = locationInfos.map((l) => ({ value: l.id, name: l.name }));
	return { locations };
}) satisfies PageLoad;
