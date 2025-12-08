// src/components/Footer.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 py-12 transition-colors duration-500"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Mohammad Ali Nayeem
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Full Stack Developer & SWE Student at DIU. Building modern web applications and exploring AI/ML.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#skills" className="text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Connect
            </h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/kazinayeem"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 hover:text-green-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/mohammad-alinayeem"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 hover:text-blue-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:nayeem2305341022@diu.edu.bd"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 hover:text-red-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                aria-label="Email Me"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {currentYear} Mohammad Ali Nayeem. All rights reserved.
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500">
            Built with <span className="text-green-500 font-bold">Next.js</span> • <span className="text-blue-500 font-bold">Tailwind CSS</span> • <span className="text-purple-500 font-bold">Framer Motion</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
