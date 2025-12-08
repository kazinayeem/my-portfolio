"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Edit2, Plus, GripVertical, X } from "lucide-react";
import {
  useGetSkillCategoriesQuery,
  useDeleteSkillCategoryMutation,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
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

export default function SkillsManager() {
  const router = useRouter();
  const { data: categories = [], isLoading } = useGetSkillCategoriesQuery();
  const [deleteCategory] = useDeleteSkillCategoryMutation();
  const [createSkill] = useCreateSkillMutation();
  const [updateSkill] = useUpdateSkillMutation();
  const [deleteSkill] = useDeleteSkillMutation();

  const [editingSkill, setEditingSkill] = useState<{
    categoryId: string;
    skill?: Skill;
  } | null>(null);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillIcon, setNewSkillIcon] = useState("");

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

      {categories.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">No skill categories yet</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
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
                    onClick={() => router.push(`/admin/skills/${category.id}`)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {category.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    {editingSkill?.skill?.id === skill.id ? (
                      <div className="flex-1 flex gap-2">
                        <input
                          type="text"
                          value={newSkillName}
                          onChange={(e) => setNewSkillName(e.target.value)}
                          placeholder="Skill name"
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
                          onClick={() => handleUpdateSkill(skill.id)}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingSkill(null)}
                          className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
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
                            onClick={() => {
                              setEditingSkill({ categoryId: category.id, skill });
                              setNewSkillName(skill.name);
                              setNewSkillIcon(skill.icon || "");
                            }}
                            className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                          >
                            <Edit2 className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(skill.id)}
                            className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}

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
                      onClick={() => handleAddSkill(category.id)}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setEditingSkill(null)}
                      className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                <button
                  onClick={() =>
                    setEditingSkill({ categoryId: category.id, skill: undefined })
                  }
                  className="w-full p-2 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Skill
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
