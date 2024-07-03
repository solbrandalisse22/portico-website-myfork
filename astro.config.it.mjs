import shared from "./astro.config.shared.mjs";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import sitemap from '@astrojs/sitemap';
import cookieconsent from "@jop-software/astro-cookieconsent";
import { defineConfig } from "astro/config";
import { getCustomPages, getI18N } from "./src/shared/i18n/index";

const language = 'it';
const i18n = getI18N({language});
const customPages = await getCustomPages({ language })

export default defineConfig({
  ...shared,
  site: i18n.SITE,
  srcDir: "./src/it",
  i18n: {
    defaultLocale: "it",
    locales: ["es", "en", "fr", "it", "de"],
    routing: {
      prefixDefaultLocale: false,
    },
    domains: {
      de: "https://www.porticosport.de",
      fr: "https://www.porticosport.fr",
      es: "https://www.porticosport.es",
      en: "https://www.porticosport.com",
    },
  },
  experimental: {
    i18nDomains: true,
  },
  integrations: [tailwind(), preact(), sitemap({
    serialize(item) {
      const lastCharacter = item.url.slice(-1);
      if (lastCharacter === "/") {
        item.url = item.url.slice(0, -1);
      }
      return item;
    },
    customPages,
  }), cookieconsent({
    guiOptions: {
      consentModal: {
        layout: 'cloud',
        position: 'bottom center',
        equalWeightButtons: true,
        flipButtons: false,
      },
      preferencesModal: {
        layout: "box",
        position: "right",
        equalWeightButtons: true,
        flipButtons: false,
      },
    },
  }),],
});
