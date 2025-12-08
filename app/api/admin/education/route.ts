import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

// GET - Fetch all education entries
export async function GET() {
  try {
    const education = await prisma.education.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(education);
  } catch (error) {
    console.error("Error fetching education:", error);
    return NextResponse.json(
      { error: "Failed to fetch education" },
      { status: 500 }
    );
  }
}

// POST - Create new education entry
export async function POST(req: NextRequest) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { school, degree, year, description, gpa, order } = await req.json();

    if (!school || !degree || !year) {
      return NextResponse.json(
        { error: "School, degree, and year are required" },
        { status: 400 }
      );
    }

    const education = await prisma.education.create({
      data: {
        school,
        degree,
        year,
        description: description || "",
        gpa: gpa || null,
        order: order ? parseInt(order) : 0,
      },
    });

    return NextResponse.json(education);
  } catch (error) {
    console.error("Error creating education:", error);
    return NextResponse.json(
      { error: "Failed to create education" },
      { status: 500 }
    );
  }
}

// PUT - Update education entry
export async function PUT(req: NextRequest) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, school, degree, year, description, gpa, order } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Education ID is required" },
        { status: 400 }
      );
    }

    const education = await prisma.education.update({
      where: { id },
      data: {
        school,
        degree,
        year,
        description,
        gpa: gpa || null,
        order: order ? parseInt(order) : 0,
      },
    });

    return NextResponse.json(education);
  } catch (error) {
    console.error("Error updating education:", error);
    return NextResponse.json(
      { error: "Failed to update education" },
      { status: 500 }
    );
  }
}

// DELETE - Delete education entry
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
        { error: "Education ID is required" },
        { status: 400 }
      );
    }

    await prisma.education.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting education:", error);
    return NextResponse.json(
      { error: "Failed to delete education" },
      { status: 500 }
    );
  }
}
