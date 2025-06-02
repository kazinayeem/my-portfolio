// src/components/Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { MenuIcon, XIcon } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0); // Renamed for clarity
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate total scrollable height
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      // Calculate current scroll position as a percentage of total height
      const currentProgress = window.scrollY / totalHeight;
      setScrollProgress(Math.min(1, Math.max(0, currentProgress))); // Ensure it stays between 0 and 1
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:supports-[backdrop-filter]:bg-gray-950/60 border-b border-b-gray-200 dark:border-b-gray-800">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-green-500 z-50 origin-left"
        style={{ scaleX: scrollProgress }} // Use the new scrollProgress
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-xl text-gray-900 dark:text-gray-100"
        >
          Mohammad Nayeem
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-green-500 transition-colors ${
                pathname === item.href
                  ? "text-green-500"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Navigation Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors"
          >
            {isMobileMenuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 py-2 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-2 hover:text-green-500 transition-colors ${
                  pathname === item.href
                    ? "text-green-500"
                    : "text-gray-600 dark:text-gray-400"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
