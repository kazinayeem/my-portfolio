// src/components/Projects.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Youtube, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  SiNextdotjs, SiPrisma, SiExpress, SiPostgresql, SiMongodb,SiReactivex as  SiReactnative,
  SiReact, SiTailwindcss, SiPython, SiDocker, SiAmazon as SiAmazonaws, SiJavascript,
} from 'react-icons/si';

// Define the structure for a project
interface Project {
  id: string;
  title: string;
  shortDescription: string; // Shorter description for the card
  fullDescription: string; // Full description for the details
  tech: string[];
  githubLink: string;
  youtubeDemoLink?: string;
  liveLink?: string;
  features: string[];
  imageSrc: string; // Image for the card preview
  isTeamProject: boolean;
}

// Map tech names to React-icons components
const techIcons: { [key: string]: React.ElementType } = {
  'Next.js': SiNextdotjs,
  'Prisma': SiPrisma,
  'Express.js': SiExpress,
  'PostgreSQL': SiPostgresql,
  'MongoDB': SiMongodb,
  'React Native': SiReactnative,
  'React.js': SiReact,
  'Tailwind CSS': SiTailwindcss,
  'Python': SiPython,
  'Docker': SiDocker,
  'AWS': SiAmazonaws,
  'JavaScript': SiJavascript,
  'Chrome API': SiJavascript, // Using JS icon for Chrome API
  'SSLCommerz': ExternalLink, // No direct icon, using external link as placeholder
  'JWT': ArrowRight, // No direct icon, using generic arrow as placeholder
  'Gemini AI': ArrowRight, // No direct icon, using generic arrow as placeholder
  'Web Scraping': ArrowRight, // No direct icon, using generic arrow as placeholder
  'Flask': SiPython, // Flask is Python framework
};

