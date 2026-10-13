export interface AddressCandidate {
  address: string;
  shortAddress: string;
  center: [number, number]; // [lng, lat]
  score?: number;
}

const geocodeCache = new Map<string, AddressCandidate[]>();

/**
 * Geocode nationwide US addresses, intersections, and landmarks.
 * Prioritizes the active metro or map center when proximityCenter is provided,
 * while seamlessly searching across the entire USA.
 */
export async function searchAddress(
  query: string,
  proximityCenter?: [number, number]
): Promise<AddressCandidate[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) return [];

  const centerKey = proximityCenter ? `${proximityCenter[0].toFixed(2)},${proximityCenter[1].toFixed(2)}` : 'default';
  const cacheKey = `${trimmed.toLowerCase()}|${centerKey}`;
  if (geocodeCache.has(cacheKey)) {
    return geocodeCache.get(cacheKey)!;
  }

  try {
    const params = new URLSearchParams({
      SingleLine: trimmed,
      sourceCountry: 'USA',
      f: 'json',
      maxLocations: '8',
      outFields: 'Match_addr,Addr_type',
    });

    if (proximityCenter && Number.isFinite(proximityCenter[0]) && Number.isFinite(proximityCenter[1])) {
      params.set('location', `${proximityCenter[0]},${proximityCenter[1]}`);
    } else {
      params.set('location', '-73.9851,40.7484'); // NYC default proximity
    }

    const url = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?${params.toString()}`;

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

/**
 * Backward compatibility alias for searchAddress
 */
export const searchNycAddress = searchAddress;

