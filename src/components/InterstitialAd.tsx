import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { AdBanner } from './AdBanner';

interface InterstitialAdProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InterstitialAd: React.FC<InterstitialAdProps> = ({ isOpen, onClose }) => {
  const [countdown, setCountdown] = useState<number>(3);
  const [canClose, setCanClose] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(3);
      setCanClose(false);
      return;
    }

    setCountdown(3);
    setCanClose(false);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanClose(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-[340px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200/80 dark:border-gray-800 p-4 flex flex-col items-center space-y-3">
        {/* Top Header with Close / Skip Timer */}
        <div className="w-full flex items-center justify-between pb-1 border-b border-gray-100 dark:border-gray-800">
          <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 dark:text-gray-500">
            Sponsored Interstitial
          </span>

          {canClose ? (
            <button
              onClick={onClose}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold transition-colors"
              aria-label="Close ad"
            >
              <span>Close</span>
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
              Skip in {countdown}s
            </span>
          )}
        </div>

        {/* High-Value 300x250 AdSense Creative */}
        <div className="w-full flex justify-center overflow-hidden">
          <AdBanner format="rectangle-300x250" />
        </div>

        {/* Dismissal footer */}
        <div className="w-full text-center pt-1">
          <button
            onClick={onClose}
            className={`w-full py-2 rounded-xl text-xs font-bold transition-colors ${
              canClose
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            }`}
            disabled={!canClose}
          >
            {canClose ? 'Continue to StreetParkingNYC' : `Continue in ${countdown}s...`}
          </button>
        </div>
      </div>
    </div>
  );
};
