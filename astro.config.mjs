import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap({
    exclude:['/elevated-platform', 'news/5-key-benefits-of-portico-sport-canopies-for-sports-and-tennis-clubs']
  })]
});
