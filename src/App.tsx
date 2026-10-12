import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import type { Map } from 'maplibre-gl';
import { MapEngine } from './components/MapEngine';
import { SearchHeader } from './components/SearchHeader';
import { TemporalSlider } from './components/TemporalSlider';
import { BottomSheet } from './components/BottomSheet';
import { fetchLiveSocrataCurbs, fetchCurbsNearLocation } from './services/socrataApi';
import { evaluateSegmentParking } from './services/signParser';
import type { AddressCandidate } from './services/geocodingService';
import type { CurbSegment, VehicleType, RawCurbSegment } from './types';
import { Loader2 } from 'lucide-react';

export function App() {
  const [selectedTime, setSelectedTime] = useState<Date>(() => new Date());
  const [isNow, setIsNow] = useState<boolean>(true);
  const [vehicleType, setVehicleType] = useState<VehicleType>('passenger');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchedLocation, setSearchedLocation] = useState<{ center: [number, number]; label: string } | null>(null);
  const [rawCurbs, setRawCurbs] = useState<RawCurbSegment[]>([]);
  const [selectedCurbId, setSelectedCurbId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const mapInstanceRef = useRef<Map | null>(null);

  // Load NYC curbs on startup
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await fetchLiveSocrataCurbs();
        if (isMounted) {
          setRawCurbs(data);
        }
      } catch (err) {
        console.error('Error loading curb data:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Periodic clock tick for "Live Now" mode
  useEffect(() => {
    if (!isNow) return;
    const interval = setInterval(() => {
      setSelectedTime(new Date());
    }, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, [isNow]);

  // Re-evaluate curbs whenever selectedTime or vehicleType changes
  const evaluatedCurbs = useMemo(() => {
    return rawCurbs.map((raw) => evaluateSegmentParking(raw, selectedTime, vehicleType));
  }, [rawCurbs, selectedTime, vehicleType]);

  // Derived selected curb object with live evaluation
  const selectedCurb = useMemo(() => {
    if (!selectedCurbId) return null;
    return evaluatedCurbs.find((c) => c.id === selectedCurbId) || null;
  }, [selectedCurbId, evaluatedCurbs]);

  // Filter evaluated curbs for the map
  const displayCurbs = useMemo(() => {
    if (statusFilter === 'all') return evaluatedCurbs;
    return evaluatedCurbs.filter((c) => c.status === statusFilter);
  }, [evaluatedCurbs, statusFilter]);

  const handleTimeChange = (newTime: Date, nowMode: boolean) => {
    setSelectedTime(newTime);
    setIsNow(nowMode);
  };

  const handleSelectCurb = (curb: CurbSegment | null) => {
    setSelectedCurbId(curb ? curb.id : null);
  };

  const handleJumpToLocation = (center: [number, number], zoom: number = 15.5) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo({
        center,
        zoom,
        pitch: 30,
        essential: true,
      });
    }
  };

  // Cache of fetched bounding boxes to prevent redundant Socrata queries
  const fetchedBoundsCache = useRef<Set<string>>(new Set());

  const handleViewportChange = useCallback(
    async (bounds: { north: number; south: number; east: number; west: number }) => {
      // Key bounds by ~1.5km grid square (2 decimals)
      const key = `${bounds.north.toFixed(2)},${bounds.south.toFixed(2)},${bounds.west.toFixed(2)},${bounds.east.toFixed(2)}`;
      if (fetchedBoundsCache.current.has(key)) return;
      fetchedBoundsCache.current.add(key);

      try {
        setIsLoading(true);
        const liveCurbs = await fetchLiveSocrataCurbs(bounds);
        setRawCurbs((prev) => {
          const existingIds = new Set(prev.map((c) => c.id));
          const additions = liveCurbs.filter((c) => !existingIds.has(c.id));
          if (additions.length === 0) return prev;
          return [...prev, ...additions];
        });
      } catch (err) {
        console.warn('Could not load live curbs for viewport:', err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleLocationFound = async (coords: [number, number]) => {
    try {
      const [lon, lat] = coords;
      setIsLoading(true);
      const nearbyCurbs = await fetchCurbsNearLocation(lat, lon);
      setRawCurbs((prev) => {
        const existingIds = new Set(prev.map((c) => c.id));
        const newCurbs = nearbyCurbs.filter((c) => !existingIds.has(c.id));
        return [...prev, ...newCurbs];
      });
    } catch (err) {
      console.error('Failed to load curbs for user location:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchAddress = async (candidate: AddressCandidate) => {
    setSearchedLocation({ center: candidate.center, label: candidate.shortAddress });
    // Zoom in within a 1-block radius (zoom 17.2)
    handleJumpToLocation(candidate.center, 17.2);

    // Automatically load live parking regulations within this block radius
    const [lon, lat] = candidate.center;
    try {
      setIsLoading(true);
      const nearbyCurbs = await fetchCurbsNearLocation(lat, lon);
      setRawCurbs((prev) => {
        const existingIds = new Set(prev.map((c) => c.id));
        const newCurbs = nearbyCurbs.filter((c) => !existingIds.has(c.id));
        return [...prev, ...newCurbs];
      });
    } catch (err) {
      console.warn('Could not load curbs for address:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearSearchedAddress = () => {
    setSearchedLocation(null);
  };

  // Quick stats summary
  const stats = useMemo(() => {
    let freeCount = 0;
    let meteredCount = 0;
    let warningCount = 0;
    let restrictedCount = 0;

    for (const c of evaluatedCurbs) {
      if (c.status === 'free') freeCount++;
      else if (c.status === 'metered') meteredCount++;
      else if (c.status === 'warning') warningCount++;
      else if (c.status === 'restricted') restrictedCount++;
    }

    return { freeCount, meteredCount, warningCount, restrictedCount };
  }, [evaluatedCurbs]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-900 select-none">
      {/* Fullscreen Map Canvas */}
      <MapEngine
        curbs={displayCurbs}
        selectedCurb={selectedCurb}
        searchedLocation={searchedLocation}
        onSelectCurb={handleSelectCurb}
        onLocationFound={handleLocationFound}
        onViewportChange={handleViewportChange}
        mapInstanceRef={mapInstanceRef}
      />

      {/* Top Floating Controls Container with iOS Safe Area Insets */}
      <div className="absolute top-0 inset-x-0 pt-[max(env(safe-area-inset-top,44px),44px)] sm:pt-3 px-2 sm:px-4 max-w-xl mx-auto z-30 pointer-events-none space-y-2">
        <div className="pointer-events-auto">
          <SearchHeader
            vehicleType={vehicleType}
            onVehicleTypeChange={setVehicleType}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            curbs={evaluatedCurbs}
            onSelectCurb={handleSelectCurb}
            onJumpToLocation={handleJumpToLocation}
            onSearchAddress={handleSearchAddress}
            searchedAddressLabel={searchedLocation ? searchedLocation.label : null}
            onClearSearchedAddress={handleClearSearchedAddress}
          />
        </div>
      </div>

      {/* Zero match alert when active filter hides all curbs */}
      {statusFilter !== 'all' && displayCurbs.length === 0 && evaluatedCurbs.length > 0 && (
        <div className="absolute top-[calc(max(env(safe-area-inset-top,44px),44px)+7.5rem)] sm:top-28 inset-x-4 max-w-sm mx-auto z-30 pointer-events-auto">
          <div className="bg-amber-600/95 dark:bg-amber-900/95 text-white text-xs px-3.5 py-2 rounded-2xl shadow-xl flex items-center justify-between gap-2 backdrop-blur-md border border-amber-400/40">
            <span>No "{statusFilter}" curbs active here right now</span>
            <button
              onClick={() => setStatusFilter('all')}
              className="bg-white text-gray-900 hover:bg-gray-100 px-2.5 py-1 rounded-xl text-[11px] font-bold uppercase transition-colors shrink-0 shadow-xs"
            >
              Show All
            </button>
          </div>
        </div>
      )}

      {/* Floating Summary Stats Pill (Top Left Under Header) */}
      <div className="absolute top-[calc(max(env(safe-area-inset-top,44px),44px)+8.5rem)] left-3 z-20 hidden md:flex flex-col space-y-1.5 pointer-events-none">
        <div className="pointer-events-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-3 py-2 rounded-2xl shadow-lg border border-gray-200/80 dark:border-gray-800 text-xs space-y-1">
          <div className="flex items-center justify-between gap-3">
            <span className="font-bold text-gray-800 dark:text-gray-200 text-[11px] uppercase tracking-wider">
              NYC Curbs Overview
            </span>
            {isLoading && (
              <span className="flex items-center space-x-1 text-[10px] text-blue-500 font-semibold animate-pulse">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Syncing NYC Data</span>
              </span>
            )}
          </div>
          <div className="flex items-center space-x-3 text-[11px]">
            <span className="flex items-center space-x-1 text-emerald-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{stats.freeCount} Free</span>
            </span>
            <span className="flex items-center space-x-1 text-blue-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>{stats.meteredCount} Metered</span>
            </span>
            <span className="flex items-center space-x-1 text-rose-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>{stats.restrictedCount} No Park</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Temporal Slider Container (Floating above bottom, clear of iOS Safari bottom URL bar) */}
      <div
        className={`absolute inset-x-2 sm:inset-x-4 max-w-xl mx-auto z-20 pointer-events-none transition-all duration-300 ${
          selectedCurb
            ? 'hidden sm:block sm:bottom-[340px]'
            : 'bottom-[max(calc(env(safe-area-inset-bottom,0px)+72px),76px)] sm:bottom-4'
        }`}
      >
        <div className="pointer-events-auto">
          <TemporalSlider
            isNow={isNow}
            selectedTime={selectedTime}
            onTimeChange={handleTimeChange}
          />
        </div>
      </div>

      {/* Mobile Bottom Sheet Drawer for Selected Curb */}
      <BottomSheet segment={selectedCurb} onClose={() => setSelectedCurbId(null)} />
    </div>
  );
}

export default App;
