import { createPost } from "../article-builder";

const post = createPost({
  slug: "learning-docker-from-scratch",
  title: "Learning Docker from Scratch",
  seoTitle: "Learning Docker from Scratch | Mohammad Ali Nayeem",
  subtitle:
    "How a DIU student went from 'it works on my laptop' to reproducible Bornosoft deploys with containers",
  description:
    "Mohammad Ali Nayeem teaches Docker from zero—images, containers, Dockerfile, Compose, volumes, networking, and real mistakes made while learning containerization in Dhaka.",
  category: "Docker",
  tags: ["Docker", "Containers", "DevOps", "Tutorial", "Bornosoft"],
  keywords: [
    "learn docker from scratch",
    "docker tutorial student",
    "docker compose beginners",
    "docker Bangladesh developer",
  ],
  publishedAt: "2024-11-28",
  updatedAt: "2024-12-20",
  featured: false,
  popular: false,
  coverImageAlt:
    "Terminal showing docker build and docker compose up commands with container logs",
  content: `<p>The first time a Bornosoft client said "your demo worked yesterday but not today," I knew the problem was environmental drift—not logic bugs. My Node.js API depended on a specific OpenSSL library, a Postgres extension, and an environment variable I forgot to mention in the handoff email. On my DIU laptop everything passed; on their Windows server everything failed. That week I committed to learning <strong>Docker from scratch</strong>, and it permanently changed how I build software.</p>

<p>This guide is the path I wish existed when I started: no assumptions that you already run Kubernetes, no enterprise jargon, just the concepts and commands that took me from confusion to shipping containerized Bornosoft services and portfolio apps from <strong>Dhaka, Bangladesh</strong>.</p>

<h2>What Docker Actually Does (Mental Model)</h2>

<p>Think of Docker as shipping your application <em>with its entire runtime suitcase</em>. An <strong>image</strong> is the packed suitcase—a read-only template. A <strong>container</strong> is the suitcase opened and running on a host. Multiple containers can run from one image, isolated from each other and from the host filesystem (unless you explicitly share volumes).</p>

<div class="callout tip"><strong>Tip:</strong> If you understand Git, images are like commits and containers are like checked-out working trees—simplified analogy, but it helped me.</div>

<h3>Images vs Containers vs Dockerfile</h3>

<ul>
<li><strong>Dockerfile</strong> — Recipe text file describing how to build an image</li>
<li><strong>Image</strong> — Built artifact stored locally or in a registry (Docker Hub, ECR)</li>
<li><strong>Container</strong> — Running process created from an image</li>
<li><strong>Registry</strong> — Remote store to push/pull images</li>
</ul>

<h2>Installation on Linux and macOS</h2>

<p>I develop on macOS with Docker Desktop and deploy to Ubuntu EC2 instances. Installation paths differ, but CLI commands are identical:</p>

<pre><code class="language-bash"># Verify install
docker --version
docker compose version

# Hello world
docker run hello-world

# See running containers
docker ps

# See all containers including stopped
docker ps -a

# List local images
docker images</code></pre>

<div class="callout note"><strong>Note:</strong> On Linux servers, add your user to the docker group (<code>sudo usermod -aG docker $USER</code>) to avoid sudo on every command—then log out and back in.</div>

<h2>Your First Dockerfile: Static HTML</h2>

<p>Before dockerizing a complex Bornosoft API, I practiced with a static site:</p>

<pre><code class="language-dockerfile">FROM nginx:alpine
COPY ./dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]</code></pre>

<pre><code class="language-bash">docker build -t my-static-site:1.0 .
docker run -d -p 8080:80 --name demo my-static-site:1.0
# Visit http://localhost:8080</code></pre>

<p>Four concepts in one tiny example: base image, copy files, expose port, default command.</p>

<h2>Dockerizing a Node.js API</h2>

<p>Real Bornosoft services needed dependency install, build steps, and production env vars:</p>

<pre><code class="language-dockerfile">FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM base AS release
COPY . .
ENV NODE_ENV=production
EXPOSE 3000
USER node
CMD ["node", "src/index.js"]</code></pre>

<p>Later I upgraded to multi-stage builds separating dev dependencies from production images—smaller attack surface, faster deploys to EC2.</p>

<h3>Common Dockerfile Mistakes I Made</h3>

<table>
<thead><tr><th>Mistake</th><th>Symptom</th><th>Fix</th></tr></thead>
<tbody>
<tr><td>Copying node_modules from host</td><td>Works locally, fails in Linux container</td><td>Run npm ci inside image</td></tr>
<tr><td>No .dockerignore</td><td>Huge build context, slow builds</td><td>Ignore node_modules, .git, .env</td></tr>
<tr><td>Running as root</td><td>Security risk in production</td><td>USER node or non-root UID</td></tr>
<tr><td>Missing EXPOSE docs</td><td>Confusion about ports</td><td>Document + map with -p</td></tr>
</tbody>
</table>

<div class="callout warning"><strong>Warning:</strong> Never COPY .env into an image. Inject secrets at runtime via environment variables or secret managers.</div>

<h2>Docker Compose for Multi-Container Apps</h2>

<p>My portfolio backend needed Postgres and Redis alongside the API. <strong>docker-compose.yml</strong> orchestrates multiple services locally:</p>

<pre><code class="language-yaml">services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://user:pass@db:5432/app
      REDIS_URL: redis://cache:6379
    depends_on:
      - db
      - cache

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: app
    volumes:
      - pgdata:/var/lib/postgresql/data

  cache:
    image: redis:7-alpine

volumes:
  pgdata:</code></pre>

<pre><code class="language-bash">docker compose up -d
docker compose logs -f api
docker compose down</code></pre>

<p>Compose replaced my bash scripts that started Postgres manually and prayed port 5432 was free.</p>

<h2>Volumes and Data Persistence</h2>

<p>Containers are ephemeral—delete a container, lose writable layer data. Databases need <strong>volumes</strong>:</p>

<ul>
<li><strong>Named volumes</strong> — Managed by Docker, best for database data</li>
<li><strong>Bind mounts</strong> — Map host path for live code reload during dev</li>
<li><strong>tmpfs mounts</strong> — Memory-only, rarely used in my student projects</li>
</ul>

<p>I learned this painfully when <code>docker compose down -v</code> wiped a week's seed data during a DIU database course demo.</p>

<h2>Networking Basics</h2>

<p>Compose creates a default network where services reach each other by service name (<code>db</code>, <code>api</code>). On custom networks:</p>

<pre><code class="language-bash">docker network create bornosoft-net
docker run -d --network bornosoft-net --name api my-api:1.0
docker run -d --network bornosoft-net --name db postgres:16</code></pre>

<p>Understanding bridge networks made AWS VPC subnet design less mystical later.</p>

<h2>Pushing Images to Amazon ECR</h2>

<p>Local images alone do not help EC2 deploys. I push to <strong>ECR</strong>:</p>

<pre><code class="language-bash">aws ecr get-login-password --region ap-southeast-1 | \\
  docker login --username AWS --password-stdin ACCOUNT.dkr.ecr.ap-southeast-1.amazonaws.com

docker tag bornosoft-api:1.0 ACCOUNT.dkr.ecr.ap-southeast-1.amazonaws.com/bornosoft-api:1.0
docker push ACCOUNT.dkr.ecr.ap-southeast-1.amazonaws.com/bornosoft-api:1.0</code></pre>

<p>CI pipelines automate these steps on every merge to main—documented in my GitHub Actions article.</p>

<h2>Development vs Production Patterns</h2>

<h3>Development</h3>

<ul>
<li>Bind mount source code for hot reload</li>
<li>docker-compose.override.yml for local-only settings</li>
<li>Expose debug ports</li>
</ul>

<h3>Production</h3>

<ul>
<li>Immutable image tags—never <code>latest</code> in prod</li>
<li>Health checks in Dockerfile or orchestrator</li>
<li>Resource limits (cpus, memory) when using Swarm or ECS</li>
<li>Non-root users, read-only filesystem where possible</li>
</ul>

<h2>Debugging Containers</h2>

<p>Commands I use weekly:</p>

<pre><code class="language-bash"># Shell into running container
docker exec -it api sh

# Inspect logs
docker logs api --tail 100 -f

# Inspect image layers
docker history my-api:1.0

# Check resource usage
docker stats</code></pre>

<div class="callout tip"><strong>Tip:</strong> Add <code>HEALTHCHECK</code> instructions in production Dockerfiles so load balancers stop sending traffic to broken containers.</div>

<h2>Docker vs Virtual Machines</h2>

<table>
<thead><tr><th>Aspect</th><th>Virtual Machine</th><th>Container</th></tr></thead>
<tbody>
<tr><td>Startup time</td><td>Minutes</td><td>Seconds</td></tr>
<tr><td>Isolation</td><td>Full OS</td><td>Process-level (shared kernel)</td></tr>
<tr><td>Size</td><td>Gigabytes</td><td>Megabytes to low GB</td></tr>
<tr><td>Use case</td><td>Legacy monoliths, diff OS</td><td>Microservices, CI builds</td></tr>
</tbody>
</table>

<h2>Learning Path I Recommend for DIU Students</h2>

<ol>
<li>Run official images (nginx, postgres, redis) with <code>docker run</code></li>
<li>Write a Dockerfile for your semester project API</li>
<li>Add docker-compose with a database</li>
<li>Push to Docker Hub or ECR</li>
<li>Deploy on EC2 with <code>docker compose pull && docker compose up -d</code></li>
<li>Read Kubernetes docs only after these steps feel boring</li>
</ol>

<h2>Conclusion</h2>

<p><strong>Learning Docker from scratch</strong> felt overwhelming for one weekend, but each command compounded. Containers eliminated "works on my machine" excuses at Bornosoft, accelerated DIU team projects, and became the bridge to AWS ECS, Kubernetes, and professional CI/CD pipelines.</p>

<p>Start with one Dockerfile this week. Break it on purpose—delete volumes, wrong ports, missing env vars—and fix it until you can explain images and containers to a classmate without slides. That fluency is what employers and clients actually need.</p>

<p>Questions? Find me at <a href="https://kazinayeem.site">kazinayeem.site</a>.</p>`,
  faqs: [
    {
      question: "Do I need Docker Desktop on Linux?",
      answer:
        "No. Linux can run Docker Engine directly. Docker Desktop is common on macOS and Windows for ease of use, but servers use Engine without Desktop.",
    },
    {
      question: "How is Docker Compose different from Dockerfile?",
      answer:
        "A Dockerfile builds a single image. Docker Compose defines and runs multi-container applications—networks, volumes, and environment wiring across services.",
    },
    {
      question: "Can I learn Docker on a low-spec laptop?",
      answer:
        "Yes. Start with small Alpine-based images and one service at a time. Close unused containers to free RAM—a constraint many Bangladeshi students share.",
    },
    {
      question: "When should I move from Docker Compose to Kubernetes?",
      answer:
        "When you need automatic scaling, rolling deploys across many hosts, or self-healing orchestration. Compose is perfect for local dev and small production VMs.",
    },
  ],
  relatedSlugs: [
    "ecs-vs-eks-vs-ecr-explained-beginners",
    "kubernetes-explained-simply",
    "my-first-cicd-pipeline-github-actions",
  ],
});

export default post;
