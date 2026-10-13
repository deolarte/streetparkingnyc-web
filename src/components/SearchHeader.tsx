import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Car,
  Truck,
  Filter,
  MapPin,
  Loader2,
  Navigation,
  Coffee,
  MessageSquare,
  Info,
} from 'lucide-react';
import type { CurbSegment, VehicleType } from '../types';
import { searchNycAddress, type AddressCandidate } from '../services/geocodingService';
import { AdBanner } from './AdBanner';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface SearchHeaderProps {
  vehicleType: VehicleType;
  onVehicleTypeChange: (v: VehicleType) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  curbs: CurbSegment[];
  onSelectCurb: (curb: CurbSegment) => void;
  onJumpToLocation: (center: [number, number], zoom?: number) => void;
  onSearchAddress: (candidate: AddressCandidate) => void;
  searchedAddressLabel?: string | null;
  onClearSearchedAddress?: () => void;
  onOpenFeedback?: () => void;
  onOpenTipModal?: () => void;
  onOpenAbout?: () => void;
}

const NYC_NEIGHBORHOODS = [
  { name: 'Rego Park (Queens)', center: [-73.868, 40.7228] as [number, number], zoom: 15.5 },
  { name: 'Astoria (Queens)', center: [-73.923, 40.764] as [number, number], zoom: 15.5 },
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
  onSearchAddress,
  searchedAddressLabel,
  onClearSearchedAddress,
  onOpenFeedback,
  onOpenTipModal,
  onOpenAbout,
}) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [addressCandidates, setAddressCandidates] = useState<AddressCandidate[]>([]);
  const [isSearchingAddresses, setIsSearchingAddresses] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Debounced address geocoding search for NYC addresses
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 3) {
      setAddressCandidates([]);
      setIsSearchingAddresses(false);
      return;
    }

    setIsSearchingAddresses(true);
    const timer = setTimeout(async () => {
      try {
        const results = await searchNycAddress(trimmed);
        setAddressCandidates(results);
      } catch (err) {
        console.warn('Address search error:', err);
      } finally {
        setIsSearchingAddresses(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [query]);

  const filteredCurbs = query.trim()
    ? curbs.filter(
        (c) =>
          c.onStreet.toLowerCase().includes(query.toLowerCase()) ||
          c.fromStreet.toLowerCase().includes(query.toLowerCase()) ||
          c.toStreet.toLowerCase().includes(query.toLowerCase()) ||
          c.borough.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    // 1. If we already have address candidates, use the top match
    if (addressCandidates.length > 0) {
      const topMatch = addressCandidates[0];
      onSearchAddress(topMatch);
      setIsOpen(false);
      searchInputRef.current?.blur();
      return;
    }

    // 2. Otherwise immediately geocode query
    setIsSearchingAddresses(true);
    try {
      const freshResults = await searchNycAddress(trimmed);
      if (freshResults.length > 0) {
        onSearchAddress(freshResults[0]);
        setIsOpen(false);
        searchInputRef.current?.blur();
        return;
      }
    } finally {
      setIsSearchingAddresses(false);
    }

    // 3. Fallback to matching curb
    if (filteredCurbs.length > 0) {
      const curb = filteredCurbs[0];
      onSelectCurb(curb);
      setIsOpen(false);
      if (curb.coordinates[0]) {
        onJumpToLocation(curb.coordinates[0], 17.2);
      }
      searchInputRef.current?.blur();
    }
  };

  return (
    <div className="w-full space-y-2">
      {/* Active Searched Address Notification Pill */}
      {searchedAddressLabel && (
        <div className="flex items-center justify-between bg-rose-500/95 dark:bg-rose-900/95 text-white text-xs px-3 py-1.5 rounded-xl shadow-lg border border-rose-400/40 backdrop-blur-md">
          <div className="flex items-center space-x-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-white animate-pulse" />
            <span className="font-bold truncate">Block View: {searchedAddressLabel}</span>
            <span className="text-[10px] bg-rose-700/80 px-1.5 py-0.5 rounded-md font-semibold shrink-0">
              ~1 Block Radius
            </span>
          </div>
          <button
            onClick={onClearSearchedAddress}
            className="ml-2 hover:bg-rose-700/80 p-0.5 rounded-md transition-colors shrink-0"
            title="Clear address pin"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Search & Filter Bar */}
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/80 dark:border-gray-800 p-2 sm:p-2.5">
        <div className="flex items-center gap-2">
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-2 pl-1 shrink-0">
            <img
              src="/apple-touch-icon.png"
              alt="StreetPark"
              className="w-7 h-7 rounded-lg shadow-sm shrink-0 object-cover"
            />
            <div className="hidden sm:block">
              <span className="font-extrabold text-sm tracking-tight text-gray-900 dark:text-white">
                StreetPark
              </span>
            </div>
          </div>

          {/* Search Input Form */}
          <form onSubmit={handleFormSubmit} className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400">
              {isSearchingAddresses ? (
                <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
              ) : (
                <Search className="w-4 h-4" />
              )}
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder={t('search_placeholder')}
              className="w-full pl-8 pr-14 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-1.5 space-x-1">
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setAddressCandidates([]);
                    setIsOpen(false);
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[11px] font-bold shadow-xs transition-colors shrink-0"
                title="Search address & zoom to 1-block radius"
              >
                Go
              </button>
            </div>
          </form>

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
              <span className="hidden md:inline">{t('passenger')}</span>
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
              <span className="hidden md:inline">{t('commercial')}</span>
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
            {t('filter_all')}
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
            <span>{t('filter_free')}</span>
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
            <span>{t('filter_meter')}</span>
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
            <span>{t('filter_soon')}</span>
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
            <span>{t('filter_restricted')}</span>
          </button>
        </div>
      </div>

      {/* Neighborhood Quick Navigation Pills & Action Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {/* Language Selector (Always First & Instantly Visible on Mobile) */}
        <LanguageSelector />

        {/* FAQ & Legal Disclosures Button */}
        {onOpenAbout && (
          <button
            type="button"
            onClick={onOpenAbout}
            className="px-2.5 py-1 rounded-lg bg-white/90 dark:bg-gray-800/90 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-[11px] shadow-xs border border-gray-200/80 dark:border-gray-700/80 flex items-center space-x-1 shrink-0 transition-colors"
            title="About StreetPark, FAQ & Data Disclosures"
          >
            <Info className="w-3.5 h-3.5 text-gray-500" />
            <span>{t('faq_btn')}</span>
          </button>
        )}

        {/* Tip Jar Button in Header */}
        {onOpenTipModal && (
          <button
            type="button"
            onClick={onOpenTipModal}
            className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 active:from-amber-600 active:to-amber-700 text-gray-950 font-bold text-[11px] shadow-xs ring-1 ring-amber-400/50 flex items-center space-x-1 shrink-0 transition-transform active:scale-95"
            title="Tip Jar"
          >
            <Coffee className="w-3.5 h-3.5 fill-gray-950/20 shrink-0" />
            <span className="tracking-tight">{t('tip_btn_full')}</span>
          </button>
        )}

        {/* Feedback Button */}
        {onOpenFeedback && (
          <button
            type="button"
            onClick={onOpenFeedback}
            className="px-2.5 py-1 rounded-lg bg-white/90 dark:bg-gray-800/90 hover:bg-blue-50 dark:hover:bg-gray-700 text-blue-700 dark:text-blue-300 font-bold text-[11px] shadow-xs border border-blue-200/80 dark:border-blue-900/60 flex items-center space-x-1 shrink-0 transition-colors"
            title="Submit feedback or report sign accuracy"
          >
            <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
            <span>{t('feedback_btn')}</span>
          </button>
        )}

        <span className="text-[10px] font-semibold uppercase text-gray-500 dark:text-gray-400 pl-1 shrink-0">
          {t('jump_to')}
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

      {/* Search Results Dropdown with Address Suggestions and Matching Curbs */}
      {isOpen && query.trim().length > 0 && (
        <div className="bg-white/98 dark:bg-gray-900/98 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-2 max-h-80 overflow-y-auto space-y-2">
          {/* Section 1: Geocoded NYC Addresses & Landmarks (1-Block Radius) */}
          {addressCandidates.length > 0 && (
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-2 pt-1 flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-rose-500" />
                <span>NYC Addresses & Places (Zoom to 1-Block Radius)</span>
              </div>
              {addressCandidates.map((cand, idx) => (
                <button
                  key={`addr-${idx}`}
                  onClick={() => {
                    onSearchAddress(cand);
                    setIsOpen(false);
                    setQuery(cand.shortAddress);
                    searchInputRef.current?.blur();
                  }}
                  className="w-full text-left p-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center justify-between text-xs transition-colors group"
                >
                  <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                    <div className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center shrink-0 text-rose-600 dark:text-rose-400 group-hover:scale-105 transition-transform">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-gray-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 truncate">
                        {cand.shortAddress}
                      </div>
                      <div className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                        {cand.address}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/80 text-rose-700 dark:text-rose-300 shrink-0 shadow-2xs">
                    1-Block Zoom
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Section 2: Matching Street Curbs with Live Regulation Badges */}
          {filteredCurbs.length > 0 && (
            <div className="space-y-1 border-t border-gray-100 dark:border-gray-800 pt-1.5">
              <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-2 flex items-center gap-1.5">
                <Navigation className="w-3 h-3 text-blue-500" />
                <span>Matching Street Curbs</span>
              </div>
              {filteredCurbs.slice(0, 5).map((curb) => (
                <button
                  key={curb.id}
                  onClick={() => {
                    onSelectCurb(curb);
                    setIsOpen(false);
                    if (curb.coordinates[0]) {
                      onJumpToLocation(curb.coordinates[0], 17.2);
                    }
                    searchInputRef.current?.blur();
                  }}
                  className="w-full text-left p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-between text-xs transition-colors"
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-bold text-gray-900 dark:text-white flex items-center space-x-1.5 truncate">
                      <span>{curb.onStreet}</span>
                      <span className="text-[10px] text-gray-400 font-normal shrink-0">({curb.borough})</span>
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                      {curb.fromStreet} → {curb.toStreet}
                    </div>
                    {curb.canParkUntil && (
                      <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1 mt-0.5 truncate">
                        <span>Park until: {curb.canParkUntil}</span>
                      </div>
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
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
            </div>
          )}

          {/* Zero results state */}
          {addressCandidates.length === 0 && filteredCurbs.length === 0 && !isSearchingAddresses && (
            <div className="p-4 text-center text-xs text-gray-500 dark:text-gray-400">
              No matching NYC addresses or curbs found for "{query}". Press Enter to search anyway.
            </div>
          )}

          {/* Non-intrusive Ad Card */}
          <AdBanner format="native-card" />
        </div>
      )}
    </div>
  );
};

