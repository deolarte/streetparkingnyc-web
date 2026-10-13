import { PAYMENT_APPS, type MobilePaymentApp } from './paymentApps';

export interface JurisdictionRules {
  hydrantDistanceFt: number;
  crosswalkDistanceFt: number;
  stopSignDistanceFt: number;
  curbDistanceInches: number;
  wheelCrampingMandatory: boolean;
  maxContinuousHours: number; // e.g. 72 hours default street storage
  doubleParkingPermitted: boolean;
  meterGracePeriodMin: number;
  streetCleaningTerm: string;
  residentPermitTerm: string;
  statutoryReference: string;
  specialQuirks: string[];
  disputeAgency: string;
  disputeUrl: string;
}

export interface CityProfile {
  cityId: string;
  cityName: string;
  stateCode: string;
  center: [number, number]; // [lng, lat]
  zoom: number;
  primaryApp: MobilePaymentApp;
  secondaryApps: MobilePaymentApp[];
  rules: JurisdictionRules;
  openDataEndpoint?: string;
}

export interface StateProfile {
  stateCode: string;
  stateName: string;
  defaultCenter: [number, number];
  defaultZoom: number;
  defaultRules: JurisdictionRules;
  dominantApps: MobilePaymentApp[];
  cities: Record<string, CityProfile>;
}

// ---------------------------------------------------------
// 1. Universal US Baseline Statutory Parking Rules
// ---------------------------------------------------------
export const DEFAULT_US_RULES: JurisdictionRules = {
  hydrantDistanceFt: 15,
  crosswalkDistanceFt: 20,
  stopSignDistanceFt: 30,
  curbDistanceInches: 12,
  wheelCrampingMandatory: false,
  maxContinuousHours: 72,
  doubleParkingPermitted: false,
  meterGracePeriodMin: 0,
  streetCleaningTerm: 'Street Sweeping',
  residentPermitTerm: 'Residential Permit Parking (RPP)',
  statutoryReference: 'Uniform Vehicle Code (UVC § 11-1003)',
  specialQuirks: [
    'Always park in the direction of traffic flow with passenger wheels within 12–18 inches of the curb.',
    'Do not park within 20 feet of a crosswalk at an intersection or 30 feet of any stop sign, yield sign, or traffic control signal.',
    'Never park on bicycle paths, sidewalks, or across dropped curb pedestrian curb cuts.',
  ],
  disputeAgency: 'Local Municipal Court / Traffic Bureau',
  disputeUrl: 'https://www.google.com/search?q=dispute+parking+ticket',
};

