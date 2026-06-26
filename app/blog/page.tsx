import type { Metadata } from "next";
import MainLayout from "@/components/MainLayout";
import BlogHomeClient from "@/components/blog/BlogHomeClient";
import { getAllPosts } from "@/lib/blog/posts";
import { buildBlogHomeMetadata, generateBlogListJsonLd } from "@/lib/blog/seo";

export const metadata: Metadata = buildBlogHomeMetadata();

export default function BlogPage() {
  const posts = getAllPosts();

  const jsonLd = generateBlogListJsonLd(posts);

  return (
    <MainLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogHomeClient posts={posts} />
    </MainLayout>
  );
}
