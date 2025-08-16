"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPostsQuery } from "@/lib/services/blogApi";

export default function PostsPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useGetPostsQuery({ page, limit: 6 });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (isError || !data?.data.length) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-gray-500">
        No posts available.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.data.map((post) => (
          <Card
            key={post.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => router.push(`/blog/${post.slug}`)}
          >
            {post.thumbnail && post.thumbnailMime ? (
              <div className="relative h-48 w-full">
                <Image
                  src={`data:${post.thumbnailMime};base64,${post.thumbnail}`}
                  alt={post.title || "Post Thumbnail"}
                  fill
                  className="rounded-t-sm object-cover"
                />
              </div>
            ) : (
              <div className="h-48 w-full bg-gray-100 flex items-center justify-center rounded-t-sm text-gray-400">
                No Image
              </div>
            )}

            <CardHeader className="pt-2">
              <CardTitle className="text-lg font-semibold">
                {post.title.slice(0,25) || "Untitled Post"}...
              </CardTitle>
              {post.category ? (
                <Badge variant="secondary" className="mt-1">
                  {post.category.name.slice(0,20)}..
                </Badge>
              ) : (
                <Badge variant="outline" className="mt-1">
                  Uncategorized
                </Badge>
              )}
            </CardHeader>

            <CardContent>
              <div className="mt-1 flex flex-wrap gap-1">
                {post.tags && post.tags.length > 0 ? (
                  post.tags.slice(0, 2).map((t) => (
                    <Badge key={t.tag.id} variant="outline">
                      {t.tag.name}
                    </Badge>
                  ))
                ) : (
                  <Badge variant="outline">No Tags</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-6">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={data.data.length < 6}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
