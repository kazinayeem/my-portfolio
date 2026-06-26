import type { BlogPost } from "./types";
import { POSTS_PER_PAGE, SITE_URL } from "./constants";

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function getWordCount(content: string): number {
  const text = stripHtml(content);
  return text ? text.split(/\s+/).length : 0;
}

export function getReadingTime(content: string, wpm = 220): number {
  const words = getWordCount(content);
  return Math.max(1, Math.ceil(words / wpm));
}

export function getCanonicalUrl(slug?: string): string {
  return slug ? `${SITE_URL}/blog/${slug}` : `${SITE_URL}/blog`;
}

export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getFeaturedPosts(posts: BlogPost[]): BlogPost[] {
  return sortPostsByDate(posts.filter((p) => p.featured)).slice(0, 3);
}

export function getPopularPosts(posts: BlogPost[]): BlogPost[] {
  return sortPostsByDate(posts.filter((p) => p.popular)).slice(0, 6);
}

export function getLatestPosts(posts: BlogPost[]): BlogPost[] {
  return sortPostsByDate(posts);
}

export function getPostBySlug(
  posts: BlogPost[],
  slug: string
): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(
  posts: BlogPost[],
  current: BlogPost,
  limit = 3
): BlogPost[] {
  const explicit = (current.relatedSlugs ?? [])
    .map((slug) => getPostBySlug(posts, slug))
    .filter((p): p is BlogPost => p !== undefined && p.slug !== current.slug);

  if (explicit.length >= limit) return explicit.slice(0, limit);

  const sameCategory = sortPostsByDate(
    posts.filter(
      (p) =>
        p.slug !== current.slug &&
        p.category === current.category &&
        !explicit.some((e) => e.slug === p.slug)
    )
  );

  const tagMatches = sortPostsByDate(
    posts.filter(
      (p) =>
        p.slug !== current.slug &&
        p.tags.some((t) => current.tags.includes(t)) &&
        !explicit.some((e) => e.slug === p.slug) &&
        !sameCategory.some((s) => s.slug === p.slug)
    )
  );

  return [...explicit, ...sameCategory, ...tagMatches]
    .slice(0, limit)
    .filter(
      (post, index, arr) => arr.findIndex((p) => p.slug === post.slug) === index
    );
}

export function getAdjacentPosts(
  posts: BlogPost[],
  slug: string
): { prev: BlogPost | null; next: BlogPost | null } {
  const sorted = sortPostsByDate(posts);
  const index = sorted.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index < sorted.length - 1 ? sorted[index + 1] : null,
    next: index > 0 ? sorted[index - 1] : null,
  };
}

export function filterPosts(
  posts: BlogPost[],
  query: string,
  category?: string
): BlogPost[] {
  const q = query.trim().toLowerCase();
  return sortPostsByDate(
    posts.filter((post) => {
      const matchesCategory = !category || post.category === category;
      if (!q) return matchesCategory;
      const haystack = [
        post.title,
        post.subtitle,
        post.description,
        post.category,
        ...post.tags,
        ...post.keywords,
      ]
        .join(" ")
        .toLowerCase();
      return matchesCategory && haystack.includes(q);
    })
  );
}

export function paginatePosts<T>(items: T[], page: number): T[] {
  const start = (page - 1) * POSTS_PER_PAGE;
  return items.slice(start, start + POSTS_PER_PAGE);
}

export function getTotalPages(count: number): number {
  return Math.max(1, Math.ceil(count / POSTS_PER_PAGE));
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function extractHeadings(
  content: string
): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const regex = /<h([2-3])[^>]*>(.*?)<\/h\1>/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    const text = stripHtml(match[2]);
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    headings.push({ id, text, level: Number(match[1]) });
  }
  return headings;
}

export function injectHeadingIds(content: string): string {
  return content.replace(
    /<h([2-3])([^>]*)>(.*?)<\/h\1>/gi,
    (_full, level, attrs, inner) => {
      const text = stripHtml(inner);
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      if (attrs.includes('id="')) return `<h${level}${attrs}>${inner}</h${level}>`;
      return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
    }
  );
}

export function getCoverImageUrl(slug: string, title: string): string {
  const encoded = encodeURIComponent(title.slice(0, 40));
  return `https://placehold.co/1200x630/111827/22c55e?text=${encoded}&font=montserrat`;
}
