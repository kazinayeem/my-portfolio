import prisma from "@/lib/prisma";
import { Code2, FolderKanban, GraduationCap, Briefcase, Award } from "lucide-react";
import Link from "next/link";

async function getStats() {
  const [skills, projects, education, experience, achievements] = await Promise.all([
    prisma.skill.count(),
    prisma.project.count(),
    prisma.education.count(),
    prisma.experience.count(),
    prisma.achievement.count(),
  ]);

  return { skills, projects, education, experience, achievements };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const statCards = [
    { label: "Skills", value: stats.skills, icon: Code2, href: "/admin/skills", color: "bg-blue-500" },
    { label: "Projects", value: stats.projects, icon: FolderKanban, href: "/admin/projects", color: "bg-green-500" },
    { label: "Education", value: stats.education, icon: GraduationCap, href: "/admin/education", color: "bg-purple-500" },
    { label: "Experience", value: stats.experience, icon: Briefcase, href: "/admin/experience", color: "bg-orange-500" },
    { label: "Achievements", value: stats.achievements, icon: Award, href: "/admin/achievement", color: "bg-pink-500" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/skills"
            className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <Code2 className="h-8 w-8 text-blue-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Add Skill
            </span>
          </Link>
          <Link
            href="/admin/projects"
            className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <FolderKanban className="h-8 w-8 text-green-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Add Project
            </span>
          </Link>
          <Link
            href="/admin/education"
            className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <GraduationCap className="h-8 w-8 text-purple-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Add Education
            </span>
          </Link>
          <Link
            href="/admin/experience"
            className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <Briefcase className="h-8 w-8 text-orange-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Add Experience
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
