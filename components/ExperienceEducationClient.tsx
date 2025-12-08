"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Award, Target } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
  description: string;
  gpa: string | null;
  order: number;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  year: string;
  description: string;
  order: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  order: number;
}

interface Props {
  education: Education[];
  experience: Experience[];
  achievements: Achievement[];
}

const ExperienceEducationClient = ({ education, experience, achievements }: Props) => {
  return (
    <motion.section
      id="experience"
      className="py-12 sm:py-20 bg-transparent dark:bg-transparent text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-500"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-2 uppercase tracking-widest transition-colors duration-500">
          Education & Experience
        </h2>
        <p className="text-sm sm:text-lg text-center text-green-600 dark:text-green-400 mb-8 sm:mb-16 uppercase tracking-wider transition-colors duration-500">
          My Journey & Growth
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 mb-8 sm:mb-16">
          {/* Education */}
          <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8 flex items-center gap-2 sm:gap-3">
              <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
              Education
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {education.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <h4 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-1">
                    {item.degree}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">
                    {item.school}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
                    {item.year}
                  </p>
                  {item.gpa && (
                    <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-semibold px-2 py-1 rounded-full mb-3">
                      {item.gpa}
                    </span>
                  )}
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            transition={{ delay: 0.05 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8 flex items-center gap-2 sm:gap-3">
              <Briefcase className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
              Experience
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {experience.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">
                    {item.company}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">
                    {item.year}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          transition={{ staggerChildren: 0.05 }}
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8 flex items-center gap-2 sm:gap-3">
            <Award className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
            Key Achievements
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {achievements.map((achievement, idx) => (
              <motion.div
                key={idx}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-6 hover:border-green-500 dark:hover:border-green-400 transition-all duration-300 text-center"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Award className="h-5 w-5 sm:h-8 sm:w-8 text-green-500 mx-auto mb-2 sm:mb-4" />
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2 text-xs sm:text-base">
                  {achievement.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ExperienceEducationClient;
