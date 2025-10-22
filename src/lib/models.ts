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

export type SensorDetails = { id: number, name: string, description: string, externalId: string, minutesBeforeConsideredDead: number, lastSeen: Date, zoneName: string }

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

// public record NotificationSubscriptionInfo(long Id, string Name, bool IsSubscribed);

export type NotificationSubscriptionInfo = { id: number, name: string, isSubscribed: boolean }

// public record NotificationTypeInfo(int Id, string Name);

export type NotificationTypeInfo = { id: number, name: string }


// public record NotificationDetails(long Id, string Name, string Description, DateTime LastSent, NotificationType NotificationType, string CronExpression, long HoursToSnooze);

export type NotificationDetails = { id: number, name: string, description: string, lastSent: Date, notificationType: number, cronExpression: string, hoursToSnooze: number }


/* public record PostNotificationCommand(
    string Name,
    string Description,
    NotificationType NotificationType,
    string CronExpression,
    long HoursToSnooze) */
export type NewNotification = { name: string, description: string, notificationType: number, cronExpression: string, hoursToSnooze: number }

export type TriggerInfo = { id: number, name: string }

export type EventInfo = { id: number, name: string }

/*
public sealed record EventDetails(
    int Id,
    string Name,
    string Description,
    string EventType,
    IReadOnlyList<EventPropertyInfo> Properties
);
*/


/*
public sealed record EventPropertyInfo(
    string Name,
    string Type,
    bool IsNullable,
    string? Description = null
);
*/

export type EventPropertyInfo = {
    name: string,
    type: string,
    isNullable: boolean,
    description?: string
}

export type EventDetails = {
    id: number,
    name: string,
    description: string,
    eventType: string,
    properties: EventPropertyInfo[]
}

/*
/// <summary>
/// Operators for comparing values in trigger conditions.
/// Kept intentionally small so you can easily render them in a UI picker.
/// </summary>
public enum ComparisonOperator
{
    Equals,
    NotEquals,
    GreaterThan,
    GreaterOrEqual,
    LessThan,
    LessOrEqual,
    Contains,       // string contains
    StartsWith,     // string starts with
    EndsWith        // string ends with
}
*/

export enum ComparisonOperator {
    Equals = 0,
    NotEquals = 1,
    GreaterThan = 2,
    GreaterOrEqual = 3,
    LessThan = 4,
    LessOrEqual = 5,
    Contains = 6,       // string contains
    StartsWith = 7,     // string starts with
    EndsWith = 8        // string ends with
}


/*
public sealed record Condition
(
    string PropertyName,
    ComparisonOperator Operator,
    string Value
);
*/

export type Condition = {
    propertyName: string,
    operator: ComparisonOperator,
    value: string
}


export type ActionBinding = {
    actionName: string,
    parameterMap: Record<string, string>
}

export type TriggerDefinition = {
    name: string,
    appliesToEventType: string,
    conditions: Condition[],
    actions: ActionBinding[],
}

export type NewTrigger = { name: string }

export type PatchTrigger = { id: number, trigger: TriggerDefinition }