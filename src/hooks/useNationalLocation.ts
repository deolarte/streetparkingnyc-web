import { useState, useEffect, useCallback } from 'react';
import {
  STATE_REGISTRY,
  ALL_US_STATES,
  resolveJurisdiction,
} from '../config/nationalRegistry';

const STORAGE_STATE_KEY = 'streetpark_active_state';
const STORAGE_CITY_KEY = 'streetpark_active_city';

// In-memory reverse geocoding cache (lat,lon rounded to 2 decimals)
const geoCache = new Map<string, { stateCode: string; cityName?: string }>();

// Quick coordinate bounding boxes for instant offline state resolution
function estimateStateFromCoords(lat: number, lng: number): string | null {
  // California
  if (lat >= 32.5 && lat <= 42.0 && lng >= -124.5 && lng <= -114.1) return 'CA';
  // New York
  if (lat >= 40.5 && lat <= 45.0 && lng >= -79.8 && lng <= -71.8) return 'NY';
  // New Jersey
  if (lat >= 38.9 && lat <= 41.4 && lng >= -75.6 && lng <= -73.9) return 'NJ';
  // Connecticut
  if (lat >= 40.98 && lat <= 42.05 && lng >= -73.73 && lng <= -71.79) return 'CT';
  // Illinois
  if (lat >= 36.97 && lat <= 42.51 && lng >= -91.51 && lng <= -87.02) return 'IL';
  // Texas
  if (lat >= 25.84 && lat <= 36.50 && lng >= -106.65 && lng <= -93.51) return 'TX';
  // Florida
  if (lat >= 24.52 && lat <= 31.00 && lng >= -87.63 && lng <= -80.03) return 'FL';
  // Pennsylvania
  if (lat >= 39.72 && lat <= 42.27 && lng >= -80.52 && lng <= -74.69) return 'PA';
  // Massachusetts
  if (lat >= 41.23 && lat <= 42.89 && lng >= -73.51 && lng <= -69.93) return 'MA';
  // District of Columbia
  if (lat >= 38.79 && lat <= 38.99 && lng >= -77.12 && lng <= -76.91) return 'DC';
  // Washington State
  if (lat >= 45.54 && lat <= 49.00 && lng >= -124.76 && lng <= -116.92) return 'WA';
  // Colorado
  if (lat >= 36.99 && lat <= 41.00 && lng >= -109.05 && lng <= -102.04) return 'CO';
  // Georgia
  if (lat >= 30.36 && lat <= 35.00 && lng >= -85.61 && lng <= -80.84) return 'GA';
  return null;
}

export function useNationalLocation() {
  const [activeState, setActiveStateState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_STATE_KEY);
      if (saved && (STATE_REGISTRY[saved] || ALL_US_STATES.some((s) => s.code === saved))) {
        return saved;
      }
    }
    return 'NY';
  });

  const [activeCity, setActiveCityState] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_CITY_KEY) || 'nyc';
    }
    return 'nyc';
  });

  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationLabel, setLocationLabel] = useState<string>('New York City, NY');

  const resolveLocationFromCoords = useCallback(async (lat: number, lng: number) => {
    const cacheKey = `${lat.toFixed(2)},${lng.toFixed(2)}`;
    if (geoCache.has(cacheKey)) {
      const cached = geoCache.get(cacheKey)!;
      setActiveStateState(cached.stateCode);
      if (cached.cityName) {
        // Find matching pre-seeded city if available
        const stateObj = STATE_REGISTRY[cached.stateCode];
        if (stateObj) {
          const matchCityKey = Object.keys(stateObj.cities).find(
            (k) => stateObj.cities[k].cityName.toLowerCase().includes(cached.cityName!.toLowerCase())
          );
          if (matchCityKey) setActiveCityState(matchCityKey);
        }
      }
      return;
    }

    // Immediate offline heuristic fallback
    const heuristicState = estimateStateFromCoords(lat, lng);
    if (heuristicState) {
      setActiveStateState(heuristicState);
    }

    try {
      setIsDetectingLocation(true);
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
        { headers: { 'User-Agent': 'StreetParkingUSA-App/2.0' } }
      );
      if (res.ok) {
        const data = await res.json();
        const address = data.address || {};
        let stateCode = address['ISO3166-2-lvl4']?.split('-')[1];
        if (!stateCode && address.state) {
          const found = ALL_US_STATES.find(
            (s) => s.name.toLowerCase() === address.state.toLowerCase()
          );
          if (found) stateCode = found.code;
        }

        const city =
          address.city ||
          address.town ||
          address.village ||
          address.municipality ||
          address.borough ||
          address.county;

        if (stateCode) {
          const cleanCode = stateCode.toUpperCase();
          geoCache.set(cacheKey, { stateCode: cleanCode, cityName: city });
          setActiveStateState(cleanCode);

          const stateObj = STATE_REGISTRY[cleanCode];
          if (stateObj && city) {
            const matchKey = Object.keys(stateObj.cities).find((k) =>
              city.toLowerCase().includes(stateObj.cities[k].cityName.toLowerCase())
            );
            if (matchKey) {
              setActiveCityState(matchKey);
            } else {
              setActiveCityState(null);
            }
          }
        }
      }
    } catch (err) {
      console.warn('Reverse geocoding timed out or failed, using heuristic state:', err);
    } finally {
      setIsDetectingLocation(false);
    }
  }, []);

  // Automatic geolocation detection on initial mount
  useEffect(() => {
    if (typeof window === 'undefined' || !navigator.geolocation) return;
    const hasManual = localStorage.getItem(STORAGE_STATE_KEY);
    if (hasManual) return; // Honor explicit user override

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoordinates({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        resolveLocationFromCoords(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => {
        console.log('GPS geolocation skipped:', err.message);
      },
      { timeout: 7000, enableHighAccuracy: false }
    );
  }, [resolveLocationFromCoords]);

  const selectState = useCallback((stateCode: string, cityId?: string) => {
    const clean = stateCode.toUpperCase();
    setActiveStateState(clean);
    if (cityId !== undefined) {
      setActiveCityState(cityId);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_CITY_KEY, cityId || '');
      }
    } else {
      const stateObj = STATE_REGISTRY[clean];
      const defaultCity = stateObj && Object.keys(stateObj.cities).length > 0
        ? Object.keys(stateObj.cities)[0]
        : null;
      setActiveCityState(defaultCity);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_CITY_KEY, defaultCity || '');
      }
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_STATE_KEY, clean);
    }
  }, []);

  const selectCity = useCallback((cityId: string | null) => {
    setActiveCityState(cityId);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_CITY_KEY, cityId || '');
    }
  }, []);

  // Resolve active profile
  const resolved = resolveJurisdiction(activeState, activeCity || undefined);

  useEffect(() => {
    if (resolved.city) {
      setLocationLabel(`${resolved.city.cityName}, ${resolved.state.stateCode}`);
    } else {
      setLocationLabel(`${resolved.state.stateName} (${resolved.state.stateCode})`);
    }
  }, [resolved]);

  return {
    activeState,
    activeCity,
    coordinates,
    resolved,
    isDetectingLocation,
    locationLabel,
    selectState,
    selectCity,
    resolveLocationFromCoords,
    allStates: ALL_US_STATES,
    registeredStates: STATE_REGISTRY,
  };
}
