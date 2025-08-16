import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Tag {
  id?: number;
  name: string;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  slug: string;
  content?: string;
  category?: Category;
  tags: { tag: Tag }[];
  createdAt: string;
  thumbnail?: string | null;
  thumbnailMime?: string | null;
}
export interface CreatePostInput {
  title: string;
  description: string;
  content: string;
  categorySlug: string;
  tags: { tag: Tag }[];
  thumbnailBase64?: string | null;
  thumbnailMime?: string | null;
}

export interface PaginatedPosts {
  page: number;
  limit: number;
  data: Post[];
}

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/blog/" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<PaginatedPosts, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 6 }) => `?page=${page}&limit=${limit}`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Post" as const, id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    getPostBySlug: builder.query<Post, string>({
      query: (slug) => `${slug}`,
      keepUnusedDataFor: 300,
    }),
    createPost: builder.mutation<Post, CreatePostInput>({
      query: (body) => ({
        url: "add-post",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostBySlugQuery,
  useCreatePostMutation,
} = blogApi;