// ---------------------------------------------------------
// 2. Pre-Seeded States & Major Metropolitan Profiles
// ---------------------------------------------------------
export const STATE_REGISTRY: Record<string, StateProfile> = {
  NY: {
    stateCode: 'NY',
    stateName: 'New York',
    defaultCenter: [-73.9851, 40.7484],
    defaultZoom: 12,
    dominantApps: [PAYMENT_APPS.flowbird, PAYMENT_APPS.parkmobile, PAYMENT_APPS.spothero],
    defaultRules: {
      ...DEFAULT_US_RULES,
      hydrantDistanceFt: 15,
      crosswalkDistanceFt: 20,
      stopSignDistanceFt: 30,
      curbDistanceInches: 12,
      statutoryReference: 'NY Vehicle and Traffic Law (VAT § 1202)',
      disputeAgency: 'City / Town Traffic Violations Bureau',
      disputeUrl: 'https://dmv.ny.gov/tickets/about-traffic-violations-bureau-tvb',
    },
    cities: {
      nyc: {
        cityId: 'nyc',
        cityName: 'New York City (5 Boroughs)',
        stateCode: 'NY',
        center: [-73.9851, 40.7484],
        zoom: 15,
        primaryApp: PAYMENT_APPS.flowbird,
        secondaryApps: [PAYMENT_APPS.parkmobile, PAYMENT_APPS.spothero],
        rules: {
          ...DEFAULT_US_RULES,
          hydrantDistanceFt: 15,
          crosswalkDistanceFt: 0, // In NYC parking allowed up to curb ramp unless marked
          stopSignDistanceFt: 0, // NYC Title 34 allows parking up to intersection line unless sign posted
          curbDistanceInches: 12,
          meterGracePeriodMin: 5,
          streetCleaningTerm: 'Alternate Side Parking (ASP)',
          residentPermitTerm: 'No Citywide Residential Permit',
          statutoryReference: 'NYC Traffic Rules (34 RCNY § 4-08)',
          specialQuirks: [
            'Parking permitted right up to unmarked intersections / crosswalk lines unless a sign or pedestrian ramp prohibits it.',
            'Official 5-minute Muni-Meter grace period on both startup and expiration.',
            'Alternate Side Parking (ASP) street cleaning calendar suspended on major holidays and snow alerts.',
            'Sunday meter holiday: all on-street Muni-Meters are free citywide on Sundays.',
          ],
          disputeAgency: 'NYC Department of Finance (DOF)',
          disputeUrl: 'https://www.nyc.gov/site/finance/vehicles/dispute-a-ticket.page',
        },
        openDataEndpoint: 'https://data.cityofnewyork.us/resource/e7yp-wx55.json',
      },
      buffalo: {
        cityId: 'buffalo',
        cityName: 'Buffalo',
        stateCode: 'NY',
        center: [-78.8784, 42.8864],
        zoom: 15,
        primaryApp: PAYMENT_APPS.parkmobile,
        secondaryApps: [PAYMENT_APPS.passport, PAYMENT_APPS.spothero],
        rules: {
          ...DEFAULT_US_RULES,
          hydrantDistanceFt: 15,
          crosswalkDistanceFt: 20,
          stopSignDistanceFt: 30,
          streetCleaningTerm: 'Winter Alternate Parking (Nov 15 - Apr 1)',
          specialQuirks: [
            'Winter Alternate Side Parking in effect from Nov 15 through April 1 between 1:30 AM and 7 AM on bus routes.',
          ],
          disputeAgency: 'City of Buffalo Parking Violations Bureau',
          disputeUrl: 'https://www.buffalony.gov/324/Parking-Violations-Bureau',
        },
      },
    },
  },

  NJ: {
    stateCode: 'NJ',
    stateName: 'New Jersey',
    defaultCenter: [-74.0431, 40.7282],
    defaultZoom: 12,
    dominantApps: [PAYMENT_APPS.parkmobile, PAYMENT_APPS.paybyphone, PAYMENT_APPS.njtransit],
    defaultRules: {
      ...DEFAULT_US_RULES,
      hydrantDistanceFt: 10,
      crosswalkDistanceFt: 25,
      stopSignDistanceFt: 50,
      curbDistanceInches: 6,
      meterGracePeriodMin: 0,
      streetCleaningTerm: 'Street Sweeping',
      residentPermitTerm: 'Residential Permit Parking (RPP)',
      statutoryReference: 'N.J.S.A. Title 39:4-138',
      specialQuirks: [
        'Strict 25-Foot Crosswalk Rule (Daylighting Law): Parking within 25 ft of any crosswalk or curb line is strictly illegal.',
        '50-foot prohibition from stop signs statewide under Title 39.',
        'Hydrant clearance is 10 feet (compared to 15 ft in NYC).',
        'Right wheels must be within 6 inches of the curb line.',
      ],
      disputeAgency: 'New Jersey Municipal Courts / NJMCdirect',
      disputeUrl: 'https://www.njcourts.gov/municipal-courts',
    },
    cities: {
      jersey_city: {
        cityId: 'jersey_city',
        cityName: 'Jersey City',
        stateCode: 'NJ',
        center: [-74.0431, 40.7178],
        zoom: 15.5,
        primaryApp: PAYMENT_APPS.parkmobile,
        secondaryApps: [PAYMENT_APPS.njtransit, PAYMENT_APPS.spothero],
        rules: {
          ...DEFAULT_US_RULES,
          hydrantDistanceFt: 10,
          crosswalkDistanceFt: 25,
          stopSignDistanceFt: 50,
          streetCleaningTerm: 'Street Sweeping',
          residentPermitTerm: 'Jersey City Residential Permit Zones (1–17)',
          statutoryReference: 'JC Code § 332-58 & N.J.S.A. 39:4-138',
          specialQuirks: [
            'Non-residents limited to 2 hours in residential zones between 8 AM and 9 PM (Mon–Fri).',
            'Crosswalk daylighting strictly enforced with cameras and parking division cruisers.',
          ],
          disputeAgency: 'Jersey City Municipal Court / NJMCdirect',
          disputeUrl: 'https://www.njcourts.gov/municipal-courts',
        },
        openDataEndpoint: 'https://data.jerseycitynj.gov/api-console/explore/v2.1/',
      },
      hoboken: {
        cityId: 'hoboken',
        cityName: 'Hoboken',
        stateCode: 'NJ',
        center: [-74.0285, 40.744],
        zoom: 15.5,
        primaryApp: PAYMENT_APPS.parkmobile,
        secondaryApps: [PAYMENT_APPS.spothero],
        rules: {
          ...DEFAULT_US_RULES,
          hydrantDistanceFt: 10,
          crosswalkDistanceFt: 25,
          stopSignDistanceFt: 50,
          streetCleaningTerm: 'Street Sweeping',
          residentPermitTerm: 'Hoboken Resident Only Sides (Green/White Signs)',
          statutoryReference: 'Hoboken City Code § 141-1 & Vision Zero',
          specialQuirks: [
            'Hoboken Vision Zero daylighting prohibits parking within 25 ft of crosswalks on every corner.',
            'White curb signs indicate Permit-Only side; visitors must park on the opposite side and pay via ParkMobile.',
          ],
          disputeAgency: 'Hoboken Municipal Court',
          disputeUrl: 'https://www.hobokennj.gov/departments/municipal-court',
        },
      },
      newark: {
        cityId: 'newark',
        cityName: 'Newark',
        stateCode: 'NJ',
        center: [-74.1724, 40.7357],
        zoom: 15,
        primaryApp: PAYMENT_APPS.parkmobile,
        secondaryApps: [PAYMENT_APPS.njtransit, PAYMENT_APPS.spothero],
        rules: {
          ...DEFAULT_US_RULES,
          hydrantDistanceFt: 10,
          crosswalkDistanceFt: 25,
          stopSignDistanceFt: 50,
          streetCleaningTerm: 'Street Sweeping',
          residentPermitTerm: 'Newark Residential Permit Parking',
          statutoryReference: 'Newark Revised Ordinances Title 23',
          specialQuirks: [
            'Downtown meters enforced Mon-Sat 9 AM-6 PM; special Prudential Center arena event rates apply.',
          ],
          disputeAgency: 'Newark Municipal Court',
          disputeUrl: 'https://www.newarknj.gov/departments/municipalcourt',
        },
      },
    },
  },

  CT: {
    stateCode: 'CT',
    stateName: 'Connecticut',
    defaultCenter: [-73.5387, 41.0534],
    defaultZoom: 12,
    dominantApps: [PAYMENT_APPS.passport, PAYMENT_APPS.parkmobile],
    defaultRules: {
      ...DEFAULT_US_RULES,
      hydrantDistanceFt: 10,
      crosswalkDistanceFt: 25,
      stopSignDistanceFt: 25,
      curbDistanceInches: 12,
      statutoryReference: 'Conn. Gen. Stat. § 14-251',
      disputeAgency: 'City / Town Traffic Bureau',
      disputeUrl: 'https://www.jud.ct.gov/traffic.htm',
    },
    cities: {
      stamford: {
        cityId: 'stamford',
        cityName: 'Stamford',
        stateCode: 'CT',
        center: [-73.5387, 41.0534],
        zoom: 15.5,
        primaryApp: PAYMENT_APPS.passport,
        secondaryApps: [PAYMENT_APPS.parkmobile, PAYMENT_APPS.spothero],
        rules: {
          ...DEFAULT_US_RULES,
          hydrantDistanceFt: 10,
          crosswalkDistanceFt: 25,
          stopSignDistanceFt: 25,
          streetCleaningTerm: 'Street Maintenance',
          residentPermitTerm: 'Stamford Beach & Station Permit',
          statutoryReference: 'City of Stamford Code § 231',
          specialQuirks: [
            'Passport Parking is the official meter app across Downtown Stamford, Bedford St, and Atlantic St.',
            'Free parking on Sundays and major municipal holidays.',
          ],
          disputeAgency: 'City Transportation Bureau',
          disputeUrl: 'https://www.stamfordct.gov/government/transportation-traffic-parking',
        },
      },
      norwalk: {
        cityId: 'norwalk',
        cityName: 'Norwalk (SoNo)',
        stateCode: 'CT',
        center: [-73.419, 41.098],
        zoom: 15.5,
        primaryApp: PAYMENT_APPS.passport,
        secondaryApps: [PAYMENT_APPS.parkmobile],
        rules: {
          ...DEFAULT_US_RULES,
          hydrantDistanceFt: 10,
          crosswalkDistanceFt: 25,
          stopSignDistanceFt: 25,
          streetCleaningTerm: 'Street Maintenance',
          residentPermitTerm: 'Norwalk Parking Authority Zones',
          statutoryReference: 'Norwalk Code Chapter 111',
          specialQuirks: [
            'South Norwalk (SoNo) nightlife meters active until 9 PM Mon–Sat and 6 PM Sun.',
          ],
          disputeAgency: 'Norwalk Parking Authority',
          disputeUrl: 'https://www.norwalkpark.org',
        },
      },
    },
  },

  CA: {
    stateCode: 'CA',
    stateName: 'California',
    defaultCenter: [-118.2437, 34.0522],
    defaultZoom: 11,
    dominantApps: [PAYMENT_APPS.paybyphone, PAYMENT_APPS.parkmobile, PAYMENT_APPS.spothero],
    defaultRules: {
      ...DEFAULT_US_RULES,
      hydrantDistanceFt: 15,
      crosswalkDistanceFt: 15,
      stopSignDistanceFt: 30,
      curbDistanceInches: 18,
      wheelCrampingMandatory: true,
      maxContinuousHours: 72,
      statutoryReference: 'California Vehicle Code (CVC § 22500 & 22502)',
      specialQuirks: [
        'Mandatory Wheel Cramping: On any grade exceeding 3%, front wheels must be cramped against the curb (curb wheels turned right facing downhill, turned left facing uphill).',
        'Strict 72-Hour Maximum Rule: Parking in the same public street location continuously for over 72 hours without moving is prohibited statewide and vehicles are subject to tow.',
        'Right-hand wheels must be parallel within 18 inches of the curb edge.',
        'Color curb conventions strictly codified: Red (No stopping/parking), White (Passenger loading, 5 min), Green (Short-term, 10–20 min), Yellow (Commercial loading), Blue (Disability permit).',
      ],
      disputeAgency: 'Local Municipal Parking Citation Office',
      disputeUrl: 'https://www.courts.ca.gov/selfhelp-traffic.htm',
    },
    cities: {
      san_francisco: {
        cityId: 'san_francisco',
        cityName: 'San Francisco',
        stateCode: 'CA',
        center: [-122.4194, 37.7749],
        zoom: 15,
        primaryApp: PAYMENT_APPS.paybyphone,
        secondaryApps: [PAYMENT_APPS.parkmobile, PAYMENT_APPS.spothero],
        rules: {
          ...DEFAULT_US_RULES,
          hydrantDistanceFt: 15,
          crosswalkDistanceFt: 15,
          stopSignDistanceFt: 30,
          curbDistanceInches: 18,
          wheelCrampingMandatory: true,
          maxContinuousHours: 72,
          streetCleaningTerm: 'Street Cleaning (SFMTA)',
          residentPermitTerm: 'Residential Parking Permit (RPP Areas A-Z)',
          statutoryReference: 'SF Transportation Code § 7.2.23 & CVC § 22500',
          specialQuirks: [
            'Strict curb-cramping enforcement on steep SF hills — wheels must be securely blocked by the curb.',
            'SFpark dynamic demand-responsive meter pricing: rates fluctuate between $0.50 and $10.00/hour depending on block occupancy.',
            'Tow-away commuter lanes in Financial District active during 7–9 AM and 4–6 PM rush windows.',
          ],
          disputeAgency: 'SFMTA Parking Violations Adjudication',
          disputeUrl: 'https://www.sfmta.com/getting-around/drive-park/citations-and-fines',
        },
      },
      los_angeles: {
        cityId: 'los_angeles',
        cityName: 'Los Angeles',
        stateCode: 'CA',
        center: [-118.2437, 34.0522],
        zoom: 14.5,
        primaryApp: PAYMENT_APPS.parkmobile,
        secondaryApps: [PAYMENT_APPS.paybyphone, PAYMENT_APPS.spothero],
        rules: {
          ...DEFAULT_US_RULES,
          hydrantDistanceFt: 15,
          crosswalkDistanceFt: 15,
          stopSignDistanceFt: 30,
          curbDistanceInches: 18,
          wheelCrampingMandatory: true,
          maxContinuousHours: 72,
          streetCleaningTerm: 'Street Sweeping (Street Services)',
          residentPermitTerm: 'Preferential Parking District (PPD)',
          statutoryReference: 'LAMC § 80.69 & CVC § 22500',
          specialQuirks: [
            'Anti-Gridlock Zones: Strict tow-away zones on major boulevards (Wilshire, Olympic, Santa Monica) during peak hours.',
            'Street sweeping tickets are $73 across LA city boundaries.',
          ],
          disputeAgency: 'LADOT Parking Violations Bureau',
          disputeUrl: 'https://ladotparking.org/adjudication-division/',
        },
      },
      san_diego: {
        cityId: 'san_diego',
        cityName: 'San Diego',
        stateCode: 'CA',
        center: [-117.1611, 32.7157],
        zoom: 15,
        primaryApp: PAYMENT_APPS.parkmobile,
        secondaryApps: [PAYMENT_APPS.spothero],
        rules: {
          ...DEFAULT_US_RULES,
          hydrantDistanceFt: 15,
          crosswalkDistanceFt: 15,
          stopSignDistanceFt: 30,
          curbDistanceInches: 18,
          wheelCrampingMandatory: true,
          maxContinuousHours: 72,
          streetCleaningTerm: 'Street Sweeping',
          residentPermitTerm: 'Residential Permit Parking (RPP)',
          statutoryReference: 'San Diego Municipal Code § 86.0104',
          specialQuirks: [
            'Downtown meters enforced 8 AM–8 PM Mon–Sat. Sunday parking is free at all meters.',
          ],
          disputeAgency: 'City of San Diego Parking Administration',
          disputeUrl: 'https://www.sandiego.gov/parking/citations',
        },
      },
    },
  },

  IL: {
    stateCode: 'IL',
    stateName: 'Illinois',
    defaultCenter: [-87.6298, 41.8781],
    defaultZoom: 11,
    dominantApps: [PAYMENT_APPS.parkchicago, PAYMENT_APPS.passport, PAYMENT_APPS.parkmobile],
    defaultRules: {
      ...DEFAULT_US_RULES,
      hydrantDistanceFt: 15,
      crosswalkDistanceFt: 20,
      stopSignDistanceFt: 30,
      curbDistanceInches: 12,
      statutoryReference: '625 ILCS 5/11-1303',
      specialQuirks: [
        'Within 20 feet of a crosswalk at an intersection and 30 feet of any stop sign or traffic control device is prohibited.',
        'Winter overnight arterial restrictions apply across northern municipalities.',
      ],
      disputeAgency: 'Local Municipal Department of Revenue',
      disputeUrl: 'https://www.chicago.gov/city/en/depts/fin/provdrs/parking_citation.html',
    },
    cities: {
      chicago: {
        cityId: 'chicago',
        cityName: 'Chicago',
        stateCode: 'IL',
        center: [-87.6298, 41.8781],
        zoom: 15,
        primaryApp: PAYMENT_APPS.parkchicago,
        secondaryApps: [PAYMENT_APPS.spothero, PAYMENT_APPS.parkmobile],
        rules: {
          ...DEFAULT_US_RULES,
          hydrantDistanceFt: 15,
          crosswalkDistanceFt: 20,
          stopSignDistanceFt: 30,
          curbDistanceInches: 12,
          streetCleaningTerm: 'Street Sweeping (Orange Signs)',
          residentPermitTerm: 'Residential Permit Parking (RPP Zones)',
          statutoryReference: 'Municipal Code of Chicago (MCC 9-64-100)',
          specialQuirks: [
            'Chicago Winter Overnight Parking Ban: Prohibited Dec 1 to April 1 between 3 AM and 7 AM on 107 miles of arterial streets regardless of snow presence ($150 tow + $60 ticket).',
            '2-Inch Snow Ban: No parking on 500 miles of secondary main streets after 2 inches of snowfall until streets are plowed.',
            'City Sticker Requirement: Chicago residents must display an official Chicago City Vehicle Sticker on their windshield.',
          ],
          disputeAgency: 'City of Chicago Department of Finance',
          disputeUrl: 'https://www.chicago.gov/city/en/depts/fin/provdrs/parking_citation.html',
        },
      },
    },
  },

  TX: {
    stateCode: 'TX',
    stateName: 'Texas',
    defaultCenter: [-97.7431, 30.2672],
    defaultZoom: 11,
    dominantApps: [PAYMENT_APPS.parkmobile, PAYMENT_APPS.parkhouston, PAYMENT_APPS.spothero],
    defaultRules: {
      ...DEFAULT_US_RULES,
      hydrantDistanceFt: 15,
      crosswalkDistanceFt: 20,
      stopSignDistanceFt: 30,
      curbDistanceInches: 18,
      statutoryReference: 'Texas Transportation Code § 545.302',
      specialQuirks: [
        'Strict 30-foot prohibition from flashing signals, stop signs, or yield signs located at the side of a roadway.',
        'Vehicles must be parked parallel within 18 inches of the right-hand curb on two-way roads.',
      ],
      disputeAgency: 'City Municipal Court',
      disputeUrl: 'https://www.austintexas.gov/department/municipal-court',
    },
    cities: {
      austin: {
        cityId: 'austin',
        cityName: 'Austin',
        stateCode: 'TX',
        center: [-97.7431, 30.2672],
        zoom: 15,
        primaryApp: PAYMENT_APPS.parkmobile,
        secondaryApps: [PAYMENT_APPS.spothero],
        rules: {
          ...DEFAULT_US_RULES,
          hydrantDistanceFt: 15,
          crosswalkDistanceFt: 20,
          stopSignDistanceFt: 30,
          streetCleaningTerm: 'Street Maintenance',
          residentPermitTerm: 'Residential Parking Permit (RPP)',
          statutoryReference: 'Austin City Code Chapter 12-5',
          specialQuirks: [
            'Downtown meters enforced 8 AM–midnight on Thurs/Fri/Sat for nightlife corridor safety.',
            'Sunday parking is free at all street meters in Austin.',
          ],
          disputeAgency: 'City of Austin Municipal Court',
          disputeUrl: 'https://www.austintexas.gov/department/municipal-court',
        },
      },
      houston: {
        cityId: 'houston',
        cityName: 'Houston',
        stateCode: 'TX',
        center: [-95.3698, 29.7604],
        zoom: 15,
        primaryApp: PAYMENT_APPS.parkhouston,
        secondaryApps: [PAYMENT_APPS.parkmobile, PAYMENT_APPS.spothero],
        rules: {
          ...DEFAULT_US_RULES,
          hydrantDistanceFt: 15,
          crosswalkDistanceFt: 20,
          stopSignDistanceFt: 30,
          streetCleaningTerm: 'Street Sweeping',
          residentPermitTerm: 'Community Parking Program',
          statutoryReference: 'Houston Code of Ordinances Chapter 26',
          specialQuirks: [
            'ParkHouston manages curbside zones; meters enforced 7 AM–6 PM Mon–Sat in business areas.',
            'Valet zones and commercial mobility lanes enforced 24/7 in Midtown & Downtown.',
          ],
          disputeAgency: 'City of Houston Municipal Courts',
          disputeUrl: 'https://www.houstontx.gov/courts/',
        },
      },
    },
  },

  DC: {
    stateCode: 'DC',
    stateName: 'District of Columbia',
    defaultCenter: [-77.0369, 38.9072],
    defaultZoom: 14,
    dominantApps: [PAYMENT_APPS.parkmobile, PAYMENT_APPS.spothero],
    defaultRules: {
      ...DEFAULT_US_RULES,
      hydrantDistanceFt: 10,
      crosswalkDistanceFt: 20,
      stopSignDistanceFt: 25,
      curbDistanceInches: 12,
      statutoryReference: 'DCMR Title 18 (Vehicles & Traffic)',
      specialQuirks: [
        'Strict 10-foot Fire Hydrant rule (not 15 ft).',
        'Prohibited within 40 feet of an intersection curb line on streets with bus stops.',
        'Aggressive Residential Permit Parking (RPP) enforcement: 2-hour limit strictly enforced for out-of-state visitors Mon–Fri 7 AM–8:30 PM.',
        'Emergency rush hour morning (7–9:30 AM) and evening (4–6:30 PM) arterial tow-away lanes strictly towed by DPW.',
      ],
      disputeAgency: 'DC DMV Adjudication Services',
      disputeUrl: 'https://dmv.dc.gov/service/contest-parking-violations',
    },
    cities: {
      washington: {
        cityId: 'washington',
        cityName: 'Washington, D.C.',
        stateCode: 'DC',
        center: [-77.0369, 38.9072],
        zoom: 15,
        primaryApp: PAYMENT_APPS.parkmobile,
        secondaryApps: [PAYMENT_APPS.spothero],
        rules: {
          ...DEFAULT_US_RULES,
          hydrantDistanceFt: 10,
          crosswalkDistanceFt: 20,
          stopSignDistanceFt: 25,
          curbDistanceInches: 12,
          streetCleaningTerm: 'Street Sweeping (Seasonal Mar–Nov)',
          residentPermitTerm: 'DC Residential Permit Parking (Wards 1–8)',
          statutoryReference: '18 DCMR § 2400',
          specialQuirks: [
            'ParkMobile is the exclusive curbside provider across all DC quadrants (NW, NE, SW, SE).',
            'Diplomatic and government parking zones require specific CD/D license credentials.',
          ],
          disputeAgency: 'DC DMV Adjudication Services',
          disputeUrl: 'https://dmv.dc.gov/service/contest-parking-violations',
        },
      },
    },
  },

  FL: {
    stateCode: 'FL',
    stateName: 'Florida',
    defaultCenter: [-80.1918, 25.7617],
    defaultZoom: 11,
    dominantApps: [PAYMENT_APPS.paybyphone, PAYMENT_APPS.parkmobile, PAYMENT_APPS.spothero],
    defaultRules: {
      ...DEFAULT_US_RULES,
      hydrantDistanceFt: 15,
      crosswalkDistanceFt: 20,
      stopSignDistanceFt: 30,
      curbDistanceInches: 12,
      statutoryReference: 'Fla. Stat. § 316.1945',
      specialQuirks: [
        'Statewide prohibition against stopping, standing, or parking on bicycle paths or exclusive bicycle lanes.',
        'Within 20 feet of the driveway entrance to any fire station or within 75 feet across the street is prohibited.',
      ],
      disputeAgency: 'County Clerk of Courts Parking Division',
      disputeUrl: 'https://www.miamidadeclerk.gov/clerk/traffic.page',
    },
    cities: {
      miami: {
        cityId: 'miami',
        cityName: 'Miami',
        stateCode: 'FL',
        center: [-80.1918, 25.7617],
        zoom: 15,
        primaryApp: PAYMENT_APPS.paybyphone,
        secondaryApps: [PAYMENT_APPS.parkmobile, PAYMENT_APPS.spothero],
        rules: {
          ...DEFAULT_US_RULES,
          hydrantDistanceFt: 15,
          crosswalkDistanceFt: 20,
          stopSignDistanceFt: 30,
          streetCleaningTerm: 'Street Maintenance',
          residentPermitTerm: 'Miami Parking Authority (MPA) Residential Zones',
          statutoryReference: 'Miami City Code Chapter 35',
          specialQuirks: [
            'PayByPhone is the primary street parking app managed by the Miami Parking Authority (MPA).',
            'Wynwood, Brickell, and Coconut Grove meter hours extend until midnight or 3 AM.',
          ],
          disputeAgency: 'Miami Parking Authority Citation Dispute',
          disputeUrl: 'https://www.miamiparking.com/citations/',
        },
      },
      miami_beach: {
        cityId: 'miami_beach',
        cityName: 'Miami Beach',
        stateCode: 'FL',
        center: [-80.1300, 25.7907],
        zoom: 15.5,
        primaryApp: PAYMENT_APPS.parkmobile,
        secondaryApps: [PAYMENT_APPS.paybyphone, PAYMENT_APPS.spothero],
        rules: {
          ...DEFAULT_US_RULES,
          hydrantDistanceFt: 15,
          crosswalkDistanceFt: 20,
          stopSignDistanceFt: 30,
          streetCleaningTerm: 'Street Maintenance',
          residentPermitTerm: 'Residential Zone Decal Program',
          statutoryReference: 'Miami Beach City Code Chapter 106',
          specialQuirks: [
            'South Beach meters enforced 24/7 on Ocean Drive, Collins Ave, and Washington Ave.',
            'Residents receive preferential rates with registered license plate accounts.',
          ],
          disputeAgency: 'City of Miami Beach Parking Department',
          disputeUrl: 'https://www.miamibeachfl.gov/city-hall/parking/',
        },
      },
    },
  },

  PA: {
    stateCode: 'PA',
    stateName: 'Pennsylvania',
    defaultCenter: [-75.1652, 39.9526],
    defaultZoom: 11,
    dominantApps: [PAYMENT_APPS.parkmobile, PAYMENT_APPS.spothero],
    defaultRules: {
      ...DEFAULT_US_RULES,
      hydrantDistanceFt: 15,
      crosswalkDistanceFt: 20,
      stopSignDistanceFt: 30,
      curbDistanceInches: 12,
      statutoryReference: '75 Pa.C.S. § 3353',
      specialQuirks: [
        'Within 20 feet of a crosswalk and 30 feet of any flashing signal or stop sign is strictly prohibited.',
        'Curb wheels must be parallel within 12 inches of the right-hand edge of the roadway.',
      ],
      disputeAgency: 'Local Parking Authority Adjudication',
      disputeUrl: 'https://philapark.org/dispute/',
    },
    cities: {
      philadelphia: {
        cityId: 'philadelphia',
        cityName: 'Philadelphia',
        stateCode: 'PA',
        center: [-75.1652, 39.9526],
        zoom: 15,
        primaryApp: PAYMENT_APPS.meterup || PAYMENT_APPS.parkmobile,
        secondaryApps: [PAYMENT_APPS.spothero],
        rules: {
          ...DEFAULT_US_RULES,
          hydrantDistanceFt: 15,
          crosswalkDistanceFt: 20,
          stopSignDistanceFt: 30,
          streetCleaningTerm: 'Street Sweeping',
          residentPermitTerm: 'PPA Residential Parking Permit (RPP)',
          statutoryReference: 'Philadelphia Code Title 12',
          specialQuirks: [
            'meterUP is powered by ParkMobile across all Center City and University City metered blocks.',
            'Philadelphia Parking Authority (PPA) courtesy relocation towing: if your vehicle was moved for street work, call PPA Dispatch (215-683-9777).',
            'South Broad Street median parking is an unpermitted customary practice that is officially illegal and subject to enforcement during emergencies.',
          ],
          disputeAgency: 'Philadelphia Parking Authority (PPA) Bureau of Administrative Adjudication',
          disputeUrl: 'https://philapark.org/dispute/',
        },
      },
    },
  },

  MA: {
    stateCode: 'MA',
    stateName: 'Massachusetts',
    defaultCenter: [-71.0589, 42.3601],
    defaultZoom: 12,
    dominantApps: [PAYMENT_APPS.flowbird, PAYMENT_APPS.parkmobile, PAYMENT_APPS.spothero],
    defaultRules: {
      ...DEFAULT_US_RULES,
      hydrantDistanceFt: 10,
      crosswalkDistanceFt: 20,
      stopSignDistanceFt: 30,
      curbDistanceInches: 12,
      statutoryReference: 'MGL ch. 89 § 9 & ch. 90 § 20',
      disputeAgency: 'City / Town Parking Clerk',
      disputeUrl: 'https://www.boston.gov/departments/parking-clerk',
    },
    cities: {
      boston: {
        cityId: 'boston',
        cityName: 'Boston',
        stateCode: 'MA',
        center: [-71.0589, 42.3601],
        zoom: 15.5,
        primaryApp: PAYMENT_APPS.parkboston || PAYMENT_APPS.flowbird,
        secondaryApps: [PAYMENT_APPS.parkmobile, PAYMENT_APPS.spothero],
        rules: {
          ...DEFAULT_US_RULES,
          hydrantDistanceFt: 10,
          crosswalkDistanceFt: 20,
          stopSignDistanceFt: 30,
          streetCleaningTerm: 'Daytime Street Sweeping (Apr 1–Nov 30)',
          residentPermitTerm: 'Resident Permit Parking Only (Sticker Required)',
          statutoryReference: 'City of Boston Traffic Rules Article IV',
          specialQuirks: [
            'ParkBoston app (powered by Flowbird/Passport) manages all Back Bay, Downtown, and South End meters.',
            'Snow Emergency Emergency Artery Towing: parking prohibited along designated snow emergency routes during declared snow emergencies.',
            'Space Savers: Allowed in shoveled spots for up to 48 hours after a declared snow emergency ends (South Boston / Charlestown custom).',
          ],
          disputeAgency: 'City of Boston Office of the Parking Clerk',
          disputeUrl: 'https://www.boston.gov/departments/parking-clerk/how-appeal-parking-ticket',
        },
      },
    },
  },

  WA: {
    stateCode: 'WA',
    stateName: 'Washington',
    defaultCenter: [-122.3321, 47.6062],
    defaultZoom: 12,
    dominantApps: [PAYMENT_APPS.paybyphone, PAYMENT_APPS.spothero],
    defaultRules: {
      ...DEFAULT_US_RULES,
      hydrantDistanceFt: 15,
      crosswalkDistanceFt: 20,
      stopSignDistanceFt: 30,
      curbDistanceInches: 12,
      statutoryReference: 'RCW 46.61.570',
      disputeAgency: 'Seattle Municipal Court',
      disputeUrl: 'https://www.seattle.gov/courts/tickets-and-payments',
    },
    cities: {
      seattle: {
        cityId: 'seattle',
        cityName: 'Seattle',
        stateCode: 'WA',
        center: [-122.3321, 47.6062],
        zoom: 15,
        primaryApp: PAYMENT_APPS.paybyphone,
        secondaryApps: [PAYMENT_APPS.spothero],
        rules: {
          ...DEFAULT_US_RULES,
          hydrantDistanceFt: 15,
          crosswalkDistanceFt: 20,
          stopSignDistanceFt: 30,
          maxContinuousHours: 72,
          streetCleaningTerm: 'Street Cleaning',
          residentPermitTerm: 'Restricted Parking Zone (RPZ Zones 1–35)',
          statutoryReference: 'SMC 11.72.440 (72-Hour Rule)',
          specialQuirks: [
            'PayByPhone is the official on-street parking app for the City of Seattle and SDOT.',
            'Strict 72-hour maximum continuous parking rule enforced on all city streets without exception.',
            'Sunday meter parking is free on all city-managed streets.',
          ],
          disputeAgency: 'Seattle Municipal Court Hearings Bureau',
          disputeUrl: 'https://www.seattle.gov/courts/tickets-and-payments/dispute-a-ticket',
        },
      },
    },
  },

  CO: {
    stateCode: 'CO',
    stateName: 'Colorado',
    defaultCenter: [-104.9903, 39.7392],
    defaultZoom: 12,
    dominantApps: [PAYMENT_APPS.parkmobile, PAYMENT_APPS.spothero],
    defaultRules: {
      ...DEFAULT_US_RULES,
      hydrantDistanceFt: 15,
      crosswalkDistanceFt: 20,
      stopSignDistanceFt: 30,
      curbDistanceInches: 12,
      statutoryReference: 'CRS 42-4-1204',
      disputeAgency: 'Denver County Court Parking Division',
      disputeUrl: 'https://www.denvergov.org/Government/Agencies-Departments-Offices/Parking-Division',
    },
    cities: {
      denver: {
        cityId: 'denver',
        cityName: 'Denver',
        stateCode: 'CO',
        center: [-104.9903, 39.7392],
        zoom: 15,
        primaryApp: PAYMENT_APPS.parkmobile,
        secondaryApps: [PAYMENT_APPS.spothero],
        rules: {
          ...DEFAULT_US_RULES,
          hydrantDistanceFt: 15,
          crosswalkDistanceFt: 20,
          stopSignDistanceFt: 30,
          maxContinuousHours: 72,
          streetCleaningTerm: 'Seasonal Street Sweeping (Apr–Nov)',
          residentPermitTerm: 'Residential Parking Permit Program',
          statutoryReference: 'Denver Revised Municipal Code § 54-460',
          specialQuirks: [
            'ParkMobile manages on-street meter zones across LoDo, Capitol Hill, and RiNo.',
            'Seasonal sweeping takes place from April through November; red signs post specific monthly sweep days.',
          ],
          disputeAgency: 'City and County of Denver Parking Violations',
          disputeUrl: 'https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Department-of-Transportation-and-Infrastructure/Programs-Services/Parking/Contest-a-Citation',
        },
      },
    },
  },

  GA: {
    stateCode: 'GA',
    stateName: 'Georgia',
    defaultCenter: [-84.3880, 33.7490],
    defaultZoom: 12,
    dominantApps: [PAYMENT_APPS.parkmobile, PAYMENT_APPS.spothero],
    defaultRules: {
      ...DEFAULT_US_RULES,
      hydrantDistanceFt: 15,
      crosswalkDistanceFt: 20,
      stopSignDistanceFt: 30,
      curbDistanceInches: 12,
      statutoryReference: 'O.C.G.A. § 40-6-203',
      disputeAgency: 'City of Atlanta Municipal Court',
      disputeUrl: 'https://court.atlantaga.gov',
    },
    cities: {
      atlanta: {
        cityId: 'atlanta',
        cityName: 'Atlanta',
        stateCode: 'GA',
        center: [-84.3880, 33.7490],
        zoom: 15,
        primaryApp: PAYMENT_APPS.parkmobile,
        secondaryApps: [PAYMENT_APPS.spothero],
        rules: {
          ...DEFAULT_US_RULES,
          hydrantDistanceFt: 15,
          crosswalkDistanceFt: 20,
          stopSignDistanceFt: 30,
          streetCleaningTerm: 'Street Maintenance',
          residentPermitTerm: 'Residential Permit Parking (RPP)',
          statutoryReference: 'Atlanta City Code § 150-131',
          specialQuirks: [
            'ATLPlus (operated by ParkMobile) manages curbside parking in Downtown, Midtown, and Buckhead.',
            'Enforcement is active 7 AM–10 PM Mon–Sat in high-density dining & retail corridors.',
          ],
          disputeAgency: 'ATLPlus / City of Atlanta Municipal Court',
          disputeUrl: 'https://www.atlplusmobility.com/citation-disputes/',
        },
      },
    },
  },
};

