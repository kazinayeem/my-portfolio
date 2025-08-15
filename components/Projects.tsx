"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Youtube, ExternalLink } from "lucide-react";
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
import { projectsData, techIcons } from "./data";

// Your project data

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
};

// Component
const Projects = () => {
  return (
    <motion.section
      id="projects"
      className="py-20 bg-white dark:bg-gray-950 text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-500"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black opacity-50 z-0 transition-colors duration-500" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center uppercase tracking-widest mb-2">
          Projects
        </h2>
        <p className="text-base sm:text-lg text-center text-green-600 dark:text-green-400 mb-12 uppercase tracking-wider">
          Featured Case Studies
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-5 flex flex-col transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-full h-56 rounded-md overflow-hidden mb-4 relative">
                <Image
                  src={project.imageSrc}
                  alt={`${project.title} preview`}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/600x400/e0e0e0/333333?text=Image+Error";
                  }}
                />
              </div>

              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 flex-grow mb-4">
                {project.shortDescription}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => {
                  const Icon = techIcons[tech];
                  return (
                    <span
                      key={tech}
                      className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1"
                    >
                      {Icon ? <Icon className="h-4 w-4" /> : null}
                      {tech}
                    </span>
                  );
                })}
              </div>

              <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-gray-300 dark:border-gray-700">
                <Button
                  asChild
                  variant="secondary"
                  className="flex-grow md:flex-grow-0"
                >
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </a>
                </Button>
                {project.youtubeDemoLink && (
                  <Button
                    asChild
                    variant="secondary"
                    className="flex-grow md:flex-grow-0"
                  >
                    <a
                      href={project.youtubeDemoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Youtube className="mr-2 h-4 w-4" /> Demo
                    </a>
                  </Button>
                )}
                {project.liveLink && (
                  <Button
                    asChild
                    variant="secondary"
                    className="flex-grow md:flex-grow-0"
                  >
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" /> Live
                    </a>
                  </Button>
                )}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-grow md:flex-grow-0"
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[90vw] md:max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
                    <DialogHeader>
                      <DialogTitle>{project.title}</DialogTitle>
                      <DialogDescription>
                        {project.shortDescription}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                      <div className="w-full h-56 rounded-md overflow-hidden mb-4">
                        <Image
                          src={project.imageSrc}
                          alt={`${project.title} preview`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://placehold.co/600x400/e0e0e0/333333?text=Image+Error";
                          }}
                        />
                      </div>
                      <h4 className="font-semibold text-lg mb-2">
                        Full Description:
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {project.fullDescription}
                      </p>
                      <h4 className="font-semibold text-lg mb-2">
                        Key Features:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                        {project.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-end gap-2 mt-6 border-t pt-4 border-gray-300 dark:border-gray-700">
                      <Button asChild>
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" /> GitHub
                        </a>
                      </Button>
                      {project.youtubeDemoLink && (
                        <Button asChild>
                          <a
                            href={project.youtubeDemoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Youtube className="mr-2 h-4 w-4" /> Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
