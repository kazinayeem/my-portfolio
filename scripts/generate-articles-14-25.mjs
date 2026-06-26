#!/usr/bin/env node
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import {
  ARTICLE_14,
  ARTICLE_15,
  ARTICLE_16,
  ARTICLE_17,
  ARTICLE_18,
  ARTICLE_19,
  ARTICLE_20,
  ARTICLE_21,
  ARTICLE_22,
  ARTICLE_23,
  ARTICLE_24,
  ARTICLE_25,
} from "./article-bodies-14-25.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "../content/blogs/articles");
mkdirSync(OUT_DIR, { recursive: true });

const ARTICLES = [
  {
    file: "my-journey-robotics-raspberry-pi.ts",
    publishedAt: "2025-02-28",
    updatedAt: "2025-03-15",
    featured: false,
    popular: false,
    content: ARTICLE_14,
    meta: {
      slug: "my-journey-robotics-raspberry-pi",
      title: "My Journey Into Robotics with Raspberry Pi",
      seoTitle: "My Journey Into Robotics with Raspberry Pi | Mohammad Ali Nayeem",
      subtitle:
        "How a DIU Software Engineering student turned a credit-card computer into a robotics lab",
      description:
        "Mohammad Ali Nayeem, DIU Software Engineering student and founder of Bornosoft, shares his hands-on journey learning robotics with Raspberry Pi—from first GPIO blink to camera-driven projects in Bangladesh.",
      category: "Raspberry Pi",
      tags: ["Raspberry Pi", "Robotics", "GPIO", "DIU", "Bangladesh", "IoT"],
      keywords: [
        "raspberry pi robotics beginner",
        "DIU robotics project",
        "raspberry pi bangladesh student",
        "GPIO python tutorial",
      ],
      coverImageAlt:
        "Raspberry Pi board connected to sensors and a small robot chassis on a student desk",
      relatedSlugs: [
        "yolo-object-detection-explained-beginners",
        "how-i-built-smart-road-monitoring-system",
        "my-software-engineering-journey-diu",
      ],
      faqs: [
        {
          question: "Which Raspberry Pi model is best for robotics beginners?",
          answer:
            "A Raspberry Pi 4 with 4GB RAM is the sweet spot for most student robotics projects. It handles camera streams, Python control loops, and light inference without constant swapping. Pi 5 is faster but costs more in Dhaka markets.",
        },
        {
          question: "Do I need soldering skills to start?",
          answer:
            "No. Start with a breadboard, jumper wires, and modules that expose pin headers. Soldering becomes useful when you design custom motor driver boards or permanent installations.",
        },
        {
          question: "Can Raspberry Pi run YOLO for robotics?",
          answer:
            "Yes, with realistic expectations. Lightweight YOLO variants and TensorFlow Lite models run on Pi 4/5 for moderate frame rates. Heavy training still belongs on a laptop or cloud GPU.",
        },
        {
          question: "What power supply mistakes should I avoid?",
          answer:
            "Underrated USB-C adapters cause brownouts that corrupt SD cards mid-demo. Use a dedicated 5V 3A supply, separate motor power from logic power, and add capacitors on motor rails when possible.",
        },
      ],
    },
  },
  {
    file: "yolo-object-detection-explained-beginners.ts",
    publishedAt: "2025-03-14",
    updatedAt: "2025-04-01",
    featured: false,
    popular: true,
    content: ARTICLE_15,
    meta: {
      slug: "yolo-object-detection-explained-beginners",
      title: "YOLO Object Detection Explained for Beginners",
      seoTitle: "YOLO Object Detection Explained for Beginners | Mohammad Ali Nayeem",
      subtitle: "A clear introduction to You Only Look Once—from theory to your first inference script",
      description:
        "Software Engineering student Mohammad Ali Nayeem breaks down YOLO object detection for beginners: architecture intuition, dataset labeling, training tips, and deployment lessons from Bornosoft and DIU projects.",
      category: "YOLO",
      tags: ["YOLO", "Computer Vision", "Object Detection", "Ultralytics", "Python", "Deep Learning"],
      keywords: [
        "yolo object detection tutorial",
        "yolo beginners guide",
        "ultralytics yolo training",
        "computer vision student project",
      ],
      coverImageAlt:
        "Bounding boxes drawn around vehicles and pedestrians in a street scene YOLO demo",
      relatedSlugs: [
        "my-journey-robotics-raspberry-pi",
        "how-i-built-smart-road-monitoring-system",
        "ai-tools-every-student-developer-should-know",
      ],
      faqs: [
        {
          question: "What does YOLO stand for?",
          answer:
            "YOLO means You Only Look Once. Unlike older detectors that scanned images in multiple passes, YOLO predicts bounding boxes and class probabilities in a single forward pass—making it fast enough for video.",
        },
        {
          question: "YOLOv8 vs YOLOv5—which should students use?",
          answer:
            "Ultralytics maintains YOLOv8 and newer versions with excellent docs and CLI tools. If your course materials reference v5, both teach the same concepts. Pick one ecosystem and stay consistent for your semester project.",
        },
        {
          question: "How many labeled images do I need?",
          answer:
            "For a class demo with three object classes, aim for 200–500 images per class with varied lighting and angles. Real deployments need more diversity, especially for Bangladesh traffic and weather conditions.",
        },
        {
          question: "Can I train YOLO on a laptop without a GPU?",
          answer:
            "Technically yes, but training will be painfully slow. Use Google Colab free GPU tiers, Kaggle notebooks, or university lab machines. Reserve local CPU training for tiny sanity-check datasets.",
        },
      ],
    },
  },
  {
    file: "how-i-built-smart-road-monitoring-system.ts",
    publishedAt: "2025-03-30",
    updatedAt: "2025-04-18",
    featured: false,
    popular: false,
    content: ARTICLE_16,
    meta: {
      slug: "how-i-built-smart-road-monitoring-system",
      title: "How I Built a Smart Road Monitoring System",
      seoTitle: "How I Built a Smart Road Monitoring System | Mohammad Ali Nayeem",
      subtitle: "Architecture, challenges, and lessons from a computer-vision capstone-style project",
      description:
        "Mohammad Ali Nayeem documents how he built a smart road monitoring system using cameras, YOLO inference, and a Node.js backend—covering dataset work, edge deployment, and real-world constraints in Dhaka.",
      category: "Project Showcase",
      tags: ["Computer Vision", "YOLO", "IoT", "Node.js", "Project", "Smart City"],
      keywords: [
        "smart road monitoring system",
        "traffic monitoring yolo",
        "computer vision bangladesh",
        "DIU software engineering project",
      ],
      coverImageAlt: "Dashboard showing live road camera feeds with vehicle detection overlays",
      relatedSlugs: [
        "yolo-object-detection-explained-beginners",
        "building-rest-apis-nodejs",
        "my-journey-robotics-raspberry-pi",
      ],
      faqs: [
        {
          question: "What hardware did the road monitoring system use?",
          answer:
            "The prototype combined IP cameras or USB cameras on edge devices (Raspberry Pi or a small x86 box), with optional GPU acceleration on a central server for heavier models during development.",
        },
        {
          question: "How did you handle poor lighting and rain?",
          answer:
            "We augmented training data with brightness shifts, blur, and rain overlays. Physically, angled camera housings and periodic lens cleaning mattered more than any algorithm tweak during monsoon weeks.",
        },
        {
          question: "Was the system real-time?",
          answer:
            "Edge inference targeted 8–15 FPS depending on resolution and model size. The dashboard polled aggregated events rather than raw frames to keep bandwidth reasonable on campus networks.",
        },
        {
          question: "What would you do differently next time?",
          answer:
            "Invest earlier in a proper annotation workflow, version datasets like code, and design the API for event streams (WebSockets or MQTT) instead of bolting them on after the demo worked.",
        },
      ],
    },
  },
  {
    file: "complete-guide-github-actions.ts",
    publishedAt: "2025-04-12",
    updatedAt: "2025-05-02",
    featured: false,
    popular: true,
    content: ARTICLE_17,
    meta: {
      slug: "complete-guide-github-actions",
      title: "Complete Guide to GitHub Actions for Students",
      seoTitle: "Complete Guide to GitHub Actions | Mohammad Ali Nayeem",
      subtitle: "CI/CD workflows that take your portfolio and Bornosoft repos from commit to deploy",
      description:
        "A practical GitHub Actions guide by DIU student Mohammad Ali Nayeem: workflow syntax, testing pipelines, Docker builds, deployment secrets, and patterns used across portfolio and Bornosoft projects.",
      category: "GitHub Actions",
      tags: ["GitHub Actions", "CI/CD", "DevOps", "Automation", "Docker", "Testing"],
      keywords: [
        "github actions tutorial",
        "github actions ci cd guide",
        "github actions nodejs deploy",
        "student devops pipeline",
      ],
      coverImageAlt: "GitHub Actions workflow diagram showing build test and deploy jobs",
      relatedSlugs: [
        "building-rest-apis-nodejs",
        "docker-vs-virtual-machines",
        "building-production-ready-full-stack-applications",
      ],
      faqs: [
        {
          question: "Are GitHub Actions free for students?",
          answer:
            "Public repositories get generous free minutes. Private repos have monthly limits on free accounts; GitHub Education perks may increase allowances. Monitor usage in repository settings.",
        },
        {
          question: "Should I run tests on every push?",
          answer:
            "Yes for main branches and pull requests. Use path filters or workflow_dispatch for expensive jobs like full E2E suites so you do not burn minutes on README edits.",
        },
        {
          question: "How do I store API keys in Actions?",
          answer:
            "Use GitHub Secrets and Environment secrets—never commit .env files. Reference them in workflows as ${{ secrets.MY_KEY }} and restrict environment protection rules on production.",
        },
        {
          question: "Actions vs Jenkins for learning?",
          answer:
            "Start with Actions for portfolio velocity—it lives next to your code. Learn Jenkins when you need on-prem agents or complex enterprise pipelines; many concepts transfer directly.",
        },
      ],
    },
  },
  {
    file: "building-rest-apis-nodejs.ts",
    publishedAt: "2025-04-28",
    updatedAt: "2025-05-12",
    featured: false,
    popular: false,
    content: ARTICLE_18,
    meta: {
      slug: "building-rest-apis-nodejs",
      title: "Building REST APIs with Node.js: A Practical Guide",
      seoTitle: "Building REST APIs with Node.js | Mohammad Ali Nayeem",
      subtitle: "Express patterns, validation, auth, and structure that survive beyond homework",
      description:
        "Mohammad Ali Nayeem shares how he builds production-minded REST APIs with Node.js and Express—routing, middleware, error handling, Prisma, and deployment lessons from Bornosoft backends.",
      category: "Node.js",
      tags: ["Node.js", "Express", "REST API", "TypeScript", "Prisma", "Backend"],
      keywords: [
        "nodejs rest api tutorial",
        "express api best practices",
        "nodejs backend bangladesh",
        "rest api student guide",
      ],
      coverImageAlt: "API request flow diagram from client to Express server and database",
      relatedSlugs: [
        "complete-guide-github-actions",
        "building-production-ready-full-stack-applications",
        "react-vs-nextjs",
      ],
      faqs: [
        {
          question: "Express or Fastify for new APIs?",
          answer:
            "Express has the largest tutorial ecosystem—ideal for coursework and interviews. Fastify offers better performance and schema validation. I use Express for client MVPs and Fastify when latency matters.",
        },
        {
          question: "Should student APIs use TypeScript?",
          answer:
            "Yes, if you already know JavaScript basics. Types catch contract bugs between frontend and backend early. The setup cost pays off on any project longer than a weekend hackathon.",
        },
        {
          question: "How do I structure routes and controllers?",
          answer:
            "Group by domain (/users, /posts), keep controllers thin, push business logic to services, and centralize error handling middleware. Avoid one giant app.js file by week three.",
        },
        {
          question: "What about API documentation?",
          answer:
            "OpenAPI (Swagger) generated from Zod or route schemas saves viva demos and client handoffs. Automate it in CI so docs never drift from implementation.",
        },
      ],
    },
  },
  {
    file: "ai-tools-every-student-developer-should-know.ts",
    publishedAt: "2025-05-08",
    updatedAt: "2025-05-25",
    featured: false,
    popular: true,
    content: ARTICLE_19,
    meta: {
      slug: "ai-tools-every-student-developer-should-know",
      title: "AI Tools Every Student Developer Should Know",
      seoTitle: "AI Tools Every Student Developer Should Know | Mohammad Ali Nayeem",
      subtitle: "Curated tools for coding, learning, design, and shipping—from a DIU builder's daily stack",
      description:
        "Mohammad Ali Nayeem lists AI tools that genuinely help student developers: coding assistants, documentation helpers, image and diagram generators, and responsible usage tips for DIU coursework and Bornosoft work.",
      category: "Artificial Intelligence",
      tags: ["AI Tools", "Cursor", "ChatGPT", "Copilot", "Student Developer", "Productivity"],
      keywords: [
        "ai tools for student developers",
        "best ai coding tools 2025",
        "DIU student developer tools",
        "ai productivity programming",
      ],
      coverImageAlt: "Collage of AI developer tools on a laptop screen in a student workspace",
      relatedSlugs: [
        "how-i-got-cursor-pro-free-as-diu-student",
        "my-software-engineering-journey-diu",
        "yolo-object-detection-explained-beginners",
      ],
      faqs: [
        {
          question: "Is using AI tools considered cheating at university?",
          answer:
            "Policies vary by course. AI for learning and boilerplate is usually fine when disclosed; submitting generated lab reports or exam answers without understanding is not. Always read your syllabus and ask instructors.",
        },
        {
          question: "Which AI tool should I learn first?",
          answer:
            "Start with a codebase-aware assistant like Cursor or Copilot on a personal project where mistakes are cheap. Pair it with ChatGPT or Claude for architecture discussions and error explanation.",
        },
        {
          question: "Do AI tools replace learning data structures?",
          answer:
            "No. Interviews, vivas, and production debugging still test fundamentals. Use AI to explain algorithms you are studying—not to skip them.",
        },
        {
          question: "How do I avoid leaking secrets to AI tools?",
          answer:
            "Never paste production credentials, private client data, or classified research into cloud models. Use .cursorignore, local models, or enterprise tiers with data policies when working on sensitive code.",
        },
      ],
    },
  },
  {
    file: "my-software-engineering-journey-diu.ts",
    publishedAt: "2025-05-18",
    updatedAt: "2025-06-01",
    featured: false,
    popular: false,
    content: ARTICLE_20,
    meta: {
      slug: "my-software-engineering-journey-diu",
      title: "My Software Engineering Journey at DIU",
      seoTitle: "My Software Engineering Journey at DIU | Mohammad Ali Nayeem",
      subtitle: "Semesters, side projects, Bornosoft, and lessons from Daffodil International University",
      description:
        "Mohammad Ali Nayeem reflects on studying Software Engineering at Daffodil International University—balancing academics, founding Bornosoft, robotics, DevOps labs, and advice for incoming DIU developers.",
      category: "Student Journey",
      tags: ["DIU", "Software Engineering", "Student Journey", "Bornosoft", "Career", "Bangladesh"],
      keywords: [
        "DIU software engineering journey",
        "daffodil international university cs",
        "bangladesh software engineering student",
        "DIU programming tips",
      ],
      coverImageAlt: "DIU campus study session with laptop showing code and engineering textbooks",
      relatedSlugs: [
        "how-i-got-cursor-pro-free-as-diu-student",
        "ai-tools-every-student-developer-should-know",
        "my-future-roadmap-ai-devops-cloud",
      ],
      faqs: [
        {
          question: "What should first-year DIU SE students focus on?",
          answer:
            "Master programming fundamentals, Git, and problem-solving before chasing every framework trend. Build one small project per month—even a CLI tool counts more than ten unfinished tutorials.",
        },
        {
          question: "How did you balance Bornosoft with coursework?",
          answer:
            "I time-boxed startup work after assignments, reused course projects when topics aligned (networking, DB, OS), and said no to scope creep during exam weeks. Sustainable pace beats burnout heroics.",
        },
        {
          question: "Are internships accessible from DIU?",
          answer:
            "Yes, through department notices, LinkedIn, local startups, and remote roles. A public portfolio with deployed projects and clear README files opens more doors than GPA alone.",
        },
        {
          question: "What electives or clubs helped most?",
          answer:
            "Anything hands-on—robotics club, hackathons, open-source contributions, and DevOps labs where you touch Linux servers beat pure theory-only semesters for job readiness.",
        },
      ],
    },
  },
  {
    file: "react-vs-nextjs.ts",
    publishedAt: "2025-05-22",
    updatedAt: "2025-06-05",
    featured: false,
    popular: true,
    content: ARTICLE_21,
    meta: {
      slug: "react-vs-nextjs",
      title: "React vs Next.js: Which Should You Learn First?",
      seoTitle: "React vs Next.js: Which Should You Learn First? | Mohammad Ali Nayeem",
      subtitle: "A student-friendly comparison for portfolio sites, SPAs, and Bornosoft client apps",
      description:
        "Mohammad Ali Nayeem compares React and Next.js for student developers: rendering models, routing, SEO, deployment, and when each framework fits DIU projects and professional work.",
      category: "React",
      tags: ["React", "Next.js", "Frontend", "SSR", "Web Development", "TypeScript"],
      keywords: [
        "react vs nextjs",
        "learn react or nextjs first",
        "nextjs for students",
        "react portfolio tutorial",
      ],
      coverImageAlt: "Split screen comparing React SPA architecture and Next.js full-stack diagram",
      relatedSlugs: [
        "building-production-ready-full-stack-applications",
        "building-rest-apis-nodejs",
        "creating-portfolio-ranks-google",
      ],
      faqs: [
        {
          question: "Can I use Next.js without knowing React?",
          answer:
            "You will struggle. Next.js is a React framework—learn components, hooks, and state first, then add Next.js for routing, SSR, and deployment conveniences.",
        },
        {
          question: "Is Next.js always better for SEO?",
          answer:
            "For content-heavy sites like blogs and portfolios, Next.js server rendering helps crawlers. Pure client-rendered React can still rank with good metadata strategies, but Next.js reduces foot-guns.",
        },
        {
          question: "When should I stick with Create React App or Vite?",
          answer:
            "Internal dashboards, admin panels, and tools behind login rarely need SSR. Vite + React is simpler and fast to iterate when SEO does not matter.",
        },
        {
          question: "Which did you use for kazinayeem.site?",
          answer:
            "Next.js App Router with TypeScript—for static generation, blog routing, structured SEO metadata, and Image optimization out of the box.",
        },
      ],
    },
  },
  {
    file: "docker-vs-virtual-machines.ts",
    publishedAt: "2025-05-26",
    updatedAt: "2025-06-08",
    featured: false,
    popular: false,
    content: ARTICLE_22,
    meta: {
      slug: "docker-vs-virtual-machines",
      title: "Docker vs Virtual Machines: What Students Should Know",
      seoTitle: "Docker vs Virtual Machines | Mohammad Ali Nayeem",
      subtitle: "Containers, hypervisors, and when each technology fits your DevOps learning path",
      description:
        "Mohammad Ali Nayeem explains Docker vs virtual machines for students: isolation models, resource usage, portability, and practical lab scenarios from DIU DevOps coursework and Bornosoft deployments.",
      category: "Docker",
      tags: ["Docker", "Virtual Machines", "DevOps", "Containers", "Linux", "Cloud"],
      keywords: [
        "docker vs virtual machines",
        "containers vs vms explained",
        "docker beginner student",
        "devops docker tutorial",
      ],
      coverImageAlt:
        "Diagram comparing virtual machine hypervisor stack with Docker container architecture",
      relatedSlugs: [
        "complete-guide-github-actions",
        "terraform-basics-beginners",
        "building-production-ready-full-stack-applications",
      ],
      faqs: [
        {
          question: "Do Docker containers include a full operating system?",
          answer:
            "No. Containers share the host kernel and package only app dependencies and libraries. VMs bundle entire guest OS images, which is why they are heavier but more isolated.",
        },
        {
          question: "Can I run Docker on Windows as a DIU student?",
          answer:
            "Yes, via Docker Desktop with WSL2 backend on Windows 10/11. On macOS, Docker Desktop uses a lightweight Linux VM under the hood—still simpler than managing full VMs per project.",
        },
        {
          question: "When are VMs still the right choice?",
          answer:
            "When you need different kernels, legacy Windows apps, strong multi-tenant isolation, or full network appliance images. Many enterprise hybrids use VMs to host Docker hosts.",
        },
        {
          question: "Is Kubernetes the next step after Docker?",
          answer:
            "Learn Docker Compose first for multi-container apps on one machine. Move to Kubernetes when you need orchestration across many nodes—often after internships or advanced DevOps courses.",
        },
      ],
    },
  },
  {
    file: "terraform-basics-beginners.ts",
    publishedAt: "2025-05-29",
    updatedAt: "2025-06-10",
    featured: false,
    popular: true,
    content: ARTICLE_23,
    meta: {
      slug: "terraform-basics-beginners",
      title: "Terraform Basics for Beginners",
      seoTitle: "Terraform Basics for Beginners | Mohammad Ali Nayeem",
      subtitle: "Infrastructure as Code fundamentals with AWS examples from a student DevOps lab",
      description:
        "Learn Terraform basics with Mohammad Ali Nayeem: providers, state, modules, and safe workflows for provisioning AWS resources as a Software Engineering student in Bangladesh.",
      category: "Terraform",
      tags: ["Terraform", "Infrastructure as Code", "AWS", "DevOps", "HCL", "Cloud"],
      keywords: [
        "terraform basics beginners",
        "terraform aws tutorial student",
        "infrastructure as code guide",
        "terraform state management",
      ],
      coverImageAlt: "Terraform configuration file alongside AWS architecture diagram on a monitor",
      relatedSlugs: [
        "my-future-roadmap-ai-devops-cloud",
        "docker-vs-virtual-machines",
        "complete-guide-github-actions",
      ],
      faqs: [
        {
          question: "Terraform vs CloudFormation—which first?",
          answer:
            "Terraform is multi-cloud and popular in job postings. CloudFormation is AWS-native. Students benefit from Terraform's broader community tutorials; learn CloudFormation if your internship is AWS-only.",
        },
        {
          question: "Where should Terraform state live?",
          answer:
            "Never commit state files with secrets to Git. Use remote backends like S3 with DynamoDB locking for team projects; local state is fine for solo labs until you collaborate.",
        },
        {
          question: "How do I avoid huge AWS bills while learning?",
          answer:
            "Set billing alarms, use t3.micro instances, destroy resources with terraform destroy after labs, and tag everything with student/project names for accountability.",
        },
        {
          question: "Do I need to memorize every HCL attribute?",
          answer:
            "No. Understand resource blocks, variables, outputs, and modules. Provider docs and terraform plan are your daily references—just like language standard library docs.",
        },
      ],
    },
  },
  {
    file: "building-production-ready-full-stack-applications.ts",
    publishedAt: "2025-06-03",
    updatedAt: "2025-06-14",
    featured: false,
    popular: false,
    content: ARTICLE_24,
    meta: {
      slug: "building-production-ready-full-stack-applications",
      title: "Building Production-Ready Full Stack Applications",
      seoTitle: "Building Production-Ready Full Stack Applications | Mohammad Ali Nayeem",
      subtitle: "From localhost demo to deployed system—checklists Bornosoft and portfolio projects follow",
      description:
        "Mohammad Ali Nayeem outlines how student developers build production-ready full stack apps: architecture, testing, observability, security, CI/CD, and operational habits beyond the tutorial happy path.",
      category: "Software Engineering",
      tags: ["Full Stack", "Software Engineering", "DevOps", "Testing", "Security", "Architecture"],
      keywords: [
        "production ready full stack app",
        "full stack best practices students",
        "deploy nodejs nextjs production",
        "software engineering checklist",
      ],
      coverImageAlt:
        "Production architecture diagram with frontend API database monitoring and CI pipeline",
      relatedSlugs: [
        "building-rest-apis-nodejs",
        "react-vs-nextjs",
        "complete-guide-github-actions",
      ],
      faqs: [
        {
          question: "What separates a demo from production-ready?",
          answer:
            "Production means monitored errors, automated tests on critical paths, secrets management, backups, rollback strategy, and documentation another developer could use at 2 AM.",
        },
        {
          question: "How much testing is enough for student projects?",
          answer:
            "At minimum: API integration tests for auth and core CRUD, smoke tests after deploy, and manual checklists for payments or data deletion flows if applicable.",
        },
        {
          question: "Should students use microservices?",
          answer:
            "Almost always no for first production apps. A modular monolith with clear boundaries ships faster and teaches the same domain modeling without operational nightmares.",
        },
        {
          question: "What monitoring tools are free to start?",
          answer:
            "Sentry for errors, UptimeRobot for pings, GitHub Actions badges for CI health, and structured JSON logs you can grep before adopting expensive APM suites.",
        },
      ],
    },
  },
  {
    file: "my-future-roadmap-ai-devops-cloud.ts",
    publishedAt: "2025-06-15",
    updatedAt: "2025-06-20",
    featured: false,
    popular: true,
    content: ARTICLE_25,
    meta: {
      slug: "my-future-roadmap-ai-devops-cloud",
      title: "My Future Roadmap: AI, DevOps, and Cloud",
      seoTitle: "My Future Roadmap: AI, DevOps, and Cloud | Mohammad Ali Nayeem",
      subtitle: "Where a DIU Software Engineering student and Bornosoft founder is heading next",
      description:
        "Mohammad Ali Nayeem shares his personal roadmap combining AI engineering, DevOps automation, and cloud architecture—skills goals, certifications, projects, and advice for Bangladeshi students with similar ambitions.",
      category: "Cloud Computing",
      tags: ["Cloud Computing", "AI", "DevOps", "Career Roadmap", "AWS", "Kubernetes"],
      keywords: [
        "ai devops cloud career roadmap",
        "software engineering student future skills",
        "aws kubernetes learning path",
        "bangladesh tech career plan",
      ],
      coverImageAlt:
        "Roadmap infographic connecting AI machine learning DevOps and cloud computing skills",
      relatedSlugs: [
        "terraform-basics-beginners",
        "my-software-engineering-journey-diu",
        "ai-tools-every-student-developer-should-know",
      ],
      faqs: [
        {
          question: "Should I specialize in AI or DevOps?",
          answer:
            "You can combine them. MLOps and AI platform engineering need both model literacy and deployment automation. Pick a primary lane for depth and a secondary for breadth based on what energizes you.",
        },
        {
          question: "Which cloud certification is worth it for students?",
          answer:
            "AWS Solutions Architect Associate or Azure Fundamentals are common starting points. Certifications open doors but must pair with projects—employers hire pipelines, not PDFs alone.",
        },
        {
          question: "How do I stay current without tutorial overload?",
          answer:
            "One newsletter, one deep project per quarter, and contribute to a tool you already use. Avoid chasing every new framework weekly—evaluate against your roadmap twice a year.",
        },
        {
          question: "What role does Bornosoft play in your roadmap?",
          answer:
            "Bornosoft is my forcing function for client-grade delivery—real deadlines, invoices, and maintenance teach lessons no classroom duplicates. It keeps my roadmap honest and market-tested.",
        },
      ],
    },
  },
];

