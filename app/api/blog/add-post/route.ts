import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      title,
      description,
      content,
      thumbnailBase64,
      thumbnailMime,
      tags = [],
      categorySlug,
      status = "DRAFT",
    } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "title and content are required" },
        { status: 400 }
      );
    }

    // Generate slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    // Convert Base64 → Bytes
    const thumbnailBytes = thumbnailBase64
      ? Buffer.from(thumbnailBase64, "base64")
      : null;

    // Prepare category connectOrCreate
    const categoryData = categorySlug
      ? {
          connectOrCreate: {
            where: { slug: categorySlug },
            create: { name: categorySlug, slug: categorySlug },
          },
        }
      : undefined;

    // Create post
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        description,
        content,
        thumbnail: thumbnailBytes,
        thumbnailMime,
        status,
        author: "ADMIN", // hardcoded
        category: categoryData,
        tags: {
          create: tags.map((t: { slug: string; name: string }) => ({
            tag: {
              connectOrCreate: {
                where: { slug: t.slug },
                create: { name: t.name, slug: t.slug },
              },
            },
          })),
        },
      },
      include: {
        tags: { include: { tag: true } },
        category: true,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.error("POST /api/blog/add-post error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
