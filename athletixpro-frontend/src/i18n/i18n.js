import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationIT from './locales/it/translation.json';
import translationES from './locales/es/translation.json';
import translationFR from './locales/fr/translation.json';
import translationDE from './locales/de/translation.json';
import translationPT from './locales/pt/translation.json';
import translationNL from './locales/nl/translation.json';
import translationGR from './locales/gr/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
  it: {
    translation: translationIT,
  },
  es: {
    translation: translationES,
  },
  fr: {
    translation: translationFR,
  },
  de: {
    translation: translationDE,
  },
  pt: {
    translation: translationPT,
  },
  nl: {
    translation: translationNL,
  },
  gr: {
    translation: translationGR,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en', // fallback language
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
