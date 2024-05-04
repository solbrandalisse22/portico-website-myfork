import shared from "./astro.config.shared.mjs";
import { defineConfig } from "astro/config";

export default defineConfig({
  ...shared,
  site: "https://porticosport.de",
  srcDir: "./src/de",
  i18n: {
    defaultLocale: "de",
    locales: ["es", "en", "fr", "it", "de"],
    routing: {
      prefixDefaultLocale: false,
    },
    domains: {
      fr: "https://porticosport.fr",
      es: "https://porticosport.es",
      en: "https://porticosport.com",
      it: "https://porticosport.it",
    },
  },
  experimental: {
    i18nDomains: true,
  },
});
