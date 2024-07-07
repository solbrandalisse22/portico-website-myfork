import type { CookieConsentConfig } from 'vanilla-cookieconsent';
import english from '../../i18n/en.json'
import spanish from '../../i18n/es.json'
import french from '../../i18n/fr.json'
import germany from '../../i18n/de.json'
import italian from '../../i18n/it.json'

const languages = {
  en: english,
  es: spanish,
  fr: french,
  de: germany,
  it: italian,
}

let languageConfig = languages['en'].COOKIE_CONSENT

if (window.location.host.includes('porticosport.es')) {
  languageConfig = languages['es'].COOKIE_CONSENT
} else if (window.location.host.includes('porticosport.fr')) {
  languageConfig = languages['fr'].COOKIE_CONSENT
} else if (window.location.host.includes('porticosport.de')) {
  languageConfig = languages['de'].COOKIE_CONSENT
} else if (window.location.host.includes('porticosport.it')) {
  languageConfig = languages['it'].COOKIE_CONSENT
}

export const config: CookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: 'box inline',
      position: 'bottom',
    },
    preferencesModal: {
      layout: 'box',
      position: 'right',
      equalWeightButtons: true,
      flipButtons: false,
    },
  },
  categories: {
    necessary: {
      readOnly: true,
    },
    functionality: {},
    analytics: {
      services: {
        ga4: {
          label: '<a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank">Google Analytics 4</a>',
          cookies: [
            {
              name: /^_ga/,
            },
          ],
        },
      },
    },
  },
  language: {
    default: 'en',
    autoDetect: 'browser',
    translations: {
      en: languageConfig,
    },
  },
};
