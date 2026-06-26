import { createPost } from "../article-builder";

const post = createPost({
  slug: "my-future-roadmap-ai-devops-cloud",
  title: "My Future Roadmap: AI, DevOps, and Cloud",
  seoTitle: "My Future Roadmap: AI, DevOps, and Cloud | Mohammad Ali Nayeem",
  subtitle: "Where a DIU Software Engineering student and Bornosoft founder is heading next",
  description: "Mohammad Ali Nayeem shares his personal roadmap combining AI engineering, DevOps automation, and cloud architecture—skills goals, certifications, projects, and advice for Bangladeshi students with similar ambitions.",
  category: "Cloud Computing",
  tags: ["Cloud Computing","AI","DevOps","Career Roadmap","AWS","Kubernetes"],
  keywords: ["ai devops cloud career roadmap","software engineering student future skills","aws kubernetes learning path","bangladesh tech career plan"],
  publishedAt: "2025-06-15",
  updatedAt: "2025-06-20",
  featured: false,
  popular: true,
  coverImageAlt: "Roadmap infographic connecting AI machine learning DevOps and cloud computing skills",
  content: `<p>People ask where a DIU Software Engineering student focused on AI, DevOps, and cloud plans to be in five years. I am <strong>Mohammad Ali Nayeem</strong>, founder of <strong>Bornosoft</strong> in Bangladesh, and honestly the map keeps evolving—but direction matters more than certainty. This article shares my <strong>future roadmap across AI, DevOps, and cloud computing</strong>: skills, certifications, projects, and principles guiding decisions after graduation.</p>

<h2>North Star</h2>

<p>Build reliable systems that apply AI where it helps real users—not slide-deck demos. Combine software engineering depth with infrastructure fluency so ideas ship to production, not only notebooks.</p>

<div class="callout tip"><strong>Tip:</strong> Write a personal roadmap yearly. Compare January goals to December reality—adjust without guilt.</div>

<h2>AI Lane: Depth Goals</h2>

<h3>Short Term (6–12 months)</h3>

<ul>
<li>Solidify computer vision pipeline skills beyond YOLO defaults</li>
<li>Learn model evaluation ethics for public-space projects</li>
<li>Experiment with LLM tooling for developer productivity responsibly</li>
<li>Study MLOps basics: experiment tracking, model registry concepts</li>
</ul>

<h3>Medium Term (1–3 years)</h3>

<ul>
<li>Deploy inference services with autoscaling and monitoring</li>
<li>Understand GPU cost optimization on AWS/GCP</li>
<li>Contribute to open-source vision or agent frameworks</li>
</ul>

<pre><code class="language-python"># Roadmap milestone: reproducible training script
def train(config_path: str) -> str:
    cfg = load_config(config_path)
    run = start_experiment(cfg)
    model = build_model(cfg)
    metrics = fit(model, cfg.data)
  log_artifacts(run, model, metrics)
    return run.id</code></pre>

<div class="callout note"><strong>Note:</strong> AI hiring tests fundamentals—linear algebra intuition, data cleaning, metrics—not only API calls to OpenAI.</div>

<h2>DevOps Lane: Automation Goals</h2>

<ul>
<li>Terraform modules for repeatable Bornosoft client infra</li>
<li>GitHub Actions maturity: OIDC to cloud, canary deploys</li>
<li>Kubernetes for multi-service projects when justified</li>
<li>Incident response drills—restore DB from backup quarterly</li>
</ul>

<table>
<thead><tr><th>Skill</th><th>Status</th><th>Next Step</th></tr></thead>
<tbody>
<tr><td>Docker</td><td>Daily use</td><td>Image hardening, SBOM</td></tr>
<tr><td>Terraform</td><td>Learning</td><td>Remote state + modules</td></tr>
<tr><td>Kubernetes</td><td>Labs</td><td>CKA-style exercises</td></tr>
<tr><td>Observability</td><td>Basics</td><td>OpenTelemetry tracing</td></tr>
</tbody>
</table>

<h2>Cloud Lane: Platform Goals</h2>

<p>Primary cloud: <strong>AWS</strong> (free tier alumni, job demand in Bangladesh remote roles). Secondary familiarity: Azure or GCP for client flexibility.</p>

<ul>
<li>Networking: VPC design, private subnets, NAT</li>
<li>Security: IAM roles, least privilege, KMS basics</li>
<li>Serverless vs containers tradeoff fluency</li>
<li>Cost governance: tags, budgets, Savings Plans awareness</li>
</ul>

<div class="callout warning"><strong>Warning:</strong> Certification without projects is hollow. Certifications plus GitHub deploy stories are powerful.</div>

<h2>Certifications I Am Considering</h2>

<ol>
<li>AWS Solutions Architect Associate</li>
<li>CKA (Kubernetes Administrator) after solid Docker/Terraform</li>
<li>Specialty certs later based on job traction</li>
</ol>

<p>DIU coursework overlaps partially—certs fill vendor-specific gaps.</p>

<h2>Bornosoft as Strategy Forcing Function</h2>

<p>Client work disciplines roadmap fantasies:</p>

<ul>
<li>Invoices require maintainable code</li>
<li>Deadlines prioritize boring reliability over shiny models</li>
<li>Support tickets teach observability priorities</li>
</ul>

<p>Roadmap items that do not help clients wait in backlog—ruthless prioritization.</p>

<h2>Education and Community</h2>

<ul>
<li>Finish DIU degree strong—credentials still open doors locally</li>
<li>Mentor juniors in robotics and DevOps clubs</li>
<li>Speak at department tech talks—teaching clarifies thinking</li>
<li>Write blog posts documenting failures, not only wins</li>
</ul>

<h2>Geography and Remote Work</h2>

<p>Dhaka startup ecosystem plus global remote roles is the target mix. Roadmap includes:</p>

<ul>
<li>English communication practice (technical writing on this blog)</li>
<li>Timezone-friendly collaboration habits</li>
<li>Portfolio discoverability (SEO, LinkedIn, GitHub)</li>
</ul>

<h2>Project Ideas Anchoring the Roadmap</h2>

<ol>
<li>Multi-camera edge analytics with centralized metrics</li>
<li>Internal developer platform template for Bornosoft repos</li>
<li>Open-source Bangladesh traffic dataset (ethics-reviewed)</li>
<li>Portfolio automation: CI, Lighthouse, security scans</li>
</ol>

<h2>Risks I Am Watching</h2>

<ul>
<li>AI hype cycles distracting from fundamentals</li>
<li>Tool fatigue—new framework every week</li>
<li>Burnout from client + study overlap</li>
<li>Neglecting soft skills and networking</li>
</ul>

<h2>Quarterly Review Template</h2>

<pre><code class="language-markdown">## Q Review
- Shipped:
- Learned:
- Failed:
- Next quarter 3 priorities max:
- Drop list (stop doing):</code></pre>

<h2>Long-Term Vision (5+ Years)</h2>

<p>Lead engineering teams building AI-enabled products with strong DevOps culture—possibly scaling Bornosoft or joining a mission-aligned product company. Stay hands-on: architecture reviews, incident postmortems, occasional code.</p>

<h2>Advice for Students Building Similar Roadmaps</h2>

<ul>
<li>Pick two lanes max for depth, one for exposure</li>
<li>Ship quarterly, learn weekly, trend-watch monthly</li>
<li>Measure outcomes (users, uptime), not tutorial certificates</li>
<li>Stay ethical—especially with vision in public spaces</li>
</ul>

<h2>Conclusion</h2>

<p>My <strong>future roadmap in AI, DevOps, and cloud</strong> is a living compass—not a contract. DIU gave foundation; Bornosoft gives practice; the cloud gives scale. I will update this path publicly as I learn, fail, and recalibrate.</p>

<p>If you are charting a similar journey from Bangladesh, connect at <a href="https://kazinayeem.site">kazinayeem.site</a>. The best roadmaps are the ones we walk together—and occasionally laugh at when plans meet Dhaka traffic reality.</p>`,
  faqs: [
      {
          "question": "Should I specialize in AI or DevOps?",
          "answer": "You can combine them. MLOps and AI platform engineering need both model literacy and deployment automation. Pick a primary lane for depth and a secondary for breadth based on what energizes you."
      },
      {
          "question": "Which cloud certification is worth it for students?",
          "answer": "AWS Solutions Architect Associate or Azure Fundamentals are common starting points. Certifications open doors but must pair with projects—employers hire pipelines, not PDFs alone."
      },
      {
          "question": "How do I stay current without tutorial overload?",
          "answer": "One newsletter, one deep project per quarter, and contribute to a tool you already use. Avoid chasing every new framework weekly—evaluate against your roadmap twice a year."
      },
      {
          "question": "What role does Bornosoft play in your roadmap?",
          "answer": "Bornosoft is my forcing function for client-grade delivery—real deadlines, invoices, and maintenance teach lessons no classroom duplicates. It keeps my roadmap honest and market-tested."
      }
  ],
  relatedSlugs: ["terraform-basics-beginners","my-software-engineering-journey-diu","ai-tools-every-student-developer-should-know"],
});

export default post;
