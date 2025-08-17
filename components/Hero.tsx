"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { AuroraBackground } from "./ui/aurora-background";
import { CodeBlock } from "@/components/ui/code-block";

// ----------------------
// Typing Effect Hook
// ----------------------
const useTypingEffect = (sequence: string[], speed = 50) => {
  const [text, setText] = useState("");
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingInterval: NodeJS.Timeout;

    const handleTyping = () => {
      const currentText = sequence[sequenceIndex];
      const fullLength = currentText.length;

      if (!isDeleting) {
        setText(currentText.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex + 1 === fullLength) {
          setIsDeleting(true);
          clearInterval(typingInterval);
          setTimeout(() => {
            typingInterval = setInterval(handleTyping, speed / 2);
          }, 1000);
        }
      } else {
        setText(currentText.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex === 0) {
          setIsDeleting(false);
          setSequenceIndex((prev) => (prev + 1) % sequence.length);
        }
      }
    };

    typingInterval = setInterval(handleTyping, speed);
    return () => clearInterval(typingInterval);
  }, [charIndex, isDeleting, sequence, sequenceIndex, speed]);

  return text;
};

// ----------------------
// Hero Component
// ----------------------
const Hero: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const emailAddress = "nayeem2305341022@diu.edu.bd";
  const typingText = useTypingEffect(
    ["Web Developer", "Full-Stack Engineer", "AI Enthusiast"],
    50
  );
  const desktopCode = `
const AboutMe = () => {
  return (
    <div className="flex flex-col gap-4">
      <p>
        Hey, I'm Nayeem. <br />
        I build modern, scalable web applications using the latest tech.
      </p>
    </div>
  );
};
  `;

  const mobileCode = `
const AboutMe = () => {
  return (
    <div className="flex gap-2">
      <p>
        Hey, I'm Nayeem. 
        I build modern,
        scalable 
        web applications 
        using the latest
         tech.
      </p>
    </div>
  );
};
  `;

  return (
    <AuroraBackground>
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 py-20">
        {/* Left section */}
        <div className="flex-1 text-center md:text-left max-w-2xl text-gray-900 dark:text-white">
          <motion.h1
            className="mt-30 md:mt-4 text-4xl md:text-6xl font-extrabold mb-4 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Mohammad Ali <span className="text-green-400">Nayeem</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hello, I&apos;m a
            <span className="text-green-300 font-bold">{typingText}</span>
          </motion.p>

          {/* Social buttons */}
          <motion.div
            className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="#contact"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full flex items-center gap-2 transition transform hover:scale-105"
            >
              Let&apos;s Connect <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${emailAddress}`}
              className="p-3 rounded-full border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-green-500 hover:border-green-500 transition transform hover:scale-105"
            >
              <Mail className="h-6 w-6" />
            </a>
            <a
              href="https://github.com/kazinayeem"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-green-500 hover:border-green-500 transition transform hover:scale-105"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/mohammad-alinayeem"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-green-500 hover:border-green-500 transition transform hover:scale-105"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </motion.div>
        </div>

        {/* Right section */}
        <motion.div
          className="flex-1 w-full mt-10 md:mt-0 md:ml-10 px-4 md:px-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="overflow-x-auto w-full">
            <div className="inline-block min-w-full">
              <CodeBlock
                language="tsx"
                filename="AboutMe.tsx"
                code={isMobile ? mobileCode : desktopCode}
                highlightLines={[2, 4, 7]}
              />
            </div>
          </div>
        </motion.div>
      </section>
    </AuroraBackground>
  );
};

export default function App() {
  return <Hero />;
}
