import React from "react";
import prisma from "@/lib/prisma";
import ExperienceEducationClient from "./ExperienceEducationClient";

// Revalidate every 10 seconds
export const revalidate = 10;

async function getData() {
  try {
    const [education, experience, achievements] = await Promise.all([
      prisma.education.findMany({ orderBy: { order: "asc" } }),
      prisma.experience.findMany({ orderBy: { order: "asc" } }),
      prisma.achievement.findMany({ orderBy: { order: "asc" } }),
    ]);

    return { education, experience, achievements };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { education: [], experience: [], achievements: [] };
  }
}

export default async function ExperienceEducationServer() {
  const data = await getData();
  return <ExperienceEducationClient {...data} />;
}
