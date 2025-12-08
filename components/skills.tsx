// src/components/Skills.tsx
import React from "react";
import prisma from "@/lib/prisma";
import SkillsClient from "./SkillsClient";

async function getSkillsData() {
  try {
    const categories = await prisma.skillCategory.findMany({
      include: {
        skills: {
          orderBy: { order: "asc" },
        },
      },
      orderBy: { order: "asc" },
    });
    return categories;
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
}

async function Skills() {
  const categories = await getSkillsData();

  return (
    <SkillsClient categories={categories} />
  );
}

export default Skills;
