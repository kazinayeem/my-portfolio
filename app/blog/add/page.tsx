"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Hooks
import { useProjectDescription } from "@/app/hooks/useProjectDescription";
import { useGenerateImage } from "@/app/hooks/useGenerateImage";
import { useBlogContent } from "@/app/hooks/useContentGenerator";
import { useBlogMetadata } from "@/app/hooks/useSlugandtaqgenerate";

const RichTextEditor = dynamic<{
  value: string;
  onChange: (value: string) => void;
}>(() => import("@/components/RichTextEditor"), { ssr: false });

export default function NewPostPage() {
  const router = useRouter();

  // Local states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [thumbnailBase64, setThumbnailBase64] = useState<string | null>(null);
  const [thumbnailMime, setThumbnailMime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Hooks
  const { generateDescription, loading: generatingDescription } =
    useProjectDescription();
  const { generateImage, loading: generatingImage } = useGenerateImage();
  const { generateContent, loading: generatingContent } = useBlogContent();
  const { generateMetadata, loading: generatingMeta } = useBlogMetadata();

  // Handlers
  const handleGenerateDescription = async () => {
    if (!title) return toast.error("Enter a title first");
    const text = await generateDescription(title);
    if (text) {
      setDescription(text);
      toast.success("Description generated!");
    }
  };

  const handleGenerateImage = async () => {
    if (!title) return toast.error("Enter a title first");
    const base64 = await generateImage(title);
    if (base64) {
      setThumbnailBase64(base64.split(",")[1]);
      setThumbnailMime("image/png");
      toast.success("Image generated!");
    }
  };

  const handleGenerateContent = async () => {
    if (!title || !description)
      return toast.error("Enter title & description first");
    const text = await generateContent(title, description);
    if (text) {
      setContent(text);
      toast.success("Content generated!");
    }
  };

  const handleGenerateMeta = async () => {
    if (!title || !description)
      return toast.error("Enter title & description first");
    const meta = await generateMetadata(title, description);
    if (meta) {
      setCategorySlug(meta.categorySlug);
      setTags(
        Array.isArray(meta.tags) ? meta.tags.join(", ") : String(meta.tags)
      );
      toast.success("Tags & category generated!");
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnailMime(file.type);
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailBase64((reader.result as string).split(",")[1]);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!title || !content) return toast.error("Title & content required");

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
          categorySlug,
          tags: tags.split(",").map((t) => ({
            name: t.trim(),
            slug: t.trim().toLowerCase().replace(/\s+/g, "-"),
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to create post");

      toast.success("Post published!");
      router.push("/blog/add");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center px-4 py-8">
      <Card className="w-full max-w-5xl shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            📝 Create New Post
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title */}
          <div>
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Label>Description</Label>
              <Button
                size="sm"
                onClick={handleGenerateDescription}
                disabled={generatingDescription}
              >
                {generatingDescription
                  ? "Generating..."
                  : "Generate Description"}
              </Button>
            </div>
            <RichTextEditor value={description} onChange={setDescription} />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Label>Content</Label>
              <Button
                size="sm"
                onClick={handleGenerateContent}
                disabled={generatingContent}
              >
                {generatingContent ? "Generating..." : "Generate Content"}
              </Button>
            </div>
            <RichTextEditor value={content} onChange={setContent} />
          </div>

          {/* Thumbnail */}
          <div className="flex flex-col gap-2">
            <Label>Thumbnail</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleThumbnailUpload}
            />
            {thumbnailBase64 && thumbnailMime && (
              <Image
                src={`data:${thumbnailMime};base64,${thumbnailBase64}`}
                alt="Thumbnail Preview"
                width={900}
                height={400}
                className="rounded-xl border object-cover"
              />
            )}
            <Button
              size="sm"
              onClick={handleGenerateImage}
              disabled={generatingImage}
            >
              {generatingImage ? "Generating..." : "Generate Thumbnail"}
            </Button>
          </div>

          {/* Tags + Category */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Tags (comma separated)</Label>
              <Input value={tags} onChange={(e) => setTags(e.target.value)} />
            </div>
            <div>
              <Label>Category Slug</Label>
              <Input
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
              />
            </div>
          </div>
          <Button
            size="sm"
            onClick={handleGenerateMeta}
            disabled={generatingMeta}
          >
            {generatingMeta ? "Generating..." : "Generate Tags & Category"}
          </Button>

          {/* Submit */}
          <Button
            className="w-full mt-6"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Publishing..." : "🚀 Publish Post"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