// ---------------------------------------------------------
// 3. Fallback Registry for all 50 US States
// ---------------------------------------------------------
export const ALL_US_STATES: Array<{
  code: string;
  name: string;
  center: [number, number];
  zoom: number;
}> = [
  { code: 'AL', name: 'Alabama', center: [-86.7911, 32.8067], zoom: 7.5 },
  { code: 'AK', name: 'Alaska', center: [-152.4044, 61.3707], zoom: 4.5 },
  { code: 'AZ', name: 'Arizona', center: [-111.4312, 34.0489], zoom: 7 },
  { code: 'AR', name: 'Arkansas', center: [-92.3731, 35.2010], zoom: 7.5 },
  { code: 'CA', name: 'California', center: [-119.4179, 36.7783], zoom: 6.5 },
  { code: 'CO', name: 'Colorado', center: [-105.7821, 39.5501], zoom: 7 },
  { code: 'CT', name: 'Connecticut', center: [-72.7554, 41.6032], zoom: 9.5 },
  { code: 'DE', name: 'Delaware', center: [-75.5071, 38.9108], zoom: 9 },
  { code: 'DC', name: 'District of Columbia', center: [-77.0369, 38.9072], zoom: 13.5 },
  { code: 'FL', name: 'Florida', center: [-81.5158, 27.6648], zoom: 7 },
  { code: 'GA', name: 'Georgia', center: [-83.5002, 32.1656], zoom: 7 },
  { code: 'HI', name: 'Hawaii', center: [-157.8583, 21.3069], zoom: 8 },
  { code: 'ID', name: 'Idaho', center: [-114.7420, 44.0682], zoom: 6.5 },
  { code: 'IL', name: 'Illinois', center: [-89.3985, 40.6331], zoom: 7 },
  { code: 'IN', name: 'Indiana', center: [-86.1349, 40.2672], zoom: 7.5 },
  { code: 'IA', name: 'Iowa', center: [-93.0977, 41.8780], zoom: 7.5 },
  { code: 'KS', name: 'Kansas', center: [-98.4842, 39.0119], zoom: 7 },
  { code: 'KY', name: 'Kentucky', center: [-84.2700, 37.8393], zoom: 7.5 },
  { code: 'LA', name: 'Louisiana', center: [-91.9623, 30.9843], zoom: 7.5 },
  { code: 'ME', name: 'Maine', center: [-69.4455, 45.2538], zoom: 7 },
  { code: 'MD', name: 'Maryland', center: [-76.6413, 39.0458], zoom: 8 },
  { code: 'MA', name: 'Massachusetts', center: [-71.3824, 42.4072], zoom: 8.5 },
  { code: 'MI', name: 'Michigan', center: [-85.6024, 44.3148], zoom: 7 },
  { code: 'MN', name: 'Minnesota', center: [-94.6859, 46.7296], zoom: 6.5 },
  { code: 'MS', name: 'Mississippi', center: [-89.3985, 32.3547], zoom: 7.5 },
  { code: 'MO', name: 'Missouri', center: [-91.8318, 37.9643], zoom: 7 },
  { code: 'MT', name: 'Montana', center: [-110.3626, 46.8797], zoom: 6.5 },
  { code: 'NE', name: 'Nebraska', center: [-99.9018, 41.4925], zoom: 7 },
  { code: 'NV', name: 'Nevada', center: [-116.4194, 38.8026], zoom: 6.5 },
  { code: 'NH', name: 'New Hampshire', center: [-71.5724, 43.1939], zoom: 8 },
  { code: 'NJ', name: 'New Jersey', center: [-74.4057, 40.0583], zoom: 8.5 },
  { code: 'NM', name: 'New Mexico', center: [-105.8701, 34.5199], zoom: 6.5 },
  { code: 'NY', name: 'New York', center: [-74.0060, 40.7128], zoom: 11 },
  { code: 'NC', name: 'North Carolina', center: [-79.0193, 35.7596], zoom: 7 },
  { code: 'ND', name: 'North Dakota', center: [-101.0020, 47.5515], zoom: 6.5 },
  { code: 'OH', name: 'Ohio', center: [-82.9071, 40.4173], zoom: 7.5 },
  { code: 'OK', name: 'Oklahoma', center: [-97.0929, 35.0078], zoom: 7 },
  { code: 'OR', name: 'Oregon', center: [-120.5542, 43.8041], zoom: 6.5 },
  { code: 'PA', name: 'Pennsylvania', center: [-77.1945, 41.2033], zoom: 7.5 },
  { code: 'RI', name: 'Rhode Island', center: [-71.4774, 41.5801], zoom: 10 },
  { code: 'SC', name: 'South Carolina', center: [-81.1637, 33.8361], zoom: 7.5 },
  { code: 'SD', name: 'South Dakota', center: [-99.9018, 43.9695], zoom: 7 },
  { code: 'TN', name: 'Tennessee', center: [-86.5804, 35.5175], zoom: 7.5 },
  { code: 'TX', name: 'Texas', center: [-99.9018, 31.9686], zoom: 6.5 },
  { code: 'UT', name: 'Utah', center: [-111.0937, 39.3210], zoom: 6.5 },
  { code: 'VT', name: 'Vermont', center: [-72.5778, 44.5588], zoom: 8 },
  { code: 'VA', name: 'Virginia', center: [-78.6569, 37.4316], zoom: 7.5 },
  { code: 'WA', name: 'Washington', center: [-120.7401, 47.7511], zoom: 7 },
  { code: 'WV', name: 'West Virginia', center: [-80.4549, 38.5976], zoom: 7.5 },
  { code: 'WI', name: 'Wisconsin', center: [-89.6165, 43.7844], zoom: 7 },
  { code: 'WY', name: 'Wyoming', center: [-107.2903, 43.0759], zoom: 6.5 },
];

