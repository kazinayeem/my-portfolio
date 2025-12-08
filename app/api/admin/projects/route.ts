import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

// GET - Fetch all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST - Create new project
export async function POST(req: NextRequest) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    if (!data.title || !data.shortDescription) {
      return NextResponse.json(
        { error: "Title and short description are required" },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title: data.title,
        shortDescription: data.shortDescription,
        fullDescription: data.fullDescription || "",
        imageSrc: data.imageSrc || "/placeholder.png",
        githubLink: data.githubLink || "",
        liveLink: data.liveLink,
        youtubeDemoLink: data.youtubeDemoLink,
        isTeamProject: data.isTeamProject || false,
        isFeatured: data.isFeatured || false,
        order: data.order || 0,
        technologies: data.technologies || [],
        features: data.features || [],
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
