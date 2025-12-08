import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const categories = await prisma.skillCategory.findMany({
      include: {
        skills: {
          orderBy: { order: "asc" },
        },
      },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, color, icon, order } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    const category = await prisma.skillCategory.create({
      data: {
        name,
        color: color || "from-blue-500 to-cyan-500",
        icon: icon || "Code",
        order: order || 0,
      },
      include: {
        skills: true,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error creating skill category:", error);
    return NextResponse.json(
      { error: "Failed to create skill category" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, name, color, icon, order } = await req.json();

    if (!id || !name) {
      return NextResponse.json(
        { error: "ID and name are required" },
        { status: 400 }
      );
    }

    const category = await prisma.skillCategory.update({
      where: { id },
      data: {
        name,
        color,
        icon,
        order,
      },
      include: {
        skills: true,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error updating skill category:", error);
    return NextResponse.json(
      { error: "Failed to update skill category" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    await prisma.skillCategory.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting skill category:", error);
    return NextResponse.json(
      { error: "Failed to delete skill category" },
      { status: 500 }
    );
  }
}
