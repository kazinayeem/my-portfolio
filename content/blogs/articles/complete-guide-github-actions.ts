import { createPost } from "../article-builder";

const post = createPost({
  slug: "complete-guide-github-actions",
  title: "Complete Guide to GitHub Actions for Students",
  seoTitle: "Complete Guide to GitHub Actions | Mohammad Ali Nayeem",
  subtitle: "CI/CD workflows that take your portfolio and Bornosoft repos from commit to deploy",
  description: "A practical GitHub Actions guide by DIU student Mohammad Ali Nayeem: workflow syntax, testing pipelines, Docker builds, deployment secrets, and patterns used across portfolio and Bornosoft projects.",
  category: "GitHub Actions",
  tags: ["GitHub Actions","CI/CD","DevOps","Automation","Docker","Testing"],
  keywords: ["github actions tutorial","github actions ci cd guide","github actions nodejs deploy","student devops pipeline"],
  publishedAt: "2025-04-12",
  updatedAt: "2025-05-02",
  featured: false,
  popular: true,
  coverImageAlt: "GitHub Actions workflow diagram showing build test and deploy jobs",
  content: `<p>Every Bornosoft repository and my personal portfolio share a silent teammate: <strong>GitHub Actions</strong>. As <strong>Mohammad Ali Nayeem</strong>, Software Engineering student at <strong>Daffodil International University (DIU)</strong> in Bangladesh, I treat CI/CD not as enterprise luxury but as homework for future me— the person who deploys at midnight before a client demo.</p>

<p>This guide collects patterns I use daily: workflow anatomy, testing, Docker, deployments, secrets, and mistakes from real student projects.</p>

<h2>Why GitHub Actions for Students?</h2>

<ul>
<li>Zero separate CI server to maintain</li>
<li>YAML lives beside code—reviewable in pull requests</li>
<li>Free minutes for public repos; Education perks for private work</li>
<li>Marketable skill—appears in most modern job descriptions</li>
</ul>

<div class="callout tip"><strong>Tip:</strong> Enable Actions on a throwaway repo first. Break workflows intentionally to learn where logs appear before wiring production deploys.</div>

<h2>Workflow Anatomy</h2>

<pre><code class="language-yaml">name: CI

on:
  push:
    branches: [main]
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
      - run: npm test
      - run: npm run build</code></pre>

<p>Key concepts:</p>

<ul>
<li><strong>on:</strong> triggers (push, PR, schedule, workflow_dispatch)</li>
<li><strong>jobs:</strong> parallel units of work</li>
<li><strong>steps:</strong> sequential commands or marketplace actions</li>
<li><strong>runs-on:</strong> GitHub-hosted runners (ubuntu, windows, macos)</li>
</ul>

<h2>Matrix Builds for Multiple Versions</h2>

<pre><code class="language-yaml">strategy:
  matrix:
    node-version: [18, 20, 22]
steps:
  - uses: actions/setup-node@v4
    with:
      node-version: ${{ matrix.node-version }}</code></pre>

<p>Matrix jobs catch "works on my laptop" Node version drift—common in group DIU assignments.</p>

<h2>Caching Dependencies</h2>

<p>Without cache, every run downloads npm or pip packages—slow and wasteful. Use built-in cache keys tied to lockfiles:</p>

<pre><code class="language-yaml">- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: npm</code></pre>

<div class="callout note"><strong>Note:</strong> Cache misses after lockfile changes are normal. Do not commit <code>node_modules</code> to fix CI speed.</div>

<h2>Running Tests with Coverage Gates</h2>

<pre><code class="language-yaml">- name: Test with coverage
  run: npm run test:coverage

- name: Upload coverage
  uses: codecov/codecov-action@v4
  with:
    token: ${{ secrets.CODECOV_TOKEN }}</code></pre>

<p>Start without gates; add minimum coverage once tests stabilize. False gates teach teammates to disable CI—worse than no gate.</p>

<h2>Docker Build and Push</h2>

<pre><code class="language-yaml">jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: ghcr.io/kazinayeem/api:${{ github.sha }}</code></pre>

<p>Immutable tags per commit simplify rollbacks. Promote SHA tags to <code>latest</code> only after smoke tests pass.</p>

<h2>Deploying to a VPS</h2>

<p>For student budgets, a single DigitalOcean or AWS Lightsail box works:</p>

<ol>
<li>Build image in CI</li>
<li>SSH or pull via deploy key</li>
<li><code>docker compose pull && docker compose up -d</code></li>
<li>Health check curl against /api/health</li>
</ol>

<pre><code class="language-yaml">- name: Deploy
  uses: appleboy/ssh-action@v1
  with:
    host: ${{ secrets.VPS_HOST }}
    username: deploy
    key: ${{ secrets.VPS_SSH_KEY }}
    script: |
      cd /opt/bornosoft-api
      docker compose pull
      docker compose up -d</code></pre>

<div class="callout warning"><strong>Warning:</strong> Never print secrets in logs. GitHub masks secrets, but echoing them in scripts still leaks via creative expansion bugs.</div>

<h2>Environments and Protection Rules</h2>

<table>
<thead><tr><th>Environment</th><th>Purpose</th><th>Protection</th></tr></thead>
<tbody>
<tr><td>staging</td><td>Auto deploy from main</td><td>Optional reviewers</td></tr>
<tr><td>production</td><td>Tagged releases</td><td>Required reviewers + wait timer</td></tr>
</tbody>
</table>

<p>Environments store environment-scoped secrets—production DB URLs separate from staging.</p>

<h2>Reusable Workflows</h2>

<p>When portfolio, Bornosoft API, and class repos share identical lint/test steps, extract a reusable workflow:</p>

<pre><code class="language-yaml"># .github/workflows/reusable-node-ci.yml
on:
  workflow_call:
    inputs:
      node-version:
        required: false
        type: string
        default: "20"</code></pre>

<p>DRY YAML saves time when you maintain more than three repositories—which DIU builders will.</p>

<h2>Scheduled Jobs</h2>

<pre><code class="language-yaml">on:
  schedule:
    - cron: "0 3 * * 0"  # weekly Sunday 03:00 UTC</code></pre>

<p>I run dependency audit workflows weekly and Lighthouse CI against my portfolio—catching regressions before recruiters do.</p>

<h2>Common Failures I Debugged</h2>

<ol>
<li><strong>Permission denied pushing to GHCR</strong> — set <code>packages: write</code> in job permissions.</li>
<li><strong>Flaky E2E tests</strong> — retry strategy only after fixing root timing issues.</li>
<li><strong>Wrong default branch</strong> — workflows on <code>master</code> while repo uses <code>main</code>.</li>
<li><strong>Out of minutes</strong> — path filters to skip docs-only commits.</li>
</ol>

<h2>Actions vs Alternatives</h2>

<p>Jenkins taught me pipelines on EC2 labs; GitHub Actions won for portfolio velocity. GitLab CI is similar if your university uses GitLab. Learn concepts once—triggers, artifacts, secrets, stages.</p>

<h2>Security Checklist</h2>

<ul>
<li>Pin third-party actions to commit SHAs for sensitive repos</li>
<li>Least-privilege <code>GITHUB_TOKEN</code></li>
<li>OIDC to cloud instead of long-lived AWS keys when possible</li>
<li>Dependabot enabled</li>
</ul>

<h2>Conclusion</h2>

<p>A <strong>complete GitHub Actions guide</strong> for students is really a habit guide: test on every PR, build containers you can run locally, deploy with rollback in mind. My DIU coursework improved when professors saw GitHub checks green before grading merges.</p>

<p>Start with the CI snippet in this article on your next Node or Next.js repo. Then add Docker. Then deploy. Bornosoft clients never see the YAML, but they feel the reliability it creates.</p>

<p>Workflow questions? Find me at <a href="https://kazinayeem.site">kazinayeem.site</a>.</p>`,
  faqs: [
      {
          "question": "Are GitHub Actions free for students?",
          "answer": "Public repositories get generous free minutes. Private repos have monthly limits on free accounts; GitHub Education perks may increase allowances. Monitor usage in repository settings."
      },
      {
          "question": "Should I run tests on every push?",
          "answer": "Yes for main branches and pull requests. Use path filters or workflow_dispatch for expensive jobs like full E2E suites so you do not burn minutes on README edits."
      },
      {
          "question": "How do I store API keys in Actions?",
          "answer": "Use GitHub Secrets and Environment secrets—never commit .env files. Reference them in workflows as ${{ secrets.MY_KEY }} and restrict environment protection rules on production."
      },
      {
          "question": "Actions vs Jenkins for learning?",
          "answer": "Start with Actions for portfolio velocity—it lives next to your code. Learn Jenkins when you need on-prem agents or complex enterprise pipelines; many concepts transfer directly."
      }
  ],
  relatedSlugs: ["building-rest-apis-nodejs","docker-vs-virtual-machines","building-production-ready-full-stack-applications"],
});

export default post;
