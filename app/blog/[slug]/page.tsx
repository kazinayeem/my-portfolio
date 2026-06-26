import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, RefreshCw } from "lucide-react";
import MainLayout from "@/components/MainLayout";
import { Badge } from "@/components/ui/badge";
import { BlogContentRenderer } from "@/components/blog/BlogContentRenderer";
import BlogTOC from "@/components/blog/BlogTOC";
import BlogShareButtons from "@/components/blog/BlogShareButtons";
import BlogReadingProgress from "@/components/blog/BlogReadingProgress";
import BlogAuthorBox from "@/components/blog/BlogAuthorBox";
import BlogRelatedArticles from "@/components/blog/BlogRelatedArticles";
import BlogPrevNext from "@/components/blog/BlogPrevNext";
import BlogComments from "@/components/blog/BlogComments";
import BlogNewsletter, { BlogCTA } from "@/components/blog/BlogNewsletter";
import { getAllPosts } from "@/lib/blog/posts";
import { BLOG_AUTHOR, INTERNAL_LINKS, SITE_URL } from "@/lib/blog/constants";
import {
  getPostBySlug,
  getRelatedPosts,
  getAdjacentPosts,
  extractHeadings,
  injectHeadingIds,
  getReadingTime,
  getWordCount,
  formatDate,
  getCanonicalUrl,
} from "@/lib/blog/utils";
import { buildPostMetadata, generateArticleJsonLd } from "@/lib/blog/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(getAllPosts(), slug);
  if (!post) return { title: "Article Not Found" };
  return buildPostMetadata(post);
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const allPosts = getAllPosts();
  const post = getPostBySlug(allPosts, slug);

  if (!post) notFound();

  const contentWithIds = injectHeadingIds(post.content);
  const headings = extractHeadings(contentWithIds);
  const readingTime = getReadingTime(post.content);
  const wordCount = getWordCount(post.content);
  const related = getRelatedPosts(allPosts, post);
  const { prev, next } = getAdjacentPosts(allPosts, slug);
  const canonicalUrl = getCanonicalUrl(post.slug);
  const jsonLd = generateArticleJsonLd(post);

  return (
    <MainLayout>
      <BlogReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Hero */}
        <header className="relative">
          <div className="relative h-[40vh] min-h-[320px] w-full sm:h-[50vh]">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
          </div>
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="-mt-32 relative z-10 pb-8">
              <Link
                href="/blog"
                className="mb-6 inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Blog
              </Link>
              <Badge className="mb-4 border-none bg-green-500/90 text-white">
                {post.category}
              </Badge>
              <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              {post.subtitle && (
                <p className="mt-4 text-lg text-gray-300">{post.subtitle}</p>
              )}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <span>{BLOG_AUTHOR.name}</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <RefreshCw className="h-4 w-4" />
                  Updated {formatDate(post.updatedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {readingTime} min read · {wordCount.toLocaleString()} words
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_240px]">
            <div>
              <div className="mb-8">
                <BlogShareButtons title={post.title} url={canonicalUrl} />
              </div>

              <BlogContentRenderer content={contentWithIds} />

              {/* Tags */}
              <div className="mt-10 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* FAQ */}
              {post.faqs.length > 0 && (
                <section className="mt-12" aria-labelledby="faq-heading">
                  <h2
                    id="faq-heading"
                    className="mb-6 text-2xl font-bold text-gray-900 dark:text-white"
                  >
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {post.faqs.map((faq) => (
                      <details
                        key={faq.question}
                        className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900/80"
                      >
                        <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">
                          {faq.question}
                        </summary>
                        <p className="mt-3 text-gray-600 dark:text-gray-400">
                          {faq.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* Internal links */}
              <nav
                className="mt-12 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900/80"
                aria-label="Related site sections"
              >
                <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                  Explore More
                </h2>
                <div className="flex flex-wrap gap-3 text-sm">
                  <Link href={INTERNAL_LINKS.about} className="text-green-600 hover:underline dark:text-green-400">About</Link>
                  <Link href={INTERNAL_LINKS.skills} className="text-green-600 hover:underline dark:text-green-400">Skills</Link>
                  <Link href={INTERNAL_LINKS.projects} className="text-green-600 hover:underline dark:text-green-400">Projects</Link>
                  <Link href={INTERNAL_LINKS.experience} className="text-green-600 hover:underline dark:text-green-400">Experience</Link>
                  <Link href={INTERNAL_LINKS.contact} className="text-green-600 hover:underline dark:text-green-400">Contact</Link>
                  <a href={INTERNAL_LINKS.bornosoft} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline dark:text-green-400">Bornosoft</a>
                  <Link href={INTERNAL_LINKS.portfolio} className="text-green-600 hover:underline dark:text-green-400">Portfolio</Link>
                </div>
              </nav>

              <div className="mt-12">
                <BlogAuthorBox />
              </div>

              <div className="mt-12">
                <BlogComments />
              </div>
            </div>

            <aside className="hidden lg:block">
              <BlogTOC headings={headings} />
            </aside>
          </div>
        </div>

        <BlogRelatedArticles posts={related} />
        <BlogPrevNext prev={prev} next={next} />
        <BlogNewsletter />
        <BlogCTA />
      </article>
    </MainLayout>
  );
}
