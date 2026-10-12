import React, { useState } from 'react';
import { X, Coffee, Heart, Sparkles, ExternalLink, Copy, Check, Coins } from 'lucide-react';

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TipModal: React.FC<TipModalProps> = ({ isOpen, onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(5);
  const [showCrypto, setShowCrypto] = useState<boolean>(false);
  const [copiedBtc, setCopiedBtc] = useState<boolean>(false);

  // Replace with creator's actual BTC public wallet address
  const BTC_ADDRESS = 'bc1q9y9k67z4l5y30d66u7n9r72j9m9s3p0d9e8x2z';

  if (!isOpen) return null;

  const tipOptions = [
    { amount: 3, label: '☕ $3 Coffee', desc: 'A quick espresso boost' },
    { amount: 5, label: '🍕 $5 NYC Slice', desc: 'Classic dollar slice combo' },
    { amount: 10, label: '🚇 $10 MTA Fare', desc: 'Saved from a $65 sweep ticket!' },
    { amount: 25, label: '⛽ $25 Gas Tank', desc: 'Super supporter boost' },
  ];

  const bmcUsername = import.meta.env.VITE_BUYMEACOFFEE_USERNAME || 'djtechnyc';

  const handleOpenTipLink = () => {
    const url = `https://buymeacoffee.com/${bmcUsername}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleCopyBtc = () => {
    navigator.clipboard.writeText(BTC_ADDRESS);
    setCopiedBtc(true);
    setTimeout(() => setCopiedBtc(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 select-auto">
      <div className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-5 overflow-hidden text-center space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Title */}
        <div className="space-y-1.5 pt-1">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-inner">
            <Coffee className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center justify-center gap-1.5">
            <span>Buy Me a Coffee</span>
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed max-w-xs mx-auto">
            If StreetParkingNYC saved you from an expensive <strong>$65 Alternate Side sweeping ticket</strong> or tow-away, consider supporting the servers!
          </p>
        </div>

        {!showCrypto ? (
          <>
            {/* Preset Amounts */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {tipOptions.map((opt) => (
                <button
                  key={opt.amount}
                  type="button"
                  onClick={() => setSelectedAmount(opt.amount)}
                  className={`p-2.5 rounded-2xl border text-left transition-all ${
                    selectedAmount === opt.amount
                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-extrabold shadow-xs ring-2 ring-amber-400/30'
                      : 'border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <div className="font-extrabold text-sm">{opt.label}</div>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight mt-0.5">
                    {opt.desc}
                  </div>
                </button>
              ))}
            </div>

            {/* Apple Pay & Card Button */}
            <div className="pt-1 space-y-2.5">
              <button
                onClick={handleOpenTipLink}
                className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-gray-950 font-black text-sm flex items-center justify-center space-x-2 transition-all shadow-lg shadow-amber-500/25 active:scale-[0.98]"
              >
                <Coffee className="w-4 h-4" />
                <span>Tip ${selectedAmount} via Apple Pay / Card</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Supports:</span>
                <span className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono font-bold text-gray-900 dark:text-white"> Apple Pay</span>
                <span className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono font-bold text-gray-900 dark:text-white">Google Pay</span>
                <span className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono font-bold text-gray-900 dark:text-white">Cards</span>
              </div>

              <button
                type="button"
                onClick={() => setShowCrypto(true)}
                className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center justify-center space-x-1 mx-auto pt-1"
              >
                <Coins className="w-3.5 h-3.5" />
                <span>Prefer 100% Anonymous Bitcoin / Crypto?</span>
              </button>
            </div>
          </>
        ) : (
          /* Crypto / Bitcoin Tab */
          <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 space-y-3 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-900 dark:text-white flex items-center space-x-1">
                <Coins className="w-4 h-4 text-amber-500" />
                <span>Bitcoin (BTC) Tip Address</span>
              </span>
              <button
                type="button"
                onClick={() => setShowCrypto(false)}
                className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Back to Apple Pay
              </button>
            </div>

            <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed">
              100% anonymous & decentralized. Send any amount of Bitcoin to support the app server costs:
            </p>

            <div className="p-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-between gap-2">
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

        <p className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center justify-center space-x-1 pt-1">
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
          <span>Built by a local NYC driver for NYC drivers</span>
        </p>
      </div>
    </div>
  );
};
