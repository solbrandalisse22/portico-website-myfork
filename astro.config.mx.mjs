import shared from "./astro.config.shared.mjs";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import sitemap from '@astrojs/sitemap';
import { defineConfig } from "astro/config";
import { getCustomPages, getI18N } from "./src/shared/i18n/index";

const language = 'en';
const i18n = getI18N({language});
const customPages = await getCustomPages({ language })

export default defineConfig({
  ...shared,
  srcDir: "./src/es",
  site: i18n.SITE,
  redirects: {
    "/nuestra-fabrica":"https://www.porticosport.es/nuestra-fabrica",
  },
  
  i18n: {
    defaultLocale: "en",
    locales: ["es", "en", "fr", "it", "de"],
    routing: {
      prefixDefaultLocale: false
    },
    domains: {
      de: "https://www.porticosport.de",
      fr: "https://www.porticosport.fr",
      es: "https://www.porticosport.es",
      it: "https://www.porticosport.it"
    }
  },
  experimental: {
    i18nDomains: true
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
  }),],
});
