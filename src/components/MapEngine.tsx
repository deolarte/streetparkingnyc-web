import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Map, Marker, AttributionControl, GeoJSONSource, type MapLayerMouseEvent } from 'maplibre-gl';
import type { FeatureCollection, LineString } from 'geojson';
import { Locate, Compass, ZoomIn, ZoomOut } from 'lucide-react';
import type { CurbSegment } from '../types';

interface MapEngineProps {
  curbs: CurbSegment[];
  selectedCurb: CurbSegment | null;
  onSelectCurb: (curb: CurbSegment | null) => void;
  onLocationFound?: (coords: [number, number]) => void;
  mapInstanceRef: React.MutableRefObject<Map | null>;
}

const ESRI_LIGHT_GRAY_STYLE = {
  version: 8 as const,
  sources: {
    'esri-base': {
      type: 'raster' as const,
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize: 256,
      maxzoom: 16, // Forces MapLibre to overzoom zoom 16 tiles up to 22 without 404s
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
  ],
};

export const MapEngine: React.FC<MapEngineProps> = ({
  curbs,
  selectedCurb,
  onSelectCurb,
  onLocationFound,
  mapInstanceRef,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const userMarkerRef = useRef<Marker | null>(null);

  // Keep refs to avoid stale closures in MapLibre event listeners
  const curbsRef = useRef<CurbSegment[]>(curbs);
  const onSelectCurbRef = useRef(onSelectCurb);

  useEffect(() => {
    curbsRef.current = curbs;
    onSelectCurbRef.current = onSelectCurb;
  }, [curbs, onSelectCurb]);

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

    map.on('load', () => {
      setMapLoaded(true);

      // GeoJSON source for curb segments
      map.addSource('curbs-source', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });

      // Curb line casing (bold outline for extreme high contrast)
      map.addLayer({
        id: 'curbs-casing',
        type: 'line',
        source: 'curbs-source',
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': '#090d16',
          'line-width': ['interpolate', ['linear'], ['zoom'], 11, 4.5, 14, 8, 16, 12, 18, 16],
          'line-opacity': 0.85,
        },
      });

      // Main color-coded curb line
      map.addLayer({
        id: 'curbs-line',
        type: 'line',
        source: 'curbs-source',
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': [
            'match',
            ['get', 'status'],
            'free',
            '#05df72', // Neon Emerald Green
            'warning',
            '#f59e0b', // High-Vis Amber
            'restricted',
            '#ff2b4e', // High-Vis Coral Red
            'metered',
            '#2563eb', // Electric Blue
            '#94a3b8',
          ],
          'line-width': ['interpolate', ['linear'], ['zoom'], 11, 3, 14, 5.5, 16, 8.5, 18, 12],
          'line-opacity': 1.0,
        },
      });

      // Curb point indicators (dots along curb segments)
      map.addLayer({
        id: 'curbs-points',
        type: 'circle',
        source: 'curbs-source',
        minzoom: 12,
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 12, 3, 14, 5, 16, 7],
          'circle-color': [
            'match',
            ['get', 'status'],
            'free',
            '#05df72',
            'warning',
            '#f59e0b',
            'restricted',
            '#ff2b4e',
            'metered',
            '#2563eb',
            '#94a3b8',
          ],
          'circle-stroke-color': '#ffffff',
          'circle-stroke-width': 2,
        },
      });

      // Selection Halo
      map.addLayer({
        id: 'curbs-selected-halo',
        type: 'line',
        source: 'curbs-source',
        filter: ['==', ['get', 'id'], ''],
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': '#ffffff',
          'line-width': ['interpolate', ['linear'], ['zoom'], 12, 10, 15, 15, 18, 20],
          'line-opacity': 0.7,
          'line-blur': 3,
        },
      });

      // Click handler on curb line
      map.on('click', 'curbs-line', (e: MapLayerMouseEvent) => {
        if (!e.features || e.features.length === 0) return;
        const feat = e.features[0];
        const segId = feat.properties?.id;
        const found = curbsRef.current.find((c) => c.id === segId);
        if (found) {
          onSelectCurbRef.current(found);
        }
      });

      // Click handler on curb points
      map.on('click', 'curbs-points', (e: MapLayerMouseEvent) => {
        if (!e.features || e.features.length === 0) return;
        const feat = e.features[0];
        const segId = feat.properties?.id;
        const found = curbsRef.current.find((c) => c.id === segId);
        if (found) {
          onSelectCurbRef.current(found);
        }
      });

      // Hover cursors
      map.on('mouseenter', 'curbs-line', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'curbs-line', () => {
        map.getCanvas().style.cursor = '';
      });
      map.on('mouseenter', 'curbs-points', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'curbs-points', () => {
        map.getCanvas().style.cursor = '';
      });
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [mapInstanceRef]);

  // Update GeoJSON source when curbs change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapLoaded) return;

    const source = map.getSource('curbs-source') as GeoJSONSource | undefined;
    if (!source) return;

    const geojson: FeatureCollection<LineString> = {
      type: 'FeatureCollection',
      features: curbs.map((curb) => ({
        type: 'Feature',
        properties: {
          id: curb.id,
          onStreet: curb.onStreet,
          fromStreet: curb.fromStreet,
          toStreet: curb.toStreet,
          borough: curb.borough,
          status: curb.status,
          statusBadge: curb.statusBadge,
        },
        geometry: {
          type: 'LineString',
          coordinates: curb.coordinates,
        },
      })),
    };

    source.setData(geojson);
  }, [curbs, mapLoaded, mapInstanceRef]);

  // Update selection highlight
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapLoaded) return;

    const selectedId = selectedCurb ? selectedCurb.id : '';
    if (map.getLayer('curbs-selected-halo')) {
      map.setFilter('curbs-selected-halo', ['==', ['get', 'id'], selectedId]);
    }
  }, [selectedCurb, mapLoaded, mapInstanceRef]);

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
          // Smooth zoom showing neighborhood blocks without overzooming into rooftop
          map.flyTo({
            center: coords,
            zoom: 15.2,
            pitch: 20,
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
      <div className="absolute right-2.5 sm:right-3 top-[calc(max(env(safe-area-inset-top,0px),8px)+9rem)] sm:top-28 z-20 flex flex-col space-y-2">
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
