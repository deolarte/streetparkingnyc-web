import React from 'react';
import { X, Coffee, Heart, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TipModal: React.FC<TipModalProps> = ({ isOpen, onClose }) => {
  const bmcUsername = import.meta.env.VITE_BUYMEACOFFEE_USERNAME || 'djtechnyc';

  if (!isOpen) return null;

  const handleOpenBmc = () => {
    window.open(`https://buymeacoffee.com/${bmcUsername}`, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const tipTiers = [
    { label: '☕ 1 Coffee', amount: '$5', desc: 'Espresso fuel for live map servers' },
    { label: '🍕 NYC Slice Combo', amount: '$10', desc: 'Classic slice & soda combo' },
    { label: '🚇 Avoided $65 Ticket', amount: '$15', desc: 'Saved from an Alternate Side ticket' },
    { label: '⛽ Super Supporter', amount: '$25+', desc: 'Keeps NYC curb intelligence free' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 select-auto">
      <div className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-5 overflow-hidden text-center space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Close"
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
            If StreetPark saved you from an expensive <strong>$65 Alternate Side sweeping ticket</strong> or tow-away, consider supporting server costs!
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-2 gap-2 text-left">
          {tipTiers.map((tier) => (
            <button
              key={tier.amount}
              type="button"
              onClick={handleOpenBmc}
              className="p-2.5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-800/50 hover:border-amber-400 dark:hover:border-amber-600 hover:bg-amber-50/50 dark:hover:bg-amber-950/30 transition-all text-xs group"
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-gray-900 dark:text-white">{tier.label}</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-[11px]">{tier.amount}</span>
              </div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">
                {tier.desc}
              </p>
            </button>
          ))}
        </div>

        {/* Primary Action Button */}
        <div className="pt-1 space-y-2">
          <button
            onClick={handleOpenBmc}
            className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-gray-950 font-black text-sm flex items-center justify-center space-x-2 transition-all shadow-lg shadow-amber-500/25 active:scale-[0.98]"
          >
            <Coffee className="w-4 h-4" />
            <span>Tip via Apple Pay / Card</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-500 dark:text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Official Buy Me a Coffee • Supports  Apple Pay &amp; Cards</span>
          </div>
        </div>

        <p className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center justify-center space-x-1 pt-0.5">
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
          <span>Built by a local NYC driver for NYC drivers</span>
        </p>
      </div>
    </div>
  );
};