function writeArticle({ file, publishedAt, updatedAt, featured, popular, meta, content }) {
  const body = `import { createPost } from "../article-builder";

const post = createPost({
  slug: "${meta.slug}",
  title: "${meta.title}",
  seoTitle: "${meta.seoTitle}",
  subtitle: "${meta.subtitle}",
  description: "${meta.description}",
  category: "${meta.category}",
  tags: ${JSON.stringify(meta.tags)},
  keywords: ${JSON.stringify(meta.keywords)},
  publishedAt: "${publishedAt}",
  updatedAt: "${updatedAt}",
  featured: ${featured},
  popular: ${popular},
  coverImageAlt: "${meta.coverImageAlt}",
  content: \`${content}\`,
  faqs: ${JSON.stringify(meta.faqs, null, 4).replace(/\n/g, "\n  ")},
  relatedSlugs: ${JSON.stringify(meta.relatedSlugs)},
});

export default post;
`;

  const path = join(OUT_DIR, file);
  writeFileSync(path, body, "utf8");
  const words = content
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;
  return { file, words };
}

console.log("Generating articles 14–25...\n");
const results = ARTICLES.map(writeArticle);
for (const { file, words } of results) {
  const ok = words >= 1200 ? "✓" : "✗";
  console.log(`${ok} ${file} (${words} words)`);
}
const below = results.filter((r) => r.words < 1200);
if (below.length) {
  console.error(`\n${below.length} article(s) below 1200 words!`);
  process.exit(1);
}
console.log(`\nGenerated ${results.length} articles successfully.`);
