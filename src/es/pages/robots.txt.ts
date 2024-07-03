import type { APIRoute } from 'astro';
import { getI18N } from "../../shared/i18n/index";

const i18n = getI18N({ language: 'es' });

const robotsTxt = `
User-agent: *
Allow: /
Sitemap: ${new URL('sitemap-index.xml', i18n.SITE).href}
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};