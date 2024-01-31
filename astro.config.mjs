import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import preact from "@astrojs/preact";

import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact(), auth()],
  i18n: {
    defaultLocale: 'en',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  output: "hybrid",
  adapter: vercel()
});