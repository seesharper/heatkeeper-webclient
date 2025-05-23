import type { EnergyPriceAreaDetails, HeaterDetails, LocationDetails, LocationInfo, LoginRequest, NewEnergyPriceArea, NewHeater, NewLocation, NewNotification, NewProgram, NewSchedule, NewSetPoint, NewVatRate, NewZone, NotificationDetails, ProgramDetails, ScheduleDetails, SensorDetails, SetPointDetails, UpdatedSetPoint, User, UserDetails, VatRateDetails, ZoneDetails } from "$lib/models";
import { baseUrl } from "$lib/environment";
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

export async function updateLocation(locationDetails: LocationDetails): Promise<void> {
    await Patch(`${baseUrl}api/locations/${locationDetails.id}`, locationDetails);
    goto("/locations");
}

export async function assignLocationToUser(userId: number, locationId: number): Promise<void> {
    await Patch(`${baseUrl}api/users/${userId}/assignLocation`, { locationId: locationId });
}

export async function removeLocationFromUser(userId: number, locationId: number): Promise<void> {
    await Patch(`${baseUrl}api/users/${userId}/removeLocation`, { locationId: locationId });
}

export async function updateProgram(programDetails: ProgramDetails): Promise<void> {
    await Patch(`${baseUrl}api/programs/${programDetails.id}`, programDetails);
}
export async function createProgram(newProgram: NewProgram, locationId: string): Promise<void> {
    await Post(fetch, `${baseUrl}api/locations/${locationId}/programs`, newProgram);
}

export async function createHeater(newProgram: NewHeater, zoneId: string): Promise<void> {
    await Post(fetch, `${baseUrl}api/zones/${zoneId}/heaters`, newProgram);
}

export async function createUser(newUser: UserDetails): Promise<void> {
    await Post(fetch, `${baseUrl}api/users`, newUser);

}

export async function deleteProgram(programId: number): Promise<void> {
    await Delete(`${baseUrl}api/programs/${programId}`);
}

export async function deleteNotification(notificationId: number): Promise<void> {
    await Delete(`${baseUrl}api/notifications/${notificationId}`);
}

export async function updateNotification(notificationDetails: NotificationDetails): Promise<void> {
    await Patch(`${baseUrl}api/notifications/${notificationDetails.id}`, notificationDetails);
}

export async function createVatRate(newVatRate: NewVatRate): Promise<void> {
    await Post(fetch, `${baseUrl}api/vat-rates`, newVatRate);
    goto("/vat-rates");
}

export async function deleteVatRate(vatRateId: number): Promise<void> {
    await Delete(`${baseUrl}api/vat-rates/${vatRateId}`);
}

export async function updateVatRate(vatRate: VatRateDetails): Promise<void> {
    await Patch(`${baseUrl}api/vat-rates/${vatRate.id}`, vatRate);
}

export async function createEnergyPriceArea(newEnergyPriceArea: NewEnergyPriceArea): Promise<void> {
    await Post(fetch, `${baseUrl}api/energy-price-areas`, newEnergyPriceArea);
    goto("/energy-price-areas");
}

export async function createNotification(newNotification: NewNotification): Promise<void> {
    await Post(fetch, `${baseUrl}api/notifications`, newNotification);
    goto("/notifications");
}


export async function deleteEnergyPriceArea(energyPriceAreaId: number): Promise<void> {
    await Delete(`${baseUrl}api/energy-price-areas/${energyPriceAreaId}`);
    goto("/energy-price-areas");
}

export async function updateEnergyPriceArea(energyPriceArea: EnergyPriceAreaDetails): Promise<void> {
    await Patch(`${baseUrl}api/energy-price-areas/${energyPriceArea.id}`, energyPriceArea);
    goto("/energy-price-areas");
}


export async function createLocation(newLocation: NewLocation): Promise<void> {
    await Post(fetch, `${baseUrl}api/locations`, newLocation);
    goto("/locations");
}

export async function deleteLocation(locationId: number): Promise<void> {
    await Delete(`${baseUrl}api/locations/${locationId}`);
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

export async function createSchedule(newSchedule: NewSchedule, programId: string): Promise<void> {
    await Post(fetch, `${baseUrl}api/programs/${programId}/schedules`, newSchedule);
}

export async function createSetPoint(newSetPoint: NewSetPoint, scheduleId: string): Promise<void> {
    await Post(fetch, `${baseUrl}api/schedules/${scheduleId}/setpoints`, newSetPoint);
}

export async function deleteSchedule(scheduleId: number): Promise<void> {
    await Delete(`${baseUrl}api/schedules/${scheduleId}`);
}

export async function deleteHeater(heaterId: number): Promise<void> {
    await Delete(`${baseUrl}api/heaters/${heaterId}`);
}

export async function updateSchedule(schedule: ScheduleDetails): Promise<void> {
    await Patch(`${baseUrl}api/schedules/${schedule.id}`, schedule);
}

export async function updateHeater(heater: HeaterDetails): Promise<void> {
    await Patch(`${baseUrl}api/heaters/${heater.id}`, heater);
}

export async function updateSensor(sensor: SensorDetails): Promise<void> {
    await Patch(`${baseUrl}api/sensors/${sensor.id}`, sensor);
}

export async function updateUser(user: UserDetails): Promise<void> {
    await Patch(`${baseUrl}api/users/${user.id}`, user);
}

export async function deleteUser(userId: number): Promise<void> {
    await Delete(`${baseUrl}api/users/${userId}`);
}

export async function updateSetPoint(setPoint: UpdatedSetPoint): Promise<void> {
    await Patch(`${baseUrl}api/setpoints/${setPoint.id}`, setPoint);
}

export async function deleteSetPoint(setpointId: number): Promise<void> {
    await Delete(`${baseUrl}api/setpoints/${setpointId}`);
}

export async function publishMqttMessage(topic: string, payload: string): Promise<void> {
    await Post(fetch, `${baseUrl}api/mqtt`, { payload: payload, topic: topic });
}

export async function assignZoneToSensor(zoneId: string, sensorId: number): Promise<void> {
    await Patch(`${baseUrl}api/sensors/${sensorId}/assignZone`, { zoneId: zoneId });
}

export async function createSubscription(subscription: PushSubscription): Promise<void> {
    await Post(fetch, `${baseUrl}api/pushSubscriptions`, subscription);
}

// TODO Review body
export async function removeZoneFromSensor(sensorId: number): Promise<void> {
    await Patch(`${baseUrl}api/sensors/${sensorId}/removeZone`, { sensorId: sensorId });
}

export async function activateProgram(programId: number): Promise<void> {
    console.log('Activating program', programId);
    await Post(fetch, `${baseUrl}api/programs/${programId}/activate`, {});
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