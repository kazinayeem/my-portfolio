#!/usr/bin/env node
/**
 * Writes articles 2-13 with full 1200+ word content.
 * Does NOT touch article 1 or other generated stubs.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../content/blogs/articles");

function wc(html) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;
}

function escapeForTs(str) {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

function writeArticle(article) {
  const file = `import { createPost } from "../article-builder";

const post = createPost({
  slug: ${JSON.stringify(article.slug)},
  title: ${JSON.stringify(article.title)},
  seoTitle: ${JSON.stringify(article.seoTitle)},
  subtitle: ${JSON.stringify(article.subtitle)},
  description: ${JSON.stringify(article.description)},
  category: ${JSON.stringify(article.category)},
  tags: ${JSON.stringify(article.tags)},
  keywords: ${JSON.stringify(article.keywords)},
  publishedAt: ${JSON.stringify(article.publishedAt)},
  updatedAt: ${JSON.stringify(article.updatedAt)},
  featured: ${article.featured},
  popular: ${article.popular},
  coverImageAlt: ${JSON.stringify(article.coverImageAlt)},
  content: \`${escapeForTs(article.content)}\`,
  faqs: ${JSON.stringify(article.faqs, null, 2).replace(/\n/g, "\n  ")},
  relatedSlugs: ${JSON.stringify(article.relatedSlugs)},
});

export default post;
`;
  const filename = `${article.slug}.ts`;
  fs.writeFileSync(path.join(OUT, filename), file, "utf8");
  const words = wc(article.content);
  console.log(`${words >= 1200 ? "OK" : "LOW"} | ${words} words | ${filename}`);
  return words;
}

// Articles loaded from companion data file
const dataPath = path.join(__dirname, "articles-2-13-data.mjs");
const { articles } = await import(dataPath);

let total = 0;
for (const a of articles) {
  total += writeArticle(a);
}
console.log(`\nWrote ${articles.length} articles, avg ${Math.round(total / articles.length)} words`);
