import shared from "./astro.config.shared.mjs";
import { defineConfig } from "astro/config";

export default defineConfig({
  ...shared,
  site: "https://porticosport.it",
  srcDir: "./src/it",
  i18n: {
    defaultLocale: "it",
    locales: ["es", "en", "fr", "it"],
    routing: {
      prefixDefaultLocale: false,
    },
    domains: {
      fr: "https://porticosport.fr",
      es: "https://porticosport.es",
      en: "https://porticosport.com",
    },
  },
  experimental: {
    i18nDomains: true,
  },
});
