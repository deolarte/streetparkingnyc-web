import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Map, Marker, AttributionControl, GeoJSONSource, type MapLayerMouseEvent } from 'maplibre-gl';
import type { FeatureCollection, LineString } from 'geojson';
import { Locate, Compass, ZoomIn, ZoomOut } from 'lucide-react';
import type { CurbSegment } from '../types';

interface MapEngineProps {
  curbs: CurbSegment[];
  selectedCurb: CurbSegment | null;
  onSelectCurb: (curb: CurbSegment | null) => void;
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
      attribution: 'Esri, HERE, Garmin, © OpenStreetMap contributors, and the GIS user community',
    },
    'esri-labels': {
      type: 'raster' as const,
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: 'esri-base-layer',
      type: 'raster' as const,
      source: 'esri-base',
      minzoom: 0,
      maxzoom: 19,
    },
    {
      id: 'esri-labels-layer',
      type: 'raster' as const,
      source: 'esri-labels',
      minzoom: 0,
      maxzoom: 19,
    },
  ],
};

export const MapEngine: React.FC<MapEngineProps> = ({
  curbs,
  selectedCurb,
  onSelectCurb,
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
      zoom: 14,
      pitch: 25,
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

      // Curb line casing (outline shadow for high visibility)
      map.addLayer({
        id: 'curbs-casing',
        type: 'line',
        source: 'curbs-source',
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': '#0f172a',
          'line-width': ['interpolate', ['linear'], ['zoom'], 12, 4, 15, 8, 18, 14],
          'line-opacity': 0.7,
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
            '#10b981', // Green
            'warning',
            '#f59e0b', // Yellow
            'restricted',
            '#ef4444', // Red
            'metered',
            '#3b82f6', // Blue
            '#94a3b8',
          ],
          'line-width': ['interpolate', ['linear'], ['zoom'], 12, 2.5, 15, 5, 18, 10],
          'line-opacity': 0.95,
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
          'line-width': ['interpolate', ['linear'], ['zoom'], 12, 7, 15, 12, 18, 18],
          'line-opacity': 0.6,
          'line-blur': 2,
        },
      });

      // Click handler on curb segments
      map.on('click', 'curbs-line', (e: MapLayerMouseEvent) => {
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
          map.flyTo({
            center: coords,
            zoom: 16.5,
            pitch: 30,
            essential: true,
          });

          // Render / update pulsing user marker
          if (!userMarkerRef.current) {
            const el = document.createElement('div');
            el.className = 'relative flex items-center justify-center';
            el.innerHTML = `
              <div class="absolute w-6 h-6 rounded-full bg-blue-500/30 animate-ping"></div>
              <div class="relative w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-md"></div>
            `;
            userMarkerRef.current = new Marker({ element: el })
              .setLngLat(coords)
              .addTo(map);
          } else {
            userMarkerRef.current.setLngLat(coords);
          }
        }
      },
      (err) => {
        console.warn('Geolocation failed, centering on default NYC location:', err);
        setIsLocating(false);
        // Fallback smooth zoom to Lower Manhattan
        mapInstanceRef.current?.flyTo({
          center: [-74.006, 40.7128],
          zoom: 15,
        });
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, [mapInstanceRef]);

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleResetNorth = () => mapInstanceRef.current?.resetNorthPitch();

  return (
    <div className="relative w-full h-full">
      {/* Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Floating Map Controls (Right Side) */}
      <div className="absolute right-3 top-28 z-20 flex flex-col space-y-2">
        {/* Near Me GPS Button */}
        <button
          onClick={handleLocateMe}
          className={`p-2.5 rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/80 dark:border-gray-800 shadow-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-all ${
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
          className="p-2.5 rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/80 dark:border-gray-800 shadow-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-all"
          title="Zoom In"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-5 h-5" />
        </button>

        {/* Zoom Out */}
        <button
          onClick={handleZoomOut}
          className="p-2.5 rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/80 dark:border-gray-800 shadow-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-all"
          title="Zoom Out"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>

        {/* Reset North / Compass */}
        <button
          onClick={handleResetNorth}
          className="p-2.5 rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/80 dark:border-gray-800 shadow-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-all"
          title="Reset Compass & Pitch"
          aria-label="Reset compass"
        >
          <Compass className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
