import type { FeatureCollection, Polygon } from 'geojson';

export interface CoverageZone {
  id: string;
  name: string;
  shortName: string;
  stateCode: string;
  boundaryLabel: string;
  coordinates: [number, number][][]; // Polygon exterior ring [lng, lat]
  center: [number, number];
}

export const COVERAGE_ZONES: CoverageZone[] = [
  // 1. New York City (5 Boroughs)
  {
    id: 'zone-nyc',
    name: 'New York City (5 Boroughs)',
    shortName: 'NYC Live Zone',
    stateCode: 'NY',
    boundaryLabel: 'LIVE SURVEYED COVERAGE: NYC 5 BOROUGHS',
    center: [-73.9851, 40.7484],
    coordinates: [[
      [-74.260, 40.490],
      [-74.260, 40.650],
      [-74.020, 40.700],
      [-74.020, 40.880],
      [-73.910, 40.920],
      [-73.740, 40.850],
      [-73.680, 40.620],
      [-73.750, 40.560],
      [-74.150, 40.490],
      [-74.260, 40.490],
    ]],
  },

  // 2. Jersey City & Hoboken (NJ)
  {
    id: 'zone-jc-hoboken',
    name: 'Jersey City & Hoboken Waterfront',
    shortName: 'Jersey City / Hoboken',
    stateCode: 'NJ',
    boundaryLabel: 'LIVE SURVEYED COVERAGE: JERSEY CITY & HOBOKEN',
    center: [-74.0431, 40.7214],
    coordinates: [[
      [-74.068, 40.708],
      [-74.068, 40.752],
      [-74.018, 40.752],
      [-74.018, 40.708],
      [-74.068, 40.708],
    ]],
  },

  // 3. Greater Los Angeles (DTLA, Echo Park, Dodger Stadium)
  {
    id: 'zone-la-metro',
    name: 'Downtown Los Angeles & Surrounding',
    shortName: 'Los Angeles Metro',
    stateCode: 'CA',
    boundaryLabel: 'LIVE SURVEYED COVERAGE: DOWNTOWN LOS ANGELES',
    center: [-118.255, 34.050],
    coordinates: [[
      [-118.285, 34.025],
      [-118.285, 34.090],
      [-118.225, 34.090],
      [-118.225, 34.025],
      [-118.285, 34.025],
    ]],
  },

  // 4. Miami & Brickell (FL)
  {
    id: 'zone-miami',
    name: 'Miami (Downtown, Brickell & Little Havana)',
    shortName: 'Miami / Brickell',
    stateCode: 'FL',
    boundaryLabel: 'LIVE SURVEYED COVERAGE: MIAMI & BRICKELL',
    center: [-80.193, 25.770],
    coordinates: [[
      [-80.240, 25.750],
      [-80.240, 25.820],
      [-80.175, 25.820],
      [-80.175, 25.750],
      [-80.240, 25.750],
    ]],
  },

  // 5. San Francisco (SFMTA Core)
  {
    id: 'zone-sf',
    name: 'San Francisco (Downtown, SoMa & Waterfront)',
    shortName: 'San Francisco Core',
    stateCode: 'CA',
    boundaryLabel: 'LIVE SURVEYED COVERAGE: SAN FRANCISCO CORE',
    center: [-122.408, 37.785],
    coordinates: [[
      [-122.435, 37.765],
      [-122.435, 37.818],
      [-122.380, 37.818],
      [-122.380, 37.765],
      [-122.435, 37.765],
    ]],
  },

  // 6. Chicago (The Loop & River North)
  {
    id: 'zone-chicago',
    name: 'Chicago (The Loop & River North)',
    shortName: 'Chicago Loop',
    stateCode: 'IL',
    boundaryLabel: 'LIVE SURVEYED COVERAGE: CHICAGO THE LOOP',
    center: [-87.6298, 41.882],
    coordinates: [[
      [-87.658, 41.865],
      [-87.658, 41.910],
      [-87.605, 41.910],
      [-87.605, 41.865],
      [-87.658, 41.865],
    ]],
  },

  // 7. Austin (Downtown & Congress)
  {
    id: 'zone-austin',
    name: 'Austin (Downtown & Congress Ave)',
    shortName: 'Austin Downtown',
    stateCode: 'TX',
    boundaryLabel: 'LIVE SURVEYED COVERAGE: AUSTIN DOWNTOWN',
    center: [-97.7431, 30.2672],
    coordinates: [[
      [-97.765, 30.252],
      [-97.765, 30.295],
      [-97.725, 30.295],
      [-97.725, 30.252],
      [-97.765, 30.252],
    ]],
  },

  // 8. Washington, D.C. (Penn Quarter & Downtown)
  {
    id: 'zone-dc',
    name: 'Washington, D.C. (Penn Quarter & Core)',
    shortName: 'Washington D.C.',
    stateCode: 'DC',
    boundaryLabel: 'LIVE SURVEYED COVERAGE: WASHINGTON D.C.',
    center: [-77.0369, 38.8951],
    coordinates: [[
      [-77.050, 38.885],
      [-77.050, 38.920],
      [-77.005, 38.920],
      [-77.005, 38.885],
      [-77.050, 38.885],
    ]],
  },
];

/**
 * GeoJSON FeatureCollection representation for MapLibre layer rendering
 */
export const COVERAGE_ZONES_GEOJSON: FeatureCollection<Polygon> = {
  type: 'FeatureCollection',
  features: COVERAGE_ZONES.map((z) => ({
    type: 'Feature',
    id: z.id,
    properties: {
      id: z.id,
      name: z.name,
      shortName: z.shortName,
      stateCode: z.stateCode,
      boundaryLabel: z.boundaryLabel,
    },
    geometry: {
      type: 'Polygon',
      coordinates: z.coordinates,
    },
  })),
};

/**
 * Point-in-polygon ray-casting algorithm to test if a coordinate [lng, lat] is inside a zone
 */
export function findActiveCoverageZone(lng: number, lat: number): CoverageZone | null {
  for (const zone of COVERAGE_ZONES) {
    const ring = zone.coordinates[0];
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const xi = ring[i][0];
      const yi = ring[i][1];
      const xj = ring[j][0];
      const yj = ring[j][1];

      const intersect =
        yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    if (inside) return zone;
  }
  return null;
}
