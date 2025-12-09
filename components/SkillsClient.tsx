"use client";

import React from "react";
import { Code } from "lucide-react";

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
  skills: Skill[];
}

interface SkillsClientProps {
  categories: SkillCategory[];
}

export default function SkillsClient({ categories }: SkillsClientProps) {
  return (
    <section
      id="skills"
      className="py-20 bg-transparent dark:bg-transparent relative"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-2 uppercase tracking-widest transition-colors duration-500">
          Technical Skills
        </h2>
        <p className="text-lg text-center text-green-600 dark:text-green-400 mb-16 uppercase tracking-wider transition-colors duration-500">
          My Expertise & Proficiency
        </p>

        {categories.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>No skills configured yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white dark:bg-gray-800/50 backdrop-blur border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 group"
              >
                {/* Category Header */}
                <div
                  className={`bg-gradient-to-r ${category.color} rounded-lg p-4 mb-6 flex items-center gap-3`}
                >
                  <Code className="h-6 w-6 text-white" />
                  <h3 className="text-xl font-bold text-white">
                    {category.name}
                  </h3>
                </div>

                {/* Skills List - Flex Wrap */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No skills in this category
                    </p>
                  ) : (
                    category.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700/50 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <span className="font-medium text-gray-900 dark:text-gray-100 text-sm whitespace-nowrap">
                          {skill.name}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills Summary */}
        <div
          className="mt-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Full Stack Developer
          </h3>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            I have comprehensive experience across the entire development stack, from creating beautiful, responsive user interfaces with modern frontend frameworks to building robust, scalable backend systems and managing databases. Always exploring new technologies and best practices to stay at the forefront of web development.
          </p>
        </div>
      </div>
    </section>
  );
}
