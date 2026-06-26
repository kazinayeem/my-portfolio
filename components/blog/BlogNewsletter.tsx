"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { INTERNAL_LINKS } from "@/lib/blog/constants";

export default function BlogNewsletter() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-green-500/10 to-purple-500/10 p-8 text-center dark:border-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Stay Updated
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Get notified about new articles on AI, DevOps, cloud, and software
          engineering. Newsletter coming soon.
        </p>
        <form
          className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Newsletter signup (design only)"
        >
          <input
            type="email"
            placeholder="your@email.com"
            disabled
            className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
            aria-label="Email address"
          />
          <Button type="button" disabled className="bg-green-600 hover:bg-green-700">
            Subscribe Soon
          </Button>
        </form>
      </div>
    </section>
  );
}

export function BlogCTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg dark:border-gray-800 dark:bg-gray-900/80">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Let&apos;s Build Something Together
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
          Explore my projects, skills, and experience — or reach out to discuss
          AI, DevOps, and full-stack development collaborations.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href={INTERNAL_LINKS.projects}>View Projects</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={INTERNAL_LINKS.contact}>Contact Me</Link>
          </Button>
          <Button asChild variant="outline">
            <a href={INTERNAL_LINKS.bornosoft} target="_blank" rel="noopener noreferrer">
              Bornosoft
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
