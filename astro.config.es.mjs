import shared from "./astro.config.shared.mjs";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import sitemap from '@astrojs/sitemap';
import { defineConfig } from "astro/config";
import { getCustomPages, getI18N } from "./src/shared/i18n/index";

const language = 'es';
const i18n = getI18N({language});
const customPages = await getCustomPages({ language })

export default defineConfig({
  ...shared,
  site: i18n.SITE,
  srcDir: "./src/es",
  redirects: {
    "/pistas-de-padel": "/",
    "/pistas-de-padel/panoramique": "/panoramic",
    "/pistas-de-padel/flow": "/tournament",
    "/pistas-de-padel/club": "/club",
    "/pistas-de-padel/club-force-80": "/club-force-80",
    "/pistas-de-padel/mini": "/mini",
    "/pistas-de-padel/mobile": "/mobile",
    "/pistas-de-padel/panoramic-force-80": "/panoramic-force-80",
    "/pistas-de-padel/single": "/single",
    "/flow": "/tournament",
    "/en/nuestra-fabrica":"/nuestra-fabrica",
  },
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en", "fr", "it", "de"],
    routing: {
      prefixDefaultLocale: false,
    },
    domains: {
      de: "https://www.porticosport.de",
      fr: "https://www.porticosport.fr",
      en: "https://www.porticosport.com",
      it: "https://www.porticosport.it",
    },
  },
  experimental: {
    i18nDomains: true,
  },
  integrations: [tailwind(), preact(), sitemap({
   
    serialize(item) {
      console.log(item.url)
      const lastCharacter = item.url.slice(-1);
      if (lastCharacter === "/") {
        item.url = item.url.slice(0, -1);
      }
                      
      return item;
    },
    customPages,
    exclude :["noticias/portico-sport-en-europa"],
  }),],
});
