export interface User {
    token: string;
    name: string;
    isAdmin: boolean;
    eMail: string;
    id: number;
}

export interface UserDetails {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
}

export interface NewUser {
    email: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    password: string;
    confirmedPassword: string;
}


export interface LoginRequest {
    email: string;
    password: string;
}

export interface DashboardLocation {
    id: number;
    name: string;
    activeProgramId: number;
    outsideTemperature: number;
    insideTemperature: number;
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
    defaultInsideZoneId: number,
    activeProgramId: number
}

export type ZoneDetails = { id: number, name: string, description: string, mqttTopic: string, isDefaultOutsideZone: boolean, isDefaultInsideZone: boolean, locationId: number }

export type NewZone = { name: string, description: string }


export type ProgramInfo = { id: number, name: string }

export type ProgramDetails = { id: number, name: string, description: string, activeScheduleId: number }

export type NewProgram = { name: string, description: string }

export type NewSchedule = { name: string, cronExpression: string }

export type NewSetPoint = { zoneId: number }

export type ScheduleInfo = { id: number, name: string }

export type ScheduleDetails = { id: number, name: string, cronExpression: string }

export type SetPointInfo = { id: number, zoneName: string, value: number }

export type SetPointDetails = { id: number, value: number, hysteresis: number, zoneName: string, scheduleName: string }

export type UpdatedSetPoint = { id: number, value: number, hysteresis: number }

export type HeaterInfo = { id: number, name: string }

export type NewHeater = { name: string, description: string }

export type HeaterDetails = { id: number, name: string, description: string, mqttTopic: string, onPayload: string, offPayload: string, zoneName: string }

export type SensorInfo = { id: number, name: string }

export type UnassignedSensorInfo = { id: number, name: string, externalId: string, lastSeen: Date }

export type SensorDetails = { id: number, name: string, description: string, externalId: string, lastSeen: Date, zoneName: string }

export type UserInfo = { id: number, name: string }

export type UserLocationAccess = { locationId: number, locationName: string, hasAccess: boolean }


// long Id, string Name, string ExternalId, string Zone, string Location, DateTime lastSeen
export type DeadSensor = { id: number, name: string, externalId: string, zone: string, location: string, lastSeen: Date }
export type Measurement = { value: number, created: Date }

export type ZoneInsights = { zoneId: number, zoneName: string, temperatureMeasurements: Measurement[], humidityMeasurements: Measurement[] }

export type VatRateInfo = { id: number, name: string, rate: number }

export type NewVatRate = { name: string, rate: number }

export type VatRateDetails = { id: number, name: string, rate: number }



export type EnergyPriceAreaInfo = { id: number, name: string }

// public record EnergyPriceAreaDetails(long Id, string EIC_Code, string Name, string Description, long VATRateId);

export type EnergyPriceAreaDetails = { id: number, eiC_Code: string, name: string, description: string, displayOrder: number, vatRateId: number }

// public record PostEnergyPriceAreaCommand(string EIC_Code, string Name, string Description, long VATRateId) : PostCommand;

export type NewEnergyPriceArea = { eiC_Code: string, name: string, description: string, displayOrder: number, vatRateId: number }

// public record EnergyPrice(DateTime Date, decimal Price, decimal PriceAfterSubsidy);

export type EnergyPrice = { timeStart: Date, timeEnd: Date, price: number, priceAfterSubsidy: number }