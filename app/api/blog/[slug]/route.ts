import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: Promise<{ slug: string }> }) {
  // Await params to satisfy Next.js build-time typing
  const { slug } = await context.params;

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...post,
      tags: post.tags.map((t) => t.tag),
      thumbnail: post.thumbnail
        ? Buffer.from(post.thumbnail).toString("base64")
        : null,
    });
  } catch (err) {
    console.error("GET /api/blog/[slug] error:", err);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}
