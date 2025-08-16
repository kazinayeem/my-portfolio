"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Tag {
  tag: {
    id: number;
    name: string;
    slug: string;
  };
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Post {
  id: string;
  title: string;
  description: string;
  slug: string;
  category?: Category | null;
  tags?: Tag[] | null;
  createdAt: string;
  thumbnail?: string | null;
  thumbnailMime?: string | null;
}

export default function PostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/blog/");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch posts", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-gray-500">
        No posts available.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => router.push(`/blog/${post.slug}`)}
          >
            {/* Thumbnail */}
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
                {post.title || "Untitled Post"}
              </CardTitle>
              {post.category ? (
                <Badge variant="secondary" className="mt-1">
                  {post.category.name}
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
    </div>
  );
}
