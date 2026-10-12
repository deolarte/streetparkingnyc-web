import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Map, Marker, AttributionControl, GeoJSONSource, config, type MapLayerMouseEvent } from 'maplibre-gl';
import type { FeatureCollection, LineString } from 'geojson';
import { Locate, Compass, ZoomIn, ZoomOut } from 'lucide-react';
import type { CurbSegment } from '../types';

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
}

const ESRI_LIGHT_GRAY_STYLE: any = {
  version: 8 as const,
  sources: {
    'esri-base': {
      type: 'raster' as const,
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize: 256,
      maxzoom: 16,
      attribution: 'Esri, HERE, Garmin, © OpenStreetMap contributors, and the GIS user community',
    },
    'esri-labels': {
      type: 'raster' as const,
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize: 256,
      maxzoom: 16,
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
      id: 'esri-base-layer',
      type: 'raster' as const,
      source: 'esri-base',
      minzoom: 0,
      maxzoom: 22,
    },
    {
      id: 'esri-labels-layer',
      type: 'raster' as const,
      source: 'esri-labels',
      minzoom: 0,
      maxzoom: 22,
    },
    {
      id: 'curbs-casing',
      type: 'line' as const,
      source: 'curbs-source',
      layout: {
        'line-cap': 'round' as const,
        'line-join': 'round' as const,
      },
      paint: {
        'line-color': '#0f172a',
        'line-width': ['interpolate' as const, ['linear' as const], ['zoom' as const], 11, 5, 14, 8, 16, 12, 18, 18],
        'line-opacity': 0.9,
      },
    },
    {
      id: 'curbs-line',
      type: 'line' as const,
      source: 'curbs-source',
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
        'line-width': ['interpolate' as const, ['linear' as const], ['zoom' as const], 11, 3.5, 14, 6, 16, 9, 18, 14],
        'line-opacity': 1.0,
      },
    },
    {
      id: 'curbs-selected-halo',
      type: 'line' as const,
      source: 'curbs-source',
      filter: ['==' as const, ['get' as const, 'id'], ''],
      layout: {
        'line-cap': 'round' as const,
        'line-join': 'round' as const,
      },
      paint: {
        'line-color': '#ffffff',
        'line-width': ['interpolate' as const, ['linear' as const], ['zoom' as const], 12, 10, 15, 16, 18, 24],
        'line-opacity': 0.85,
        'line-blur': 3,
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
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isLocating, setIsLocating] = useState(false);
  const userMarkerRef = useRef<Marker | null>(null);
  const searchMarkerRef = useRef<Marker | null>(null);

  // Keep refs to avoid stale closures in MapLibre event listeners
  const curbsRef = useRef<CurbSegment[]>(curbs);
  const onSelectCurbRef = useRef(onSelectCurb);
  const onViewportChangeRef = useRef(onViewportChange);

  const buildGeoJson = useCallback((curbList: CurbSegment[]): FeatureCollection<LineString> => {
    const validFeatures: FeatureCollection<LineString>['features'] = [];
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
          status: curb.status || 'free',
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
    onSelectCurbRef.current = onSelectCurb;
    onViewportChangeRef.current = onViewportChange;
    updateSourceData();
  }, [curbs, onSelectCurb, onViewportChange, updateSourceData]);

  // Initialize MapLibre
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new Map({
      container: mapContainerRef.current,
      style: ESRI_LIGHT_GRAY_STYLE,
      center: [-74.006, 40.7128], // NYC City Hall / Lower Manhattan
      zoom: 14.5,
      maxZoom: 20,
      minZoom: 10,
      pitch: 20,
      bearing: 0,
      attributionControl: false,
    });

    mapInstanceRef.current = map;
    map.addControl(new AttributionControl({ compact: true }), 'bottom-right');

    let moveDebounceTimeout: any = null;

    const handleLoadedOrStyled = () => {
      updateSourceData();

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
      moveDebounceTimeout = setTimeout(() => {
        if (map.getZoom() >= 13) {
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

    return () => {
      clearTimeout(moveDebounceTimeout);
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
        console.warn('Geolocation failed, centering on default NYC location:', err);
        setIsLocating(false);
        mapInstanceRef.current?.flyTo({
          center: [-74.006, 40.7128],
          zoom: 14.5,
        });
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, [mapInstanceRef, onLocationFound]);

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleResetNorth = () => mapInstanceRef.current?.resetNorthPitch();

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

        {/* Reset North / Compass */}
        <button
          onClick={handleResetNorth}
          className="p-2.5 rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/80 dark:border-gray-800 shadow-xl text-gray-700 dark:text-gray-200 hover:text-blue-600 active:scale-95 transition-all"
          title="Reset Compass & Pitch"
          aria-label="Reset compass"
        >
          <Compass className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
