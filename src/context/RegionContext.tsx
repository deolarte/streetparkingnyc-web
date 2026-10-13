import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  REGION_PROFILES,
  convertNationalToRegionProfile,
  type RegionParkingProfile,
} from '../config/parkingConfig';
import {
  resolveJurisdiction,
} from '../config/nationalRegistry';

const REGION_STORAGE_KEY = 'streetpark_selected_region';
const STATE_STORAGE_KEY = 'streetpark_active_state';
const CITY_STORAGE_KEY = 'streetpark_active_city';

export function useRegion() {
  const [activeState, setActiveState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem(STATE_STORAGE_KEY);
      if (savedState) return savedState;
      const legacyRegion = localStorage.getItem(REGION_STORAGE_KEY);
      if (legacyRegion === 'nj_urban') return 'NJ';
      if (legacyRegion === 'ct_southwest') return 'CT';
      if (legacyRegion === 'nyc') return 'NY';
    }
    return 'NY';
  });

  const [activeCity, setActiveCity] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const savedCity = localStorage.getItem(CITY_STORAGE_KEY);
      if (savedCity) return savedCity;
      const legacyRegion = localStorage.getItem(REGION_STORAGE_KEY);
      if (legacyRegion === 'nj_urban') return 'jersey_city';
      if (legacyRegion === 'ct_southwest') return 'stamford';
      if (legacyRegion === 'nyc') return 'nyc';
    }
    return 'nyc';
  });

  const [isAutoDetected, setIsAutoDetected] = useState(false);

  // Auto-detect location on first load if no manual preference stored
  useEffect(() => {
    if (typeof window === 'undefined' || !navigator.geolocation) return;
    const hasManual = localStorage.getItem(STATE_STORAGE_KEY) || localStorage.getItem(REGION_STORAGE_KEY);
    if (hasManual) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;
        // Simple state estimate heuristic
        let detectedState = 'NY';
        let detectedCity: string | null = 'nyc';

        if (lat >= 32.5 && lat <= 42.0 && lon >= -124.5 && lon <= -114.1) {
          detectedState = 'CA';
          detectedCity = lat > 36.5 ? 'san_francisco' : 'los_angeles';
        } else if (lat >= 36.97 && lat <= 42.51 && lon >= -91.51 && lon <= -87.02) {
          detectedState = 'IL';
          detectedCity = 'chicago';
        } else if (lat >= 25.84 && lat <= 36.50 && lon >= -106.65 && lon <= -93.51) {
          detectedState = 'TX';
          detectedCity = 'austin';
        } else if (lat >= 24.52 && lat <= 31.00 && lon >= -87.63 && lon <= -80.03) {
          detectedState = 'FL';
          detectedCity = 'miami';
        } else if (lat >= 38.79 && lat <= 38.99 && lon >= -77.12 && lon <= -76.91) {
          detectedState = 'DC';
          detectedCity = 'washington';
        } else if (lat >= 38.9 && lat <= 41.4 && lon >= -75.6 && lon <= -73.9) {
          detectedState = 'NJ';
          detectedCity = 'jersey_city';
        } else if (lat >= 40.98 && lon > -73.75) {
          detectedState = 'CT';
          detectedCity = 'stamford';
        }

        setActiveState(detectedState);
        setActiveCity(detectedCity);
        setIsAutoDetected(true);
      },
      (err) => {
        console.log('Region GPS auto-detection skipped:', err.message);
      },
      { timeout: 6000, enableHighAccuracy: false }
    );
  }, []);

  const selectLocation = useCallback(
    (stateCode: string, cityId?: string) => {
      const cleanState = stateCode.toUpperCase();
      setActiveState(cleanState);
      setActiveCity(cityId || null);

      if (typeof window !== 'undefined') {
        localStorage.setItem(STATE_STORAGE_KEY, cleanState);
        localStorage.setItem(CITY_STORAGE_KEY, cityId || '');
        // Legacy key compatibility
        if (cleanState === 'NJ') localStorage.setItem(REGION_STORAGE_KEY, 'nj_urban');
        else if (cleanState === 'CT') localStorage.setItem(REGION_STORAGE_KEY, 'ct_southwest');
        else if (cleanState === 'NY') localStorage.setItem(REGION_STORAGE_KEY, 'nyc');
        else localStorage.setItem(REGION_STORAGE_KEY, cleanState.toLowerCase());
      }
    },
    []
  );

  // Legacy setRegion compatibility
  const setRegion = useCallback((id: string) => {
    if (id === 'nj_urban' || id === 'NJ') {
      selectLocation('NJ', 'jersey_city');
    } else if (id === 'ct_southwest' || id === 'CT') {
      selectLocation('CT', 'stamford');
    } else if (id === 'nyc' || id === 'NY') {
      selectLocation('NY', 'nyc');
    } else {
      selectLocation(id);
    }
  }, [selectLocation]);

  const nationalResolved = useMemo(() => {
    return resolveJurisdiction(activeState, activeCity || undefined);
  }, [activeState, activeCity]);

  const profile: RegionParkingProfile = useMemo(() => {
    return convertNationalToRegionProfile(nationalResolved);
  }, [nationalResolved]);

  const locationLabel = useMemo(() => {
    if (nationalResolved.city) {
      return `${nationalResolved.city.cityName}, ${nationalResolved.state.stateCode}`;
    }
    return `${nationalResolved.state.stateName} (${nationalResolved.state.stateCode})`;
  }, [nationalResolved]);

  return {
    regionId: profile.regionId,
    activeState,
    activeCity,
    locationLabel,
    profile,
    nationalResolved,
    setRegion,
    selectLocation,
    isAutoDetected,
    allRegions: Object.values(REGION_PROFILES),
  };
}
