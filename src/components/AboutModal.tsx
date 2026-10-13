import React, { useState, useMemo } from 'react';
import {
  X,
  ShieldAlert,
  Database,
  HelpCircle,
  ExternalLink,
  Info,
  CheckCircle2,
  Sliders,
  Clock,
  ShieldCheck,
  Smartphone,
  Share2,
  Globe,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { aboutContent } from '../i18n/aboutContent';
import { TRISTATE_FAQS } from '../data/triStateFaq';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const { t, locale, setLocale, languages, isI18nEnabled } = useLanguage();
  const [activeFaqFilter, setActiveFaqFilter] = useState<'ALL' | 'NYC' | 'NJ' | 'CT'>('ALL');

  const filteredFaqs = useMemo(() => {
    if (activeFaqFilter === 'ALL') return TRISTATE_FAQS;
    return TRISTATE_FAQS.filter((f) => f.jurisdiction === activeFaqFilter);
  }, [activeFaqFilter]);

  if (!isOpen) return null;

  const content = aboutContent[locale] || aboutContent.en;

  const handleDismiss = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('streetpark_disclaimer_viewed', 'true');
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 pt-[max(env(safe-area-inset-top,16px),16px)] pb-[max(env(safe-area-inset-bottom,16px),16px)] bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={handleDismiss}
    >
      <div 
        className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 w-full max-w-lg max-h-[calc(100dvh-env(safe-area-inset-top,16px)-env(safe-area-inset-bottom,16px)-32px)] sm:max-h-[85dvh] flex flex-col overflow-hidden text-gray-800 dark:text-gray-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-3.5 sm:p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900 shrink-0 z-10">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-2xl bg-blue-600 text-white shadow-xs">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-gray-900 dark:text-white leading-tight">
                {t('about_title')}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {content.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="p-2 sm:p-2.5 rounded-xl hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5 text-xs leading-relaxed">
          {/* Legal Disclaimer Box */}
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 space-y-1.5">
            <div className="flex items-center space-x-2 text-rose-700 dark:text-rose-400 font-bold text-xs">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{content.disclaimer.title}</span>
            </div>
            <p className="text-rose-900/90 dark:text-rose-200 text-[11px] leading-relaxed">
              <strong>StreetPark</strong> {content.disclaimer.p1}
            </p>
            <p className="text-rose-800/80 dark:text-rose-300 text-[11px] leading-relaxed">
              {content.disclaimer.p2}
            </p>
          </div>

          {/* Language Selection Card */}
          {isI18nEnabled && (
            <div className="space-y-2">
              <div className="flex items-center space-x-1.5 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-wider">
                <Globe className="w-4 h-4 text-blue-600" />
                <span>Language / Idioma / 语言</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {languages.map((lang) => {
                  const isSelected = lang.code === locale;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setLocale(lang.code)}
                      className={`py-2 px-2.5 rounded-2xl flex flex-col items-center justify-center space-y-1 transition-all border active:scale-95 ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-500 text-blue-700 dark:text-blue-300 font-bold shadow-xs ring-2 ring-blue-500/20'
                          : 'bg-gray-50 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-[11px] font-semibold">{lang.nativeName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Color Legend & Map Guide */}
          <div className="space-y-2.5">
            <div className="flex items-center space-x-1.5 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span>{content.legendTitle}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              {/* Free */}
              <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/50 space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-emerald-800 dark:text-emerald-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{content.legend.freeTitle}</span>
                </div>
                <p className="text-emerald-900/80 dark:text-emerald-200/80 text-[10.5px]">
                  {content.legend.freeDesc}
                </p>
              </div>

              {/* Meter */}
              <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/50 space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-blue-800 dark:text-blue-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                  <span>{content.legend.meterTitle}</span>
                </div>
                <p className="text-blue-900/80 dark:text-blue-200/80 text-[10.5px]">
                  {content.legend.meterDesc}
                </p>
              </div>

              {/* Soon */}
              <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-amber-800 dark:text-amber-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                  <span>{content.legend.soonTitle}</span>
                </div>
                <p className="text-amber-900/80 dark:text-amber-200/80 text-[10.5px]">
                  {content.legend.soonDesc}
                </p>
              </div>

              {/* No Parking */}
              <div className="p-2.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/50 space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-rose-800 dark:text-rose-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                  <span>{content.legend.restrictedTitle}</span>
                </div>
                <p className="text-rose-900/80 dark:text-rose-200/80 text-[10.5px]">
                  {content.legend.restrictedDesc}
                </p>
              </div>
            </div>
          </div>

          {/* How Time Simulation Works */}
          <div className="space-y-2">
            <div className="flex items-center space-x-1.5 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-wider">
              <Sliders className="w-4 h-4 text-blue-600" />
              <span>{content.simulationTitle}</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-3 border border-gray-100 dark:border-gray-800 space-y-2 text-[11px]">
              {content.simulationSteps.map((step, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <strong>{step.title}</strong>: {step.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Official Data Sources & Attribution */}
          <div className="space-y-2">
            <div className="flex items-center space-x-1.5 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-wider">
              <Database className="w-4 h-4 text-blue-600" />
              <span>{content.sourcesTitle}</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-3 border border-gray-100 dark:border-gray-800 space-y-2 text-[11px]">
              {content.sources.map((s, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>{s.title}</strong>: {s.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Tri-State FAQ & Ticket Dispute Knowledge Base */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-amber-500" />
                <span>Tri-State FAQ & Rules Knowledge Base</span>
              </div>
            </div>

            {/* State Jurisdiction Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {(['ALL', 'NYC', 'NJ', 'CT'] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFaqFilter(filter)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all shrink-0 border ${
                    activeFaqFilter === filter
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-200/70'
                  }`}
                >
                  {filter === 'ALL' ? 'All Jurisdictions' : filter === 'NYC' ? '🗽 New York City' : filter === 'NJ' ? '🛡️ New Jersey' : '🌲 Connecticut'}
                </button>
              ))}
            </div>

            {/* Filtered FAQs */}
            <div className="space-y-2 text-[11px]">
              {filteredFaqs.map((faq, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-bold text-gray-900 dark:text-white">
                      {faq.q}
                    </p>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 shrink-0">
                      {faq.jurisdiction}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Add to Home Screen Instructions */}
          <div className="space-y-2.5">
            <div className="flex items-center space-x-1.5 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-wider">
              <Smartphone className="w-4 h-4 text-purple-600" />
              <span>{content.pwaTitle}</span>
            </div>

            <div className="bg-purple-50/70 dark:bg-purple-950/30 rounded-2xl p-3 border border-purple-200/80 dark:border-purple-900/50 space-y-2.5 text-[11px] leading-relaxed">
              <p className="text-purple-950 dark:text-purple-200 font-medium">
                {content.pwaSubtitle}
              </p>

              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-white dark:bg-gray-800 border border-purple-100 dark:border-purple-900/40 space-y-1">
                  <div className="flex items-center space-x-1.5 font-bold text-gray-900 dark:text-white">
                    <Share2 className="w-3.5 h-3.5 text-blue-500" />
                    <span>{content.pwaIosTitle}</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-0.5 text-gray-600 dark:text-gray-300 pl-1 text-[10.5px]">
                    {content.pwaIosSteps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-gray-800 border border-purple-100 dark:border-purple-900/40 space-y-1">
                  <div className="flex items-center space-x-1.5 font-bold text-gray-900 dark:text-white">
                    <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{content.pwaAndroidTitle}</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-0.5 text-gray-600 dark:text-gray-300 pl-1 text-[10.5px]">
                    {content.pwaAndroidSteps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Policy, Cookies & PII Disclosures */}
          <div className="space-y-2.5">
            <div className="flex items-center space-x-1.5 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{content.privacyTitle}</span>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-3 border border-gray-100 dark:border-gray-800 space-y-2 text-[11px] leading-relaxed">
              <div>
                <strong className="text-gray-900 dark:text-white block font-semibold">{content.privacy.piiTitle}</strong>
                <span className="text-gray-600 dark:text-gray-300">
                  {content.privacy.piiDesc}
                </span>
              </div>

              <div>
                <strong className="text-gray-900 dark:text-white block font-semibold">{content.privacy.gpsTitle}</strong>
                <span className="text-gray-600 dark:text-gray-300">
                  {content.privacy.gpsDesc}
                </span>
              </div>

              <div>
                <strong className="text-gray-900 dark:text-white block font-semibold">{content.privacy.adsTitle}</strong>
                <span className="text-gray-600 dark:text-gray-300">
                  {content.privacy.adsDesc}{' '}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 font-semibold underline"
                  >
                    Google Ads Settings
                  </a>{' '}
                  or{' '}
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 font-semibold underline"
                  >
                    AboutAds.info
                  </a>.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between text-xs shrink-0 z-10">
          <a
            href="https://portal.311.nyc.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 font-semibold flex items-center space-x-1 hover:underline"
          >
            <span>NYC 311 Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={handleDismiss}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs shadow-md shadow-blue-600/25 transition-transform active:scale-95 cursor-pointer"
          >
            {t('disclaimer_agree')}
          </button>
        </div>
      </div>
    </div>
  );
};
