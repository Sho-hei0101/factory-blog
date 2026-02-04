import { getAllPosts, getAllTags, getSiteUrl } from '../../lib/posts';

function buildUrlEntry(loc, lastmod) {
  return `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`;
}

export function GET() {
  const siteUrl = getSiteUrl();
  const posts = getAllPosts();
  const tags = getAllTags();
  const now = new Date().toISOString();

  const urls = [
    buildUrlEntry(siteUrl, now),
    buildUrlEntry(`${siteUrl}/tags`, now),
    ...posts.map((post) =>
      buildUrlEntry(`${siteUrl}/posts/${post.slug}`, new Date(post.date).toISOString())
    ),
    ...tags.map((tag) => buildUrlEntry(`${siteUrl}/tags/${encodeURIComponent(tag.tag)}`, now))
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}
