import ProjectForm from '../ProjectForm';

export default function NewProjectPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Create New Project
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Add a new project to your portfolio
        </p>
      </div>
      <ProjectForm />
    </div>
  );
}
