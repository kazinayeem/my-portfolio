import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog/posts";
import { SITE_URL } from "@/lib/blog/constants";
import { getCanonicalUrl } from "@/lib/blog/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: getCanonicalUrl(post.slug),
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...blogEntries,
  ];
}
