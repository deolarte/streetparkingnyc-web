export interface TriStateFaqItem {
  q: string;
  a: string;
  jurisdiction: 'ALL' | 'NYC' | 'NJ' | 'CT';
  category: 'hydrant' | 'crosswalk' | 'cleaning' | 'commuter' | 'disputes' | 'meters' | 'overnight' | 'general';
}

export const TRISTATE_FAQS: TriStateFaqItem[] = [
  // ==========================================
  // NEW JERSEY (NJ) FAQS
  // ==========================================
  {
    category: 'hydrant',
    jurisdiction: 'NJ',
    q: 'How far must I park from a fire hydrant in New Jersey?',
    a: 'Under New Jersey State Statute (N.J.S.A. 39:4-138), parking is prohibited within 10 FEET of a fire hydrant anywhere in the state, including Jersey City, Hoboken, and Newark.'
  },
  {
    category: 'crosswalk',
    jurisdiction: 'NJ',
    q: 'What is New Jersey\'s 25-Foot Crosswalk Rule (Daylighting)?',
    a: 'New Jersey strictly enforces N.J.S.A. 39:4-138(e): you cannot park within 25 FEET of the nearest line of a crosswalk or an intersection curb line. Tickets in Hoboken and Jersey City for daylighting violations are common ($55–$65 fine) and aggressively enforced.'
  },
  {
    category: 'cleaning',
    jurisdiction: 'NJ',
    q: 'How do Street Sweeping schedules work in Jersey City & Hoboken?',
    a: 'Most North Jersey municipalities run mechanical street sweeping on 2-hour windows (e.g., 8:00 AM–10:00 AM or 9:00 AM–10:30 AM) twice per week. Look for posted street sweeping signs with the broom icon. Sweeping is suspended on major city and national holidays.'
  },
  {
    category: 'cleaning',
    jurisdiction: 'NJ',
    q: 'What is the Non-Resident Visitor Limit in Residential Permit Parking (RPP) zones?',
    a: 'In Hoboken, non-residents without an RPP permit may park for up to 4 HOURS maximum on the permit-only side of residential streets Monday through Friday from 8:00 AM to 9:00 PM. In Jersey City, visitor limits are typically 2 HOURS from 8:00 AM to 6:00 PM.'
  },
  {
    category: 'meters',
    jurisdiction: 'NJ',
    q: 'Which mobile app is used for metered parking in New Jersey?',
    a: 'ParkMobile is the primary mobile parking app across Northern New Jersey, including Jersey City, Hoboken, Newark, Weehawken, and Montclair. Enter the 5-digit zone code posted on the street sign or meter decals (e.g., Zone 20101 in Jersey City, Zone 20301 in Hoboken).'
  },
  {
    category: 'overnight',
    jurisdiction: 'NJ',
    q: 'Is overnight street parking permitted in New Jersey cities?',
    a: 'Yes, but permit rules apply. In Hoboken and Downtown Jersey City, anyone can park free overnight outside of posted RPP daytime hours (after 9:00 PM until 8:00 AM). However, daytime visitor countdown limits resume at 8:00 AM the following weekday.'
  },
  {
    category: 'commuter',
    jurisdiction: 'NJ',
    q: 'How do I pay for parking at NJ Transit train and bus stations?',
    a: 'NJ Transit commuter rail and light rail station lots are managed through the official NJ Transit Mobile app (under the "Station Parking" section) or via ParkMobile using the dedicated commuter station zone number.'
  },
  {
    category: 'disputes',
    jurisdiction: 'NJ',
    q: 'How do I dispute a parking ticket in New Jersey?',
    a: 'New Jersey parking tickets are quasi-criminal municipal citations handled by the Local Municipal Court of the municipality where the ticket was issued (e.g., Jersey City Municipal Court or Hoboken Municipal Court). You can plead not guilty and request a virtual hearing online via NJMCdirect (njmcdirect.com) or the NJ Courts municipal portal.'
  },

  // ==========================================
  // CONNECTICUT (CT) FAQS
  // ==========================================
  {
    category: 'hydrant',
    jurisdiction: 'CT',
    q: 'How far must I park from a fire hydrant in Connecticut?',
    a: 'Under Connecticut General Statutes (CGS § 14-251), no vehicle shall be parked within 10 FEET of any fire hydrant anywhere in the state, including Stamford, Greenwich, and Norwalk.'
  },
  {
    category: 'crosswalk',
    jurisdiction: 'CT',
    q: 'What is the crosswalk parking distance in Connecticut?',
    a: 'Under CT law (CGS § 14-251), parking is prohibited within 25 FEET of an intersection crosswalk to maintain pedestrian sightlines and intersection safety.'
  },
  {
    category: 'meters',
    jurisdiction: 'CT',
    q: 'Which mobile apps are used for street parking in Southwestern CT?',
    a: 'Passport Parking is the primary app for Downtown Stamford (Zones 2031–2035) and South Norwalk / SoNo (Zones 2041–2042). ParkMobile is also used at select Metro-North commuter lots and municipal garages in Greenwich and Darien.'
  },
  {
    category: 'cleaning',
    jurisdiction: 'CT',
    q: 'What street cleaning and maintenance rules apply in CT towns?',
    a: 'In Stamford, Norwalk, and Greenwich, scheduled street maintenance occurs seasonally with posted morning restriction signs (e.g., 7:00 AM–9:00 AM). Downtown cores enforce strict 2-hour metered limits with License Plate Recognition (LPR) mobile enforcement.'
  },
  {
    category: 'overnight',
    jurisdiction: 'CT',
    q: 'Can I park on the street overnight in Stamford or Greenwich?',
    a: 'In Downtown Stamford, street parking is free overnight outside meter hours (after 7:00 PM until 8:00 AM). In Greenwich, overnight on-street parking is permitted on residential streets, but winter snow emergency parking bans take effect during storms.'
  },
  {
    category: 'commuter',
    jurisdiction: 'CT',
    q: 'How do I pay for parking at Metro-North stations in CT?',
    a: 'Stamford Transportation Center, South Norwalk, and Greenwich Metro-North stations utilize Passport Parking, ParkMobile, or LAZ Parking permit portals for daily and commuter monthly parking.'
  },
  {
    category: 'disputes',
    jurisdiction: 'CT',
    q: 'How do I appeal a parking citation in Connecticut?',
    a: 'CT parking citations are handled through each municipality\'s Parking Violations Bureau (e.g., City of Stamford Traffic & Parking Bureau). You must submit an informal appeal or request an administrative hearing officer within 10 to 14 days of issuance.'
  },

  // ==========================================
  // NEW YORK CITY (NYC) FAQS
  // ==========================================
  {
    category: 'hydrant',
    jurisdiction: 'NYC',
    q: 'How far must I park from a fire hydrant in NYC?',
    a: 'In New York City, you must leave at least 15 FEET of clearance from any fire hydrant (NYC Traffic Rules 4-08(e)(2)), day or night, unless the driver remains seated behind the wheel with keys in the ignition ready to move.'
  },
  {
    category: 'crosswalk',
    jurisdiction: 'NYC',
    q: 'Can I park near or next to crosswalks in NYC?',
    a: 'In NYC, you may park right up to the marked crosswalk line or curb ramp (unless prohibited by a specific sign). Blocking the pedestrian ramp itself or parking within marked zebra stripes is illegal and subject to a $115 fine.'
  },
  {
    category: 'cleaning',
    jurisdiction: 'NYC',
    q: 'How does Alternate Side Parking (ASP) and Grace Period work in NYC?',
    a: 'NYC Alternate Side Parking mandates moving cars for 90-minute sweeping windows on posted days (DSNY). NYC law provides an official 5-minute grace period at start and end times, as well as for Muni-Meter expiration (NYC Admin Code § 19-161).'
  },
  {
    category: 'meters',
    jurisdiction: 'NYC',
    q: 'Which mobile app is used for metered parking in NYC?',
    a: 'ParkNYC (powered by Flowbird) is the official mobile parking app for all New York City DOT muni-metered zones across Manhattan, Brooklyn, Queens, Bronx, and Staten Island. Enter the 6-digit zone number posted on the blue ParkNYC curb signs.'
  },
  {
    category: 'commuter',
    jurisdiction: 'NYC',
    q: 'How do I pay at MTA commuter stations?',
    a: 'At MTA Long Island Rail Road (LIRR) and Metro-North stations inside NY, station parking is managed via MTA eTix / LAZ Parking or local municipal vouchers.'
  },
  {
    category: 'disputes',
    jurisdiction: 'NYC',
    q: 'How do I dispute a parking ticket in NYC?',
    a: 'NYC parking tickets are handled exclusively through the NYC Department of Finance (DOF). You can dispute online at nyc.gov/finance or via the NYC Pay or Dispute mobile app with photos within 30 days.'
  }
];
