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

export interface DashboardLocation {
    id: number;
    name: string;
    outsideTemperature: number;
    outsideHumidity: number;
    insideTemperature: number;
    insideHumidity: number;
}

export type LocationInfo = {
    id: number;
    name: string;
    description: string;
}

export type NewLocation = { name: string, description: string }


export type ZoneInfo = {
    id: number,
    name: string,
    description: string
}

export type ZoneReading = {
    zoneId: number,
    name: string,
    temperature: number,
    humidity: number,
    updated: Date
}

export type LocationDetails = {
    id: number,
    name: string,
    description: string,
    defaultOutsideZoneId: number,
    defaultInsideZoneId: number
}

export type ZoneDetails = { id: number, name: string, description: string, mqttTopic: string, isDefaultOutsideZone: boolean, isDefaultInsideZone: boolean, locationId: number }

export type NewZone = { name: string, description: string, locationId: number }