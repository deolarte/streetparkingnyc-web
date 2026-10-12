import React, { useState } from 'react';
import { Globe, X, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageSelector: React.FC = () => {
  const { locale, setLocale, languages, isI18nEnabled } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  if (!isI18nEnabled) return null;

  const currentOption = languages.find((l) => l.code === locale) || languages[0];

  return (
    <>
      {/* Language Trigger Pill Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-2.5 py-1 rounded-lg bg-white/95 dark:bg-gray-800/95 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-[11px] shadow-xs border border-gray-200/90 dark:border-gray-700/80 flex items-center space-x-1.5 shrink-0 transition-transform active:scale-95"
        title="Select Language / Seleccionar Idioma / 选择语言"
        aria-label="Language selection"
      >
        <span className="text-xs">{currentOption.flag}</span>
        <span className="uppercase text-[10.5px] tracking-wide font-black">
          {currentOption.code}
        </span>
        <Globe className="w-3 h-3 text-blue-500 opacity-80" />
      </button>

      {/* Global Centered Language Picker Modal (Never clipped by scrollable parent) */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="w-full max-w-xs bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-4 space-y-3.5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-gray-900 dark:text-white leading-tight">
                    Language / Idioma / 语言
                  </h3>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">
                    Select your preferred language
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Language Options List */}
            <div className="space-y-2">
              {languages.map((lang) => {
                const isSelected = lang.code === locale;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLocale(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all active:scale-[0.98] border ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-400 dark:border-blue-700 text-blue-900 dark:text-blue-200 font-bold shadow-xs'
                        : 'bg-gray-50/70 hover:bg-gray-100 dark:bg-gray-800/60 dark:hover:bg-gray-800 border-gray-200/80 dark:border-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <div className="text-left">
                        <div className="text-xs font-bold leading-tight">
                          {lang.nativeName}
                        </div>
                        <div className="text-[10px] text-gray-500 dark:text-gray-400">
                          {lang.name}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="p-1 rounded-full bg-blue-600 text-white shadow-xs">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
