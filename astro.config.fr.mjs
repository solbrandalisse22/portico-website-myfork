import shared from "./astro.config.shared.mjs";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import sitemap from '@astrojs/sitemap';
import { defineConfig } from "astro/config";
import { getCustomPages, getI18N } from "./src/shared/i18n/index";

const language = 'fr';
const i18n = getI18N({language});
const customPages = await getCustomPages({ language })

export default defineConfig({
  ...shared,
  site: i18n.SITE,
  srcDir: "./src/fr",
  redirects: {
    "/terrains-de-padel": "/",
    "/terrains-de-padel/panoramique": "/panoramique",
    "/terrains-de-padel/flow": "/tournament",
    "/terrains-de-padel/club": "/club",
    "/terrains-de-padel/club-force-80": "/club-force-80",
    "/terrains-de-padel/mini": "/mini",
    "/terrains-de-padel/mobile": "/mobile",
    "/terrains-de-padel/panoramic-force-80": "/panoramic-force-80",
    "/terrains-de-padel/single": "/single",
    "/flow": "/tournament",
  },
  i18n: {
    defaultLocale: "fr",
    locales: ["es", "en", "fr", "it", "de"],
    routing: {
      prefixDefaultLocale: false,
    },
    domains: {
      de: "https://www.porticosport.de",
      en: "https://www.porticosport.com",
      es: "https://www.porticosport.es",
      it: "https://www.porticosport.it",
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

         const excludePatterns = [
    "https://www.porticosport.fr/distributeur-agree",
    "https://www.porticosport.fr/cookies",
    "https://www.porticosport.fr/contact-client",
    "https://www.porticosport.fr/legal-advice",
    "https://www.porticosport.fr/notre-usine",
    "https://www.porticosport.fr/privacy",
    "https://www.porticosport.fr/projets",
    "https://www.porticosport.fr/travailler-avec-nous"
    
  ];

  for (const pattern of excludePatterns) {
   
      if (item.url === pattern) {
        return null;  
      }}
      return item;
    },
    customPages,
  }),],
});
