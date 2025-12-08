"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Edit2, Plus, GripVertical, X } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  useGetSkillCategoriesQuery,
  useDeleteSkillCategoryMutation,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
  useUpdateSkillCategoryMutation,
} from "@/lib/services/adminApi";

interface Skill {
  id: string;
  name: string;
  icon?: string | null;
  order: number;
}

interface SkillCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
  order: number;
  skills: Skill[];
}

function DraggableSkillItem({
  skill,
  categoryId,
  onEdit,
  onDelete,
}: {
  skill: Skill;
  categoryId: string;
  onEdit: (categoryId: string, skill: Skill) => void;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: skill.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <div className="flex items-center gap-2">
        <button
          {...attributes}
          {...listeners}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <span className="text-sm text-gray-900 dark:text-white">
          {skill.name}
        </span>
        {skill.icon && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({skill.icon})
          </span>
        )}
      </div>
      <div className="flex gap-1">
        <button
          onClick={() => onEdit(categoryId, skill)}
          className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
        >
          <Edit2 className="h-3 w-3" />
        </button>
        <button
          onClick={() => onDelete(skill.id)}
          className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

function DraggableCategoryItem({
  category,
  editingSkill,
  newSkillName,
  newSkillIcon,
  setNewSkillName,
  setNewSkillIcon,
  onAddSkill,
  onEditSkill,
  onDeleteSkill,
  onDeleteCategory,
  onEditCategory,
  onAddSkillForm,
}: {
  category: SkillCategory;
  editingSkill: { categoryId: string; skill?: Skill } | null;
  newSkillName: string;
  newSkillIcon: string;
  setNewSkillName: (val: string) => void;
  setNewSkillIcon: (val: string) => void;
  onAddSkill: (categoryId: string) => void;
  onEditSkill: (categoryId: string, skill: Skill) => void;
  onDeleteSkill: (id: string) => void;
  onDeleteCategory: (id: string) => void;
  onEditCategory: (id: string) => void;
  onAddSkillForm: (categoryId: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            {...attributes}
            {...listeners}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-grab active:cursor-grabbing"
          >
            <GripVertical className="h-5 w-5" />
          </button>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {category.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Icon: {category.icon}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Order: {category.order}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEditCategory(category.id)}
            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDeleteCategory(category.id)}
            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <SortableContext
          items={category.skills.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          {category.skills.map((skill) => (
            <DraggableSkillItem
              key={skill.id}
              skill={skill}
              categoryId={category.id}
              onEdit={onEditSkill}
              onDelete={onDeleteSkill}
            />
          ))}
        </SortableContext>

        {editingSkill?.categoryId === category.id && !editingSkill.skill && (
          <div className="flex gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="New skill name"
              className="flex-1 px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            />
            <input
              type="text"
              value={newSkillIcon}
              onChange={(e) => setNewSkillIcon(e.target.value)}
              placeholder="Icon (optional)"
              className="w-32 px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            />
            <button
              onClick={() => onAddSkill(category.id)}
              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
            >
              Add
            </button>
            <button
              onClick={() => setNewSkillName("")}
              className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <button
          onClick={() => onAddSkillForm(category.id)}
          className="w-full p-2 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Skill
        </button>
      </div>
    </div>
  );
}

export default function SkillsManager() {
  const router = useRouter();
  const { data: categories = [], isLoading } = useGetSkillCategoriesQuery();
  const [deleteCategory] = useDeleteSkillCategoryMutation();
  const [createSkill] = useCreateSkillMutation();
  const [updateSkill] = useUpdateSkillMutation();
  const [deleteSkill] = useDeleteSkillMutation();
  const [updateCategory] = useUpdateSkillCategoryMutation();

  const [editingSkill, setEditingSkill] = useState<{
    categoryId: string;
    skill?: Skill;
  } | null>(null);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillIcon, setNewSkillIcon] = useState("");
  const [localCategories, setLocalCategories] = useState<SkillCategory[]>(categories);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      distance: 8,
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  React.useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

  const handleCategoryDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = localCategories.findIndex((c) => c.id === active.id);
      const newIndex = localCategories.findIndex((c) => c.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(localCategories, oldIndex, newIndex);
        setLocalCategories(newOrder);

        for (let i = 0; i < newOrder.length; i++) {
          try {
            await updateCategory({
              id: newOrder[i].id,
              name: newOrder[i].name,
              color: newOrder[i].color,
              icon: newOrder[i].icon,
              order: i,
            }).unwrap();
          } catch (error) {
            console.error("Failed to update category order:", error);
          }
        }
      }
    }
  };

  const handleSkillDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const categoryId = localCategories.find((c) =>
        c.skills.some((s) => s.id === active.id)
      )?.id;

      if (categoryId) {
        const category = localCategories.find((c) => c.id === categoryId);
        if (category) {
          const oldIndex = category.skills.findIndex((s) => s.id === active.id);
          const newIndex = category.skills.findIndex((s) => s.id === over.id);

          if (oldIndex !== -1 && newIndex !== -1) {
            const newSkills = arrayMove(category.skills, oldIndex, newIndex);
            const updated = localCategories.map((c) =>
              c.id === categoryId ? { ...c, skills: newSkills } : c
            );
            setLocalCategories(updated);

            for (let i = 0; i < newSkills.length; i++) {
              try {
                await updateSkill({
                  id: newSkills[i].id,
                  name: newSkills[i].name,
                  icon: newSkills[i].icon,
                }).unwrap();
              } catch (error) {
                console.error("Failed to update skill order:", error);
              }
            }
          }
        }
      }
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Delete this category and all its skills?")) return;
    try {
      await deleteCategory(id).unwrap();
    } catch (error) {
      console.error("Failed to delete category:", error);
      alert("Failed to delete category");
    }
  };

  const handleDeleteSkill = async (skillId: string) => {
    if (!confirm("Delete this skill?")) return;
    try {
      await deleteSkill(skillId).unwrap();
    } catch (error) {
      console.error("Failed to delete skill:", error);
      alert("Failed to delete skill");
    }
  };

  const handleAddSkill = async (categoryId: string) => {
    if (!newSkillName.trim()) return;
    try {
      await createSkill({
        categoryId,
        name: newSkillName,
        icon: newSkillIcon || null,
      }).unwrap();
      setNewSkillName("");
      setNewSkillIcon("");
      setEditingSkill(null);
    } catch (error) {
      console.error("Failed to create skill:", error);
      alert("Failed to create skill");
    }
  };

  const handleUpdateSkill = async (skillId: string) => {
    if (!newSkillName.trim()) return;
    try {
      await updateSkill({
        id: skillId,
        name: newSkillName,
        icon: newSkillIcon || null,
      }).unwrap();
      setNewSkillName("");
      setNewSkillIcon("");
      setEditingSkill(null);
    } catch (error) {
      console.error("Failed to update skill:", error);
      alert("Failed to update skill");
    }
  };

  const handleEditSkill = (categoryId: string, skill: Skill) => {
    setEditingSkill({ categoryId, skill });
    setNewSkillName(skill.name);
    setNewSkillIcon(skill.icon || "");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600 dark:text-gray-400">Loading skills...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Skills Management
        </h2>
        <button
          onClick={() => router.push("/admin/skills/new")}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
        >
          <Plus className="h-4 w-4" />
          New Category
        </button>
      </div>

      {localCategories.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">No skill categories yet</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleCategoryDragEnd}
        >
          <SortableContext
            items={localCategories.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid gap-6">
              {localCategories.map((category) => (
                <DndContext
                  key={`skills-${category.id}`}
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleSkillDragEnd}
                >
                  <DraggableCategoryItem
                    category={category}
                    editingSkill={editingSkill}
                    newSkillName={newSkillName}
                    newSkillIcon={newSkillIcon}
                    setNewSkillName={setNewSkillName}
                    setNewSkillIcon={setNewSkillIcon}
                    onAddSkill={handleAddSkill}
                    onEditSkill={handleEditSkill}
                    onDeleteSkill={handleDeleteSkill}
                    onDeleteCategory={handleDeleteCategory}
                    onEditCategory={(id) => router.push(`/admin/skills/${id}`)}
                    onAddSkillForm={(categoryId) =>
                      setEditingSkill({ categoryId, skill: undefined })
                    }
                  />
                </DndContext>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
