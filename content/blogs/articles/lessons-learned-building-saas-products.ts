import { createPost } from "../article-builder";

const post = createPost({
  slug: "lessons-learned-building-saas-products",
  title: "Lessons Learned Building SaaS Products",
  seoTitle: "Lessons Learned Building SaaS Products | Mohammad Ali Nayeem",
  subtitle:
    "Hard-won product and engineering truths from founding Bornosoft as a DIU student",
  description:
    "Mohammad Ali Nayeem shares lessons learned building SaaS products at Bornosoft—MVP scope, billing, onboarding, tech debt, and customer feedback—as a Software Engineering student in Bangladesh.",
  category: "Software Engineering",
  tags: ["SaaS", "Startup", "Bornosoft", "Product", "Software Engineering"],
  keywords: [
    "lessons building saas startup",
    "saas product lessons student founder",
    "bornosoft saas experience",
    "mvp saas Bangladesh",
  ],
  publishedAt: "2025-01-30",
  updatedAt: "2025-02-18",
  featured: false,
  popular: false,
  coverImageAlt:
    "Founder desk with laptop showing SaaS dashboard and sticky note roadmap",
  content: `<p>Building SaaS products as a student founder sounds glamorous in LinkedIn posts: dashboards, MRR graphs, "we shipped Friday." Reality at <strong>Bornosoft</strong> looked more like balancing DIU assignments, debugging payment webhooks at 1 AM, and explaining to a Dhaka shop owner why monthly software subscription beats pirated desktop cracks. I learned product lessons no classroom slide deck delivered.</p>

<p>This article collects <strong>lessons learned building SaaS products</strong>—technical and human—from my journey as <strong>Mohammad Ali Nayeem</strong>, Software Engineering student at <strong>Daffodil International University</strong> and founder of Bornosoft. If you dream of shipping subscription software from Bangladesh, read this before you overbuild your settings page.</p>

<h2>Lesson 1: MVP Means Minimum Viable, Not Maximum Possible</h2>

<p>My first Bornosoft SaaS attempt had user roles, theme customization, notification centers, and a roadmap page—before ten paying users existed. Classic student founder mistake: building for imaginary scale.</p>

<p>What worked later:</p>

<ul>
<li>One painful problem solved end-to-end.</li>
<li>Manual onboarding for first 20 customers.</li>
<li>Spreadsheet-backed ops where automation could wait.</li>
<li>Feature flags only when deploy risk required them.</li>
</ul>

<div class="callout tip"><strong>Tip:</strong> If a feature does not unblock revenue or retention in the next 30 days, question it aggressively.</div>

<h2>Lesson 2: Talk to Users Before Optimizing PostgreSQL</h2>

<p>I once spent a week indexing queries while churn root cause was confusing Bengali UI copy. Users do not churn because your p95 latency is 120ms instead of 80ms—they churn when they cannot complete their job.</p>

<p>Habits that helped:</p>

<ol>
<li>Monthly 15-minute calls with three active clients.</li>
<li>Support WhatsApp group with clear boundaries.</li>
<li>Logging feature requests in public roadmap Notion page.</li>
<li>Saying "not yet" politely to custom requests off-strategy.</li>
</ol>

<h2>Lesson 3: Billing Integration Is a Feature, Not a Plugin</h2>

<p>Stripe (or local payment gateways) webhooks, failed payments, proration, and invoice emails consumed more time than our first admin dashboard. Treat billing as core domain:</p>

<table>
<thead><tr><th>Area</th><th>Why it matters</th></tr></thead>
<tbody>
<tr><td>Webhook idempotency</td><td>Prevent duplicate provisioning</td></tr>
<tr><td>Grace periods</td><td>Reduce angry lockouts</td></tr>
<tr><td>Test mode discipline</td><td>Avoid charging real taka in dev</td></tr>
<tr><td>Audit trail</td><td>Support disputes professionally</td></tr>
</tbody>
</table>

<div class="callout warning"><strong>Warning:</strong> Never store raw card data. Use gateway tokens. PCI scope is not a student side quest.</div>

<h2>Lesson 4: Multi-Tenancy Can Start Simple</h2>

<p>Early Bornosoft MVPs used shared database with <code>tenant_id</code> column and strict query filters—not schema-per-tenant complexity. Simplicity reduced bugs while customer count was low. We documented migration paths if enterprise clients arrived later.</p>

<pre><code class="language-sql">SELECT * FROM invoices
WHERE tenant_id = $1 AND id = $2;</code></pre>

<p>Row-level security in Postgres became a upgrade milestone—not day one requirement.</p>

<h2>Lesson 5: Onboarding Is Product</h2>

<p>Signup-to-value time beat feature count. We improved:</p>

<ul>
<li>Email verification friction reduction.</li>
<li>Sample data seed on first login.</li>
<li>Three-step checklist UI ("add product," "create invoice," "share link").</li>
<li>Loom-style short Bengali walkthrough videos.</li>
</ul>

<p>Activation metrics moved more than any dark mode toggle.</p>

<h2>Lesson 6: Tech Stack Pragmatism at Bornosoft</h2>

<p>Our stack evolved: Next.js frontends, Node APIs, Go workers, PostgreSQL, Docker, GitHub Actions, AWS. Lesson: <strong>cohesion for team of one beats novelty</strong>. I resisted rewriting working Node services in Go without metrics—documented in my Golang journey articles.</p>

<p>Student founders should optimize for:</p>

<ul>
<li>What you can debug alone at midnight.</li>
<li>What DIU peers can contribute to if collaborating.</li>
<li>What clients can afford to host.</li>
</ul>

<h2>Lesson 7: Observability Before Autoscaling</h2>

<p>First production incident: disk full from unrotated logs—not traffic spike. We added:</p>

<ul>
<li>Structured JSON logs with request IDs.</li>
<li>Error alerting to email/Slack.</li>
<li>Uptime checks on critical paths.</li>
<li>Weekly DB backup restore drill (yes, actually restore).</li>
</ul>

<p>SaaS reliability is trust. Bangladeshi SMB clients forgive slow features sooner than mysterious downtime.</p>

<h2>Lesson 8: Pricing Is Positioning</h2>

<p>Underpricing attracts high-support clients. We tested tiers:</p>

<ul>
<li><strong>Starter</strong> — Single location, core features.</li>
<li><strong>Growth</strong> — Integrations + more seats.</li>
<li><strong>Custom</strong> — On-prem or unusual workflows.</li>
</ul>

<p>Pricing in BDT with annual discount option improved cash flow vs monthly-only USD anxiety for local buyers.</p>

<h2>Lesson 9: Legal and Trust Basics Matter Early</h2>

<p>Terms of service, privacy policy, and data handling transparency are not only for Silicon Valley. University legal literacy clubs and online templates helped—but I still read every clause and adapted for Bangladesh context. Client contracts clarified support hours (no 3 AM expectation unless paid).</p>

<h2>Lesson 10: Say No to Save the Product</h2>

<p>Custom ERP requests, blockchain loyalty modules, "just like Amazon" marketplace features—founders hear fantasy scope daily. Polite no with alternative roadmap suggestion preserved Bornosoft focus.</p>

<div class="callout note"><strong>Note:</strong> Every yes to a bad-fit client is a no to ten right-fit clients you never built for.</div>

<h2>Lesson 11: Student Time Management Is Survival</h2>

<p>DIU exams do not pause for sprint planning. Systems that saved me:</p>

<ul>
<li>Fixed Bornosoft deep work blocks on calendar.</li>
<li>Automated deploys to reduce manual ops during finals.</li>
<li>Client communication templates for busy weeks.</li>
<li>Honest timeline buffers—under-promise, over-deliver.</li>
</ul>

<h2>Lesson 12: Documentation Is Sales Material</h2>

<p>Good docs reduced support load and closed deals. Public docs, API examples, and architecture overviews signaled maturity to skeptical local businesses comparing us to spreadsheet workflows.</p>

<h2>What I Would Do Differently Starting Again</h2>

<ol>
<li>Launch smaller, charge earlier—even beta pricing.</li>
<li>Instrument analytics day one (privacy-respecting).</li>
<li>Hire/partner for design sooner—UI debt is real debt.</li>
<li>Build community among early users for referrals.</li>
</ol>

<h2>Support Load and Documentation Debt</h2>

<p>Every new feature multiplied WhatsApp questions until we invested in in-app tooltips and short Loom videos in Bengali. Support is a hidden cost—budget time weekly. I tracked top five recurring questions and turned answers into FAQ pages, reducing repeat pings during DIU exam weeks.</p>

<h2>Churn Analysis: Patterns I Noticed</h2>

<p>Early Bornosoft churn was not random. Common themes:</p>

<ul>
<li>Never completed onboarding checklist.</li>
<li>Expected desktop software behavior on mobile browsers.</li>
<li>Needed features we explicitly deferred (payroll, inventory).</li>
<li>Business closed or paused—not product failure.</li>
</ul>

<p>Interviewing churned users politely taught more than any analytics dashboard alone. Some returned months later when our roadmap matched their timing.</p>

<h2>Building in Public Without Oversharing</h2>

<p>I shared milestones on LinkedIn—first paying client, CI/CD wins, robotics demos—but avoided leaking client data or unreleased features. Building in public attracted DIU juniors asking internships questions and remote founders discussing integrations. Transparency builds trust; recklessness burns it.</p>

<div class="callout tip"><strong>Tip:</strong> Celebrate shipping cadence publicly, not vanity metrics you cannot sustain.</div>

<h2>When to Quit a Feature or Vertical</h2>

<p>Not every experiment deserves eternity. We sunsetted a side module that consumed support time but generated negligible revenue. Sunk cost fallacy is real for student founders who emotionally attach to first ideas. Killing low-value scope freed weekends for core product stability—a win.</p>

<h2>Conclusion</h2>

<p>The biggest <strong>lessons learned building SaaS products</strong> at Bornosoft were human: listen, price honestly, ship small, operate reliably, protect focus. Technology choices matter—but multi-tenant column strategy does not matter if nobody activates after signup.</p>

<p>If you are a DIU student with a SaaS idea, pick one workflow, find three people who hate their current solution, and charge them before you build the perfect admin panel. Everything else is learnable along the way—including the hard lessons I just shared.</p>

<p>Founder questions? <a href="https://kazinayeem.site">kazinayeem.site</a> or Bornosoft channels—happy to help fellow builders.</p>`,
  faqs: [
    {
      question: "Can students build SaaS while studying?",
      answer:
        "Yes, with strict scope and time boundaries. Start with tiny MVPs, manual processes, and clients who accept student-paced support. Automate and scale after validating willingness to pay.",
    },
    {
      question: "What tech stack is best for student SaaS?",
      answer:
        "Use what you know deeply—often Next.js, Node, and Postgres for web SaaS. Prioritize shipping and maintainability over trendy stacks you cannot debug alone.",
    },
    {
      question: "How do you get first SaaS customers in Bangladesh?",
      answer:
        "Solve local business pain points, offer hands-on onboarding in Bengali, price in BDT, and leverage personal networks, university communities, and proof-of-value pilots before scaling marketing spend.",
    },
    {
      question: "When should a SaaS add second features?",
      answer:
        "After retention and activation metrics prove users complete the core job repeatedly. Expansion features follow a stable core—not precede it.",
    },
  ],
  relatedSlugs: [
    "why-i-chose-golang-backend-development",
    "my-first-cicd-pipeline-github-actions",
    "creating-portfolio-ranks-google",
  ],
});

export default post;
