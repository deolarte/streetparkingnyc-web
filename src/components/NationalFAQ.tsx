import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronDown,
  ExternalLink,
  Car,
  Sparkles,
  MapPin,
  Flame,
  Snowflake,
  CreditCard,
  Scale,
} from 'lucide-react';
import {
  STATE_REGISTRY,
  type StateProfile,
  type CityProfile,
} from '../config/nationalRegistry';

interface NationalFAQProps {
  activeState: string;
  activeCity: string | null;
}

interface FAQItem {
  id: string;
  category: 'curb_colors' | 'hydrants_crosswalks' | 'payment_apps' | 'bans_sweeping' | 'disputes';
  scope: 'all' | string; // 'all', or stateCode like 'NY', 'NJ', 'CA', 'IL', 'TX', 'FL', 'DC', 'PA'
  cityName?: string;
  question: string;
  answer: string;
  tags: string[];
  link?: { text: string; url: string };
}

const CATEGORY_TABS: Array<{ id: string; label: string; icon: any }> = [
  { id: 'all_cat', label: 'All Topics', icon: Sparkles },
  { id: 'curb_colors', label: 'Curb Colors & Paint', icon: Car },
  { id: 'hydrants_crosswalks', label: 'Hydrants & Crosswalks', icon: Flame },
  { id: 'payment_apps', label: 'Meters & Payment Apps', icon: CreditCard },
  { id: 'bans_sweeping', label: 'Winter & Storage Bans', icon: Snowflake },
  { id: 'disputes', label: 'Ticket Disputes & Courts', icon: Scale },
];

