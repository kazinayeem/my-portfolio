"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

// Animated Terminal Component - Custom built for performance
const AnimatedTerminal = () => {
  const [lines, setLines] = useState<{ text: string; color: string; visible: boolean }[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [cursorVisible, setCursorVisible] = useState(true);

  const terminalContent = [
    { text: "$ whoami", color: "text-green-400", delay: 0 },
    { text: "Mohammad Ali Nayeem", color: "text-white", delay: 100 },
    { text: "Software Engineering Student @ DIU", color: "text-gray-400", delay: 50 },
    { text: "", color: "", delay: 100 },
    { text: "$ cat expertise.json", color: "text-green-400", delay: 200 },
    { text: "{", color: "text-yellow-400", delay: 50 },
    { text: '  "frontend": ["React", "Next.js", "TypeScript", "Tailwind"],', color: "text-blue-400", delay: 50 },
    { text: '  "backend": ["Node.js", "Express", "PostgreSQL", "MongoDB"],', color: "text-purple-400", delay: 50 },
    { text: '  "devops": ["Docker", "AWS", "Linux", "CI/CD"],', color: "text-orange-400", delay: 50 },
    { text: '  "exploring": ["AI/ML", "System Design", "Cloud Architecture"]', color: "text-pink-400", delay: 50 },
    { text: "}", color: "text-yellow-400", delay: 50 },
    { text: "", color: "", delay: 100 },
    { text: "$ ./status.sh", color: "text-green-400", delay: 200 },
    { text: "✓ Available for opportunities", color: "text-emerald-400", delay: 100 },
    { text: "✓ Currently building amazing projects", color: "text-emerald-400", delay: 100 },
    { text: "✓ Always learning new technologies", color: "text-emerald-400", delay: 100 },
  ];

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (currentLine < terminalContent.length) {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, { ...terminalContent[currentLine], visible: true }]);
        setCurrentLine(prev => prev + 1);
      }, terminalContent[currentLine].delay + terminalContent[currentLine].text.length * 8);
      return () => clearTimeout(timer);
    }
    setIsTyping(false);
  }, [currentLine]);

  return (
    <div className="bg-white dark:bg-gray-900/95 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-2xl overflow-hidden">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700/50">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-gray-500 dark:text-gray-400 text-sm font-mono ml-2">nayeem@portfolio:~</span>
      </div>
      {/* Terminal Body */}
      <div className="p-4 sm:p-5 font-mono text-sm min-h-80 max-h-96 overflow-hidden bg-gray-50 dark:bg-gray-950">
        {lines.map((line, idx) => {
          const lightColorMap: Record<string, string> = {
            "text-green-400": "text-green-600 dark:text-green-400",
            "text-white": "text-gray-900 dark:text-white",
            "text-gray-400": "text-gray-600 dark:text-gray-400",
            "text-yellow-400": "text-yellow-600 dark:text-yellow-400",
            "text-blue-400": "text-blue-600 dark:text-blue-400",
            "text-purple-400": "text-purple-600 dark:text-purple-400",
            "text-orange-400": "text-orange-600 dark:text-orange-400",
            "text-pink-400": "text-pink-600 dark:text-pink-400",
            "text-emerald-400": "text-emerald-600 dark:text-emerald-400",
          };
          const colorClass = lightColorMap[line.color] || line.color;
          return (
            <div key={idx} className={`${colorClass} leading-relaxed transition-opacity duration-150`}>
              {line.text || "\u00A0"}
            </div>
          );
        })}
        {isTyping && (
          <span className={`inline-block w-2 h-4 bg-green-600 dark:bg-green-400 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`} />
        )}
      </div>
    </div>
  );
};

// Hero section
const Hero: React.FC = () => {
  const emailAddress = "nayeem2305341022@diu.edu.bd";

  return (
    <section className="min-h-screen w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 lg:pb-20">
      {/* Left → About Me */}
      <div className="w-full lg:w-1/2 flex flex-col items-start justify-center">
        {/* Greeting Badge */}
        <div className="inline-block mb-6">
          <span className="px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-semibold">
            👋 Welcome to my portfolio
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-green-600 to-blue-600 dark:from-white dark:via-green-400 dark:to-blue-400 bg-clip-text text-transparent mb-4 leading-tight animate-name-gradient">
          Hi, I&apos;m <span className="block">Mohammad Ali Nayeem</span>
        </h1>

        {/* Role */}
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6">
          <span className="font-semibold text-green-600 dark:text-green-400">Software Engineer</span> • <span className="font-semibold text-blue-600 dark:text-blue-400">Full Stack Developer</span>
        </p>

        {/* Description */}
        <div className="max-w-lg mb-8">
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-400 leading-relaxed">
            SWE student at <span className="font-semibold text-purple-600 dark:text-purple-400">DIU</span> building apps with <span className="font-semibold text-green-600 dark:text-green-400">React/Next.js</span> & <span className="font-semibold text-blue-600 dark:text-blue-400">Node.js</span>. Exploring <span className="font-semibold text-orange-600 dark:text-orange-400">DevOps</span>, <span className="font-semibold text-pink-600 dark:text-pink-400">Cloud</span> & <span className="font-semibold text-cyan-600 dark:text-cyan-400">AI/ML</span>.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8 w-full">
          <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
            <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">5+</p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Projects</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">2+</p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Years Coding</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
            <p className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">10+</p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Tech Skills</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 w-full mb-8">
          <a
            href="#contact"
            className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition transform hover:scale-105 shadow-lg"
          >
            Let&apos;s Connect <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="/cv_nayeem.pdf"
            download
            className="w-full sm:w-auto border-2 border-gray-300 dark:border-gray-600 hover:border-green-500 text-gray-900 dark:text-gray-100 font-semibold py-3 px-8 rounded-lg transition transform hover:scale-105"
          >
            Download CV
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Follow me:</span>
          <a
            href={`mailto:${emailAddress}`}
            className="p-3 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-green-500 hover:border-green-500 transition hover:bg-green-50 dark:hover:bg-green-900/20"
            title="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
          <a
            href="https://github.com/kazinayeem"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-green-500 hover:border-green-500 transition hover:bg-green-50 dark:hover:bg-green-900/20"
            title="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com/in/mohammad-alinayeem"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:border-blue-500 transition hover:bg-blue-50 dark:hover:bg-blue-900/20"
            title="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Right → Animated Terminal */}
      <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end">
        <div className="relative w-full max-w-lg">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-blue-400/20 to-purple-400/20 dark:from-green-600/20 dark:via-blue-600/20 dark:to-purple-600/20 rounded-2xl blur-2xl" />
          
          {/* Custom Animated Terminal */}
          <div className="relative">
            <AnimatedTerminal />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
