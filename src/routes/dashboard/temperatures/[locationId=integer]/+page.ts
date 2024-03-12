import { Get } from '$lib/api';
import { baseUrl } from '$lib/environment';
import type { LocationDetails, ProgramInfo, ZoneReading } from '$lib/models';
import type { PageLoad } from './$types';


export const load = (async (loadEvent) => {

    const { fetch: svelteFetch } = loadEvent;
    const { params } = loadEvent;
    // Possibly create an endpoint to get all the data in one go
    const locationTemperatures = await Get<ZoneReading[]>(svelteFetch, `${baseUrl}api/locations/${params.locationId}/temperatures`);    
    const programInfos = await Get<ProgramInfo[]>(svelteFetch, `${baseUrl}api/locations/${params.locationId}/programs`);    
    const programs = programInfos.map((program) => ({ value: program.id, name: program.name }));
    const locationDetails = await Get<LocationDetails>(svelteFetch, `${baseUrl}api/locations/${params.locationId}`);        
    return {
        temperatures: locationTemperatures,
        programs: programs,
        activeProgramId: locationDetails.activeProgramId
    }
}) satisfies PageLoad;