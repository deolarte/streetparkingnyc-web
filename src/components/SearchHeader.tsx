import React, { useState } from 'react';
import {
  Search,
  X,
  Car,
  Truck,
  Filter,
} from 'lucide-react';
import type { CurbSegment, VehicleType } from '../types';
import { AdBanner } from './AdBanner';

interface SearchHeaderProps {
  vehicleType: VehicleType;
  onVehicleTypeChange: (v: VehicleType) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  curbs: CurbSegment[];
  onSelectCurb: (curb: CurbSegment) => void;
  onJumpToLocation: (center: [number, number], zoom?: number) => void;
}

const NYC_NEIGHBORHOODS = [
  { name: 'Financial District', center: [-74.008, 40.7075] as [number, number], zoom: 15.5 },
  { name: 'Chinatown / Civic', center: [-73.998, 40.714] as [number, number], zoom: 16 },
  { name: 'SoHo / Nolita', center: [-73.9968, 40.722] as [number, number], zoom: 15.5 },
  { name: 'West Village', center: [-74.002, 40.732] as [number, number], zoom: 15.5 },
  { name: 'Midtown East', center: [-73.972, 40.7495] as [number, number], zoom: 15 },
  { name: 'Williamsburg (BK)', center: [-73.957, 40.718] as [number, number], zoom: 15.5 },
  { name: 'Brooklyn Heights', center: [-73.995, 40.6946] as [number, number], zoom: 15.5 },
];

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  vehicleType,
  onVehicleTypeChange,
  statusFilter,
  onStatusFilterChange,
  curbs,
  onSelectCurb,
  onJumpToLocation,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredCurbs = query.trim()
    ? curbs.filter(
        (c) =>
          c.onStreet.toLowerCase().includes(query.toLowerCase()) ||
          c.fromStreet.toLowerCase().includes(query.toLowerCase()) ||
          c.toStreet.toLowerCase().includes(query.toLowerCase()) ||
          c.borough.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="w-full space-y-2">
      {/* Top Search & Filter Bar */}
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/80 dark:border-gray-800 p-2 sm:p-2.5">
        <div className="flex items-center gap-2">
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-1.5 pl-1.5 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-sm">
              P
            </div>
            <div className="hidden sm:block">
              <span className="font-extrabold text-sm tracking-tight text-gray-900 dark:text-white">
                StreetParking<span className="text-blue-600">NYC</span>
              </span>
            </div>
          </div>

          {/* Search Input Box */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="Search NYC street, cross street, borough..."
              className="w-full pl-8 pr-7 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setIsOpen(false);
                }}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Vehicle Mode Toggle */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-0.5 rounded-xl shrink-0">
            <button
              onClick={() => onVehicleTypeChange('passenger')}
              className={`flex items-center space-x-1 px-2 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                vehicleType === 'passenger'
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
              }`}
              title="Personal / Passenger Car"
            >
              <Car className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Passenger</span>
            </button>
            <button
              onClick={() => onVehicleTypeChange('commercial')}
              className={`flex items-center space-x-1 px-2 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                vehicleType === 'commercial'
                  ? 'bg-white dark:bg-gray-700 text-amber-600 dark:text-amber-400 shadow-xs'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
              }`}
              title="Commercial Vehicle / Truck"
            >
              <Truck className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Commercial</span>
            </button>
          </div>
        </div>

        {/* Filter Chips & Legend */}
        <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-gray-100 dark:border-gray-800 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[11px] font-medium text-gray-400 shrink-0 flex items-center space-x-1 pl-1">
            <Filter className="w-3 h-3" />
            <span>Filter:</span>
          </span>

          <button
            onClick={() => onStatusFilterChange('all')}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors ${
              statusFilter === 'all'
                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
            }`}
          >
            All Curbs
          </button>

          <button
            onClick={() => onStatusFilterChange('free')}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors flex items-center space-x-1 ${
              statusFilter === 'free'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 hover:bg-emerald-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Free Legal</span>
          </button>

          <button
            onClick={() => onStatusFilterChange('metered')}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors flex items-center space-x-1 ${
              statusFilter === 'metered'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 hover:bg-blue-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Muni-Meter</span>
          </button>

          <button
            onClick={() => onStatusFilterChange('warning')}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors flex items-center space-x-1 ${
              statusFilter === 'warning'
                ? 'bg-amber-500 text-gray-950 shadow-xs'
                : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 hover:bg-amber-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Impending (&lt;60m)</span>
          </button>

          <button
            onClick={() => onStatusFilterChange('restricted')}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors flex items-center space-x-1 ${
              statusFilter === 'restricted'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 hover:bg-rose-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>No Parking</span>
          </button>
        </div>
      </div>

      {/* Neighborhood Quick Navigation Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        <span className="text-[10px] font-semibold uppercase text-gray-500 dark:text-gray-400 pl-1 shrink-0">
          Jump to:
        </span>
        {NYC_NEIGHBORHOODS.map((nh) => (
          <button
            key={nh.name}
            onClick={() => onJumpToLocation(nh.center, nh.zoom)}
            className="px-2.5 py-1 rounded-lg bg-white/90 dark:bg-gray-800/90 hover:bg-blue-50 dark:hover:bg-gray-700 text-[11px] font-medium text-gray-700 dark:text-gray-300 shadow-xs border border-gray-200/70 dark:border-gray-700/70 whitespace-nowrap transition-colors"
          >
            {nh.name}
          </button>
        ))}
      </div>

      {/* Search Results Dropdown with Interstitial Ad Card */}
      {isOpen && query.trim().length > 0 && (
        <div className="bg-white/98 dark:bg-gray-900/98 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-2 max-h-72 overflow-y-auto space-y-1">
          {filteredCurbs.length > 0 ? (
            <>
              {filteredCurbs.slice(0, 5).map((curb) => (
                <button
                  key={curb.id}
                  onClick={() => {
                    onSelectCurb(curb);
                    setIsOpen(false);
                    if (curb.coordinates[0]) {
                      onJumpToLocation(curb.coordinates[0], 17);
                    }
                  }}
                  className="w-full text-left p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-between text-xs transition-colors"
                >
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white flex items-center space-x-1.5">
                      <span>{curb.onStreet}</span>
                      <span className="text-[10px] text-gray-400">({curb.borough})</span>
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      {curb.fromStreet} → {curb.toStreet}
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      curb.status === 'free'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : curb.status === 'metered'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                        : curb.status === 'warning'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
                    {curb.statusBadge}
                  </span>
                </button>
              ))}

              {/* Non-intrusive Search / Filter Interstitial Ad Card */}
              <AdBanner format="native-card" />
            </>
          ) : (
            <div className="p-4 text-center text-xs text-gray-500 dark:text-gray-400">
              No matching street curbs found for "{query}".
            </div>
          )}
        </div>
      )}
    </div>
  );
};
