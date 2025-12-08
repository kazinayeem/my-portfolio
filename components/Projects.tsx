import React from "react";
import prisma from "@/lib/prisma";
import ProjectsClient from "./ProjectsClient";

// Revalidate every 10 seconds
export const revalidate = 10;

async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: { isFeatured: true },
      orderBy: { order: "asc" },
    });
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

async function Projects() {
  const projects = await getProjects();

  return <ProjectsClient projects={projects} />;
}

export default Projects;