// Your project data
const projectsData: Project[] = [
  {
    id: 'edemy-ai',
    title: 'Edemy – AI-Powered Online Learning Platform',
    shortDescription: 'Agency platform with job posting, AI chatbot, and secure application system.',
    fullDescription: 'A comprehensive online learning platform with AI-generated course descriptions and secure payment integration. This full-stack agency platform includes AI-powered features, a secure job application flow, and role-based dashboards for Admin and Users. Key features include: Teacher/Student/Admin dashboards, AI-generated course descriptions (Gemini AI), Secure SSLCommerz payments, Course creation, analytics, review system, Role-based dashboards for Admin and Users, Secure job application system with email verification (OTP), AI chatbot for answering queries, User management and team collaboration tools, Blog and service section management, and Image uploads integrated with AWS S3.',
    tech: ['Next.js', 'Prisma', 'Express.js', 'PostgreSQL', 'SSLCommerz', 'JWT', 'Gemini AI', 'AWS'],
    githubLink: 'https://github.com/kazinayeem/udemy-clone',
    youtubeDemoLink: 'https://www.youtube.com/watch?v=your-edemy-demo', // Replace with actual YouTube link
    features: [
      'Teacher/Student/Admin dashboards',
      'AI-generated course descriptions (Gemini AI)',
      'Secure SSLCommerz payments',
      'Course creation, analytics, review system',
      'Role-based dashboards for Admin and Users',
      'Secure job application system with email verification (OTP)',
      'AI chatbot for answering queries',
      'User management and team collaboration tools',
      'Blog and service section management',
      'Image uploads integrated with AWS S3',
    ],
    imageSrc: 'https://placehold.co/600x400/1e293b/cbd5e1?text=Edemy+Preview', // Placeholder image, replace with actual screenshot
    isTeamProject: true,
  },
  {
    id: 'myshop-2',
    title: 'MyShop 2.0 – Full-featured E-commerce Platform',
    shortDescription: 'A robust e-commerce solution including web frontend, mobile app, and admin dashboard.',
    fullDescription: 'A robust e-commerce solution including web frontend, mobile app (React Native), and admin dashboard. Features a Node.js + MongoDB backend with multiple payment methods, order management, and POS integration. Key features include: Web frontend, mobile app (React Native), and admin dashboard, Node.js + MongoDB backend, Multiple payment methods, order management, POS integration.',
    tech: ['Node.js', 'MongoDB', 'React Native', 'Express.js'],
    githubLink: 'https://github.com/kazinayeem/myshop-2',
    features: [
      'Web frontend, mobile app (React Native), and admin dashboard',
      'Node.js + MongoDB backend',
      'Multiple payment methods, order management, POS integration',
    ],
    imageSrc: 'https://placehold.co/600x400/1e293b/cbd5e1?text=MyShop+Preview', // Placeholder image
    isTeamProject: false,
  },
  {
    id: 'ecommerce-frontend',
    title: 'E-commerce Frontend',
    shortDescription: 'A responsive and modern e-commerce user interface.',
    fullDescription: 'A responsive and modern e-commerce user interface with product listing, shopping cart, and user authentication. Key features include: Product listing and detail pages, Shopping cart functionality, User authentication.',
    tech: ['React.js', 'Tailwind CSS'],
    githubLink: 'https://github.com/kazinayeem/e-commerce-frontend',
    liveLink: 'https://your-ecommerce-frontend.vercel.app',
    features: [
      'Product listing and detail pages',
      'Shopping cart functionality',
      'User authentication',
    ],
    imageSrc: 'https://placehold.co/600x400/1e293b/cbd5e1?text=E-commerce+UI', // Placeholder image
    isTeamProject: false,
  },
  {
    id: 'priceninjabd',
    title: 'PriceNinja BD',
    shortDescription: 'A tool for comparing product prices from various online stores in Bangladesh.',
    fullDescription: 'A tool for comparing product prices from various online stores in Bangladesh. Key features include: Real-time price comparisons, Product search and filtering, Alerts for price drops.',
    tech: ['Python', 'Web Scraping', 'Flask'],
    githubLink: 'https://github.com/kazinayeem/priceninjabd',
    features: [
      'Real-time price comparisons',
      'Product search and filtering',
      'Alerts for price drops',
    ],
    imageSrc: 'https://placehold.co/600x400/1e293b/cbd5e1?text=PriceNinja+BD', // Placeholder image
    isTeamProject: false,
  },
  {
    id: 'media-link-extractor-chrome-extension',
    title: 'Media Link Extractor (Chrome Extension)',
    shortDescription: 'A browser extension to extract media links from web pages.',
    fullDescription: 'A browser extension to extract media links from web pages. Key features include: One-click link extraction, Supports various media types, User-friendly interface.',
    tech: ['JavaScript', 'Chrome API'],
    githubLink: 'https://github.com/kazinayeem/media-link-extractor',
    features: [
      'One-click link extraction',
      'Supports various media types',
      'User-friendly interface',
    ],
    imageSrc: 'https://placehold.co/600x400/1e293b/cbd5e1?text=Media+Extractor', // Placeholder image
    isTeamProject: false,
  },
  {
    id: 'swipe-onboarding-react-native',
    title: 'Swipe Onboarding (React Native)',
    shortDescription: 'A customizable swipe-through onboarding screen for React Native applications.',
    fullDescription: 'A customizable swipe-through onboarding screen for React Native applications. Key features include: Smooth swipe animations, Customizable content and styling, Indicator dots for progress.',
    tech: ['React Native'],
    githubLink: 'https://github.com/kazinayeem/swipe-onboarding',
    features: [
      'Smooth swipe animations',
      'Customizable content and styling',
      'Indicator dots for progress',
    ],
    imageSrc: 'https://placehold.co/600x400/1e293b/cbd5e1?text=Swipe+Onboarding', // Placeholder image
    isTeamProject: false,
  },
  {
    id: 'qr-code-scanner-rn',
    title: 'QR Code Scanner (React Native)',
    shortDescription: 'A simple and efficient QR code scanner built with React Native.',
    fullDescription: 'A simple and efficient QR code scanner built with React Native. Key features include: Fast scanning capabilities, Flashlight toggle, History of scanned codes.',
    tech: ['React Native'],
    githubLink: 'https://github.com/kazinayeem/qr-code-scanner-rn',
    features: [
      'Fast scanning capabilities',
      'Flashlight toggle',
      'History of scanned codes',
    ],
    imageSrc: 'https://placehold.co/600x400/1e293b/cbd5e1?text=QR+Scanner', // Placeholder image
    isTeamProject: false,
  },
  {
    id: 'e-food-ui',
    title: 'E-food UI',
    shortDescription: 'A modern and intuitive user interface for a food delivery application.',
    fullDescription: 'A modern and intuitive user interface for a food delivery application. Key features include: Browse restaurants and menus, Order tracking, User reviews and ratings.',
    tech: ['React.js', 'Tailwind CSS'],
    githubLink: 'https://github.com/kazinayeem/e-food-ui',
    features: [
      'Browse restaurants and menus',
      'Order tracking',
      'User reviews and ratings',
    ],
    imageSrc: 'https://placehold.co/600x400/1e293b/cbd5e1?text=E-food+UI', // Placeholder image
    isTeamProject: false,
  },
  {
    id: 'e-commerce-ui-rn',
    title: 'E-commerce UI RN',
    shortDescription: 'A clean and functional e-commerce user interface for React Native.',
    fullDescription: 'A clean and functional e-commerce user interface for React Native. Key features include: Product display and categories, Shopping cart integration, Responsive design for mobile devices.',
    tech: ['React Native'],
    githubLink: 'https://github.com/kazinayeem/e-commerce-ui-rn',
    features: [
      'Product display and categories',
      'Shopping cart integration',
      'Responsive design for mobile devices',
    ],
    imageSrc: 'https://placehold.co/600x400/1e293b/cbd5e1?text=E-commerce+UI+RN', // Placeholder image
    isTeamProject: false,
  },
];


