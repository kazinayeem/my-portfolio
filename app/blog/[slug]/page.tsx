"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { renderContent } from "@/components/CodePreview";

interface Tag {
  id: number;
  name: string;
  slug: string;
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
  content: string;
  slug: string;
  category?: Category;
  tags: Tag[];
  createdAt: string;
  thumbnail?: string | null; 
  thumbnailMime?: string | null;
}

export default function PostDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    async function fetchPost() {
      try {
        const res = await fetch(`/api/blog/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error(err);
        router.push("/posts");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug, router]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 grid gap-6">
        <Skeleton className="h-96 w-full rounded-lg" />
        <Skeleton className="h-8 w-3/4 rounded-lg" />
        <Skeleton className="h-6 w-1/2 rounded-lg" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-6 text-center text-lg text-gray-500">
        Post not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Thumbnail */}
      {post.thumbnail && post.thumbnailMime && (
        <div className="relative w-full h-80 sm:h-96 mb-8 rounded-xl overflow-hidden shadow-md">
          <Image
            src={`data:${post.thumbnailMime};base64,${post.thumbnail}`}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {post.category && (
          <Badge variant="secondary" className="text-sm">
            {post.category.name}
          </Badge>
        )}
        {post.tags.map((tag) => (
          <Badge key={tag.id} variant="outline" className="text-sm">
            {tag.name}
          </Badge>
        ))}
      </div>

      {/* Description */}
      {post.description && (
        <div className="prose prose-lg max-w-none mb-8 sm:mb-12 text-gray-700">
          {renderContent(post.description)}
        </div>
      )}

      {/* Content */}
      {post.content && (
        <div className="prose prose-lg max-w-none sm:prose-xl text-gray-800">
          {renderContent(post.content)}
        </div>
      )}
    </div>
  );
}
