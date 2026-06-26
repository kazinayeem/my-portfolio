import type { BlogPost } from "./types";
import { BLOG_AUTHOR, SITE_URL } from "./constants";
import {
  getCanonicalUrl,
  getReadingTime,
  getWordCount,
  formatDate,
} from "./utils";

export function generateArticleJsonLd(post: BlogPost) {
  const url = getCanonicalUrl(post.slug);
  const wordCount = getWordCount(post.content);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.seoTitle,
        description: post.description,
        image: [post.coverImage.startsWith("http") ? post.coverImage : `${SITE_URL}${post.coverImage}`],
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        author: {
          "@type": "Person",
          name: BLOG_AUTHOR.name,
          url: BLOG_AUTHOR.portfolio,
          jobTitle: BLOG_AUTHOR.roles,
          worksFor: {
            "@type": "Organization",
            name: BLOG_AUTHOR.company,
            url: "https://bornosoft.com",
          },
        },
        publisher: {
          "@type": "Organization",
          name: BLOG_AUTHOR.company,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/myimage.png`,
          },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        keywords: post.keywords.join(", "),
        articleSection: post.category,
        wordCount,
        timeRequired: `PT${getReadingTime(post.content)}M`,
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${SITE_URL}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: url,
          },
        ],
      },
      ...(post.faqs.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: post.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
      {
        "@type": "Person",
        name: BLOG_AUTHOR.name,
        alternateName: "KaziNayeem",
        jobTitle: BLOG_AUTHOR.roles,
        url: BLOG_AUTHOR.portfolio,
        email: BLOG_AUTHOR.email,
        sameAs: [BLOG_AUTHOR.github, BLOG_AUTHOR.linkedin],
        worksFor: {
          "@type": "Organization",
          name: BLOG_AUTHOR.company,
        },
        knowsAbout: BLOG_AUTHOR.skills,
      },
      {
        "@type": "ImageObject",
        url: post.coverImage.startsWith("http")
          ? post.coverImage
          : `${SITE_URL}${post.coverImage}`,
        caption: post.coverImageAlt,
        width: 1200,
        height: 630,
      },
    ],
  };
}

export function generateBlogListJsonLd(posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Mohammad Ali Nayeem Blog",
    description:
      "Technical articles on AI, DevOps, cloud, robotics, and software engineering by Mohammad Ali Nayeem, founder of Bornosoft.",
    url: `${SITE_URL}/blog`,
    author: {
      "@type": "Person",
      name: BLOG_AUTHOR.name,
      url: BLOG_AUTHOR.portfolio,
    },
    publisher: {
      "@type": "Organization",
      name: BLOG_AUTHOR.company,
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: getCanonicalUrl(post.slug),
      datePublished: post.publishedAt,
      author: { "@type": "Person", name: BLOG_AUTHOR.name },
    })),
  };
}

export function buildPostMetadata(post: BlogPost) {
  const url = getCanonicalUrl(post.slug);
  const image = post.coverImage.startsWith("http")
    ? post.coverImage
    : `${SITE_URL}${post.coverImage}`;

  return {
    title: post.seoTitle,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: BLOG_AUTHOR.name, url: BLOG_AUTHOR.portfolio }],
    creator: BLOG_AUTHOR.name,
    alternates: { canonical: url },
    openGraph: {
      type: "article" as const,
      url,
      title: post.seoTitle,
      description: post.description,
      siteName: "KaziNayeem | Mohammad Ali Nayeem",
      locale: "en_US",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [BLOG_AUTHOR.name],
      tags: post.tags,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: post.seoTitle,
      description: post.description,
      images: [image],
      creator: "@kazinayeem",
    },
    robots: { index: true, follow: true },
    other: {
      "article:published_time": post.publishedAt,
      "article:modified_time": post.updatedAt,
      "article:author": BLOG_AUTHOR.name,
      "article:section": post.category,
    },
  };
}

export function buildBlogHomeMetadata() {
  return {
    title: "Blog | Mohammad Ali Nayeem — AI, DevOps & Software Engineering",
    description:
      "Read in-depth guides on AI, DevOps, cloud, robotics, Next.js, and student developer journeys by Mohammad Ali Nayeem, founder of Bornosoft.",
    keywords: [
      "Mohammad Ali Nayeem blog",
      "KaziNayeem",
      "Bornosoft",
      "DevOps tutorials",
      "AI engineering",
      "Software Engineering Bangladesh",
    ],
    alternates: { canonical: `${SITE_URL}/blog` },
    openGraph: {
      type: "website" as const,
      url: `${SITE_URL}/blog`,
      title: "Blog | Mohammad Ali Nayeem",
      description:
        "Technical articles on AI, DevOps, cloud infrastructure, and full-stack development.",
      images: [{ url: `${SITE_URL}/myimage.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: "Blog | Mohammad Ali Nayeem",
      description: "AI, DevOps, cloud, and software engineering articles.",
      images: [`${SITE_URL}/myimage.png`],
    },
  };
}

export function formatRssDate(date: string): string {
  return new Date(date).toUTCString();
}
