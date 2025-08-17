"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { useGetPostsQuery } from "@/lib/services/blogApi";

export default function PostsPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetPostsQuery({ page, limit: 6 });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError || !data?.data.length)
    return (
      <p className="text-center mt-10 text-gray-500">No posts available.</p>
    );

  return (
    <div className="max-w-5xl mx-auto p-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-20">
      {data.data.map((post) => (
        <div
          key={post.id}
          className="relative rounded-2xl overflow-hidden cursor-pointer"
          onClick={() => router.push(`/blog/${post.slug}`)}
        >
          <DirectionAwareHover
            imageUrl={
              post.thumbnail && post.thumbnailMime
                ? `data:${post.thumbnailMime};base64,${post.thumbnail}`
                : "https://via.placeholder.com/400x300?text=No+Image"
            }
          >
            <div className="p-4">
              <h3 className="font-semibold text-lg text-white line-clamp-2">
                {post.title || "Untitled Post"}
              </h3>
              {post.category && (
                <p className="text-sm text-gray-300 mt-1">
                  {post.category.name}
                </p>
              )}
            </div>
          </DirectionAwareHover>
        </div>
      ))}

      {/* Pagination */}
      <div className="col-span-full flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          disabled={data.data.length < 6}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