// ---------------------------------------------------------
// 4. Resolution Function (City -> State -> National Default)
// ---------------------------------------------------------
export function resolveJurisdiction(stateCodeInput?: string, cityIdInput?: string): {
  city?: CityProfile;
  state: StateProfile;
  rules: JurisdictionRules;
  primaryApp: MobilePaymentApp;
  secondaryApps: MobilePaymentApp[];
} {
  const normState = (stateCodeInput || 'NY').toUpperCase().trim();
  const fallbackState = ALL_US_STATES.find((s) => s.code === normState);
  const state = STATE_REGISTRY[normState] || {
    stateCode: normState,
    stateName: fallbackState?.name || normState,
    defaultCenter: fallbackState?.center || [-98.5795, 39.8283], // Precise geographic center of state
    defaultZoom: fallbackState?.zoom || 7,
    defaultRules: DEFAULT_US_RULES,
    dominantApps: [PAYMENT_APPS.parkmobile, PAYMENT_APPS.paybyphone, PAYMENT_APPS.spothero],
    cities: {},
  };

  let city: CityProfile | undefined = undefined;
  if (cityIdInput && state.cities[cityIdInput]) {
    city = state.cities[cityIdInput];
  } else if (state.cities && Object.keys(state.cities).length > 0) {
    const firstCityKey = Object.keys(state.cities)[0];
    city = state.cities[firstCityKey];
  }

  const rules: JurisdictionRules = city ? city.rules : state.defaultRules;
  const primaryApp: MobilePaymentApp = city
    ? city.primaryApp
    : state.dominantApps[0] || PAYMENT_APPS.parkmobile;
  const secondaryApps: MobilePaymentApp[] = city
    ? city.secondaryApps
    : state.dominantApps.slice(1);

  return {
    city,
    state,
    rules,
    primaryApp,
    secondaryApps,
  };
}
