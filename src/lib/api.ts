import axios from "axios";
import type { LoginRequest, User } from "$lib/models";
import { baseUrl } from "$lib/environment";

export async function login(loginRequest: LoginRequest): Promise<User> {
    const result = await axios.post(
        `${baseUrl}api/users/authenticate`,
        loginRequest
    );
    return result.data as User;
}
