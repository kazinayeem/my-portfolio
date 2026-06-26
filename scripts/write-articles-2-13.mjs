#!/usr/bin/env node
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { articlesPart2 } from "./write-articles-2-13-part2.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "../content/blogs/articles");
mkdirSync(OUT_DIR, { recursive: true });

const DATES = {
  2: ["2024-08-18", "2024-09-20"],
  3: ["2024-09-03", "2024-10-01"],
  4: ["2024-09-22", "2024-10-15"],
  5: ["2024-10-08", "2024-11-02"],
  6: ["2024-10-25", "2024-11-18"],
  7: ["2024-11-10", "2024-12-05"],
  8: ["2024-11-28", "2024-12-20"],
  9: ["2024-12-12", "2025-01-08"],
  10: ["2024-12-28", "2025-01-22"],
  11: ["2025-01-14", "2025-02-05"],
  12: ["2025-01-30", "2025-02-18"],
  13: ["2025-02-14", "2025-03-02"],
};

function writeArticle(index, filename, meta, content) {
  const [publishedAt, updatedAt] = DATES[index];
  const featured = index <= 5;
  const popular = index % 2 === 1;

  const file = `import { createPost } from "../article-builder";

const post = createPost({
  slug: "${meta.slug}",
  title: "${meta.title}",
  seoTitle: "${meta.seoTitle}",
  subtitle: "${meta.subtitle}",
  description: "${meta.description}",
  category: "${meta.category}",
  tags: ${JSON.stringify(meta.tags)},
  keywords: ${JSON.stringify(meta.keywords)},
  publishedAt: "${publishedAt}",
  updatedAt: "${updatedAt}",
  featured: ${featured},
  popular: ${popular},
  coverImageAlt: "${meta.coverImageAlt}",
  content: \`${content}\`,
  faqs: ${JSON.stringify(meta.faqs, null, 4).replace(/\n/g, "\n  ")},
  relatedSlugs: ${JSON.stringify(meta.relatedSlugs)},
});

export default post;
`;

  const path = join(OUT_DIR, filename);
  writeFileSync(path, file, "utf8");
  const words = content
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;
  return { filename, words };
}

const articles = [];

