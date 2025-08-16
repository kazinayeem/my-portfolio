import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "6", 10);
    const skip = (page - 1) * limit;

    // Fetch only essential fields to reduce response size
    const posts = await prisma.post.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        createdAt: true,
        category: { select: { id: true, name: true, slug: true } },
        tags: {
          select: { tag: { select: { id: true, name: true, slug: true } } },
        },
        // Optional: include thumbnail as small base64 if needed
        thumbnail: true,
        thumbnailMime: true,
      },
    });

    // Convert thumbnail to base64 but only if present
    const formattedPosts = posts.map((post) => ({
      ...post,
      thumbnail: post.thumbnail
        ? Buffer.from(post.thumbnail).toString("base64")
        : null,
    }));

    return NextResponse.json(
      {
        page,
        limit,
        data: formattedPosts,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET /api/blog/posts error:", err);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}