import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  Clock,
  AlertTriangle,
  Info,
  DollarSign,
  ShieldCheck,
  ShieldAlert,
  Compass,
  CalendarClock,
  CheckCircle2,
  CloudSnow,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import type { CurbSegment } from '../types';
import { AdBanner } from './AdBanner';
import { fetchNycStormAdvisory, type StormAlert } from '../services/weatherAdvisory';
import { useLanguage } from '../context/LanguageContext';
import { PaymentTrigger } from './PaymentTrigger';
import type { RegionParkingProfile } from '../config/parkingConfig';

interface BottomSheetProps {
  segment: CurbSegment | null;
  onClose: () => void;
  onSelectSegment?: (segment: CurbSegment) => void;
  isNow?: boolean;
  selectedTime?: Date;
  onResetToNow?: () => void;
  regionProfile?: RegionParkingProfile;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  segment,
  onClose,
  isNow = true,
  selectedTime,
  onResetToNow,
  regionProfile,
}) => {
  const { t } = useLanguage();
  const [advisory, setAdvisory] = useState<StormAlert | null>(null);
  const [copiedZone, setCopiedZone] = useState(false);

  const handleCopyZone = (zone: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(zone);
      setCopiedZone(true);
      setTimeout(() => setCopiedZone(false), 2000);
    }
  };

  useEffect(() => {
    fetchNycStormAdvisory().then((res) => setAdvisory(res));
  }, []);

  if (!segment) return null;

  const getStatusColorTheme = () => {
    switch (segment.status) {
      case 'free':
        return {
          bg: 'bg-emerald-500/10 dark:bg-emerald-950/40',
          border: 'border-emerald-500/30',
          text: 'text-emerald-700 dark:text-emerald-400',
          badgeBg: 'bg-emerald-600 text-white',
          icon: ShieldCheck,
        };
      case 'warning':
        return {
          bg: 'bg-amber-500/10 dark:bg-amber-950/40',
          border: 'border-amber-500/30',
          text: 'text-amber-700 dark:text-amber-400',
          badgeBg: 'bg-amber-500 text-gray-900',
          icon: AlertTriangle,
        };
      case 'restricted':
        return {
          bg: 'bg-rose-500/10 dark:bg-rose-950/40',
          border: 'border-rose-500/30',
          text: 'text-rose-700 dark:text-rose-400',
          badgeBg: 'bg-rose-600 text-white',
          icon: ShieldAlert,
        };
      case 'metered':
        return {
          bg: 'bg-blue-500/10 dark:bg-blue-950/40',
          border: 'border-blue-500/30',
          text: 'text-blue-700 dark:text-blue-400',
          badgeBg: 'bg-blue-600 text-white',
          icon: DollarSign,
        };
    }
  };

  const theme = getStatusColorTheme();
  const StatusIcon = theme.icon;

  const sideMap: Record<string, string> = {
    N: t('north_curb'),
    S: t('south_curb'),
    E: t('east_curb'),
    W: t('west_curb'),
    All: t('both_sides'),
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 max-w-lg mx-auto px-2 sm:px-4 pb-[max(calc(env(safe-area-inset-bottom,0px)+16px),24px)] pointer-events-none transition-transform duration-300">
      <div className="pointer-events-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200/90 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden max-h-[82vh] flex flex-col">
        {/* Sticky Top Bar with Pull-Down Pill & Pinned Close Button */}
        <div className="w-full px-4 pt-3 pb-1 flex items-center justify-between shrink-0">
          <div className="w-8 h-8" /> {/* Balances close button for true centering */}
          <div className="w-12 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white flex items-center justify-center transition-colors shadow-2xs active:scale-95"
            aria-label="Close details"
            title="Close details"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto px-4 pb-4 space-y-4">
          {/* Header Card */}
          <div className="flex items-start justify-between gap-3 pt-1">
            <div className="space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span>{segment.borough}</span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Compass className="w-3 h-3" />
                  <span>{sideMap[segment.sideOfStreet] || segment.sideOfStreet}</span>
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white leading-tight">
                {segment.onStreet}
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {t('between_label')} <span className="font-semibold">{segment.fromStreet}</span> {t('and_label')}{' '}
                <span className="font-semibold">{segment.toStreet}</span>
              </p>
            </div>
          </div>

          {/* Simulated Time Notice if user is exploring another hour */}
          {!isNow && selectedTime && (
            <div className="flex items-center justify-between px-3.5 py-2 rounded-2xl bg-amber-500/15 border border-amber-500/35 text-amber-950 dark:text-amber-200 text-xs">
              <div className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>
                  Simulating <strong>{selectedTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</strong>
                </span>
              </div>
              {onResetToNow && (
                <button
                  type="button"
                  onClick={onResetToNow}
                  className="px-2.5 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-black text-[10px] transition-transform active:scale-95 shadow-xs"
                >
                  Sync to Live
                </button>
              )}
            </div>
          )}

          {/* Status Banner */}
          <div className={`p-3.5 rounded-2xl border ${theme.bg} ${theme.border} space-y-2`}>
            <div className="flex items-center justify-between gap-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-xs ${theme.badgeBg}`}>
                {segment.statusBadge}
              </span>

              {segment.timeUntilChangeMinutes !== undefined && (
                <div className="flex items-center space-x-1 text-xs font-semibold text-gray-600 dark:text-gray-300">
                  <Clock className="w-3.5 h-3.5 text-gray-500" />
                  <span>
                    {segment.timeUntilChangeMinutes > 60
                      ? `${Math.floor(segment.timeUntilChangeMinutes / 60)}h ${segment.timeUntilChangeMinutes % 60}m`
                      : `${segment.timeUntilChangeMinutes} min`}
                  </span>
                </div>
              )}
            </div>

            <div>
              <h3 className={`text-base font-bold ${theme.text} leading-snug flex items-center`}>
                <StatusIcon className="w-4 h-4 mr-1.5 shrink-0" />
                <span>{segment.statusHeadline}</span>
              </h3>
              <p className="text-xs text-gray-700 dark:text-gray-300 mt-0.5 leading-relaxed">
                {segment.statusDescription}
              </p>
            </div>
          </div>

          {/* Prominent "Until When You Can Park" Card */}
          {segment.parkingTimeline && (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/50 to-blue-50/60 dark:from-emerald-950/40 dark:via-gray-900/60 dark:to-blue-950/30 border border-emerald-300/80 dark:border-emerald-700/50 space-y-3 shadow-xs">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-xl bg-emerald-600 text-white shadow-xs">
                    <CalendarClock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block">
                      {segment.parkingTimeline.canParkNow ? t('can_park_until') : t('when_you_can_park')}
                    </span>
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
                      {segment.parkingTimeline.nextEventTitle}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black shadow-xs ${
                    segment.parkingTimeline.canParkNow
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 text-white'
                  }`}>
                    {segment.parkingTimeline.durationFormatted}
                  </span>
                </div>
              </div>

              {/* Primary Target Time Box */}
              <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl p-3 border border-emerald-200/70 dark:border-emerald-800/50 shadow-2xs space-y-1.5">
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <span className="text-base sm:text-lg font-black text-gray-900 dark:text-white tracking-tight">
                    {segment.parkingTimeline.canParkUntilFormatted}
                  </span>
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {segment.parkingTimeline.nextEventDescription}
                </p>

                {segment.parkingTimeline.resumeParkingFormatted && (
                  <div className="mt-2 pt-2 border-t border-gray-200/80 dark:border-gray-700/80 flex items-center space-x-1.5 text-xs text-rose-600 dark:text-rose-400 font-bold">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>{t('active_restriction_ends_at')} {segment.parkingTimeline.resumeParkingFormatted}</span>
                  </div>
                )}

                {segment.parkingTimeline.canParkNow && segment.status === 'free' && (
                  <div className="mt-1 flex items-center space-x-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                    <span>{t('outside_restrictions_note')}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ParkNYC Muni-Meter Section if metered */}
          {segment.meterInfo && (
            <div className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/50 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300">
                    ParkNYC Muni-Meter Info
                  </span>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-200/70 dark:bg-blue-900/70 text-blue-900 dark:text-blue-200">
                  Zone {segment.meterInfo.payByCell}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-xl">
                  <span className="text-[10px] text-gray-500 block uppercase">{t('operational_hours')}</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {segment.meterInfo.allVehiclesHours || segment.meterInfo.commercialHours || 'Standard Hours'}
                  </span>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-xl">
                  <span className="text-[10px] text-gray-500 block uppercase">{t('max_duration')}</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {segment.meterInfo.allVehiclesDuration || segment.meterInfo.commercialDuration || '2 Hours'}
                  </span>
                </div>
              </div>

              {segment.meterInfo.allVehiclesRate && (
                <div className="text-xs text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 p-2 rounded-xl">
                  <span className="text-[10px] text-gray-500 block uppercase">{t('parking_rates')}</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {segment.meterInfo.allVehiclesRate}
                  </span>
                </div>
              )}

              {/* Dynamic Regional Payment Trigger & Zone Copy */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2">
                  {/* 1-tap Copy Zone Button */}
                  <button
                    type="button"
                    onClick={() => handleCopyZone(segment.meterInfo!.payByCell)}
                    className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-all active:scale-[0.98] border shadow-xs ${
                      copiedZone
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                        : 'bg-white/95 dark:bg-gray-800/95 text-blue-700 dark:text-blue-300 hover:bg-blue-50/80 dark:hover:bg-gray-700/80 border-blue-300 dark:border-blue-700'
                    }`}
                  >
                    {copiedZone ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{t('copied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span>Parking Zone #{segment.meterInfo.payByCell}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Regional Provider App Launcher & Web Fallback */}
                {regionProfile ? (
                  <PaymentTrigger
                    primaryProvider={regionProfile.primaryProvider}
                    transitProvider={regionProfile.transitProvider}
                    zoneNumber={segment.meterInfo.payByCell}
                  />
                ) : (
                  <PaymentTrigger
                    primaryProvider={{
                      name: 'ParkNYC',
                      scheme: 'flowbird://',
                      webFallback: 'https://www.parknyc.org',
                      badgeText: 'Pay via ParkNYC'
                    }}
                    zoneNumber={segment.meterInfo.payByCell}
                  />
                )}
              </div>
            </div>
          )}

          {/* Unintrusive NYC 311 & Weather Advisory Card (Option 2 & 3) */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <div className={`p-1.5 rounded-lg ${
                  advisory?.hasStormAlert
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                }`}>
                  {advisory?.hasStormAlert ? <CloudSnow className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
                    {t('nyc_311_title')}
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white text-xs">
                    {advisory?.hasStormAlert ? advisory.event : t('nyc_311_subtitle')}
                  </span>
                </div>
              </div>

              <a
                href={advisory?.portalUrl || 'https://portal.311.nyc.gov/'}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-[10px] font-bold text-blue-600 dark:text-blue-300 border border-gray-200 dark:border-gray-600 flex items-center space-x-1 shrink-0 transition-colors shadow-2xs"
              >
                <span>portal.311.nyc.gov</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">
              {advisory?.aspAdvice || t('nyc_311_default_advice')}
            </p>
          </div>

          {/* Official NYC DOT Signs Section */}
          <div className="space-y-2">
            <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              <Info className="w-3.5 h-3.5 text-gray-500" />
              <span>{t('official_signs_title')} ({segment.signs.length})</span>
            </div>

            <div className="space-y-2">
              {segment.signs.map((sign, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 flex items-start space-x-3 text-xs"
                >
                  <div className="p-1 rounded bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 shrink-0 font-mono text-[10px] font-bold">
                    {sign.signCode || `DOT-${idx + 1}`}
                  </div>
                  <div className="space-y-0.5 flex-1">
                    <p className="font-medium text-gray-900 dark:text-gray-100 leading-snug">
                      {sign.description}
                    </p>
                    {sign.arrowDirection && (
                      <span className="text-[10px] text-gray-500 dark:text-gray-400 block">
                        {t('arrow_label')} {sign.arrowDirection}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Google AdSense Monetization Banner (Sticky Bottom Sheet Anchor) */}
          <div className="pt-1">
            <AdBanner format="banner-320x50" />
          </div>
        </div>
      </div>
    </div>
  );
};
