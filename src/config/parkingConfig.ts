export interface PaymentProvider {
  name: string;
  scheme: string; // Native app URL scheme for deep linking
  webFallback: string;
  badgeText: string;
}

export interface RegionParkingProfile {
  regionId: 'nyc' | 'nj_urban' | 'ct_southwest';
  state: 'NY' | 'NJ' | 'CT';
  displayName: string;
  jurisdictionName: string;
  defaultCenter: [number, number]; // [lng, lat]
  defaultZoom: number;
  primaryProvider: PaymentProvider;
  transitProvider?: PaymentProvider;
  curbRules: {
    hydrantClearanceFt: number;
    crosswalkClearanceFt: number;
    meterGracePeriodMin: number;
    doubleParkingPermitted: boolean;
    streetCleaningTerm: string;
    residentPermitTerm: string;
  };
  disputePortalUrl: string;
  disputeAgencyName: string;
}

export const REGION_PROFILES: Record<string, RegionParkingProfile> = {
  nyc: {
    regionId: 'nyc',
    state: 'NY',
    displayName: 'New York City',
    jurisdictionName: 'New York City (5 Boroughs)',
    defaultCenter: [-73.9851, 40.7484],
    defaultZoom: 15,
    primaryProvider: {
      name: 'ParkNYC',
      scheme: 'flowbird://',
      webFallback: 'https://www.parknyc.org',
      badgeText: 'Pay via ParkNYC'
    },
    transitProvider: {
      name: 'MTA eTix / OMNY',
      scheme: 'mtaetix://',
      webFallback: 'https://new.mta.info',
      badgeText: 'MTA Commuter Lots'
    },
    curbRules: {
      hydrantClearanceFt: 15,
      crosswalkClearanceFt: 0,
      meterGracePeriodMin: 5,
      doubleParkingPermitted: false,
      streetCleaningTerm: 'Alternate Side Parking (ASP)',
      residentPermitTerm: 'No Citywide Resident Permit'
    },
    disputePortalUrl: 'https://www.nyc.gov/site/finance/vehicles/dispute-a-ticket.page',
    disputeAgencyName: 'NYC Department of Finance (DOF)'
  },
  nj_urban: {
    regionId: 'nj_urban',
    state: 'NJ',
    displayName: 'Northern New Jersey',
    jurisdictionName: 'Northern NJ (Jersey City, Hoboken, Newark)',
    defaultCenter: [-74.0431, 40.7282],
    defaultZoom: 15,
    primaryProvider: {
      name: 'ParkMobile',
      scheme: 'parkmobile://',
      webFallback: 'https://parkmobile.io',
      badgeText: 'Pay via ParkMobile'
    },
    transitProvider: {
      name: 'NJ Transit Mobile',
      scheme: 'njtransit://',
      webFallback: 'https://www.njtransit.com/app',
      badgeText: 'NJ Transit Station Parking'
    },
    curbRules: {
      hydrantClearanceFt: 10,
      crosswalkClearanceFt: 25,
      meterGracePeriodMin: 0,
      doubleParkingPermitted: false,
      streetCleaningTerm: 'Street Sweeping',
      residentPermitTerm: 'Residential Permit Parking (RPP)'
    },
    disputePortalUrl: 'https://www.njcourts.gov/municipal-courts',
    disputeAgencyName: 'Local Municipal Court / NJMCdirect'
  },
  ct_southwest: {
    regionId: 'ct_southwest',
    state: 'CT',
    displayName: 'Southwestern Connecticut',
    jurisdictionName: 'Southwestern CT (Stamford, Norwalk, Greenwich)',
    defaultCenter: [-73.5387, 41.0534],
    defaultZoom: 15,
    primaryProvider: {
      name: 'Passport Parking',
      scheme: 'passportparking://',
      webFallback: 'https://passportinc.com',
      badgeText: 'Pay via Passport'
    },
    transitProvider: {
      name: 'Metro-North / LAZ Parking',
      scheme: 'lazparking://',
      webFallback: 'https://rrparking.com',
      badgeText: 'Station Commuter Lots'
    },
    curbRules: {
      hydrantClearanceFt: 10,
      crosswalkClearanceFt: 25,
      meterGracePeriodMin: 0,
      doubleParkingPermitted: false,
      streetCleaningTerm: 'Street Maintenance',
      residentPermitTerm: 'Town Beach / Commuter Permit Zones'
    },
    disputePortalUrl: 'https://www.stamfordct.gov/government/transportation-traffic-parking',
    disputeAgencyName: 'City Transportation Bureau'
  }
};

export type RegionId = 'nyc' | 'nj_urban' | 'ct_southwest';