// Article 2
articles.push({
  index: 2,
  file: "my-first-machine-learning-project-yolo-robotics.ts",
  meta: {
    slug: "my-first-machine-learning-project-yolo-robotics",
    title: "My First Machine Learning Project: YOLO and Robotics",
    seoTitle: "My First Machine Learning Project: YOLO and Robotics | Mohammad Ali Nayeem",
    subtitle: "How a DIU robotics club project taught me computer vision, dataset labeling, and real-world ML constraints",
    description: "Mohammad Ali Nayeem, DIU Software Engineering student and Bornosoft founder, documents his first YOLO-based robotics project—from dataset collection in Dhaka to deployment on a Raspberry Pi.",
    category: "Machine Learning",
    tags: ["YOLO", "Machine Learning", "Robotics", "Computer Vision", "DIU", "Python"],
    keywords: ["YOLO robotics project", "first machine learning project student", "computer vision Bangladesh", "YOLOv8 tutorial beginner"],
    coverImageAlt: "Robotics workspace with camera module running YOLO object detection",
    relatedSlugs: ["how-i-got-cursor-pro-free-as-diu-student", "learning-docker-from-scratch", "kubernetes-explained-simply"],
    faqs: [
      { question: "Is YOLO a good first machine learning project for students?", answer: "Yes. YOLO offers pretrained weights, clear documentation, and immediate visual feedback. You learn labeling, training loops, and inference without building neural networks from scratch—ideal for Software Engineering students balancing coursework." },
      { question: "What hardware do I need for a YOLO robotics project?", answer: "Start with a laptop and a USB webcam. For edge deployment, a Raspberry Pi 4 with 4GB RAM works for YOLOv8n. Upgrade to a Jetson Nano if you need higher FPS on multiple streams." },
      { question: "How many labeled images do I need?", answer: "For a classroom demo with three object classes, 200–400 images per class often suffices with transfer learning. For production robotics, plan thousands of diverse images across lighting and angles." },
      { question: "Can I run YOLO without a GPU?", answer: "Training is slow on CPU but possible for tiny datasets. Use Google Colab free GPU tiers for training, then export ONNX or TensorRT for edge inference on your robot." },
    ],
  },
  content: `<p>My first serious encounter with <strong>machine learning</strong> did not happen in a lecture hall at <strong>Daffodil International University (DIU)</strong>. It happened on a dusty robotics club table in Dhaka, surrounded by DC motors, jumper wires, and a webcam duct-taped to a cardboard chassis. I am <strong>Mohammad Ali Nayeem</strong>, a Software Engineering student and founder of <strong>Bornosoft</strong>, and this is the story of how <strong>YOLO</strong> turned abstract math into something my robot could actually see.</p>

<p>Before this project, machine learning felt like a black box—loss functions, backpropagation, and papers I could read but not reproduce. Robotics forced me to ship. When your robot must detect obstacles, line markers, or colored balls in real time, you cannot hide behind theory. You label images, train a model, measure FPS, and fix what breaks on the floor.</p>

<h2>Why I Chose YOLO for Robotics</h2>

<p>Object detection frameworks fall on a spectrum from heavy research code to approachable tools. I evaluated several options during our club semester:</p>

<ul>
<li><strong>Haar cascades and color thresholds</strong> — Fast but brittle under changing light in our lab.</li>
<li><strong>Two-stage detectors (R-CNN family)</strong> — Accurate but too slow for a small rover on Raspberry Pi.</li>
<li><strong>YOLO (You Only Look Once)</strong> — Single-pass detection with strong pretrained checkpoints and an active community.</li>
</ul>

<p>YOLOv8 from Ultralytics gave us a Python API, export to ONNX, and tutorials that a second-year student could follow between classes. That accessibility mattered more than squeezing an extra point of mAP when our deadline was three weeks away.</p>

<div class="callout tip"><strong>Tip:</strong> Pick the smallest YOLO variant (nano or small) for your first robotics build. A model that runs at 15 FPS on target hardware beats a accurate model that never leaves your laptop.</div>

<h2>Project Goals and Constraints</h2>

<p>Our team defined a narrow scope—intentionally. The robot had to:</p>

<ol>
<li>Detect three object classes: red ball, green cone, and stop sign (printed A4).</li>
<li>Stream bounding boxes to a simple navigation script over serial.</li>
<li>Operate on a Raspberry Pi 4 without cloud inference.</li>
</ol>

<p>Constraints shaped every decision. We had no GPU server in the club room. Internet at DIU labs was reliable but not something we wanted to depend on during demo day. Budget covered one Pi, one camera, and shared laptops for training.</p>

<h3>Hardware Stack</h3>

<table>
<thead><tr><th>Component</th><th>Role</th><th>Notes</th></tr></thead>
<tbody>
<tr><td>Raspberry Pi 4 (4GB)</td><td>On-robot inference</td><td>CPU inference with YOLOv8n</td></tr>
<tr><td>USB webcam</td><td>Vision input</td><td>720p at 30 FPS</td></tr>
<tr><td>L298N motor driver</td><td>Movement</td><td>PWM control from GPIO</td></tr>
<tr><td>Laptop + Colab</td><td>Training</td><td>Free T4 GPU sessions</td></tr>
</tbody>
</table>

<h2>Building the Dataset</h2>

<p>The hardest part of machine learning is rarely the model—it is the data. We spent nearly half the project timeline capturing and labeling images across our campus corridor, robotics lab, and outdoor courtyard.</p>

<h3>Capture Strategy</h3>

<p>We rotated the camera at different heights, walked at varying speeds, and recorded under fluorescent lights and afternoon sun. Bangladesh's bright outdoor glare taught us that models trained only indoors fail the moment you roll outside.</p>

<p>We used Roboflow for labeling and augmentation. Each teammate labeled fifty images per week—a manageable quota alongside assignments. Augmentations included horizontal flip, brightness jitter, and mild blur to simulate motion.</p>

<div class="callout note"><strong>Note:</strong> Keep a held-out validation set of images from locations you never trained on. Our first model scored 92% in the lab and collapsed in the courtyard until we added outdoor samples.</div>

<h3>Labeling Guidelines We Documented</h3>

<ul>
<li>Tight bounding boxes with minimal background.</li>
<li>Consistent class names in lowercase across exports.</li>
<li>Include partial occlusions—robots will see half-hidden objects.</li>
<li>Reject blurry frames instead of labeling them badly.</li>
</ul>

<h2>Training Pipeline</h2>

<p>Training ran on Google Colab while we attended morning lectures. The workflow became repeatable enough that I reused pieces later for Bornosoft client demos involving inventory scanning.</p>

<pre><code class="language-python">from ultralytics import YOLO

# Start from pretrained nano weights
model = YOLO("yolov8n.pt")

results = model.train(
    data="/content/dataset/data.yaml",
    epochs=80,
    imgsz=640,
    batch=16,
    patience=15,
    project="diu_robotics",
    name="v1_ball_cone_sign",
)

# Export for edge deployment
model.export(format="onnx", imgsz=640)</code></pre>

<p>We tracked precision, recall, and confusion between red ball and stop sign—similar hues under warm lighting caused early misclassifications. Adding more red-ball examples with green backgrounds fixed most swaps.</p>

<h3>Metrics That Mattered to Us</h3>

<p>Academic metrics are useful, but robotics cares about latency and stability:</p>

<ul>
<li><strong>mAP@50</strong> — Overall detection quality on validation.</li>
<li><strong>Inference milliseconds</strong> — On Pi, not on Colab GPU.</li>
<li><strong>Detection jitter</strong> — Bounding boxes flickering break naive PID controllers.</li>
</ul>

<div class="callout warning"><strong>Warning:</strong> Do not trust Colab FPS numbers. Always benchmark on the exact device that runs on the robot, with the same resolution and power source.</div>

<h2>Integrating Detection with Robot Control</h2>

<p>Vision and motors lived in separate Python processes connected by a lightweight queue. Separation kept camera capture from blocking motor timing.</p>

<pre><code class="language-python">import cv2
from ultralytics import YOLO

model = YOLO("best.onnx", task="detect")
cap = cv2.VideoCapture(0)

while True:
    ok, frame = cap.read()
    if not ok:
        break
    results = model(frame, verbose=False)
    for box in results[0].boxes:
        cls = int(box.cls[0])
        conf = float(box.conf[0])
        if conf &lt; 0.55:
            continue
        x1, y1, x2, y2 = map(int, box.xyxy[0])
        # Send class + center x to navigation module
        cx = (x1 + x2) // 2
        navigate(cls, cx, frame.shape[1])</code></pre>

<p>Navigation logic was deliberately simple: steer toward the ball center, stop on stop sign, avoid cones by steering away from their centroid. Simple rules let us debug vision independently from motor tuning.</p>

<h2>Failures We Learned From</h2>

<p>Every failure became a lab story—and a line on my resume:</p>

<ol>
<li><strong>Overfitting to lab carpet</strong> — Texture bias made outdoor runs unpredictable.</li>
<li><strong>USB power sag</strong> — Pi rebooted during inference until we used a powered hub.</li>
<li><strong>Class imbalance</strong> — Too few stop-sign images caused missed stops.</li>
<li><strong>Serial flooding</strong> — Sending every frame overwhelmed our Arduino; we throttled to 10 Hz.</li>
</ol>

<h2>Connecting ML to My Broader Journey</h2>

<p>This project changed how I approached Software Engineering at DIU. Classes taught algorithms; YOLO taught <em>systems</em>—data versioning, reproducible training, edge deployment, and team coordination. When I later built Bornosoft prototypes involving document scanning and warehouse counting, I already understood the pipeline from camera to business logic.</p>

<p>Machine learning stopped being a buzzword on my LinkedIn profile. It became a skill I could explain in a viva, demo on a table, and extend into production-minded side projects.</p>

<h2>Tools and Resources I Recommend</h2>

<ul>
<li>Ultralytics YOLOv8 documentation and community notebooks</li>
<li>Roboflow for labeling and dataset versioning</li>
<li>Google Colab for student-friendly GPU access</li>
<li>ONNX Runtime on Raspberry Pi for portable inference</li>
<li>DIU robotics club peers for accountability and shared GPUs</li>
</ul>

<h2>Conclusion</h2>

<p>My first <strong>machine learning project with YOLO and robotics</strong> was messy, under-powered, and absolutely worth it. If you are a student in Bangladesh wondering whether you can do real computer vision without a lab budget—you can. Start small, label honestly, benchmark on real hardware, and ship a demo that moves.</p>

<p>From that cardboard chassis to Bornosoft client work today, the through-line is the same: data quality and deployment reality beat theoretical perfection. Pick one robot, one model, one deadline—and build.</p>

<p>Follow my journey at <a href="https://kazinayeem.site">kazinayeem.site</a> or reach out if you are building vision projects at DIU. I am happy to review datasets and architecture sketches.</p>`,
});

