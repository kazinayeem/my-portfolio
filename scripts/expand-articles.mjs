#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const path = join(__dirname, "article-bodies-14-25.mjs");
let src = readFileSync(path, "utf8");

const EXPANSIONS = {
  ARTICLE_15: `
<h2>Debugging Detection Failures in the Field</h2>

<p>When my first YOLO model looked perfect on validation images but failed on live campus footage, I learned that computer vision debugging is forensic work. I exported false positive frames into a folder called <code>hard-negatives</code> and retrained with them weighted higher. I logged per-class precision weekly so regressions after architecture tweaks were obvious.</p>

<p>Common failure modes in Dhaka scenes included: motion blur on auto-rickshaws, partial occlusion behind buses, reflective puddles after rain, and confusing shadows with road cracks. Each required targeted data—not more random images from the internet.</p>

<h3>Label Quality Checklist</h3>

<ul>
<li>Boxes tight around objects without excessive padding</li>
<li>Consistent policy for occluded objects (label if &gt;40% visible)</li>
<li>Same class names across annotators with a shared style guide</li>
<li>Review 10% of labels blindly each week</li>
</ul>

<div class="callout tip"><strong>Tip:</strong> Train a tiny model on 50 images before scaling labeling. Bad taxonomy discovered early saves weeks.</div>

<h2>Comparing YOLO to Other Detectors (Student Perspective)</h2>

<table>
<thead><tr><th>Detector Family</th><th>Speed</th><th>Beginner Friendliness</th></tr></thead>
<tbody>
<tr><td>YOLO (Ultralytics)</td><td>Excellent</td><td>High CLI support</td></tr>
<tr><td>Faster R-CNN</td><td>Slower</td><td>Lower—more plumbing</td></tr>
<tr><td>SSD</td><td>Good</td><td>Medium</td></tr>
<tr><td>DETR transformers</td><td>Variable</td><td>Research-oriented</td></tr>
</tbody>
</table>

<p>For DIU semester timelines, YOLO wins on documentation and pretrained weights. Explore others in graduate study or research electives.</p>

<h2>Integrating YOLO With Backend Services</h2>

<p>Detection is step one. Bornosoft dashboards needed counts, alerts, and historical charts. I POSTed summarized JSON to Node.js APIs rather than streaming raw tensors. Schema design mattered as much as mAP:</p>

<pre><code class="language-json">{
  "cameraId": "gate-a",
  "timestamp": "2025-03-14T10:22:01Z",
  "counts": { "person": 12, "car": 8, "bus": 2 },
  "alerts": []
}</code></pre>

<p>Version your event schema when adding fields—mobile clients and dashboards break silently otherwise.</p>

<h2>Ethics and Public Space Vision</h2>

<p>As a Bangladeshi student, I take consent and retention seriously. Avoid facial recognition in class demos unless ethics-reviewed. Blur faces in stored training samples when possible. Document limitations in viva presentations—professors respect honesty over inflated accuracy claims.</p>
`,
  ARTICLE_16: `
<h2>Team Roles and DIU Collaboration</h2>

<p>Our team split responsibilities: two members on dataset and labeling, one on inference pipeline, one on API and dashboard, and I coordinated integration. Weekly standups in the DIU lab kept scope visible. GitHub Projects tracked tasks better than WhatsApp threads alone.</p>

<p>Cross-functional friction appeared when API contracts changed without notice. We adopted OpenAPI specs generated from Zod schemas so frontend and backend negotiated against a single file in Git.</p>

<h2>Calibration UI Deep Dive</h2>

<p>Drawing detection zones on a still frame sounds trivial until operators rotate cameras slightly. We built a calibration mode overlaying polygons on a reference image, storing normalized coordinates so resolution changes did not break zones.</p>

<pre><code class="language-typescript">type Zone = {
  id: string;
  label: string;
  points: [number, number][]; // normalized 0-1
};</code></pre>

<div class="callout tip"><strong>Tip:</strong> Let operators preview counts on recorded clips before enabling live alerts. False alarms erode trust fast.</div>

<h2>Load Testing the Event API</h2>

<p>Before demo day we simulated 50 cameras posting events every two seconds using a k6 script. PostgreSQL indexes on <code>(camera_id, occurred_at)</code> prevented query melts. We added read replicas only on paper for the report—honest about scale limits.</p>

<h2>Future Extensions We Scoped But Deferred</h2>

<ul>
<li>License plate recognition (legal review needed)</li>
<li>Predictive congestion ML (insufficient historical data)</li>
<li>Multi-city federation (ops complexity)</li>
</ul>

<p>Deferring features disciplined the viva narrative: we shipped core value instead of a wish list.</p>

<h2>Presenting the Project to Faculty</h2>

<p>Our strongest viva slides showed failure cases: rain, night glare, missed rickshaws. Faculty praised reproducible Docker setup and dataset documentation. Grades rewarded engineering process, not only detection percentages.</p>
`,
  ARTICLE_17: `
<h2>Pull Request Workflows for DIU Teams</h2>

<p>Actions shine when paired with branch protection: require status checks before merge to <code>main</code>. DIU group projects stopped "push directly and pray" culture once CI blocked broken builds.</p>

<pre><code class="language-yaml">on:
  pull_request:
    branches: [main]
jobs:
  lint-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run lint && npm test</code></pre>

<h2>Artifacts and Caching Build Outputs</h2>

<p>Upload build artifacts for downstream deploy jobs:</p>

<pre><code class="language-yaml">- uses: actions/upload-artifact@v4
  with:
    name: dist
    path: dist/</code></pre>

<p>Artifacts let you deploy exactly what CI built—no rebuild surprises on the server.</p>

<h2>Monorepo Strategies</h2>

<p>Portfolio repos with Next.js web and shared packages benefit from path filters:</p>

<pre><code class="language-yaml">on:
  push:
    paths:
      - "apps/web/**"
      - "packages/**"</code></pre>

<div class="callout note"><strong>Note:</strong> Nx or Turborepo remote caching is overkill for homework; native npm workspaces plus Actions cache suffices for most students.</div>

<h2>Notifications and Failure Triage</h2>

<p>Configure workflow failure emails or Slack webhooks for Bornosoft production deploys. For class repos, a Discord ping suffices. Include links to failed job logs in messages—future you is tired you.</p>

<h2>Security Hardening for Workflows</h2>

<ul>
<li>Limit <code>GITHUB_TOKEN</code> permissions per job</li>
<li>Use environments for production secrets</li>
<li>Review third-party actions like npm dependencies</li>
<li>Enable Dependabot for workflow action updates</li>
</ul>

<h2>Local Act Testing</h2>

<p><code>act</code> runs workflows locally with Docker—useful when iterating YAML without burning minutes. It is not perfect but catches syntax errors early during late-night Dhaka coding sessions.</p>
`,
  ARTICLE_18: `
<h2>Versioning and Breaking Changes</h2>

<p>Public APIs need version prefixes (<code>/api/v1</code>) or explicit deprecation headers. Bornosoft clients on slow upgrade cycles appreciated six-month deprecation windows with changelog emails.</p>

<h2>File Uploads and Media Handling</h2>

<p>Multipart uploads belong behind size limits and virus scanning hooks when handling user content. Store blobs in S3-compatible object storage; serve via signed URLs—not through Express memory buffers.</p>

<pre><code class="language-typescript">const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!allowedMime.includes(file.mimetype)) return cb(new Error("Invalid type"));
    cb(null, true);
  },
});</code></pre>

<h2>Background Jobs</h2>

<p>Email sends, report generation, and webhook retries should not block HTTP threads. BullMQ with Redis is my default for Node services that outgrow homework scale.</p>

<div class="callout tip"><strong>Tip:</strong> Start with inline async jobs plus a dead-letter log table before adopting queues—understand failure modes first.</div>

<h2>API Gateway and Rate Limiting at Scale</h2>

<p>When Bornosoft APIs faced bursty client traffic, we placed NGINX or cloud load balancers in front with rate limits per API key. Express-rate-limit still guards auth endpoints at the app layer.</p>

<h2>Observability Middleware</h2>

<pre><code class="language-typescript">app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    logger.info({ method: req.method, path: req.path, ms: Date.now() - start });
  });
  next();
});</code></pre>

<h2>Interview Preparation From API Work</h2>

<p>DIU students ask how APIs help hiring. Explain idempotency keys for payments, pagination cursors vs offsets, and why 422 beats 400 for validation—interviewers notice practical HTTP literacy.</p>
`,
  ARTICLE_19: `
<h2>Tool Selection Matrix for Coursework Types</h2>

<table>
<thead><tr><th>Task</th><th>Recommended Tool</th><th>Caution</th></tr></thead>
<tbody>
<tr><td>Data structures assignment</td><td>None or offline only</td><td>Policy risk</td></tr>
<tr><td>Web project boilerplate</td><td>Cursor/Copilot</td><td>Review security</td></tr>
<tr><td>Vision labeling scripts</td><td>ChatGPT + manual review</td><td>Hallucinated paths</td></tr>
<tr><td>DevOps YAML</td><td>Cursor agent</td><td>Validate permissions</td></tr>
</tbody>
</table>

<h2>Prompt Engineering for Developers</h2>

<p>Specific prompts beat vague ones. Include stack, constraints, and failure logs. Ask for tradeoffs, not only code. Request test cases alongside implementation.</p>

<pre><code class="language-text">Bad: "fix my API"
Good: "Express 4 + Prisma, POST /users returns 500 when
duplicate email; schema attached; suggest fix + test"</code></pre>

<h2>Building Personal AI Policies</h2>

<p>I maintain a private <code>AI-USAGE.md</code> in repos documenting which tools assisted which files. Transparency builds trust with Bornosoft clients and DIU partners.</p>

<div class="callout warning"><strong>Warning:</strong> Some employers ban certain AI tools on client code. Read contracts before indexing proprietary repositories in cloud assistants.</div>

<h2>Measuring Productivity Gains Honestly</h2>

<p>Track weekly: features shipped, bugs introduced, time spent reviewing AI diffs. If review time dominates, tighten prompts or smaller task scopes. AI should reduce toil, not create review debt.</p>

<h2>Community and Open Source AI Tools</h2>

<p>Follow Ultralytics, Hugging Face, and local Bangladesh developer groups sharing responsible AI workflows. Hype cycles pass; communities persist.</p>
`,
  ARTICLE_20: `
<h2>Semester-by-Semester Project Log</h2>

<p>Keeping a project log helped internships interviews:</p>

<ul>
<li><strong>Year 1:</strong> CLI tools, basic web pages, Git learning</li>
<li><strong>Year 2:</strong> Full stack CRUD, database design, Bornosoft landing clients</li>
<li><strong>Year 3:</strong> YOLO road monitoring, Docker labs, portfolio SEO blog</li>
</ul>

<h2>Study Groups and Peer Teaching</h2>

<p>Teaching GPIO wiring to juniors solidified my own understanding. DIU study circles for algorithms met twice weekly before midterms—accountability beats solo cramming.</p>

<div class="callout tip"><strong>Tip:</strong> Record short Loom-style walkthroughs of your projects; future you forgets wiring details after holidays.</div>

<h2>Handling Imposter Syndrome</h2>

<p>Social media highlights reels, not retakes. I felt behind classmates with internship logos while I was still learning Docker. Comparison lied—depth on fewer repos mattered more in interviews I actually got.</p>

<h2>Facilities and Lab Resources</h2>

<p>Use campus labs during off-peak hours. Respect equipment sign-out policies. Report broken machines—maintenance backlog hurts everyone. Bring your own SD cards for Pi experiments when possible.</p>

<h2>Planning Life After DIU</h2>

<p>Graduation is not a cliff. I map skills to roles: platform engineer, ML engineer, full stack founder. The map flexes quarterly. Courses provide foundation; side projects provide differentiation.</p>

<h2>Giving Back to the Cohort</h2>

<p>I answer freshmen DMs about tool choices and verification flows (Cursor Pro, GitHub Education). Dhaka's developer community grows when seniors document paths openly—this blog is part of that habit.</p>
`,
  ARTICLE_21: `
<h2>State Management in React vs Next.js</h2>

<p>React SPAs often pair with Zustand, Redux Toolkit, or TanStack Query for server state. Next.js App Router encourages fetching on the server and passing props—less client state overall. Overusing global client stores in Next.js fights the framework.</p>

<h2>Styling Approaches</h2>

<ul>
<li>Tailwind CSS works in both ecosystems</li>
<li>CSS Modules supported in Next.js without extra config</li>
<li>Component libraries (shadcn/ui) integrate cleanly with Next</li>
</ul>

<h2>Authentication Patterns</h2>

<p>Next.js simplifies cookie-based sessions with server components checking auth before render. React SPAs typically use JWT in memory plus refresh dance—doable but more client complexity.</p>

<pre><code class="language-typescript">// Next.js middleware sketch
export function middleware(req: NextRequest) {
  if (!req.cookies.get("session")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}</code></pre>

<div class="callout note"><strong>Note:</strong> Never store JWTs in localStorage if XSS is in your threat model—HttpOnly cookies prefer server frameworks.</div>

<h2>Bundle Analysis Habits</h2>

<p>Run <code>@next/bundle-analyzer</code> or Vite rollup visualizer each sprint. DIU demos on slow lab PCs reveal bloat classroom Wi-Fi hides on developer MacBooks.</p>

<h2>Migration Story: SPA to Next.js</h2>

<p>I migrated a Bornosoft marketing SPA to Next.js for SEO wins. Steps: extract components, move routes file-by-file, add metadata exports, deploy preview on Vercel. Took two weekends—not a big bang rewrite.</p>

<h2>Framework Churn Advice</h2>

<p>React 19 and Next.js releases will continue. Learn stable concepts—components, routing, data fetching boundaries—so release notes are diffs, not earthquakes.</p>
`,
  ARTICLE_22: `
<h2>Storage and Volume Management</h2>

<p>Docker volumes persist database data across container restarts. Bind mounts suit hot-reload dev workflows. VMs use virtual disks managed by hypervisor—different backup semantics.</p>

<pre><code class="language-bash">docker volume create pgdata
docker run -v pgdata:/var/lib/postgresql/data postgres:16</code></pre>

<h2>Networking Models</h2>

<p>Docker bridge networks isolate compose stacks. VMs get virtual NICs on NAT or bridged modes. Understanding IP assignment prevents "works on my machine" SSH mysteries during DIU labs.</p>

<h2>Windows and macOS Student Setups</h2>

<p>WSL2 integration lets Windows students run Linux containers natively enough for coursework. macOS Docker Desktop file sync can be slow—place node_modules in named volumes as workaround.</p>

<div class="callout tip"><strong>Tip:</strong> Document your OS-specific quirks in repo README—lab partners replicate environments faster.</div>

<h2>Snapshot and Rollback Strategies</h2>

<p>VM snapshots before risky OS upgrades saved my Jenkins lab twice. Docker image tags (<code>api:sha-abc</code>) provide similar rollback for apps—not for persistent DB state without migration discipline.</p>

<h2>Compliance and Licensing Awareness</h2>

<p>Container images bundle OSS licenses. VMs running Windows need proper licensing. Bornosoft client contracts sometimes mandate data residency—VM region choice matters legally, not only technically.</p>

<h2>Hands-On Lab Assignment</h2>

<ol>
<li>Deploy nginx on Ubuntu VM manually</li>
<li>Containerize same nginx with custom config</li>
<li>Benchmark boot time and disk footprint</li>
<li>Write one-page comparison for class submission</li>
</ol>
`,
  ARTICLE_23: `
<h2>Import and Target Blocks</h2>

<p>Splitting infrastructure across files improves readability:</p>

<pre><code class="language-hcl"># networking.tf
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

# compute.tf
resource "aws_instance" "app" {
  ami           = var.ami_id
  instance_type = "t3.micro"
  subnet_id     = aws_subnet.public.id
}</code></pre>

<h2>Data Sources vs Resources</h2>

<p>Data sources read existing infrastructure (latest AMI IDs, caller identity). Resources create or mutate. Confusing them causes plan surprises.</p>

<h2>Lifecycle Meta-Arguments</h2>

<pre><code class="language-hcl">resource "aws_instance" "app" {
  lifecycle {
    prevent_destroy = true
    ignore_changes  = [ami]
  }
}</code></pre>

<div class="callout warning"><strong>Warning:</strong> prevent_destroy saves production; remove it on throwaway lab instances or cleanup gets annoying.</div>

<h2>Formatting and Validation</h2>

<pre><code class="language-bash">terraform fmt -recursive
terraform validate</code></pre>

<p>Add pre-commit hooks in team Bornosoft repos so formatting debates never reach PR comments.</p>

<h2>Drift Detection</h2>

<p>Manual console edits cause drift—Terraform wants to revert them on next apply. Run scheduled <code>terraform plan</code> in CI read-only mode for staging accounts.</p>

<h2>Cost Estimation Tools</h2>

<p>Use Infracost in PR comments for awareness. Students still delete resources after labs—I set calendar reminders every Sunday during AWS experiment weeks.</p>
`,
  ARTICLE_24: `
<h2>Feature Flags and Gradual Rollout</h2>

<p>Even student production apps benefit from toggling risky features. LaunchDarkly is enterprise; simple env-based flags suffice early:</p>

<pre><code class="language-typescript">const enableBeta = process.env.FEATURE_BETA === "true";</code></pre>

<h2>Database Backup Drills</h2>

<p>Monthly restore test from backup to local Docker Postgres—not optional. Bornosoft once assumed backups worked; they did not until tested.</p>

<h2>Incident Response Template</h2>

<ol>
<li>Acknowledge alert in Slack</li>
<li>Check recent deploys and error dashboards</li>
<li>Rollback or hotfix branch</li>
<li>Postmortem within 48 hours—blameless</li>
</ol>

<div class="callout note"><strong>Note:</strong> Postmortems are learning gold for DIU portfolios—redact client names, publish sanitized versions.</div>

<h2>Accessibility and Internationalization</h2>

<p>Production includes Bangla/English copy plans, RTL readiness if needed, and keyboard navigation. Lighthouse accessibility audits in CI catch regressions.</p>

<h2>Legal Pages and Compliance</h2>

<p>Privacy policy, terms, cookie notice—for Bornosoft client sites these are contractual. Student portfolios collecting emails need basic GDPR-style disclosure habits even if primarily Bangladesh-focused.</p>

<h2>Performance Budgets</h2>

<table>
<thead><tr><th>Metric</th><th>Target</th></tr></thead>
<tbody>
<tr><td>LCP</td><td>&lt; 2.5s</td></tr>
<tr><td>API p95</td><td>&lt; 300ms reads</td></tr>
<tr><td>Error rate</td><td>&lt; 0.1% steady state</td></tr>
</tbody>
</table>

<h2>On-Call Realities for Students</h2>

<p>You are your own on-call initially. PagerDuty is overkill; UptimeRobot SMS free tier suffices. Sleep matters—schedule deploys before 10 PM when possible.</p>
`,
  ARTICLE_25: `
<h2>Networking and Mentorship Goals</h2>

<p>Roadmaps are not solo. I aim for two mentor relationships—one technical senior, one founder-style operator—and peer circles inside DIU and global remote communities. Twitter/X and LinkedIn are noisy; curated newsletters and meetups return better signal.</p>

<h2>Reading List and Continuous Learning</h2>

<ul>
<li><strong>Books:</strong> Designing Data-Intensive Applications, Site Reliability Engineering (select chapters)</li>
<li><strong>Papers:</strong> skimming arXiv abstracts for vision trends—not deep diving every week</li>
<li><strong>Courses:</strong> AWS Skill Builder, Kaggle micro-courses between semesters</li>
</ul>

<h2>Financial Planning for Tools and Certs</h2>

<p>Exam fees and cloud bills compete with living costs in Dhaka. I budget monthly: one cert fund slice, one cloud experiment cap, reinvest Bornosoft revenue into tools that repay hours.</p>

<div class="callout tip"><strong>Tip:</strong> GitHub Student Pack and AWS Educate credits stretch budgets—verify eligibility each academic year.</div>

<h2>Health and Sustainability</h2>

<p>Five-year roadmaps fail if you burn out in year two. Gym walks, family time, and saying no to bad-fit clients keep Bornosoft compatible with graduation.</p>

<h2>Contributing Back to Bangladesh Tech</h2>

<p>Goals include open datasets (ethics-reviewed), free workshop materials for DIU juniors, and hiring interns from my cohort when Bornosoft scales. Rising tide metaphors are cliché—but local mentorship gaps are real.</p>

<h2>Scenario Planning</h2>

<table>
<thead><tr><th>Scenario</th><th>Response</th></tr></thead>
<tbody>
<tr><td>AI hiring cools</td><td>Double down on DevOps depth</td></tr>
<tr><td>Remote roles tighten</td><td>Local product companies + consulting</td></tr>
<tr><td>Bornosoft grows fast</td><td>Defer some certs, hire carefully</td></tr>
</tbody>
</table>

<p>Roadmaps should include branches, not only straight lines.</p>
`,
};

for (const [key, block] of Object.entries(EXPANSIONS)) {
  const marker = `<h2>Conclusion</h2>`;
  const exportName = `export const ${key}`;
  const start = src.indexOf(exportName);
  if (start === -1) throw new Error(`Missing ${key}`);
  const slice = src.slice(start);
  const conclusionIdx = slice.indexOf(marker);
  if (conclusionIdx === -1) throw new Error(`Missing conclusion in ${key}`);
  const absIdx = start + conclusionIdx;
  if (slice.slice(conclusionIdx - 50, conclusionIdx).includes(block.trim().slice(0, 30))) {
    console.log(`Skip ${key} (already expanded)`);
    continue;
  }
  src = src.slice(0, absIdx) + block + "\n\n" + src.slice(absIdx);
  console.log(`Expanded ${key}`);
}

writeFileSync(path, src, "utf8");
console.log("Done.");