const NATIONAL_FAQ_DATA: FAQItem[] = [
  // 1. Curb Colors & Markings
  {
    id: 'curb-universal-colors',
    category: 'curb_colors',
    scope: 'all',
    question: 'What do the 4 parking status colors mean on StreetParkingUSA?',
    answer:
      'StreetParkingUSA standardizes street parking into 4 real-time status colors nationwide:\n\n• 🟢 Green (Legal Free Parking): Unrestricted public street parking with no active street cleaning, permit windows, or meter fees.\n• 🔴 Red (Restricted / Prohibited): No parking, active street sweeping window, tow-away lane, or within illegal distance of a hydrant/crosswalk.\n• 🟡 Yellow (Impending / Buffer): Restriction beginning within 45–60 minutes, or an active 5-minute meter grace window.\n• 🔵 Blue (Metered / Pay Zone): Active pay-by-cell or municipal meter zone.',
    tags: ['colors', 'green', 'red', 'yellow', 'blue', 'map', 'status'],
  },
  {
    id: 'curb-paint-standards',
    category: 'curb_colors',
    scope: 'all',
    question: 'What do colored curb paint markings mean in California and nationwide?',
    answer:
      'Many US jurisdictions (especially California under CVC 21458, Washington, and Florida) paint curb faces with standard colors:\n\n• 🔴 Red Curb: No stopping, standing, or parking at any time under any circumstance (except buses at marked bus stops).\n• ⚪ White Curb: Passenger loading and unloading only (typically 3–5 minute maximum dwell).\n• 🟢 Green Curb: Short-term parking only (typically 10 to 20 minutes) during daytime posted business hours.\n• 🟡 Yellow Curb: Commercial loading zone for delivery trucks during business hours; passenger vehicles permitted outside posted loading hours.\n• 🔵 Blue Curb: Reserved exclusively for vehicles displaying a valid state disability placard or license plate.',
    tags: ['paint', 'curb colors', 'red curb', 'green curb', 'white curb', 'yellow curb', 'blue curb', 'california'],
  },
  {
    id: 'curb-wheel-cramping',
    category: 'curb_colors',
    scope: 'CA',
    question: 'What is mandatory wheel cramping on hills in California?',
    answer:
      'Under California Vehicle Code (CVC § 22500) and municipal codes in San Francisco, Los Angeles, and San Diego, you MUST turn your front wheels into the curb when parked on any grade exceeding 3%:\n\n• Facing Downhill: Turn front wheels toward the curb (to the right) and let the car roll gently until the tire touches the curb.\n• Facing Uphill with Curb: Turn front wheels away from the curb (to the left) so the back of the tire rests against the curb.\n• Facing Uphill without Curb: Turn front wheels to the right (toward the street edge).\n\nFailure to cramp wheels on SF hills results in an immediate $74 citation.',
    tags: ['wheel cramping', 'hills', 'san francisco', 'california', 'cvc 22500'],
  },

  // 2. Hydrants & Crosswalks
  {
    id: 'hydrant-state-statutes',
    category: 'hydrants_crosswalks',
    scope: 'all',
    question: 'How far must I park from a fire hydrant across different states?',
    answer:
      'Fire hydrant clearances vary by state statute:\n\n• New York City (34 RCNY § 4-08): Strict 15 FEET clearance in all directions from the hydrant barrel (even if lines are not painted).\n• New Jersey (N.J.S.A. 39:4-138): 10 FEET clearance.\n• Connecticut (CGS § 14-251): 10 FEET clearance.\n• California (CVC 22500e): 15 FEET clearance.\n• Texas (Transp. Code § 545.302): 15 FEET clearance.\n• Illinois (625 ILCS 5/11-1303): 15 FEET clearance.\n• District of Columbia (18 DCMR § 2405): 10 FEET clearance.\n• Florida & Pennsylvania: 15 FEET clearance.',
    tags: ['hydrant', 'distance', 'feet', 'fire hydrant', 'rules'],
  },
  {
    id: 'crosswalk-nj-daylighting',
    category: 'hydrants_crosswalks',
    scope: 'NJ',
    question: 'What is New Jersey’s 25-Foot Crosswalk Daylighting Law (Title 39)?',
    answer:
      'Under New Jersey Statute N.J.S.A. 39:4-138(e), parking is prohibited within 25 FEET of the nearest line of a crosswalk or an intersection curb line. In towns like Hoboken and Jersey City, this daylighting rule is strictly enforced to preserve pedestrian sightlines for crossing children and pedestrians. Never park closer than 25 feet to any corner or crosswalk in NJ, even if the curb has no yellow paint.',
    tags: ['daylighting', 'new jersey', 'crosswalk', '25 feet', 'hoboken', 'jersey city'],
  },
  {
    id: 'crosswalk-nyc-rules',
    category: 'hydrants_crosswalks',
    scope: 'NY',
    cityName: 'New York City',
    question: 'Can you park right up to the crosswalk in New York City?',
    answer:
      'Yes! Under NYC Department of Transportation rules (34 RCNY § 4-08), you are permitted to park right up to the edge of an unmarked intersection or marked crosswalk line, provided you do not block the pedestrian wheelchair ramp or park within painted zebra stripes. Unlike NJ, NYC does not have a 25-foot statutory crosswalk setback.',
    tags: ['crosswalk', 'nyc', 'manhattan', 'dot', 'ramp'],
  },
  {
    id: 'crosswalk-tx-il-fl',
    category: 'hydrants_crosswalks',
    scope: 'all',
    question: 'What are the crosswalk and stop sign setbacks in Texas, Illinois, and Florida?',
    answer:
      'Under state statutory codes in Texas (§ 545.302), Illinois (5/11-1303), and Florida (§ 316.1945):\n\n• Crosswalks: Minimum 20 FEET from the nearest crosswalk at an intersection.\n• Stop Signs & Traffic Signals: Minimum 30 FEET from any official stop sign, yield sign, or flashing traffic signal.\n• Fire Station Driveways: Minimum 20 FEET on the same side, and 75 FEET on the opposite side of the street.',
    tags: ['stop sign', 'texas', 'illinois', 'florida', '20 feet', '30 feet'],
  },

  // 3. Payment & Mobile Apps
  {
    id: 'payment-operator-map',
    category: 'payment_apps',
    scope: 'all',
    question: 'Which mobile payment app operates street meters in each city?',
    answer:
      'Over 90% of US municipal curbs are divided among primary operators:\n\n• ParkMobile: Washington D.C., Atlanta, Philadelphia (meterUP), Dallas, Miami, Minneapolis, Denver, and Northern New Jersey.\n• PayByPhone: San Francisco (SFpark), Seattle (SDOT), Miami Beach, Fort Lauderdale, and Vancouver.\n• Flowbird / ParkNYC: New York City (all 5 boroughs), Boston (ParkBoston sub-zones), and Los Angeles transit lots.\n• Passport Parking: Charlotte, Austin (select retail areas), Omaha, and Stamford, CT.\n• ParkChicago: City of Chicago on-street meters.\n• SpotHero: Nationwide for guaranteed garage, valet, and off-street lot reservations across all 50 states.',
    tags: ['apps', 'parkmobile', 'paybyphone', 'flowbird', 'passport', 'parkchicago', 'spothero'],
  },
  {
    id: 'payment-parknyc-zones',
    category: 'payment_apps',
    scope: 'NY',
    cityName: 'New York City',
    question: 'How do ParkNYC Muni-Meter zones work in New York City?',
    answer:
      'Every metered block in NYC is marked with 6-digit zone signs (e.g. Zone #106884). Open ParkNYC (or use StreetParkingUSA\'s "Pay on ParkNYC" button) and input your vehicle plate and the 6-digit zone. NYC DOT provides an official 5-minute grace period after your paid meter session expires before traffic enforcement agents can issue a summons.',
    tags: ['parknyc', 'flowbird', 'grace period', '5 minutes', 'zone', 'muni-meter'],
  },
  {
    id: 'payment-transit-lots',
    category: 'payment_apps',
    scope: 'NJ',
    question: 'How do I pay for NJ Transit commuter station parking?',
    answer:
      'NJ Transit station commuter lots are managed via the NJ Transit Mobile App under the "Station Parking" tab, or via ParkMobile using the posted 5-digit station code. Commuter rail lots generally require payment starting at 6:00 AM on weekdays.',
    tags: ['nj transit', 'commuter', 'rail', 'parkmobile', 'new jersey'],
  },

  // 4. Overnight & Winter Bans
  {
    id: 'winter-chicago-overnight',
    category: 'bans_sweeping',
    scope: 'IL',
    cityName: 'Chicago',
    question: 'What is Chicago’s Winter Overnight Parking Ban (Dec 1 – Apr 1)?',
    answer:
      'Chicago enforces an annual Winter Overnight Parking Ban from December 1 to April 1 between 3:00 AM and 7:00 AM on 107 miles of primary arterial streets, REGARDLESS of whether there is snow on the ground.\n\nViolating vehicles are ticketed $60, towed ($150 minimum fee), and charged $25/day storage. Furthermore, a separate 2-Inch Snow Ban activates on an additional 500 miles of main streets whenever 2+ inches of snow falls.',
    tags: ['chicago', 'winter ban', 'overnight ban', 'december 1', 'snow', 'towing'],
  },
  {
    id: 'storage-california-72hr',
    category: 'bans_sweeping',
    scope: 'CA',
    question: 'What is California’s statewide 72-hour street storage law?',
    answer:
      'Under California Vehicle Code (CVC § 22651k), no vehicle may remain parked on any public street in the same exact location for more than 72 consecutive hours. Municipal parking enforcement marks tires with chalk or digital tire scans; vehicles that have not moved after 72 hours receive a warning or are immediately towed as abandoned property.',
    tags: ['72 hours', 'california', 'storage', 'abandoned', 'towing', 'cvc 22651'],
  },
  {
    id: 'winter-boston-emergency',
    category: 'bans_sweeping',
    scope: 'MA',
    cityName: 'Boston',
    question: 'How do Boston Snow Emergency routes and Space Savers work?',
    answer:
      'During declared snow emergencies in Boston, parking is strictly banned on designated emergency arteries posted with blue and red snow route signs. Vehicles on these routes are immediately towed by the Boston Transportation Department (BTD).\n\nSpace Savers (chairs, cones) are culturally permitted in cleared spots in residential neighborhoods (South Boston, Charlestown) for up to 48 hours AFTER the snow emergency officially ends.',
    tags: ['boston', 'snow emergency', 'space savers', 'massachusetts'],
  },
  {
    id: 'sweeping-nyc-asp',
    category: 'bans_sweeping',
    scope: 'NY',
    cityName: 'New York City',
    question: 'What are the rules for Alternate Side Parking (ASP) street sweeping in NYC?',
    answer:
      'Alternate Side Parking (ASP) signs display a sanitation broom symbol and restrict parking for 90 minutes (e.g. Tuesday & Friday 8:30 AM–10:00 AM) so DSNY street sweepers can clean the curb. You cannot leave a vehicle unattended during the restriction window. ASP is suspended on major legal holidays and during winter storm operations.',
    tags: ['alternate side', 'asp', 'street sweeping', 'nyc', 'sanitation broom'],
  },

  // 5. Ticket Disputes
  {
    id: 'dispute-nyc-dof',
    category: 'disputes',
    scope: 'NY',
    cityName: 'New York City',
    question: 'How do I dispute a parking ticket in New York City?',
    answer:
      'NYC parking summonses are adjudicated administratively by the NYC Department of Finance (DOF). You have 30 days from issuance to contest the ticket online via the NYC DOF Dispute Portal or the NYC Pay or Dispute mobile app without penalty. Evidence such as Muni-Meter receipts, GPS timestamps, and street sign photos can be uploaded directly.',
    tags: ['dispute', 'nyc', 'department of finance', 'dof', 'contest', 'court'],
    link: {
      text: 'NYC DOF Dispute Portal',
      url: 'https://www.nyc.gov/site/finance/vehicles/dispute-a-ticket.page',
    },
  },
  {
    id: 'dispute-nj-courts',
    category: 'disputes',
    scope: 'NJ',
    question: 'How do I dispute a parking ticket in New Jersey (NJMCdirect)?',
    answer:
      'New Jersey parking summonses are handled by local municipal courts (e.g. Jersey City Municipal Court, Hoboken Municipal Court) rather than administrative agencies. You can review violation details and enter a plea online via the state judicial portal NJMCdirect (njcourts.gov).',
    tags: ['njmcdirect', 'new jersey', 'municipal court', 'dispute'],
    link: {
      text: 'NJMCdirect / NJ Courts Portal',
      url: 'https://www.njcourts.gov/municipal-courts',
    },
  },
  {
    id: 'dispute-sf-sfmta',
    category: 'disputes',
    scope: 'CA',
    cityName: 'San Francisco',
    question: 'How do I contest a parking citation in San Francisco (SFMTA)?',
    answer:
      'SFMTA provides a 3-tier citation dispute process: 1) Initial administrative review (free online contest within 21 days), 2) Administrative hearing (in-person or by mail/phone with an independent hearing officer), and 3) Superior Court appeal.',
    tags: ['sfmta', 'san francisco', 'contest', 'citation'],
    link: {
      text: 'SFMTA Citation Adjudication Portal',
      url: 'https://www.sfmta.com/getting-around/drive-park/citations-and-fines',
    },
  },
  {
    id: 'dispute-chicago-dof',
    category: 'disputes',
    scope: 'IL',
    cityName: 'Chicago',
    question: 'How do I contest a parking ticket in Chicago?',
    answer:
      'City of Chicago parking tickets can be contested within 21 days online through the City of Chicago Department of Finance citation portal, or by requesting an administrative hearing before an administrative law judge at one of Chicago\'s central hearing facilities.',
    tags: ['chicago', 'department of finance', 'contest ticket'],
    link: {
      text: 'City of Chicago Ticket Adjudication',
      url: 'https://www.chicago.gov/city/en/depts/fin/provdrs/parking_citation.html',
    },
  },
  {
    id: 'dispute-philly-ppa',
    category: 'disputes',
    scope: 'PA',
    cityName: 'Philadelphia',
    question: 'How do I dispute a Philadelphia Parking Authority (PPA) ticket?',
    answer:
      'Philadelphia parking tickets are adjudicated through the City of Philadelphia Bureau of Administrative Adjudication (BAA), not the PPA directly. You can submit an online appeal with photo evidence within 30 days of citation issuance.',
    tags: ['philadelphia', 'ppa', 'baa', 'appeal'],
    link: {
      text: 'Philadelphia BAA Dispute Portal',
      url: 'https://philapark.org/dispute/',
    },
  },
  {
    id: 'dispute-dc-dmv',
    category: 'disputes',
    scope: 'DC',
    cityName: 'Washington, D.C.',
    question: 'How do I contest a parking ticket in Washington, D.C.?',
    answer:
      'DC parking tickets must be contested within 120 calendar days through the District Department of Motor Vehicles (DC DMV) Adjudication Services. Contests can be completed online with submitted documentation.',
    tags: ['dc', 'dmv', 'washington dc', 'adjudication'],
    link: {
      text: 'DC DMV Citation Adjudication',
      url: 'https://dmv.dc.gov/service/contest-parking-violations',
    },
  },
];

