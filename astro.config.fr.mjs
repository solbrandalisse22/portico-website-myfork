import shared from "./astro.config.shared.mjs";
import { defineConfig } from "astro/config";

export default defineConfig({
  ...shared,
  site: "https://porticosport.fr",
  srcDir: "./src/fr",
  i18n: {
    defaultLocale: "fr",
    locales: ["es", "en", "fr", "it"],
    routing: {
      prefixDefaultLocale: false,
    },
    domains: {
      en: "https://porticosport.com",
      es: "https://porticosport.es",
      it: "https://porticosport.it",
    },
  },
  experimental: {
    i18nDomains: true,
  },
});
