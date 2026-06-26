import { createPost } from "../article-builder";

const post = createPost({
  slug: "ai-tools-every-student-developer-should-know",
  title: "AI Tools Every Student Developer Should Know",
  seoTitle: "AI Tools Every Student Developer Should Know | Mohammad Ali Nayeem",
  subtitle: "Curated tools for coding, learning, design, and shipping—from a DIU builder's daily stack",
  description: "Mohammad Ali Nayeem lists AI tools that genuinely help student developers: coding assistants, documentation helpers, image and diagram generators, and responsible usage tips for DIU coursework and Bornosoft work.",
  category: "Artificial Intelligence",
  tags: ["AI Tools","Cursor","ChatGPT","Copilot","Student Developer","Productivity"],
  keywords: ["ai tools for student developers","best ai coding tools 2025","DIU student developer tools","ai productivity programming"],
  publishedAt: "2025-05-08",
  updatedAt: "2025-05-25",
  featured: false,
  popular: true,
  coverImageAlt: "Collage of AI developer tools on a laptop screen in a student workspace",
  content: `<p>When classmates ask what tools actually changed my velocity as a developer, the list is shorter than Twitter hype suggests—but each item earned its place through Bornosoft deadlines and DIU labs. I am <strong>Mohammad Ali Nayeem</strong>, Software Engineering student at <strong>Daffodil International University</strong>, founder of <strong>Bornosoft</strong> in Bangladesh. These are the <strong>AI tools every student developer should know</strong>, how I use them responsibly, and where they fail.</p>

<h2>Ground Rules Before the Tool List</h2>

<p>AI tools amplify habits—good or bad. My rules:</p>

<ol>
<li>Understand every line you commit</li>
<li>Never paste secrets into cloud chats</li>
<li>Disclose AI assistance when syllabi require it</li>
<li>Use AI to learn faster, not to skip fundamentals before exams</li>
</ol>

<div class="callout warning"><strong>Warning:</strong> Submitting generated assignments you cannot explain is academic dishonesty and interview suicide. Tools do not remove accountability.</div>

<h2>Category 1: Codebase-Aware Assistants</h2>

<h3>Cursor</h3>

<p>Cursor indexes repositories for multi-file edits—how I scaffold GitHub Actions, refactor Next.js routes, and debug Terraform plans. Student Pro access (see my separate article) made it sustainable.</p>

<h3>GitHub Copilot</h3>

<p>Excellent inline completions in VS Code. Strong for boilerplate tests and repetitive CRUD. Pair with GitHub Education benefits if eligible.</p>

<table>
<thead><tr><th>Tool</th><th>Strength</th><th>Weakness</th></tr></thead>
<tbody>
<tr><td>Cursor</td><td>Agentic refactors</td><td>Learning curve on rules</td></tr>
<tr><td>Copilot</td><td>Low friction completions</td><td>Less whole-repo context</td></tr>
<tr><td>Codeium</td><td>Free tier generous</td><td>Enterprise features vary</td></tr>
</tbody>
</table>

<div class="callout tip"><strong>Tip:</strong> Commit before large agent refactors. Rollback beats manual undo across twelve files.</div>

<h2>Category 2: Conversational Reasoning</h2>

<h3>ChatGPT / Claude</h3>

<p>I use these for architecture whiteboarding, explaining compiler errors in plain Bangla-English mix for study groups, and drafting API contract proposals before coding. They are weak when hallucinating library APIs—always verify against official docs.</p>

<pre><code class="language-text">Prompt pattern I use:
Context: Express API with Prisma, JWT auth
Goal: Add refresh token rotation securely
Constraints: No third-party auth SaaS, PostgreSQL
Ask: Step-by-step plan + pitfalls, then code snippets</code></pre>

<h2>Category 3: Documentation and Learning</h2>

<ul>
<li><strong>Phind / Perplexity</strong> — quick doc lookups with citations</li>
<li><strong>NotebookLM</strong> — digest long PDFs (papers, syllabi)</li>
<li><strong>DeepWiki / repo chat tools</strong> — onboarding to open source</li>
</ul>

<p>During DIU Operating Systems course, NotebookLM helped me quiz myself on scheduling algorithms from scattered slides.</p>

<h2>Category 4: Vision and ML Assistance</h2>

<p>YOLO projects benefited from:</p>

<ul>
<li>Auto-labeling suggestions (human review mandatory)</li>
<li>Augmentation script generation</li>
<li>Metric interpretation helpers</li>
</ul>

<div class="callout note"><strong>Note:</strong> Auto-labels on Dhaka traffic failed on rickshaw occlusion until we manually corrected 200 frames. AI assists; it does not replace domain labeling.</div>

<h2>Category 5: Design and Communication</h2>

<ul>
<li><strong>Figma AI plugins</strong> — wireframe starting points</li>
<li><strong>Gamma / slides AI</strong> — pitch decks for Bornosoft intros</li>
<li><strong>Grammar tools</strong> — polish client emails</li>
</ul>

<p>Clients judge credibility from communication quality, not only code. AI polish is fine; fabricated case studies are not.</p>

<h2>Category 6: DevOps and Infrastructure</h2>

<p>Generating initial Dockerfile and workflow YAML is safe when you read every line:</p>

<pre><code class="language-dockerfile">FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build</code></pre>

<p>I ask models to explain each Dockerfile layer during study—teaches multistage builds better than copying blindly.</p>

<h2>Category 7: Local and Privacy-Friendly Options</h2>

<ul>
<li><strong>Ollama + CodeLlama / DeepSeek Coder</strong> — offline experiments</li>
<li><strong>Continue.dev</strong> — connect local models to editors</li>
</ul>

<p>Useful when working on unreleased Bornosoft features on spotty dorm internet—or when policies forbid cloud inference.</p>

<h2>Daily Workflow Snapshot</h2>

<ol>
<li>Morning: review GitHub issues, plan with Claude (15 minutes)</li>
<li>Coding: Cursor for implementation and tests</li>
<li>Stuck on error: paste minimal repro, not entire repo with secrets</li>
<li>Docs: Phind for syntax, official docs for truth</li>
<li>Evening: write learning notes in my own words—retention check</li>
</ol>

<h2>Cost Management for Bangladeshi Students</h2>

<ul>
<li>Prioritize education tiers and GitHub Pack</li>
<li>Use free models for drafts, premium for hard refactors</li>
<li>Share team subscriptions only where licenses allow</li>
</ul>

<h2>What AI Tools Cannot Do</h2>

<ul>
<li>Replace data structures viva preparation</li>
<li>Guarantee secure auth without your review</li>
<li>Understand your user's cultural context automatically</li>
<li>Ship production on vibe alone</li>
</ul>

<h2>Building an AI Policy for Group Projects</h2>

<p>DIU team projects should agree upfront:</p>

<ul>
<li>Which tools allowed</li>
<li>How to document AI-generated sections</li>
<li>Review process before merge</li>
</ul>

<h2>Conclusion</h2>

<p>The <strong>AI tools every student developer should know</strong> are not a trophy case of subscriptions—they are a workflow: codebase assistants, conversational planners, doc search, and honest review. I built Bornosoft and my portfolio faster with them, but grades and clients still measure my understanding, not my prompt count.</p>

<p>Start with one coding assistant and one chat model this week. Apply them to a real repo. Measure hours saved. Adjust. Share your stack at <a href="https://kazinayeem.site">kazinayeem.site</a>.</p>`,
  faqs: [
      {
          "question": "Is using AI tools considered cheating at university?",
          "answer": "Policies vary by course. AI for learning and boilerplate is usually fine when disclosed; submitting generated lab reports or exam answers without understanding is not. Always read your syllabus and ask instructors."
      },
      {
          "question": "Which AI tool should I learn first?",
          "answer": "Start with a codebase-aware assistant like Cursor or Copilot on a personal project where mistakes are cheap. Pair it with ChatGPT or Claude for architecture discussions and error explanation."
      },
      {
          "question": "Do AI tools replace learning data structures?",
          "answer": "No. Interviews, vivas, and production debugging still test fundamentals. Use AI to explain algorithms you are studying—not to skip them."
      },
      {
          "question": "How do I avoid leaking secrets to AI tools?",
          "answer": "Never paste production credentials, private client data, or classified research into cloud models. Use .cursorignore, local models, or enterprise tiers with data policies when working on sensitive code."
      }
  ],
  relatedSlugs: ["how-i-got-cursor-pro-free-as-diu-student","my-software-engineering-journey-diu","yolo-object-detection-explained-beginners"],
});

export default post;
