import { createPost } from "../article-builder";

const post = createPost({
  slug: "my-first-cicd-pipeline-github-actions",
  title: "My First CI/CD Pipeline with GitHub Actions",
  seoTitle: "My First CI/CD Pipeline with GitHub Actions | Mohammad Ali Nayeem",
  subtitle:
    "How a DIU student automated Bornosoft deploys and stopped FTP-uploading builds at midnight",
  description:
    "Mohammad Ali Nayeem walks through building his first CI/CD pipeline with GitHub Actions—testing, Docker builds, ECR pushes, and EC2 deploys—for projects at Daffodil International University and Bornosoft.",
  category: "GitHub Actions",
  tags: ["GitHub Actions", "CI/CD", "Docker", "AWS", "DevOps"],
  keywords: [
    "first CI/CD pipeline GitHub Actions",
    "github actions deploy EC2",
    "student devops pipeline",
    "bornosoft deployment automation",
  ],
  publishedAt: "2024-10-08",
  updatedAt: "2024-11-02",
  featured: true,
  popular: true,
  coverImageAlt:
    "GitHub Actions workflow diagram showing test build and deploy stages",
  content: `<p>Before CI/CD, my deploy process at <strong>Bornosoft</strong> was embarrassingly manual: build on my laptop, zip artifacts, SCP to an EC2 instance, SSH in, restart PM2, pray nothing broke. I did this after DIU classes, often past midnight, always afraid I forgot an environment variable. The portfolio and client demos deserved better. My grades—and sanity—did too.</p>

<p>My first real <strong>CI/CD pipeline with GitHub Actions</strong> did not look like a Silicon Valley platform team setup. It was a YAML file that ran tests, built a Docker image, pushed to ECR, and SSH-deployed to a small EC2 box. That modest pipeline changed how I ship software as a <strong>Daffodil International University</strong> student founder. This article documents exactly what I built, what failed, and what I would recommend to any Bangladeshi student tired of manual deploy anxiety.</p>

<h2>What CI/CD Meant to Me Before and After</h2>

<p><strong>Before:</strong> Deployment was an event—a risky ceremony tied to my laptop state.<br/>
<strong>After:</strong> Deployment was a repeatable workflow triggered by <code>git push</code> with logs I could screenshot for professors and clients.</p>

<p>CI (Continuous Integration) meant every pull request ran lint and tests. CD (Continuous Delivery/Deployment) meant merged code could reach staging automatically with approval, then production with a manual gate initially.</p>

<div class="callout tip"><strong>Tip:</strong> Your first pipeline does not need Kubernetes and Terraform. It needs consistency more than glamour.</div>

<h2>Project Context: Bornosoft Client Dashboard API</h2>

<p>The guinea pig was a Node.js + TypeScript API backing a small client dashboard—not mission-critical national infrastructure, but real users waiting for bug fixes. Stack:</p>

<ul>
<li>Express API with PostgreSQL</li>
<li>Dockerfile multi-stage build</li>
<li>ECR for images</li>
<li>Single EC2 t3.small with Docker Compose in staging</li>
</ul>

<p>Goals for v1 pipeline:</p>

<ol>
<li>Block merge if tests fail.</li>
<li>Build and push image on main branch.</li>
<li>Deploy to staging EC2 automatically.</li>
<li>Keep secrets out of the repository.</li>
</ol>

<h2>Pipeline Architecture Overview</h2>

<pre><code class="language-text">PR opened → lint + test job
merge to main → build image → push ECR → deploy staging
tag v* → deploy production (manual approval)</code></pre>

<table>
<thead><tr><th>Stage</th><th>Trigger</th><th>Outcome</th></tr></thead>
<tbody>
<tr><td>CI</td><td>pull_request</td><td>Confidence before merge</td></tr>
<tr><td>Build</td><td>push to main</td><td>Immutable image in ECR</td></tr>
<tr><td>Deploy staging</td><td>after build</td><td>Running container on EC2</td></tr>
<tr><td>Deploy prod</td><td>release tag + approval</td><td>Controlled promotion</td></tr>
</tbody>
</table>

<h2>Step 1: CI Job on Pull Requests</h2>

<p>I started with the job that saves you from yourself:</p>

<pre><code class="language-yaml">name: CI

on:
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm test
        env:
          DATABASE_URL: postgres://test:test@localhost:5432/test</code></pre>

<p>Adding a Postgres service container came in v2 after integration tests appeared. For v1, unit tests alone already caught regressions I previously shipped during tired deploys.</p>

<div class="callout note"><strong>Note:</strong> GitHub Actions free minutes are enough for student repos if you cache dependencies and avoid running heavy jobs on every draft commit.</div>

<h2>Step 2: Secrets and Environments</h2>

<p>I stored secrets in GitHub repository settings:</p>

<ul>
<li><code>AWS_ACCESS_KEY_ID</code> and <code>AWS_SECRET_ACCESS_KEY</code> (IAM user scoped to ECR + minimal deploy)</li>
<li><code>EC2_HOST</code>, <code>EC2_USER</code>, <code>EC2_SSH_KEY</code></li>
<li><code>DATABASE_URL</code> per environment via GitHub Environments</li>
</ul>

<p>GitHub Environments let me add a manual approval gate for production—a lifesaver when classmates helped review but should not auto-ship prod.</p>

<div class="callout warning"><strong>Warning:</strong> Never print secrets in logs. Mask values and rotate keys if leaked. I learned this from a tutorial that echoed AWS tokens—embarrassing near-miss.</div>

<h2>Step 3: Build and Push Docker Image to ECR</h2>

<pre><code class="language-yaml">  build-push:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-southeast-1
      - uses: aws-actions/amazon-ecr-login@v2
        id: ecr
      - run: |
          IMAGE=\${{ steps.ecr.outputs.registry }}/bornosoft/dashboard-api
          docker build -t $IMAGE:\${{ github.sha }} -t $IMAGE:latest .
          docker push $IMAGE:\${{ github.sha }}
          docker push $IMAGE:latest</code></pre>

<p>Tagging with <code>github.sha</code> gave traceability: which commit is running in staging? Check the tag. No more mystery <code>latest</code> only deployments—though I kept <code>latest</code> for Compose convenience during early learning.</p>

<h2>Step 4: Deploy to EC2 via SSH</h2>

<p>Not the fanciest pattern, but student-practical:</p>

<pre><code class="language-yaml">  deploy-staging:
    needs: build-push
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - name: SSH deploy
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: \${{ secrets.EC2_HOST }}
          username: \${{ secrets.EC2_USER }}
          key: \${{ secrets.EC2_SSH_KEY }}
          script: |
            cd /opt/bornosoft/dashboard-api
            export IMAGE_TAG=\${{ github.sha }}
            docker compose pull
            docker compose up -d
            docker image prune -f</code></pre>

<p>On EC2, <code>docker-compose.yml</code> referenced the ECR image and loaded env from a server-side <code>.env</code> file created once manually—secrets not in Git.</p>

<h2>What Broke the First Three Times</h2>

<ol>
<li><strong>AMD64 vs ARM</strong> — Built on Apple Silicon locally once; EC2 failed mysteriously until I built on <code>ubuntu-latest</code> runners only.</li>
<li><strong>Missing ECR pull permissions</strong> — EC2 instance role needed <code>ecr:GetAuthorizationToken</code> and repository pull rights.</li>
<li><strong>Health check race</strong> — Compose restarted old container because new one was slow to boot. Added <code>healthcheck</code> in Compose file.</li>
<li><strong>Database migrations</strong> — Pipeline did not run migrations until I added a guarded step—staging broke after schema change.</li>
</ol>

<p>Each failure became a checklist item. CI/CD maturity is mostly accumulated scar tissue.</p>

<h2>Adding Database Migrations Safely</h2>

<pre><code class="language-yaml">      - name: Run migrations
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: \${{ secrets.EC2_HOST }}
          username: \${{ secrets.EC2_USER }}
          key: \${{ secrets.EC2_SSH_KEY }}
          script: |
            cd /opt/bornosoft/dashboard-api
            docker compose run --rm api npm run migrate</code></pre>

<p>I only ran migrations on staging automatically; production migrations required approval and backup confirmation from the client.</p>

<h2>How This Pipeline Helped My DIU DevOps Coursework</h2>

<p>Professors wanted diagrams and reproducibility. I submitted:</p>

<ul>
<li>Workflow YAML with comments</li>
<li>Architecture diagram (PR → CI → ECR → EC2)</li>
<li>Screenshot of green checks on a real Bornosoft PR</li>
<li>Rollback story: redeploy previous SHA tag</li>
</ul>

<p>Real pipelines beat theoretical slides. Classmates asked for my template—I sanitized secrets and shared a minimal repo structure.</p>

<h2>GitHub Actions vs Jenkins for Students</h2>

<p>I later explored Jenkins on EC2 for agent labs, but GitHub Actions won for Bornosoft because:</p>

<ul>
<li>Zero server maintenance for the controller</li>
<li>Native integration with our GitHub repos</li>
<li>Readable YAML in-repo history</li>
<li>Enough free minutes for student scale</li>
</ul>

<p>Jenkins still matters for enterprises and custom agent fleets—but Actions was the right first CI/CD home.</p>

<h2>Improvements I Added in Month Two</h2>

<ul>
<li><strong>Slack notifications</strong> on deploy failure (client peace of mind).</li>
<li><strong>Concurrency groups</strong> to cancel outdated runs on rapid pushes.</li>
<li><strong>OIDC to AWS</strong> instead of long-lived access keys—security upgrade worth the afternoon.</li>
<li><strong>Staging smoke test</strong> curling <code>/health</code> after deploy.</li>
</ul>

<h2>Debugging Failed Pipelines Like a Professional</h2>

<p>My first dozen red builds taught me more than any tutorial. When a job fails, I follow the same checklist every time:</p>

<ol>
<li><strong>Read the last 30 lines of logs</strong> — the real error is usually buried under npm warnings.</li>
<li><strong>Reproduce locally</strong> — run the exact command the workflow uses, including <code>CI=true</code> environment variables.</li>
<li><strong>Check cache invalidation</strong> — stale <code>node_modules</code> caches cause bizarre TypeScript errors.</li>
<li><strong>Verify secrets exist</strong> — missing <code>AWS_SECRET_ACCESS_KEY</code> fails late in deploy jobs with cryptic messages.</li>
<li><strong>Compare branch diffs</strong> — did a dependency bump break the Docker build context?</li>
</ol>

<div class="callout note"><strong>Note:</strong> Enable <strong>Actions log retention</strong> and download artifacts on failure. Screenshots of green builds do not help when production breaks at 2 AM.</div>

<p>I also maintain a <code>workflow_dispatch</code> trigger for manual redeploys when clients need hotfixes and I do not want to push empty commits. Small quality-of-life features like that separate hobby repos from Bornosoft production standards.</p>

<h2>Conclusion</h2>

<p>My first <strong>CI/CD pipeline with GitHub Actions</strong> was not perfect—it was SSH deploys and Docker Compose on a small EC2 instance. But it replaced midnight manual uploads with audited automation. That shift made me a more credible founder at Bornosoft and a stronger DevOps student at DIU.</p>

<p>If you still deploy by dragging files to a server, start smaller than this article: one test job on pull requests. Then add build. Then add deploy. Consistency compounds faster than heroics.</p>

<p>Want a sanitized workflow template? Message me through <a href="https://kazinayeem.site">kazinayeem.site</a>.</p>`,
  faqs: [
    {
      question: "Is GitHub Actions free for student projects?",
      answer:
        "Public repositories get generous Actions minutes. Private repos have a monthly free tier that is usually sufficient for small student and startup projects if you cache dependencies and avoid redundant jobs.",
    },
    {
      question: "Should my first pipeline deploy to EC2 or ECS?",
      answer:
        "EC2 with Docker Compose is simpler for first-time CD. ECS adds orchestration concepts worth learning later. Pick the path that matches your current AWS comfort level.",
    },
    {
      question: "How do I store secrets in GitHub Actions?",
      answer:
        "Use repository or environment secrets in GitHub settings, never commit .env files. Prefer OIDC federation to AWS over long-lived access keys when you are ready.",
    },
    {
      question: "What should run in CI before deploy?",
      answer:
        "At minimum: install dependencies, lint, and unit tests. Add integration tests and migration dry-runs as the project matures.",
    },
  ],
  relatedSlugs: [
    "jenkins-master-agent-setup-aws-ec2",
    "learning-docker-from-scratch",
    "deploying-nextjs-aws-ec2-nginx-pm2",
  ],
});

export default post;
