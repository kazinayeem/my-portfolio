// src/components/Skills.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Database,
  Cloud,
  GitBranch,
  Cpu,
  Key,
  Puzzle,
  Server,
  Package,
} from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiReactquery, // Using this for general API concepts or a placeholder
  SiShadcnui,
  SiReactivex, // Used as a placeholder for React Native
} from "react-icons/si";

const skillsData = [
  {
    category: "Frontend",
    items: [
      { name: "React.js", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "ShadCN UI", icon: SiShadcnui },
      { name: "React Native", icon: SiReactivex },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: Server },
      { name: "Prisma", icon: SiPrisma },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "SQL", icon: Database },
    ],
  },
  {
    category: "DevOps",
    items: [
      { name: "Docker", icon: Package }, // Using Package for Docker
      { name: "AWS (basic deployment)", icon: Cloud },
    ],
  },
  {
    category: "Other",
    items: [
      { name: "Python", icon: Cpu },
      { name: "REST APIs", icon: SiReactquery }, // Using React Query icon as a generic API icon
      { name: "JWT", icon: Key },
      { name: "Git", icon: GitBranch },
      { name: "Chrome Extensions", icon: Puzzle },
    ],
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
};

const Skills = () => {
  return (
    <motion.section
      id="skills"
      className="py-16 bg-transparent dark:bg-transparent"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% of section is in view
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category) => (
            <motion.div
              key={category.category}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 glassmorphism-card" // Added glassmorphism-card class
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
                {category.category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {category.items.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-center text-gray-600 dark:text-gray-400 text-base"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    {skill.icon && (
                      <skill.icon className="mr-3 h-5 w-5 text-green-500" />
                    )}
                    <span>{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
