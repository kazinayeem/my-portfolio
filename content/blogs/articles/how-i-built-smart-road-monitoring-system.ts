import { createPost } from "../article-builder";

const post = createPost({
  slug: "how-i-built-smart-road-monitoring-system",
  title: "How I Built a Smart Road Monitoring System",
  seoTitle: "How I Built a Smart Road Monitoring System | Mohammad Ali Nayeem",
  subtitle: "Architecture, challenges, and lessons from a computer-vision capstone-style project",
  description: "Mohammad Ali Nayeem documents how he built a smart road monitoring system using cameras, YOLO inference, and a Node.js backend—covering dataset work, edge deployment, and real-world constraints in Dhaka.",
  category: "Project Showcase",
  tags: ["Computer Vision","YOLO","IoT","Node.js","Project","Smart City"],
  keywords: ["smart road monitoring system","traffic monitoring yolo","computer vision bangladesh","DIU software engineering project"],
  publishedAt: "2025-03-30",
  updatedAt: "2025-04-18",
  featured: false,
  popular: false,
  coverImageAlt: "Dashboard showing live road camera feeds with vehicle detection overlays",
  content: `<p>Traffic congestion, pedestrian safety, and incident response are daily realities in Dhaka. As <strong>Mohammad Ali Nayeem</strong>, a Software Engineering student at <strong>Daffodil International University (DIU)</strong> and founder of <strong>Bornosoft</strong>, I wanted a project that combined coursework skills with something my city could relate to. That motivation became a <strong>smart road monitoring system</strong>—cameras, computer vision, and a backend that turned raw video into actionable events.</p>

<p>This article documents how I built it: goals, architecture, dataset pain, deployment compromises, and honest failures. It is not a paper claiming state-of-the-art accuracy; it is a student builder's field report.</p>

<h2>Problem Definition and Scope</h2>

<p>We narrowed scope to avoid an unfinishable "smart city" fantasy:</p>

<ul>
<li>Detect and count vehicles and pedestrians at a fixed intersection viewpoint</li>
<li>Flag stopped vehicles beyond a time threshold (potential breakdown or illegal stop)</li>
<li>Expose events to a web dashboard for operators</li>
<li>Record aggregated metrics hourly—not store full video long-term (privacy and storage)</li>
</ul>

<div class="callout tip"><strong>Tip:</strong> Write a one-page scope doc before buying hardware. Stakeholders remember demos that work on three features, not slides promising twenty.</div>

<h2>High-Level Architecture</h2>

<p>The system split into edge capture, inference, API, and dashboard:</p>

<ol>
<li><strong>Edge node:</strong> Camera + Python capture service on a small PC (development) and Raspberry Pi (prototype)</li>
<li><strong>Inference worker:</strong> YOLO model consuming frames, emitting detections</li>
<li><strong>Event processor:</strong> Node.js service translating detections into business events</li>
<li><strong>Database:</strong> PostgreSQL for events and aggregates</li>
<li><strong>Dashboard:</strong> Next.js frontend with charts and live status</li>
</ol>

<table>
<thead><tr><th>Layer</th><th>Technology</th><th>Why</th></tr></thead>
<tbody>
<tr><td>Vision</td><td>YOLOv8 + OpenCV</td><td>Speed and Ultralytics tooling</td></tr>
<tr><td>API</td><td>Node.js + Express</td><td>Team familiarity, JSON APIs</td></tr>
<tr><td>DB</td><td>PostgreSQL</td><td>Relational queries for time series</td></tr>
<tr><td>Frontend</td><td>Next.js</td><td>SSR and component ecosystem</td></tr>
<tr><td>Deploy</td><td>Docker Compose</td><td>Reproducible demos</td></tr>
</tbody>
</table>

<h2>Data Collection in Real Dhaka Conditions</h2>

<p>We mounted a camera overlooking a campus gate and a secondary test angle on a busy side street. Collection challenges:</p>

<ul>
<li><strong>Monsoon glare and raindrops</strong> on dome covers</li>
<li><strong>Night headlights</strong> blooming in cheap sensors</li>
<li><strong>Occlusion</strong> from buses, CNGs, and street vendors</li>
<li><strong>Ethics</strong> — blurred faces in stored samples; minimized retention</li>
</ul>

<p>Labeling took weeks. We used Roboflow for team collaboration and exported YOLO format. Class set: person, rickshaw, CNG, bus, car, truck, bicycle.</p>

<div class="callout note"><strong>Note:</strong> Consult university ethics guidelines before recording public spaces. Post signage where possible and avoid facial recognition features in student demos.</div>

<h2>Model Training and Evaluation</h2>

<pre><code class="language-python">from ultralytics import YOLO

model = YOLO("yolov8s.pt")
model.train(
    data="road-monitor/data.yaml",
    epochs=120,
    imgsz=640,
    batch=8,
    device=0,
    project="road-monitor",
    name="v1-dhaka",
)</code></pre>

<p>We tracked mAP but optimized for operational metrics: false stops on moving traffic and missed pedestrians near crosswalks. A model with slightly lower mAP but fewer catastrophic false negatives won.</p>

<h2>Edge Pipeline Code Sketch</h2>

<pre><code class="language-python">import time
import requests
from ultralytics import YOLO

model = YOLO("best.pt")
API = "http://localhost:4000/api/events"

def process_frame(frame):
    results = model(frame, conf=0.45, classes=[0, 1, 2, 3])
    return results[0].boxes

while True:
    frame = capture()
    boxes = process_frame(frame)
    payload = {"timestamp": time.time(), "counts": summarize(boxes)}
    requests.post(API, json=payload, timeout=2)</code></pre>

<div class="callout warning"><strong>Warning:</strong> Synchronous HTTP per frame will bottleneck. We later batched events every N seconds or used MQTT—plan messaging early.</div>

<h2>Backend Event Logic</h2>

<p>The Node.js service applied rules:</p>

<ul>
<li>Increment zone counters when box centroids enter polygons drawn on a calibration UI</li>
<li>Start timer when vehicle centroid stationary within zone</li>
<li>Emit <code>vehicle_stopped</code> after threshold seconds</li>
<li>Deduplicate events with cooldown windows</li>
</ul>

<pre><code class="language-typescript">interface DetectionEvent {
  cameraId: string;
  type: "count" | "vehicle_stopped" | "crowd_density";
  payload: Record<string, number>;
  occurredAt: string;
}</code></pre>

<h2>Dashboard and Operator UX</h2>

<p>Operators needed glanceable truth, not raw tensors. We shipped:</p>

<ul>
<li>Hourly bar charts per vehicle class</li>
<li>Heatmap of stop events by zone</li>
<li>Health panel: camera FPS, inference latency, last heartbeat</li>
</ul>

<p>Design critique from classmates improved contrast for outdoor monitor viewing—accessibility matters in control rooms.</p>

<h2>Deployment with Docker Compose</h2>

<pre><code class="language-yaml">services:
  api:
    build: ./api
    environment:
      DATABASE_URL: postgres://app:secret@db:5432/road
    ports:
      - "4000:4000"
    depends_on:
      - db
  web:
    build: ./web
    ports:
      - "3000:3000"
  db:
    image: postgres:16
    volumes:
      - pgdata:/var/lib/postgresql/data</code></pre>

<p>GitHub Actions built images on push to main; demo server pulled tags for viva week.</p>

<h2>Performance Numbers (Honest)</h2>

<p>On a mid-tier laptop GPU: 25–40 FPS at 640px with YOLOv8s. On Raspberry Pi 4 with TFLite int8 nano model: 3–6 FPS—acceptable for aggregated counts, not cinematic tracking. We chose edge hardware per camera based on SLA.</p>

<h2>Security and Privacy Measures</h2>

<ul>
<li>JWT auth on API routes</li>
<li>No public ingress to camera streams</li>
<li>TLS termination on reverse proxy</li>
<li>Retention policy: delete raw clips after 24h unless incident flagged</li>
</ul>

<h2>What Broke During the Demo</h2>

<ol>
<li>Campus power dip rebooted edge node—added UPS and systemd restart policies.</li>
<li>Clock skew broke event ordering—forced NTP sync.</li>
<li>Polygon calibration stored in localStorage—migrated to server config.</li>
</ol>

<h2>Lessons for Future Student Builders</h2>

<p>Treat calibration UI as first-class. Version datasets like Git tags. Measure in the field, not only on val sets. Pair with a civil engineering or urban planning student if possible—they ask better questions about placement.</p>


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


<h2>Conclusion</h2>

<p>Building a <strong>smart road monitoring system</strong> taught me more than any single exam: data ethics, systems integration, and humility before weather. As a DIU student and Bornosoft founder, I am proud of the prototype—not because it solved Dhaka traffic, but because it shipped end-to-end.</p>

<p>If you are planning a similar capstone, start with one intersection, one model, one dashboard chart. Expand when those work reliably. Share your architecture at <a href="https://kazinayeem.site">kazinayeem.site</a>—I enjoy comparing notes with fellow builders.</p>`,
  faqs: [
      {
          "question": "What hardware did the road monitoring system use?",
          "answer": "The prototype combined IP cameras or USB cameras on edge devices (Raspberry Pi or a small x86 box), with optional GPU acceleration on a central server for heavier models during development."
      },
      {
          "question": "How did you handle poor lighting and rain?",
          "answer": "We augmented training data with brightness shifts, blur, and rain overlays. Physically, angled camera housings and periodic lens cleaning mattered more than any algorithm tweak during monsoon weeks."
      },
      {
          "question": "Was the system real-time?",
          "answer": "Edge inference targeted 8–15 FPS depending on resolution and model size. The dashboard polled aggregated events rather than raw frames to keep bandwidth reasonable on campus networks."
      },
      {
          "question": "What would you do differently next time?",
          "answer": "Invest earlier in a proper annotation workflow, version datasets like code, and design the API for event streams (WebSockets or MQTT) instead of bolting them on after the demo worked."
      }
  ],
  relatedSlugs: ["yolo-object-detection-explained-beginners","building-rest-apis-nodejs","my-journey-robotics-raspberry-pi"],
});

export default post;
