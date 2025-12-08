'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Eye, EyeOff, GripVertical } from 'lucide-react';
import Link from 'next/link';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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

function DraggableProjectCard({
  project,
  onDelete,
  onToggleFeatured,
}: {
  project: Project;
  onDelete: (id: string) => void;
  onToggleFeatured: (id: string, isFeatured: boolean) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition"
    >
      <div className="relative h-40 bg-gray-200 dark:bg-gray-700 overflow-hidden group">
        <img
          src={project.imageSrc}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 right-2 flex gap-2 items-center justify-between">
          <button
            {...attributes}
            {...listeners}
            className="p-2 rounded-full bg-gray-800/80 hover:bg-gray-900 text-white opacity-0 group-hover:opacity-100 transition cursor-grab active:cursor-grabbing"
            title="Drag to reorder"
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <button
            onClick={() => onToggleFeatured(project.id, project.isFeatured)}
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

      <div className="p-4">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.isTeamProject && (
            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
              Team Project
            </span>
          )}
          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
            Order: {project.order}
          </span>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/admin/projects/${project.id}`}
          >
            <span className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition text-sm font-medium">
              <Edit2 className="h-4 w-4" />
              Edit
            </span>
          </Link>
          <button
            onClick={() => onDelete(project.id)}
            className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsManager() {
  const { data: projects = [], isLoading, error } = useGetProjectsQuery();
  const [deleteProject] = useDeleteProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [localError, setLocalError] = useState('');
  const [localProjects, setLocalProjects] = useState<Project[]>(projects);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      distance: 8,
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  React.useEffect(() => {
    setLocalProjects(projects);
  }, [projects]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = localProjects.findIndex((p) => p.id === active.id);
      const newIndex = localProjects.findIndex((p) => p.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(localProjects, oldIndex, newIndex);
        setLocalProjects(newOrder);

        for (let i = 0; i < newOrder.length; i++) {
          try {
            await updateProject({ id: newOrder[i].id, order: i }).unwrap();
          } catch (err) {
            setLocalError('Failed to update order');
          }
        }
      }
    }
  };

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

  if (isLoading) return <div className="text-center py-8">Loading projects...</div>;

  return (
    <div className="space-y-4">
      {(localError || error) && (
        <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg">
          {localError || (error as any)?.message || 'An error occurred'}
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={localProjects.map((p) => p.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localProjects.map((project) => (
              <DraggableProjectCard
                key={project.id}
                project={project}
                onDelete={handleDelete}
                onToggleFeatured={toggleFeatured}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {localProjects.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No projects yet. Create your first one!
        </div>
      )}
    </div>
  );
}
