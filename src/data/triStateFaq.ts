export interface TriStateFaqItem {
  q: string;
  a: string;
  jurisdiction: 'ALL' | 'NYC' | 'NJ' | 'CT';
  category: 'hydrant' | 'crosswalk' | 'cleaning' | 'commuter' | 'disputes' | 'general';
}

export const TRISTATE_FAQS: TriStateFaqItem[] = [
  // Fire Hydrants
  {
    category: 'hydrant',
    jurisdiction: 'NYC',
    q: 'How far must I park from a fire hydrant in NYC?',
    a: 'In New York City, you must leave at least 15 FEET of clearance from any fire hydrant (NYC Traffic Rules 4-08(e)(2)), day or night, unless the driver remains seated in the vehicle with keys ready to move.'
  },
  {
    category: 'hydrant',
    jurisdiction: 'NJ',
    q: 'How far must I park from a fire hydrant in New Jersey?',
    a: 'Under New Jersey State Statute (N.J.S.A. 39:4-138), parking is prohibited within 10 FEET of a fire hydrant anywhere in the state, including Jersey City, Hoboken, and Newark.'
  },
  {
    category: 'hydrant',
    jurisdiction: 'CT',
    q: 'How far must I park from a fire hydrant in Connecticut?',
    a: 'Under Connecticut General Statutes (CGS § 14-251), no vehicle shall be parked within 10 FEET of any fire hydrant.'
  },

  // Crosswalks
  {
    category: 'crosswalk',
    jurisdiction: 'NYC',
    q: 'Can I park near or next to crosswalks in NYC?',
    a: 'In NYC, you may park right up to the marked crosswalk line or curb ramp (unless prohibited by a specific sign). Blocking the pedestrian ramp itself or parking within marked zebra stripes is illegal.'
  },
  {
    category: 'crosswalk',
    jurisdiction: 'NJ',
    q: 'What is New Jersey\'s 25-Foot Crosswalk Rule (Daylighting)?',
    a: 'New Jersey strictly enforces N.J.S.A. 39:4-138(e): you cannot park within 25 FEET of the nearest line of a crosswalk or an intersection curb line. Tickets in Hoboken and Jersey City for daylighting violations are common and costly.'
  },
  {
    category: 'crosswalk',
    jurisdiction: 'CT',
    q: 'What is the crosswalk parking distance in Connecticut?',
    a: 'Under CT law (CGS § 14-251), parking is prohibited within 25 FEET of an intersection crosswalk to maintain pedestrian sightlines.'
  },

  // Street Sweeping & Parking Limits
  {
    category: 'cleaning',
    jurisdiction: 'NYC',
    q: 'How does Alternate Side Parking (ASP) and Grace Period work in NYC?',
    a: 'NYC Alternate Side Parking mandates moving cars for 90-minute sweeping windows on posted days (DSNY). NYC law provides an official 5-minute grace period at start and end times, as well as for Muni-Meter expiration.'
  },
  {
    category: 'cleaning',
    jurisdiction: 'NJ',
    q: 'How do Street Sweeping and Residential Permits (RPP) work in NJ?',
    a: 'Most North Jersey municipalities (Jersey City, Hoboken, Newark) run mechanical sweepers on 2-hour windows. In residential zones, non-resident vehicles without permits are typically limited to 2 to 4 hours maximum during business hours.'
  },
  {
    category: 'cleaning',
    jurisdiction: 'CT',
    q: 'What street cleaning and dwell limits apply in CT towns?',
    a: 'In Stamford, Norwalk, and Greenwich, scheduled street maintenance occurs seasonally with temporary signage. Downtown cores have 2-hour metered limits with strict tire-chalking/LPR monitoring.'
  },

  // Commuter Lots & Transit
  {
    category: 'commuter',
    jurisdiction: 'NYC',
    q: 'How do I pay at MTA commuter stations?',
    a: 'At MTA Long Island Rail Road (LIRR) and Metro-North stations inside NY, station parking is managed via MTA eTix / LAZ Parking or local municipal vouchers.'
  },
  {
    category: 'commuter',
    jurisdiction: 'NJ',
    q: 'How do I pay for parking at NJ Transit train stations?',
    a: 'NJ Transit commuter rail lots are paid through the official NJ Transit Mobile app (Station Parking section) or ParkMobile using the posted station lot zone code.'
  },
  {
    category: 'commuter',
    jurisdiction: 'CT',
    q: 'How do I pay for parking at Metro-North stations in CT?',
    a: 'Stamford, Norwalk, and Greenwich Metro-North stations utilize ParkMobile, Passport Parking, or LAZ Parking permit portals.'
  },

  // Ticket Disputes & Contesting
  {
    category: 'disputes',
    jurisdiction: 'NYC',
    q: 'How do I dispute a parking ticket in NYC?',
    a: 'NYC parking tickets are handled exclusively through the NYC Department of Finance (DOF). You can dispute online at nyc.gov/finance or via the NYC Pay or Dispute mobile app with photos within 30 days.'
  },
  {
    category: 'disputes',
    jurisdiction: 'NJ',
    q: 'How do I dispute a parking ticket in New Jersey?',
    a: 'NJ parking tickets are quasi-criminal municipal citations handled by the Local Municipal Court of the town where issued. You can review or dispute charges via the NJ Municipal Court online portal (NJMCdirect).'
  },
  {
    category: 'disputes',
    jurisdiction: 'CT',
    q: 'How do I appeal a parking citation in Connecticut?',
    a: 'CT parking citations are handled through each municipality\'s Parking Violations Bureau (e.g., City of Stamford Traffic & Parking Bureau). Appeals must be filed within 10 to 14 days of issuance.'
  }
];
