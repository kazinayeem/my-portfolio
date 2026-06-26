export default function BlogComments() {
  return (
    <section
      className="mx-auto max-w-4xl rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-900/50"
      aria-label="Comments section"
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Comments
      </h2>
      <p className="mt-3 text-gray-600 dark:text-gray-400">
        Comments are coming soon. For now, feel free to reach out on{" "}
        <a
          href="https://linkedin.com/in/mohammad-alinayeem"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:underline dark:text-green-400"
        >
          LinkedIn
        </a>{" "}
        or{" "}
        <a
          href="https://github.com/kazinayeem"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:underline dark:text-green-400"
        >
          GitHub
        </a>
        .
      </p>
      <div className="mx-auto mt-6 max-w-lg space-y-3 opacity-50">
        <div className="h-10 rounded-md bg-gray-200 dark:bg-gray-800" />
        <div className="h-24 rounded-md bg-gray-200 dark:bg-gray-800" />
        <div className="h-10 w-32 rounded-md bg-green-500/30" />
      </div>
    </section>
  );
}
