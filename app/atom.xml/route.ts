import { getAllPosts } from "@/lib/blog/posts";
import { BLOG_AUTHOR, SITE_URL } from "@/lib/blog/constants";
import { formatRssDate } from "@/lib/blog/seo";
import { getCanonicalUrl } from "@/lib/blog/utils";

export async function GET() {
  const posts = getAllPosts();

  const entries = posts
    .map(
      (post) => `
  <entry>
    <title>${post.title}</title>
    <link href="${getCanonicalUrl(post.slug)}" />
    <id>${getCanonicalUrl(post.slug)}</id>
    <updated>${new Date(post.updatedAt).toISOString()}</updated>
    <published>${new Date(post.publishedAt).toISOString()}</published>
    <summary>${post.description}</summary>
    <author>
      <name>${BLOG_AUTHOR.name}</name>
      <email>${BLOG_AUTHOR.email}</email>
    </author>
    <category term="${post.category}" />
  </entry>`
    )
    .join("");

  const atom = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Mohammad Ali Nayeem Blog</title>
  <subtitle>AI, DevOps, cloud, and software engineering</subtitle>
  <link href="${SITE_URL}/blog" />
  <link href="${SITE_URL}/atom.xml" rel="self" />
  <id>${SITE_URL}/blog</id>
  <updated>${new Date().toISOString()}</updated>
  <author>
    <name>${BLOG_AUTHOR.name}</name>
    <email>${BLOG_AUTHOR.email}</email>
  </author>
  ${entries}
</feed>`;

  return new Response(atom, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
