export interface AddressCandidate {
  address: string;
  shortAddress: string;
  center: [number, number]; // [lng, lat]
  score?: number;
}

const geocodeCache = new Map<string, AddressCandidate[]>();

/**
 * Geocode NYC addresses, cross streets, and landmarks.
 * Prioritizes New York City boroughs (Manhattan, Brooklyn, Queens, Bronx, Staten Island).
 */
export async function searchNycAddress(query: string): Promise<AddressCandidate[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) return [];

  const cacheKey = trimmed.toLowerCase();
  if (geocodeCache.has(cacheKey)) {
    return geocodeCache.get(cacheKey)!;
  }

  try {
    const hasNycContext = /(new york|nyc|ny|manhattan|brooklyn|queens|bronx|staten island|astoria|flushing|harlem)/i.test(
      trimmed
    );
    const searchQuery = hasNycContext ? trimmed : `${trimmed}, New York, NY`;

    // Query ArcGIS World Geocoding Service with NYC bounding box and proximity center
    const url =
      'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?' +
      new URLSearchParams({
        SingleLine: searchQuery,
        location: '-74.006,40.7128', // Lower Manhattan center for proximity bias
        searchExtent: '-74.26,40.49,-73.70,40.92', // NYC 5 Boroughs boundary
        f: 'json',
        maxLocations: '6',
        outFields: 'Match_addr,Addr_type',
      }).toString();

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Geocode HTTP ${res.status}`);

    const data = await res.json();
    if (!data.candidates || !Array.isArray(data.candidates)) {
      return [];
    }

    const results: AddressCandidate[] = data.candidates
      .filter((c: any) => c.location && Number.isFinite(c.location.x) && Number.isFinite(c.location.y))
      .map((c: any) => {
        const fullAddr = c.address || '';
        const parts = fullAddr.split(',');
        const short = parts.length > 1 ? `${parts[0].trim()}, ${parts[1].trim()}` : fullAddr;
        return {
          address: fullAddr,
          shortAddress: short,
          center: [Number(c.location.x), Number(c.location.y)],
          score: c.score,
        };
      });

    geocodeCache.set(cacheKey, results);
    return results;
  } catch (err) {
    console.warn('Geocoding error, falling back:', err);
    return [];
  }
}
