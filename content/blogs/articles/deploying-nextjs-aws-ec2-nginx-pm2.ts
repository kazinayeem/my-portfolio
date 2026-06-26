import { createPost } from "../article-builder";

const post = createPost({
  slug: "deploying-nextjs-aws-ec2-nginx-pm2",
  title: "Deploying Next.js on AWS EC2 with Nginx and PM2",
  seoTitle: "Deploying Next.js on AWS EC2 with Nginx and PM2 | Mohammad Ali Nayeem",
  subtitle:
    "How I hosted portfolio and Bornosoft Next.js apps on a budget EC2 instance before moving to containers",
  description:
    "Mohammad Ali Nayeem guides deploying Next.js applications on AWS EC2 using Nginx as a reverse proxy and PM2 for process management—practical steps for DIU students and indie founders in Bangladesh.",
  category: "Next.js",
  tags: ["Next.js", "AWS", "EC2", "Nginx", "PM2", "Deployment"],
  keywords: [
    "deploy nextjs AWS EC2",
    "nextjs nginx pm2 tutorial",
    "nextjs production deployment student",
    "host nextjs Bangladesh",
  ],
  publishedAt: "2024-12-28",
  updatedAt: "2025-01-22",
  featured: false,
  popular: false,
  coverImageAlt:
    "Server architecture diagram for Next.js behind Nginx on AWS EC2",
  content: `<p>Before Docker and GitHub Actions became my default at <strong>Bornosoft</strong>, I deployed Next.js apps the old-fashioned way: a single <strong>AWS EC2</strong> instance, <strong>Nginx</strong> handling HTTPS, and <strong>PM2</strong> keeping the Node process alive after SSH logout. It was not cloud-native glamour—it was affordable, understandable, and perfect for a <strong>Daffodil International University (DIU)</strong> student learning what "production" actually feels like when something breaks at midnight.</p>

<p>This article documents my repeatable playbook for <strong>deploying Next.js on AWS EC2 with Nginx and PM2</strong>—security groups, build settings, reverse proxy config, SSL, environment variables, and the mistakes I made so you do not have to.</p>

<h2>When EC2 + Nginx + PM2 Still Makes Sense</h2>

<ul>
<li>Small portfolio or client sites with moderate traffic.</li>
<li>Budget constraints—t3.micro/t3.small within free tier or low cost.</li>
<li>You want to learn Linux ops before jumping to ECS/EKS.</li>
<li>No container requirement from client yet.</li>
</ul>

<p>I later containerized many Bornosoft services, but EC2 deploy skills still help when debugging client servers or internship legacy stacks.</p>

<div class="callout tip"><strong>Tip:</strong> Use <code>output: 'standalone'</code> in Next.js config for leaner production builds on small instances.</div>

<h2>Architecture Overview</h2>

<pre><code class="language-text">User → HTTPS (443) → Nginx → localhost:3000 → Next.js (PM2)
                              → static caching for /_next/static</code></pre>

<table>
<thead><tr><th>Component</th><th>Role</th></tr></thead>
<tbody>
<tr><td>EC2 Ubuntu 22.04</td><td>Compute host</td></tr>
<tr><td>Nginx</td><td>TLS termination, reverse proxy, gzip</td></tr>
<tr><td>PM2</td><td>Process manager, auto-restart on crash</td></tr>
<tr><td>Next.js</td><td>App server (standalone output)</td></tr>
<tr><td>Certbot</td><td>Let's Encrypt certificates</td></tr>
</tbody>
</table>

<h2>Step 1: Launch and Secure EC2</h2>

<p>Launch t3.small (or micro for experiments) in <code>ap-southeast-1</code> near Bangladesh. Security group inbound:</p>

<ul>
<li>SSH (22) from your IP only</li>
<li>HTTP (80) from anywhere (Certbot challenge + redirect)</li>
<li>HTTPS (443) from anywhere</li>
</ul>

<p>Do not expose port 3000 publicly—Nginx should be the only public entry.</p>

<div class="callout warning"><strong>Warning:</strong> Attach an Elastic IP if you need stable DNS for client demos. Reboot without EIP changes public IP and breaks DNS.</div>

<h2>Step 2: Prepare Next.js for Production</h2>

<p>In <code>next.config.js</code>:</p>

<pre><code class="language-javascript">/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
};

module.exports = nextConfig;</code></pre>

<p>Build locally or on server:</p>

<pre><code class="language-bash">npm ci
npm run build</code></pre>

<p>Standalone output creates <code>.next/standalone</code> with minimal server files—copy <code>.next/static</code> and <code>public</code> into standalone folder per Next.js docs.</p>

<h2>Step 3: Install Node and PM2 on EC2</h2>

<pre><code class="language-bash">curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx
sudo npm install -g pm2</code></pre>

<p>Deploy app to <code>/var/www/portfolio</code> via git pull or SCP. Create <code>.env.production</code> on server only—never commit secrets.</p>

<pre><code class="language-bash">cd /var/www/portfolio
npm ci --omit=dev
npm run build
pm2 start .next/standalone/server.js --name portfolio
pm2 save
pm2 startup</code></pre>

<p><code>pm2 startup</code> prints a command to run with sudo—enables restart on reboot.</p>

<h2>Step 4: Nginx Reverse Proxy Configuration</h2>

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

    location /_next/static/ {
        alias /var/www/portfolio/.next/static/;
        expires 365d;
        access_log off;
    }

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

<p>Test and reload:</p>

<pre><code class="language-bash">sudo nginx -t && sudo systemctl reload nginx</code></pre>

<h2>Step 5: HTTPS with Certbot</h2>

<pre><code class="language-bash">sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d kazinayeem.site -d www.kazinayeem.site</code></pre>

<p>Certbot auto-renews via systemd timer—verify with <code>sudo certbot renew --dry-run</code>.</p>

<h2>Deployment Script I Used for Bornosoft Updates</h2>

<pre><code class="language-bash">#!/bin/bash
set -e
cd /var/www/portfolio
git pull origin main
npm ci --omit=dev
npm run build
pm2 restart portfolio
echo "Deploy complete"</code></pre>

<p>Later I replaced this with GitHub Actions SSH deploy—but the script taught me what automation must replicate exactly.</p>

<h2>Environment Variables and Next.js</h2>

<p>Server-only secrets live in <code>.env.production</code> on EC2. Public vars need <code>NEXT_PUBLIC_</code> prefix. I once leaked an API key by prefixing wrong—rotate keys and learn.</p>

<div class="callout note"><strong>Note:</strong> For App Router API routes, ensure runtime env vars exist before PM2 start. PM2 ecosystem files help:</div>

<pre><code class="language-javascript">module.exports = {
  apps: [{
    name: "portfolio",
    script: ".next/standalone/server.js",
    env_production: {
      NODE_ENV: "production",
      PORT: 3000,
    },
  }],
};</code></pre>

<h2>Performance Tweaks on Small Instances</h2>

<ul>
<li>Enable gzip in Nginx for text assets.</li>
<li>Serve <code>/_next/static</code> directly from Nginx as shown.</li>
<li>Limit PM2 instances to 1 on t3.micro—memory is tight.</li>
<li>Add swap cautiously if builds fail OOM on server—better to build in CI and ship artifacts.</li>
</ul>

<h2>Monitoring and Logs</h2>

<pre><code class="language-bash">pm2 logs portfolio
pm2 monit
sudo tail -f /var/log/nginx/access.log</code></pre>

<p>I added UptimeRobot free HTTPS checks—simple external heartbeat alerting me during DIU exam weeks when I was not watching logs.</p>

<h2>Common Failures</h2>

<table>
<thead><tr><th>Issue</th><th>Fix</th></tr></thead>
<tbody>
<tr><td>502 Bad Gateway</td><td>PM2 process down; check logs</td></tr>
<tr><td>Static assets 404</td><td>Missing .next/static copy in standalone</td></tr>
<tr><td>SSL errors</td><td>Certbot renewal or wrong server_name</td></tr>
<tr><td>Build OOM</td><td>Build in CI; deploy artifacts only</td></tr>
</tbody>
</table>

<h2>Migration Path to Docker/ECS</h2>

<p>Once comfortable, containerize the same standalone output and push to ECR. Nginx moves to ALB or stays on EC2 with Docker Compose. EC2+PM2 knowledge makes container debugging easier—you know what the proxy and process manager were doing manually.</p>

<h2>Domain DNS Configuration on Route 53</h2>

<p>After EC2 and Nginx work locally via IP, point your domain with Route 53 or any registrar DNS:</p>

<ol>
<li>Create an A record for <code>@</code> pointing to Elastic IP.</li>
<li>Create a CNAME or A record for <code>www</code> if needed.</li>
<li>Wait for TTL propagation—often 5–30 minutes, sometimes longer from Bangladesh ISPs.</li>
<li>Verify HTTPS after DNS resolves before sharing client links.</li>
</ol>

<p>I once demoed a site via raw IP while DNS propagated—professionalism suffers. Plan deploys 24 hours before presentations when possible.</p>

<h2>Zero-Downtime Deploys with PM2</h2>

<p><code>pm2 reload portfolio</code> starts new workers before killing old ones—better than <code>restart</code> for brief connections. Pair reload with Nginx upstream health awareness for smoother updates. For tiny portfolios, seconds of blip may be acceptable; for Bornosoft client dashboards, reload mattered.</p>

<h2>Security Hardening Checklist</h2>

<ul>
<li>Disable SSH password auth; use keys only.</li>
<li>Enable automatic security updates on Ubuntu.</li>
<li>Configure UFW: allow 22, 80, 443; deny others.</li>
<li>Set <code>server_tokens off;</code> in Nginx to hide version banners.</li>
<li>Add rate limiting on <code>/api</code> routes if exposed.</li>
<li>Rotate SSH keys and IAM credentials each semester.</li>
</ul>

<div class="callout warning"><strong>Warning:</strong> Exposing MongoDB or Redis ports to 0.0.0.0/0 on EC2 is a common student mistake seen in Shodan scans. Bind internal services to localhost only.</div>

<h2>Cost Optimization for Long-Running EC2</h2>

<p>Reserved Instances or Savings Plans help if you commit 6–12 months. For experiments, stop instances when not demoing. Snapshot EBS volumes before major upgrades. Monitor Data Transfer Out charges if serving large media—CloudFront may become cheaper at scale.</p>

<h2>App Router Specific Notes</h2>

<p>Next.js App Router introduced server components and edge runtime options. On EC2, I stayed with Node standalone server for predictability. Edge middleware runs on Node runtime in this setup—test internationalization and auth middleware thoroughly on staging before production cutover.</p>

<h2>Conclusion</h2>

<p><strong>Deploying Next.js on AWS EC2 with Nginx and PM2</strong> taught me production fundamentals no tutorial abstracted: TLS, proxies, process supervision, and deploy scripts. It hosted my portfolio milestones and early Bornosoft demos on a student budget.</p>

<p>Start simple. Ship HTTPS. Automate repeats. Graduate to containers when complexity earns its keep—not when Twitter says so.</p>

<p>Deploy stuck on 502? Reach me at <a href="https://kazinayeem.site">kazinayeem.site</a>.</p>`,
  faqs: [
    {
      question: "PM2 or systemd for Next.js on EC2?",
      answer:
        "Both work. PM2 is developer-friendly with easy logs and cluster mode. systemd is more native to Linux servers. I started with PM2 for speed and moved some services to systemd later.",
    },
    {
      question: "Should I build Next.js on EC2 or in CI?",
      answer:
        "Build in CI when possible—EC2 micro instances often run out of memory during next build. Deploy the standalone artifact via rsync or SCP.",
    },
    {
      question: "Do I need Nginx if Next.js has a server?",
      answer:
        "For production HTTPS and static asset efficiency, yes. Nginx handles TLS, caching headers, and reverse proxy concerns Node should not own alone.",
    },
    {
      question: "Is EC2 deployment outdated compared to Vercel?",
      answer:
        "Vercel is excellent for many Next.js sites. EC2 teaches ops skills and suits custom requirements, budget control, or client mandates to avoid vendor lock-in.",
    },
  ],
  relatedSlugs: [
    "my-first-cicd-pipeline-github-actions",
    "from-nodejs-to-golang-learning-journey",
    "creating-portfolio-ranks-google",
  ],
});

export default post;
