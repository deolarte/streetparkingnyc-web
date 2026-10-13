import React from 'react';
import { ExternalLink, Smartphone, Train } from 'lucide-react';
import type { PaymentProvider } from '../config/parkingConfig';

interface PaymentTriggerProps {
  primaryProvider: PaymentProvider;
  transitProvider?: PaymentProvider;
  zoneNumber?: string;
  isNearTransitStation?: boolean;
}

export const PaymentTrigger: React.FC<PaymentTriggerProps> = ({
  primaryProvider,
  transitProvider,
  zoneNumber,
  isNearTransitStation = false,
}) => {
  // Construct direct web link with zone if applicable
  const primaryWebUrl = (() => {
    if (!primaryProvider.webFallback) return 'https://parkmobile.io';
    if (primaryProvider.name.toLowerCase().includes('parkmobile') && zoneNumber) {
      return `https://app.parkmobile.io/zone/${zoneNumber}`;
    }
    return primaryProvider.webFallback;
  })();

  const handleLaunchMobile = (provider: PaymentProvider) => {
    // Attempt deep link scheme if on mobile device
    if (typeof window !== 'undefined' && provider.scheme && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      try {
        window.location.href = provider.scheme;
      } catch (err) {
        console.warn('Could not launch native scheme:', err);
      }
    }
  };

  return (
    <div className="space-y-2 pt-1">
      {/* Primary Municipal / Commercial Meter Provider Launch Link */}
      <a
        href={primaryWebUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleLaunchMobile(primaryProvider)}
        className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-blue-600/25 active:scale-[0.98] cursor-pointer select-none"
        title={`Pay via ${primaryProvider.name} (Opens app or secure web portal)`}
      >
        <Smartphone className="w-4 h-4 shrink-0" />
        <span className="truncate">
          {primaryProvider.badgeText}
          {zoneNumber ? ` (Zone #${zoneNumber})` : ''}
        </span>
        <ExternalLink className="w-3.5 h-3.5 opacity-80 ml-1 shrink-0" />
      </a>

      {/* Transit Commuter Parking Option (MTA / NJ Transit / Metro-North / BART) */}
      {transitProvider && (
        <a
          href={transitProvider.webFallback}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleLaunchMobile(transitProvider)}
          className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all border active:scale-[0.98] cursor-pointer select-none ${
            isNearTransitStation
              ? 'bg-amber-500/15 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800 hover:bg-amber-500/20'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-200/80 dark:hover:bg-gray-700/80'
          }`}
          title={`Parking at station commuter lot? ${transitProvider.badgeText}`}
        >
          <Train className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
          <span className="truncate">
            {isNearTransitStation ? 'Rail Station Parking? ' : ''}
            {transitProvider.badgeText}
          </span>
          <ExternalLink className="w-3 h-3 opacity-60 ml-0.5 shrink-0" />
        </a>
      )}

      <p className="text-[10px] text-gray-500 dark:text-gray-400 text-center leading-tight">
        Opens mobile app directly; seamlessly falls back to secure web portal if not installed.
      </p>
    </div>
  );
};
