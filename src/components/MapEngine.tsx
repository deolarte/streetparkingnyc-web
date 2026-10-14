import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Map, Marker, AttributionControl, GeoJSONSource, config, type MapLayerMouseEvent } from 'maplibre-gl';
import type { FeatureCollection, LineString } from 'geojson';
import { Locate, ZoomIn, ZoomOut, Coffee, Info, MessageSquare } from 'lucide-react';
import type { CurbSegment } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { COVERAGE_ZONES_GEOJSON, findActiveCoverageZone, type CoverageZone } from '../config/coverageZones';

// Configure MapLibre Web Worker URL explicitly to load the local bundled worker
if (typeof window !== 'undefined') {
  config.WORKER_URL = '/maplibre-gl-worker.mjs';
}

interface MapEngineProps {
  curbs: CurbSegment[];
  selectedCurb: CurbSegment | null;
  searchedLocation?: { center: [number, number]; label?: string } | null;
  onSelectCurb: (curb: CurbSegment | null) => void;
  onLocationFound?: (coords: [number, number]) => void;
  onViewportChange?: (bounds: { north: number; south: number; east: number; west: number }) => void;
  mapInstanceRef: React.MutableRefObject<Map | null>;
  statusFilter?: string;
  onMapGesture?: () => void;
  onOpenTipModal?: () => void;
  onOpenAbout?: () => void;
  onOpenFeedback?: () => void;
  initialCenter?: [number, number];
  initialZoom?: number;
}

// Watermark-Free High-Definition Street Basemap + Vector Street Name Labeling
const MAP_STYLE: any = {
  version: 8 as const,
  glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
  sources: {
    'street-base': {
      type: 'raster' as const,
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize: 256,
      maxzoom: 19,
      attribution: 'Esri, HERE, Garmin, © OpenStreetMap contributors',
    },
    'coverage-zones-source': {
      type: 'geojson' as const,
      data: COVERAGE_ZONES_GEOJSON,
    },
    'curbs-source': {
      type: 'geojson' as const,
      data: {
        type: 'FeatureCollection' as const,
        features: [],
      },
    },
  },
  layers: [
    {
      id: 'street-base-layer',
      type: 'raster' as const,
      source: 'street-base',
      minzoom: 0,
      maxzoom: 22,
    },
    // Visual High-Density Survey Coverage Boundary Zones
    {
      id: 'coverage-zone-fill',
      type: 'fill' as const,
      source: 'coverage-zones-source',
      minzoom: 8,
      paint: {
        'fill-color': '#0284c7',
        'fill-opacity': 0.03,
      },
    },
    {
      id: 'coverage-zone-casing',
      type: 'line' as const,
      source: 'coverage-zones-source',
      minzoom: 9,
      layout: {
        'line-cap': 'round' as const,
        'line-join': 'round' as const,
      },
      paint: {
        'line-color': '#0f172a',
        'line-width': 4.5,
        'line-opacity': 0.35,
      },
    },
    {
      id: 'coverage-zone-line',
      type: 'line' as const,
      source: 'coverage-zones-source',
      minzoom: 9,
      layout: {
        'line-cap': 'round' as const,
        'line-join': 'round' as const,
      },
      paint: {
        'line-color': '#38bdf8', // Luminous sky blue boundary stitch
        'line-width': 2.5,
        'line-dasharray': [4, 2], // Dashed survey perimeter
        'line-opacity': 0.9,
      },
    },
    {
      id: 'coverage-zone-label',
      type: 'symbol' as const,
      source: 'coverage-zones-source',
      minzoom: 11,
      layout: {
        'symbol-placement': 'line' as const,
        'text-field': ['get' as const, 'boundaryLabel'],
        'text-font': ['Noto Sans Regular'],
        'text-size': 10.5,
        'text-letter-spacing': 0.08,
        'symbol-spacing': 350,
      },
      paint: {
        'text-color': '#0369a1',
        'text-halo-color': '#ffffff',
        'text-halo-width': 3,
      },
    },
    {
      id: 'curbs-casing',
      type: 'line' as const,
      source: 'curbs-source',
      minzoom: 13.0,
      layout: {
        'line-cap': 'round' as const,
        'line-join': 'round' as const,
      },
      paint: {
        'line-color': '#0f172a',
        'line-width': ['interpolate' as const, ['linear' as const], ['zoom' as const], 13, 3.5, 15, 6.0, 17, 8.5, 19, 12],
        'line-opacity': 0.22,
      },
    },
    {
      id: 'curbs-line',
      type: 'line' as const,
      source: 'curbs-source',
      minzoom: 13.0,
      layout: {
        'line-cap': 'round' as const,
        'line-join': 'round' as const,
      },
      paint: {
        'line-color': [
          'match' as const,
          ['get' as const, 'status'],
          'free',
          '#10b981', // Emerald Green (Free)
          'warning',
          '#f59e0b', // Amber (Impending ASP)
          'restricted',
          '#ef4444', // Red (No Parking / Active ASP / Tow Away)
          'metered',
          '#3b82f6', // Vivid Blue (Muni-Meter)
          '#64748b', // Slate Fallback
        ],
        'line-width': ['interpolate' as const, ['linear' as const], ['zoom' as const], 13, 2.5, 15, 4.5, 17, 7.0, 19, 10],
        'line-opacity': 0.65, // Translucent color so roads & buildings underneath shine through
      },
    },
    {
      id: 'curbs-selected-halo',
      type: 'line' as const,
      source: 'curbs-source',
      minzoom: 13.0,
      filter: ['==' as const, ['get' as const, 'id'], ''],
      layout: {
        'line-cap': 'round' as const,
        'line-join': 'round' as const,
      },
      paint: {
        'line-color': '#ffffff',
        'line-width': ['interpolate' as const, ['linear' as const], ['zoom' as const], 12, 8, 15, 13, 18, 18],
        'line-opacity': 0.85,
        'line-blur': 2,
      },
    },
    {
      /* Crisp vector street name labels printed right on each parking street block */
      id: 'curbs-labels',
      type: 'symbol' as const,
      source: 'curbs-source',
      minzoom: 14.5,
      layout: {
        'symbol-placement': 'line' as const,
        'text-field': ['get' as const, 'onStreet'],
        'text-font': ['Noto Sans Regular'],
        'text-size': ['interpolate' as const, ['linear' as const], ['zoom' as const], 14.5, 11, 16.5, 13, 18, 15],
        'text-letter-spacing': 0.05,
        'symbol-spacing': 280,
      },
      paint: {
        'text-color': '#0f172a',
        'text-halo-color': '#ffffff',
        'text-halo-width': 3,
      },
    },
  ],
};

