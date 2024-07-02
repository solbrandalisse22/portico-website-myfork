import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";

import jopSoftwarecookieconsent from "@jop-software/astro-cookieconsent";

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap(), jopSoftwarecookieconsent()]
});