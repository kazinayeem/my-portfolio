"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Navbar as BaseNavbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { usePathname } from "next/navigation";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler"; // ✅ use animated toggler

const navItems = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 min-w-full w-full z-50 bg-transparent">
      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-green-500 origin-left z-50"
        style={{ scaleX: scrollProgress }}
      />

      {/* Transparent Navbar without bg and border */}
      <BaseNavbar className="bg-transparent border-none">
        {/* Desktop Nav */}
        <NavBody className="items-center justify-between">
          <NavItems
            items={navItems.map((item) => ({
              name: item.label,
              link: item.href,
              active: pathname === item.href,
            }))}
          />

          <div className="flex items-center gap-4 z-50">
            {/* ✅ Replaced with AnimatedThemeToggler */}
            <AnimatedThemeToggler />
          </div>
        </NavBody>

        {/* Mobile Nav */}
        <MobileNav>
          <MobileNavHeader>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-${idx}`}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 ${
                  pathname === item.href
                    ? "text-green-500 font-semibold"
                    : "text-gray-800 dark:text-gray-200"
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col gap-4 mt-4">
              {/* ✅ Replaced in mobile menu too */}
              <AnimatedThemeToggler />
            </div>
          </MobileNavMenu>
        </MobileNav>
      </BaseNavbar>
      <br />
    </div>
  );
}
