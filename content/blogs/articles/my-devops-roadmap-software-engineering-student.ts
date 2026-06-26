import { createPost } from "../article-builder";

const post = createPost({
  slug: "my-devops-roadmap-software-engineering-student",
  title: "My DevOps Roadmap as a Software Engineering Student",
  seoTitle: "My DevOps Roadmap as a Software Engineering Student | Mohammad Ali Nayeem",
  subtitle:
    "The skills, projects, and milestones I followed from DIU coursework to Bornosoft production deploys",
  description:
    "Mohammad Ali Nayeem shares his personal DevOps learning roadmap for Software Engineering students—covering Linux, Git, Docker, Kubernetes, AWS, CI/CD, and how to build portfolio proof in Bangladesh.",
  category: "DevOps",
  tags: ["DevOps", "Roadmap", "DIU", "Career", "AWS"],
  keywords: [
    "devops roadmap software engineering student",
    "learn devops Bangladesh",
    "student devops career path",
    "DIU devops skills",
  ],
  publishedAt: "2024-11-10",
  updatedAt: "2024-12-05",
  featured: false,
  popular: true,
  coverImageAlt:
    "DevOps roadmap diagram showing Linux Docker Kubernetes AWS and CI/CD milestones",
  content: `<p>When I searched "DevOps roadmap" as a second-year student at <strong>Daffodil International University (DIU)</strong>, every infographic looked the same: a rainbow of logos from Linux to Kubernetes to Prometheus, with no indication of <em>order</em>, <em>depth</em>, or <em>what to build</em>. I printed one, stuck it above my desk, and felt productive for exactly one day. Then I opened Terraform docs and realized a logo wall is not a curriculum.</p>

<p>This article is the roadmap I actually followed—and still refine—as a Software Engineering student and founder of <strong>Bornosoft</strong> in Dhaka. It prioritizes skills that compound: things you reuse across every client project, internship interview, and midnight deploy. It is opinionated, Bangladesh-budget-aware, and grounded in projects you can ship before graduation.</p>

<h2>What DevOps Means for Students (Not HR Buzzwords)</h2>

<p>DevOps is not a job title you collect after memorizing fifty tools. It is the practice of shortening the path from code commit to reliable production software—through automation, observability, collaboration, and infrastructure as code. For students, that translates to:</p>

<ul>
<li>Your portfolio deploys without manual FTP uploads.</li>
<li>Your team can onboard a new developer in hours, not weeks.</li>
<li>When something breaks, you have logs and metrics—not guesswork.</li>
</ul>

<div class="callout tip"><strong>Tip:</strong> Treat every course project as a mini production system. Add a README deploy section even if the viva only asks for UML diagrams.</div>

<h2>Phase 1: Foundations (Months 1–3)</h2>

<h3>Linux and the Command Line</h3>

<p>Everything in cloud land is Linux underneath. Before Docker, before AWS, I got comfortable with:</p>

<pre><code class="language-bash"># Daily commands I still use
ssh user@host
systemctl status nginx
journalctl -u myapp -f
chmod, chown, tar, curl, grep, awk, sed
df -h && free -m
top / htop</code></pre>

<p>I practiced on WSL, an old laptop with Ubuntu, and free EC2 t2.micro instances. Bornosoft's first VPS was configured entirely over SSH from a DIU dorm Wi-Fi connection that dropped every twenty minutes—character building.</p>

<h3>Git and Collaboration Workflows</h3>

<p>DevOps without Git is fantasy. I learned branching strategies beyond "everyone pushes to main":</p>

<ul>
<li>Feature branches with pull requests</li>
<li>Conventional commits for changelog automation</li>
<li>Rebase vs merge trade-offs</li>
<li>Protected branches and required reviews</li>
</ul>

<h3>Networking Basics</h3>

<p>You do not need a CCNA, but understand DNS, HTTP, TLS, ports, and load balancers. I debugged more production issues with <code>curl -v</code> and <code>dig</code> than with any dashboard.</p>

<table>
<thead><tr><th>Concept</th><th>Why It Matters</th><th>Practice Project</th></tr></thead>
<tbody>
<tr><td>DNS A/CNAME records</td><td>Pointing domains to EC2 or Vercel</td><td>Connect portfolio domain</td></tr>
<tr><td>HTTP status codes</td><td>Health checks and API debugging</td><td>Build /health endpoint</td></tr>
<tr><td>TLS certificates</td><td>HTTPS for client trust</td><td>Certbot on Nginx</td></tr>
<tr><td>Firewalls / SGs</td><td>Security on AWS</td><td>Lock down SSH to your IP</td></tr>
</tbody>
</table>

<h2>Phase 2: Containers and Local Dev Parity (Months 4–6)</h2>

<h3>Docker Deep Dive</h3>

<p>Docker was my unlock moment. I dockerized Bornosoft APIs so teammates stopped saying "works on my machine." Skills I focused on:</p>

<ol>
<li>Writing multi-stage Dockerfiles for Node and Go</li>
<li>docker-compose for local Postgres + Redis + API</li>
<li>Volume mounts vs baked images</li>
<li>.dockerignore hygiene</li>
</ol>

<pre><code class="language-dockerfile"># Multi-stage Node build pattern I reuse
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
CMD ["node", "dist/main.js"]</code></pre>

<h3>Introduction to CI</h3>

<p>Before full CD, I automated tests on every push with GitHub Actions. Green CI badges on README files impressed internship recruiters more than another TODO app screenshot.</p>

<div class="callout note"><strong>Note:</strong> AWS free tier expires in spirit before it expires on paper—track billing early. One forgotten NAT Gateway taught me that lesson.</div>

<h2>Phase 3: Cloud with AWS (Months 7–10)</h2>

<p>I chose <strong>AWS</strong> because Bangladesh job posts and international remote roles mention it most. My progression:</p>

<h3>Core Services First</h3>

<ul>
<li><strong>EC2</strong> — First deploys, Nginx, PM2, systemd</li>
<li><strong>S3</strong> — Static assets, backups, build artifacts</li>
<li><strong>IAM</strong> — Least-privilege users and roles (painful, essential)</li>
<li><strong>RDS</strong> — Managed Postgres instead of database-on-EC2</li>
<li><strong>ECR</strong> — Private Docker registry before ECS/EKS</li>
</ul>

<h3>Then Containers in the Cloud</h3>

<p>I compared ECS Fargate vs self-managed EC2 Docker—documented in my ECS vs EKS article. For student scale, ECS on Fargate often beats running your own Kubernetes control plane.</p>

<h2>Phase 4: CI/CD and Infrastructure as Code (Months 11–14)</h2>

<h3>Pipeline Maturity Ladder</h3>

<ol>
<li>Lint + test on PR</li>
<li>Build Docker image on merge to main</li>
<li>Push to ECR with semantic tags</li>
<li>Deploy to staging automatically</li>
<li>Manual approval gate for production</li>
<li>Rollback documented and tested</li>
</ol>

<p>I built pipelines in both <strong>GitHub Actions</strong> and <strong>Jenkins</strong>—Actions for greenfield repos, Jenkins for lab requirements and legacy clients.</p>

<h3>Terraform Basics</h3>

<p>ClickOps on AWS console does not scale across environments. I started terraforming VPC + EC2 + security groups for reproducible Bornosoft staging:</p>

<pre><code class="language-hcl">resource "aws_instance" "app" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.small"
  subnet_id     = aws_subnet.public.id

  tags = {
    Name        = "bornosoft-staging"
    Environment = "staging"
    ManagedBy   = "terraform"
  }
}</code></pre>

<div class="callout warning"><strong>Warning:</strong> Never commit Terraform state or .tfvars with secrets. Use remote state in S3 with encryption and locking.</div>

<h2>Phase 5: Kubernetes (Months 15–18)</h2>

<p>Kubernetes is not day-one material. I learned it after Docker and AWS because I needed to understand what problem orchestration solves: rolling deploys, self-healing pods, service discovery. Minikube and EKS tutorials on weekends, applied to side projects—not every Bornosoft client needs K8s on day one.</p>

<h2>Phase 6: Observability and Reliability</h2>

<p>Shipping is half the job; knowing when you broke production is the other half:</p>

<ul>
<li><strong>Structured logging</strong> — JSON logs with request IDs</li>
<li><strong>Metrics</strong> — CPU, memory, request latency, error rates</li>
<li><strong>Alerting</strong> — PagerDuty is overkill; start with email/Slack webhooks</li>
<li><strong>Runbooks</strong> — Document "if X alert fires, do Y"</li>
</ul>

<h2>Portfolio Projects That Prove DevOps Skills</h2>

<p>Recruiters trust repos more than certificates. Projects on my roadmap checklist:</p>

<table>
<thead><tr><th>Project</th><th>Skills Demonstrated</th></tr></thead>
<tbody>
<tr><td>Portfolio on EC2 with CI/CD</td><td>Nginx, PM2, GitHub Actions, TLS</td></tr>
<tr><td>Dockerized full-stack app</td><td>Compose, multi-stage builds, env management</td></tr>
<tr><td>Terraform AWS stack</td><td>IaC, modules, state management</td></tr>
<tr><td>K8s deployment manifest</td><td>Deployments, Services, Ingress</td></tr>
<tr><td>Internal Bornosoft staging env</td><td>Real client constraints, backups</td></tr>
</tbody>
</table>

<h2>Balancing DevOps with DIU Coursework</h2>

<p>Software Engineering curricula emphasize algorithms, OOP, databases, and theory—correctly. DevOps was mostly self-taught for me. Strategies that worked:</p>

<ul>
<li>Align DevOps labs with course projects (containerize your DB assignment API)</li>
<li>Use semester breaks for AWS deep dives</li>
<li>Join DIU tech clubs and present what you learned</li>
<li>Write blog posts—teaching solidifies knowledge</li>
</ul>

<h2>Resources That Helped Me (Free or Cheap)</h2>

<ul>
<li>AWS Free Tier + official workshops</li>
<li>KodeKloud and Mumshad's Docker/K8s courses (sales happen often)</li>
<li>GitHub Student Developer Pack</li>
<li>CNCF webinars and Kubernetes docs</li>
<li>YouTube channels: TechWorld with Nana, DevOps Directive</li>
</ul>

<h2>What I Would Do Differently</h2>

<ol>
<li><strong>Learn observability earlier</strong> — Debugging blind wastes weekends.</li>
<li><strong>Skip tool hopping</strong> — Master one CI platform before collecting badges.</li>
<li><strong>Contribute to open source ops tools</strong> — Great for networking internationally from Dhaka.</li>
<li><strong>Document as I go</strong> — Future me forgot why that security group rule exists.</li>
</ol>

<h2>Conclusion</h2>

<p>My <strong>DevOps roadmap as a Software Engineering student</strong> is not a twelve-month sprint to every logo on the infographic—it is a sequence of foundations, projects, and production scars. From Linux on a laptop in Dhaka to Bornosoft deploys on AWS, each phase unlocked the next. If you are at DIU or any Bangladeshi university wondering where to start, begin with Git and Linux this week. Docker next month. AWS when your app deserves to leave localhost.</p>

<p>The roadmap is personal—adjust pace to your internships, finances, and curiosity. Ship small, automate early, and write about what breaks. That is how student engineers become the person teams trust at 2 AM when the pipeline goes red.</p>

<p>Connect with me at <a href="https://kazinayeem.site">kazinayeem.site</a> to swap roadmaps and project ideas.</p>`,
  faqs: [
    {
      question: "How long does it take a student to learn DevOps basics?",
      answer:
        "With consistent part-time effort (10–15 hours weekly), expect 6–9 months to become comfortable with Linux, Docker, basic AWS, and CI/CD pipelines. Mastery is ongoing—tools evolve faster than semesters.",
    },
    {
      question: "Should I learn Jenkins or GitHub Actions first?",
      answer:
        "Start with GitHub Actions if your projects live on GitHub—it has lower setup friction. Learn Jenkins afterward for enterprise scenarios and university labs that require self-hosted CI.",
    },
    {
      question: "Do I need certifications like AWS Solutions Architect as a student?",
      answer:
        "Certifications help resume screening but do not replace projects. I prioritized deployed portfolio work first, then considered certs before internship applications to larger firms.",
    },
    {
      question: "Can DevOps skills help me as a founder at Bornosoft?",
      answer:
        "Absolutely. Every hour saved on manual deploys is an hour spent on product and clients. DevOps literacy also makes technical conversations with early customers more credible.",
    },
  ],
  relatedSlugs: [
    "learning-docker-from-scratch",
    "kubernetes-explained-simply",
    "my-first-cicd-pipeline-github-actions",
  ],
});

export default post;
