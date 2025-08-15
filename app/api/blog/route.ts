import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    const formattedPosts = posts.map((post) => ({
      ...post,
      thumbnail: post.thumbnail
        ? Buffer.from(post.thumbnail).toString("base64")
        : null,
    }));

    return NextResponse.json(formattedPosts, { status: 200 });
  } catch (err) {
    console.error("GET /api/blog/posts error:", err);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
