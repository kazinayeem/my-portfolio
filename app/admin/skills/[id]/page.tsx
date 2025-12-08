import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import SkillCategoryForm from "../SkillCategoryForm";

async function getSkillCategory(id: string) {
  try {
    return await prisma.skillCategory.findUnique({
      where: { id },
      include: { skills: true },
    });
  } catch (error) {
    return null;
  }
}

export default async function EditSkillCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await getSkillCategory(id);

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Edit Skill Category
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Update category details and manage skills
        </p>
      </div>

      <SkillCategoryForm category={category} />
    </div>
  );
}
