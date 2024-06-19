import shared from "./astro.config.shared.mjs";
import { defineConfig } from "astro/config";

export default defineConfig({
  ...shared,
  site: "https://www.porticosport.fr",
  srcDir: "./src/fr",
  redirects: {
    "/terrains-de-padel/panoramique": "/terrains-de-padel/panoramique",
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
});
