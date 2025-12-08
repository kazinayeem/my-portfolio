// src/components/About.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Download,
  LayoutDashboard,
  Code,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const About = () => {
  const resumeDownloadLink = "/cv_nayeem.pdf";

  return (
    <motion.section
      id="about"
      className="py-20 bg-transparent dark:bg-transparent text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-500"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-5xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-2 uppercase tracking-widest transition-colors duration-500">
          About Me
        </h2>
        <p className="text-lg text-center text-green-600 dark:text-green-400 mb-16 uppercase tracking-wider transition-colors duration-500">
          More About Me
        </p>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 mb-16">
          {/* Avatar */}
          <motion.div
            className="w-full lg:w-1/3 flex flex-col items-center relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative group">
              {/* Animated gradient ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-purple-500 to-blue-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              
              <div className="relative w-52 h-52 md:w-72 md:h-72 rounded-full border-4 border-white dark:border-gray-800 shadow-2xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                <Image
                  src={"/myimage.png"}
                  alt="Mohammad Ali Nayeem Avatar"
                  width={300}
                  height={300}
                  priority
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '50% 15%', transform: 'scale(0.9)' }}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/200x200/cccccc/333333?text=Avatar+Error";
                  }}
                />
              </div>
              
              {/* Status badge */}
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Available
              </motion.div>
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div
            className="w-full lg:w-2/3 bg-white/70 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-500"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-500">
              Hey! I&apos;m{" "}
              <span className="text-green-600 dark:text-green-400">
                Mohammad Ali Nayeem
              </span>
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed transition-colors duration-500">
              I&apos;m a <strong>Software Engineering Student</strong> at Daffodil International University with a deep passion for building scalable, modern web applications. I specialize in <strong>full-stack development</strong> using the MERN stack and have hands-on experience with cloud technologies and DevOps practices.
            </p>

            {/* Detailed info sections */}
            <div className="space-y-4 mb-8">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                  <Code className="h-5 w-5 text-green-600 dark:text-green-400" />
                  Technical Foundation
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Proficient in JavaScript, TypeScript, React, Next.js, Node.js, and databases (MongoDB, PostgreSQL). Currently exploring AI/ML and cloud deployment on AWS.
                </p>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                  <LayoutDashboard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  What I Do
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  I build responsive, user-friendly interfaces and robust backend systems. I love solving complex problems, writing clean code, and collaborating with teams to deliver impactful solutions.
                </p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  Education & Growth
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  DIU SWE Student | Continuous learner | Currently developing real-world projects to strengthen portfolio and gain industry experience.
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-base">
                Key Areas
              </h4>
              <div className="flex flex-wrap gap-3">
                <motion.span
                  className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-500"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Frontend Development
                </motion.span>
                <motion.span
                  className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-500"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  Backend Development
                </motion.span>
                <motion.span
                  className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-500"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Full Stack Solutions
                </motion.span>
                <motion.span
                  className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-500"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  DevOps & Cloud
                </motion.span>
              </div>
            </div>

            {/* Download CV */}
            <div className="mt-8">
              <Button
                asChild
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300"
              >
                <a
                  href={resumeDownloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="cv_nayeem.pdf"
                >
                  <Download className="mr-2 h-5 w-5" /> Download CV
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
