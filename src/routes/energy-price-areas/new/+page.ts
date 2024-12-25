import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { VatRateInfo } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {

    const { fetch: svelteFetch } = loadEvent;    
    const vatRateInfos = await Get<VatRateInfo[]>(svelteFetch, `${baseUrl}api/vat-rates`);
    const vatRates = vatRateInfos.map((zone) => ({ value: zone.id, name: zone.name }));
    return { vatRates: vatRates }
}) satisfies PageLoad;