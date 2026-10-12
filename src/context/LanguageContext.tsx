import React, { createContext, useContext, useState, useMemo, type ReactNode } from 'react';
import {
  ENABLE_I18N,
  DEFAULT_LOCALE,
  SUPPORTED_LANGUAGES,
  type SupportedLocale,
  type LanguageOption,
} from '../i18n/config';
import { translations, type TranslationKey } from '../i18n/translations';

interface LanguageContextType {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: (key: TranslationKey) => string;
  languages: LanguageOption[];
  isI18nEnabled: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: (key: TranslationKey) => translations[DEFAULT_LOCALE][key] || key,
  languages: SUPPORTED_LANGUAGES,
  isI18nEnabled: ENABLE_I18N,
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<SupportedLocale>(() => {
    if (!ENABLE_I18N) return DEFAULT_LOCALE;
    if (typeof window === 'undefined') return DEFAULT_LOCALE;

    // 1. Check saved choice in localStorage
    const saved = localStorage.getItem('streetpark_locale') as SupportedLocale;
    if (saved && (saved === 'en' || saved === 'es' || saved === 'zh')) {
      return saved;
    }

    // 2. Auto-detect browser/system language
    const navLang = navigator.language?.toLowerCase() || '';
    if (navLang.startsWith('es')) return 'es';
    if (navLang.startsWith('zh')) return 'zh';

    return DEFAULT_LOCALE;
  });

  const setLocale = (newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('streetpark_locale', newLocale);
      } catch {}
    }
  };

  const t = useMemo(() => {
    return (key: TranslationKey): string => {
      if (!ENABLE_I18N) {
        return translations[DEFAULT_LOCALE][key] || key;
      }
      const dict = translations[locale] || translations[DEFAULT_LOCALE];
      return dict[key] || translations[DEFAULT_LOCALE][key] || key;
    };
  }, [locale]);

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t,
        languages: SUPPORTED_LANGUAGES,
        isI18nEnabled: ENABLE_I18N,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
