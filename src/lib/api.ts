import axios, { type AxiosRequestConfig } from "axios";
import type { DashboardLocation, LoginRequest, User } from "$lib/models";
import { baseUrl } from "$lib/environment";
import { currentUser } from '$lib/stores';
import { get } from "svelte/store";

export async function login(loginRequest: LoginRequest): Promise<User> {
    const result = await axios.post(
        `${baseUrl}api/users/authenticate`,
        loginRequest
    );
    return result.data as User;
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