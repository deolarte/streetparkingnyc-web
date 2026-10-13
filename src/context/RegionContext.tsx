import { useState, useEffect, useCallback } from 'react';
import { REGION_PROFILES, type RegionId, type RegionParkingProfile } from '../config/parkingConfig';

const REGION_STORAGE_KEY = 'streetpark_selected_region';

/**
 * Cluster GPS coordinates into region:
 * - NJ Corridor: Lat 40.65 to 40.90, Lon -74.25 to -74.03 -> nj_urban
 * - CT Coast: Lat >= 41.00, Lon > -73.75 -> ct_southwest
 * - Otherwise -> nyc
 */
export function detectRegionFromCoords(lat: number, lon: number): RegionId {
  if (lat >= 40.65 && lat <= 40.90 && lon >= -74.25 && lon <= -74.03) {
    return 'nj_urban';
  }
  if (lat >= 40.98 && lon > -73.75) {
    return 'ct_southwest';
  }
  return 'nyc';
}

export function useRegion() {
  const [regionId, setRegionId] = useState<RegionId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(REGION_STORAGE_KEY) as RegionId;
      if (saved && REGION_PROFILES[saved]) return saved;
    }
    return 'nyc';
  });

  const [isAutoDetected, setIsAutoDetected] = useState(false);

  // Auto-detect on first load if no manual preference stored
  useEffect(() => {
    if (typeof window === 'undefined' || !navigator.geolocation) return;
    const hasManualChoice = localStorage.getItem(REGION_STORAGE_KEY);
    if (hasManualChoice) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const detected = detectRegionFromCoords(pos.coords.latitude, pos.coords.longitude);
        setRegionId(detected);
        setIsAutoDetected(true);
      },
      (err) => {
        console.log('Region GPS auto-detection skipped:', err.message);
      },
      { timeout: 6000, enableHighAccuracy: false }
    );
  }, []);

  const changeRegion = useCallback((newId: RegionId) => {
    setRegionId(newId);
    if (typeof window !== 'undefined') {
      localStorage.setItem(REGION_STORAGE_KEY, newId);
    }
  }, []);

  const profile: RegionParkingProfile = REGION_PROFILES[regionId] || REGION_PROFILES.nyc;

  return {
    regionId,
    profile,
    setRegion: changeRegion,
    isAutoDetected,
    allRegions: Object.values(REGION_PROFILES)
  };
}
