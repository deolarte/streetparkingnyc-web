// NYC Weather & 311 Advisory Service (NWS Alerts + NYC 311 Portal integration)

export interface StormAlert {
  hasStormAlert: boolean;
  event: string | null;
  headline: string;
  severity?: string;
  description?: string;
  aspAdvice: string;
  portalUrl: string;
}

// Cached state to prevent spamming the NWS API
let cachedAlert: StormAlert | null = null;
let lastFetchTime = 0;
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

export async function fetchNycStormAdvisory(): Promise<StormAlert> {
  const now = Date.now();
  if (cachedAlert && now - lastFetchTime < CACHE_DURATION_MS) {
    return cachedAlert;
  }

  const defaultNormal: StormAlert = {
    hasStormAlert: false,
    event: null,
    headline: 'NYC City Services Operating Normally',
    aspAdvice: 'Follow standard posted signs & Alternate Side Parking rules. Check meters locally.',
    portalUrl: 'https://portal.311.nyc.gov/',
  };

  try {
    // Official National Weather Service (NWS) free alerts endpoint for NYC zones:
    // NYZ072 (Manhattan), NYZ073 (Bronx), NYZ074 (Staten Island), NYZ075 (Brooklyn), NYZ176 (N. Queens), NYZ178 (S. Queens)
    const res = await fetch(
      'https://api.weather.gov/alerts/active?zone=NYZ072,NYZ073,NYZ074,NYZ075,NYZ176,NYZ178',
      {
        headers: {
          'Accept': 'application/geo+json',
        },
      }
    );

    if (!res.ok) {
      cachedAlert = defaultNormal;
      lastFetchTime = now;
      return defaultNormal;
    }

    const data = await res.json();
    const features = data?.features || [];

    // Check for severe weather events that trigger NYC emergency ASP suspensions (Winter storms, snow, floods, blizzards)
    const severeStorm = features.find((f: any) => {
      const ev = (f?.properties?.event || '').toLowerCase();
      return (
        ev.includes('winter') ||
        ev.includes('snow') ||
        ev.includes('blizzard') ||
        ev.includes('ice') ||
        ev.includes('freeze') ||
        ev.includes('flood') ||
        ev.includes('storm')
      );
    });

    if (severeStorm && severeStorm.properties) {
      const props = severeStorm.properties;
      const isWinterSnow = (props.event || '').toLowerCase().includes('winter') || (props.event || '').toLowerCase().includes('snow');

      cachedAlert = {
        hasStormAlert: true,
        event: props.event || 'Severe Weather Advisory',
        headline: props.headline || `${props.event} in effect for NYC area`,
        severity: props.severity || 'Moderate',
        description: props.description || '',
        aspAdvice: isWinterSnow
          ? '❄️ DSNY Snow Operations: Alternate Side Parking (ASP) may be suspended citywide for plowing. Meters generally remain in effect unless explicitly suspended.'
          : '⚠️ Severe Weather Advisory: Check official NYC 311 notices for sudden parking and street regulation changes.',
        portalUrl: 'https://portal.311.nyc.gov/',
      };
      lastFetchTime = now;
      return cachedAlert;
    }

    cachedAlert = defaultNormal;
    lastFetchTime = now;
    return defaultNormal;
  } catch (err) {
    console.warn('Could not fetch NWS weather advisory:', err);
    return defaultNormal;
  }
}
