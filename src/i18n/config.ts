// Language and Internationalization Configuration
// Set ENABLE_I18N to false to immediately revert the entire app to default English without any UI disruptions.
export const ENABLE_I18N = true;

export type SupportedLocale = 'en' | 'es' | 'zh';

export interface LanguageOption {
  code: SupportedLocale;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
];

export const DEFAULT_LOCALE: SupportedLocale = 'en';
