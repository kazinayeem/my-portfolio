"use client";

import type { BlogPost } from "@/lib/blog/types";
import BlogCard from "./BlogCard";

interface BlogSectionProps {
  title: string;
  subtitle?: string;
  posts: BlogPost[];
}

export default function BlogSection({ title, subtitle, posts }: BlogSectionProps) {
  if (!posts.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-gray-600 dark:text-gray-400">{subtitle}</p>
        )}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <BlogCard key={post.slug} post={post} priority={i < 3} />
        ))}
      </div>
    </section>
  );
}
