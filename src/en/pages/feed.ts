const category = 70;

export const GET = async () => {
  const response = await fetch(
    `https://portico.porticosport.com/wp-json/wp/v2/posts?categories=${category}&per_page=100&_embed`
  );
  const posts = await response.json();

  const siteUrl = 'https://porticosport.com';
  const feedTitle = 'Noticias Portico Sport';
  const feedDescription = 'Últimas noticias de Portico Sport';

  const itemsXml = posts
    .map(post => {
      const slug = post.slug;
      const title = post.title?.rendered || 'Sin título';
      const description = post.excerpt?.rendered || '';
      const link = `${siteUrl}/news/${slug}/`;
      const pubDate = new Date(post.date).toUTCString();
      const author = post._embedded?.author?.[0]?.name || 'Desconocido';

      
      const cleanDescription = description.replace(/<[^>]*>/g, '');

      return `
        <item>
          <title><![CDATA[${title}]]></title>
          <link>${link}</link>
          <description><![CDATA[${cleanDescription}]]></description>
          <pubDate>${pubDate}</pubDate>
          <author><![CDATA[${author}]]></author>
          <guid isPermaLink="true">${link}</guid>
        </item>`;
    })
    .join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title><![CDATA[${feedTitle}]]></title>
    <link>${siteUrl}</link>
    <description><![CDATA[${feedDescription}]]></description>
    <language>es</language>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml',
    },
  });
};
