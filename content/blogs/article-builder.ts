import type { BlogPost } from "@/lib/blog/types";
import { getCoverImageUrl } from "@/lib/blog/utils";

export function createPost(
  data: Omit<BlogPost, "coverImage"> & { coverImage?: string }
): BlogPost {
  return {
    ...data,
    coverImage: data.coverImage ?? getCoverImageUrl(data.slug, data.title),
  };
}
