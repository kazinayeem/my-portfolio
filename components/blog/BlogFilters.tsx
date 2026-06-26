"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { BlogCategory } from "@/lib/blog/types";
import { BLOG_CATEGORIES } from "@/lib/blog/constants";

interface BlogFiltersProps {
  query: string;
  category: string;
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export default function BlogFilters({
  query,
  category,
  onQueryChange,
  onCategoryChange,
}: BlogFiltersProps) {
  return (
    <div className="mx-auto mb-10 max-w-6xl space-y-6 px-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="search"
          placeholder="Search articles, tags, topics..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="pl-10 dark:bg-gray-900"
          aria-label="Search blog articles"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => onCategoryChange("")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            category === ""
              ? "bg-green-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          All
        </button>
        {BLOG_CATEGORIES.map((cat: BlogCategory) => (
          <button
            key={cat}
            type="button"
            onClick={() => onCategoryChange(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              category === cat
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
