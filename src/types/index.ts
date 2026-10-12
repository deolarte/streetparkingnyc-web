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
