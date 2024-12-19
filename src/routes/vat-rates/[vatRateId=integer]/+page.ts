import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { VatRateDetails } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {
    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;
    const vatRate = await Get<VatRateDetails>(svelteFetch, `${baseUrl}api/vat-rates/${params.vatRateId}`);
    return { vatRate: vatRate }
}) satisfies PageLoad;