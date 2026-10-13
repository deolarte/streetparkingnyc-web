import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { REGION_PROFILES, type RegionId } from '../config/parkingConfig';

interface RegionSelectorProps {
  currentRegionId: RegionId;
  onSelectRegion: (id: RegionId) => void;
}

export const RegionSelector: React.FC<RegionSelectorProps> = ({
  currentRegionId,
  onSelectRegion,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const current = REGION_PROFILES[currentRegionId] || REGION_PROFILES.nyc;

  const regions = Object.values(REGION_PROFILES);

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-2 sm:px-2.5 py-1 rounded-lg bg-gray-100/90 dark:bg-gray-800/90 hover:bg-gray-200/90 dark:hover:bg-gray-700/90 text-gray-800 dark:text-gray-200 text-[11px] font-bold border border-gray-200/80 dark:border-gray-700/80 flex items-center space-x-1 transition-all active:scale-95"
        title="Change parking jurisdiction (NY / NJ / CT)"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
        <span className="uppercase tracking-wider font-extrabold text-[10px] text-blue-600 dark:text-blue-400">
          {current.state}
        </span>
        <span className="hidden md:inline text-gray-600 dark:text-gray-300 font-medium truncate max-w-[120px]">
          {current.displayName}
        </span>
        <ChevronDown className="w-3 h-3 text-gray-500 opacity-80" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 mt-1.5 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-2 z-50 space-y-1 animate-in fade-in duration-100">
            <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <span>Tri-State Jurisdictions</span>
              <span className="text-[9px] bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded font-mono">
                Auto-Detect Active
              </span>
            </div>

            {regions.map((reg) => {
              const isSelected = reg.regionId === currentRegionId;
              return (
                <button
                  key={reg.regionId}
                  type="button"
                  onClick={() => {
                    onSelectRegion(reg.regionId);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded-xl flex items-start justify-between transition-colors ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center space-x-1.5 font-bold text-xs">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white">
                        {reg.state}
                      </span>
                      <span>{reg.displayName}</span>
                    </div>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 pl-6">
                      {reg.primaryProvider.name} • {reg.curbRules.streetCleaningTerm}
                    </p>
                  </div>
                  {isSelected && (
                    <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
