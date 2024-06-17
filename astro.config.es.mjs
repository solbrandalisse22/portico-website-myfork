import shared from "./astro.config.shared.mjs";
import { defineConfig } from "astro/config";

export default defineConfig({
  ...shared,
  site: "https://www.porticosport.es",
  srcDir: "./src/es",
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
});
