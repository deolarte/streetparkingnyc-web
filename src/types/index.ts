export type ParkingStatus = 'free' | 'warning' | 'restricted' | 'metered';

export type VehicleType = 'passenger' | 'commercial';

export interface ParkingSign {
  orderNumber?: string;
  signCode?: string;
  description: string;
  distanceFromIntersection?: number;
  arrowDirection?: 'East' | 'West' | 'North' | 'South' | 'Both' | 'Left' | 'Right' | 'None';
  signXCoord?: number;
  signYCoord?: number;
  coordinates?: [number, number]; // [lon, lat]
}

export interface MeterZoneInfo {
  payByCell: string;
  vehicleType: string;
  allVehiclesDuration?: string;
  allVehiclesHours?: string;
  allVehiclesRate?: string;
  allVehiclesMaxRate?: string;
  commercialDuration?: string;
  commercialHours?: string;
  commercialRate?: string;
  commercialMaxRate?: string;
  meterRateZone: string;
}

export interface CurbSegment {
  id: string;
  onStreet: string;
  fromStreet: string;
  toStreet: string;
  borough: string;
  sideOfStreet: 'N' | 'S' | 'E' | 'W' | 'All';
  coordinates: [number, number][]; // Line coordinates [[lon, lat], ...]
  signs: ParkingSign[];
  meterInfo?: MeterZoneInfo;
  shapeLength?: number;
  
  // Computed evaluation for target time:
  status: ParkingStatus;
  statusBadge: string;
  statusHeadline: string;
  statusDescription: string;
  nextChangeTime?: Date;
  timeUntilChangeMinutes?: number;
  activeRestrictionType?: 'street_sweeping' | 'no_parking' | 'no_standing' | 'no_stopping' | 'commercial_only' | 'metered';

  // "Until When" Parking Timeline:
  canParkUntil?: string; // e.g. "Tuesday at 8:30 AM", "Tomorrow at 11:30 AM"
  canParkDuration?: string; // e.g. "in 18h 30m"
  canParkHeadline?: string; // e.g. "Legal to park until Tuesday 8:30 AM"
  parkingTimeline?: ParkingTimelineInfo;
}

export type RawCurbSegment = Omit<
  CurbSegment,
  | 'status'
  | 'statusBadge'
  | 'statusHeadline'
  | 'statusDescription'
  | 'nextChangeTime'
  | 'timeUntilChangeMinutes'
  | 'activeRestrictionType'
  | 'canParkUntil'
  | 'canParkDuration'
  | 'canParkHeadline'
  | 'parkingTimeline'
>;

export interface ParkingTimelineInfo {
  canParkNow: boolean;
  canParkUntilDate?: Date;
  canParkUntilFormatted: string; // e.g. "Tomorrow at 8:30 AM", "Tuesday at 8:30 AM", "Today at 7:00 PM"
  canParkUntilDay: string; // e.g. "Tomorrow", "Tuesday", "Today"
  durationFormatted: string; // e.g. "18h 30m left", "3 days left"
  durationMinutes: number;
  nextEventTitle: string; // e.g. "Street Cleaning (ASP)", "Muni-Meter Starts"
  nextEventDescription: string;
  isUnlimited: boolean;
  resumeParkingDate?: Date; // If restricted right now, when can driver start parking?
  resumeParkingFormatted?: string;
  meterDetails?: {
    requiredNow: boolean;
    rate?: string;
    maxDuration?: string;
    freeAfterFormatted?: string;
  };
}

export interface AspHoliday {
  date: string; // YYYY-MM-DD
  name: string;
  rulesSuspended: boolean;
}

export interface TimeFilterState {
  isNow: boolean;
  selectedTime: Date;
  vehicleType: VehicleType;
}

export interface SearchResult {
  title: string;
  subtitle: string;
  coordinates: [number, number];
  segmentId?: string;
}
