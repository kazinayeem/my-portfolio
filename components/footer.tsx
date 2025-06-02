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
      className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10 transition-colors duration-500"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 text-center">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-sm">
            &copy; {currentYear} Mohammad Ali Nayeem. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link
              href="https://github.com/kazinayeem"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="hover:text-green-500 transition-colors duration-300"
            >
              <Github className="h-6 w-6" />
            </Link>
            <Link
              href="https://linkedin.com/in/mohammad-alinayeem"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="hover:text-green-500 transition-colors duration-300"
            >
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link
              href="mailto:nayeem2305341022@diu.edu.bd"
              aria-label="Email Me"
              className="hover:text-green-500 transition-colors duration-300"
            >
              <Mail className="h-6 w-6" />
            </Link>
          </div>
        </div>
        <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
          Built with Next.js, Tailwind CSS, and Framer Motion.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
