import shared from "./astro.config.shared.mjs";
import { defineConfig } from "astro/config";

export default defineConfig({
  ...shared,
  site: "https://www.porticosport.fr",
  srcDir: "./src/fr",
  i18n: {
    defaultLocale: "fr",
    locales: ["es", "en", "fr", "it", "de"],
    routing: {
      prefixDefaultLocale: false,
    },
    domains: {
      de: "https://porticosport.de",
      en: "https://porticosport.com",
      es: "https://porticosport.es",
      it: "https://porticosport.it",
    },
  },
  experimental: {
    i18nDomains: true,
  },
  redirects: [
    {
      source: "https://porticosport.fr/:path*",
      destination: "https://www.porticosport.fr/:path*",
      permanent: true
    },
  ],
});
