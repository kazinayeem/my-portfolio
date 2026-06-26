import type { BlogPost } from "@/lib/blog/types";
import BlogSection from "./BlogSection";

interface BlogRelatedArticlesProps {
  posts: BlogPost[];
}

export default function BlogRelatedArticles({ posts }: BlogRelatedArticlesProps) {
  return (
    <BlogSection
      title="Related Articles"
      subtitle="Continue reading on similar topics"
      posts={posts}
    />
  );
}
