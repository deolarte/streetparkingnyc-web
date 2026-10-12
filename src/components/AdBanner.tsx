import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  format?: 'banner-320x50' | 'rectangle-300x250' | 'native-card';
  slotId?: string;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  format = 'banner-320x50',
  slotId = '1234567890',
  className = '',
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const adsenseId = import.meta.env.VITE_GOOGLE_ADSENSE_ID;
  const isProduction = import.meta.env.PROD && adsenseId && adsenseId.startsWith('ca-pub-');

  useEffect(() => {
    if (isProduction && adRef.current) {
      try {
        // @ts-expect-error Google AdSense window push
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense display error:', e);
      }
    }
  }, [isProduction]);

  if (format === 'banner-320x50') {
    return (
      <div className={`w-full flex flex-col items-center justify-center my-2 ${className}`}>
        <span className="text-[10px] tracking-wider uppercase text-gray-400 dark:text-gray-500 font-medium mb-1">
          Sponsored Advertisement
        </span>
        <div
          className="relative w-[320px] max-w-full min-h-[50px] h-[50px] bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/60 rounded-xl flex items-center justify-between px-3 overflow-hidden shadow-xs"
          style={{ minHeight: '50px' }}
        >
          {/* Fallback card: Visible while AdSense is under review or when unfilled */}
          <div className="flex items-center justify-between w-full text-xs">
            <div className="flex items-center space-x-2">
              <span className="bg-blue-600 text-white font-bold text-[10px] px-1.5 py-0.5 rounded shadow-2xs">Ad</span>
              <div className="text-left">
                <div className="font-semibold text-gray-800 dark:text-gray-200 leading-tight">
                  ParkNYC App
                </div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400">
                  Pay official street meters right from your phone
                </div>
              </div>
            </div>
            {typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? (
              <a
                href="parknyc://"
                className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline shrink-0 bg-blue-50 dark:bg-blue-950/60 px-2 py-1 rounded-lg border border-blue-200 dark:border-blue-800"
              >
                Open App →
              </a>
            ) : (
              <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 shrink-0 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                Mobile App
              </span>
            )}
          </div>

          {/* Live AdSense unit: overlays on top once Google serves ads */}
          {isProduction && (
            <ins
              ref={adRef}
              className="adsbygoogle absolute inset-0 z-10 pointer-events-auto"
              style={{ display: 'inline-block', width: '320px', height: '50px', background: 'transparent' }}
              data-ad-client={adsenseId}
              data-ad-slot={slotId}
            />
          )}
        </div>
      </div>
    );
  }

  if (format === 'rectangle-300x250') {
    return (
      <div className={`w-full flex flex-col items-center justify-center my-1 ${className}`}>
        <span className="text-[10px] tracking-wider uppercase text-gray-400 dark:text-gray-500 font-medium mb-1">
          Sponsored Link
        </span>
        <div
          className="relative w-[300px] max-w-full min-h-[250px] h-[250px] bg-white dark:bg-gray-800/90 border border-gray-200/90 dark:border-gray-700/60 rounded-2xl flex flex-col items-center justify-center p-4 text-center overflow-hidden shadow-lg"
          style={{ minHeight: '250px' }}
        >
          {/* Fallback card: Visible while AdSense is under review */}
          <div className="flex flex-col items-center justify-center space-y-2.5 w-full">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-lg">
              NYC
            </div>
            <div className="font-extrabold text-gray-900 dark:text-white text-sm">
              SpotHero NYC Garages
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-[240px]">
              Can't find legal street parking? Reserve guaranteed indoor garage spots nearby up to 50% off.
            </p>
            <a
              href="https://spothero.com"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs"
            >
              Find Garages Nearby
            </a>
          </div>

          {/* Live AdSense unit: overlays on top once Google serves ads */}
          {isProduction && (
            <ins
              ref={adRef}
              className="adsbygoogle absolute inset-0 z-10 pointer-events-auto"
              style={{ display: 'inline-block', width: '300px', height: '250px', background: 'transparent' }}
              data-ad-client={adsenseId}
              data-ad-slot={slotId}
            />
          )}
        </div>
      </div>
    );
  }

  // Native Card for Search Dropdown Interstitial
  return (
    <div className={`p-3 rounded-lg border border-blue-100 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-950/20 my-2 ${className}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-semibold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded">
          Sponsored Link
        </span>
        <span className="text-[10px] text-gray-400">Ad</span>
      </div>
      <div className="font-semibold text-xs text-gray-900 dark:text-gray-100">
        NYC Parking Ticket Dismissal Assistance
      </div>
      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
        Fight unfair Alternate Side sweeps or camera summons with certified ticket resolution.
      </p>
    </div>
  );
};
