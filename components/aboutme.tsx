// src/components/About.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image'; // Import Image component
import { Download, LayoutDashboard, Code, Cloud, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const About = () => {
 
  const resumeDownloadLink = "/Mohammad_Ali_Nayeem_Resume.pdf"; // Path to your resume PDF

  return (
    <motion.section
      id="about"
      className="py-20 bg-white dark:bg-gray-950 text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-500"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black opacity-50 z-0 transition-colors duration-500"></div>
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-5xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-2 uppercase tracking-widest transition-colors duration-500">
          About Me
        </h2>
        <p className="text-lg text-center text-green-600 dark:text-green-400 mb-16 uppercase tracking-wider transition-colors duration-500">
          More About Me
        </p>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          <motion.div
            className="w-full lg:w-1/3 flex flex-col items-center relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <Image
                src={"/myimage.png"}
                alt="Mohammad Ali Nayeem Avatar"
                width={256}
                height={256} 
                priority 
                className="rounded-full w-48 h-48 md:w-64 md:h-64 object-cover border-4 border-purple-500 shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/200x200/cccccc/333333?text=Avatar+Error';
                }}
              />
              <motion.span
                className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                Software Engineer
              </motion.span>
              <motion.span
                className="absolute -bottom-4 right-1/2 translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                Student
              </motion.span>
            </div>
          </motion.div>

          <motion.div
            className="w-full lg:w-2/3 bg-white/70 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-500"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-500">
              Hey! I&apos;m <span className="text-green-600 dark:text-green-400">Mohammad Ali Nayeem</span>
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed transition-colors duration-500">
              Friendly and engaging software engineering student with a passion for full-stack development and team collaboration.
              I am a student of Daffodil International University, Department of Software Engineering.
              Experienced in MERN stack, Python, SQL, and Docker. Quick learner, detail-oriented, and dedicated to solving
              real-world problems. Currently seeking an internship or junior developer position to further enhance my technical skills
              and contribute to meaningful projects.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-8 leading-relaxed transition-colors duration-500">
              I&apos;m always leveling up my skills and currently diving deeper into backend and DevOps.
              Whether it&apos;s full-time or freelance, I&apos;m open to exciting opportunities where I can grow and build dope stuff with amazing people.
            </p>

            <h4 className="font-semibold text-xl text-gray-800 dark:text-gray-200 mb-4 transition-colors duration-500">What I Do</h4>
            <div className="flex flex-wrap gap-4 mb-8">
              <motion.span
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full flex items-center gap-2 text-base transition-colors duration-500"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                <Code className="h-5 w-5 text-green-600 dark:text-green-400" /> Frontend Development
              </motion.span>
              <motion.span
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full flex items-center gap-2 text-base transition-colors duration-500"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.1 }}
              >
                <LayoutDashboard className="h-5 w-5 text-green-600 dark:text-green-400" /> Backend Development
              </motion.span>
              <motion.span
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full flex items-center gap-2 text-base transition-colors duration-500"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.2 }}
              >
                <Cloud className="h-5 w-5 text-green-600 dark:text-green-400" /> DevOps
              </motion.span>
              <motion.span
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full flex items-center gap-2 text-base transition-colors duration-500"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.3 }}
              >
                <GraduationCap className="h-5 w-5 text-green-600 dark:text-green-400" /> DIU SWE Student
              </motion.span>
            </div>

            <div className="mt-8">
              <Button asChild className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300">
                <a href={resumeDownloadLink} target="_blank" rel="noopener noreferrer" download="Mohammad_Ali_Nayeem_Resume.pdf">
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
