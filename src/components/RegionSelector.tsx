import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  Check,
  Search,
  X,
  Compass,
} from 'lucide-react';
import {
  STATE_REGISTRY,
  ALL_US_STATES,
} from '../config/nationalRegistry';

interface RegionSelectorProps {
  activeState: string;
  activeCity: string | null;
  locationLabel?: string;
  onSelectLocation: (stateCode: string, cityId?: string, center?: [number, number], zoom?: number) => void;
}

const POPULAR_METROS: Array<{
  cityId: string;
  cityName: string;
  stateCode: string;
  center: [number, number];
  zoom: number;
  appName: string;
}> = [
  { cityId: 'nyc', cityName: 'New York City', stateCode: 'NY', center: [-73.9851, 40.7484], zoom: 15, appName: 'ParkNYC' },
  { cityId: 'jersey_city', cityName: 'Jersey City', stateCode: 'NJ', center: [-74.0431, 40.7178], zoom: 15.5, appName: 'ParkMobile' },
  { cityId: 'hoboken', cityName: 'Hoboken', stateCode: 'NJ', center: [-74.0285, 40.744], zoom: 15.5, appName: 'ParkMobile' },
  { cityId: 'chicago', cityName: 'Chicago', stateCode: 'IL', center: [-87.6298, 41.8781], zoom: 15, appName: 'ParkChicago' },
  { cityId: 'los_angeles', cityName: 'Los Angeles', stateCode: 'CA', center: [-118.2437, 34.0522], zoom: 14.5, appName: 'ParkMobile' },
  { cityId: 'san_francisco', cityName: 'San Francisco', stateCode: 'CA', center: [-122.4194, 37.7749], zoom: 15, appName: 'PayByPhone' },
  { cityId: 'miami', cityName: 'Miami', stateCode: 'FL', center: [-80.1918, 25.7617], zoom: 15, appName: 'PayByPhone' },
  { cityId: 'austin', cityName: 'Austin', stateCode: 'TX', center: [-97.7431, 30.2672], zoom: 15, appName: 'ParkMobile' },
  { cityId: 'washington', cityName: 'Washington, D.C.', stateCode: 'DC', center: [-77.0369, 38.9072], zoom: 15, appName: 'ParkMobile' },
  { cityId: 'boston', cityName: 'Boston', stateCode: 'MA', center: [-71.0589, 42.3601], zoom: 15.5, appName: 'Flowbird' },
  { cityId: 'seattle', cityName: 'Seattle', stateCode: 'WA', center: [-122.3321, 47.6062], zoom: 15, appName: 'PayByPhone' },
  { cityId: 'philadelphia', cityName: 'Philadelphia', stateCode: 'PA', center: [-75.1652, 39.9526], zoom: 15, appName: 'meterUP' },
  { cityId: 'columbus', cityName: 'Columbus', stateCode: 'OH', center: [-83.0007, 39.9612], zoom: 15, appName: 'ParkColumbus' },
  { cityId: 'denver', cityName: 'Denver', stateCode: 'CO', center: [-104.9903, 39.7392], zoom: 15, appName: 'ParkMobile' },
  { cityId: 'stamford', cityName: 'Stamford', stateCode: 'CT', center: [-73.5387, 41.0534], zoom: 15.5, appName: 'Passport' },
];

