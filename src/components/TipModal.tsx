import React, { useState } from 'react';
import { X, Coffee, Heart, Sparkles, ExternalLink, Copy, Check, Coins, ShieldCheck } from 'lucide-react';

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TipModal: React.FC<TipModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'card' | 'crypto'>('card');
  const [copiedBtc, setCopiedBtc] = useState<boolean>(false);

  // Creator's BTC address
  const BTC_ADDRESS = 'bc1q9y9k67z4l5y30d66u7n9r72j9m9s3p0d9e8x2z';
  const bmcUsername = import.meta.env.VITE_BUYMEACOFFEE_USERNAME || 'djtechnyc';

  if (!isOpen) return null;

  const handleCopyBtc = () => {
    navigator.clipboard.writeText(BTC_ADDRESS);
    setCopiedBtc(true);
    setTimeout(() => setCopiedBtc(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 select-auto">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-5 overflow-hidden text-center space-y-3.5 max-h-[92vh] flex flex-col">
        {/* Sticky Top Header */}
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-inner">
              <Coffee className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-base font-black text-gray-900 dark:text-white flex items-center gap-1.5">
                <span>Support StreetPark</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              </h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Keep live NYC parking & ASP updates running
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1 shrink-0 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('card')}
            className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
              activeTab === 'card'
                ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-xs'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Coffee className="w-3.5 h-3.5 text-amber-500" />
            <span>Apple Pay / Card</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('crypto')}
            className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
              activeTab === 'crypto'
                ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-xs'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Coins className="w-3.5 h-3.5 text-amber-500" />
            <span>Bitcoin (BTC)</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto flex-1 space-y-3 pr-0.5">
          {activeTab === 'card' ? (
            <div className="space-y-3">
              {/* Direct Open Link Banner */}
              <div className="flex items-center justify-between p-2.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 text-left">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-amber-950 dark:text-amber-200">
                    Buy Me a Coffee Page
                  </div>
                  <div className="text-[10px] text-amber-800/80 dark:text-amber-400">
                    Choose $5 (1 coffee), $15 (3 coffees), or custom tip
                  </div>
                </div>
                <a
                  href={`https://buymeacoffee.com/${bmcUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs flex items-center space-x-1 shrink-0 transition-transform active:scale-95 shadow-xs"
                >
                  <span>Open Page</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Embedded Official BMC Widget Form */}
              <div className="w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-inner">
                <iframe
                  src={`https://buymeacoffee.com/widget/page/${bmcUsername}`}
                  title="Buy Me a Coffee"
                  className="w-full h-[400px] border-0"
                  allow="payment"
                />
              </div>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-400 dark:text-gray-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Secure payment powered by Stripe & Buy Me a Coffee</span>
              </div>
            </div>
          ) : (
            /* Crypto / Bitcoin Tab */
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 space-y-3 text-left">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-gray-900 dark:text-white">
                <Coins className="w-4 h-4 text-amber-500" />
                <span>Bitcoin (BTC) Tip Address</span>
              </div>

              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                100% anonymous &amp; decentralized. Send any amount of Bitcoin to support the app server costs:
              </p>

              <div className="p-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] text-gray-800 dark:text-gray-200 truncate select-all">
                  {BTC_ADDRESS}
                </span>
                <button
                  type="button"
                  onClick={handleCopyBtc}
                  className="p-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold shrink-0 transition-transform active:scale-95"
                  title="Copy Bitcoin address"
                >
                  {copiedBtc ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {copiedBtc && (
                <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 text-center animate-in fade-in">
                  ✓ BTC Address copied to clipboard!
                </p>
              )}
            </div>
          )}
        </div>

        <p className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center justify-center space-x-1 shrink-0 pt-0.5">
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
          <span>Built by a local NYC driver for NYC drivers</span>
        </p>
      </div>
    </div>
  );
};
