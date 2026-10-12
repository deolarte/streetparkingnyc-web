import React, { useState } from 'react';
import { X, Coffee, Heart, Sparkles, ExternalLink } from 'lucide-react';

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TipModal: React.FC<TipModalProps> = ({ isOpen, onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(5);

  if (!isOpen) return null;

  // Customizable tip link: Defaults to BuyMeACoffee with dynamic amount
  const tipOptions = [
    { amount: 3, label: '☕ $3 Coffee', desc: 'A quick espresso boost' },
    { amount: 5, label: '🍕 $5 NYC Slice', desc: 'Classic dollar slice combo' },
    { amount: 10, label: '🚇 $10 MTA Fare', desc: 'Saved from a $65 sweep ticket!' },
    { amount: 25, label: '⛽ $25 Gas Tank', desc: 'Super supporter boost' },
  ];

  const handleOpenTipLink = () => {
    // Open Buy Me a Coffee or Venmo/CashApp page
    const url = `https://buymeacoffee.com/djtechnyc`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
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

        {/* Action Button */}
        <div className="pt-1 space-y-2">
          <button
            onClick={handleOpenTipLink}
            className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-gray-950 font-black text-sm flex items-center justify-center space-x-2 transition-all shadow-lg shadow-amber-500/25 active:scale-[0.98]"
          >
            <Coffee className="w-4 h-4" />
            <span>Support with ${selectedAmount} on BuyMeACoffee</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <p className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center justify-center space-x-1">
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
            <span>Built by a local NYC driver for NYC drivers</span>
          </p>
        </div>
      </div>
    </div>
  );
};