export const MapEngine: React.FC<MapEngineProps> = ({
  curbs,
  selectedCurb,
  searchedLocation,
  onSelectCurb,
  onLocationFound,
  onViewportChange,
  mapInstanceRef,
  statusFilter = 'all',
  onMapGesture,
  onOpenTipModal,
  onOpenAbout,
  onOpenFeedback,
  initialCenter,
  initialZoom,
}) => {
  const { t } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isLocating, setIsLocating] = useState(false);
  const userMarkerRef = useRef<Marker | null>(null);
  const searchMarkerRef = useRef<Marker | null>(null);
  const [activeCoverageZone, setActiveCoverageZone] = useState<CoverageZone | null>(null);
  const [showZoneInfoModal, setShowZoneInfoModal] = useState(false);

  // Keep refs to avoid stale closures in MapLibre event listeners
  const curbsRef = useRef<CurbSegment[]>(curbs);
  const statusFilterRef = useRef<string>(statusFilter);
  const onSelectCurbRef = useRef(onSelectCurb);
  const onViewportChangeRef = useRef(onViewportChange);
  const onMapGestureRef = useRef(onMapGesture);

  const buildGeoJson = useCallback((curbList: CurbSegment[]): FeatureCollection<LineString> => {
    const validFeatures: FeatureCollection<LineString>['features'] = [];
    const isSoonMode = statusFilterRef.current === 'warning';

    for (const curb of curbList) {
      if (!Array.isArray(curb.coordinates) || curb.coordinates.length < 2) continue;
      // Sanitize coordinates to ensure strictly finite numbers [lng, lat]
      const cleanCoords: [number, number][] = [];
      for (const pt of curb.coordinates) {
        if (Array.isArray(pt) && pt.length >= 2 && Number.isFinite(pt[0]) && Number.isFinite(pt[1])) {
          cleanCoords.push([Number(pt[0]), Number(pt[1])]);
        }
      }
      if (cleanCoords.length < 2) continue;

      validFeatures.push({
        type: 'Feature',
        properties: {
          id: curb.id,
          onStreet: curb.onStreet || '',
          fromStreet: curb.fromStreet || '',
          toStreet: curb.toStreet || '',
          borough: curb.borough || '',
          status: isSoonMode ? 'warning' : (curb.status || 'free'),
          statusBadge: curb.statusBadge || 'Free Parking',
          canParkUntil: curb.canParkUntil || '',
          canParkHeadline: curb.canParkHeadline || '',
        },
        geometry: {
          type: 'LineString',
          coordinates: cleanCoords,
        },
      });
    }

    return {
      type: 'FeatureCollection',
      features: validFeatures,
    };
  }, []);

  const updateSourceData = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    try {
      const source = map.getSource('curbs-source') as GeoJSONSource | undefined;
      if (source) {
        source.setData(buildGeoJson(curbsRef.current));
        map.triggerRepaint();
      }
    } catch (e) {
      console.warn('Error updating curbs source:', e);
    }
  }, [mapInstanceRef, buildGeoJson]);

  useEffect(() => {
    curbsRef.current = curbs;
    statusFilterRef.current = statusFilter;
    onSelectCurbRef.current = onSelectCurb;
    onViewportChangeRef.current = onViewportChange;
    onMapGestureRef.current = onMapGesture;
    updateSourceData();
  }, [curbs, statusFilter, onSelectCurb, onViewportChange, onMapGesture, updateSourceData]);

  // Initialize MapLibre
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new Map({
      container: mapContainerRef.current,
      style: MAP_STYLE,
      center: initialCenter || [-73.9851, 40.7484],
      zoom: initialZoom || 14.5,
      maxZoom: 20,
      minZoom: 3.5, // Allow full nationwide zooming across all US States
      pitch: 0, // Flat 2D map
      maxPitch: 0, // Lock pitch strictly to 0
      minPitch: 0,
      pitchWithRotate: false,
      bearing: 0,
      attributionControl: false,
    });

    if (map.touchPitch) {
      map.touchPitch.disable();
    }

    mapInstanceRef.current = map;
    map.addControl(new AttributionControl({ compact: true }), 'bottom-right');

    let moveDebounceTimeout: any = null;

    // Window & Container Resize Observer ensures map canvas center is always accurate
    const handleResize = () => {
      try {
        map.resize();
      } catch (err) {
        // Map may be unmounting
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && mapContainerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(mapContainerRef.current);
    }

    const handleLoadedOrStyled = () => {
      handleResize();
      updateSourceData();

      const center = map.getCenter();
      setActiveCoverageZone(findActiveCoverageZone(center.lng, center.lat));

      // Trigger initial viewport curb load
      const bounds = map.getBounds();
      onViewportChangeRef.current?.({
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest(),
      });
    };

    map.on('load', handleLoadedOrStyled);

    // Click handler on curb line & casing
    const handleCurbClick = (e: MapLayerMouseEvent) => {
      if (!e.features || e.features.length === 0) return;
      const feat = e.features[0];
      const segId = feat.properties?.id;
      const found = curbsRef.current.find((c) => c.id === segId);
      if (found) {
        onSelectCurbRef.current(found);
        // Smoothly position clicked curb in visible upper viewport above the bottom sheet drawer
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
        map.easeTo({
          center: [e.lngLat.lng, e.lngLat.lat],
          padding: {
            top: 90,
            bottom: isMobile ? 330 : 160,
            left: 20,
            right: 20,
          },
          duration: 450,
        });
      }
    };

    map.on('click', 'curbs-line', handleCurbClick);
    map.on('click', 'curbs-casing', handleCurbClick);

    // Hover cursors
    map.on('mouseenter', 'curbs-line', () => {
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'curbs-line', () => {
      map.getCanvas().style.cursor = '';
    });

    // Debounced moveend listener to fetch live data wherever user pans/zooms
    const handleMoveEnd = () => {
      clearTimeout(moveDebounceTimeout);
      const center = map.getCenter();
      setActiveCoverageZone(findActiveCoverageZone(center.lng, center.lat));
      moveDebounceTimeout = setTimeout(() => {
        if (map.getZoom() >= 11) {
          const bounds = map.getBounds();
          onViewportChangeRef.current?.({
            north: bounds.getNorth(),
            south: bounds.getSouth(),
            east: bounds.getEast(),
            west: bounds.getWest(),
          });
        }
      }, 400);
    };

    map.on('moveend', handleMoveEnd);

    // Track user touch/mouse drag and pinch/wheel zoom gestures
    map.on('dragend', () => {
      onMapGestureRef.current?.();
    });
    map.on('zoomend', () => {
      onMapGestureRef.current?.();
    });

    return () => {
      clearTimeout(moveDebounceTimeout);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [mapInstanceRef, buildGeoJson, updateSourceData]);

  // Update selection highlight
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const selectedId = selectedCurb ? selectedCurb.id : '';
    try {
      if (map.getLayer('curbs-selected-halo')) {
        map.setFilter('curbs-selected-halo', ['==', ['get', 'id'], selectedId]);
      }
    } catch (e) {}
  }, [selectedCurb, mapInstanceRef]);

  // Manage searched address destination marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (!searchedLocation) {
      if (searchMarkerRef.current) {
        searchMarkerRef.current.remove();
        searchMarkerRef.current = null;
      }
      return;
    }

    const { center, label } = searchedLocation;
    if (!searchMarkerRef.current) {
      const el = document.createElement('div');
      el.className = 'flex flex-col items-center pointer-events-none -translate-y-2 select-none';
      el.innerHTML = `
        <div class="bg-slate-900/95 text-white text-[11px] font-bold px-2.5 py-1 rounded-xl shadow-xl border border-rose-500/60 whitespace-nowrap mb-1 flex items-center gap-1.5 backdrop-blur-md">
          <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          <span class="marker-label">${label || 'Searched Address'}</span>
        </div>
        <div class="relative flex items-center justify-center">
          <div class="absolute w-8 h-8 rounded-full bg-rose-500/30 animate-ping"></div>
          <div class="w-6 h-6 rounded-full bg-rose-600 border-2 border-white shadow-xl ring-4 ring-rose-500/40 flex items-center justify-center text-white text-xs font-black">
            📍
          </div>
        </div>
      `;
      searchMarkerRef.current = new Marker({ element: el, anchor: 'bottom' })
        .setLngLat(center)
        .addTo(map);
    } else {
      searchMarkerRef.current.setLngLat(center);
      const labelEl = searchMarkerRef.current.getElement().querySelector('.marker-label');
      if (labelEl && label) {
        labelEl.textContent = label;
      }
    }
  }, [searchedLocation, mapInstanceRef]);

  // Geolocation Handler
  const handleLocateMe = useCallback(() => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.longitude, pos.coords.latitude];
        setIsLocating(false);

        const map = mapInstanceRef.current;
        if (map) {
          // Comfortable neighborhood view (zoom 14.8) displaying 4-6 blocks instead of rooftop
          map.flyTo({
            center: coords,
            zoom: 14.8,
            pitch: 15,
            essential: true,
          });

          // Render / update pulsing user marker
          if (!userMarkerRef.current) {
            const el = document.createElement('div');
            el.className = 'relative flex items-center justify-center';
            el.innerHTML = `
              <div class="absolute w-8 h-8 rounded-full bg-blue-500/30 animate-ping"></div>
              <div class="relative w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-lg ring-2 ring-blue-400"></div>
            `;
            userMarkerRef.current = new Marker({ element: el })
              .setLngLat(coords)
              .addTo(map);
          } else {
            userMarkerRef.current.setLngLat(coords);
          }
        }

        // Notify parent to fetch parking data for this specific area
        onLocationFound?.(coords);
      },
      (err) => {
        console.warn('Geolocation failed or was denied:', err.message);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, [mapInstanceRef, onLocationFound]);

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();

  return (
    <div className="relative w-full h-full">
      {/* Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Floating Map Controls (Right Side, adjusted for mobile status bar and header) */}
      <div className="absolute right-2.5 sm:right-3 top-[calc(max(env(safe-area-inset-top,44px),44px)+8.5rem)] sm:top-28 z-20 flex flex-col space-y-2">
        {/* Near Me GPS Button */}
        <button
          onClick={handleLocateMe}
          className={`p-2.5 rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/80 dark:border-gray-800 shadow-xl text-gray-700 dark:text-gray-200 hover:text-blue-600 active:scale-95 transition-all ${
            isLocating ? 'animate-pulse text-blue-600' : ''
          }`}
          title="Near Me (GPS)"
          aria-label="Locate near me"
        >
          <Locate className="w-5 h-5" />
        </button>

        {/* Zoom In */}
        <button
          onClick={handleZoomIn}
          className="p-2.5 rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/80 dark:border-gray-800 shadow-xl text-gray-700 dark:text-gray-200 hover:text-blue-600 active:scale-95 transition-all"
          title="Zoom In"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-5 h-5" />
        </button>

        {/* Zoom Out */}
        <button
          onClick={handleZoomOut}
          className="p-2.5 rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/80 dark:border-gray-800 shadow-xl text-gray-700 dark:text-gray-200 hover:text-blue-600 active:scale-95 transition-all"
          title="Zoom Out"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>

        {/* Floating Tip Jar Button Below Zoom Buttons */}
        {onOpenTipModal && (
          <button
            onClick={onOpenTipModal}
            className="p-2.5 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 active:scale-95 text-gray-950 font-black shadow-xl shadow-amber-500/30 border border-amber-300/80 transition-all flex items-center justify-center group"
            title={`${t('tip_btn_full')} / Tip Jar`}
            aria-label="Tip Jar"
          >
            <Coffee className="w-5 h-5 fill-gray-950/20 group-hover:scale-110 transition-transform" />
          </button>
        )}

        {/* Floating Language Selector */}
        <LanguageSelector variant="floating" />

        {/* Floating FAQ & Legal Disclosures Button */}
        {onOpenAbout && (
          <button
            type="button"
            onClick={onOpenAbout}
            className="p-2.5 rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/80 dark:border-gray-800 shadow-xl text-gray-700 dark:text-gray-200 hover:text-blue-600 active:scale-95 transition-all flex items-center justify-center group"
            title="FAQ & Parking Rules"
            aria-label="FAQ & Rules"
          >
            <Info className="w-5 h-5 group-hover:scale-110 transition-transform text-gray-600 dark:text-gray-300" />
          </button>
        )}

        {/* Floating Feedback Button */}
        {onOpenFeedback && (
          <button
            type="button"
            onClick={onOpenFeedback}
            className="p-2.5 rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/80 dark:border-gray-800 shadow-xl text-gray-700 dark:text-gray-200 hover:text-blue-600 active:scale-95 transition-all flex items-center justify-center group"
            title="Feedback & Sign Corrections"
            aria-label="Feedback"
          >
            <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform text-blue-500" />
          </button>
        )}
      </div>

      {/* Floating Coverage Zone Indicator Badge */}
      <div className="absolute bottom-[calc(env(safe-area-inset-bottom,0px)+5.5rem)] sm:bottom-6 left-3 sm:left-4 z-20 pointer-events-auto">
        {activeCoverageZone ? (
          <button
            type="button"
            onClick={() => setShowZoneInfoModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 text-white text-[11px] font-bold border border-emerald-500/60 shadow-xl backdrop-blur-md hover:bg-slate-800 active:scale-95 transition-all group"
            title="Verified Live Survey Coverage Corridor (Click for details)"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="truncate max-w-[170px] sm:max-w-xs">{activeCoverageZone.shortName} Live Zone</span>
            <Info className="w-3.5 h-3.5 text-emerald-400 opacity-80 group-hover:scale-110 transition-transform" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setShowZoneInfoModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 text-amber-300 text-[11px] font-bold border border-amber-500/60 shadow-xl backdrop-blur-md hover:bg-slate-800 active:scale-95 transition-all group"
            title="Outside Surveyed Corridor (Click for details)"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="truncate max-w-[170px] sm:max-w-xs">Outside Survey Zone</span>
            <Info className="w-3.5 h-3.5 text-amber-400 opacity-80 group-hover:scale-110 transition-transform" />
          </button>
        )}
      </div>

      {/* Coverage Boundary Explanatory Modal */}
      {showZoneInfoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in pointer-events-auto select-text"
          onClick={() => setShowZoneInfoModal(false)}
        >
          <div
            className="bg-slate-900 text-white rounded-2xl p-5 max-w-sm w-full border border-slate-700 shadow-2xl relative space-y-3.5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-lg">🗺️</span>
                <h3 className="text-sm font-bold text-white">Survey Coverage Boundaries</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowZoneInfoModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              StreetParkingUSA displays high-density surveyed parking lines inside the <strong className="text-sky-400">blue dashed boundary lines</strong> shown on the map.
            </p>

            <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/60 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0"></span>
                <span className="font-semibold text-emerald-300">Inside Boundary (Green/Blue lines):</span>
              </div>
              <p className="text-[11px] text-slate-300 pl-4.5">
                Full surveyed road vectors with real meter zones, ASP cleaning schedules, and direct mobile payment app deep links.
              </p>

              <div className="flex items-center gap-2 pt-1 border-t border-slate-700/40">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0"></span>
                <span className="font-semibold text-amber-300">Outside Boundary:</span>
              </div>
              <p className="text-[11px] text-slate-300 pl-4.5">
                Statewide statutory baselines apply (15 ft fire hydrants, 20 ft crosswalk clearances, municipal general codes). Survey corridors expand continually across all 50 states.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowZoneInfoModal(false)}
              className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-colors shadow-lg"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
