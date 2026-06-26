#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const path = join(__dirname, "article-bodies-14-25.mjs");
let src = readFileSync(path, "utf8");

const ROUND2 = {
  ARTICLE_16: `
<h2>Stakeholder Feedback Sessions</h2>

<p>We invited two campus security staff members to a feedback session mid-semester. They cared about alert noise, not model architecture. We added a mute window during known construction hours and a big red "camera offline" banner—UX changes that improved trust more than a 2% mAP gain.</p>

<p>Recording short Loom demos for stakeholders who could not attend live reviews kept alignment async. Written meeting notes in the repo <code>docs/</code> folder prevented "you never told us" disputes before final presentation.</p>
`,
  ARTICLE_17: `
<h2>Deploying Next.js and Node From One Monorepo</h2>

<p>Bornosoft monorepos often run separate workflows per package using matrix paths. Web deploys to Vercel; API deploys via Docker to VPS. Shared lint workflow runs on any TypeScript change. Document each workflow's purpose in <code>.github/README.md</code> so new contributors are not intimidated by YAML walls.</p>

<p>Concurrency groups cancel outdated runs on rapid PR pushes—saves minutes when you are iterating CSS at 1 AM before a DIU deadline.</p>

<pre><code class="language-yaml">concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true</code></pre>
`,
  ARTICLE_18: `
<h2>Webhooks and Idempotency</h2>

<p>Payment and notification integrations demand idempotency keys. Store processed event IDs in Redis or a database table with TTL to survive provider retries without double-charging clients.</p>

<pre><code class="language-typescript">if (await processedEvents.has(event.id)) {
  return res.status(200).json({ ok: true, duplicate: true });
}
await handlePayment(event);
await processedEvents.add(event.id);</code></pre>

<p>Webhook signature verification (HMAC) is non-negotiable for Bornosoft fintech-adjacent prototypes—never parse body before validating signature header.</p>
`,
  ARTICLE_19: `
<h2>AI in the Hiring Loop</h2>

<p>Recruiters increasingly ask how candidates use AI. Honest answers win: "I use Cursor for boilerplate and tests, but I design schemas and review security myself." Memorizing AI buzzwords without shipping projects fools no one in technical interviews.</p>

<p>Prepare a 60-second story: problem, tool, review step, outcome. That narrative beats listing twelve apps you tried once.</p>
`,
  ARTICLE_20: `
<h2>Courses I Would Retake Mindfully</h2>

<p>Software Engineering process courses felt dry until Bornosoft forced real requirements gathering. Retaking those concepts through client work inverted the boredom—I wish I had volunteered as note-taker in more cross-team DIU projects earlier to practice facilitation skills that complement coding.</p>

<p>Mathematics courses support ML intuition; do not skip office hours when proofs confuse you—vision papers assume linear algebra comfort.</p>
`,
  ARTICLE_21: `
<h2>SEO Checklist: React SPA vs Next.js</h2>

<ul>
<li>Unique title and meta description per route</li>
<li>Open Graph images for social shares</li>
<li>Structured data JSON-LD for articles and person schema</li>
<li>Sitemap.xml and robots.txt</li>
<li>Canonical URLs avoiding duplicate content</li>
</ul>

<p>Next.js metadata API centralizes these concerns. React SPAs need react-helmet-async plus prerender services or SSR add-ons—extra glue students forget until Google Search Console shows indexing issues.</p>
`,
  ARTICLE_22: `
<h2>Container Image Hardening Basics</h2>

<p>Run as non-root user, use minimal base images (alpine or distroless), scan with Trivy in CI, and pin image digests for production deploys. VMs need OS patching schedules; containers need image rebuild pipelines—both are operational work, not one-time setup.</p>

<p>Distroless images confuse beginners but teach dependency clarity—worth trying once on a Bornosoft side service after you are comfortable with Dockerfile debugging.</p>
`,
  ARTICLE_23: `
<h2>Terraform Cloud and Team Collaboration</h2>

<p>Free Terraform Cloud workspaces suit student teams needing remote runs and state locking without wiring S3 yourself. Connect VCS, trigger plans on PRs, require approvals before apply to shared staging—mirrors professional workflows on a budget.</p>

<p>Practice writing meaningful PR comments from plan output: "this adds port 443 ingress from 0.0.0.0/0—intentional for public web?" Security review beats blind apply clicks.</p>
`,
  ARTICLE_24: `
<h2>Staging Environments That Mirror Production</h2>

<p>Staging should use the same Docker images, environment variable shape, and database engine as production—only scaled down. Mocking Postgres with SQLite in staging hid migration bugs for me once; never again.</p>

<p>Seed staging with anonymized production-like volumes so edge cases (long unicode names, empty carts) appear before users find them.</p>
`,
  ARTICLE_25: `
<h2>Public Accountability</h2>

<p>I publish roadmap updates on this blog partly for accountability—silent goals die. Quarterly public posts force honest reflection: what shipped, what slipped, what I learned from Bornosoft client work versus coursework.</p>

<p>If you are building a similar roadmap, consider a lightweight GitHub README career doc linked from your portfolio—not for vanity, but for mentor feedback and recruiter clarity about your direction in AI, DevOps, and cloud.</p>
`,
};

for (const [key, block] of Object.entries(ROUND2)) {
  const marker = `<h2>Conclusion</h2>`;
  const exportName = `export const ${key}`;
  const start = src.indexOf(exportName);
  const slice = src.slice(start);
  const conclusionIdx = slice.indexOf(marker);
  const absIdx = start + conclusionIdx;
  src = src.slice(0, absIdx) + block + "\n\n" + src.slice(absIdx);
  console.log(`Round2 ${key}`);
}

writeFileSync(path, src, "utf8");
