import Link from 'next/link';
import { Plus } from 'lucide-react';
import ProjectsManager from './ProjectsManager';

export default function AdminProjectsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Projects Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your portfolio projects
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
        >
          <Plus className="h-5 w-5" />
          New Project
        </Link>
      </div>

      <ProjectsManager />
    </div>
  );
}
