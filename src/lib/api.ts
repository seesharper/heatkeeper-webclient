import type { LocationDetails, LocationInfo, LoginRequest, NewLocation, NewZone, User } from "$lib/models";
import { baseUrl } from "$lib/environment";
import { goto } from "$app/navigation";

export async function login(loginRequest: LoginRequest): Promise<User> {
    var request = new Request(`${baseUrl}api/users/authenticate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginRequest),
        credentials: 'same-origin',
    });
    var response = await fetch(request, { credentials: 'same-origin' });
    var user = await response.json() as User;
    return user;
}

export async function updateLocation(locationDetails: LocationDetails): Promise<void> {
    console.log(locationDetails);

    await Patch(`${baseUrl}api/locations/${locationDetails.id}`, locationDetails);
    goto("/locations");
}

export async function createLocation(newLocation: NewLocation): Promise<void> {
    await Post(fetch, `${baseUrl}api/locations`, newLocation);
    goto("/locations");
}

export async function createZone(newZone: NewZone, locationId: string): Promise<void> {
    await Post(fetch, `${baseUrl}api/locations/${locationId}/zones`, newZone);
}

export async function deleteZone(zoneId: number): Promise<void> {
    await Delete(`${baseUrl}api/zones/${zoneId}`);
}

export async function updateZone(zone: ZoneDetails): Promise<void> {
    await Patch(`${baseUrl}api/zones/${zone.id}`, zone);
}

export async function Get<T>(svelteFetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>, url: string): Promise<T> {
    var request = new Request(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const config: RequestInit = {
        credentials: 'include'
    };
    const response = await svelteFetch(request, config);
    return await response.json() as T;
}

export async function Post<T>(svelteFetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>, url: string, body: T): Promise<void> {
    var request = new Request(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    const config: RequestInit = {
        credentials: 'include'
    };
    await svelteFetch(request, config);
}

export async function Patch<T>(url: string, body: T): Promise<void> {
    var request = new Request(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    const config: RequestInit = {
        credentials: 'include'
    };
    await fetch(request, config);
}

export async function Delete(url: string): Promise<void> {
    var request = new Request(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    const config: RequestInit = {
        credentials: 'include'
    };
    await fetch(request, config);
}