export const RegionSelector: React.FC<RegionSelectorProps> = ({
  activeState,
  activeCity,
  locationLabel,
  onSelectLocation,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewTab, setViewTab] = useState<'metros' | 'states'>('metros');

  const filteredStates = useMemo(() => {
    if (!searchQuery.trim()) return ALL_US_STATES;
    const q = searchQuery.toLowerCase().trim();
    return ALL_US_STATES.filter(
      (s) => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredMetros = useMemo(() => {
    if (!searchQuery.trim()) return POPULAR_METROS;
    const q = searchQuery.toLowerCase().trim();
    return POPULAR_METROS.filter(
      (m) =>
        m.cityName.toLowerCase().includes(q) ||
        m.stateCode.toLowerCase().includes(q) ||
        m.appName.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleSelectMetro = (m: (typeof POPULAR_METROS)[0]) => {
    onSelectLocation(m.stateCode, m.cityId, m.center, m.zoom);
    setIsOpen(false);
  };

  const handleSelectState = (stateCode: string) => {
    const stateObj = STATE_REGISTRY[stateCode];
    const fallbackState = ALL_US_STATES.find((s) => s.code === stateCode);
    const defaultCity = stateObj && Object.keys(stateObj.cities).length > 0
      ? Object.keys(stateObj.cities)[0]
      : undefined;
    const center = stateObj?.defaultCenter || fallbackState?.center || [-98.5795, 39.8283];
    const zoom = stateObj?.defaultZoom || fallbackState?.zoom || 7;
    onSelectLocation(stateCode, defaultCity, center, zoom);
    setIsOpen(false);
  };

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-2.5 py-1 rounded-xl bg-slate-900/90 dark:bg-gray-800 text-white text-[11px] font-bold border border-slate-700/80 dark:border-gray-700 flex items-center space-x-1.5 transition-all shadow-xs hover:bg-slate-800 active:scale-95"
        title="Change parking state or metro jurisdiction across the USA"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        <span className="uppercase tracking-wider font-extrabold text-[10px] text-emerald-300">
          {activeState}
        </span>
        <span className="hidden sm:inline font-medium text-slate-200 truncate max-w-[130px]">
          {locationLabel || activeState}
        </span>
        <ChevronDown className="w-3 h-3 text-slate-400 opacity-80" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-2xs"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 mt-2 w-[340px] sm:w-[400px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-3 z-50 space-y-2.5 animate-in fade-in duration-150 max-h-[85dvh] flex flex-col">
            {/* Modal Title & Close */}
            <div className="flex items-center justify-between pb-1 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center space-x-2">
                <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white">
                  Nationwide Parking Jurisdiction
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search city, state code (e.g. CA, Chicago, Miami)..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs text-gray-900 dark:text-gray-100 placeholder-gray-400 border border-transparent focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            {/* Toggle Tabs */}
            <div className="flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setViewTab('metros')}
                className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
                  viewTab === 'metros'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Major Metros ({POPULAR_METROS.length})
              </button>
              <button
                type="button"
                onClick={() => setViewTab('states')}
                className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
                  viewTab === 'states'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                All 50 US States
              </button>
            </div>

            {/* Content Area */}
            <div className="overflow-y-auto space-y-1 flex-1 pr-1 max-h-[340px] scrollbar-thin">
              {viewTab === 'metros' ? (
                <div className="space-y-1">
                  {filteredMetros.map((m) => {
                    const isSelected = activeState === m.stateCode && activeCity === m.cityId;
                    return (
                      <button
                        key={m.cityId}
                        type="button"
                        onClick={() => handleSelectMetro(m)}
                        className={`w-full text-left p-2 rounded-xl flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-bold'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="w-7 text-center py-0.5 rounded text-[10px] font-black bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white">
                            {m.stateCode}
                          </span>
                          <div>
                            <p className="text-xs font-bold leading-tight">{m.cityName}</p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400">
                              Primary App: <span className="font-semibold text-blue-600 dark:text-blue-400">{m.appName}</span>
                            </p>
                          </div>
                        </div>
                        {isSelected && (
                          <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-1.5">
                  {filteredStates.map((st) => {
                    const isSelected = activeState === st.code;
                    const hasSeedData = !!STATE_REGISTRY[st.code];
                    return (
                      <button
                        key={st.code}
                        type="button"
                        onClick={() => handleSelectState(st.code)}
                        className={`text-left p-2 rounded-xl flex items-center justify-between transition-colors border ${
                          isSelected
                            ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-400 text-blue-900 dark:text-blue-200 font-bold'
                            : 'border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-1.5 truncate">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shrink-0">
                            {st.code}
                          </span>
                          <span className="text-[11px] truncate">{st.name}</span>
                        </div>
                        {hasSeedData && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" title="Full statutory & city profile pre-seeded" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Notice */}
            <div className="pt-1 border-t border-gray-100 dark:border-gray-800 text-[10px] text-gray-500 dark:text-gray-400 flex items-center justify-between">
              <span>Dynamic GPS auto-detection active</span>
              <span className="font-mono text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">50 US States Ready</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
