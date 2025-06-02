// src/components/Hero.tsx
'use client';

import React, { useState, useEffect } from 'react'; // Import useState and useEffect for responsive logic
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiPython } from 'react-icons/si'; // Programming logos

const Hero = () => {
  const emailAddress = 'nayeem2305341022@diu.edu.bd';

  // Define all possible programming logos
  const allProgrammingLogos = [
    { icon: SiReact, color: 'text-blue-600 dark:text-blue-400' },
    { icon: SiNextdotjs, color: 'text-gray-800 dark:text-gray-400' },
    { icon: SiTailwindcss, color: 'text-cyan-600 dark:text-cyan-400' },
    { icon: SiNodedotjs, color: 'text-green-600 dark:text-green-400' },
    { icon: SiPython, color: 'text-yellow-600 dark:text-yellow-400' },
  ];

  // Define responsive positions for each logo
  const logoPositions = [
    {
      mobile: { top: '5%', left: '5%' },
      desktop: { top: '10%', left: '10%' }
    },
    {
      mobile: { bottom: '5%', right: '5%' },
      desktop: { bottom: '15%', right: '10%' }
    },
    {
      mobile: { top: '15%', right: '5%' }, // This will be the 3rd icon on desktop
      desktop: { top: '20%', right: '15%' }
    },
    {
      mobile: { bottom: '10%', left: '15%' }, // This will be the 4th icon on desktop
      desktop: { bottom: '5%', left: '40%' }
    },
    {
      mobile: { top: '40%', left: '5%' }, // This will be the 5th icon (only on mobile if needed, but we'll limit to 2/4)
      desktop: { top: '60%', left: '5%' }
    },
  ];

  const logoSizes = [
    { mobile: 60, desktop: 90, lg: 120 },
    { mobile: 70, desktop: 100, lg: 130 },
    { mobile: 80, desktop: 110, lg: 140 },
    { mobile: 90, desktop: 120, lg: 150 },
    { mobile: 100, desktop: 130, lg: 160 },
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's 'md' breakpoint is 768px
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine which logos to show based on screen size
  const logosToShow = isMobile ? allProgrammingLogos.slice(0, 2) : allProgrammingLogos.slice(0, 4);


  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 text-gray-900 dark:text-white py-20 relative overflow-hidden transition-colors duration-500">
      <div className="container mx-auto text-center relative z-10">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Mohammad Ali <span className="text-green-500">Nayeem</span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-700 dark:text-gray-400 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hello, I&apos;m Mohammad Ali Nayeem - a{' '}
          <span className="text-green-600 dark:text-green-300">
            <TypeAnimation
              sequence={[
                'Web Developer',
                1500,
                'Full-Stack Engineer',
                1500,
                'AI Enthusiast',
                1500,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </span>
        </motion.p>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="#contact" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full flex items-center gap-2 transition-colors duration-300 transform hover:scale-105">
            Let&apos;s Connect <ArrowRight className="h-5 w-5" />
          </Link>
          <a href={`mailto:${emailAddress}`} aria-label="Email Mohammad Ali Nayeem" className="text-gray-700 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-300 transition-colors duration-300 p-3 rounded-full border border-gray-300 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 flex items-center justify-center transform hover:scale-105">
            <Mail className="h-6 w-6" /> {/* Only the Mail icon */}
          </a>
          <a href="https://github.com/kazinayeem" target="_blank" rel="noopener noreferrer" className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-semibold py-3 px-6 rounded-full flex items-center gap-2 transition-colors duration-300 transform hover:scale-105">
            <Github className="h-5 w-5" /> GitHub
          </a>
          <a href="https://linkedin.com/in/mohammad-alinayeem" target="_blank" rel="noopener noreferrer" className="bg-blue-100 dark:bg-blue-700 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-800 dark:text-white font-semibold py-3 px-6 rounded-full flex items-center gap-2 transition-colors duration-300 transform hover:scale-105">
            <Linkedin className="h-5 w-5" /> LinkedIn
          </a>
        </motion.div>
      </div>
      {/* Animated background shapes with programming logos */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {logosToShow.map((logo, index) => {
          const Icon = logo.icon;
          const size = isMobile ? logoSizes[index].mobile : logoSizes[index].desktop;
          const position = isMobile ? logoPositions[index].mobile : logoPositions[index].desktop;

          return (
            <motion.div
              key={index}
              className={`absolute rounded-full opacity-100 flex items-center justify-center ${logo.color}`}
              style={{
                top: position.top,
                left: position.left,
                right: position.right,
                bottom: position.bottom,
                width: size,
                height: size,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.7, 1, 0.7],
                rotate: [0, 360],
                y: [0, 15, 0],
              }}
              transition={{
                duration: 15 + index * 5,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'reverse',
                delay: index * 1,
              }}
            >
              <Icon className="w-full h-full p-4" />
            </motion.div>
          );
        })}
        {/* Existing colored circles for additional abstract background, also made more visible */}
        <motion.div
          className="absolute bg-green-500 rounded-full opacity-40 blur-sm"
          style={{ top: '5%', left: '5%', width: isMobile ? 100 : 200, height: isMobile ? 100 : 200 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 9, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.div
          className="absolute bg-blue-500 rounded-full opacity-40 blur-sm"
          style={{ bottom: '5%', right: '5%', width: isMobile ? 120 : 250, height: isMobile ? 120 : 250 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', delay: 1.5 }}
        />
      </div>
    </section>
  );
};

export default Hero;
