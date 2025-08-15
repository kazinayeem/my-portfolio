"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const RichTextEditor = dynamic<{ value: string; onChange: (value: string) => void }>(
  () => import("@/components/RichTextEditor"),
  { ssr: false }
);

interface Tag {
  name: string;
  slug: string;
}

export default function NewPostPage() {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [categorySlug, setCategorySlug] = useState<string>("");
  const [thumbnailBase64, setThumbnailBase64] = useState<string | null>(null);
  const [thumbnailMime, setThumbnailMime] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setThumbnailMime(file.type);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(",")[1];
      setThumbnailBase64(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      toast.error("Title and content are required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/blog/add-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          content,
          thumbnailBase64,
          thumbnailMime,
          categorySlug: categorySlug || undefined,
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
            .map<Tag>((t) => ({
              name: t,
              slug: t.toLowerCase().replace(/\s+/g, "-"),
            })),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error ?? "Failed to create post");
      }

      toast.success("Post created successfully!");
      router.push("/blog");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error creating post";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center px-4 py-8">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Create New Post
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
            />
          </div>

          <div>
            <Label>Description</Label>
            <RichTextEditor value={description} onChange={setDescription} />
          </div>

          <div>
            <Label>Content</Label>
            <RichTextEditor value={content} onChange={setContent} />
          </div>

          <div>
            <Label htmlFor="thumbnail">Thumbnail</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleThumbnailUpload}
            />
            {thumbnailBase64 && thumbnailMime && (
              <Image
                src={`data:${thumbnailMime};base64,${thumbnailBase64}`}
                alt="Thumbnail Preview"
                width={128}
                height={128}
                className="mt-2 object-cover rounded-md border"
              />
            )}
          </div>

          <div>
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. news, tech, tutorial"
            />
          </div>

          <div>
            <Label htmlFor="category">Category Slug</Label>
            <Input
              id="category"
              value={categorySlug}
              onChange={(e) => setCategorySlug(e.target.value)}
              placeholder="e.g. technology"
            />
          </div>

          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Publishing..." : "Publish Post"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
