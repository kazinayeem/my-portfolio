"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface BlogTOCProps {
  headings: Heading[];
}

export default function BlogTOC({ headings }: BlogTOCProps) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav
      className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto lg:block"
      aria-label="Table of contents"
    >
      <p className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
        On This Page
      </p>
      <ul className="space-y-2 border-l border-gray-200 dark:border-gray-800">
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`block border-l-2 py-1 text-sm transition-colors ${
                level === 3 ? "pl-6" : "pl-4"
              } ${
                activeId === id
                  ? "border-green-500 font-medium text-green-600 dark:text-green-400"
                  : "border-transparent text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
