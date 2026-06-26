import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog/types";

interface BlogPrevNextProps {
  prev: BlogPost | null;
  next: BlogPost | null;
}

export default function BlogPrevNext({ prev, next }: BlogPrevNextProps) {
  if (!prev && !next) return null;

  return (
    <nav
      className="mx-auto grid max-w-4xl gap-4 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:px-8"
      aria-label="Article navigation"
    >
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group rounded-xl border border-gray-200 p-5 transition-all hover:border-green-500 hover:shadow-md dark:border-gray-800"
        >
          <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <ArrowLeft className="h-3 w-3" /> Previous
          </span>
          <p className="mt-2 font-semibold text-gray-900 group-hover:text-green-600 dark:text-white dark:group-hover:text-green-400">
            {prev.title}
          </p>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group rounded-xl border border-gray-200 p-5 text-right transition-all hover:border-green-500 hover:shadow-md dark:border-gray-800"
        >
          <span className="flex items-center justify-end gap-1 text-xs text-gray-500 dark:text-gray-400">
            Next <ArrowRight className="h-3 w-3" />
          </span>
          <p className="mt-2 font-semibold text-gray-900 group-hover:text-green-600 dark:text-white dark:group-hover:text-green-400">
            {next.title}
          </p>
        </Link>
      ) : null}
    </nav>
  );
}
