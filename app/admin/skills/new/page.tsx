"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const colorOptions = [
  { label: "Blue → Cyan", value: "from-blue-500 to-cyan-500" },
  { label: "Green → Emerald", value: "from-green-500 to-emerald-500" },
  { label: "Orange → Red", value: "from-orange-500 to-red-500" },
  { label: "Purple → Pink", value: "from-purple-500 to-pink-500" },
  { label: "Yellow → Orange", value: "from-yellow-500 to-orange-500" },
  { label: "Pink → Rose", value: "from-pink-500 to-rose-500" },
  { label: "Indigo → Purple", value: "from-indigo-500 to-purple-500" },
];

const iconOptions = [
  "Globe", "Server", "Database", "Cloud", "Brain", "Code2", "Cpu", "Puzzle",
  "GitBranch", "Zap", "Terminal", "Laptop", "Monitor", "Smartphone", "Layers"
];

export default function NewSkillCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    color: "from-blue-500 to-cyan-500",
    icon: "Code2",
    order: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/skills");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/skills"
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Skills
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        New Skill Category
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Frontend, Backend, DevOps"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Color Theme
            </label>
            <div className="grid grid-cols-2 gap-3">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, color: option.value })
                  }
                  className={`p-3 rounded-lg border-2 transition ${
                    formData.color === option.value
                      ? "border-green-500"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div
                    className={`h-8 rounded bg-gradient-to-r ${option.value} mb-2`}
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Icon
            </label>
            <div className="flex flex-wrap gap-2">
              {iconOptions.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon })}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    formData.icon === icon
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-2 border-green-500"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent"
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Order
            </label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) =>
                setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
              }
              className="w-32 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
              min="0"
            />
            <p className="text-sm text-gray-500 mt-1">
              Lower numbers appear first
            </p>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Preview
          </h3>
          <div
            className={`bg-gradient-to-r ${formData.color} rounded-lg p-4 flex items-center gap-3`}
          >
            <span className="text-white font-semibold">
              {formData.name || "Category Name"}
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Category"}
          </button>
          <Link
            href="/admin/skills"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