// Article 3
articles.push({
  index: 3,
  file: "from-nodejs-to-golang-learning-journey.ts",
  meta: {
    slug: "from-nodejs-to-golang-learning-journey",
    title: "From Node.js to Golang: My Learning Journey",
    seoTitle: "From Node.js to Golang: My Learning Journey | Mohammad Ali Nayeem",
    subtitle: "Why a DIU student who loved JavaScript picked up Go—and what changed in how I design backends",
    description: "Mohammad Ali Nayeem shares his transition from Node.js to Golang as a Software Engineering student at DIU and Bornosoft founder, covering concurrency, tooling, and when each language fits.",
    category: "Golang",
    tags: ["Golang", "Node.js", "Backend", "DIU", "Bornosoft", "TypeScript"],
    keywords: ["learn golang from nodejs", "golang for javascript developers", "nodejs vs golang backend", "golang student journey"],
    coverImageAlt: "Split screen of Node.js and Go code in an IDE",
    relatedSlugs: ["why-i-chose-golang-backend-development", "my-first-cicd-pipeline-github-actions", "deploying-nextjs-aws-ec2-nginx-pm2"],
    faqs: [
      { question: "Should Node.js developers learn Go?", answer: "If you build APIs, workers, or infrastructure tools, Go is worth learning. It teaches explicit error handling, static typing, and concurrency primitives that make you a stronger engineer—even when you return to TypeScript." },
      { question: "How long did it take to become productive in Go?", answer: "Basic syntax took a weekend. Idiomatic Go—interfaces, error wrapping, project layout—took about six weeks of part-time practice alongside DIU coursework and Bornosoft projects." },
      { question: "Is Go replacing Node.js at Bornosoft?", answer: "Not entirely. We still use Next.js and Node for many client-facing apps. Go handles high-throughput services, CLI tools, and workers where memory footprint and predictable concurrency matter." },
      { question: "What is the hardest part of switching?", answer: "Letting go of npm ecosystem habits. Go's standard library is rich but smaller; you write more explicit code and rely less on framework magic." },
    ],
  },
  content: `<p>I spent my first year at <strong>Daffodil International University (DIU)</strong> living inside <strong>Node.js</strong>. Express routes, async/await, npm scripts, and JSON APIs felt natural. Then I hit walls—CPU-heavy tasks blocking the event loop, memory growth in long-running workers, and deployment sizes that made Docker images sluggish on small AWS instances. That is when I started learning <strong>Golang</strong>.</p>

<p>I am <strong>Mohammad Ali Nayeem</strong>, Software Engineering student and founder of <strong>Bornosoft</strong> in Dhaka, Bangladesh. This article is my honest map from JavaScript comfort to Go pragmatism—not a language war, but a record of what clicked, what hurt, and how both stacks now coexist in my work.</p>

<h2>Why I Did Not Abandon Node.js</h2>

<p>Node.js remains excellent for many Bornosoft projects:</p>

<ul>
<li><strong>Next.js full-stack apps</strong> with API routes and server components.</li>
<li><strong>Rapid CRUD prototypes</strong> where time-to-demo wins.</li>
<li><strong>Rich npm ecosystems</strong> for auth, ORMs, and PDF generation.</li>
<li><strong>Team familiarity</strong> when collaborators are JavaScript-first.</li>
</ul>

<p>Go entered when problems looked operational rather than product-shaped—background jobs, webhooks at scale, CLI utilities for DevOps homework, and services that had to stay up on a t3.micro without drama.</p>

<div class="callout tip"><strong>Tip:</strong> Learn a second backend language to sharpen judgment, not to chase trends. Pick Go if concurrency, deployment simplicity, or systems programming appeals to you.</div>

<h2>The Moment Go Made Sense</h2>

<p>Two projects pushed me over the edge:</p>

<h3>1. A Webhook Ingestion Worker</h3>

<p>A Bornosoft client needed to process thousands of payment callbacks nightly. My Node worker handled it until memory spiked during CSV aggregation. Profiling showed object churn and single-threaded CPU saturation. Rewriting the worker in Go with goroutines and streaming I/O cut runtime and RAM noticeably on the same EC2 instance.</p>

<h3>2. DIU Systems Programming Assignment</h3>

<p>Our course introduced processes, threads, and sockets. Go's goroutines and channels mapped cleanly to lecture concepts. I could read the spec, implement, and explain scheduling behavior in a viva without fighting callback hell.</p>

<h2>Concept Mapping: Node.js to Go</h2>

<table>
<thead><tr><th>Node.js</th><th>Go</th><th>My Notes</th></tr></thead>
<tbody>
<tr><td>npm / package.json</td><td>go mod</td><td>Go modules are simpler; fewer lockfile surprises</td></tr>
<tr><td>async/await</td><td>goroutines + channels</td><td>Explicit concurrency; learn sync primitives early</td></tr>
<tr><td>try/catch</td><td>if err != nil</td><td>Verbose but honest error paths</td></tr>
<tr><td>Express middleware</td><td>net/http handlers</td><td>Chi or Echo if you want router ergonomics</td></tr>
<tr><td>jest</td><td>testing package</td><td>Built-in; table-driven tests feel natural</td></tr>
</tbody>
</table>

<h2>My First Go HTTP Service</h2>

<p>I rebuilt a small health-check API I had written in Express. The Go version forced me to think about struct tags, explicit routing, and graceful shutdown—topics I had previously hidden behind framework defaults.</p>

<pre><code class="language-go">package main

import (
    "encoding/json"
    "log"
    "net/http"
    "os"
    "time"
)

type Health struct {
    Status    string    \`json:"status"\`
    Timestamp time.Time \`json:"timestamp"\`
    Service   string    \`json:"service"\`
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    _ = json.NewEncoder(w).Encode(Health{
        Status:    "ok",
        Service:   "bornosoft-worker",
        Timestamp: time.Now().UTC(),
    })
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/health", healthHandler)

    srv := &amp;http.Server{
        Addr:         ":8080",
        Handler:      mux,
        ReadTimeout:  5 * time.Second,
        WriteTimeout: 10 * time.Second,
    }

    log.Println("listening on :8080")
    if err := srv.ListenAndServe(); err != nil &amp;&amp; err != http.ErrServerClosed {
        log.Fatal(err)
    }
}</code></pre>

<p>Compiling to a single binary and scp-ing it to EC2 felt liberating compared to syncing node_modules or rebuilding slim Docker layers.</p>

<div class="callout note"><strong>Note:</strong> Go's standard library is intentionally boring—in a good way. Reach for frameworks after you understand raw net/http.</div>

<h2>Concurrency: The Real Reason I Stayed</h2>

<p>JavaScript taught me async patterns; Go taught me <em>parallelism</em>. Worker pools processing webhooks became readable:</p>

<pre><code class="language-go">jobs := make(chan Job, 100)
results := make(chan Result, 100)

for w := 0; w &lt; 4; w++ {
    go worker(w, jobs, results)
}

go func() {
    for _, j := range pending {
        jobs &lt;- j
    }
    close(jobs)
}()

for i := 0; i &lt; len(pending); i++ {
    r := &lt;-results
    handle(r)
}</code></pre>

<p>Understanding happens-before relationships helped me debug race conditions in lab assignments and production logs alike.</p>

<h2>Tooling That Accelerated Learning</h2>

<ul>
<li><strong>go fmt</strong> — No more bike-shedding formatting in group projects.</li>
<li><strong>go vet &amp; staticcheck</strong> — Caught mistakes before CI did.</li>
<li><strong>Delve debugger</strong> — Stepping through goroutines clarified lectures.</li>
<li><strong>Official Go tour</strong> — Completed in two evenings between classes.</li>
</ul>

<div class="callout warning"><strong>Warning:</strong> Do not spawn unbounded goroutines on IO-bound external APIs. Rate limits and connection pools still matter; concurrency is not free magic.</div>

<h2>What I Still Miss About Node.js</h2>

<p>Honesty matters in engineering blogs:</p>

<ol>
<li><strong>JSON ergonomics</strong> — Go structs need tags and occasional custom unmarshaling.</li>
<li><strong>Frontend synergy</strong> — TypeScript end-to-end is hard to beat for full-stack velocity.</li>
<li><strong>Prototyping speed</strong> — nodemon + Express still wins hackathon hour one.</li>
<li><strong>ORM maturity</strong> — Prisma spoiled me; GORM is fine but different.</li>
</ol>

<h2>Study Plan That Worked for a DIU Schedule</h2>

<p>I could not pause university for a bootcamp. This weekly rhythm fit:</p>

<ul>
<li><strong>Monday–Wednesday:</strong> Lectures + A Tour of Go chapters.</li>
<li><strong>Thursday:</strong> Reimplement one Node utility in Go.</li>
<li><strong>Friday:</strong> Code review with a senior from GitHub Bangladesh community.</li>
<li><strong>Weekend:</strong> Ship a tiny CLI or API for Bornosoft internal use.</li>
</ul>

<h2>How Both Languages Coexist at Bornosoft Today</h2>

<p>Our decision tree is practical:</p>

<ul>
<li>Customer dashboard in <strong>Next.js</strong> with Prisma → Node ecosystem.</li>
<li>High-throughput ingestion or PDF batch jobs → <strong>Go</strong>.</li>
<li>Shared contracts via OpenAPI and protobuf where teams meet.</li>
<li>CI builds both with GitHub Actions matrix jobs.</li>
</ul>

<p>Being bilingual makes hiring conversations easier too—I can mentor interns in JavaScript while assigning performance-sensitive tasks in Go.</p>

<h2>Conclusion</h2>

<p>Moving <strong>from Node.js to Golang</strong> did not erase my JavaScript identity—it expanded it. Go gave me concurrency clarity, smaller deployments, and confidence on constrained VPS instances common among Bangladeshi startups.</p>

<p>If you are a DIU student comfortable with async JavaScript, give Go six weeks of deliberate practice. Rebuild one real service, benchmark it, and let data guide your stack choices. Languages are tools; engineering judgment is the career skill.</p>

<p>Share your migration stories via <a href="https://kazinayeem.site">kazinayeem.site</a>—I collect student backend journeys for future workshop material.</p>`,
});

articles.push(...articlesPart2);

console.log("Writing articles 2-13...");
const results = [];
for (const a of articles) {
  results.push(writeArticle(a.index, a.file, a.meta, a.content));
}
console.log("\n=== Files Created ===");
for (const r of results) {
  console.log(`${r.filename}: ${r.words} words`);
}
const below = results.filter((r) => r.words < 1200);
if (below.length) {
  console.error("\nWARNING: Below 1200 words:", below.map((r) => r.filename));
  process.exit(1);
}
console.log(`\nTotal: ${results.length} articles, min ${Math.min(...results.map((r) => r.words))} words`);
