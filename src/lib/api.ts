import axios, { type AxiosRequestConfig } from "axios";
import type { DashboardLocation, LocationInfo, LoginRequest, User } from "$lib/models";
import { baseUrl } from "$lib/environment";
import { currentUser } from '$lib/stores';
import { get } from "svelte/store";
import { goto } from "$app/navigation";

export async function login(loginRequest: LoginRequest): Promise<User> {
    const result = await axios.post(
        `${baseUrl}api/users/authenticate`,
        loginRequest
    );
    return result.data as User;
}

export async function updateLocation(locationInfo: LocationInfo): Promise<void> {
    let requestInfo = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locationInfo })
    };
    console.log(requestInfo);
    goto('/locations');
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