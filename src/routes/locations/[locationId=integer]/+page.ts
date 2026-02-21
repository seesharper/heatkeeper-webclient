import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { EnergyPriceAreaInfo, ZoneInfo } from '$lib/models';
import type { PageLoad } from './$types';

export const load = (async (loadEvent) => {

    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;

    const [zoneInfos, energyPriceAreaInfos] = await Promise.all([
        Get<ZoneInfo[]>(svelteFetch, `${baseUrl}api/locations/${params.locationId}/zones`),
        Get<EnergyPriceAreaInfo[]>(svelteFetch, `${baseUrl}api/energy-price-areas`)
    ]);
    const zones = zoneInfos.map((zone) => ({ value: zone.id, name: zone.name }));
    const energyPriceAreas = energyPriceAreaInfos.map((area) => ({ value: area.id, name: area.name }));
    return { zones, energyPriceAreas }
}) satisfies PageLoad;