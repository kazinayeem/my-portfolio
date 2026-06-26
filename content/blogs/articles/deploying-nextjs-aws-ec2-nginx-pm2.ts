import { createPost } from "../article-builder";

const post = createPost({
  slug: "deploying-nextjs-aws-ec2-nginx-pm2",
  title: "Deploying Next.js on AWS EC2 with Nginx and PM2",
  seoTitle: "Deploying Next.js on AWS EC2 with Nginx and PM2 | Mohammad Ali Nayeem",
  subtitle:
    "The deployment stack I used before Docker took over—still relevant for DIU students and Bornosoft MVPs",
  description:
    "Mohammad Ali Nayeem guides deploying a Next.js application on AWS EC2 using Nginx as a reverse proxy and PM2 for process management—practical steps from a DIU student founder.",
  category: "Next.js",
  tags: ["Next.js", "AWS", "EC2", "Nginx", "PM2", "Deployment"],
  keywords: [
    "deploy nextjs AWS EC2",
    "nextjs nginx pm2 tutorial",
    "nextjs production deployment student",
    "EC2 nextjs reverse proxy",
  ],
  publishedAt: "2024-12-28",
  updatedAt: "2025-01-22",
  featured: false,
  popular: false,
  coverImageAlt:
    "Server architecture diagram for Next.js app behind Nginx on AWS EC2",
  content: `<p>Before I dockerized everything at <strong>Bornosoft</strong>, my go-to production pattern for <strong>Next.js</strong> apps was classic: build on the server (or CI), run Node with <strong>PM2</strong>, put <strong>Nginx</strong> in front on port 443, host on a single <strong>AWS EC2</strong> instance. It is not the fanciest architecture on LinkedIn, but it is how I deployed client dashboards and early portfolio experiments as a <strong>Daffodil International University (DIU)</strong> student paying attention to AWS free tier limits.</p>

<p>This article documents that stack end-to-end—<strong>deploying Next.js on AWS EC2 with Nginx and PM2</strong>—because many Bangladeshi students still start here before jumping to Vercel, ECS, or Kubernetes. Manual clarity builds automation appreciation later.</p>

<h2>When This Stack Still Makes Sense</h2>

<ul>
<li>Client already has an EC2 box and wants Next.js there.</li>
<li>You need custom server-side integrations without serverless limits.</li>
<li>Budget constraints favor one small instance over managed platforms.</li>
<li>Learning goal: understand reverse proxies and process supervision.</li>
</ul>

<p>When traffic grows or deploy frequency increases, migrate to Docker + CI/CD—but this path teaches fundamentals Vercel hides (which is good and bad).</p>

<div class="callout tip"><strong>Tip:</strong> Use <code>output: 'standalone'</code> in Next.js config for leaner production builds on small instances.</div>

<h2>Architecture Overview</h2>

<pre><code class="language-text">User → HTTPS (443) → Nginx → HTTP (3000) → PM2 → Next.js Node server</code></pre>

<table>
<thead><tr><th>Component</th><th>Role</th></tr></thead>
<tbody>
<tr><td>EC2 Ubuntu 22.04</td><td>Compute host</td></tr>
<tr><td>Nginx</td><td>TLS termination, reverse proxy, gzip</td></tr>
<tr><td>PM2</td><td>Keep Node alive, restart on crash, cluster mode optional</td></tr>
<tr><td>Next.js standalone</td><td>Application server</td></tr>
</tbody>
</table>

<h2>Step 1: Launch and Harden EC2</h2>

<p>Instance: t3.small (or t3.micro for experiments). Security group:</p>

<ul>
<li>SSH (22) from your IP</li>
<li>HTTP (80) and HTTPS (443) from 0.0.0.0/0</li>
<li>Do NOT expose 3000 publicly—Nginx fronts the app</li>
</ul>

<pre><code class="language-bash">sudo apt update && sudo apt upgrade -y
sudo timedatectl set-timezone Asia/Dhaka
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable</code></pre>

<h2>Step 2: Install Node.js and PM2</h2>

<pre><code class="language-bash">curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2</code></pre>

<p>PM2 ecosystem file at <code>/var/www/portfolio/ecosystem.config.js</code>:</p>

<pre><code class="language-javascript">module.exports = {
  apps: [
    {
      name: "portfolio",
      cwd: "/var/www/portfolio",
      script: "server.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};</code></pre>

<h2>Step 3: Configure Next.js for Standalone Output</h2>

<pre><code class="language-javascript">/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
};

module.exports = nextConfig;</code></pre>

<p>Build locally or on server:</p>

<pre><code class="language-bash">npm ci
npm run build</code></pre>

<p>Copy <code>.next/standalone</code>, <code>.next/static</code>, and <code>public/</code> to server layout documented in Next.js deployment docs. Standalone reduces node_modules footprint on EC2—important on micro instances.</p>

<h2>Step 4: Deploy Code to EC2</h2>

<p>Early Bornosoft flow used git pull on server; better flow uses GitHub Actions SCP/rsync artifacts. Minimal manual approach:</p>

<pre><code class="language-bash">rsync -avz --delete ./.next/standalone/ ubuntu@ec2-host:/var/www/portfolio/
rsync -avz ./.next/static/ ubuntu@ec2-host:/var/www/portfolio/.next/static/
rsync -avz ./public/ ubuntu@ec2-host:/var/www/portfolio/public/</code></pre>

<p>Environment variables live in <code>/var/www/portfolio/.env</code> created once on server—not committed to Git.</p>

<div class="callout warning"><strong>Warning:</strong> Never store AWS keys or database passwords in the Next.js public env prefix. Server-only secrets belong in runtime env without <code>NEXT_PUBLIC_</code>.</div>

<h2>Step 5: Start with PM2</h2>

<pre><code class="language-bash">cd /var/www/portfolio
pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd</code></pre>

<p>Run the printed <code>pm2 startup</code> command so processes survive reboot—learned after a kernel update took my demo site offline before a DIU presentation.</p>

<h2>Step 6: Configure Nginx Reverse Proxy</h2>

<pre><code class="language-nginx">server {
    listen 80;
    server_name kazinayeem.site www.kazinayeem.site;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name kazinayeem.site www.kazinayeem.site;

    ssl_certificate /etc/letsencrypt/live/kazinayeem.site/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/kazinayeem.site/privkey.pem;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}</code></pre>

<p>Obtain certificates with Certbot:</p>

<pre><code class="language-bash">sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d kazinayeem.site -d www.kazinayeem.site</code></pre>

<h2>Step 7: Zero-Downtime-ish Deploy Script</h2>

<pre><code class="language-bash">#!/bin/bash
set -e
cd /var/www/portfolio
git pull origin main
npm ci
npm run build
rsync -a .next/static .next/standalone/.next/
pm2 reload portfolio</code></pre>

<p><code>pm2 reload</code> graceful restarts workers—better than hard stop for tiny traffic sites.</p>

<h2>Performance Tweaks for Small Instances</h2>

<ul>
<li>Enable Next.js image optimization carefully—CPU heavy; consider static images for marketing pages.</li>
<li>Use CloudFront CDN in front of EC2 for static assets later.</li>
<li>Monitor memory—PM2 logs + <code>htop</code> during build on server; prefer building in CI.</li>
</ul>

<h2>Common Issues I Debugged</h2>

<table>
<thead><tr><th>Issue</th><th>Fix</th></tr></thead>
<tbody>
<tr><td>502 Bad Gateway</td><td>Next not listening on 3000 or crashed—check pm2 logs</td></tr>
<tr><td>Assets 404</td><td>Missing .next/static copy in standalone deploy</td></tr>
<tr><td>HTTPS redirect loop</td><td>Wrong X-Forwarded-Proto headers</td></tr>
<tr><td>Build OOM</td><td>Swap file or build on CI, deploy artifacts only</td></tr>
</tbody>
</table>

<h2>Migration Path to Docker and CI/CD</h2>

<p>Once manual deploys felt repetitive, I containerized the same standalone output and pushed to ECR—GitHub Actions replaced SSH git pull. The Nginx + TLS knowledge transferred directly to production Docker hosts and ALB configurations.</p>

<h2>Conclusion</h2>

<p><strong>Deploying Next.js on AWS EC2 with Nginx and PM2</strong> taught me production plumbing: proxies, TLS, process supervision, and env discipline. Bornosoft moved many projects to containers, but this stack remains a valid student learning path and a pragmatic client option when managed platforms are off the table.</p>

<p>Spin up a t3.micro, deploy a side project, break it, fix it at 1 AM—you will never fear SSH again.</p>

<p>Need help with your Nginx config? Reach me at <a href="https://kazinayeem.site">kazinayeem.site</a>.</p>`,
  faqs: [
    {
      question: "PM2 or systemd for Next.js on EC2?",
      answer:
        "PM2 is developer-friendly with easy reloads and logs. systemd works too. Many students use PM2 first, then standardize on Docker or platform orchestration later.",
    },
    {
      question: "Should I build Next.js on EC2 or in CI?",
      answer:
        "Build in CI when possible—EC2 micro instances often run out of memory during next build. Ship standalone artifacts to the server.",
    },
    {
      question: "Is EC2 cheaper than Vercel for Next.js?",
      answer:
        "For tiny static-heavy sites, Vercel free tier may win. EC2 makes sense when you need full server control, custom backends on same host, or client mandates.",
    },
    {
      question: "Why put Nginx in front of Next.js?",
      answer:
        "Nginx handles TLS, gzip, buffering, and security headers efficiently. It also lets you run multiple apps on one server with virtual hosts.",
    },
  ],
  relatedSlugs: [
    "from-nodejs-to-golang-learning-journey",
    "my-first-cicd-pipeline-github-actions",
    "creating-portfolio-ranks-google",
  ],
});

export default post;
