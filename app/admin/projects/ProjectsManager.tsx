'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import {
  useGetProjectsQuery,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} from '@/lib/services/adminApi';

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  imageSrc: string;
  isFeatured: boolean;
  isTeamProject: boolean;
  order: number;
}

export default function ProjectsManager() {
  const { data: projects = [], isLoading, error } = useGetProjectsQuery();
  const [deleteProject] = useDeleteProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [localError, setLocalError] = useState('');
  const [editingOrder, setEditingOrder] = useState<string | null>(null);
  const [orderValue, setOrderValue] = useState('');

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await deleteProject(id).unwrap();
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Failed to delete project');
    }
  };

  const toggleFeatured = async (id: string, isFeatured: boolean) => {
    try {
      await updateProject({ id, isFeatured: !isFeatured }).unwrap();
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Failed to update project');
    }
  };

  const handleOrderClick = (id: string, currentOrder: number) => {
    setEditingOrder(id);
    setOrderValue(currentOrder.toString());
  };

  const handleOrderSave = async (id: string) => {
    try {
      await updateProject({ id, order: parseInt(orderValue) }).unwrap();
      setEditingOrder(null);
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Failed to update order');
    }
  };

  const handleOrderCancel = () => {
    setEditingOrder(null);
    setOrderValue('');
  };

  if (isLoading) return <div className="text-center py-8">Loading projects...</div>;

  return (
    <div className="space-y-4">
      {(localError || error) && (
        <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg">
          {localError || (error as any)?.message || 'An error occurred'}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition"
          >
            {/* Project Image */}
            <div className="relative h-40 bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <img
                src={project.imageSrc}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => toggleFeatured(project.id, project.isFeatured)}
                  className={`p-2 rounded-full transition ${
                    project.isFeatured
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-400 text-white'
                  }`}
                  title={project.isFeatured ? 'Featured' : 'Not Featured'}
                >
                  {project.isFeatured ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Project Info */}
            <div className="p-4">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {project.shortDescription}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.isTeamProject && (
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                    Team Project
                  </span>
                )}
                {editingOrder === project.id ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={orderValue}
                      onChange={(e) => setOrderValue(e.target.value)}
                      className="w-16 text-xs px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleOrderSave(project.id);
                        if (e.key === 'Escape') handleOrderCancel();
                      }}
                    />
                    <button
                      onClick={() => handleOrderSave(project.id)}
                      className="text-xs bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                    >
                      ✓
                    </button>
                    <button
                      onClick={handleOrderCancel}
                      className="text-xs bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleOrderClick(project.id, project.order)}
                    className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 px-2 py-1 rounded cursor-pointer transition"
                    title="Click to edit order"
                  >
                    Order: {project.order}
                  </button>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition text-sm font-medium"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No projects yet. Create your first one!
        </div>
      )}
    </div>
  );
}
