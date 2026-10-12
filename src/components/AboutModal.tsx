import React from 'react';
import { X, ShieldAlert, Database, HelpCircle, ExternalLink, Info, CheckCircle2 } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 w-full max-w-lg max-h-[88vh] flex flex-col overflow-hidden text-gray-800 dark:text-gray-200"
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
                About & FAQ
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Data sources, regulations & legal disclaimers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
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
              Physical street signs posted on the block, temporary construction placards, film shoot restrictions, emergency tow-away orders, and police instructions <strong>always supersede any digital information</strong>. The driver remains solely responsible for parking compliance. StreetPark and its operators assume no legal liability for parking tickets, fines, or towing fees.
            </p>
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
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-xs transition-opacity hover:opacity-90"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
