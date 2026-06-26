"use client";

import { useMemo, useState } from "react";
import type { BlogPost } from "@/lib/blog/types";
import {
  filterPosts,
  paginatePosts,
  getTotalPages,
  getFeaturedPosts,
  getPopularPosts,
  getLatestPosts,
} from "@/lib/blog/utils";
import BlogHero from "./BlogHero";
import BlogFilters from "./BlogFilters";
import BlogSection from "./BlogSection";
import BlogCard from "./BlogCard";
import BlogPagination from "./BlogPagination";
import BlogNewsletter, { BlogCTA } from "./BlogNewsletter";

interface BlogHomeClientProps {
  posts: BlogPost[];
}

export default function BlogHomeClient({ posts }: BlogHomeClientProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const featured = useMemo(() => getFeaturedPosts(posts), [posts]);
  const popular = useMemo(() => getPopularPosts(posts), [posts]);

  const filtered = useMemo(
    () => filterPosts(posts, query, category || undefined),
    [posts, query, category]
  );

  const totalPages = getTotalPages(filtered.length);
  const paginated = paginatePosts(filtered, page);
  const latest = getLatestPosts(posts).slice(0, 6);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const showSections = !query && !category;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <BlogHero />
      <BlogFilters
        query={query}
        category={category}
        onQueryChange={handleQueryChange}
        onCategoryChange={handleCategoryChange}
      />

      {showSections && featured.length > 0 && (
        <BlogSection
          title="Featured Posts"
          subtitle="Hand-picked guides and deep dives"
          posts={featured}
        />
      )}

      {showSections && popular.length > 0 && (
        <BlogSection
          title="Popular Posts"
          subtitle="Most read articles by the community"
          posts={popular}
        />
      )}

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            {query || category ? "Search Results" : "Latest Posts"}
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {paginated.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.map((post, i) => (
              <BlogCard key={post.slug} post={post} priority={i < 3} />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-gray-500">
            No articles match your search. Try a different keyword or category.
          </p>
        )}
      </section>

      <BlogPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {showSections && latest.length > 0 && (
        <BlogSection
          title="Related Topics"
          subtitle="Explore more from my engineering journey"
          posts={latest}
        />
      )}

      <BlogNewsletter />
      <BlogCTA />
    </div>
  );
}
