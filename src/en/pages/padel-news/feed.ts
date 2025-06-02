const category = 70;

export const GET = async () => {
  const response = await fetch(
    `https://portico.porticosport.com/wp-json/wp/v2/posts?categories=${category}&per_page=100&_embed`
  );
  const posts = await response.json();

  const items = posts.map(post => {
    const slug = post.slug;
    const title = post.title?.rendered || "";
    const link = `https://porticosport.com/en/padel-news/${slug}/`;
    const pubDate = new Date(post.date).toUTCString();
    const description = post.excerpt?.rendered || "";
    const author = post._embedded?.author[0]?.name || "Desconocido";

    return `
      <item>
        <title><![CDATA[${title}]]></title>
        <link>${link}</link>
        <pubDate>${pubDate}</pubDate>
        <description><![CDATA[${description}]]></description>
        <author>${author}</author>
        <guid>${link}</guid>
      </item>
    `;
  }).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Padel News</title>
      <link>https://porticosport.com/padel-news/</link>
      <description>Lastest Padel News</description>
      ${items}
    </channel>
  </rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml',
      'Cache-Control': 'public, max-age=3600',
    }
  });
};

