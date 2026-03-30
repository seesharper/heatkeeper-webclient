import { baseUrl } from '$lib/environment';
import type { LocationInfo } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const response = await fetch(`${baseUrl}api/locations`, {
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' }
	});
	const locations = await response.json() as LocationInfo[];
	return { locations };
}) satisfies PageLoad;
