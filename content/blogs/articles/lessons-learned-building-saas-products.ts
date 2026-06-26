import { createPost } from "../article-builder";

const post = createPost({
  slug: "lessons-learned-building-saas-products",
  title: "Lessons Learned Building SaaS Products",
  seoTitle: "Lessons Learned Building SaaS Products | Mohammad Ali Nayeem",
  subtitle:
    "Hard-won product, technical, and founder lessons from Bornosoft's early SaaS experiments",
  description:
    "Mohammad Ali Nayeem shares lessons learned building SaaS products as a DIU student founder—MVP scope, billing, onboarding, tech debt, customer feedback, and when to kill features.",
  category: "Software Engineering",
  tags: ["SaaS", "Startup", "Bornosoft", "Product", "Software Engineering"],
  keywords: [
    "lessons building saas student founder",
    "saas mvp lessons learned",
    "bornosoft saas journey",
    "student startup software engineering",
  ],
  publishedAt: "2025-01-30",
  updatedAt: "2025-02-18",
  featured: false,
  popular: false,
  coverImageAlt:
    "Founder desk with laptop showing SaaS dashboard wireframes and sticky notes with user feedback",
  content: `<p>The first time I called a Bornosoft project "SaaS," I felt like a founder in a Netflix documentary—until a potential customer asked for invoicing in Bengali, SSO with Google Workspace, and a uptime SLA I could not meet on a t3.small. Building <strong>SaaS products</strong> as a <strong>Software Engineering student at DIU</strong> taught me that shipping code is maybe thirty percent of the job. The rest is scope discipline, embarrassing billing bugs, onboarding friction, and conversations that humble your architecture diagrams.</p>

<p>These are the <strong>lessons learned building SaaS products</strong> at Bornosoft—technical and human—that I wish a senior founder had told me before I spent a semester perfecting admin themes nobody used.</p>

<h2>Lesson 1: MVP Means Minimum, Not Mediocre Vision</h2>

<p>My earliest mistake was conflating MVP with "small version of the final empire." I built role-based access control for five roles before a single paying user existed. The real MVP was:</p>

<ul>
<li>One core workflow solved painfully well</li>
<li>Authentication and data isolation</li>
<li>Payment or manual invoice for first customers</li>
<li>Support channel I actually monitored (email, WhatsApp)</li>
</ul>

<div class="callout tip"><strong>Tip:</strong> Ask "Can I deliver value Friday with this?" If not, cut scope—not sleep.</div>

<h3>Feature Cut List That Saved Bornosoft v1</h3>

<table>
<thead><tr><th>Cut</th><th>Why</th><th>Added Later?</th></tr></thead>
<tbody>
<tr><td>Custom themes</td><td>No user asked</td><td>No</td></tr>
<tr><td>Mobile app</td><td>Responsive web enough</td><td>PWA instead</td></tr>
<tr><td>AI assistant</td><td>Gimmick before core stable</td><td>After retention proved</td></tr>
<tr><td>Multi-region deploy</td><td>Zero users in EU</td><td>When metrics justified</td></tr>
</tbody>
</table>

<h2>Lesson 2: Talk to Users Before Optimizing PostgreSQL</h2>

<p>I indexed tables prematurely while ignoring that trial users could not find the "Create Project" button. Qualitative feedback from three Dhaka small businesses reshaped onboarding more than any EXPLAIN ANALYZE:</p>

<ol>
<li>Screen-share sessions (free Zoom)</li>
<li>Written notes—never rely on memory</li>
<li>Fix top three confusion points before new features</li>
</ol>

<div class="callout note"><strong>Note:</strong> Bangladeshi SMB users often prefer WhatsApp voice notes over filling long surveys. Meet them where they are.</div>

<h2>Lesson 3: Billing Will Break Your Soul—Plan Early</h2>

<p>Stripe is excellent; Bangladesh payment realities are messy. Lessons:</p>

<ul>
<li><strong>Start manual</strong> — Bank transfer + invoice PDF for first clients</li>
<li><strong>Automate when pain repeats</strong> — Not before</li>
<li><strong>Test webhooks exhaustively</strong> — Idempotency keys are not optional</li>
<li><strong>Handle failed payments gracefully</strong> — Grace periods beat instant lockouts</li>
</ul>

<pre><code class="language-typescript">// Idempotent webhook handler pattern
async function handleInvoicePaid(event: Stripe.Event) {
  const invoice = event.data.object as Stripe.Invoice;
  const existing = await db.webhookEvent.findUnique({
    where: { id: event.id },
  });
  if (existing) return; // already processed

  await db.$transaction([
    db.webhookEvent.create({ data: { id: event.id, type: event.type } }),
    db.subscription.update({
      where: { stripeId: invoice.subscription as string },
      data: { status: 'active', paidUntil: new Date(invoice.period_end * 1000) },
    }),
  ]);
}</code></pre>

<div class="callout warning"><strong>Warning:</strong> Never store raw card data. Use payment provider hosted fields—PCI scope will crush student projects.</div>

<h2>Lesson 4: Multi-Tenancy Decisions Are Hard to Undo</h2>

<p>I chose <strong>shared database, tenant_id column</strong> for early Bornosoft SaaS—correct for cost and simplicity. Document isolation rules in code reviews:</p>

<pre><code class="language-sql">-- Every query must filter tenant
SELECT * FROM projects
WHERE tenant_id = $1 AND id = $2;</code></pre>

<p>Row-level security in Postgres added defense in depth later. Separate databases per tenant can wait until enterprise contracts demand it.</p>

<h2>Lesson 5: Observability Is a Feature</h2>

<p>When a client said "it's slow," I had no metrics—only vibes. Minimum SaaS observability I enforce now:</p>

<ul>
<li>Structured JSON logs with tenant_id and request_id</li>
<li>Error tracking (Sentry or open alternatives)</li>
<li>Uptime checks on /health</li>
<li>Basic dashboard: error rate, P95 latency, active tenants</li>
</ul>

<p>Students can start free tiers; the habit matters more than the vendor.</p>

<h2>Lesson 6: Tech Debt Compounds With Every Demo Promise</h2>

<p>"We can add that by Tuesday" became permanent shortcuts. I learned to label debt explicitly in GitHub issues:</p>

<ul>
<li><strong>P0</strong> — Security, data loss, billing wrong</li>
<li><strong>P1</strong> — User-blocking bugs</li>
<li><strong>P2</strong> — Speed and UX polish</li>
<li><strong>P3</strong> — Nice-to-have demos</li>
</ul>

<p>Twenty percent of sprint capacity to P2/P3 debt—or the codebase becomes unmaintainable before graduation.</p>

<h2>Lesson 7: Your Stack Should Match Team Size</h2>

<p>Bornosoft solo-founder stack evolved:</p>

<table>
<thead><tr><th>Stage</th><th>Stack Choices</th></tr></thead>
<tbody>
<tr><td>Prototype</td><td>Next.js full-stack, SQLite or Supabase</td></tr>
<tr><td>First paying users</td><td>Postgres on RDS, Docker on EC2</td></tr>
<tr><td>Growth</td><td>CI/CD, staging env, Go workers for heavy jobs</td></tr>
<tr><td>Not yet</td><td>Microservices, Kafka, multi-region K8s</td></tr>
</tbody>
</table>

<p>Kubernetes before product-market fit is a vanity metric—lesson learned watching other student startups stall on infra.</p>

<h2>Lesson 8: Legal and Trust Basics Matter in Bangladesh</h2>

<p>Not legal advice—but operational basics I handled:</p>

<ul>
<li>Clear Terms of Service and Privacy Policy pages</li>
<li>Data export on request</li>
<li>Honest uptime communication during outages</li>
<li>Contracts simple enough that clients' accountants understand</li>
</ul>

<p>Trust beats feature checklists for local SMB sales.</p>

<h2>Lesson 9: Marketing Is Engineering Adjacent</h2>

<p>The best feature hidden behind SEO-less marketing dies quietly. I invested in:</p>

<ul>
<li>This portfolio and technical blog (SEO)</li>
<li>Case studies with real metrics (even small)</li>
<li>LinkedIn posts showing problem-solution, not logo announcements</li>
<li>Free tools or calculators related to Bornosoft niches</li>
</ul>

<h2>Lesson 10: Know When to Kill a Product</h2>

<p>Not every Bornosoft experiment deserved eternal life. I sunsetting criteria:</p>

<ol>
<li>No paying user in 90 days after real outreach</li>
<li>Support cost exceeds revenue consistently</li>
<li>Strategic misfit with core Bornosoft direction</li>
</ol>

<p>Killing a SaaS experiment freed weekends for projects with actual pull—emotionally hard, strategically essential.</p>

<h2>Balancing SaaS With DIU Studies</h2>

<p>Software Engineering coursework does not pause for churn metrics. Systems that kept me sane:</p>

<ul>
<li>Fixed "Bornosoft hours" blocks—like part-time job schedule</li>
<li>Automated deploys so releases are not manual marathon sessions</li>
<li>Academic group projects chosen to reinforce SaaS skills (DB courses → multi-tenant schema)</li>
<li>Sleep non-negotiable during exam weeks—bugs can wait 72 hours</li>
</ul>

<h2>What I Would Tell Freshman-Me</h2>

<ol>
<li>Ship ugly, invoice early, iterate with real money signals</li>
<li>Instrument before scaling marketing spend</li>
<li>Write docs for future you—onboarding flows included</li>
<li>Network with other Bangladesh student founders—loneliness kills momentum</li>
<li>Perfect is the enemy of tuition-paid semesters</li>
</ol>

<h2>Conclusion</h2>

<p>The <strong>lessons learned building SaaS products</strong> at Bornosoft are still being written—every client conversation rewrites assumptions. Code quality matters, but product judgment, billing hygiene, tenant safety, and honest scope win earlier than microservice diagrams.</p>

<p>If you are a DIU student dreaming of SaaS, start smaller than my first attempt: one painful problem, three design partners, manual billing, automated deploys, and weekly user calls. Everything else—including this article—is commentary until someone pays or passionately uses what you built.</p>

<p>Founder questions welcome at <a href="https://kazinayeem.site">kazinayeem.site</a>.</p>`,
  faqs: [
    {
      question: "Can a university student realistically build a SaaS while studying?",
      answer:
        "Yes, with ruthless scope control and time blocks. Target tiny niches, manual processes early, and use coursework where it overlaps. Avoid competing with funded startups on feature breadth.",
    },
    {
      question: "What tech stack is best for student SaaS MVPs?",
      answer:
        "Next.js with PostgreSQL and a managed auth provider gets most MVPs live fastest. Add Go workers or Kubernetes only when metrics require it—not when blogs suggest it.",
    },
    {
      question: "How do you find first SaaS customers in Bangladesh?",
      answer:
        "Start with networks you trust—local businesses, DIU alumni, freelancer clients. Solve a specific operational pain, offer white-glove onboarding, and ask for referrals after success.",
    },
    {
      question: "When should a student founder incorporate formally?",
      answer:
        "Depends on revenue and liability. Many start informal until recurring revenue justifies accountant and registration costs. Consult local business advisors when signing larger contracts.",
    },
  ],
  relatedSlugs: [
    "why-i-chose-golang-backend-development",
    "my-devops-roadmap-software-engineering-student",
    "creating-portfolio-ranks-google",
  ],
});

export default post;
