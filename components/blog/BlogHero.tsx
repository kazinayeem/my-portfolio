import { BLOG_AUTHOR } from "@/lib/blog/constants";

export default function BlogHero() {
  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-28 text-center sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-green-500/10 via-transparent to-transparent" />
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-600 dark:text-green-400">
        Blog by {BLOG_AUTHOR.name}
      </p>
      <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
        Insights on AI, DevOps, Cloud &amp; Software Engineering
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
        Practical guides, project lessons, and student developer journeys from{" "}
        {BLOG_AUTHOR.name} — Founder of {BLOG_AUTHOR.company}, Software
        Engineer, and DIU student building in public from Bangladesh.
      </p>
    </section>
  );
}
