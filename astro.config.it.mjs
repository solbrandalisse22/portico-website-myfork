import shared from "./astro.config.shared.mjs";
import { defineConfig } from "astro/config";

export default defineConfig({
  ...shared,
  site: "https://www.porticosport.it",
  srcDir: "./src/it",
  i18n: {
    defaultLocale: "it",
    locales: ["es", "en", "fr", "it", "de"],
    routing: {
      prefixDefaultLocale: false,
    },
    domains: {
      de: "https://porticosport.de",
      fr: "https://porticosport.fr",
      es: "https://porticosport.es",
      en: "https://porticosport.com",
    },
  },
  experimental: {
    i18nDomains: true,
  },
});
