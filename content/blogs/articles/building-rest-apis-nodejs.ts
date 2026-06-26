import { createPost } from "../article-builder";

const post = createPost({
  slug: "building-rest-apis-nodejs",
  title: "Building REST APIs with Node.js: A Practical Guide",
  seoTitle: "Building REST APIs with Node.js | Mohammad Ali Nayeem",
  subtitle: "Express patterns, validation, auth, and structure that survive beyond homework",
  description: "Mohammad Ali Nayeem shares how he builds production-minded REST APIs with Node.js and Express—routing, middleware, error handling, Prisma, and deployment lessons from Bornosoft backends.",
  category: "Node.js",
  tags: ["Node.js","Express","REST API","TypeScript","Prisma","Backend"],
  keywords: ["nodejs rest api tutorial","express api best practices","nodejs backend bangladesh","rest api student guide"],
  publishedAt: "2025-04-28",
  updatedAt: "2025-05-12",
  featured: false,
  popular: false,
  coverImageAlt: "API request flow diagram from client to Express server and database",
  content: `<p>Backend APIs are the spine of almost every Bornosoft deliverable and DIU team project I have shipped. As <strong>Mohammad Ali Nayeem</strong>, Software Engineering student at <strong>Daffodil International University</strong> and founder of <strong>Bornosoft</strong> in Bangladesh, I have migrated from tutorial <code>app.js</code> files to structured <strong>Node.js REST APIs</strong> that survive client feedback, minor traffic spikes, and my own future refactors.</p>

<p>This guide is practical: Express patterns, TypeScript, validation, auth, databases, errors, and deployment habits—not a REST dissertation.</p>

<h2>What Makes an API "RESTful" Enough?</h2>

<p>Richardson maturity level 2 is fine for student and startup work:</p>

<ul>
<li>Resources as nouns: <code>/users</code>, <code>/posts</code></li>
<li>HTTP verbs: GET read, POST create, PUT/PATCH update, DELETE remove</li>
<li>Status codes that mean something: 201 created, 404 not found, 422 validation error</li>
<li>JSON representations with consistent envelope optional but helpful</li>
</ul>

<div class="callout tip"><strong>Tip:</strong> Document your API with OpenAPI early. Future you during viva week will thank present you.</div>

<h2>Project Structure That Scales Past Homework</h2>

<pre><code class="language-text">src/
  app.ts
  server.ts
  routes/
    users.routes.ts
  controllers/
    users.controller.ts
  services/
    users.service.ts
  repositories/
    users.repository.ts
  middleware/
    error.middleware.ts
    auth.middleware.ts
  schemas/
    users.schema.ts</code></pre>

<p>Thin controllers call services; services hold business rules; repositories talk to Prisma or SQL. Routes wire HTTP to controllers only.</p>

<h2>Bootstrapping Express with TypeScript</h2>

<pre><code class="language-typescript">import express from "express";
import helmet from "helmet";
import cors from "cors";
import { usersRouter } from "./routes/users.routes";
import { errorHandler } from "./middleware/error.middleware";

export function createApp() {
  const app = express();
  app.use(helmet());
  app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") }));
  app.use(express.json({ limit: "1mb" }));
  app.use("/api/users", usersRouter);
  app.use(errorHandler);
  return app;
}</code></pre>

<h2>Validation with Zod</h2>

<p>Never trust request bodies. Wrap validation in middleware:</p>

<pre><code class="language-typescript">import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(80),
  password: z.string().min(8),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;</code></pre>

<p>Zod errors map cleanly to 422 responses with field-level messages—better UX for frontend teammates.</p>

<div class="callout note"><strong>Note:</strong> Hash passwords with bcrypt or argon2. Never store plaintext—not even in dev databases you might accidentally expose.</div>

<h2>Prisma for Data Access</h2>

<pre><code class="language-prisma">model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String
  createdAt DateTime @default(now())
}</code></pre>

<pre><code class="language-typescript">const user = await prisma.user.create({
  data: { email, name, password: hash },
  select: { id: true, email: true, name: true },
});</code></pre>

<p>Migrations in Git mirror schema evolution—professors and clients both like auditable history.</p>

<h2>Authentication Patterns</h2>

<table>
<thead><tr><th>Pattern</th><th>Use When</th><th>Caveat</th></tr></thead>
<tbody>
<tr><td>JWT access + refresh</td><td>SPAs, mobile apps</td><td>Rotation and revocation strategy needed</td></tr>
<tr><td>Session cookies</td><td>Same-site web apps</td><td>CSRF protection required</td></tr>
<tr><td>API keys</td><td>Server-to-server</td><td>Scope and rotation policy</td></tr>
</tbody>
</table>

<pre><code class="language-typescript">export function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    req.user = verifyAccessToken(header.slice(7));
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}</code></pre>

<h2>Centralized Error Handling</h2>

<pre><code class="language-typescript">export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message);
  }
}

export function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message, code: err.code });
  }
  console.error(err);
  return res.status(500).json({ error: "Internal server error" });
}</code></pre>

<div class="callout warning"><strong>Warning:</strong> Do not leak stack traces to clients in production. Log them server-side with request IDs.</div>

<h2>Pagination and Filtering</h2>

<pre><code class="language-typescript">// GET /api/posts?page=2&limit=20&tag=devops
const page = Math.max(1, Number(req.query.page) || 1);
const limit = Math.min(100, Number(req.query.limit) || 20);
const skip = (page - 1) * limit;</code></pre>

<p>Consistent pagination prevents accidental full-table scans when a frontend developer requests "all records."</p>

<h2>Rate Limiting and Security Basics</h2>

<ul>
<li><code>express-rate-limit</code> on auth routes</li>
<li>Helmet for headers</li>
<li>Parameterized queries via ORM (no string concat SQL)</li>
<li>Environment variables via dotenv only in dev—use platform secrets in prod</li>
</ul>

<h2>Testing APIs</h2>

<pre><code class="language-typescript">import request from "supertest";
import { createApp } from "../app";

describe("POST /api/users", () => {
  it("creates a user", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/api/users")
      .send({ email: "test@diu.edu.bd", name: "Nayeem", password: "secret123" });
    expect(res.status).toBe(201);
    expect(res.body.email).toBe("test@diu.edu.bd");
  });
});</code></pre>

<p>Supertest integration tests caught more Bornosoft regressions than manual Postman collections alone.</p>

<h2>Logging and Observability</h2>

<p>Structured JSON logs with pino or winston:</p>

<pre><code class="language-json">{"level":"info","reqId":"abc","method":"GET","path":"/api/health","ms":3}</code></pre>

<p>Attach request IDs in middleware; propagate to error reports (Sentry).</p>

<h2>Deployment Checklist</h2>

<ol>
<li>Health route <code>/api/health</code></li>
<li>Graceful shutdown on SIGTERM</li>
<li>Database migrations in CI before deploy</li>
<li>Process manager or container restart policy</li>
</ol>

<h2>How This Tied to Road Monitoring and Portfolio</h2>

<p>The smart road monitoring system's event API used these exact patterns. My portfolio contact form backend is a slimmed-down variant. Repetition builds speed without cutting corners.</p>


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


<h2>Conclusion</h2>

<p><strong>Building REST APIs with Node.js</strong> is a craft: predictable structure, validated inputs, honest errors, tested routes, and deployable artifacts. DIU students who master this graduate into interns who do not break production on day one.</p>

<p>Pick one course project and refactor it to match this layout. Open-source the result on GitHub—recruiters recognize maturity. Questions welcome at <a href="https://kazinayeem.site">kazinayeem.site</a>.</p>`,
  faqs: [
      {
          "question": "Express or Fastify for new APIs?",
          "answer": "Express has the largest tutorial ecosystem—ideal for coursework and interviews. Fastify offers better performance and schema validation. I use Express for client MVPs and Fastify when latency matters."
      },
      {
          "question": "Should student APIs use TypeScript?",
          "answer": "Yes, if you already know JavaScript basics. Types catch contract bugs between frontend and backend early. The setup cost pays off on any project longer than a weekend hackathon."
      },
      {
          "question": "How do I structure routes and controllers?",
          "answer": "Group by domain (/users, /posts), keep controllers thin, push business logic to services, and centralize error handling middleware. Avoid one giant app.js file by week three."
      },
      {
          "question": "What about API documentation?",
          "answer": "OpenAPI (Swagger) generated from Zod or route schemas saves viva demos and client handoffs. Automate it in CI so docs never drift from implementation."
      }
  ],
  relatedSlugs: ["complete-guide-github-actions","building-production-ready-full-stack-applications","react-vs-nextjs"],
});

export default post;
