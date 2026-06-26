"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, Globe } from "lucide-react";
import { BLOG_AUTHOR } from "@/lib/blog/constants";
import { Badge } from "@/components/ui/badge";

export default function BlogAuthorBox() {
  return (
    <aside
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-gray-900/80"
      aria-label="About the author"
    >
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <Image
          src={BLOG_AUTHOR.avatar}
          alt={`${BLOG_AUTHOR.name} profile picture`}
          width={96}
          height={96}
          className="rounded-full border-4 border-green-500/30 object-cover"
        />
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {BLOG_AUTHOR.name}
          </h3>
          <p className="text-sm font-medium text-green-600 dark:text-green-400">
            {BLOG_AUTHOR.title}
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {BLOG_AUTHOR.roles.join(" • ")}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {BLOG_AUTHOR.bio}
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
            {BLOG_AUTHOR.skills.slice(0, 6).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-3 sm:justify-start">
            <a
              href={BLOG_AUTHOR.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-gray-100 p-2 text-gray-700 transition-colors hover:text-green-500 dark:bg-gray-800 dark:text-gray-300"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={BLOG_AUTHOR.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-gray-100 p-2 text-gray-700 transition-colors hover:text-blue-500 dark:bg-gray-800 dark:text-gray-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${BLOG_AUTHOR.email}`}
              className="rounded-lg bg-gray-100 p-2 text-gray-700 transition-colors hover:text-red-500 dark:bg-gray-800 dark:text-gray-300"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <Link
              href={BLOG_AUTHOR.portfolio}
              className="rounded-lg bg-gray-100 p-2 text-gray-700 transition-colors hover:text-green-500 dark:bg-gray-800 dark:text-gray-300"
              aria-label="Portfolio"
            >
              <Globe className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
