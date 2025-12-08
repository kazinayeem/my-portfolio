"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageSrc: string;
  githubLink: string;
  liveLink: string | null;
  youtubeDemoLink: string | null;
  technologies: string[];
  features: string[];
  isTeamProject: boolean;
}

interface ProjectsClientProps {
  projects: Project[];
}

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
};

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  return (
    <motion.section
      id="projects"
      className="py-16 sm:py-20 bg-transparent dark:bg-transparent text-gray-900 dark:text-white relative transition-colors duration-500"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-5xl font-extrabold text-center uppercase tracking-widest mb-2">
          Featured Projects
        </h2>
        <p className="text-lg text-center text-green-600 dark:text-green-400 mb-16 uppercase tracking-wider">
          Recent Work & Case Studies
        </p>

        {projects.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>No featured projects yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl hover:border-green-500 dark:hover:border-green-400 p-0 flex flex-col transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Image Container */}
                <div className="w-full h-48 sm:h-56 overflow-hidden relative bg-gray-200 dark:bg-gray-700">
                  <img
                    src={project.imageSrc}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x400/e0e0e0/333333?text=Image+Error";
                    }}
                  />
                </div>

                {/* Content Container */}
                <div className="p-5 sm:p-6 flex flex-col grow">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-400 grow mb-4 leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 px-3 py-1">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-5 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-2 gap-y-2">
                    <Button
                      asChild
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm"
                    >
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-1 h-4 w-4" /> GitHub
                      </a>
                    </Button>
                    {project.liveLink && (
                      <Button
                        asChild
                        variant="outline"
                        className="flex-1 text-sm"
                      >
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-1 h-4 w-4" /> Live
                        </a>
                      </Button>
                    )}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1 text-sm">
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[90vw] md:max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
                        <DialogHeader>
                          <DialogTitle className="text-2xl mb-2">
                            {project.title}
                          </DialogTitle>
                          <DialogDescription className="text-base">
                            {project.shortDescription}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                          <div className="w-full h-64 rounded-lg overflow-hidden mb-6 bg-gray-200 dark:bg-gray-700">
                            <img
                              src={project.imageSrc}
                              alt={`${project.title} preview`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "https://placehold.co/600x400/e0e0e0/333333?text=Image+Error";
                              }}
                            />
                          </div>
                          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">
                            Overview
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                            {project.fullDescription}
                          </p>
                          {project.features.length > 0 && (
                            <>
                              <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">
                                Key Features
                              </h4>
                              <ul className="space-y-2 mb-6">
                                {project.features.map((feature, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                                  >
                                    <span className="text-green-500 font-bold mt-1">
                                      ✓
                                    </span>
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                          <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-sm font-semibold px-3 py-1 rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-4 border-t border-gray-300 dark:border-gray-700">
                          <Button
                            asChild
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="mr-2 h-4 w-4" /> GitHub
                            </a>
                          </Button>
                          {project.liveLink && (
                            <Button asChild variant="outline">
                              <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="mr-2 h-4 w-4" /> Visit
                                Live
                              </a>
                            </Button>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}
