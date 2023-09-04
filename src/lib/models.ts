export interface User {
    token: string;
    name: string;
    isAdmin: boolean;
    eMail: string;
    id: number;
}

export interface UserInfo {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
}

export interface LoginRequest {
    email: string;
    password: string;
}