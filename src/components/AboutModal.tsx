import React from 'react';
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
  Calendar,
  ShieldCheck,
  Smartphone,
  Share2,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  if (!isOpen) return null;

  const handleDismiss = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('streetpark_disclaimer_viewed', 'true');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden text-gray-800 dark:text-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/70 dark:bg-gray-800/40">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-2xl bg-blue-600 text-white shadow-xs">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-gray-900 dark:text-white leading-tight">
                {t('about_title')}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Map legend, time simulation & legal disclaimers
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
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
              <span>Legal Disclaimer & Driver Responsibility</span>
            </div>
            <p className="text-rose-900/90 dark:text-rose-200 text-[11px] leading-relaxed">
              <strong>StreetPark</strong> is an independent civic utility and is <strong>NOT affiliated with, sponsored by, or endorsed by the City of New York or the NYC Department of Transportation (NYC DOT)</strong>.
            </p>
            <p className="text-rose-800/80 dark:text-rose-300 text-[11px] leading-relaxed">
              Physical street signs posted on the block, temporary construction placards, film shoot restrictions, emergency tow-away orders, and police instructions <strong>always supersede any digital information</strong>. The driver remains solely responsible for parking compliance. StreetPark and its operators assume no legal liability for parking summonses, fines, or towing fees.
            </p>
          </div>

          {/* Color Legend & Map Guide */}
          <div className="space-y-2.5">
            <div className="flex items-center space-x-1.5 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span>Map Color Legend</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              {/* Free */}
              <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/50 space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-emerald-800 dark:text-emerald-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>Free (Green)</span>
                </div>
                <p className="text-emerald-900/80 dark:text-emerald-200/80 text-[10.5px]">
                  Legal free parking permitted. No active street cleaning or meter fees in effect. Outside posted restriction windows, NYC residential curbs are free and unlimited.
                </p>
              </div>

              {/* Meter */}
              <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/50 space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-blue-800 dark:text-blue-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                  <span>Meter (Blue)</span>
                </div>
                <p className="text-blue-900/80 dark:text-blue-200/80 text-[10.5px]">
                  Active NYC Muni-Meter zone. Pay-by-cell required via official ParkNYC app or kiosk. Subject to posted maximum stay limits (1–3 hours). Free outside operating hours!
                </p>
              </div>

              {/* Soon */}
              <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-amber-800 dark:text-amber-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                  <span>Soon (&lt;60Min) (Amber)</span>
                </div>
                <p className="text-amber-900/80 dark:text-amber-200/80 text-[10.5px]">
                  Status change in &lt;60 minutes! Spots opening up soon (sweeping/meters ending shortly), or active legal parking expiring soon as restrictions begin.
                </p>
              </div>

              {/* No Parking */}
              <div className="p-2.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/50 space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-rose-800 dark:text-rose-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                  <span>No Parking (Red)</span>
                </div>
                <p className="text-rose-900/80 dark:text-rose-200/80 text-[10.5px]">
                  Parking prohibited. Active Alternate Side street sweeping (ASP), No Standing Anytime, or commercial truck loading only. Violators are ticketed and towed.
                </p>
              </div>
            </div>
          </div>

          {/* How Time Simulation Works */}
          <div className="space-y-2">
            <div className="flex items-center space-x-1.5 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-wider">
              <Sliders className="w-4 h-4 text-blue-600" />
              <span>How Time Simulation Works</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-3 border border-gray-100 dark:border-gray-800 space-y-2 text-[11px]">
              <div className="flex items-start space-x-2">
                <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <strong>Tap "Simulate"</strong>: Expands the interactive time control dial at the bottom of the screen.
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Sliders className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <strong>Slide Across 24 Hours</strong>: Drag the time slider to test rules at any hour of the day or night (e.g., test what curbs become legal at 7:00 PM tonight or 8:30 AM tomorrow).
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <strong>Day Selector</strong>: Use <code className="font-mono text-[10px] bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">-1 Day</code> / <code className="font-mono text-[10px] bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">+1 Day</code> to plan weekend parking or check street sweeping for upcoming days.
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Return to Live Feed</strong>: Tap <strong className="text-emerald-700 dark:text-emerald-300">"Now"</strong> anytime to instantly snap back to real-time clock synchronization.
                </div>
              </div>
            </div>
          </div>

          {/* Official Data Sources & Attribution */}
          <div className="space-y-2">
            <div className="flex items-center space-x-1.5 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-wider">
              <Database className="w-4 h-4 text-blue-600" />
              <span>Official NYC Data Sources & Attribution</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-3 border border-gray-100 dark:border-gray-800 space-y-2 text-[11px]">
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>NYC Open Data (NYC DOT GIS)</strong>: Parking sign regulations, curb order numbers, coordinates, and Muni-Meter pay-by-cell zones via official NYC Socrata datasets.
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>NYC 311 Daily Service Feeds</strong>: Real-time Alternate Side Parking (ASP) suspension notices and official holiday calendars.
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Basemap Data</strong>: Vector streets and geometry provided © Esri, HERE, Garmin, and OpenStreetMap contributors.
                </div>
              </div>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="space-y-2.5">
            <div className="flex items-center space-x-1.5 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span>Frequently Asked Questions</span>
            </div>

            <div className="space-y-2 text-[11px]">
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 space-y-1">
                <p className="font-bold text-gray-900 dark:text-white">
                  Is parking free on Sundays in NYC?
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes! According to NYC DOT traffic rules, parking meters are not in effect on Sundays throughout all five boroughs unless a posted sign explicitly states Sunday meter hours.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 space-y-1">
                <p className="font-bold text-gray-900 dark:text-white">
                  What is Alternate Side Parking (ASP)?
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Alternate Side Parking regulations require drivers to vacate curbs for 90 minutes to allow NYC Department of Sanitation street sweepers to clean. Violators are subject to a $65 summons.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 space-y-1">
                <p className="font-bold text-gray-900 dark:text-white">
                  What is the difference between Major and Minor Holidays?
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  On <strong>Major Legal Holidays</strong> (New Year's Day, Memorial Day, July 4th, Labor Day, Thanksgiving, Christmas), both ASP and parking meters are suspended. On <strong>Minor Religious/Civic Holidays</strong> (Columbus Day, MLK Day, Presidents' Day, etc.), only ASP is suspended while parking meters remain in full effect.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 space-y-1">
                <p className="font-bold text-gray-900 dark:text-white">
                  How does Commercial mode work?
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Toggling the "Commercial" switch evaluates curbs from the perspective of commercial delivery trucks, displaying dedicated commercial loading meters and zones where passenger vehicles are prohibited.
                </p>
              </div>
            </div>
          </div>

          {/* Add to Home Screen Instructions */}
          <div className="space-y-2.5">
            <div className="flex items-center space-x-1.5 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-wider">
              <Smartphone className="w-4 h-4 text-purple-600" />
              <span>Save to Home Screen (Mobile App Mode)</span>
            </div>

            <div className="bg-purple-50/70 dark:bg-purple-950/30 rounded-2xl p-3 border border-purple-200/80 dark:border-purple-900/50 space-y-2.5 text-[11px] leading-relaxed">
              <p className="text-purple-950 dark:text-purple-200 font-medium">
                Install StreetPark directly onto your smartphone home screen for a fast, full-screen native app experience without browser URL bars:
              </p>

              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-white dark:bg-gray-800 border border-purple-100 dark:border-purple-900/40 space-y-1">
                  <div className="flex items-center space-x-1.5 font-bold text-gray-900 dark:text-white">
                    <Share2 className="w-3.5 h-3.5 text-blue-500" />
                    <span>iPhone & iPad (Safari)</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-0.5 text-gray-600 dark:text-gray-300 pl-1 text-[10.5px]">
                    <li>Open <strong>park.djtechnyc.com</strong> in Safari.</li>
                    <li>Tap the <strong>Share</strong> button (square icon with an arrow pointing up at the bottom).</li>
                    <li>Scroll down and select <strong>"Add to Home Screen"</strong>.</li>
                    <li>Tap <strong>"Add"</strong> in the top-right corner.</li>
                  </ol>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-gray-800 border border-purple-100 dark:border-purple-900/40 space-y-1">
                  <div className="flex items-center space-x-1.5 font-bold text-gray-900 dark:text-white">
                    <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Android (Chrome & Samsung Internet)</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-0.5 text-gray-600 dark:text-gray-300 pl-1 text-[10.5px]">
                    <li>Open <strong>park.djtechnyc.com</strong> in Chrome.</li>
                    <li>Tap the <strong>three vertical dots (⋮)</strong> menu in the upper-right corner.</li>
                    <li>Tap <strong>"Add to Home screen"</strong> (or <strong>"Install app"</strong>).</li>
                    <li>Confirm by tapping <strong>"Install"</strong> or <strong>"Add"</strong>.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Policy, Cookies & PII Disclosures */}
          <div className="space-y-2.5">
            <div className="flex items-center space-x-1.5 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Privacy Policy & Cookie Disclosures</span>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-3 border border-gray-100 dark:border-gray-800 space-y-2 text-[11px] leading-relaxed">
              <div>
                <strong className="text-gray-900 dark:text-white block font-semibold">Zero PII (Personally Identifiable Information) Collection:</strong>
                <span className="text-gray-600 dark:text-gray-300">
                  StreetPark does not require account registration, logins, passwords, or emails to use the map. We do not collect, buy, or sell any personal identifying information.
                </span>
              </div>

              <div>
                <strong className="text-gray-900 dark:text-white block font-semibold">Device Location (GPS):</strong>
                <span className="text-gray-600 dark:text-gray-300">
                  When you tap the "Near Me" GPS button, your coordinates are processed strictly client-side on your device to center the map. Your location is never logged, stored, or transmitted to any server.
                </span>
              </div>

              <div>
                <strong className="text-gray-900 dark:text-white block font-semibold">Advertising & Cookies (Google AdSense):</strong>
                <span className="text-gray-600 dark:text-gray-300">
                  We use Google AdSense to serve advertisements that support server hosting costs. Third-party vendors, including Google, use cookies to serve ads based on prior visits to this website or other sites across the Internet. You may opt out of personalized advertising by visiting{' '}
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
        <div className="p-3.5 sm:p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-800/40 flex items-center justify-between text-xs">
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
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all active:scale-95"
          >
            {t('disclaimer_agree')}
          </button>
        </div>
      </div>
    </div>
  );
};