export const NationalFAQ: React.FC<NationalFAQProps> = ({
  activeState,
  activeCity,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all_cat');
  const [scopeFilter, setScopeFilter] = useState<'all' | 'state' | 'city'>('state');
  const [expandedId, setExpandedId] = useState<string | null>('curb-universal-colors');

  const activeStateObj: StateProfile | undefined = STATE_REGISTRY[activeState];
  const activeCityObj: CityProfile | undefined =
    activeStateObj && activeCity ? activeStateObj.cities[activeCity] : undefined;

  const filteredItems = useMemo(() => {
    return NATIONAL_FAQ_DATA.filter((item) => {
      // 1. Category match
      if (selectedCategory !== 'all_cat' && item.category !== selectedCategory) {
        return false;
      }

      // 2. Scope match
      if (scopeFilter === 'state') {
        if (item.scope !== 'all' && item.scope !== activeState) return false;
      } else if (scopeFilter === 'city') {
        if (item.cityName && activeCityObj && !item.cityName.toLowerCase().includes(activeCityObj.cityName.toLowerCase())) {
          return false;
        }
        if (item.scope !== 'all' && item.scope !== activeState) return false;
      }

      // 3. Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchQ = item.question.toLowerCase().includes(q);
        const matchA = item.answer.toLowerCase().includes(q);
        const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchQ && !matchA && !matchTags) return false;
      }

      return true;
    });
  }, [selectedCategory, scopeFilter, searchQuery, activeState, activeCityObj]);

  return (
    <div className="space-y-4">
      {/* Search Header */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search parking rules in ${activeStateObj?.stateName || 'the US'}...`}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs text-gray-900 dark:text-gray-100 placeholder-gray-400 border border-gray-200 dark:border-gray-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
          >
            Clear
          </button>
        )}
      </div>

      {/* Scope Filter Pills */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px] font-bold">
        <button
          onClick={() => setScopeFilter('state')}
          className={`px-3 py-1.5 rounded-lg shrink-0 flex items-center space-x-1 transition-all ${
            scopeFilter === 'state'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <MapPin className="w-3 h-3" />
          <span>{activeStateObj?.stateName || activeState} Rules</span>
        </button>

        {activeCityObj && (
          <button
            onClick={() => setScopeFilter('city')}
            className={`px-3 py-1.5 rounded-lg shrink-0 flex items-center space-x-1 transition-all ${
              scopeFilter === 'city'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span>{activeCityObj.cityName}</span>
          </button>
        )}

        <button
          onClick={() => setScopeFilter('all')}
          className={`px-3 py-1.5 rounded-lg shrink-0 transition-all ${
            scopeFilter === 'all'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <span>All USA (50 States)</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
        {CATEGORY_TABS.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1.5 rounded-lg shrink-0 flex items-center space-x-1 font-medium transition-colors ${
                isSelected
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'bg-gray-50 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300 border border-gray-200/60 dark:border-gray-700/60 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Accordion FAQ Items */}
      <div className="space-y-2 pt-1">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200/60 dark:border-gray-700/60">
            No matching parking questions found. Try searching a different keyword or switch to &quot;All USA&quot;.
          </div>
        ) : (
          filteredItems.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-xl border border-gray-200/80 dark:border-gray-700/80 bg-white dark:bg-gray-800/50 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="w-full px-3.5 py-3 text-left flex items-start justify-between gap-3 hover:bg-gray-50/80 dark:hover:bg-gray-700/30 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1.5">
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        {item.scope === 'all' ? 'USA' : item.scope}
                      </span>
                      {item.cityName && (
                        <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">
                          {item.cityName}
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 leading-snug">
                      {item.question}
                    </h4>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 shrink-0 mt-0.5 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-3.5 pb-3.5 pt-1 border-t border-gray-100 dark:border-gray-700/50 space-y-3">
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {item.answer}
                    </p>

                    {item.link && (
                      <div className="pt-1">
                        <a
                          href={item.link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          <span>{item.link.text}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
