#!/usr/bin/env node
/**
 * One-time generator for static blog article files.
 * Run: node scripts/generate-blog-articles.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../content/blogs/articles");

const AUTHOR = "Mohammad Ali Nayeem";
const COMPANY = "Bornosoft";

function p(...paragraphs) {
  return paragraphs.map((t) => `<p>${t}</p>`).join("\n");
}

function h2(t) {
  return `<h2>${t}</h2>`;
}
function h3(t) {
  return `<h3>${t}</h3>`;
}
function note(t) {
  return `<div class="callout note"><strong>Note:</strong> ${t}</div>`;
}
function tip(t) {
  return `<div class="callout tip"><strong>Tip:</strong> ${t}</div>`;
}
function warn(t) {
  return `<div class="callout warning"><strong>Warning:</strong> ${t}</div>`;
}
function ul(items) {
  return `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
}
function code(lang, body) {
  return `<pre><code class="language-${lang}">${body.replace(/`/g, "\\`")}</code></pre>`;
}

function buildArticle(sections) {
  return sections.join("\n\n") + `\n\n<h2>Conclusion</h2>\n${sections.conclusion || ""}`;
}

function makeContent(intro, bodySections, conclusion) {
  return [intro, ...bodySections, h2("Conclusion"), p(conclusion)].join("\n\n");
}

const articles = [
  {
    slug: "how-i-got-cursor-pro-free-as-diu-student",
    title: "How I Got Cursor Pro Free as a DIU Student",
    seoTitle: "How I Got Cursor Pro Free as a DIU Student | Mohammad Ali Nayeem",
    subtitle: "A practical guide for Bangladeshi students unlocking AI-powered development tools",
    description: "Learn how Mohammad Ali Nayeem, DIU Software Engineering student and Bornosoft founder, accessed Cursor Pro for free and maximized AI-assisted coding as a student developer.",
    category: "Student Journey",
    tags: ["Cursor", "DIU", "Student", "AI Tools", "Career"],
    keywords: ["Cursor Pro free student", "DIU software engineering", "Mohammad Ali Nayeem", "AI coding tools Bangladesh"],
    publishedAt: "2024-08-15",
    updatedAt: "2025-06-01",
    featured: true,
    popular: true,
    relatedSlugs: ["ai-tools-every-student-developer-should-know", "my-software-engineering-journey-diu"],
    faqs: [
      { question: "Can DIU students get Cursor Pro for free?", answer: "Yes, eligible students can apply through Cursor's student program or promotions. Verify your student email and follow the official application process." },
      { question: "Is Cursor worth it for beginners?", answer: "Cursor accelerates learning when you already understand fundamentals. Use it to explain errors, refactor code, and explore unfamiliar APIs—not to skip understanding." },
      { question: "What did you build with Cursor Pro?", answer: "I used it while building Bornosoft products, my portfolio at kazinayeem.site, DevOps automation scripts, and YOLO robotics experiments." },
    ],
    content: makeContent(
      p(`As a Software Engineering student at Daffodil International University (DIU) and founder of ${COMPANY}, I am always looking for tools that multiply my learning without multiplying my costs. Cursor Pro was one of those discoveries—and getting access as a student changed how I ship projects.`),
      [
        h2("Why I Started Looking for Cursor"),
        p(`During my second year at DIU, my workload exploded: coursework, hackathons, Bornosoft client prototypes, and personal experiments in AI and DevOps. I was jumping between VS Code, ChatGPT, and terminal tabs constantly. Cursor merged those workflows into one editor—and that alone saved hours every week.`),
        h2("The Student Access Path"),
        p(`I did not stumble on a random coupon code. I followed the official student pathway: verified my academic email, completed the application honestly, and described how I use AI-assisted development for learning—not cheating on assignments.`),
        tip(`Always use your official university email (@diu.edu.bd) when applying for student developer programs. It dramatically improves approval rates.`),
        h3("What I Included in My Application"),
        ul([
          "My role as founder of Bornosoft and links to real projects",
          "GitHub profile showing consistent open-source learning",
          "A short paragraph on responsible AI use in coursework",
          "Portfolio URL: kazinayeem.site",
        ]),
        h2("How Cursor Pro Changed My Workflow"),
        p(`Before Cursor, debugging a Next.js hydration error could take an entire evening. With Cursor Pro, I could highlight the component, ask for an explanation, and get a fix suggestion with context from my whole repo. That does not replace understanding—but it compresses the search phase.`),
        code("typescript", `// Example: Cursor helped me refactor this fetch pattern\nexport async function getProjects() {\n  const res = await fetch('/api/projects', { next: { revalidate: 3600 } });\n  if (!res.ok) throw new Error('Failed to load projects');\n  return res.json();\n}`),
        h2("Responsible Use as a Student"),
        p(`AI editors are powerful and controversial. My rule: never submit generated code I cannot explain in a viva or code review. I use Cursor to learn patterns, compare approaches, and write boilerplate—then I refactor in my own style.`),
        warn(`Universities are updating academic integrity policies around AI. Always check your course guidelines before using AI tools on graded work.`),
        h2("ROI for Student Founders"),
        p(`For Bornosoft, Cursor Pro paid for itself within the first week. I shipped a landing page, an API integration, and documentation drafts faster than I would have solo. As a student founder in Bangladesh, time is your scarcest resource—tools that give you hours back are strategic investments even when they are free.`),
        h2("Alternatives If You Cannot Get Pro"),
        ul([
          "Cursor free tier with limited fast requests",
          "GitHub Copilot student pack",
          "Continue.dev with your own API keys",
          "Codeium for basic completions",
        ]),
      ],
      `Getting Cursor Pro as a DIU student was not magic—it was a combination of eligibility, a clear application, and a genuine track record of building. If you are a student developer in Bangladesh, invest in your public work first, then apply for every legitimate student program you qualify for. Your future self—and your users—will thank you.`
    ),
  },
  {
    slug: "my-first-machine-learning-project-yolo-robotics",
    title: "My First Machine Learning Project with YOLO & Robotics",
    seoTitle: "My First ML Project: YOLO & Robotics | Mohammad Ali Nayeem",
    subtitle: "From classroom theory to a real Raspberry Pi + camera pipeline",
    description: "Mohammad Ali Nayeem shares how he built his first machine learning project combining YOLO object detection with robotics using Raspberry Pi, OpenCV, and lessons from DIU coursework.",
    category: "Machine Learning",
    tags: ["YOLO", "Robotics", "Raspberry Pi", "Computer Vision", "ML"],
    keywords: ["YOLO robotics project", "machine learning student Bangladesh", "Mohammad Ali Nayeem ML"],
    publishedAt: "2024-09-02",
    updatedAt: "2025-05-20",
    featured: true,
    popular: false,
    relatedSlugs: ["yolo-object-detection-explained-beginners", "my-journey-robotics-raspberry-pi"],
    faqs: [
      { question: "Which YOLO version should beginners use?", answer: "YOLOv8 from Ultralytics is beginner-friendly with great docs, pretrained weights, and easy export options for edge devices." },
      { question: "Do I need a GPU for YOLO?", answer: "Training benefits from a GPU, but you can start with pretrained models on CPU or Google Colab free tier." },
      { question: "Can Raspberry Pi run YOLO?", answer: "Yes, with optimized models (YOLOv8n) and TensorRT or ONNX runtime, though frame rates will be modest." },
    ],
    content: makeContent(
      p(`Machine learning felt abstract until I connected a camera to a motor. My first end-to-end ML project combined YOLO object detection with a simple robotics chassis—and it taught me more than any single lecture at DIU.`),
      [
        h2("Project Goal"),
        p(`I wanted a mobile robot that could detect specific objects (traffic cones and pedestrians) and log detections for a smart road monitoring prototype. This became the foundation for later Bornosoft experiments in computer vision.`),
        h2("Hardware Stack"),
        ul(["Raspberry Pi 4 (4GB RAM)", "Pi Camera Module v2", "Motor driver H-bridge (L298N)", "Chassis kit with DC motors", "Power bank + regulated 5V supply"]),
        h2("Software Pipeline"),
        code("python", `from ultralytics import YOLO\nimport cv2\n\nmodel = YOLO('yolov8n.pt')\ncap = cv2.VideoCapture(0)\n\nwhile True:\n    ret, frame = cap.read()\n    results = model(frame, classes=[0, 9])\n    annotated = results[0].plot()\n    cv2.imshow('YOLO Robotics', annotated)\n    if cv2.waitKey(1) & 0xFF == ord('q'):\n        break`),
        h2("Challenges I Faced"),
        p(`Frame rate on Raspberry Pi was painful at first—2-3 FPS with the default model. I learned about model quantization, smaller input sizes, and running inference every Nth frame while the robot moves on dead reckoning between frames.`),
        note(`Start with pretrained COCO weights before collecting custom data. Validate the pipeline works end-to-end first.`),
        h2("Dataset & Fine-Tuning"),
        p(`For road-specific objects, I captured 200 images around campus and labeled them in Roboflow. Fine-tuning YOLOv8n for 50 epochs on Colab improved mAP noticeably.`),
        h2("Robotics Integration"),
        p(`Detection alone is not robotics. I added simple state machine logic: if a cone is centered in frame, stop; if offset left, turn left. This naive approach was enough for demos and taught me the gap between demo and production.`),
        h2("What I Would Do Differently"),
        ul(["Log telemetry from day one (FPS, inference ms, battery voltage)", "Use ROS 2 earlier for cleaner sensor abstraction", "Build a proper calibration routine for camera mount angle"]),
      ],
      `My first YOLO + robotics project was messy, slow, and unforgettable. It bridged AI theory and physical systems—and pushed me toward DevOps and MLOps so I could deploy models reliably, not just train them in notebooks.`
    ),
  },
  {
    slug: "from-nodejs-to-golang-learning-journey",
    title: "From Node.js to Golang: My Learning Journey",
    seoTitle: "From Node.js to Golang: A Student Developer's Journey",
    subtitle: "Why I picked up Go after years of JavaScript—and what surprised me",
    description: "Mohammad Ali Nayeem explains his transition from Node.js to Golang for backend services at Bornosoft, with practical comparisons, code samples, and student-friendly learning resources.",
    category: "Golang",
    tags: ["Golang", "Node.js", "Backend", "Programming"],
    keywords: ["Node.js to Golang", "Golang backend Bangladesh", "Mohammad Ali Nayeem Golang"],
    publishedAt: "2024-09-18",
    updatedAt: "2025-05-15",
    featured: true,
    popular: true,
    relatedSlugs: ["why-i-chose-golang-backend-development", "building-rest-apis-nodejs"],
    faqs: [
      { question: "Should beginners learn Go or Node.js first?", answer: "Node.js is easier if you already know JavaScript from frontend work. Go is excellent once you understand HTTP, databases, and concurrency basics." },
      { question: "Is Go faster than Node.js?", answer: "For CPU-bound and highly concurrent workloads, Go typically wins. Node.js remains excellent for I/O-heavy APIs and rapid prototyping." },
      { question: "How long to become productive in Go?", answer: "With backend experience, expect 2-4 weeks for basic productivity and 2-3 months for idiomatic Go including testing and packaging." },
    ],
    content: makeContent(
      p(`JavaScript carried me through my first APIs, Bornosoft MVPs, and hackathon demos. But as services grew, I reached for Golang—and the learning curve rewarded patience.`),
      [
        h2("Why I Outgrew Node for Some Services"),
        p(`Node.js excels at JSON APIs and ecosystem velocity. I hit friction on CPU-heavy image processing workers, strict memory budgets on small EC2 instances, and debugging production concurrency edge cases.`),
        h2("First Impressions of Go"),
        ul(["Explicit error handling felt verbose—then clarifying", "Goroutines made concurrent workers readable", "Single binary deployment simplified my EC2 releases", "Smaller Docker images cut pull times"]),
        h2("Side-by-Side: Hello API"),
        code("javascript", `// Node.js + Express\napp.get('/health', (req, res) => {\n  res.json({ status: 'ok' });\n});`),
        code("go", `// Go + net/http\nfunc health(w http.ResponseWriter, r *http.Request) {\n    json.NewEncoder(w).Encode(map[string]string{"status": "ok"})\n}`),
        h2("Learning Path That Worked"),
        p(`I followed Tour of Go, built a URL shortener, rewrote a Bornosoft webhook worker in Go, and added table-driven tests. Reading standard library source taught idioms better than any blog.`),
        tip(`Port a small Node service you already understand instead of starting with microservices.`),
        h2("When I Still Choose Node"),
        p(`Next.js full-stack routes, rapid CRUD prototypes, and anything needing npm's ecosystem still live in TypeScript. Polyglot backends are normal—pick the tool per workload.`),
      ],
      `Moving from Node.js to Golang was not abandoning JavaScript—it was expanding my toolkit as an engineer and founder. Both languages now serve different Bornosoft services, and that flexibility is the real win.`
    ),
  },
];

// Generate remaining articles with rich template content
const moreArticles = [
  ["ecs-vs-eks-vs-ecr-explained-beginners", "ECS vs EKS vs ECR Explained for Beginners", "AWS", "2024-10-01", true, ["AWS", "Cloud", "Containers"]],
  ["my-first-cicd-pipeline-github-actions", "My First CI/CD Pipeline Using GitHub Actions", "GitHub Actions", "2024-10-12", true, ["CI/CD", "GitHub", "DevOps"]],
  ["jenkins-master-agent-setup-aws-ec2", "Building a Jenkins Master-Agent Setup on AWS EC2", "Jenkins", "2024-10-25", false, ["Jenkins", "AWS", "CI/CD"]],
  ["my-devops-roadmap-software-engineering-student", "My DevOps Roadmap as a Software Engineering Student", "DevOps", "2024-11-05", true, ["DevOps", "Roadmap", "Student"]],
  ["learning-docker-from-scratch", "Learning Docker from Scratch", "Docker", "2024-11-18", true, ["Docker", "Containers", "Tutorial"]],
  ["kubernetes-explained-simply", "Kubernetes Explained Simply", "Kubernetes", "2024-12-01", false, ["Kubernetes", "K8s", "Cloud"]],
  ["deploying-nextjs-aws-ec2-nginx-pm2", "Deploying Next.js on AWS EC2 with Nginx & PM2", "Next.js", "2024-12-10", true, ["Next.js", "AWS", "Deployment"]],
  ["why-i-chose-golang-backend-development", "Why I Chose Golang for Backend Development", "Golang", "2024-12-20", false, ["Golang", "Backend", "Architecture"]],
  ["lessons-learned-building-saas-products", "Lessons Learned While Building SaaS Products", "Software Engineering", "2025-01-05", true, ["SaaS", "Startup", "Bornosoft"]],
  ["creating-portfolio-ranks-google", "Creating a Portfolio That Ranks on Google", "Tutorials", "2025-01-15", true, ["SEO", "Portfolio", "Next.js"]],
  ["my-journey-robotics-raspberry-pi", "My Journey into Robotics with Raspberry Pi", "Raspberry Pi", "2025-01-28", false, ["Robotics", "Raspberry Pi", "IoT"]],
  ["yolo-object-detection-explained-beginners", "YOLO Object Detection Explained for Beginners", "YOLO", "2025-02-05", true, ["YOLO", "Computer Vision", "AI"]],
  ["how-i-built-smart-road-monitoring-system", "How I Built My Smart Road Monitoring System", "Project Showcase", "2025-02-18", true, ["IoT", "Computer Vision", "Project"]],
  ["complete-guide-github-actions", "Complete Guide to GitHub Actions", "GitHub Actions", "2025-03-01", false, ["GitHub Actions", "CI/CD", "Guide"]],
  ["building-rest-apis-nodejs", "Building REST APIs with Node.js", "Node.js", "2025-03-12", true, ["Node.js", "REST API", "Backend"]],
  ["ai-tools-every-student-developer-should-know", "AI Tools Every Student Developer Should Know", "Artificial Intelligence", "2025-03-22", true, ["AI Tools", "Student", "Productivity"]],
  ["my-software-engineering-journey-diu", "My Software Engineering Journey at DIU", "Student Journey", "2025-04-01", true, ["DIU", "Student Journey", "Career"]],
  ["react-vs-nextjs", "React vs Next.js: Which Should You Learn?", "React", "2025-04-12", false, ["React", "Next.js", "Frontend"]],
  ["docker-vs-virtual-machines", "Docker vs Virtual Machines", "Docker", "2025-04-22", true, ["Docker", "VM", "DevOps"]],
  ["terraform-basics-beginners", "Terraform Basics for Beginners", "Terraform", "2025-05-01", false, ["Terraform", "IaC", "AWS"]],
  ["building-production-ready-full-stack-applications", "Building Production-Ready Full Stack Applications", "Software Engineering", "2025-05-12", true, ["Full Stack", "Production", "Best Practices"]],
  ["my-future-roadmap-ai-devops-cloud", "My Future Roadmap: AI + DevOps + Cloud", "Cloud Computing", "2025-05-25", true, ["Roadmap", "AI", "DevOps", "Cloud"]],
];

for (const [slug, title, category, date, popular, tags] of moreArticles) {
  const seoTitle = `${title} | Mohammad Ali Nayeem`;
  articles.push({
    slug,
    title,
    seoTitle,
    subtitle: `Practical insights from ${AUTHOR}, founder of ${COMPANY}`,
    description: `${title} — a detailed guide by ${AUTHOR}, Software Engineering student at DIU and founder of Bornosoft. Real lessons from building projects in Bangladesh.`,
    category,
    tags,
    keywords: [title, AUTHOR, "Bornosoft", "Bangladesh", category],
    publishedAt: date,
    updatedAt: "2025-06-01",
    featured: false,
    popular,
    relatedSlugs: [],
    faqs: [
      { question: `Who wrote this article?`, answer: `${AUTHOR}, founder of ${COMPANY}, Software Engineer and DIU student.` },
      { question: `Is this beginner-friendly?`, answer: `Yes. Concepts are explained step-by-step with examples from real student projects.` },
      { question: `Where can I learn more?`, answer: `Visit kazinayeem.site for projects, skills, and more articles on AI, DevOps, and software engineering.` },
    ],
    content: makeContent(
      p(`This article is part of my engineering journal at kazinayeem.site. I'm ${AUTHOR}, a Software Engineering student at Daffodil International University and founder of ${COMPANY}. Here I share practical lessons about ${title.toLowerCase()}—not textbook theory, but what actually worked (and failed) in my projects.`),
      [
        h2("Background & Motivation"),
        p(`When I started exploring ${category.toLowerCase()}, resources were either too shallow or assumed years of experience. I wrote this guide for students and junior developers in Bangladesh who need a clear path from zero to confident.`),
        h2("Core Concepts"),
        p(`Understanding fundamentals matters more than chasing buzzwords. Before diving into tools, I mapped the problem space: what am I building, who uses it, what breaks in production, and how do I measure success?`),
        tip(`Document your learning in public—blog posts, GitHub repos, and LinkedIn posts compound into career opportunities.`),
        h2("Step-by-Step Implementation"),
        p(`I break the workflow into small milestones. Each milestone produces something demoable—a script, a Dockerfile, a pipeline YAML file, or a deployed endpoint. Momentum beats perfection.`),
        code("bash", `# Example workflow snippet\n git checkout -b feature/${slug.split("-")[0]}\n # implement → test → document\n git commit -m "feat: progress on ${title}"`),
        h2("Common Mistakes"),
        ul([
          "Skipping fundamentals to copy-paste Stack Overflow answers",
          "Not version-controlling infrastructure and config",
          "Ignoring security basics (secrets in repos, open ports)",
          "Deploying without monitoring or rollback plan",
        ]),
        warn(`Never expose production credentials in client-side code or public repositories. Use environment variables and secret managers.`),
        h2("Real Project Connection"),
        p(`At Bornosoft and in my university projects, I applied these ideas under real constraints: limited budget, tight deadlines, and intermittent internet. Constraints force creative engineering.`),
        h2("Tools & Resources"),
        ul([
          "Official documentation (always first)",
          "GitHub repositories with active issues",
          "Free tiers: AWS, GitHub Actions, Vercel, Colab",
          "Community: DIU dev clubs, Bangladesh DevOps groups",
        ]),
        h2("FAQ Highlights"),
        p(`Readers often ask how to balance coursework and side projects. My answer: align projects with course topics when possible—your OS lab, networking assignment, or DBMS project can become portfolio pieces with extra polish.`),
      ],
      `${title} is a living topic—I will update this article as I learn more. If you are a student developer in Bangladesh building with ${category}, connect with me on LinkedIn or explore more articles on kazinayeem.site. Keep building in public.`
    ),
  });
}

// Mark first 5 as featured
articles.slice(0, 5).forEach((a) => (a.featured = true));

function escapeForTs(str) {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

function writeArticle(article) {
  const faqsStr = JSON.stringify(article.faqs, null, 2);
  const tagsStr = JSON.stringify(article.tags);
  const keywordsStr = JSON.stringify(article.keywords);
  const relatedStr = JSON.stringify(article.relatedSlugs || []);

  const file = `import { createPost } from "../article-builder";

const post = createPost({
  slug: "${article.slug}",
  title: ${JSON.stringify(article.title)},
  seoTitle: ${JSON.stringify(article.seoTitle)},
  subtitle: ${JSON.stringify(article.subtitle)},
  description: ${JSON.stringify(article.description)},
  category: ${JSON.stringify(article.category)},
  tags: ${tagsStr},
  keywords: ${keywordsStr},
  publishedAt: "${article.publishedAt}",
  updatedAt: "${article.updatedAt}",
  featured: ${article.featured},
  popular: ${article.popular},
  coverImageAlt: ${JSON.stringify(article.title + " - cover image by Mohammad Ali Nayeem")},
  relatedSlugs: ${relatedStr},
  faqs: ${faqsStr},
  content: \`${escapeForTs(article.content)}\`,
});

export default post;
`;
  fs.writeFileSync(path.join(OUT, `${article.slug}.ts`), file, "utf8");
}

fs.mkdirSync(OUT, { recursive: true });
articles.forEach(writeArticle);

// Write index
const imports = articles.map((a, i) => `import post${i} from "./articles/${a.slug}";`).join("\n");
const exports = articles.map((_, i) => `post${i}`).join(", ");
const index = `${imports}

import type { BlogPost } from "@/lib/blog/types";

export const allBlogPosts: BlogPost[] = [${exports}];

export default allBlogPosts;
`;
fs.writeFileSync(path.join(__dirname, "../content/blogs/index.ts"), index, "utf8");
console.log(`Generated ${articles.length} articles`);
