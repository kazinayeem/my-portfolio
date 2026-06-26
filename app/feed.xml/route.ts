import { getAllPosts } from "@/lib/blog/posts";
import { BLOG_AUTHOR, SITE_URL } from "@/lib/blog/constants";
import { formatRssDate } from "@/lib/blog/seo";
import { getCanonicalUrl } from "@/lib/blog/utils";

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${getCanonicalUrl(post.slug)}</link>
      <guid isPermaLink="true">${getCanonicalUrl(post.slug)}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${formatRssDate(post.publishedAt)}</pubDate>
      <category>${post.category}</category>
      <author>${BLOG_AUTHOR.email} (${BLOG_AUTHOR.name})</author>
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mohammad Ali Nayeem Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>AI, DevOps, cloud, and software engineering articles by ${BLOG_AUTHOR.name}</description>
    <language>en-us</language>
    <lastBuildDate>${formatRssDate(new Date().toISOString())}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
