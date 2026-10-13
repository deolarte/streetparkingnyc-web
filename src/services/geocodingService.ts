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
    // Query ArcGIS World Geocoding Service with Tri-State bounding box and proximity center
    const url =
      'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?' +
      new URLSearchParams({
        SingleLine: trimmed,
        location: '-73.9851,40.7484', // Tri-State Proximity Center (Midtown)
        searchExtent: '-74.80,40.15,-72.80,41.50', // Full Tri-State boundary (NY, NJ, CT)
        f: 'json',
        maxLocations: '8',
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
