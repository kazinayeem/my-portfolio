import { allBlogPosts } from "@/content/blogs";
import type { BlogPost } from "./types";

export function getAllPosts(): BlogPost[] {
  return allBlogPosts;
}

export { allBlogPosts };
