import { createPost } from "../article-builder";

const post = createPost({
  slug: "creating-portfolio-ranks-google",
  title: "Creating a Portfolio That Ranks on Google",
  seoTitle: "Creating a Portfolio That Ranks on Google | Mohammad Ali Nayeem",
  subtitle:
    "SEO, performance, and content strategy I used to make kazinayeem.site discoverable from Bangladesh and beyond",
  description:
    "Mohammad Ali Nayeem explains how he built and optimized his developer portfolio for Google search—technical SEO, Core Web Vitals, structured data, blog content, and lessons from ranking as a DIU student.",
  category: "Tutorials",
  tags: ["SEO", "Portfolio", "Next.js", "Google", "Web Development"],
  keywords: [
    "developer portfolio SEO",
    "portfolio ranks google",
    "nextjs portfolio SEO tutorial",
    "student developer portfolio Bangladesh",
  ],
  publishedAt: "2025-02-14",
  updatedAt: "2025-03-02",
  featured: false,
  popular: true,
  coverImageAlt:
    "Google search results page highlighting a developer portfolio with rich snippets and blog links",
  content: `<p>A portfolio that only your mother bookmarks is a resume PDF with extra steps. When I launched <a href="https://kazinayeem.site">kazinayeem.site</a> as a <strong>Software Engineering student at Daffodil International University (DIU)</strong> and founder of <strong>Bornosoft</strong>, I wanted recruiters, clients, and fellow builders in Bangladesh to find me when they searched for skills I actually possess—not when they already had my LinkedIn URL.</p>

<p><strong>Creating a portfolio that ranks on Google</strong> is part design, part engineering, and part consistent publishing. This tutorial shares the technical SEO, content strategy, and performance work behind my Next.js portfolio—actionable for students who cannot afford an agency retainer.</p>

<h2>SEO Goals for a Developer Portfolio</h2>

<p>Unlike ecommerce, portfolios optimize for:</p>

<ul>
<li><strong>Name queries</strong> — "Mohammad Ali Nayeem developer"</li>
<li><strong>Skill queries</strong> — "Next.js developer Bangladesh", "DIU software engineer portfolio"</li>
<li><strong>Long-tail tutorials</strong> — blog posts that attract organic traffic and demonstrate expertise</li>
<li><strong>Conversion</strong> — contact form, GitHub, Bornosoft inquiries</li>
</ul>

<div class="callout tip"><strong>Tip:</strong> Rank for problems you solve, not vanity keywords like "best developer in the world."</div>

<h2>Technical Foundation: Next.js App Router SEO</h2>

<h3>Metadata API</h3>

<p>Every route exports metadata—title, description, Open Graph, Twitter cards:</p>

<pre><code class="language-typescript">import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mohammad Ali Nayeem | Software Engineer & Bornosoft Founder',
  description:
    'Software Engineering student at DIU, founder of Bornosoft. Portfolio showcasing AI, DevOps, Golang, and full-stack projects from Dhaka, Bangladesh.',
  metadataBase: new URL('https://kazinayeem.site'),
  openGraph: {
    title: 'Mohammad Ali Nayeem',
    description: 'Builder of Bornosoft. AI, DevOps, and full-stack engineering.',
    url: 'https://kazinayeem.site',
    siteName: 'Mohammad Ali Nayeem',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://kazinayeem.site',
  },
};</code></pre>

<p>Blog posts generate dynamic metadata from frontmatter—unique titles and descriptions per article prevent duplicate thin pages.</p>

<h3>Semantic HTML and Heading Hierarchy</h3>

<p>One <code>&lt;h1&gt;</code> per page, logical <code>h2/h3</code> structure, descriptive link text—not "click here." Google parses structure; humans with screen readers benefit too.</p>

<h2>Structured Data (JSON-LD)</h2>

<p>Rich results start with schema.org markup. I embed Person and WebSite schema on the homepage:</p>

<pre><code class="language-typescript">const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mohammad Ali Nayeem',
  url: 'https://kazinayeem.site',
  jobTitle: 'Software Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Bornosoft',
    url: 'https://bornosoftnr.com',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Daffodil International University',
  },
  sameAs: [
    'https://github.com/kazinayeem',
    'https://linkedin.com/in/mohammad-alinayeem',
  ],
};</code></pre>

<p>Blog articles use <code>BlogPosting</code> with <code>datePublished</code>, <code>author</code>, and <code>image</code> fields—eligible for article rich features when Google chooses to show them.</p>

<div class="callout note"><strong>Note:</strong> Validate with Google Rich Results Test after deploy. Schema errors silently waste effort.</div>

<h2>Site Performance and Core Web Vitals</h2>

<p>Google ranks pages that load fast on mobile networks—relevant in Bangladesh where 4G fluctuates.</p>

<table>
<thead><tr><th>Metric</th><th>Target</th><th>My Approach</th></tr></thead>
<tbody>
<tr><td>LCP</td><td>&lt; 2.5s</td><td>Optimized hero image, priority loading</td></tr>
<tr><td>INP</td><td>&lt; 200ms</td><td>Minimal client JS on landing sections</td></tr>
<tr><td>CLS</td><td>&lt; 0.1</td><td>width/height on images, font-display swap</td></tr>
</tbody>
</table>

<h3>Performance Tactics</h3>

<ul>
<li><strong>next/image</strong> with WebP/AVIF formats</li>
<li>Route-level code splitting by default in App Router</li>
<li>Static generation for marketing pages and blog index</li>
<li>Font subsetting—only weights I use</li>
<li>CDN via CloudFront in front of EC2 origin</li>
</ul>

<pre><code class="language-bash"># Measure locally
npm run build
npx lighthouse https://kazinayeem.site --view</code></pre>

<h2>Content Strategy: The Blog Engine</h2>

<p>Static portfolios rank poorly for skill queries. Long-form tutorials rank and prove expertise—this blog exists because of that strategy. Topics I write:</p>

<ol>
<li>Student journey stories (DIU, tools, internships)</li>
<li>Technical tutorials from real Bornosoft work (Docker, CI/CD, Go)</li>
<li>Project retrospectives with metrics and mistakes</li>
</ol>

<p>Each post targets 1200+ words, FAQs for featured snippets, internal links to projects and contact sections.</p>

<div class="callout warning"><strong>Warning:</strong> AI-slop articles without personal experience hurt credibility and may perform poorly after helpful content updates. Write from projects you actually built.</div>

<h2>URL Structure and Sitemaps</h2>

<pre><code class="language-text">https://kazinayeem.site/
https://kazinayeem.site/blog
https://kazinayeem.site/blog/my-first-cicd-pipeline-github-actions</code></pre>

<p>Clean slugs, no date cruft unless you publish daily news. Dynamic <code>sitemap.xml</code> and <code>robots.txt</code> in Next.js include blog routes automatically.</p>

<pre><code class="language-typescript">// app/sitemap.ts pattern
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  return [
    { url: 'https://kazinayeem.site', lastModified: new Date() },
    { url: 'https://kazinayeem.site/blog', lastModified: new Date() },
    ...posts.map((post) => ({
      url: \`https://kazinayeem.site/blog/\${post.slug}\`,
      lastModified: new Date(post.updatedAt),
    })),
  ];
}</code></pre>

<h2>Google Search Console Setup</h2>

<ol>
<li>Verify domain via DNS TXT record</li>
<li>Submit sitemap URL</li>
<li>Monitor indexing coverage and crawl errors</li>
<li>Inspect URLs after major deploys</li>
<li>Track queries driving impressions—double down on what works</li>
</ol>

<p>Search Console showed me unexpected rankings for "Jenkins EC2 setup"—I wrote more DevOps content in response.</p>

<h2>Backlinks and Distribution (Ethical)</h2>

<p>Technical SEO alone is slow without mentions:</p>

<ul>
<li>GitHub profile links to portfolio</li>
<li>LinkedIn articles summarizing blog posts with canonical links</li>
<li>DIU tech club talks—event pages link back</li>
<li>Open-source README credits</li>
<li>Dev.to or Hashnode cross-posts with canonical URL set</li>
</ul>

<p>I avoid buying links or spamming forums—Google penalizes shortcuts.</p>

<h2>Local SEO for Bangladesh</h2>

<p>Mentioning Dhaka, DIU, and Bornosoft naturally in copy helps local intent queries. Google Business Profile matters more for service businesses than personal portfolios, but consistent NAP (name, address, phone) across profiles helps entity understanding.</p>

<h2>Accessibility Helps SEO</h2>

<p>Alt text on images, keyboard navigation, sufficient contrast—accessibility overlaps with SEO signals and interview discussions about inclusive engineering.</p>

<h2>Common Portfolio SEO Mistakes</h2>

<table>
<thead><tr><th>Mistake</th><th>Why It Hurts</th></tr></thead>
<tbody>
<tr><td>Single-page app with no SSR/SSG</td><td>Crawlers see empty shell</td></tr>
<tr><td>Duplicate titles on all routes</td><td>Keyword cannibalization</td></tr>
<tr><td>No blog or infrequent updates</td><td>Thin site, few ranking opportunities</td></tr>
<tr><td>Blocking robots.txt accidentally</td><td>Zero indexing—check deploy scripts</td></tr>
<tr><td>Huge unoptimized hero video</td><td>Terrible LCP on mobile</td></tr>
</tbody>
</table>

<h2>Measuring Success Beyond Rankings</h2>

<p>Organic traffic is a leading indicator. I also track:</p>

<ul>
<li>Contact form submissions citing Google search</li>
<li>Recruiter emails mentioning specific blog posts</li>
<li>Time on site and scroll depth in analytics</li>
<li>GitHub stars from portfolio referral traffic</li>
</ul>

<h2>Maintenance Checklist (Monthly)</h2>

<ol>
<li>Publish or update one technical article</li>
<li>Fix broken links and 404s</li>
<li>Review Search Console performance report</li>
<li>Run Lighthouse on homepage and top blog posts</li>
<li>Update project case studies with new metrics</li>
</ol>

<h2>Open Graph Images and Social Previews</h2>

<p>When blog posts spread on LinkedIn from Dhaka tech circles, ugly link previews kill clicks. I generate OG images per post with consistent branding—name, title snippet, Bornosoft/DIU context:</p>

<pre><code class="language-typescript">export async function generateMetadata({ params }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  return {
    title: post.seoTitle,
    description: post.description,
    openGraph: {
      images: [{ url: post.coverImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [post.coverImage],
    },
  };
}</code></pre>

<p>Social traffic is not vanity—it seeds backlinks when recruiters and conference organizers discover your writing.</p>

<h2>Conclusion</h2>

<p><strong>Creating a portfolio that ranks on Google</strong> is not a one-week meta tag sprint—it is engineered discoverability plus proof of work over months. My Next.js site, structured data, performance discipline, and consistent blogging turned kazinayeem.site from a business card into a search asset that supports Bornosoft and my career from Bangladesh.</p>

<p>Start with metadata and sitemap this weekend. Ship one deep tutorial next week. Submit Search Console and measure for ninety days before declaring SEO "does not work." Compounding content beats algorithm hacks every time.</p>

<p>Building your own portfolio SEO? Connect at <a href="https://kazinayeem.site">kazinayeem.site</a>—I share metrics transparently with fellow DIU builders.</p>`,
  faqs: [
    {
      question: "How long does it take for a new portfolio to rank on Google?",
      answer:
        "Initial indexing can happen within days via Search Console. Meaningful rankings for competitive skill keywords often take 3–6 months of consistent content, technical SEO, and backlinks.",
    },
    {
      question: "Is Next.js good for SEO?",
      answer:
        "Yes, when you use Server Components, static generation, or SSR with proper metadata. Client-only SPAs without pre-rendering rank poorly unless you add prerendering solutions.",
    },
    {
      question: "Do I need a blog to rank as a developer?",
      answer:
        "Not strictly, but long-form technical articles dramatically increase ranking opportunities and trust signals compared to a five-section landing page alone.",
    },
    {
      question: "Should I host on Vercel or EC2 for SEO?",
      answer:
        "Google does not rank based on host choice directly. Fast, reliable HTTPS sites rank better—either platform works if Core Web Vitals pass. I self-host on EC2 for learning and use CDN for speed.",
    },
  ],
  relatedSlugs: [
    "deploying-nextjs-aws-ec2-nginx-pm2",
    "how-i-got-cursor-pro-free-as-diu-student",
    "my-devops-roadmap-software-engineering-student",
  ],
});

export default post;
