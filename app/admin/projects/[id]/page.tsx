import prisma from '@/lib/prisma';
import ProjectForm from '../ProjectForm';
import { notFound } from 'next/navigation';

async function getProject(id: string) {
  try {
    return await prisma.project.findUnique({
      where: { id },
    });
  } catch (error) {
    return null;
  }
}

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Edit Project
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Update project details
        </p>
      </div>
      <ProjectForm projectId={project.id} initialData={project} />
    </div>
  );
}
