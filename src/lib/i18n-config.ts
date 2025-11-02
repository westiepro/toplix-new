export const locales = ['en', 'pt', 'es', 'fr', 'de', 'sv'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  pt: 'Português',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  sv: 'Svenska',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  pt: '🇵🇹',
  es: '🇪🇸',
  fr: '🇫🇷',
  de: '🇩🇪',
  sv: '🇸🇪',
};

