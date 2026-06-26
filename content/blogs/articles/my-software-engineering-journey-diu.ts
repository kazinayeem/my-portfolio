import { createPost } from "../article-builder";

const post = createPost({
  slug: "my-software-engineering-journey-diu",
  title: "My Software Engineering Journey at DIU",
  seoTitle: "My Software Engineering Journey at DIU | Mohammad Ali Nayeem",
  subtitle: "Practical insights from Mohammad Ali Nayeem, founder of Bornosoft",
  description: "My Software Engineering Journey at DIU — a detailed guide by Mohammad Ali Nayeem, Software Engineering student at DIU and founder of Bornosoft. Real lessons from building projects in Bangladesh.",
  category: "Student Journey",
  tags: ["DIU","Student Journey","Career"],
  keywords: ["My Software Engineering Journey at DIU","Mohammad Ali Nayeem","Bornosoft","Bangladesh","Student Journey"],
  publishedAt: "2025-04-01",
  updatedAt: "2025-06-01",
  featured: false,
  popular: true,
  coverImageAlt: "My Software Engineering Journey at DIU - cover image by Mohammad Ali Nayeem",
  relatedSlugs: [],
  faqs: [
  {
    "question": "Who wrote this article?",
    "answer": "Mohammad Ali Nayeem, founder of Bornosoft, Software Engineer and DIU student."
  },
  {
    "question": "Is this beginner-friendly?",
    "answer": "Yes. Concepts are explained step-by-step with examples from real student projects."
  },
  {
    "question": "Where can I learn more?",
    "answer": "Visit kazinayeem.site for projects, skills, and more articles on AI, DevOps, and software engineering."
  }
],
  content: `<p>This article is part of my engineering journal at kazinayeem.site. I'm Mohammad Ali Nayeem, a Software Engineering student at Daffodil International University and founder of Bornosoft. Here I share practical lessons about my software engineering journey at diu—not textbook theory, but what actually worked (and failed) in my projects.</p>

<h2>Background & Motivation</h2>

<p>When I started exploring student journey, resources were either too shallow or assumed years of experience. I wrote this guide for students and junior developers in Bangladesh who need a clear path from zero to confident.</p>

<h2>Core Concepts</h2>

<p>Understanding fundamentals matters more than chasing buzzwords. Before diving into tools, I mapped the problem space: what am I building, who uses it, what breaks in production, and how do I measure success?</p>

<div class="callout tip"><strong>Tip:</strong> Document your learning in public—blog posts, GitHub repos, and LinkedIn posts compound into career opportunities.</div>

<h2>Step-by-Step Implementation</h2>

<p>I break the workflow into small milestones. Each milestone produces something demoable—a script, a Dockerfile, a pipeline YAML file, or a deployed endpoint. Momentum beats perfection.</p>

<pre><code class="language-bash"># Example workflow snippet
 git checkout -b feature/my
 # implement → test → document
 git commit -m "feat: progress on My Software Engineering Journey at DIU"</code></pre>

<h2>Common Mistakes</h2>

<ul><li>Skipping fundamentals to copy-paste Stack Overflow answers</li><li>Not version-controlling infrastructure and config</li><li>Ignoring security basics (secrets in repos, open ports)</li><li>Deploying without monitoring or rollback plan</li></ul>

<div class="callout warning"><strong>Warning:</strong> Never expose production credentials in client-side code or public repositories. Use environment variables and secret managers.</div>

<h2>Real Project Connection</h2>

<p>At Bornosoft and in my university projects, I applied these ideas under real constraints: limited budget, tight deadlines, and intermittent internet. Constraints force creative engineering.</p>

<h2>Tools & Resources</h2>

<ul><li>Official documentation (always first)</li><li>GitHub repositories with active issues</li><li>Free tiers: AWS, GitHub Actions, Vercel, Colab</li><li>Community: DIU dev clubs, Bangladesh DevOps groups</li></ul>

<h2>FAQ Highlights</h2>

<p>Readers often ask how to balance coursework and side projects. My answer: align projects with course topics when possible—your OS lab, networking assignment, or DBMS project can become portfolio pieces with extra polish.</p>

<h2>Conclusion</h2>

<p>My Software Engineering Journey at DIU is a living topic—I will update this article as I learn more. If you are a student developer in Bangladesh building with Student Journey, connect with me on LinkedIn or explore more articles on kazinayeem.site. Keep building in public.</p>`,
});

export default post;
