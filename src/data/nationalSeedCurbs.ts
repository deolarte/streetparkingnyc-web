import type { RawCurbSegment } from '../types';

/**
 * Nationwide High-Fidelity Parking Corridors for Major US Metropolitan Centers
 * Covers Chicago, Los Angeles, San Francisco, Austin, Houston, Miami,
 * Washington D.C., Boston, Seattle, Philadelphia, and Denver.
 */
export const NATIONAL_SEED_CURBS: RawCurbSegment[] = [
  // =========================================================================
  // 1. CHICAGO, ILLINOIS (THE LOOP, RIVER NORTH & WEST LOOP)
  // Powered by ParkChicago (Zones 10101-10250) & MCC Chapter 9-64
  // =========================================================================

  // W Monroe St (The Loop - S Wells to S Michigan Ave)
  {
    id: 'curb-il-chi-monroe-10101',
    onStreet: 'West Monroe Street',
    fromStreet: 'South Wells Street',
    toStreet: 'South LaSalle Street',
    borough: 'Chicago (The Loop)',
    sideOfStreet: 'N',
    coordinates: [
      [-87.6339, 41.8808],
      [-87.6322, 41.8808],
      [-87.6305, 41.8808],
    ],
    shapeLength: 280,
    meterInfo: {
      payByCell: '10101',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-9 PM',
      allVehiclesRate: '$7.00 / Hour',
      allVehiclesMaxRate: '$14.00',
      meterRateZone: 'Loop Business Zone 1',
    },
    signs: [
      {
        signCode: 'CHI-PC-101',
        description: 'PARKCHICAGO ZONE 10101 2 HOUR METER MON-SAT 8AM-9PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'CHI-SW-101',
        description: 'STREET CLEANING TUESDAY 9AM-11AM (APRIL 1 - NOV 30)',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-il-chi-monroe-10102',
    onStreet: 'West Monroe Street',
    fromStreet: 'South LaSalle Street',
    toStreet: 'South Clark Street',
    borough: 'Chicago (The Loop)',
    sideOfStreet: 'S',
    coordinates: [
      [-87.6305, 41.8808],
      [-87.6290, 41.8808],
      [-87.6275, 41.8808],
    ],
    shapeLength: 260,
    meterInfo: {
      payByCell: '10102',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-9 PM',
      allVehiclesRate: '$7.00 / Hour',
      allVehiclesMaxRate: '$14.00',
      meterRateZone: 'Loop Business Zone 1',
    },
    signs: [
      {
        signCode: 'CHI-PC-102',
        description: 'PARKCHICAGO ZONE 10102 2 HOUR METER MON-SAT 8AM-9PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'CHI-SW-102',
        description: 'STREET CLEANING THURSDAY 9AM-11AM (APRIL 1 - NOV 30)',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-il-chi-monroe-10103',
    onStreet: 'West Monroe Street',
    fromStreet: 'South Clark Street',
    toStreet: 'South Dearborn Street',
    borough: 'Chicago (The Loop)',
    sideOfStreet: 'N',
    coordinates: [
      [-87.6275, 41.8808],
      [-87.6260, 41.8808],
      [-87.6245, 41.8808],
    ],
    shapeLength: 260,
    meterInfo: {
      payByCell: '10103',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-9 PM',
      allVehiclesRate: '$7.00 / Hour',
      allVehiclesMaxRate: '$14.00',
      meterRateZone: 'Loop Business Zone 1',
    },
    signs: [
      {
        signCode: 'CHI-PC-103',
        description: 'PARKCHICAGO ZONE 10103 2 HOUR METER MON-SAT 8AM-9PM',
        arrowDirection: 'Both',
      },
    ],
  },

  // W Adams St (The Loop - S Wells to S Michigan)
  {
    id: 'curb-il-chi-adams-10104',
    onStreet: 'West Adams Street',
    fromStreet: 'South Wells Street',
    toStreet: 'South LaSalle Street',
    borough: 'Chicago (The Loop)',
    sideOfStreet: 'S',
    coordinates: [
      [-87.6339, 41.8793],
      [-87.6322, 41.8793],
      [-87.6305, 41.8793],
    ],
    shapeLength: 280,
    meterInfo: {
      payByCell: '10104',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-9 PM',
      allVehiclesRate: '$7.00 / Hour',
      allVehiclesMaxRate: '$14.00',
      meterRateZone: 'Loop Business Zone 1',
    },
    signs: [
      {
        signCode: 'CHI-PC-104',
        description: 'PARKCHICAGO ZONE 10104 2 HOUR METER MON-SAT 8AM-9PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'CHI-WN-101',
        description: 'WINTER OVERNIGHT PARKING BAN 3AM-7AM (DEC 1 - APR 1)',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-il-chi-adams-10105',
    onStreet: 'West Adams Street',
    fromStreet: 'South LaSalle Street',
    toStreet: 'South Clark Street',
    borough: 'Chicago (The Loop)',
    sideOfStreet: 'N',
    coordinates: [
      [-87.6305, 41.8793],
      [-87.6290, 41.8793],
      [-87.6275, 41.8793],
    ],
    shapeLength: 260,
    meterInfo: {
      payByCell: '10105',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-9 PM',
      allVehiclesRate: '$7.00 / Hour',
      allVehiclesMaxRate: '$14.00',
      meterRateZone: 'Loop Business Zone 1',
    },
    signs: [
      {
        signCode: 'CHI-PC-105',
        description: 'PARKCHICAGO ZONE 10105 2 HOUR METER MON-SAT 8AM-9PM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-il-chi-adams-10106',
    onStreet: 'West Adams Street',
    fromStreet: 'South Clark Street',
    toStreet: 'South Dearborn Street',
    borough: 'Chicago (The Loop)',
    sideOfStreet: 'S',
    coordinates: [
      [-87.6275, 41.8793],
      [-87.6260, 41.8793],
      [-87.6245, 41.8793],
    ],
    shapeLength: 260,
    meterInfo: {
      payByCell: '10106',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-9 PM',
      allVehiclesRate: '$7.00 / Hour',
      allVehiclesMaxRate: '$14.00',
      meterRateZone: 'Loop Business Zone 1',
    },
    signs: [
      {
        signCode: 'CHI-PC-106',
        description: 'PARKCHICAGO ZONE 10106 2 HOUR METER MON-SAT 8AM-9PM',
        arrowDirection: 'Both',
      },
    ],
  },

  // S LaSalle St (The Loop Financial District - Jackson to Washington)
  {
    id: 'curb-il-chi-lasalle-10107',
    onStreet: 'South LaSalle Street',
    fromStreet: 'West Jackson Boulevard',
    toStreet: 'West Adams Street',
    borough: 'Chicago (The Loop)',
    sideOfStreet: 'E',
    coordinates: [
      [-87.6305, 41.8778],
      [-87.6305, 41.8785],
      [-87.6305, 41.8793],
    ],
    shapeLength: 220,
    meterInfo: {
      payByCell: '10107',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-9 PM',
      allVehiclesRate: '$7.00 / Hour',
      allVehiclesMaxRate: '$14.00',
      meterRateZone: 'Loop Financial Corridor',
    },
    signs: [
      {
        signCode: 'CHI-PC-107',
        description: 'PARKCHICAGO ZONE 10107 2 HOUR METER MON-SAT 8AM-9PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'CHI-LD-101',
        description: 'COMMERCIAL LOADING ZONE 6AM-8AM MON-FRI <->',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-il-chi-lasalle-10108',
    onStreet: 'South LaSalle Street',
    fromStreet: 'West Adams Street',
    toStreet: 'West Monroe Street',
    borough: 'Chicago (The Loop)',
    sideOfStreet: 'W',
    coordinates: [
      [-87.6305, 41.8793],
      [-87.6305, 41.8800],
      [-87.6305, 41.8808],
    ],
    shapeLength: 220,
    meterInfo: {
      payByCell: '10108',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-9 PM',
      allVehiclesRate: '$7.00 / Hour',
      allVehiclesMaxRate: '$14.00',
      meterRateZone: 'Loop Financial Corridor',
    },
    signs: [
      {
        signCode: 'CHI-PC-108',
        description: 'PARKCHICAGO ZONE 10108 2 HOUR METER MON-SAT 8AM-9PM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-il-chi-lasalle-10109',
    onStreet: 'South LaSalle Street',
    fromStreet: 'West Monroe Street',
    toStreet: 'West Madison Street',
    borough: 'Chicago (The Loop)',
    sideOfStreet: 'E',
    coordinates: [
      [-87.6305, 41.8808],
      [-87.6305, 41.8815],
      [-87.6305, 41.8821],
    ],
    shapeLength: 210,
    meterInfo: {
      payByCell: '10109',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-9 PM',
      allVehiclesRate: '$7.00 / Hour',
      allVehiclesMaxRate: '$14.00',
      meterRateZone: 'Loop Financial Corridor',
    },
    signs: [
      {
        signCode: 'CHI-PC-109',
        description: 'PARKCHICAGO ZONE 10109 2 HOUR METER MON-SAT 8AM-9PM',
        arrowDirection: 'Both',
      },
    ],
  },

  // S Clark St (The Loop - Ida B Wells to Jackson & Monroe)
  {
    id: 'curb-il-chi-clark-10110',
    onStreet: 'South Clark Street',
    fromStreet: 'West Ida B Wells Drive',
    toStreet: 'West Van Buren Street',
    borough: 'Chicago (The Loop)',
    sideOfStreet: 'W',
    coordinates: [
      [-87.6310, 41.8755],
      [-87.6310, 41.8763],
      [-87.6310, 41.8770],
    ],
    shapeLength: 240,
    meterInfo: {
      payByCell: '10110',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-9 PM',
      allVehiclesRate: '$7.00 / Hour',
      allVehiclesMaxRate: '$14.00',
      meterRateZone: 'Loop Zone 1',
    },
    signs: [
      {
        signCode: 'CHI-PC-110',
        description: 'PARKCHICAGO ZONE 10110 2 HOUR METER MON-SAT 8AM-9PM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-il-chi-clark-10111',
    onStreet: 'South Clark Street',
    fromStreet: 'West Jackson Boulevard',
    toStreet: 'West Adams Street',
    borough: 'Chicago (The Loop)',
    sideOfStreet: 'E',
    coordinates: [
      [-87.6310, 41.8778],
      [-87.6310, 41.8785],
      [-87.6310, 41.8793],
    ],
    shapeLength: 220,
    meterInfo: {
      payByCell: '10111',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-9 PM',
      allVehiclesRate: '$7.00 / Hour',
      allVehiclesMaxRate: '$14.00',
      meterRateZone: 'Loop Zone 1',
    },
    signs: [
      {
        signCode: 'CHI-PC-111',
        description: 'PARKCHICAGO ZONE 10111 2 HOUR METER MON-SAT 8AM-9PM',
        arrowDirection: 'Both',
      },
    ],
  },

  // W Jackson Blvd (The Loop - S Wells to S State St)
  {
    id: 'curb-il-chi-jackson-10112',
    onStreet: 'West Jackson Boulevard',
    fromStreet: 'South Wells Street',
    toStreet: 'South LaSalle Street',
    borough: 'Chicago (The Loop)',
    sideOfStreet: 'S',
    coordinates: [
      [-87.6339, 41.8778],
      [-87.6322, 41.8778],
      [-87.6305, 41.8778],
    ],
    shapeLength: 280,
    meterInfo: {
      payByCell: '10112',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-9 PM',
      allVehiclesRate: '$7.00 / Hour',
      allVehiclesMaxRate: '$14.00',
      meterRateZone: 'Loop Zone 1',
    },
    signs: [
      {
        signCode: 'CHI-PC-112',
        description: 'PARKCHICAGO ZONE 10112 2 HOUR METER MON-SAT 8AM-9PM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-il-chi-jackson-10113',
    onStreet: 'West Jackson Boulevard',
    fromStreet: 'South LaSalle Street',
    toStreet: 'South Clark Street',
    borough: 'Chicago (The Loop)',
    sideOfStreet: 'N',
    coordinates: [
      [-87.6305, 41.8778],
      [-87.6290, 41.8778],
      [-87.6275, 41.8778],
    ],
    shapeLength: 260,
    meterInfo: {
      payByCell: '10113',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-9 PM',
      allVehiclesRate: '$7.00 / Hour',
      allVehiclesMaxRate: '$14.00',
      meterRateZone: 'Loop Zone 1',
    },
    signs: [
      {
        signCode: 'CHI-PC-113',
        description: 'PARKCHICAGO ZONE 10113 2 HOUR METER MON-SAT 8AM-9PM',
        arrowDirection: 'Both',
      },
    ],
  },

  // S Dearborn St (The Loop - Jackson to Monroe)
  {
    id: 'curb-il-chi-dearborn-10114',
    onStreet: 'South Dearborn Street',
    fromStreet: 'West Jackson Boulevard',
    toStreet: 'West Adams Street',
    borough: 'Chicago (The Loop)',
    sideOfStreet: 'W',
    coordinates: [
      [-87.6295, 41.8778],
      [-87.6295, 41.8785],
      [-87.6295, 41.8793],
    ],
    shapeLength: 220,
    meterInfo: {
      payByCell: '10114',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-9 PM',
      allVehiclesRate: '$7.00 / Hour',
      allVehiclesMaxRate: '$14.00',
      meterRateZone: 'Loop Zone 1',
    },
    signs: [
      {
        signCode: 'CHI-PC-114',
        description: 'PARKCHICAGO ZONE 10114 2 HOUR METER MON-SAT 8AM-9PM',
        arrowDirection: 'Both',
      },
    ],
  },

  // W Ida B Wells Dr & Printers Row (South Loop)
  {
    id: 'curb-il-chi-idabwells-10115',
    onStreet: 'West Ida B Wells Drive',
    fromStreet: 'South Wells Street',
    toStreet: 'South Clark Street',
    borough: 'Chicago (Printers Row)',
    sideOfStreet: 'S',
    coordinates: [
      [-87.6339, 41.8755],
      [-87.6322, 41.8755],
      [-87.6305, 41.8755],
    ],
    shapeLength: 290,
    meterInfo: {
      payByCell: '10115',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-9 PM',
      allVehiclesRate: '$4.75 / Hour',
      allVehiclesMaxRate: '$9.50',
      meterRateZone: 'South Loop Zone 2',
    },
    signs: [
      {
        signCode: 'CHI-PC-115',
        description: 'PARKCHICAGO ZONE 10115 2 HOUR METER MON-SAT 8AM-9PM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-il-chi-harrison-10116',
    onStreet: 'West Harrison Street',
    fromStreet: 'South Wells Street',
    toStreet: 'South Clark Street',
    borough: 'Chicago (Printers Row)',
    sideOfStreet: 'N',
    coordinates: [
      [-87.6339, 41.8740],
      [-87.6322, 41.8740],
      [-87.6305, 41.8740],
    ],
    shapeLength: 290,
    signs: [
      {
        signCode: 'CHI-RP-101',
        description: 'PERMIT PARKING ONLY 6PM-8AM DAILY (PERMIT ZONE 109)',
        arrowDirection: 'Both',
      },
      {
        signCode: 'CHI-SW-103',
        description: 'STREET CLEANING FRIDAY 9AM-11AM',
        arrowDirection: 'Both',
      },
    ],
  },

  // River North (Chicago - N Clark, N Dearborn, W Hubbard, W Grand)
  {
    id: 'curb-il-chi-hubbard-10120',
    onStreet: 'West Hubbard Street',
    fromStreet: 'North LaSalle Street',
    toStreet: 'North Clark Street',
    borough: 'Chicago (River North)',
    sideOfStreet: 'N',
    coordinates: [
      [-87.6325, 41.8898],
      [-87.6310, 41.8898],
      [-87.6295, 41.8898],
    ],
    shapeLength: 260,
    meterInfo: {
      payByCell: '10120',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '3 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-midnight',
      allVehiclesRate: '$4.75 / Hour',
      allVehiclesMaxRate: '$14.25',
      meterRateZone: 'River North Entertainment Corridor',
    },
    signs: [
      {
        signCode: 'CHI-PC-120',
        description: 'PARKCHICAGO ZONE 10120 3 HOUR METER MON-SAT 8AM-MIDNIGHT',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-il-chi-grand-10121',
    onStreet: 'West Grand Avenue',
    fromStreet: 'North LaSalle Street',
    toStreet: 'North Dearborn Street',
    borough: 'Chicago (River North)',
    sideOfStreet: 'S',
    coordinates: [
      [-87.6325, 41.8918],
      [-87.6305, 41.8918],
      [-87.6285, 41.8918],
    ],
    shapeLength: 280,
    meterInfo: {
      payByCell: '10121',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-10 PM',
      allVehiclesRate: '$4.75 / Hour',
      allVehiclesMaxRate: '$9.50',
      meterRateZone: 'River North Zone 2',
    },
    signs: [
      {
        signCode: 'CHI-PC-121',
        description: 'PARKCHICAGO ZONE 10121 2 HOUR METER MON-SAT 8AM-10PM',
        arrowDirection: 'Both',
      },
    ],
  },

  // =========================================================================
  // 2. LOS ANGELES & CALIFORNIA (DTLA, CIVIC CENTER & SANTA MONICA)
  // Powered by ParkMobile / LADOT & CVC 22500
  // =========================================================================

  // S Spring St (DTLA - W 1st to W 5th St)
  {
    id: 'curb-ca-la-spring-30101',
    onStreet: 'South Spring Street',
    fromStreet: 'West 1st Street',
    toStreet: 'West 2nd Street',
    borough: 'Los Angeles (DTLA)',
    sideOfStreet: 'W',
    coordinates: [
      [-118.2465, 34.0530],
      [-118.2472, 34.0520],
      [-118.2478, 34.0510],
    ],
    shapeLength: 260,
    meterInfo: {
      payByCell: '30101',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-8 PM',
      allVehiclesRate: '$3.50 / Hour',
      allVehiclesMaxRate: '$7.00',
      meterRateZone: 'DTLA ExpressPark Zone',
    },
    signs: [
      {
        signCode: 'LA-PM-101',
        description: 'PARKMOBILE ZONE 30101 2 HOUR METER 8AM-8PM MON-SAT',
        arrowDirection: 'Both',
      },
      {
        signCode: 'LA-SS-101',
        description: 'NO PARKING STREET SWEEPING WEDNESDAY 4AM-6AM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-ca-la-spring-30102',
    onStreet: 'South Spring Street',
    fromStreet: 'West 2nd Street',
    toStreet: 'West 3rd Street',
    borough: 'Los Angeles (DTLA)',
    sideOfStreet: 'E',
    coordinates: [
      [-118.2478, 34.0510],
      [-118.2485, 34.0500],
      [-118.2492, 34.0490],
    ],
    shapeLength: 260,
    meterInfo: {
      payByCell: '30102',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-8 PM',
      allVehiclesRate: '$3.50 / Hour',
      allVehiclesMaxRate: '$7.00',
      meterRateZone: 'DTLA ExpressPark Zone',
    },
    signs: [
      {
        signCode: 'LA-PM-102',
        description: 'PARKMOBILE ZONE 30102 2 HOUR METER 8AM-8PM MON-SAT',
        arrowDirection: 'Both',
      },
    ],
  },

  // S Broadway (DTLA Theater & Historic District)
  {
    id: 'curb-ca-la-broadway-30103',
    onStreet: 'South Broadway',
    fromStreet: 'West 2nd Street',
    toStreet: 'West 3rd Street',
    borough: 'Los Angeles (DTLA)',
    sideOfStreet: 'W',
    coordinates: [
      [-118.2495, 34.0505],
      [-118.2502, 34.0495],
      [-118.2510, 34.0485],
    ],
    shapeLength: 270,
    meterInfo: {
      payByCell: '30103',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-8 PM',
      allVehiclesRate: '$4.00 / Hour',
      allVehiclesMaxRate: '$8.00',
      meterRateZone: 'Broadway Commercial Corridor',
    },
    signs: [
      {
        signCode: 'LA-PM-103',
        description: 'PARKMOBILE ZONE 30103 2 HOUR METER 8AM-8PM MON-SAT',
        arrowDirection: 'Both',
      },
      {
        signCode: 'LA-SS-102',
        description: 'NO PARKING STREET SWEEPING THURSDAY 4AM-6AM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-ca-la-broadway-30104',
    onStreet: 'South Broadway',
    fromStreet: 'West 3rd Street',
    toStreet: 'West 4th Street',
    borough: 'Los Angeles (DTLA)',
    sideOfStreet: 'E',
    coordinates: [
      [-118.2510, 34.0485],
      [-118.2518, 34.0475],
      [-118.2525, 34.0465],
    ],
    shapeLength: 260,
    meterInfo: {
      payByCell: '30104',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-8 PM',
      allVehiclesRate: '$4.00 / Hour',
      allVehiclesMaxRate: '$8.00',
      meterRateZone: 'Broadway Commercial Corridor',
    },
    signs: [
      {
        signCode: 'LA-PM-104',
        description: 'PARKMOBILE ZONE 30104 2 HOUR METER 8AM-8PM MON-SAT',
        arrowDirection: 'Both',
      },
    ],
  },

  // S Main St (DTLA - W 1st to W 4th)
  {
    id: 'curb-ca-la-main-30105',
    onStreet: 'South Main Street',
    fromStreet: 'West 1st Street',
    toStreet: 'West 2nd Street',
    borough: 'Los Angeles (DTLA)',
    sideOfStreet: 'E',
    coordinates: [
      [-118.2452, 34.0520],
      [-118.2459, 34.0510],
      [-118.2466, 34.0500],
    ],
    shapeLength: 250,
    meterInfo: {
      payByCell: '30105',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-8 PM',
      allVehiclesRate: '$3.50 / Hour',
      allVehiclesMaxRate: '$7.00',
      meterRateZone: 'DTLA ExpressPark Zone',
    },
    signs: [
      {
        signCode: 'LA-PM-105',
        description: 'PARKMOBILE ZONE 30105 2 HOUR METER 8AM-8PM MON-SAT',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-ca-la-main-30106',
    onStreet: 'South Main Street',
    fromStreet: 'West 2nd Street',
    toStreet: 'West 3rd Street',
    borough: 'Los Angeles (DTLA)',
    sideOfStreet: 'W',
    coordinates: [
      [-118.2466, 34.0500],
      [-118.2474, 34.0490],
      [-118.2482, 34.0480],
    ],
    shapeLength: 260,
    meterInfo: {
      payByCell: '30106',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-8 PM',
      allVehiclesRate: '$3.50 / Hour',
      allVehiclesMaxRate: '$7.00',
      meterRateZone: 'DTLA ExpressPark Zone',
    },
    signs: [
      {
        signCode: 'LA-PM-106',
        description: 'PARKMOBILE ZONE 30106 2 HOUR METER 8AM-8PM MON-SAT',
        arrowDirection: 'Both',
      },
    ],
  },

  // S Grand Ave (Civic Center & Bunker Hill)
  {
    id: 'curb-ca-la-grand-30107',
    onStreet: 'South Grand Avenue',
    fromStreet: 'West 1st Street',
    toStreet: 'West 2nd Street',
    borough: 'Los Angeles (Bunker Hill)',
    sideOfStreet: 'W',
    coordinates: [
      [-118.2498, 34.0545],
      [-118.2508, 34.0535],
      [-118.2518, 34.0525],
    ],
    shapeLength: 270,
    meterInfo: {
      payByCell: '30107',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-8 PM',
      allVehiclesRate: '$4.00 / Hour',
      allVehiclesMaxRate: '$8.00',
      meterRateZone: 'Civic Center Cultural Zone',
    },
    signs: [
      {
        signCode: 'LA-PM-107',
        description: 'PARKMOBILE ZONE 30107 2 HOUR METER 8AM-8PM MON-SAT',
        arrowDirection: 'Both',
      },
      {
        signCode: 'LA-WC-101',
        description: 'WHEELS MUST BE CRAMPED TO CURB ON HILL (CVC 22500)',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-ca-la-grand-30108',
    onStreet: 'South Grand Avenue',
    fromStreet: 'West 2nd Street',
    toStreet: 'West 3rd Street',
    borough: 'Los Angeles (Bunker Hill)',
    sideOfStreet: 'E',
    coordinates: [
      [-118.2518, 34.0525],
      [-118.2528, 34.0515],
      [-118.2538, 34.0505],
    ],
    shapeLength: 260,
    meterInfo: {
      payByCell: '30108',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-8 PM',
      allVehiclesRate: '$4.00 / Hour',
      allVehiclesMaxRate: '$8.00',
      meterRateZone: 'Civic Center Cultural Zone',
    },
    signs: [
      {
        signCode: 'LA-PM-108',
        description: 'PARKMOBILE ZONE 30108 2 HOUR METER 8AM-8PM MON-SAT',
        arrowDirection: 'Both',
      },
    ],
  },

  // S Hope St (Bunker Hill & Financial District)
  {
    id: 'curb-ca-la-hope-30109',
    onStreet: 'South Hope Street',
    fromStreet: 'West 2nd Street',
    toStreet: 'West 3rd Street',
    borough: 'Los Angeles (DTLA)',
    sideOfStreet: 'W',
    coordinates: [
      [-118.2535, 34.0535],
      [-118.2545, 34.0525],
      [-118.2555, 34.0515],
    ],
    shapeLength: 260,
    meterInfo: {
      payByCell: '30109',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-8 PM',
      allVehiclesRate: '$3.50 / Hour',
      allVehiclesMaxRate: '$7.00',
      meterRateZone: 'Financial District',
    },
    signs: [
      {
        signCode: 'LA-PM-109',
        description: 'PARKMOBILE ZONE 30109 2 HOUR METER 8AM-8PM MON-SAT',
        arrowDirection: 'Both',
      },
    ],
  },

  // W 2nd St (DTLA - Figueroa to Main)
  {
    id: 'curb-ca-la-2nd-30110',
    onStreet: 'West 2nd Street',
    fromStreet: 'South Broadway',
    toStreet: 'South Spring Street',
    borough: 'Los Angeles (DTLA)',
    sideOfStreet: 'S',
    coordinates: [
      [-118.2495, 34.0505],
      [-118.2486, 34.0510],
      [-118.2478, 34.0515],
    ],
    shapeLength: 220,
    meterInfo: {
      payByCell: '30110',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-8 PM',
      allVehiclesRate: '$3.50 / Hour',
      allVehiclesMaxRate: '$7.00',
      meterRateZone: 'DTLA Core',
    },
    signs: [
      {
        signCode: 'LA-PM-110',
        description: 'PARKMOBILE ZONE 30110 2 HOUR METER 8AM-8PM MON-SAT',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-ca-la-2nd-30111',
    onStreet: 'West 2nd Street',
    fromStreet: 'South Spring Street',
    toStreet: 'South Main Street',
    borough: 'Los Angeles (DTLA)',
    sideOfStreet: 'N',
    coordinates: [
      [-118.2478, 34.0515],
      [-118.2470, 34.0520],
      [-118.2462, 34.0525],
    ],
    shapeLength: 220,
    meterInfo: {
      payByCell: '30111',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-8 PM',
      allVehiclesRate: '$3.50 / Hour',
      allVehiclesMaxRate: '$7.00',
      meterRateZone: 'DTLA Core',
    },
    signs: [
      {
        signCode: 'LA-PM-111',
        description: 'PARKMOBILE ZONE 30111 2 HOUR METER 8AM-8PM MON-SAT',
        arrowDirection: 'Both',
      },
    ],
  },

  // Santa Monica (Ocean Ave Corridor)
  {
    id: 'curb-ca-sm-ocean-30120',
    onStreet: 'Ocean Avenue',
    fromStreet: 'Broadway',
    toStreet: 'Santa Monica Boulevard',
    borough: 'Santa Monica',
    sideOfStreet: 'W',
    coordinates: [
      [-118.4960, 34.0125],
      [-118.4970, 34.0135],
      [-118.4980, 34.0145],
    ],
    shapeLength: 270,
    meterInfo: {
      payByCell: '30120',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '3 Hours',
      allVehiclesHours: 'Monday-Sunday 9 AM-11 PM',
      allVehiclesRate: '$3.00 / Hour',
      allVehiclesMaxRate: '$9.00',
      meterRateZone: 'Santa Monica Beach Front',
    },
    signs: [
      {
        signCode: 'SM-PM-120',
        description: 'PARKMOBILE ZONE 30120 3 HOUR METER 9AM-11PM DAILY',
        arrowDirection: 'Both',
      },
    ],
  },

  // =========================================================================
  // 3. SAN FRANCISCO, CALIFORNIA (MARKET ST & MISSION DISTRICT)
  // Powered by PayByPhone & SFMTA
  // =========================================================================

  // Market St Corridor
  {
    id: 'curb-ca-sf-market-40101',
    onStreet: 'Market Street',
    fromStreet: '4th Street',
    toStreet: '5th Street',
    borough: 'San Francisco (Downtown)',
    sideOfStreet: 'S',
    coordinates: [
      [-122.4060, 37.7850],
      [-122.4080, 37.7838],
      [-122.4100, 37.7825],
    ],
    shapeLength: 290,
    meterInfo: {
      payByCell: '40101',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 9 AM-6 PM',
      allVehiclesRate: '$4.50 / Hour',
      allVehiclesMaxRate: '$9.00',
      meterRateZone: 'SFMTA Downtown Demand Zone',
    },
    signs: [
      {
        signCode: 'SF-PBP-101',
        description: 'PAYBYPHONE ZONE 40101 METER MON-SAT 9AM-6PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'SF-SS-101',
        description: 'STREET CLEANING TUESDAY 2AM-6AM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-ca-sf-mission-40102',
    onStreet: 'Mission Street',
    fromStreet: '16th Street',
    toStreet: '18th Street',
    borough: 'San Francisco (Mission)',
    sideOfStreet: 'W',
    coordinates: [
      [-122.4195, 37.7650],
      [-122.4190, 37.7630],
      [-122.4185, 37.7610],
    ],
    shapeLength: 320,
    meterInfo: {
      payByCell: '40102',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 9 AM-6 PM',
      allVehiclesRate: '$3.00 / Hour',
      allVehiclesMaxRate: '$6.00',
      meterRateZone: 'Mission Commercial Zone',
    },
    signs: [
      {
        signCode: 'SF-PBP-102',
        description: 'PAYBYPHONE ZONE 40102 METER MON-SAT 9AM-6PM',
        arrowDirection: 'Both',
      },
    ],
  },

  // =========================================================================
  // 4. AUSTIN & HOUSTON, TEXAS
  // Powered by ParkMobile & ParkHouston
  // =========================================================================

  // Congress Ave (Austin Downtown)
  {
    id: 'curb-tx-atx-congress-50101',
    onStreet: 'Congress Avenue',
    fromStreet: 'East 4th Street',
    toStreet: 'East 6th Street',
    borough: 'Austin (Downtown)',
    sideOfStreet: 'E',
    coordinates: [
      [-97.7431, 30.2660],
      [-97.7428, 30.2675],
      [-97.7425, 30.2690],
    ],
    shapeLength: 280,
    meterInfo: {
      payByCell: '50101',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '3 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-midnight',
      allVehiclesRate: '$2.00 / Hour',
      allVehiclesMaxRate: '$6.00',
      meterRateZone: 'Austin Core Commercial Zone',
    },
    signs: [
      {
        signCode: 'ATX-PM-101',
        description: 'PARKMOBILE ZONE 50101 METER MON-SAT 8AM-MIDNIGHT (SUNDAY FREE)',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-tx-atx-6th-50102',
    onStreet: 'East 6th Street',
    fromStreet: 'Congress Avenue',
    toStreet: 'Brazos Street',
    borough: 'Austin (Downtown)',
    sideOfStreet: 'S',
    coordinates: [
      [-97.7428, 30.2675],
      [-97.7410, 30.2673],
      [-97.7392, 30.2671],
    ],
    shapeLength: 260,
    signs: [
      {
        signCode: 'ATX-RE-101',
        description: 'NO PARKING THURS-SAT 9PM-3AM (PEDESTRIAN CORRIDOR)',
        arrowDirection: 'Both',
      },
    ],
  },

  // Main St (Houston Downtown)
  {
    id: 'curb-tx-hou-main-50201',
    onStreet: 'Main Street',
    fromStreet: 'Texas Avenue',
    toStreet: 'Capitol Street',
    borough: 'Houston (Downtown)',
    sideOfStreet: 'W',
    coordinates: [
      [-95.3645, 29.7595],
      [-95.3650, 29.7585],
      [-95.3655, 29.7575],
    ],
    shapeLength: 250,
    meterInfo: {
      payByCell: '50201',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 7 AM-6 PM',
      allVehiclesRate: '$2.50 / Hour',
      allVehiclesMaxRate: '$5.00',
      meterRateZone: 'ParkHouston Zone 1',
    },
    signs: [
      {
        signCode: 'HOU-PH-201',
        description: 'PARKHOUSTON ZONE 50201 METER MON-SAT 7AM-6PM',
        arrowDirection: 'Both',
      },
    ],
  },

  // =========================================================================
  // 5. MIAMI & MIAMI BEACH, FLORIDA
  // Powered by PayByPhone (Miami Parking Authority)
  // =========================================================================

  // Brickell Ave (Miami Financial District)
  {
    id: 'curb-fl-mia-brickell-60101',
    onStreet: 'Brickell Avenue',
    fromStreet: 'SE 8th Street',
    toStreet: 'SE 10th Street',
    borough: 'Miami (Brickell)',
    sideOfStreet: 'E',
    coordinates: [
      [-80.1910, 25.7640],
      [-80.1915, 25.7620],
      [-80.1920, 25.7600],
    ],
    shapeLength: 290,
    meterInfo: {
      payByCell: '60101',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '3 Hours',
      allVehiclesHours: 'Monday-Sunday 8 AM-midnight',
      allVehiclesRate: '$3.25 / Hour',
      allVehiclesMaxRate: '$9.75',
      meterRateZone: 'Brickell Commercial Zone',
    },
    signs: [
      {
        signCode: 'MIA-PBP-101',
        description: 'PAYBYPHONE ZONE 60101 METER 8AM-MIDNIGHT DAILY',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-fl-mb-ocean-60102',
    onStreet: 'Ocean Drive',
    fromStreet: '8th Street',
    toStreet: '11th Street',
    borough: 'Miami Beach',
    sideOfStreet: 'W',
    coordinates: [
      [-80.1300, 25.7780],
      [-80.1300, 25.7800],
      [-80.1300, 25.7820],
    ],
    shapeLength: 310,
    meterInfo: {
      payByCell: '60102',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '4 Hours',
      allVehiclesHours: 'Monday-Sunday 9 AM-3 AM',
      allVehiclesRate: '$4.00 / Hour',
      allVehiclesMaxRate: '$16.00',
      meterRateZone: 'South Beach Entertainment District',
    },
    signs: [
      {
        signCode: 'MB-PBP-102',
        description: 'PAYBYPHONE ZONE 60102 METER 9AM-3AM DAILY',
        arrowDirection: 'Both',
      },
    ],
  },

  // =========================================================================
  // 6. WASHINGTON, D.C. (PENN QUARTER & DUPONT CIRCLE)
  // Powered by ParkMobile & DDOT
  // =========================================================================

  {
    id: 'curb-dc-fstreet-70101',
    onStreet: 'F Street Northwest',
    fromStreet: '7th Street Northwest',
    toStreet: '9th Street Northwest',
    borough: 'Washington, D.C. (Penn Quarter)',
    sideOfStreet: 'N',
    coordinates: [
      [-77.0220, 38.8972],
      [-77.0240, 38.8972],
      [-77.0260, 38.8972],
    ],
    shapeLength: 260,
    meterInfo: {
      payByCell: '70101',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 7 AM-10 PM',
      allVehiclesRate: '$2.30 / Hour',
      allVehiclesMaxRate: '$4.60',
      meterRateZone: 'DDOT Premium Commercial Zone',
    },
    signs: [
      {
        signCode: 'DC-PM-101',
        description: 'PARKMOBILE ZONE 70101 2 HOUR METER MON-SAT 7AM-10PM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-dc-connave-70102',
    onStreet: 'Connecticut Avenue Northwest',
    fromStreet: 'Q Street Northwest',
    toStreet: 'R Street Northwest',
    borough: 'Washington, D.C. (Dupont Circle)',
    sideOfStreet: 'W',
    coordinates: [
      [-77.0435, 38.9110],
      [-77.0445, 38.9125],
      [-77.0455, 38.9140],
    ],
    shapeLength: 270,
    signs: [
      {
        signCode: 'DC-RPP-101',
        description: 'RESIDENTIAL PERMIT PARKING ZONE 2 2-HOUR LIMIT FOR NON-RESIDENTS MON-FRI 7AM-8:30PM',
        arrowDirection: 'Both',
      },
    ],
  },

  // =========================================================================
  // 7. BOSTON, MASSACHUSETTS (BACK BAY & DOWNTOWN)
  // Powered by Flowbird & BTD
  // =========================================================================

  {
    id: 'curb-ma-bos-boylston-80101',
    onStreet: 'Boylston Street',
    fromStreet: 'Dartmouth Street',
    toStreet: 'Clarendon Street',
    borough: 'Boston (Back Bay)',
    sideOfStreet: 'N',
    coordinates: [
      [-71.0770, 42.3500],
      [-71.0750, 42.3505],
      [-71.0730, 42.3510],
    ],
    shapeLength: 260,
    meterInfo: {
      payByCell: '80101',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-8 PM',
      allVehiclesRate: '$3.75 / Hour',
      allVehiclesMaxRate: '$7.50',
      meterRateZone: 'Back Bay Commercial',
    },
    signs: [
      {
        signCode: 'BOS-FB-101',
        description: 'PARKBOSTON / FLOWBIRD ZONE 80101 2 HOUR METER MON-SAT 8AM-8PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'BOS-SW-101',
        description: 'STREET CLEANING 1ST & 3RD THURSDAY 8AM-NOON',
        arrowDirection: 'Both',
      },
    ],
  },

  // =========================================================================
  // 8. SEATTLE, WASHINGTON (DOWNTOWN & CAPITOL HILL)
  // Powered by PayByPhone & SDOT
  // =========================================================================

  {
    id: 'curb-wa-sea-4th-90101',
    onStreet: '4th Avenue',
    fromStreet: 'Pike Street',
    toStreet: 'Pine Street',
    borough: 'Seattle (Downtown)',
    sideOfStreet: 'E',
    coordinates: [
      [-122.3370, 47.6105],
      [-122.3360, 47.6115],
      [-122.3350, 47.6125],
    ],
    shapeLength: 240,
    meterInfo: {
      payByCell: '90101',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-8 PM',
      allVehiclesRate: '$3.50 / Hour',
      allVehiclesMaxRate: '$7.00',
      meterRateZone: 'Downtown Commercial Core',
    },
    signs: [
      {
        signCode: 'SEA-PBP-101',
        description: 'PAYBYPHONE ZONE 90101 2 HOUR METER MON-SAT 8AM-8PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'SEA-72-101',
        description: '72 HOUR MAXIMUM CONTINUOUS PARKING LIMIT (SDOT)',
        arrowDirection: 'Both',
      },
    ],
  },

  // =========================================================================
  // 9. PHILADELPHIA, PENNSYLVANIA (CENTER CITY)
  // Powered by ParkMobile & PPA
  // =========================================================================

  {
    id: 'curb-pa-phl-market-95101',
    onStreet: 'Market Street',
    fromStreet: '15th Street',
    toStreet: '17th Street',
    borough: 'Philadelphia (Center City)',
    sideOfStreet: 'S',
    coordinates: [
      [-75.1660, 39.9525],
      [-75.1680, 39.9528],
      [-75.1700, 39.9531],
    ],
    shapeLength: 270,
    meterInfo: {
      payByCell: '95101',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-10 PM',
      allVehiclesRate: '$3.50 / Hour',
      allVehiclesMaxRate: '$7.00',
      meterRateZone: 'Center City Core Zone',
    },
    signs: [
      {
        signCode: 'PHL-PM-101',
        description: 'METERUP / PARKMOBILE ZONE 95101 2 HOUR METER MON-SAT 8AM-10PM',
        arrowDirection: 'Both',
      },
    ],
  },

  // =========================================================================
  // 10. DENVER, COLORADO (DOWNTOWN / LODO)
  // Powered by ParkMobile & City of Denver
  // =========================================================================

  {
    id: 'curb-co-den-blake-98101',
    onStreet: 'Blake Street',
    fromStreet: '16th Street',
    toStreet: '18th Street',
    borough: 'Denver (LoDo)',
    sideOfStreet: 'W',
    coordinates: [
      [-104.9970, 39.7525],
      [-104.9950, 39.7540],
      [-104.9930, 39.7555],
    ],
    shapeLength: 280,
    meterInfo: {
      payByCell: '98101',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-10 PM',
      allVehiclesRate: '$2.00 / Hour',
      allVehiclesMaxRate: '$4.00',
      meterRateZone: 'LoDo Entertainment District',
    },
    signs: [
      {
        signCode: 'DEN-PM-101',
        description: 'PARKMOBILE ZONE 98101 2 HOUR METER MON-SAT 8AM-10PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'DEN-SS-101',
        description: 'STREET SWEEPING 1ST TUESDAY 8AM-11AM (APRIL - NOV)',
        arrowDirection: 'Both',
      },
    ],
  },
];
