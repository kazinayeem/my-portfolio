"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Trash2 } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  icon: string | null;
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

export default function SkillCategoryForm({
  category,
}: {
  category?: SkillCategory;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: category?.name || "",
    color: category?.color || "from-blue-500 to-cyan-500",
    icon: category?.icon || "Code",
    order: category?.order.toString() || "0",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = category
        ? `/api/admin/skills`
        : `/api/admin/skills`;
      
      const method = category ? "PUT" : "POST";
      const body = category
        ? { id: category.id, ...formData, order: parseInt(formData.order) }
        : { ...formData, order: parseInt(formData.order) };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        router.push("/admin/skills");
        router.refresh();
      } else {
        alert("Failed to save category");
      }
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Error saving category");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!category) return;
    if (!confirm("Delete this category and all its skills?")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/skills?id=${category.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.push("/admin/skills");
        router.refresh();
      } else {
        alert("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Error deleting category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
            placeholder="e.g., Frontend Development"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Color Gradient
          </label>
          <select
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
          >
            <option value="from-blue-500 to-cyan-500">Blue to Cyan</option>
            <option value="from-green-500 to-emerald-500">Green to Emerald</option>
            <option value="from-purple-500 to-pink-500">Purple to Pink</option>
            <option value="from-orange-500 to-red-500">Orange to Red</option>
            <option value="from-yellow-500 to-orange-500">Yellow to Orange</option>
            <option value="from-indigo-500 to-purple-500">Indigo to Purple</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Icon Name
          </label>
          <input
            type="text"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
            placeholder="e.g., Code, Server, Database"
            required
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Use Lucide React icon names
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Display Order
          </label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
            min="0"
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {loading ? "Saving..." : category ? "Update Category" : "Create Category"}
          </button>

          {category && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