const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
};

const Projects = () => {
  return (
    <motion.section
      id="projects"
      className="py-20 bg-white dark:bg-gray-950 text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-500"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black opacity-50 z-0 transition-colors duration-500"></div>
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-5xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-2 uppercase tracking-widest transition-colors duration-500">
          Projects
        </h2>
        <p className="text-lg text-center text-green-600 dark:text-green-400 mb-16 uppercase tracking-wider transition-colors duration-500">
          Featured Case Studies
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out"
            
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden mb-4">
                <img
                  src={project.imageSrc}
                  alt={`${project.title} preview`}
                  className="w-full h-full object-cover hover:opacity-45 transition-opacity duration-300" // Added hover opacity
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/600x400/e0e0e0/333333?text=Image+Error';
                  }}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-500">
                {project.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 flex-grow transition-colors duration-500">
                {project.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => {
                  const IconComponent = techIcons[tech];
                  return IconComponent ? (
                    <span
                      key={tech}
                      className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 transition-colors duration-500"
                    >
                      <IconComponent className="h-4 w-4" /> {tech}
                    </span>
                  ) : (
                    <span
                      key={tech}
                      className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded-full transition-colors duration-500"
                    >
                      {tech}
                    </span>
                  );
                })}
              </div>
              <div className="mt-auto flex flex-wrap gap-3 pt-4 border-t border-gray-300 dark:border-gray-700 transition-colors duration-500">
                <Button asChild variant="secondary" className="flex-grow md:flex-grow-0 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white transition-colors duration-500">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </a>
                </Button>
                {project.youtubeDemoLink && (
                  <Button asChild variant="secondary" className="flex-grow md:flex-grow-0 bg-red-100 dark:bg-red-600 hover:bg-red-200 dark:hover:bg-red-700 text-red-800 dark:text-white transition-colors duration-500">
                    <a href={project.youtubeDemoLink} target="_blank" rel="noopener noreferrer">
                      <Youtube className="mr-2 h-4 w-4" /> Demo
                    </a>
                  </Button>
                )}
                {project.liveLink && (
                  <Button asChild variant="secondary" className="flex-grow md:flex-grow-0 bg-blue-100 dark:bg-blue-600 hover:bg-blue-200 dark:hover:bg-blue-700 text-blue-800 dark:text-white transition-colors duration-500">
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live
                    </a>
                  </Button>
                )}

                {/* Modal for Features */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex-grow md:flex-grow-0 border-gray-400 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-500">View Details</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] md:max-w-xl lg:max-w-2xl bg-white/95 dark:bg-gray-900/95 text-gray-900 dark:text-gray-100 rounded-lg shadow-xl glassmorphism-card-modal border border-gray-300 dark:border-gray-700 transition-colors duration-500 overflow-y-auto max-h-[90vh]"> {/* Added overflow-y-auto and max-h for scrollability */}
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
                      <DialogDescription className="text-gray-600 dark:text-gray-400">
                        {project.shortDescription}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <div className="w-full h-56 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden mb-4">
                        <img
                          src={project.imageSrc}
                          alt={`${project.title} preview`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://placehold.co/600x400/e0e0e0/333333?text=Image+Error';
                          }}
                        />
                      </div>
                      <h4 className="font-semibold text-lg mb-2">Full Description:</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{project.fullDescription}</p>
                      <h4 className="font-semibold text-lg mb-2">Key Features:</h4>
                      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                        {project.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-end gap-2 pt-4 border-t border-gray-300 dark:border-gray-700">
                      <Button asChild className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white">
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" /> GitHub
                        </a>
                      </Button>
                      {project.youtubeDemoLink && (
                        <Button asChild className="bg-red-100 dark:bg-red-600 hover:bg-red-200 dark:hover:bg-red-700 text-red-800 dark:text-white">
                          <a href={project.youtubeDemoLink} target="_blank" rel="noopener noreferrer">
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
