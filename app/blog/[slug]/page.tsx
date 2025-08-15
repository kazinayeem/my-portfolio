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
  content: string; // HTML string
  slug: string;
  category?: Category;
  tags: Tag[];
  createdAt: string;
  thumbnail?: string | null; // Base64 string
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
    return <Skeleton className="h-96 w-full rounded-lg" />;
  }

  if (!post) {
    return <div className="p-6 text-center">Post not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Thumbnail */}
      {post.thumbnail && post.thumbnailMime && (
        <div className="relative w-full h-96 mb-6">
          <Image
            src={`data:${post.thumbnailMime};base64,${post.thumbnail}`}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

      {/* Meta */}
      <div className="flex items-center gap-2 mb-4">
        {post.category && (
          <Badge variant="secondary">{post.category.name}</Badge>
        )}
        {post.tags.map((tag) => (
          <Badge key={tag.id} variant="outline">
            {tag.name}
          </Badge>
        ))}
      </div>

      {/* Description */}
      {post.description && (
        <div className="prose prose-lg max-w-none mb-4">
          {renderContent(post.description)}
        </div>
      )}

      {/* Content */}
      {post.content && (
        <div className="prose prose-lg max-w-none">
          {renderContent(post.content)}
        </div>
      )}
    </div>
  );
}
