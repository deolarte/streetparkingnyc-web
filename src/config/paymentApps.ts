export interface MobilePaymentApp {
  id: string;
  name: string;
  scheme: string; // Native iOS / Android URL scheme
  webUrl: string; // Web checkout / portal fallback
  appStoreUrl: string;
  playStoreUrl: string;
  badgeText: string;
  description: string;
  dominantFootprint: string;
}

export const PAYMENT_APPS: Record<string, MobilePaymentApp> = {
  parkmobile: {
    id: 'parkmobile',
    name: 'ParkMobile',
    scheme: 'parkmobile://',
    webUrl: 'https://parkmobile.io',
    appStoreUrl: 'https://apps.apple.com/us/app/parkmobile-find-parking/id365399299',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=net.sharewire.parkmobilev2',
    badgeText: 'Pay via ParkMobile',
    description: 'Dominant provider in East Coast, South, and Midwest metros (DC, Atlanta, Philadelphia, Miami, Dallas, Minneapolis, Denver).',
    dominantFootprint: 'East Coast, South & Midwest (DC, GA, PA, FL, TX, MN, CO)',
  },
  paybyphone: {
    id: 'paybyphone',
    name: 'PayByPhone',
    scheme: 'paybyphone://',
    webUrl: 'https://paybyphone.com',
    appStoreUrl: 'https://apps.apple.com/us/app/paybyphone-parking/id448474183',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.paybyphone',
    badgeText: 'Pay via PayByPhone',
    description: 'Dominant provider in West Coast, Pacific Northwest, and South Florida (San Francisco, Seattle, Miami Beach, Fort Lauderdale).',
    dominantFootprint: 'West Coast, PNW & South Florida (SF, Seattle, Miami Beach, FL)',
  },
  passport: {
    id: 'passport',
    name: 'Passport Parking',
    scheme: 'passportparking://',
    webUrl: 'https://passportinc.com',
    appStoreUrl: 'https://apps.apple.com/us/app/passport-parking/id501324867',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.passportparking.mobile',
    badgeText: 'Pay via Passport',
    description: 'Widely used in mid-size cities, university hubs, and suburban commuter lots (Charlotte, Austin sub-zones, Omaha, Stamford).',
    dominantFootprint: 'Mid-size cities, University hubs, CT & NC (Charlotte, Omaha, Stamford)',
  },
  flowbird: {
    id: 'flowbird',
    name: 'ParkNYC / Flowbird',
    scheme: 'flowbird://',
    webUrl: 'https://www.parknyc.org',
    appStoreUrl: 'https://apps.apple.com/us/app/parknyc/id1612739433',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.flowbird.parknyc',
    badgeText: 'Pay via ParkNYC',
    description: 'Official payment provider for all 5 NYC boroughs, select Boston areas, and transit authorities.',
    dominantFootprint: 'New York City (5 Boroughs), Boston & select transit',
  },
  parkchicago: {
    id: 'parkchicago',
    name: 'ParkChicago',
    scheme: 'parkchicago://',
    webUrl: 'https://parkchicago.com',
    appStoreUrl: 'https://apps.apple.com/us/app/parkchicago/id848981682',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.passportparking.mobile.parkchicago',
    badgeText: 'Pay via ParkChicago',
    description: 'Official street meter payment app for the City of Chicago and Cook County metered zones.',
    dominantFootprint: 'City of Chicago & Cook County, IL',
  },
  parkhouston: {
    id: 'parkhouston',
    name: 'ParkHouston',
    scheme: 'parkhouston://',
    webUrl: 'https://www.houstontx.gov/parking/',
    appStoreUrl: 'https://apps.apple.com/us/app/parkmobile-find-parking/id365399299',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=net.sharewire.parkmobilev2',
    badgeText: 'Pay via ParkHouston',
    description: 'Official curbside meter management across Downtown Houston, Midtown, and Washington Corridor.',
    dominantFootprint: 'Houston, TX Metro & Theatre District',
  },
  spothero: {
    id: 'spothero',
    name: 'SpotHero',
    scheme: 'spothero://',
    webUrl: 'https://spothero.com',
    appStoreUrl: 'https://apps.apple.com/us/app/spothero-parking-deals/id499097243',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.spothero.spothero',
    badgeText: 'Reserve via SpotHero',
    description: 'Nationwide off-street parking reservations for garages, valet facilities, and airport lots.',
    dominantFootprint: 'Nationwide Off-Street Garages & Airport Lots (All 50 States)',
  },
  njtransit: {
    id: 'njtransit',
    name: 'NJ Transit Mobile',
    scheme: 'njtransit://',
    webUrl: 'https://www.njtransit.com/app',
    appStoreUrl: 'https://apps.apple.com/us/app/nj-transit-mobile-app/id589549924',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.njtransit.mobile',
    badgeText: 'NJ Transit Commuter Parking',
    description: 'Daily permit and mobile pay across all NJ Transit commuter rail and light rail station lots.',
    dominantFootprint: 'New Jersey Commuter Rail & Station Park & Ride Facilities',
  },
  meterup: {
    id: 'meterup',
    name: 'meterUP / Philadelphia Parking Authority',
    scheme: 'meterup://',
    webUrl: 'https://philapark.org/meterup/',
    appStoreUrl: 'https://apps.apple.com/us/app/meterup/id1052601962',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.parkmobile.ppa',
    badgeText: 'Pay via meterUP (PPA)',
    description: 'Official street parking payment app for the Philadelphia Parking Authority (PPA).',
    dominantFootprint: 'Philadelphia, PA & Montgomery/Bucks County',
  },
  parkcolumbus: {
    id: 'parkcolumbus',
    name: 'ParkColumbus',
    scheme: 'parkmobile://',
    webUrl: 'https://parkcolumbus.parkmobile.io',
    appStoreUrl: 'https://apps.apple.com/us/app/parkcolumbus/id1450201639',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.parkmobile.columbus',
    badgeText: 'Pay via ParkColumbus',
    description: 'Official street parking payment app for the City of Columbus, Ohio Department of Public Service.',
    dominantFootprint: 'Columbus, OH (Downtown, Short North, German Village, University District)',
  },
};
