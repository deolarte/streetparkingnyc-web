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
import { AdBanner } from './components/AdBanner';
import { InterstitialAd } from './components/InterstitialAd';
import { FeedbackModal } from './components/FeedbackModal';
import { TipModal } from './components/TipModal';
import { AboutModal } from './components/AboutModal';
import { Loader2 } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';
import { localizeCurbSegment } from './i18n/ruleLocalizer';
import { useRegion } from './context/RegionContext';

export function App() {
  const {
    profile: regionProfile,
    setRegion,
    activeState,
    activeCity,
    locationLabel,
    selectLocation,
    nationalResolved,
  } = useRegion();

  const initialMapCenter = useMemo<[number, number]>(() => {
    if (nationalResolved?.city?.center) return nationalResolved.city.center;
    if (nationalResolved?.state?.defaultCenter) return nationalResolved.state.defaultCenter;
    return [-73.9851, 40.7484];
  }, [nationalResolved]);

  const initialMapZoom = useMemo<number>(() => {
    if (nationalResolved?.city?.zoom) return nationalResolved.city.zoom;
    if (nationalResolved?.state?.defaultZoom) return nationalResolved.state.defaultZoom;
    return 14.5;
  }, [nationalResolved]);
  const [selectedTime, setSelectedTime] = useState<Date>(() => new Date());
  const [isNow, setIsNow] = useState<boolean>(true);
  const [vehicleType, setVehicleType] = useState<VehicleType>('passenger');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchedLocation, setSearchedLocation] = useState<{ center: [number, number]; label: string } | null>(null);
  const [rawCurbs, setRawCurbs] = useState<RawCurbSegment[]>([]);
  const [selectedCurbId, setSelectedCurbId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showInterstitial, setShowInterstitial] = useState<boolean>(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [showTipModal, setShowTipModal] = useState<boolean>(false);
  const [showAboutModal, setShowAboutModal] = useState<boolean>(false);

  // Google AdSense Compliant Interstitial Ad Trigger Engine (60s cooldown)
  const INTERSTITIAL_COOLDOWN_MS = 60000;
  const lastInterstitialTimeRef = useRef(0);
  const curbActionCountRef = useRef(0);
  const mapGestureCountRef = useRef(0);

  const attemptShowInterstitial = useCallback((): boolean => {
    const now = Date.now();
    if (now - lastInterstitialTimeRef.current >= INTERSTITIAL_COOLDOWN_MS) {
      lastInterstitialTimeRef.current = now;
      curbActionCountRef.current = 0;
      mapGestureCountRef.current = 0;
      setShowInterstitial(true);
      return true;
    }
    return false;
  }, []);

  const handleCurbInteractionForAd = useCallback(() => {
    curbActionCountRef.current += 1;
    if (curbActionCountRef.current >= 2) {
      attemptShowInterstitial();
    }
  }, [attemptShowInterstitial]);

  const handleMapGestureForAd = useCallback(() => {
    mapGestureCountRef.current += 1;
    if (mapGestureCountRef.current >= 10) {
      attemptShowInterstitial();
    }
  }, [attemptShowInterstitial]);

  const mapInstanceRef = useRef<Map | null>(null);

  // Load initial curbs on startup tailored to active location
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      try {
        const [lon, lat] = initialMapCenter;
        const data = await fetchCurbsNearLocation(lat, lon);
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
  }, [initialMapCenter]);

  // Periodic clock tick for "Live Now" mode
  useEffect(() => {
    if (!isNow) return;
    const interval = setInterval(() => {
      setSelectedTime(new Date());
    }, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, [isNow]);

  const { locale } = useLanguage();

  // Re-evaluate curbs whenever selectedTime, vehicleType, or locale changes
  const evaluatedCurbs = useMemo(() => {
    return rawCurbs.map((raw) => {
      const evaluated = evaluateSegmentParking(raw, selectedTime, vehicleType);
      return localizeCurbSegment(evaluated, locale);
    });
  }, [rawCurbs, selectedTime, vehicleType, locale]);

  // Derived selected curb object with live evaluation
  const selectedCurb = useMemo(() => {
    if (!selectedCurbId) return null;
    return evaluatedCurbs.find((c) => c.id === selectedCurbId) || null;
  }, [selectedCurbId, evaluatedCurbs]);

  // Filter evaluated curbs for the map
  const displayCurbs = useMemo(() => {
    if (statusFilter === 'all') return evaluatedCurbs;
    if (statusFilter === 'warning') {
      return evaluatedCurbs.filter((c) => {
        if (c.status === 'warning') return true;
        // Curb active restriction, meter, or parking window ending/changing in <= 60 minutes
        if (
          c.timeUntilChangeMinutes !== undefined &&
          c.timeUntilChangeMinutes > 0 &&
          c.timeUntilChangeMinutes <= 60
        ) {
          return true;
        }
        // Parking timeline event or resumption within 60 minutes
        if (
          c.parkingTimeline?.durationMinutes !== undefined &&
          c.parkingTimeline.durationMinutes > 0 &&
          c.parkingTimeline.durationMinutes <= 60
        ) {
          return true;
        }
        return false;
      });
    }
    return evaluatedCurbs.filter((c) => c.status === statusFilter);
  }, [evaluatedCurbs, statusFilter]);

  const handleTimeChange = (newTime: Date, nowMode: boolean) => {
    setSelectedTime(newTime);
    setIsNow(nowMode);
  };

  const handleJumpToLocation = useCallback(
    async (center: [number, number], zoom: number = 15.5, withBottomSheetPadding: boolean = false) => {
      if (mapInstanceRef.current) {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
        mapInstanceRef.current.flyTo({
          center,
          zoom,
          pitch: 0,
          padding: withBottomSheetPadding
            ? { top: 90, bottom: isMobile ? 330 : 160, left: 20, right: 20 }
            : { top: 0, bottom: 0, left: 0, right: 0 },
          essential: true,
        });
      }

      // Proactively fetch and populate curbs for this target location
      const [lon, lat] = center;
      try {
        const nearby = await fetchCurbsNearLocation(lat, lon);
        setRawCurbs((prev) => {
          const existingIds = new Set(prev.map((c) => c.id));
          const additions = nearby.filter((c) => !existingIds.has(c.id));
          if (additions.length === 0) return prev;
          return [...prev, ...additions];
        });
      } catch (err) {
        console.warn('Could not load curbs for jump location:', err);
      }
    },
    []
  );

  const handleSelectCurb = useCallback(
    (curb: CurbSegment | null) => {
      setSelectedCurbId(curb ? curb.id : null);
      if (curb) {
        handleCurbInteractionForAd();
        if (curb.coordinates && curb.coordinates.length > 0) {
          const midIdx = Math.floor(curb.coordinates.length / 2);
          const centerCoord = curb.coordinates[midIdx] as [number, number];
          if (centerCoord && Number.isFinite(centerCoord[0]) && Number.isFinite(centerCoord[1])) {
            handleJumpToLocation(
              centerCoord,
              Math.max(mapInstanceRef.current?.getZoom() || 15.5, 15.5),
              true
            );
          }
        }
      }
    },
    [handleCurbInteractionForAd, handleJumpToLocation]
  );

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
    // Zoom in within a 1-block radius (zoom 17.2) with padding
    handleJumpToLocation(candidate.center, 17.2, true);

    // Trigger interstitial on address search (with cooldown)
    attemptShowInterstitial();

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
      else if (c.status === 'restricted') restrictedCount++;

      const isSoon =
        c.status === 'warning' ||
        (c.timeUntilChangeMinutes !== undefined &&
          c.timeUntilChangeMinutes > 0 &&
          c.timeUntilChangeMinutes <= 60) ||
        (c.parkingTimeline?.durationMinutes !== undefined &&
          c.parkingTimeline.durationMinutes > 0 &&
          c.parkingTimeline.durationMinutes <= 60);

      if (isSoon) warningCount++;
    }

    return { freeCount, meteredCount, warningCount, restrictedCount };
  }, [evaluatedCurbs]);

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-slate-900 select-none">
      {/* Fullscreen Map Canvas */}
      <MapEngine
        curbs={displayCurbs}
        selectedCurb={selectedCurb}
        searchedLocation={searchedLocation}
        onSelectCurb={handleSelectCurb}
        onLocationFound={handleLocationFound}
        onViewportChange={handleViewportChange}
        mapInstanceRef={mapInstanceRef}
        statusFilter={statusFilter}
        onMapGesture={handleMapGestureForAd}
        onOpenTipModal={() => setShowTipModal(true)}
        onOpenAbout={() => setShowAboutModal(true)}
        onOpenFeedback={() => setShowFeedbackModal(true)}
        initialCenter={initialMapCenter}
        initialZoom={initialMapZoom}
      />

      {/* Top Floating Controls Container with iOS Safe Area Insets */}
      <div className="absolute top-0 inset-x-0 pt-[max(env(safe-area-inset-top,44px),44px)] sm:pt-3 px-2 sm:px-4 max-w-2xl sm:max-w-3xl mx-auto z-30 pointer-events-none space-y-1.5">
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
            regionProfile={regionProfile}
            activeState={activeState}
            activeCity={activeCity}
            locationLabel={locationLabel}
            onSelectLocation={(stateCode, cityId, center, zoom) => {
              selectLocation(stateCode, cityId);
              if (center && mapInstanceRef.current) {
                handleJumpToLocation(center, zoom || 15);
              }
            }}
            onSelectRegion={(id) => {
              setRegion(id);
              if (regionProfile && mapInstanceRef.current) {
                const target = id === 'nj_urban' ? [-74.0431, 40.7282] as [number, number] : id === 'ct_southwest' ? [-73.5387, 41.0534] as [number, number] : [-73.9851, 40.7484] as [number, number];
                handleJumpToLocation(target, 15);
              }
            }}
          />
        </div>
      </div>

      {/* Zero match alert when active filter hides all curbs */}
      {statusFilter !== 'all' && displayCurbs.length === 0 && evaluatedCurbs.length > 0 && (
        <div className="absolute top-[calc(max(env(safe-area-inset-top,44px),44px)+7.5rem)] sm:top-28 inset-x-4 max-w-sm mx-auto z-30 pointer-events-auto">
          <div className="bg-amber-600/95 dark:bg-amber-900/95 text-white text-xs px-3.5 py-2 rounded-2xl shadow-xl flex items-center justify-between gap-2 backdrop-blur-md border border-amber-400/40">
            <span>
              {statusFilter === 'warning'
                ? 'No curbs changing in the next 60 min in this area'
                : `No "${statusFilter}" curbs active here right now`}
            </span>
            <button
              onClick={() => setStatusFilter('all')}
              className="bg-white text-gray-900 hover:bg-gray-100 px-2.5 py-1 rounded-xl text-[11px] font-bold uppercase transition-colors shrink-0 shadow-xs"
            >
              Show All
            </button>
          </div>
        </div>
      )}

      {/* Floating Summary Stats Pill (Desktop Only, Hidden in Mobile Landscape & Small Screens) */}
      <div className="absolute top-[calc(max(env(safe-area-inset-top,44px),44px)+8.5rem)] left-3 z-20 hidden lg:flex [@media(max-height:550px)]:!hidden flex-col space-y-1.5 pointer-events-none">
        <div className="pointer-events-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-3 py-2 rounded-2xl shadow-lg border border-gray-200/80 dark:border-gray-800 text-xs space-y-1">
          <div className="flex items-center justify-between gap-3">
            <span className="font-bold text-gray-800 dark:text-gray-200 text-[11px] uppercase tracking-wider">
              {regionProfile?.displayName ? `${regionProfile.displayName} Curbs` : 'Curbs Overview'}
            </span>
            {isLoading && (
              <span className="flex items-center space-x-1 text-[10px] text-blue-500 font-semibold animate-pulse">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Syncing Data</span>
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

        {/* Always-Present Persistent Desktop Ad Banner (High Viewability & Impressions) */}
        <div className="pointer-events-auto">
          <AdBanner format="rectangle-300x250" />
        </div>
      </div>

      {/* Bottom Unified Card: Temporal Slider + Embedded Persistent Mobile Ad (Never Floats Over or Blocks Controls) */}
      <div
        className={`absolute inset-x-2 sm:inset-x-4 max-w-xl mx-auto z-20 pointer-events-none transition-all duration-300 ${
          selectedCurb
            ? 'hidden sm:block sm:bottom-[340px]'
            : 'bottom-[max(calc(env(safe-area-inset-bottom,0px)+12px),16px)] sm:bottom-4'
        }`}
      >
        <div className="pointer-events-auto">
          <TemporalSlider
            isNow={isNow}
            selectedTime={selectedTime}
            onTimeChange={handleTimeChange}
            bottomSlot={
              <div className="sm:hidden w-full flex justify-center">
                <AdBanner format="banner-320x50" className="!my-0" />
              </div>
            }
          />
        </div>
      </div>

      {/* Mobile Bottom Sheet Drawer for Selected Curb */}
      <BottomSheet
        segment={selectedCurb}
        onClose={() => setSelectedCurbId(null)}
        isNow={isNow}
        selectedTime={selectedTime}
        onResetToNow={() => {
          setSelectedTime(new Date());
          setIsNow(true);
        }}
        regionProfile={regionProfile}
      />

      {/* High-Value Interstitial Ad Modal */}
      <InterstitialAd isOpen={showInterstitial} onClose={() => setShowInterstitial(false)} />

      {/* User Feedback Submission Modal */}
      <FeedbackModal isOpen={showFeedbackModal} onClose={() => setShowFeedbackModal(false)} />

      {/* Buy Me a Coffee Tip Modal */}
      <TipModal isOpen={showTipModal} onClose={() => setShowTipModal(false)} />

      {/* About StreetPark, Data Disclosures & FAQ Modal */}
      <AboutModal isOpen={showAboutModal} onClose={() => setShowAboutModal(false)} />
    </div>
  );
}

export default App;
