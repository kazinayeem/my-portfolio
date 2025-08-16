import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface TagInput {
  name: string;
  slug: string;
}

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

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Generate initial slug
    let slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    // Ensure slug is unique
    const existingPost = await prisma.post.findUnique({ where: { slug } });
    if (existingPost) slug += "-" + Date.now();

    // Convert Base64 → Bytes if provided
    const thumbnailBytes = thumbnailBase64
      ? Buffer.from(thumbnailBase64, "base64")
      : null;

    // Prepare category connectOrCreate if provided
    const categoryData = categorySlug
      ? {
          connectOrCreate: {
            where: { slug: categorySlug },
            create: { name: categorySlug, slug: categorySlug },
          },
        }
      : undefined;

    // Prepare tags connectOrCreate
    const tagData = tags.map((t: TagInput) => ({
      tag: {
        connectOrCreate: {
          where: { slug: t.slug },
          create: { name: t.name, slug: t.slug },
        },
      },
    }));

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
          create: tagData,
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
