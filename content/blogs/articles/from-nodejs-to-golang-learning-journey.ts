import { createPost } from "../article-builder";

const post = createPost({
  slug: "from-nodejs-to-golang-learning-journey",
  title: "From Node.js to Golang: My Learning Journey",
  seoTitle: "From Node.js to Golang: A Student Developer's Journey",
  subtitle: "Why I picked up Go after years of JavaScript—and what surprised me",
  description: "Mohammad Ali Nayeem explains his transition from Node.js to Golang for backend services at Bornosoft, with practical comparisons, code samples, and student-friendly learning resources.",
  category: "Golang",
  tags: ["Golang","Node.js","Backend","Programming"],
  keywords: ["Node.js to Golang","Golang backend Bangladesh","Mohammad Ali Nayeem Golang"],
  publishedAt: "2024-09-18",
  updatedAt: "2025-05-15",
  featured: true,
  popular: true,
  coverImageAlt: "From Node.js to Golang: My Learning Journey - cover image by Mohammad Ali Nayeem",
  relatedSlugs: ["why-i-chose-golang-backend-development","building-rest-apis-nodejs"],
  faqs: [
  {
    "question": "Should beginners learn Go or Node.js first?",
    "answer": "Node.js is easier if you already know JavaScript from frontend work. Go is excellent once you understand HTTP, databases, and concurrency basics."
  },
  {
    "question": "Is Go faster than Node.js?",
    "answer": "For CPU-bound and highly concurrent workloads, Go typically wins. Node.js remains excellent for I/O-heavy APIs and rapid prototyping."
  },
  {
    "question": "How long to become productive in Go?",
    "answer": "With backend experience, expect 2-4 weeks for basic productivity and 2-3 months for idiomatic Go including testing and packaging."
  }
],
  content: `<p>JavaScript carried me through my first APIs, Bornosoft MVPs, and hackathon demos. But as services grew, I reached for Golang—and the learning curve rewarded patience.</p>

<h2>Why I Outgrew Node for Some Services</h2>

<p>Node.js excels at JSON APIs and ecosystem velocity. I hit friction on CPU-heavy image processing workers, strict memory budgets on small EC2 instances, and debugging production concurrency edge cases.</p>

<h2>First Impressions of Go</h2>

<ul><li>Explicit error handling felt verbose—then clarifying</li><li>Goroutines made concurrent workers readable</li><li>Single binary deployment simplified my EC2 releases</li><li>Smaller Docker images cut pull times</li></ul>

<h2>Side-by-Side: Hello API</h2>

<pre><code class="language-javascript">// Node.js + Express
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});</code></pre>

<pre><code class="language-go">// Go + net/http
func health(w http.ResponseWriter, r *http.Request) {
    json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}</code></pre>

<h2>Learning Path That Worked</h2>

<p>I followed Tour of Go, built a URL shortener, rewrote a Bornosoft webhook worker in Go, and added table-driven tests. Reading standard library source taught idioms better than any blog.</p>

<div class="callout tip"><strong>Tip:</strong> Port a small Node service you already understand instead of starting with microservices.</div>

<h2>When I Still Choose Node</h2>

<p>Next.js full-stack routes, rapid CRUD prototypes, and anything needing npm's ecosystem still live in TypeScript. Polyglot backends are normal—pick the tool per workload.</p>

<h2>Conclusion</h2>

<p>Moving from Node.js to Golang was not abandoning JavaScript—it was expanding my toolkit as an engineer and founder. Both languages now serve different Bornosoft services, and that flexibility is the real win.</p>`,
});

export default post;
