const category = 70;

export const GET = async () => {
  const response = await fetch(
    `https://portico.porticosport.com/wp-json/wp/v2/posts?categories=${category}&per_page=100&_embed`
  );
  const posts = await response.json();

  const newsItems = posts.map(post => {
    const slug = post.slug;
    const title = post.title?.rendered || "";
    const publicationDate = new Date(post.date).toISOString();
    const keywords = post.yoast_head_json?.keywords || "";
    const authorName = post._embedded?.author[0]?.name || "Desconocido";

    return `
      <url>
        <loc>https://porticosport.com/news/${slug}/</loc>
        <news:news>
          <news:publication>
            <news:name>${authorName}</news:name>
            <news:language>es</news:language>
          </news:publication>
          <news:publication_date>${publicationDate}</news:publication_date>
          <news:title><![CDATA[${title}]]></news:title>
          <news:keywords><![CDATA[${keywords}]]></news:keywords>
        </news:news>
      </url>
    `;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
    ${newsItems}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
