import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { ProgramDetails } from '$lib/models';
import type { LayoutLoad } from './$types';

export const load = (async (loadEvent) => {
    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;
    const program = await Get<ProgramDetails>(svelteFetch, `${baseUrl}api/programs/${params.programId}`);
    return { program: program }
}) satisfies LayoutLoad;