import axios, { type AxiosRequestConfig } from "axios";
import type { DashboardLocation, LocationInfo, LoginRequest, NewLocation, User } from "$lib/models";
import { baseUrl } from "$lib/environment";
import { currentUser } from '$lib/stores';
import { get } from "svelte/store";
import { goto } from "$app/navigation";
import type { as } from "vitest/dist/reporters-qc5Smpt5.js";

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

/**
 * Updates the location
 * @param locationInfo - The updated location information.
 * @returns A Promise that resolves with void when the update is complete.
 */
export async function updateLocation(locationInfo: LocationInfo): Promise<void> {
    await Patch(fetch, `${baseUrl}api/locations/${locationInfo.id}`, locationInfo);
    goto("/locations");
}

export async function createLocation(newLocation: NewLocation): Promise<void> {
    await Post(fetch, `${baseUrl}api/locations`, newLocation);
    goto("/locations");
}


export async function getDashboardLocations(): Promise<DashboardLocation[]> {
    console.log(get(currentUser));


    const config: AxiosRequestConfig = {
        headers: { Authorization: "bearer " + get(currentUser).token },
    };

    const result = await axios.get<DashboardLocation[]>(
        `${baseUrl}api/dashboard/locations`,
        config
    );
    console.log(result.data);

    return result.data as DashboardLocation[];
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

export async function Patch(svelteFetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>, url: string, body: any): Promise<void> {
    var request = new Request(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    const config: RequestInit = {
        credentials: 'include'
    };
    await svelteFetch(request, config);
}   