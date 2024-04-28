import shared from "./astro.config.shared.mjs";
import { defineConfig } from "astro/config";

export default defineConfig({
  ...shared,
  site: "https://porticosport.es",
  srcDir: "./src/es",
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en", "fr", "it"],
    routing: {
      prefixDefaultLocale: false,
    },
    domains: {
      fr: "https://porticosport.fr",
      en: "https://porticosport.com",
      it: "https://porticosport.it",
    },
  },
  experimental: {
    i18nDomains: true,
  },
});
