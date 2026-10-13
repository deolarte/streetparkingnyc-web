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
  const handleLaunchApp = (provider: PaymentProvider) => {
    const start = Date.now();

    // Try native app scheme first
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = provider.scheme;
    document.body.appendChild(iframe);

    // Fallback to web link if app didn't capture focus within 1.5s
    setTimeout(() => {
      document.body.removeChild(iframe);
      if (Date.now() - start < 2000) {
        window.open(provider.webFallback, '_blank', 'noopener,noreferrer');
      }
    }, 1500);
  };

  return (
    <div className="space-y-2 pt-1">
      {/* Primary Municipal / Commercial Meter Provider Button */}
      <button
        type="button"
        onClick={() => handleLaunchApp(primaryProvider)}
        className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-blue-600/20 active:scale-[0.98]"
        title={`Pay via ${primaryProvider.name}`}
      >
        <Smartphone className="w-4 h-4 shrink-0" />
        <span>
          {primaryProvider.badgeText}
          {zoneNumber ? ` (Zone #${zoneNumber})` : ''}
        </span>
        <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-1" />
      </button>

      {/* Transit Commuter Parking Option (MTA / NJ Transit / Metro-North LAZ) */}
      {transitProvider && (
        <button
          type="button"
          onClick={() => handleLaunchApp(transitProvider)}
          className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all border ${
            isNearTransitStation
              ? 'bg-amber-500/10 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-200/80 dark:hover:bg-gray-700/80'
          }`}
          title={`Parking at station commuter lot? ${transitProvider.badgeText}`}
        >
          <Train className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>
            {isNearTransitStation ? 'Rail Station Parking? ' : ''}
            {transitProvider.badgeText}
          </span>
          <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
        </button>
      )}

      <p className="text-[10px] text-gray-500 dark:text-gray-400 text-center leading-tight">
        Opens mobile app directly; seamlessly falls back to secure web portal if not installed.
      </p>
    </div>
  );
};
