import { useState, useEffect, useRef, useMemo } from 'react';
import type { Map } from 'maplibre-gl';
import { MapEngine } from './components/MapEngine';
import { SearchHeader } from './components/SearchHeader';
import { TemporalSlider } from './components/TemporalSlider';
import { BottomSheet } from './components/BottomSheet';
import { fetchLiveSocrataCurbs } from './services/socrataApi';
import { evaluateSegmentParking } from './services/signParser';
import type { CurbSegment, VehicleType } from './types';
import { Loader2 } from 'lucide-react';

export function App() {
  const [selectedTime, setSelectedTime] = useState<Date>(() => new Date());
  const [isNow, setIsNow] = useState<boolean>(true);
  const [vehicleType, setVehicleType] = useState<VehicleType>('passenger');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [rawCurbs, setRawCurbs] = useState<
    Array<
      Omit<
        CurbSegment,
        | 'status'
        | 'statusBadge'
        | 'statusHeadline'
        | 'statusDescription'
        | 'nextChangeTime'
        | 'timeUntilChangeMinutes'
        | 'activeRestrictionType'
      >
    >
  >([]);
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
        onSelectCurb={handleSelectCurb}
        mapInstanceRef={mapInstanceRef}
      />

      {/* Top Floating Controls Container */}
      <div className="absolute top-2 sm:top-3 inset-x-2 sm:inset-x-4 max-w-xl mx-auto z-30 pointer-events-none space-y-2">
        <div className="pointer-events-auto">
          <SearchHeader
            vehicleType={vehicleType}
            onVehicleTypeChange={setVehicleType}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            curbs={evaluatedCurbs}
            onSelectCurb={handleSelectCurb}
            onJumpToLocation={handleJumpToLocation}
          />
        </div>
      </div>

      {/* Floating Summary Stats Pill (Top Left Under Header) */}
      <div className="absolute top-36 left-3 z-20 hidden md:flex flex-col space-y-1.5 pointer-events-none">
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

      {/* Bottom Temporal Slider Container (Floating above bottom or bottom sheet) */}
      <div
        className={`absolute inset-x-2 sm:inset-x-4 max-w-xl mx-auto z-20 pointer-events-none transition-all duration-300 ${
          selectedCurb ? 'bottom-[380px] sm:bottom-[340px]' : 'bottom-3 sm:bottom-4'
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
