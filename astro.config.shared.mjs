import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import preact from "@astrojs/preact";
import sitemap from '@astrojs/sitemap';
import cookieconsent from "@jop-software/astro-cookieconsent";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact(), sitemap(), cookieconsent({
    guiOptions: {
      consentModal: {
        layout: 'cloud',
        position: 'bottom center',
        equalWeightButtons: true,
        flipButtons: false,
      },
      preferencesModal: {
        layout: "box",
        position: "right",
        equalWeightButtons: true,
        flipButtons: false,
      },
    },
  }),],
  cleanUrls: true,
  output: "server",
  adapter: vercel(),
});