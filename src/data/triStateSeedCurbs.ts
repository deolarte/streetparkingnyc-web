import type { RawCurbSegment } from '../types';
import { JERSEY_CITY_OPEN_DATA_CURBS } from './jerseyCityOpenDataCurbs';
import { NJ_CURBS_EXPANDED } from './njCurbsExpanded';
import { CT_CURBS_EXPANDED } from './ctCurbsExpanded';

/**
 * High-fidelity seed parking corridors for Northern New Jersey
 * Combining official Jersey City Open Data (60 segments) with
 * complete street grids across Jersey City, Hoboken, Newark, and Weehawken.
 */
export const SEED_NJ_CURBS: RawCurbSegment[] = [
  ...JERSEY_CITY_OPEN_DATA_CURBS,
  ...NJ_CURBS_EXPANDED,
  // ==========================================
  // JERSEY CITY - DOWNTOWN & NEWARK AVE CORRIDOR
  // ==========================================
  {
    id: 'curb-nj-jc-newark-20101',
    onStreet: 'Newark Avenue',
    fromStreet: 'Grove Street',
    toStreet: 'Barrow Street',
    borough: 'Jersey City',
    sideOfStreet: 'S',
    coordinates: [
      [-74.0431, 40.7198],
      [-74.0442, 40.7206],
      [-74.0453, 40.7214],
    ],
    shapeLength: 260,
    meterInfo: {
      payByCell: '20101',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 9 AM-9 PM',
      allVehiclesRate: '$2.00 / Hour',
      allVehiclesMaxRate: '$4.00',
      meterRateZone: 'JC Zone 1 (Downtown Retail)',
    },
    signs: [
      {
        signCode: 'NJ-PM-201',
        description: 'PARKMOBILE ZONE 20101 2 HOUR METER MON-SAT 9AM-9PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'NJ-SC-101',
        description: 'STREET CLEANING TUESDAY FRIDAY 8AM-10AM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-nj-jc-newark-20102',
    onStreet: 'Newark Avenue',
    fromStreet: 'Barrow Street',
    toStreet: 'Jersey Avenue',
    borough: 'Jersey City',
    sideOfStreet: 'N',
    coordinates: [
      [-74.0453, 40.7214],
      [-74.0465, 40.7222],
      [-74.0478, 40.7231],
    ],
    shapeLength: 280,
    meterInfo: {
      payByCell: '20101',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 9 AM-9 PM',
      allVehiclesRate: '$2.00 / Hour',
      allVehiclesMaxRate: '$4.00',
      meterRateZone: 'JC Zone 1 (Downtown Retail)',
    },
    signs: [
      {
        signCode: 'NJ-PM-201',
        description: 'PARKMOBILE ZONE 20101 2 HOUR METER MON-SAT 9AM-9PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'NJ-SC-102',
        description: 'STREET CLEANING MONDAY THURSDAY 8AM-10AM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-nj-jc-grove-20103',
    onStreet: 'Grove Street',
    fromStreet: 'Christopher Columbus Drive',
    toStreet: 'Newark Avenue',
    borough: 'Jersey City',
    sideOfStreet: 'E',
    coordinates: [
      [-74.0418, 40.7185],
      [-74.0424, 40.7192],
      [-74.0431, 40.7198],
    ],
    shapeLength: 195,
    meterInfo: {
      payByCell: '20102',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 9 AM-9 PM',
      allVehiclesRate: '$2.50 / Hour',
      allVehiclesMaxRate: '$5.00',
      meterRateZone: 'JC PATH Commuter Core',
    },
    signs: [
      {
        signCode: 'NJ-PM-202',
        description: 'PARKMOBILE ZONE 20102 2 HOUR METER MON-SAT 9AM-9PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'NJ-SC-103',
        description: 'STREET CLEANING MONDAY THURSDAY 10AM-12PM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-nj-jc-columbus-20104',
    onStreet: 'Christopher Columbus Drive',
    fromStreet: 'Greene Street',
    toStreet: 'Warren Street',
    borough: 'Jersey City',
    sideOfStreet: 'N',
    coordinates: [
      [-74.0345, 40.7166],
      [-74.0368, 40.7171],
      [-74.0390, 40.7177],
    ],
    shapeLength: 390,
    meterInfo: {
      payByCell: '20104',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '4 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-8 PM',
      allVehiclesRate: '$2.00 / Hour',
      allVehiclesMaxRate: '$8.00',
      meterRateZone: 'JC Financial District',
    },
    signs: [
      {
        signCode: 'NJ-PM-204',
        description: 'PARKMOBILE ZONE 20104 4 HOUR METER MON-SAT 8AM-8PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'NJ-SC-104',
        description: 'STREET CLEANING TUESDAY FRIDAY 9AM-11AM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-nj-jc-columbus-20105',
    onStreet: 'Christopher Columbus Drive',
    fromStreet: 'Warren Street',
    toStreet: 'Grove Street',
    borough: 'Jersey City',
    sideOfStreet: 'S',
    coordinates: [
      [-74.0390, 40.7177],
      [-74.0405, 40.7181],
      [-74.0418, 40.7185],
    ],
    shapeLength: 240,
    meterInfo: {
      payByCell: '20104',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 9 AM-9 PM',
      allVehiclesRate: '$2.00 / Hour',
      allVehiclesMaxRate: '$4.00',
      meterRateZone: 'JC Zone 1 (Downtown)',
    },
    signs: [
      {
        signCode: 'NJ-PM-205',
        description: 'PARKMOBILE ZONE 20104 2 HOUR METER MON-SAT 9AM-9PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'NJ-SC-105',
        description: 'STREET CLEANING MONDAY THURSDAY 9AM-11AM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-nj-jc-washington-20106',
    onStreet: 'Washington Boulevard',
    fromStreet: '2nd Street',
    toStreet: '6th Street',
    borough: 'Jersey City',
    sideOfStreet: 'E',
    coordinates: [
      [-74.0375, 40.7230],
      [-74.0376, 40.7255],
      [-74.0378, 40.7285],
    ],
    shapeLength: 610,
    meterInfo: {
      payByCell: '20106',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '4 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-6 PM',
      allVehiclesRate: '$2.50 / Hour',
      allVehiclesMaxRate: '$10.00',
      meterRateZone: 'Newport Waterfront',
    },
    signs: [
      {
        signCode: 'NJ-PM-206',
        description: 'PARKMOBILE ZONE 20106 4 HOUR METER MON-SAT 8AM-6PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'NJ-SC-106',
        description: 'STREET CLEANING TUESDAY 8AM-10AM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-nj-jc-montgomery-20107',
    onStreet: 'Montgomery Street',
    fromStreet: 'Greene Street',
    toStreet: 'Washington Street',
    borough: 'Jersey City',
    sideOfStreet: 'N',
    coordinates: [
      [-74.0340, 40.7160],
      [-74.0355, 40.7162],
      [-74.0370, 40.7165],
    ],
    shapeLength: 260,
    signs: [
      {
        signCode: 'NJ-RPP-101',
        description: 'PERMIT PARKING ONLY ZONE 1 2-HOUR NON-RESIDENT LIMIT MON-FRI 8AM-6PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'NJ-SC-107',
        description: 'STREET CLEANING WEDNESDAY 10AM-12PM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-nj-jc-grand-20108',
    onStreet: 'Grand Street',
    fromStreet: 'Grove Street',
    toStreet: 'Jersey Avenue',
    borough: 'Jersey City',
    sideOfStreet: 'S',
    coordinates: [
      [-74.0425, 40.7145],
      [-74.0450, 40.7147],
      [-74.0475, 40.7149],
    ],
    shapeLength: 420,
    signs: [
      {
        signCode: 'NJ-FREE-01',
        description: 'LEGAL PUBLIC STREET PARKING EXCEPT POSTED CLEANING',
        arrowDirection: 'Both',
      },
      {
        signCode: 'NJ-SC-108',
        description: 'STREET CLEANING MONDAY THURSDAY 1PM-3PM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-nj-jc-journalsq-20109',
    onStreet: 'Bergen Avenue',
    fromStreet: 'Sip Avenue',
    toStreet: 'Academy Street',
    borough: 'Jersey City',
    sideOfStreet: 'W',
    coordinates: [
      [-74.0665, 40.7302],
      [-74.0645, 40.7320],
      [-74.0628, 40.7338],
    ],
    shapeLength: 430,
    meterInfo: {
      payByCell: '20109',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-6 PM',
      allVehiclesRate: '$1.50 / Hour',
      allVehiclesMaxRate: '$3.00',
      meterRateZone: 'Journal Square Hub',
    },
    signs: [
      {
        signCode: 'NJ-PM-209',
        description: 'PARKMOBILE ZONE 20109 2 HOUR METER MON-SAT 8AM-6PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'NJ-SC-109',
        description: 'STREET CLEANING TUESDAY FRIDAY 8AM-10AM',
        arrowDirection: 'Both',
      },
    ],
  },

  // ==========================================
  // HOBOKEN - WASHINGTON STREET & WATERFRONT
  // ==========================================
  {
    id: 'curb-nj-hb-washington-20301',
    onStreet: 'Washington Street',
    fromStreet: '1st Street',
    toStreet: '3rd Street',
    borough: 'Hoboken',
    sideOfStreet: 'E',
    coordinates: [
      [-74.0315, 40.7375],
      [-74.0311, 40.7390],
      [-74.0308, 40.7405],
    ],
    shapeLength: 330,
    meterInfo: {
      payByCell: '20301',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 9 AM-9 PM',
      allVehiclesRate: '$2.00 / Hour',
      allVehiclesMaxRate: '$4.00',
      meterRateZone: 'Hoboken Business District (South)',
    },
    signs: [
      {
        signCode: 'HB-PM-301',
        description: 'PARKMOBILE ZONE 20301 2 HOUR METER MON-SAT 9AM-9PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'HB-SC-201',
        description: 'STREET CLEANING TUESDAY FRIDAY 9AM-10:30AM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'HB-NS-01',
        description: 'NO STOPPING OR STANDING WITHIN 25 FT OF CROSSWALK',
        arrowDirection: 'None',
      },
    ],
  },
  {
    id: 'curb-nj-hb-washington-20302',
    onStreet: 'Washington Street',
    fromStreet: '4th Street',
    toStreet: '6th Street',
    borough: 'Hoboken',
    sideOfStreet: 'W',
    coordinates: [
      [-74.0308, 40.7405],
      [-74.0303, 40.7425],
      [-74.0298, 40.7445],
    ],
    shapeLength: 440,
    meterInfo: {
      payByCell: '20302',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 9 AM-9 PM',
      allVehiclesRate: '$2.00 / Hour',
      allVehiclesMaxRate: '$4.00',
      meterRateZone: 'Hoboken Mid-Washington',
    },
    signs: [
      {
        signCode: 'HB-PM-302',
        description: 'PARKMOBILE ZONE 20302 2 HOUR METER MON-SAT 9AM-9PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'HB-SC-202',
        description: 'STREET CLEANING MONDAY THURSDAY 9AM-10:30AM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-nj-hb-washington-20303',
    onStreet: 'Washington Street',
    fromStreet: '7th Street',
    toStreet: '10th Street',
    borough: 'Hoboken',
    sideOfStreet: 'E',
    coordinates: [
      [-74.0298, 40.7445],
      [-74.0294, 40.7460],
      [-74.0290, 40.7475],
    ],
    shapeLength: 330,
    meterInfo: {
      payByCell: '20303',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 9 AM-9 PM',
      allVehiclesRate: '$2.00 / Hour',
      allVehiclesMaxRate: '$4.00',
      meterRateZone: 'Hoboken Business District (North)',
    },
    signs: [
      {
        signCode: 'HB-PM-303',
        description: 'PARKMOBILE ZONE 20303 2 HOUR METER MON-SAT 9AM-9PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'HB-SC-203',
        description: 'STREET CLEANING TUESDAY FRIDAY 9AM-10:30AM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-nj-hb-washington-20304',
    onStreet: 'Washington Street',
    fromStreet: '11th Street',
    toStreet: '14th Street',
    borough: 'Hoboken',
    sideOfStreet: 'W',
    coordinates: [
      [-74.0290, 40.7475],
      [-74.0286, 40.7490],
      [-74.0282, 40.7505],
    ],
    shapeLength: 330,
    meterInfo: {
      payByCell: '20304',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 9 AM-9 PM',
      allVehiclesRate: '$2.00 / Hour',
      allVehiclesMaxRate: '$4.00',
      meterRateZone: 'Uptown Hoboken Retail',
    },
    signs: [
      {
        signCode: 'HB-PM-304',
        description: 'PARKMOBILE ZONE 20304 2 HOUR METER MON-SAT 9AM-9PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'HB-SC-204',
        description: 'STREET CLEANING MONDAY THURSDAY 9AM-10:30AM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-nj-hb-hudson-20305',
    onStreet: 'Hudson Street',
    fromStreet: '1st Street',
    toStreet: '4th Street',
    borough: 'Hoboken',
    sideOfStreet: 'W',
    coordinates: [
      [-74.0295, 40.7375],
      [-74.0291, 40.7395],
      [-74.0288, 40.7415],
    ],
    shapeLength: 440,
    signs: [
      {
        signCode: 'HB-RPP-01',
        description: 'RESIDENTIAL PERMIT PARKING ONLY 4-HOUR VISITOR LIMIT MON-FRI 8AM-9PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'HB-SC-205',
        description: 'STREET CLEANING WEDNESDAY 8AM-9:30AM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-nj-hb-sinatra-20306',
    onStreet: 'Sinatra Drive',
    fromStreet: 'Newark Street',
    toStreet: '4th Street',
    borough: 'Hoboken',
    sideOfStreet: 'E',
    coordinates: [
      [-74.0282, 40.7360],
      [-74.0275, 40.7385],
      [-74.0268, 40.7410],
    ],
    shapeLength: 560,
    meterInfo: {
      payByCell: '20306',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '4 Hours',
      allVehiclesHours: 'Monday-Sunday 8 AM-11 PM',
      allVehiclesRate: '$3.00 / Hour',
      allVehiclesMaxRate: '$12.00',
      meterRateZone: 'Hoboken Waterfront Promenade',
    },
    signs: [
      {
        signCode: 'HB-PM-306',
        description: 'PARKMOBILE ZONE 20306 4 HOUR METER MON-SUN 8AM-11PM',
        arrowDirection: 'Both',
      },
    ],
  },

  // ==========================================
  // NEWARK - DOWNTOWN & IRONBOUND DISTRICT
  // ==========================================
  {
    id: 'curb-nj-nwk-broad-20201',
    onStreet: 'Broad Street',
    fromStreet: 'Market Street',
    toStreet: 'Raymond Boulevard',
    borough: 'Newark',
    sideOfStreet: 'E',
    coordinates: [
      [-74.1718, 40.7355],
      [-74.1712, 40.7365],
      [-74.1705, 40.7375],
    ],
    shapeLength: 230,
    meterInfo: {
      payByCell: '20201',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 9 AM-6 PM',
      allVehiclesRate: '$2.00 / Hour',
      allVehiclesMaxRate: '$4.00',
      meterRateZone: 'Newark Downtown Core',
    },
    signs: [
      {
        signCode: 'NWK-PM-201',
        description: 'PARKMOBILE ZONE 20201 2 HOUR METER MON-SAT 9AM-6PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'NWK-SC-101',
        description: 'STREET CLEANING MONDAY THURSDAY 6AM-8AM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'NWK-NS-01',
        description: 'NO STANDING 7AM-9AM 4PM-6PM MON-FRI',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-nj-nwk-market-20202',
    onStreet: 'Market Street',
    fromStreet: 'Broad Street',
    toStreet: 'Mulberry Street',
    borough: 'Newark',
    sideOfStreet: 'S',
    coordinates: [
      [-74.1718, 40.7355],
      [-74.1702, 40.7356],
      [-74.1685, 40.7358],
    ],
    shapeLength: 280,
    meterInfo: {
      payByCell: '20202',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 9 AM-6 PM',
      allVehiclesRate: '$2.00 / Hour',
      allVehiclesMaxRate: '$4.00',
      meterRateZone: 'Prudential Center Commercial',
    },
    signs: [
      {
        signCode: 'NWK-PM-202',
        description: 'PARKMOBILE ZONE 20202 2 HOUR METER MON-SAT 9AM-6PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'NWK-SC-102',
        description: 'STREET CLEANING TUESDAY FRIDAY 6AM-8AM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-nj-nwk-ferry-20210',
    onStreet: 'Ferry Street',
    fromStreet: 'Market Street',
    toStreet: 'Adams Street',
    borough: 'Newark',
    sideOfStreet: 'N',
    coordinates: [
      [-74.1640, 40.7345],
      [-74.1615, 40.7340],
      [-74.1590, 40.7335],
    ],
    shapeLength: 430,
    meterInfo: {
      payByCell: '20210',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 9 AM-7 PM',
      allVehiclesRate: '$1.50 / Hour',
      allVehiclesMaxRate: '$3.00',
      meterRateZone: 'Ironbound Culinary District',
    },
    signs: [
      {
        signCode: 'NWK-PM-210',
        description: 'PARKMOBILE ZONE 20210 2 HOUR METER MON-SAT 9AM-7PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'NWK-SC-103',
        description: 'STREET CLEANING WEDNESDAY 7AM-9AM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-nj-nwk-ferry-20211',
    onStreet: 'Ferry Street',
    fromStreet: 'Adams Street',
    toStreet: 'Wilson Avenue',
    borough: 'Newark',
    sideOfStreet: 'S',
    coordinates: [
      [-74.1590, 40.7335],
      [-74.1555, 40.7325],
      [-74.1520, 40.7315],
    ],
    shapeLength: 610,
    signs: [
      {
        signCode: 'NWK-FREE-01',
        description: 'LEGAL PUBLIC STREET PARKING EXCEPT POSTED CLEANING',
        arrowDirection: 'Both',
      },
      {
        signCode: 'NWK-SC-104',
        description: 'STREET CLEANING THURSDAY 7AM-9AM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-nj-whk-imperial-20401',
    onStreet: 'Port Imperial Boulevard',
    fromStreet: 'Pershing Road',
    toStreet: 'Ferry Landing',
    borough: 'Weehawken',
    sideOfStreet: 'E',
    coordinates: [
      [-74.0165, 40.7725],
      [-74.0150, 40.7745],
      [-74.0135, 40.7765],
    ],
    shapeLength: 500,
    meterInfo: {
      payByCell: '20401',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '4 Hours',
      allVehiclesHours: 'Monday-Sunday 7 AM-10 PM',
      allVehiclesRate: '$3.00 / Hour',
      allVehiclesMaxRate: '$12.00',
      meterRateZone: 'Weehawken Ferry Hub',
    },
    signs: [
      {
        signCode: 'WHK-PM-401',
        description: 'PARKMOBILE ZONE 20401 4 HOUR METER MON-SUN 7AM-10PM',
        arrowDirection: 'Both',
      },
    ],
  },
];

/**
 * High-fidelity seed parking corridors for Southwestern Connecticut
 * Covering Stamford, South Norwalk (SoNo), Greenwich, and Darien.
 */
export const SEED_CT_CURBS: RawCurbSegment[] = [
  ...CT_CURBS_EXPANDED,
  // ==========================================
  // DOWNTOWN STAMFORD - BEDFORD ST RESTAURANT ROW & CENTER
  // ==========================================
  {
    id: 'curb-ct-stm-bedford-30101',
    onStreet: 'Bedford Street',
    fromStreet: 'Broad Street',
    toStreet: 'Spring Street',
    borough: 'Stamford',
    sideOfStreet: 'W',
    coordinates: [
      [-73.5390, 41.0545],
      [-73.5387, 41.0558],
      [-73.5385, 41.0570],
    ],
    shapeLength: 280,
    meterInfo: {
      payByCell: '2031',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-7 PM',
      allVehiclesRate: '$1.50 / Hour',
      allVehiclesMaxRate: '$3.00',
      meterRateZone: 'Passport Zone 2031 (Bedford Restaurant Row)',
    },
    signs: [
      {
        signCode: 'CT-PS-301',
        description: 'PASSPORT PARKING ZONE 2031 2 HOUR METER MON-SAT 8AM-7PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'CT-SC-301',
        description: 'STREET CLEANING WEDNESDAY 7AM-9AM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'CT-CW-01',
        description: 'NO PARKING WITHIN 25 FEET OF CROSSWALK (CT TITLE 14-251)',
        arrowDirection: 'None',
      },
    ],
  },
  {
    id: 'curb-ct-stm-bedford-30102',
    onStreet: 'Bedford Street',
    fromStreet: 'Spring Street',
    toStreet: 'Forest Street',
    borough: 'Stamford',
    sideOfStreet: 'E',
    coordinates: [
      [-73.5385, 41.0570],
      [-73.5382, 41.0585],
      [-73.5380, 41.0600],
    ],
    shapeLength: 330,
    meterInfo: {
      payByCell: '2031',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-7 PM',
      allVehiclesRate: '$1.50 / Hour',
      allVehiclesMaxRate: '$3.00',
      meterRateZone: 'Passport Zone 2031 (Bedford North)',
    },
    signs: [
      {
        signCode: 'CT-PS-302',
        description: 'PASSPORT PARKING ZONE 2031 2 HOUR METER MON-SAT 8AM-7PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'CT-SC-302',
        description: 'STREET CLEANING THURSDAY 7AM-9AM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-ct-stm-summer-30103',
    onStreet: 'Summer Street',
    fromStreet: 'Main Street',
    toStreet: 'Broad Street',
    borough: 'Stamford',
    sideOfStreet: 'W',
    coordinates: [
      [-73.5410, 41.0525],
      [-73.5408, 41.0538],
      [-73.5405, 41.0550],
    ],
    shapeLength: 280,
    meterInfo: {
      payByCell: '2032',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-7 PM',
      allVehiclesRate: '$1.50 / Hour',
      allVehiclesMaxRate: '$3.00',
      meterRateZone: 'Passport Zone 2032 (Summer Retail)',
    },
    signs: [
      {
        signCode: 'CT-PS-303',
        description: 'PASSPORT PARKING ZONE 2032 2 HOUR METER MON-SAT 8AM-7PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'CT-SC-303',
        description: 'STREET CLEANING TUESDAY 7AM-9AM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-ct-stm-atlantic-30104',
    onStreet: 'Atlantic Street',
    fromStreet: 'Tresser Boulevard',
    toStreet: 'Main Street',
    borough: 'Stamford',
    sideOfStreet: 'E',
    coordinates: [
      [-73.5395, 41.0495],
      [-73.5393, 41.0510],
      [-73.5392, 41.0525],
    ],
    shapeLength: 330,
    meterInfo: {
      payByCell: '2033',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-7 PM',
      allVehiclesRate: '$1.75 / Hour',
      allVehiclesMaxRate: '$3.50',
      meterRateZone: 'Passport Zone 2033 (Old Town Hall)',
    },
    signs: [
      {
        signCode: 'CT-PS-304',
        description: 'PASSPORT PARKING ZONE 2033 2 HOUR METER MON-SAT 8AM-7PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'CT-SC-304',
        description: 'STREET CLEANING FRIDAY 7AM-9AM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-ct-stm-washington-30105',
    onStreet: 'Washington Boulevard',
    fromStreet: 'Station Place',
    toStreet: 'Tresser Boulevard',
    borough: 'Stamford',
    sideOfStreet: 'W',
    coordinates: [
      [-73.5420, 41.0465],
      [-73.5422, 41.0485],
      [-73.5425, 41.0510],
    ],
    shapeLength: 500,
    meterInfo: {
      payByCell: '2035',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '4 Hours',
      allVehiclesHours: 'Monday-Sunday 6 AM-10 PM',
      allVehiclesRate: '$2.00 / Hour',
      allVehiclesMaxRate: '$8.00',
      meterRateZone: 'Metro-North Station Commuter Zone',
    },
    signs: [
      {
        signCode: 'CT-PS-305',
        description: 'PASSPORT PARKING ZONE 2035 4 HOUR METER MON-SUN 6AM-10PM',
        arrowDirection: 'Both',
      },
    ],
  },

  // ==========================================
  // SOUTH NORWALK (SONO) - HISTORIC & DINING DISTRICT
  // ==========================================
  {
    id: 'curb-ct-nor-washington-30201',
    onStreet: 'Washington Street',
    fromStreet: 'North Main Street',
    toStreet: 'Water Street',
    borough: 'Norwalk',
    sideOfStreet: 'N',
    coordinates: [
      [-73.4215, 41.0990],
      [-73.4190, 41.0982],
      [-73.4170, 41.0975],
    ],
    shapeLength: 400,
    meterInfo: {
      payByCell: '2041',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 9 AM-9 PM',
      allVehiclesRate: '$1.50 / Hour',
      allVehiclesMaxRate: '$3.00',
      meterRateZone: 'Passport Zone 2041 (SoNo Historic Strip)',
    },
    signs: [
      {
        signCode: 'NOR-PS-201',
        description: 'PASSPORT PARKING ZONE 2041 2 HOUR METER MON-SAT 9AM-9PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'NOR-SC-101',
        description: 'STREET CLEANING TUESDAY 7AM-9AM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-ct-nor-water-30202',
    onStreet: 'Water Street',
    fromStreet: 'Washington Street',
    toStreet: 'Haviland Street',
    borough: 'Norwalk',
    sideOfStreet: 'E',
    coordinates: [
      [-73.4170, 41.0975],
      [-73.4165, 41.0962],
      [-73.4160, 41.0950],
    ],
    shapeLength: 280,
    meterInfo: {
      payByCell: '2042',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '3 Hours',
      allVehiclesHours: 'Monday-Sunday 8 AM-8 PM',
      allVehiclesRate: '$1.25 / Hour',
      allVehiclesMaxRate: '$3.75',
      meterRateZone: 'Maritime Aquarium Harbor',
    },
    signs: [
      {
        signCode: 'NOR-PS-202',
        description: 'PASSPORT PARKING ZONE 2042 3 HOUR METER MON-SUN 8AM-8PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'NOR-SC-102',
        description: 'STREET CLEANING THURSDAY 7AM-9AM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-ct-nor-main-30203',
    onStreet: 'North Main Street',
    fromStreet: 'Washington Street',
    toStreet: 'Marshall Street',
    borough: 'Norwalk',
    sideOfStreet: 'W',
    coordinates: [
      [-73.4215, 41.0990],
      [-73.4212, 41.1005],
      [-73.4210, 41.1020],
    ],
    shapeLength: 330,
    signs: [
      {
        signCode: 'NOR-FREE-01',
        description: 'LEGAL PUBLIC STREET PARKING EXCEPT POSTED CLEANING',
        arrowDirection: 'Both',
      },
      {
        signCode: 'NOR-SC-103',
        description: 'STREET CLEANING WEDNESDAY 8AM-10AM',
        arrowDirection: 'Both',
      },
    ],
  },

  // ==========================================
  // GREENWICH - GREENWICH AVENUE & COMMUTER
  // ==========================================
  {
    id: 'curb-ct-grw-avenue-30301',
    onStreet: 'Greenwich Avenue',
    fromStreet: 'Railroad Avenue',
    toStreet: 'Havemeyer Place',
    borough: 'Greenwich',
    sideOfStreet: 'W',
    coordinates: [
      [-73.6255, 41.0210],
      [-73.6260, 41.0230],
      [-73.6265, 41.0250],
    ],
    shapeLength: 450,
    meterInfo: {
      payByCell: '2051',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 9 AM-5 PM',
      allVehiclesRate: '$1.00 / Hour',
      allVehiclesMaxRate: '$2.00',
      meterRateZone: 'Lower Greenwich Avenue',
    },
    signs: [
      {
        signCode: 'GRW-MT-301',
        description: '2 HOUR METER PARKING MONDAY-SATURDAY 9AM-5PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'GRW-SC-101',
        description: 'STREET CLEANING MONDAY 6AM-8AM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-ct-grw-avenue-30302',
    onStreet: 'Greenwich Avenue',
    fromStreet: 'Havemeyer Place',
    toStreet: 'Lewis Street',
    borough: 'Greenwich',
    sideOfStreet: 'E',
    coordinates: [
      [-73.6265, 41.0250],
      [-73.6268, 41.0268],
      [-73.6272, 41.0285],
    ],
    shapeLength: 390,
    meterInfo: {
      payByCell: '2052',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 9 AM-5 PM',
      allVehiclesRate: '$1.00 / Hour',
      allVehiclesMaxRate: '$2.00',
      meterRateZone: 'Mid Greenwich Avenue Retail',
    },
    signs: [
      {
        signCode: 'GRW-MT-302',
        description: '2 HOUR METER PARKING MONDAY-SATURDAY 9AM-5PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'GRW-SC-102',
        description: 'STREET CLEANING TUESDAY 6AM-8AM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-ct-grw-avenue-30303',
    onStreet: 'Greenwich Avenue',
    fromStreet: 'Lewis Street',
    toStreet: 'West Putnam Avenue',
    borough: 'Greenwich',
    sideOfStreet: 'W',
    coordinates: [
      [-73.6272, 41.0285],
      [-73.6276, 41.0302],
      [-73.6280, 41.0320],
    ],
    shapeLength: 390,
    meterInfo: {
      payByCell: '2053',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '2 Hours',
      allVehiclesHours: 'Monday-Saturday 9 AM-5 PM',
      allVehiclesRate: '$1.00 / Hour',
      allVehiclesMaxRate: '$2.00',
      meterRateZone: 'Upper Greenwich Avenue',
    },
    signs: [
      {
        signCode: 'GRW-MT-303',
        description: '2 HOUR METER PARKING MONDAY-SATURDAY 9AM-5PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'GRW-SC-103',
        description: 'STREET CLEANING WEDNESDAY 6AM-8AM',
        arrowDirection: 'Both',
      },
    ],
  },
  {
    id: 'curb-ct-grw-railroad-30304',
    onStreet: 'Railroad Avenue',
    fromStreet: 'Field Point Road',
    toStreet: 'Greenwich Avenue',
    borough: 'Greenwich',
    sideOfStreet: 'N',
    coordinates: [
      [-73.6280, 41.0200],
      [-73.6268, 41.0205],
      [-73.6255, 41.0210],
    ],
    shapeLength: 260,
    meterInfo: {
      payByCell: '2055',
      vehicleType: 'All Vehicles',
      allVehiclesDuration: '4 Hours',
      allVehiclesHours: 'Monday-Saturday 8 AM-6 PM',
      allVehiclesRate: '$1.50 / Hour',
      allVehiclesMaxRate: '$6.00',
      meterRateZone: 'Greenwich Metro-North Commuter',
    },
    signs: [
      {
        signCode: 'GRW-MT-304',
        description: '4 HOUR METER PARKING MONDAY-SATURDAY 8AM-6PM',
        arrowDirection: 'Both',
      },
    ],
  },

  // ==========================================
  // DARIEN - TOWN CENTER & METRO-NORTH
  // ==========================================
  {
    id: 'curb-ct-dar-postroad-30401',
    onStreet: 'Boston Post Road',
    fromStreet: 'Center Street',
    toStreet: 'Mansfield Avenue',
    borough: 'Darien',
    sideOfStreet: 'S',
    coordinates: [
      [-73.4715, 41.0768],
      [-73.4690, 41.0780],
      [-73.4665, 41.0792],
    ],
    shapeLength: 460,
    signs: [
      {
        signCode: 'DAR-FREE-01',
        description: '2 HOUR FREE PARKING MON-SAT 8AM-6PM',
        arrowDirection: 'Both',
      },
      {
        signCode: 'DAR-SC-101',
        description: 'STREET CLEANING THURSDAY 6AM-8AM',
        arrowDirection: 'Both',
      },
    ],
  },
];
