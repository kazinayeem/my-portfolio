export const ARTICLE_14 = `<p>My name is <strong>Mohammad Ali Nayeem</strong>, a Software Engineering student at <strong>Daffodil International University (DIU)</strong> in Dhaka, Bangladesh, and founder of <strong>Bornosoft</strong>. Before I touched cloud consoles or Kubernetes YAML, the device that made engineering feel tangible was a <strong>Raspberry Pi</strong>—a credit-card computer that turned abstract code into motors spinning, LEDs blinking, and cameras seeing.</p>

<p>This article is my honest journey into robotics with Raspberry Pi: what I bought, what broke, what I learned in DIU labs, and how those lessons fed into larger Bornosoft and computer-vision projects. If you are a student in Bangladesh wondering whether robotics is affordable, the answer is yes—with patience, careful part selection, and realistic scope.</p>

<h2>Why Raspberry Pi for Robotics?</h2>

<p>Desktop PCs are powerful but terrible on a robot chassis. Microcontrollers like Arduino excel at real-time GPIO but struggle with cameras, networking, and running Python ML stacks. Raspberry Pi sits in the middle: full Linux, USB, Wi-Fi, HDMI, and enough CPU for OpenCV and lightweight inference.</p>

<p>At DIU, our robotics interest group needed a platform students could program in Python—the language we already used in Data Structures labs and web backends. Pi matched that constraint while letting us SSH in from a laptop without flashing firmware for every experiment.</p>

<div class="callout tip"><strong>Tip:</strong> Buy your Pi from a reputable local seller or official distributor. Counterfeit power supplies and fake boards cause mysterious crashes that waste weeks of debugging.</div>

<h2>My First Kit and Budget Reality</h2>

<p>My first serious purchase included:</p>

<ul>
<li>Raspberry Pi 4 Model B (4GB RAM)</li>
<li>Official USB-C power supply (5V 3A)</li>
<li>32GB Class 10 microSD card</li>
<li>GPIO breakout board and breadboard kit</li>
<li>HC-SR04 ultrasonic sensor, SG90 servo, L298N motor driver</li>
<li>Chassis kit with two DC motors and castor wheel</li>
</ul>

<p>In Dhaka component markets, prices fluctuate. I spent roughly what many students pay for a textbook—significant, but split across two months of saving from freelance curiosity work. The Pi became shared infrastructure: robotics club demos, home MQTT experiments, and a portable DNS test box.</p>

<h3>What I Wish I Knew Before Buying</h3>

<table>
<thead><tr><th>Component</th><th>Beginner Mistake</th><th>Better Approach</th></tr></thead>
<tbody>
<tr><td>Power supply</td><td>Phone charger</td><td>Rated 5V 3A USB-C</td></tr>
<tr><td>SD card</td><td>Unknown brand</td><td>SanDisk/Samsung with wear leveling</td></tr>
<tr><td>Motor driver</td><td>Direct GPIO to motors</td><td>L298N or TB6612 with separate supply</td></tr>
<tr><td>Camera</td><td>1080p expectation on Pi 3</td><td>Pi Camera Module v2 or USB cam with realistic FPS</td></tr>
</tbody>
</table>

<h2>From Blink to Bot: Learning GPIO</h2>

<p>Every robotics journey starts with LED blink. On Pi, I used <code>gpiozero</code> before dropping to <code>RPi.GPIO</code> when I needed finer timing control for servo PWM.</p>

<pre><code class="language-python">from gpiozero import Robot
from time import sleep

robot = Robot(left=(17, 27), right=(22, 23))

robot.forward()
sleep(2)
robot.stop()</code></pre>

<p>That ten-line script was more exciting than any console <code>Hello World</code>. Suddenly software engineering connected to physics: voltage drops, motor torque, wheel slip on tile versus carpet in the DIU project lab.</p>

<div class="callout note"><strong>Note:</strong> Pi GPIO pins are 3.3V logic. Many sensors are 5V tolerant on inputs but never drive 5V into output pins without level shifting.</div>

<h2>Building My First Rover</h2>

<p>Our first rover goal was modest: forward, backward, turn, stop—controlled from a Flask web page on the local network during a department open day. Architecture:</p>

<ol>
<li>Flask app on Pi serving a simple HTML controller</li>
<li><code>gpiozero.Robot</code> wired through L298N to geared DC motors</li>
<li>Ultrasonic sensor loop in a background thread for emergency stop</li>
<li>Phone connected to campus Wi-Fi hitting <code>http://pi.local:5000</code></li>
</ol>

<p>Demo day taught humility. Wi-Fi latency made controls feel mushy. Battery voltage sagged after twenty minutes. A loose jumper wire caused intermittent left-turn-only behavior that looked intentional until we inspected connections.</p>

<div class="callout warning"><strong>Warning:</strong> Never run motor power through the Pi's 5V pin without understanding current draw. Stall current can brown out the board and corrupt your SD card.</div>

<h2>Adding Vision: Camera Modules and OpenCV</h2>

<p>Once locomotion worked, we mounted a Pi Camera and streamed MJPEG to a laptop. OpenCV handled edge detection and color masking before we attempted ML. Frame rates dropped quickly at 720p; we learned to crop regions of interest and downscale early in the pipeline.</p>

<pre><code class="language-python">import cv2
from picamera2 import Picamera2

picam2 = Picamera2()
picam2.configure(picam2.create_preview_configuration(main={"size": (640, 480)}))
picam2.start()

while True:
    frame = picam2.capture_array()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 80, 160)
    cv2.imshow("edges", edges)
    if cv2.waitKey(1) == ord("q"):
        break</code></pre>

<p>This bridge from GPIO robotics to computer vision led directly to my YOLO experiments and the smart road monitoring system I later documented. The Pi was not the final production edge device, but it was the classroom where intuition formed.</p>

<h2>Networking, SSH, and Headless Workflow</h2>

<p>Dragging a monitor to every lab session was impractical. I configured headless boot: enable SSH, set hostname, static IP reservation on the router, and Samba for quick file drops. <code>systemd</code> services auto-started robot control scripts on boot—my first taste of operations engineering.</p>

<h3>Useful Commands I Still Run</h3>

<pre><code class="language-bash"># Check temperature throttling
vcgencmd measure_temp

# GPIO pin state (with wiringpi or libgpiod tools)
pinctrl get

# Service logs for robot app
journalctl -u bornosoft-rover -f</code></pre>

<h2>Integrating Sensors Beyond Ultrasonic</h2>

<p>We experimented with MPU6050 IMU modules for orientation, IR line sensors for track following, and encoder disks for odometry. Each sensor added noise and calibration work. Software Engineering curriculum rarely emphasizes Kalman filters, but robotics forces you to learn them—or accept drift.</p>

<p>I kept a lab notebook (digital, in Git) with wiring diagrams, resistance values, and failure photos. That habit later matched how I document Bornosoft infrastructure changes.</p>

<h2>Power Budgeting on Student Projects</h2>

<p>Mobile robots need portable power. 18650 packs with proper BMS boards worked for short demos; lead-acid was heavy but stable for stationary edge nodes. We calculated approximate draw:</p>

<ul>
<li>Pi 4 idle: ~600mA</li>
<li>Two motors under load: 1–2A peaks</li>
<li>Camera module: +200–300mA</li>
</ul>

<p>Undersized batteries caused voltage dips that reset USB devices mid-inference—maddening to debug without a multimeter.</p>

<h2>Software Stack I Settled On</h2>

<p>Over semesters, my robotics Pi stack stabilized:</p>

<ul>
<li><strong>OS:</strong> Raspberry Pi OS Lite (64-bit)</li>
<li><strong>Language:</strong> Python 3.11+</li>
<li><strong>Vision:</strong> OpenCV, later Ultralytics for YOLO</li>
<li><strong>Web control:</strong> Flask → FastAPI as projects grew</li>
<li><strong>Messaging:</strong> MQTT for sensor telemetry experiments</li>
<li><strong>Deploy:</strong> Docker only on Pi 4 with 4GB+ when images stayed slim</li>
</ul>

<h2>Connecting Robotics to Bornosoft and DIU Coursework</h2>

<p>Not every course aligned with robotics, but overlaps appeared. Operating Systems labs on processes and threads mirrored multi-sensor threading. Computer Networks made MQTT and HTTP debugging intelligible. Software Architecture discussions improved how we split perception, planning, and control modules—even in toy rovers.</p>

<p>At Bornosoft, client IoT prototypes occasionally reused Pi gateways for proof-of-concept demos before moving to industrial hardware. The Pi let us validate software pipelines cheaply.</p>

<h2>Common Failures and How I Fixed Them</h2>

<ol>
<li><strong>Corrupted SD card</strong> — Image backups weekly; switch to USB boot on supported models when budget allows.</li>
<li><strong>GPIO permission errors</strong> — Add user to <code>gpio</code> group; prefer <code>gpiozero</code> abstractions.</li>
<li><strong>Camera not detected</strong> — Enable interface in <code>raspi-config</code>; check ribbon cable orientation.</li>
<li><strong>Thermal throttling</strong> — Heatsinks, airflow, reduce CPU governor during long inference.</li>
</ol>

<h2>What I Would Tell New DIU Robotics Students</h2>

<p>Start small, document obsessively, and pair with someone who owns a multimeter. Join club build nights. Reuse code across semesters. Publish a three-minute demo video—recruiters and internship panels remember motion more than slides.</p>

<p>Raspberry Pi did not make me a roboticist overnight. It made engineering visceral. Every bug had a physical symptom; every fix had a measurable outcome. That feedback loop is why I still recommend Pi as the first robotics computer for Bangladeshi students balancing cost and capability.</p>

<h2>Conclusion</h2>

<p>My journey into robotics with Raspberry Pi began with blinking LEDs and ended up connecting to YOLO road monitoring, MQTT telemetry, and Bornosoft IoT prototypes. The Pi is not the most powerful or the most real-time platform—but it is the most educational per taka spent in my experience.</p>

<p>If you are at DIU or any Bangladesh university with curiosity and a modest budget, buy one good power supply, one honest SD card, and build something that moves. The rest of your Software Engineering path—cloud, DevOps, AI—will feel more grounded when you have shipped electrons, not just npm packages.</p>

<p>Questions about wiring, Python stacks, or club project ideas? Reach me at <a href="https://kazinayeem.site">kazinayeem.site</a>. Happy building.</p>`;

export const ARTICLE_15 = `<p>When I first heard <strong>YOLO</strong> mentioned in a DIU computer vision reading group, I thought it was internet slang—not <strong>You Only Look Once</strong>, one of the most influential object detection families in modern AI. As <strong>Mohammad Ali Nayeem</strong>, Software Engineering student at Daffodil International University and founder of <strong>Bornosoft</strong>, I want to explain YOLO the way I wish someone had explained it to me before I labeled five hundred traffic images in a humid Dhaka afternoon.</p>

<p>This guide is for beginners: intuition first, jargon second, code when it helps. No PhD required—just curiosity and patience for dataset work.</p>

<h2>What Problem Does Object Detection Solve?</h2>

<p>Image classification answers: <em>What is in this image?</em> Object detection answers: <em>What objects are present, where are they, and how confident are we?</em> Output is a set of bounding boxes with class labels—critical for autonomous systems, surveillance analytics, retail counting, and robotics.</p>

<p>Early detectors used multi-stage pipelines: region proposals, then classifiers per region—accurate but slow for video. YOLO reframed detection as a single regression problem over a grid, predicting boxes and class probabilities in one forward pass.</p>

<div class="callout tip"><strong>Tip:</strong> Before training custom models, run pretrained YOLO on your target scenes. Failure modes (night rain, crowded rickshaws, glare) become obvious cheaply.</div>

<h2>YOLO Intuition Without Heavy Math</h2>

<p>Imagine dividing an image into an S×S grid. Each cell responsible for detecting objects whose centers fall inside it predicts:</p>

<ul>
<li>Bounding box coordinates (x, y, width, height)</li>
<li>Confidence score (is there an object?)</li>
<li>Class probabilities (car, person, bus, etc.)</li>
</ul>

<p>Later YOLO versions refined anchor boxes, feature pyramid networks, and loss functions, but the core promise remained: <strong>speed at usable accuracy</strong> for real-time video.</p>

<h3>YOLO Family Timeline (Simplified)</h3>

<table>
<thead><tr><th>Version</th><th>Highlights</th><th>Student Relevance</th></tr></thead>
<tbody>
<tr><td>YOLOv3</td><td>Multi-scale predictions</td><td>Still in older tutorials</td></tr>
<tr><td>YOLOv5</td><td>PyTorch, easy training CLI</td><td>Huge community notebooks</td></tr>
<tr><td>YOLOv8</td><td>Ultralytics unified API</td><td>My default for new projects</td></tr>
<tr><td>YOLOv9+</td><td>Architecture research iterations</td><td>Watch Ultralytics releases</td></tr>
</tbody>
</table>

<h2>Setting Up Your First Environment</h2>

<p>On a laptop with NVIDIA GPU (or Google Colab), install Ultralytics:</p>

<pre><code class="language-bash">python -m venv yolo-env
source yolo-env/bin/activate  # Windows: yolo-env\\Scripts\\activate
pip install ultralytics opencv-python</code></pre>

<p>Verify with a pretrained inference:</p>

<pre><code class="language-python">from ultralytics import YOLO

model = YOLO("yolov8n.pt")  # nano — fastest, good for learning
results = model("street.jpg")
results[0].show()</code></pre>

<p>The <code>n</code> (nano) variant runs on modest hardware; <code>s/m/l/x</code> trade speed for accuracy. For Raspberry Pi edge tests, export to ONNX or TensorFlow Lite after validating on desktop.</p>

<div class="callout note"><strong>Note:</strong> First download pulls weights from the internet. On campus Wi-Fi, do this once and cache models locally for lab sessions.</div>

<h2>Understanding mAP and Confidence Thresholds</h2>

<p>Metrics intimidate beginners. Start with:</p>

<ul>
<li><strong>Precision:</strong> Of predicted boxes labeled "car," how many are actually cars?</li>
<li><strong>Recall:</strong> Of all real cars, how many did we find?</li>
<li><strong>mAP (mean Average Precision):</strong> Single number summarizing detection quality across classes and IoU thresholds.</li>
</ul>

<p>At inference, <code>conf</code> threshold filters weak predictions. Too high misses objects; too low creates box spam. Tune on a validation set representing Bangladesh lighting—not only sunny stock photos.</p>

<h2>Building a Custom Dataset</h2>

<p>Custom training is where student projects live or die. Steps I follow:</p>

<ol>
<li><strong>Define classes narrowly</strong> — "vehicle" vs "car/bus/CNG" matters for traffic analytics.</li>
<li><strong>Collect diverse images</strong> — morning, night, rain, construction zones.</li>
<li><strong>Label consistently</strong> — LabelImg, Roboflow, or CVAT; tight boxes, occluded policy documented.</li>
<li><strong>Split train/val/test</strong> — 70/20/10 rough guide; no duplicate frames across splits.</li>
<li><strong>Write data.yaml</strong> — paths and class names for Ultralytics.</li>
</ol>

<pre><code class="language-yaml">path: ./datasets/dhaka-traffic
train: images/train
val: images/val
names:
  0: person
  1: rickshaw
  2: bus
  3: car</code></pre>

<div class="callout warning"><strong>Warning:</strong> Random internet scraping may violate copyright and bias models. Capture your own footage or use datasets with clear licenses.</div>

<h2>Training Your First Model</h2>

<pre><code class="language-python">from ultralytics import YOLO

model = YOLO("yolov8n.pt")
model.train(
    data="datasets/dhaka-traffic/data.yaml",
    epochs=100,
    imgsz=640,
    batch=16,
    patience=20,
    device=0,
)</code></pre>

<p>Watch loss curves and validate on held-out frames with rickshaws partially occluded—common in Dhaka. Early stopping (<code>patience</code>) prevents overfitting when val mAP plateaus.</p>

<h3>Augmentations That Helped My Road Project</h3>

<ul>
<li>HSV jitter for lighting variance</li>
<li>Mosaic augmentation (built into YOLO training)</li>
<li>Horizontal flip (careful with text-dependent classes)</li>
<li>Blur and noise for cheap camera simulation</li>
</ul>

<h2>Inference on Video Streams</h2>

<pre><code class="language-python">import cv2
from ultralytics import YOLO

model = YOLO("runs/detect/train/weights/best.pt")
cap = cv2.VideoCapture("traffic_clip.mp4")

while cap.isOpened():
    ok, frame = cap.read()
    if not ok:
        break
    results = model(frame, conf=0.4)
    annotated = results[0].plot()
    cv2.imshow("YOLO Traffic", annotated)
    if cv2.waitKey(1) == ord("q"):
        break
cap.release()</code></pre>

<p>For production dashboards, push counts or events to a backend instead of rendering every frame to OpenCV windows.</p>

<h2>Deployment Considerations for Students</h2>

<p>Training on Colab and deploying on Pi is a common path. Export:</p>

<pre><code class="language-python">model.export(format="onnx")  # or tflite, engine</code></pre>

<p>Measure FPS and power draw. Sometimes a smaller model with better camera placement beats a huge model on underpowered edge hardware.</p>

<h2>Common Beginner Mistakes</h2>

<ol>
<li><strong>Label noise</strong> — inconsistent boxes hurt more than fewer images.</li>
<li><strong>Train/test leakage</strong> — adjacent video frames in both splits inflate mAP dishonestly.</li>
<li><strong>Ignoring class imbalance</strong> — oversample rare classes or collect more examples.</li>
<li><strong>Chasing state-of-the-art before baselines</strong> — pretrained nano model + good data often wins.</li>
</ol>

<h2>How YOLO Fit Bornosoft and DIU Work</h2>

<p>YOLO powered prototypes for road monitoring and robotics club demos. It was not magic—it was engineering: data contracts, evaluation honesty, and iteration. Clients care about false positives near school zones, not leaderboard percentages.</p>

<h2>Learning Resources That Actually Helped</h2>

<ul>
<li>Ultralytics documentation and Colab notebooks</li>
<li>Roboflow blog for dataset hygiene</li>
<li>DIU faculty office hours for statistics intuition</li>
<li>Papers (read abstracts first): original YOLO paper for historical context</li>
</ul>


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


<h2>Conclusion</h2>

<p><strong>YOLO object detection</strong> is learnable for beginners who respect data work and metrics. Start with pretrained inference, label a focused dataset, train a nano model, and deploy where your users actually are—Dhaka streets, not only Kaggle thumbnails.</p>

<p>As a DIU Software Engineering student building Bornosoft projects, YOLO taught me that ML is mostly careful dataset design and honest evaluation—with a neural network at the end. Master that mindset and every new vision architecture becomes approachable.</p>

<p>Follow my projects at <a href="https://kazinayeem.site">kazinayeem.site</a> and share your first mAP scores—I remember how motivating early wins felt.</p>`;

export const ARTICLE_16 = `<p>Traffic congestion, pedestrian safety, and incident response are daily realities in Dhaka. As <strong>Mohammad Ali Nayeem</strong>, a Software Engineering student at <strong>Daffodil International University (DIU)</strong> and founder of <strong>Bornosoft</strong>, I wanted a project that combined coursework skills with something my city could relate to. That motivation became a <strong>smart road monitoring system</strong>—cameras, computer vision, and a backend that turned raw video into actionable events.</p>

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



<h2>Stakeholder Feedback Sessions</h2>

<p>We invited two campus security staff members to a feedback session mid-semester. They cared about alert noise, not model architecture. We added a mute window during known construction hours and a big red "camera offline" banner—UX changes that improved trust more than a 2% mAP gain.</p>

<p>Recording short Loom demos for stakeholders who could not attend live reviews kept alignment async. Written meeting notes in the repo <code>docs/</code> folder prevented "you never told us" disputes before final presentation.</p>


<h2>Conclusion</h2>

<p>Building a <strong>smart road monitoring system</strong> taught me more than any single exam: data ethics, systems integration, and humility before weather. As a DIU student and Bornosoft founder, I am proud of the prototype—not because it solved Dhaka traffic, but because it shipped end-to-end.</p>

<p>If you are planning a similar capstone, start with one intersection, one model, one dashboard chart. Expand when those work reliably. Share your architecture at <a href="https://kazinayeem.site">kazinayeem.site</a>—I enjoy comparing notes with fellow builders.</p>`;

export const ARTICLE_17 = `<p>Every Bornosoft repository and my personal portfolio share a silent teammate: <strong>GitHub Actions</strong>. As <strong>Mohammad Ali Nayeem</strong>, Software Engineering student at <strong>Daffodil International University (DIU)</strong> in Bangladesh, I treat CI/CD not as enterprise luxury but as homework for future me— the person who deploys at midnight before a client demo.</p>

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
      node-version: \${{ matrix.node-version }}</code></pre>

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
    token: \${{ secrets.CODECOV_TOKEN }}</code></pre>

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
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: ghcr.io/kazinayeem/api:\${{ github.sha }}</code></pre>

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
    host: \${{ secrets.VPS_HOST }}
    username: deploy
    key: \${{ secrets.VPS_SSH_KEY }}
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



<h2>Deploying Next.js and Node From One Monorepo</h2>

<p>Bornosoft monorepos often run separate workflows per package using matrix paths. Web deploys to Vercel; API deploys via Docker to VPS. Shared lint workflow runs on any TypeScript change. Document each workflow's purpose in <code>.github/README.md</code> so new contributors are not intimidated by YAML walls.</p>

<p>Concurrency groups cancel outdated runs on rapid PR pushes—saves minutes when you are iterating CSS at 1 AM before a DIU deadline.</p>

<pre><code class="language-yaml">concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true</code></pre>


<h2>Conclusion</h2>

<p>A <strong>complete GitHub Actions guide</strong> for students is really a habit guide: test on every PR, build containers you can run locally, deploy with rollback in mind. My DIU coursework improved when professors saw GitHub checks green before grading merges.</p>

<p>Start with the CI snippet in this article on your next Node or Next.js repo. Then add Docker. Then deploy. Bornosoft clients never see the YAML, but they feel the reliability it creates.</p>

<p>Workflow questions? Find me at <a href="https://kazinayeem.site">kazinayeem.site</a>.</p>`;

export const ARTICLE_18 = `<p>Backend APIs are the spine of almost every Bornosoft deliverable and DIU team project I have shipped. As <strong>Mohammad Ali Nayeem</strong>, Software Engineering student at <strong>Daffodil International University</strong> and founder of <strong>Bornosoft</strong> in Bangladesh, I have migrated from tutorial <code>app.js</code> files to structured <strong>Node.js REST APIs</strong> that survive client feedback, minor traffic spikes, and my own future refactors.</p>

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



<h2>Webhooks and Idempotency</h2>

<p>Payment and notification integrations demand idempotency keys. Store processed event IDs in Redis or a database table with TTL to survive provider retries without double-charging clients.</p>

<pre><code class="language-typescript">if (await processedEvents.has(event.id)) {
  return res.status(200).json({ ok: true, duplicate: true });
}
await handlePayment(event);
await processedEvents.add(event.id);</code></pre>

<p>Webhook signature verification (HMAC) is non-negotiable for Bornosoft fintech-adjacent prototypes—never parse body before validating signature header.</p>


<h2>Conclusion</h2>

<p><strong>Building REST APIs with Node.js</strong> is a craft: predictable structure, validated inputs, honest errors, tested routes, and deployable artifacts. DIU students who master this graduate into interns who do not break production on day one.</p>

<p>Pick one course project and refactor it to match this layout. Open-source the result on GitHub—recruiters recognize maturity. Questions welcome at <a href="https://kazinayeem.site">kazinayeem.site</a>.</p>`;

export const ARTICLE_19 = `<p>When classmates ask what tools actually changed my velocity as a developer, the list is shorter than Twitter hype suggests—but each item earned its place through Bornosoft deadlines and DIU labs. I am <strong>Mohammad Ali Nayeem</strong>, Software Engineering student at <strong>Daffodil International University</strong>, founder of <strong>Bornosoft</strong> in Bangladesh. These are the <strong>AI tools every student developer should know</strong>, how I use them responsibly, and where they fail.</p>

<h2>Ground Rules Before the Tool List</h2>

<p>AI tools amplify habits—good or bad. My rules:</p>

<ol>
<li>Understand every line you commit</li>
<li>Never paste secrets into cloud chats</li>
<li>Disclose AI assistance when syllabi require it</li>
<li>Use AI to learn faster, not to skip fundamentals before exams</li>
</ol>

<div class="callout warning"><strong>Warning:</strong> Submitting generated assignments you cannot explain is academic dishonesty and interview suicide. Tools do not remove accountability.</div>

<h2>Category 1: Codebase-Aware Assistants</h2>

<h3>Cursor</h3>

<p>Cursor indexes repositories for multi-file edits—how I scaffold GitHub Actions, refactor Next.js routes, and debug Terraform plans. Student Pro access (see my separate article) made it sustainable.</p>

<h3>GitHub Copilot</h3>

<p>Excellent inline completions in VS Code. Strong for boilerplate tests and repetitive CRUD. Pair with GitHub Education benefits if eligible.</p>

<table>
<thead><tr><th>Tool</th><th>Strength</th><th>Weakness</th></tr></thead>
<tbody>
<tr><td>Cursor</td><td>Agentic refactors</td><td>Learning curve on rules</td></tr>
<tr><td>Copilot</td><td>Low friction completions</td><td>Less whole-repo context</td></tr>
<tr><td>Codeium</td><td>Free tier generous</td><td>Enterprise features vary</td></tr>
</tbody>
</table>

<div class="callout tip"><strong>Tip:</strong> Commit before large agent refactors. Rollback beats manual undo across twelve files.</div>

<h2>Category 2: Conversational Reasoning</h2>

<h3>ChatGPT / Claude</h3>

<p>I use these for architecture whiteboarding, explaining compiler errors in plain Bangla-English mix for study groups, and drafting API contract proposals before coding. They are weak when hallucinating library APIs—always verify against official docs.</p>

<pre><code class="language-text">Prompt pattern I use:
Context: Express API with Prisma, JWT auth
Goal: Add refresh token rotation securely
Constraints: No third-party auth SaaS, PostgreSQL
Ask: Step-by-step plan + pitfalls, then code snippets</code></pre>

<h2>Category 3: Documentation and Learning</h2>

<ul>
<li><strong>Phind / Perplexity</strong> — quick doc lookups with citations</li>
<li><strong>NotebookLM</strong> — digest long PDFs (papers, syllabi)</li>
<li><strong>DeepWiki / repo chat tools</strong> — onboarding to open source</li>
</ul>

<p>During DIU Operating Systems course, NotebookLM helped me quiz myself on scheduling algorithms from scattered slides.</p>

<h2>Category 4: Vision and ML Assistance</h2>

<p>YOLO projects benefited from:</p>

<ul>
<li>Auto-labeling suggestions (human review mandatory)</li>
<li>Augmentation script generation</li>
<li>Metric interpretation helpers</li>
</ul>

<div class="callout note"><strong>Note:</strong> Auto-labels on Dhaka traffic failed on rickshaw occlusion until we manually corrected 200 frames. AI assists; it does not replace domain labeling.</div>

<h2>Category 5: Design and Communication</h2>

<ul>
<li><strong>Figma AI plugins</strong> — wireframe starting points</li>
<li><strong>Gamma / slides AI</strong> — pitch decks for Bornosoft intros</li>
<li><strong>Grammar tools</strong> — polish client emails</li>
</ul>

<p>Clients judge credibility from communication quality, not only code. AI polish is fine; fabricated case studies are not.</p>

<h2>Category 6: DevOps and Infrastructure</h2>

<p>Generating initial Dockerfile and workflow YAML is safe when you read every line:</p>

<pre><code class="language-dockerfile">FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build</code></pre>

<p>I ask models to explain each Dockerfile layer during study—teaches multistage builds better than copying blindly.</p>

<h2>Category 7: Local and Privacy-Friendly Options</h2>

<ul>
<li><strong>Ollama + CodeLlama / DeepSeek Coder</strong> — offline experiments</li>
<li><strong>Continue.dev</strong> — connect local models to editors</li>
</ul>

<p>Useful when working on unreleased Bornosoft features on spotty dorm internet—or when policies forbid cloud inference.</p>

<h2>Daily Workflow Snapshot</h2>

<ol>
<li>Morning: review GitHub issues, plan with Claude (15 minutes)</li>
<li>Coding: Cursor for implementation and tests</li>
<li>Stuck on error: paste minimal repro, not entire repo with secrets</li>
<li>Docs: Phind for syntax, official docs for truth</li>
<li>Evening: write learning notes in my own words—retention check</li>
</ol>

<h2>Cost Management for Bangladeshi Students</h2>

<ul>
<li>Prioritize education tiers and GitHub Pack</li>
<li>Use free models for drafts, premium for hard refactors</li>
<li>Share team subscriptions only where licenses allow</li>
</ul>

<h2>What AI Tools Cannot Do</h2>

<ul>
<li>Replace data structures viva preparation</li>
<li>Guarantee secure auth without your review</li>
<li>Understand your user's cultural context automatically</li>
<li>Ship production on vibe alone</li>
</ul>

<h2>Building an AI Policy for Group Projects</h2>

<p>DIU team projects should agree upfront:</p>

<ul>
<li>Which tools allowed</li>
<li>How to document AI-generated sections</li>
<li>Review process before merge</li>
</ul>


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



<h2>AI in the Hiring Loop</h2>

<p>Recruiters increasingly ask how candidates use AI. Honest answers win: "I use Cursor for boilerplate and tests, but I design schemas and review security myself." Memorizing AI buzzwords without shipping projects fools no one in technical interviews.</p>

<p>Prepare a 60-second story: problem, tool, review step, outcome. That narrative beats listing twelve apps you tried once.</p>


<h2>Conclusion</h2>

<p>The <strong>AI tools every student developer should know</strong> are not a trophy case of subscriptions—they are a workflow: codebase assistants, conversational planners, doc search, and honest review. I built Bornosoft and my portfolio faster with them, but grades and clients still measure my understanding, not my prompt count.</p>

<p>Start with one coding assistant and one chat model this week. Apply them to a real repo. Measure hours saved. Adjust. Share your stack at <a href="https://kazinayeem.site">kazinayeem.site</a>.</p>`;

export const ARTICLE_20 = `<p>Three years ago I walked into <strong>Daffodil International University (DIU)</strong> as a first-year Software Engineering student with a laptop, curiosity, and no clear picture of what "engineering" meant day to day. Today I am <strong>Mohammad Ali Nayeem</strong>, founder of <strong>Bornosoft</strong>, builder of robotics and computer-vision projects, and someone still learning in every semester. This is my <strong>Software Engineering journey at DIU</strong>—honest, messy, and hopefully useful if you are walking a similar path in Bangladesh.</p>

<h2>Year One: Foundations and Reality Check</h2>

<p>First year hit with programming fundamentals, discrete math, and the shock that typing speed is not the same as problem solving. I spent nights on C and Java assignments, learning Git after a painful "lost USB drive" week.</p>

<ul>
<li>Joined peer study groups for calculus and programming</li>
<li>Built a CLI student grade calculator—first repo I showed publicly</li>
<li>Discovered YouTube is supplement, not substitute, for lectures</li>
</ul>

<div class="callout tip"><strong>Tip:</strong> Sit front-row in lab sessions. TA debugging help is a multiplier first year.</div>

<h2>Year Two: Web, Data, and Bornosoft Begins</h2>

<p>Second year introduced databases, OOP depth, and networking basics. I registered <strong>Bornosoft</strong> as a serious side identity—not just a logo, but a container for client prototypes and learning invoices.</p>

<p>First paid small task: landing page for a local business. Stack was HTML/CSS/JS—humble, but taught client communication more than React ever did initially.</p>

<h3>Courses That Mattered Most</h3>

<table>
<thead><tr><th>Course Area</th><th>Real-World Carryover</th></tr></thead>
<tbody>
<tr><td>Data Structures</td><td>Interview prep, efficient backend logic</td></tr>
<tr><td>DBMS</td><td>Prisma/SQL design for APIs</td></tr>
<tr><td>Computer Networks</td><td>Debugging APIs, MQTT robotics</td></tr>
<tr><td>Software Engineering</td><td>Agile rituals in group projects</td></tr>
</tbody>
</table>

<h2>Year Three: Specialization Pressure</h2>

<p>Electives, internships chatter, and specialization anxiety arrived together. I leaned into:</p>

<ul>
<li>Computer vision and YOLO for road monitoring capstone direction</li>
<li>DevOps labs—Jenkins, Docker, AWS free tier</li>
<li>Open source contributions to pad GitHub heatmap meaningfully</li>
</ul>

<div class="callout note"><strong>Note:</strong> Specialization is a marketing term until you ship projects. Let work guide depth.</div>

<h2>Balancing GPA, Bornosoft, and Health</h2>

<p>I did not ace every course while running a startup identity—and that is fine. Strategies:</p>

<ol>
<li>Protect sleep before exam weeks—no all-nighters for client work</li>
<li>Reuse aligned coursework (networking project ≈ Bornosoft infra demo)</li>
<li>Say no to scope creep in April and November</li>
<li>Walk campus—Dhaka stress needs movement</li>
</ol>

<div class="callout warning"><strong>Warning:</strong> Burnout is not a badge. Professors grant extensions when you communicate early—clients need timelines managed similarly.</div>

<h2>Robotics Club and Hands-On Learning</h2>

<p>GPIO, Raspberry Pi, and club demos taught lessons lectures skipped: power budgets, EMI noise, demo gods. Those weekends fed YOLO and smart city curiosity more than any single slide deck.</p>

<h2>Building in Public</h2>

<p>I launched <a href="https://kazinayeem.site">kazinayeem.site</a> to document projects, blog learnings, and rank for searches like "DIU software engineer portfolio." Recruiters messaged me from LinkedIn after seeing consistent commits—not one viral repo.</p>

<pre><code class="language-json">{
  "portfolioGoals": [
    "Deployed demos",
    "Readable README",
    "Blog explaining decisions",
    "Contact path clear"
  ]
}</code></pre>

<h2>Internship and Job Market Observations</h2>

<p>Bangladesh market wants:</p>

<ul>
<li>GitHub with depth, not quantity</li>
<li>Communication in English and Bangla</li>
<li>Full stack breadth with one strong lane (mine: DevOps + AI)</li>
<li>Humility in interviews—explain tradeoffs</li>
</ul>

<h2>Faculty and Mentorship</h2>

<p>DIU faculty varied—some pushed industry practice, others classic theory. I benefited most from instructors who allowed flexible project topics tied to real problems (traffic, IoT, automation).</p>

<h2>Mistakes I Made</h2>

<ol>
<li>Tutorial hell before building originals</li>
<li>Ignoring test writing until a Bornosoft bug embarrassed me</li>
<li>Comparing progress to LinkedIn influencers</li>
<li>Neglecting networking with seniors who already placed</li>
</ol>

<h2>Advice for Incoming DIU Software Engineering Students</h2>

<ul>
<li>Learn Git in week one</li>
<li>Pair program early</li>
<li>Enter hackathons even if you lose</li>
<li>Keep a brag document of wins weekly</li>
<li>Help juniors when you are sophomore—teaching cements knowledge</li>
</ul>

<h2>Where Bornosoft Fits</h2>

<p>Bornosoft is not separate from my education—it is the pressure chamber where deadlines, invoices, and maintainability meet. Every client lesson maps to a course concept eventually.</p>


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



<h2>Courses I Would Retake Mindfully</h2>

<p>Software Engineering process courses felt dry until Bornosoft forced real requirements gathering. Retaking those concepts through client work inverted the boredom—I wish I had volunteered as note-taker in more cross-team DIU projects earlier to practice facilitation skills that complement coding.</p>

<p>Mathematics courses support ML intuition; do not skip office hours when proofs confuse you—vision papers assume linear algebra comfort.</p>


<h2>Conclusion</h2>

<p>My <strong>Software Engineering journey at DIU</strong> is ongoing. Grades matter; shipped projects matter more for the work I want. If you are in Dhaka reading this between classes, know that consistency over years beats genius weeks—I'm proof in progress, not a finished expert.</p>

<p>Reach out via my portfolio if you want to compare schedules, electives, or startup balancing acts. We rise faster together.</p>`;

export const ARTICLE_21 = `<p>Every semester someone in the DIU developer circle asks: should I learn <strong>React</strong> or jump straight to <strong>Next.js</strong>? I am <strong>Mohammad Ali Nayeem</strong>, Software Engineering student at <strong>Daffodil International University</strong>, founder of <strong>Bornosoft</strong>, and maintainer of this portfolio on Next.js. Here is a practical comparison—not framework tribalism—for students choosing where to invest limited hours.</p>

<h2>What React Actually Is</h2>

<p>React is a UI library for component-based interfaces. It handles state, rendering, and hooks—not routing, data fetching conventions, or build tooling by itself. Create React App (legacy) or Vite + React supplies the surrounding project.</p>

<ul>
<li>Components and props</li>
<li>Hooks: useState, useEffect, useMemo</li>
<li>Client-side rendering (CSR) by default</li>
<li>Ecosystem: React Router, TanStack Query, Zustand</li>
</ul>

<h2>What Next.js Adds</h2>

<p>Next.js is a React framework from Vercel adding:</p>

<ul>
<li>File-based routing (App Router in modern versions)</li>
<li>Server Components and SSR/SSG/ISR</li>
<li>API routes or server actions</li>
<li>Image and font optimization</li>
<li>Deployment integrations</li>
</ul>

<div class="callout tip"><strong>Tip:</strong> Learn React hooks before App Router server components—otherwise hydration errors feel supernatural.</div>

<h2>Rendering Models Compared</h2>

<table>
<thead><tr><th>Approach</th><th>Pros</th><th>Cons</th></tr></thead>
<tbody>
<tr><td>CSR (React SPA)</td><td>Simple mental model, great for dashboards</td><td>SEO harder, slow first paint if bloated</td></tr>
<tr><td>SSR (Next.js)</td><td>Fast first paint, SEO friendly</td><td>Server costs, complexity</td></tr>
<tr><td>SSG (Next.js)</td><td>Fast static pages (blogs, marketing)</td><td>Rebuild for content changes unless ISR</td></tr>
</tbody>
</table>

<h2>When I Choose Plain React</h2>

<p>Bornosoft internal admin panels behind login—no SEO needs, heavy tables and forms, client-side routing fine. Vite startup is instant; bundle size monitored with rollup visualizer.</p>

<pre><code class="language-bash">npm create vite@latest admin -- --template react-ts
cd admin && npm install && npm run dev</code></pre>

<h2>When I Choose Next.js</h2>

<p>Public marketing sites, blogs (like this one), portfolio, anything needing:</p>

<ul>
<li>Metadata and Open Graph tags per page</li>
<li>Static generation for performance</li>
<li>Edge middleware for geo or auth redirects</li>
</ul>

<pre><code class="language-typescript">export const metadata = {
  title: "Mohammad Ali Nayeem | Software Engineer",
  description: "DIU student, Bornosoft founder, AI and DevOps builder",
};</code></pre>

<h2>Learning Path I Recommend</h2>

<ol>
<li>JavaScript ES6+ fluency</li>
<li>React components and hooks on small widgets</li>
<li>React Router + data fetching patterns</li>
<li>Migrate a page to Next.js App Router</li>
<li>Add SSR blog or MDX content</li>
</ol>

<div class="callout note"><strong>Note:</strong> Skipping straight to Next.js without React fundamentals works until it does not—usually during client/server component boundary bugs.</div>

<h2>Data Fetching: Old vs New Mental Model</h2>

<p>Classic React: useEffect + fetch → loading states manually.</p>

<p>Next.js App Router: async server components fetch on server; client components for interactivity only.</p>

<pre><code class="language-typescript">// Server Component example
async function BlogList() {
  const posts = await getPosts();
  return (
    <ul>
      {posts.map((p) => (
        <li key={p.slug}>{p.title}</li>
      ))}
    </ul>
  );
}</code></pre>

<h2>Deployment Differences</h2>

<ul>
<li>React SPA: static hosting (Netlify, S3+CloudFront)</li>
<li>Next.js: Vercel easiest; Node server or Docker for self-host</li>
</ul>

<p>DIU students on free tiers should read function timeout limits before building heavy SSR dashboards on serverless.</p>

<h2>Performance Pitfalls</h2>

<ul>
<li>Huge client bundles in React—code split routes</li>
<li>Overusing client components in Next—defeats SSR benefits</li>
<li>Unoptimized images—Next Image component helps public sites</li>
</ul>

<div class="callout warning"><strong>Warning:</strong> Copy-pasting Next.js tutorials from Pages Router while starting App Router projects causes import path chaos. Pick one router model per repo.</div>

<h2>Job Market Angle in Bangladesh</h2>

<p>Both appear in JDs. React is non-negotiable baseline; Next.js is increasingly default for startups shipping web products. Knowing both plus one meta-framework deep dive beats shallow framework tourism.</p>

<h2>How This Portfolio Uses Next.js</h2>

<p>kazinayeem.site uses App Router, TypeScript blog articles, structured SEO, and static generation—choices aligned with discoverability and performance goals I would not prioritize in a private admin SPA.</p>


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



<h2>SEO Checklist: React SPA vs Next.js</h2>

<ul>
<li>Unique title and meta description per route</li>
<li>Open Graph images for social shares</li>
<li>Structured data JSON-LD for articles and person schema</li>
<li>Sitemap.xml and robots.txt</li>
<li>Canonical URLs avoiding duplicate content</li>
</ul>

<p>Next.js metadata API centralizes these concerns. React SPAs need react-helmet-async plus prerender services or SSR add-ons—extra glue students forget until Google Search Console shows indexing issues.</p>


<h2>Conclusion</h2>

<p><strong>React vs Next.js</strong> is order of operations: learn React deeply, adopt Next.js when SEO, routing, and full-stack colocation help your product. For DIU coursework demos, either works—match the rubric and your deployment budget.</p>

<p>Build one project in each style this year. Compare DX and deploy pain. Your future self picks faster. Discuss at <a href="https://kazinayeem.site">kazinayeem.site</a>.</p>`;

export const ARTICLE_22 = `<p>DevOps lectures at DIU introduced both virtual machines and Docker in the same week—understandably confusing. As <strong>Mohammad Ali Nayeem</strong>, Software Engineering student and <strong>Bornosoft</strong> founder in Bangladesh, I have provisioned EC2 instances, run VirtualBox labs, and containerized production APIs. This article clarifies <strong>Docker vs virtual machines</strong> for students who need mental models, not buzzwords.</p>

<h2>Virtual Machines 101</h2>

<p>A VM is a full guest operating system running on a hypervisor (KVM, VMware, Hyper-V). Each VM includes its own kernel (for paravirtualized guests), virtualized CPU/RAM/disk, and isolated network stack.</p>

<ul>
<li><strong>Hypervisor</strong> schedules hardware access</li>
<li><strong>Guest OS</strong> may be Ubuntu, Windows Server, etc.</li>
<li><strong>Apps</strong> run inside guest as usual</li>
</ul>

<p>Strong isolation—different kernels—but heavy: gigabytes per instance, minutes to boot.</p>

<h2>Docker Containers 101</h2>

<p>Containers share the <strong>host kernel</strong>. They package application binaries, libraries, and config—not a full OS. Docker (container runtime + tooling) builds images from Dockerfiles and runs isolated processes with namespaces and cgroups.</p>

<div class="callout tip"><strong>Tip:</strong> Think VM = house with plumbing and electric meter. Container = furnished apartment in the same building sharing utilities.</div>

<h2>Side-by-Side Comparison</h2>

<table>
<thead><tr><th>Dimension</th><th>Virtual Machine</th><th>Docker Container</th></tr></thead>
<tbody>
<tr><td>Isolation</td><td>Strong (separate kernel)</td><td>Process-level (shared kernel)</td></tr>
<tr><td>Startup</td><td>Minutes</td><td>Seconds</td></tr>
<tr><td>Size</td><td>GBs</td><td>MBs typical</td></tr>
<tr><td>Density</td><td>Low</td><td>High on same host</td></tr>
<tr><td>Windows on Linux</td><td>Yes</td><td>No (Linux containers on Linux)</td></tr>
</tbody>
</table>

<h2>Architecture Diagram (Conceptual)</h2>

<pre><code class="language-text">VM Stack:
App → Guest OS → Hypervisor → Host OS → Hardware

Container Stack:
App → Container → Docker Engine → Host OS (Linux) → Hardware</code></pre>

<h2>When VMs Still Win</h2>

<ul>
<li>Legacy Windows apps needing full OS</li>
<li>Hard multi-tenant isolation requirements</li>
<li>Different kernel versions mandatory</li>
<li>Running Docker inside regulated environments sometimes mandated on VMs</li>
</ul>

<p>AWS EC2 is VM-backed—you have been using VMs even when you say "cloud server."</p>

<div class="callout note"><strong>Note:</strong> Docker Desktop on Mac/Windows runs Linux inside a lightweight VM—containers still Linux-targeted in most student workflows.</div>

<h2>When Docker Wins for Student Projects</h2>

<ul>
<li>Identical dev/prod environments for Node APIs</li>
<li>Compose stacks: API + Postgres + Redis locally</li>
<li>CI pipelines building immutable images</li>
<li>Microservice coursework without RAM meltdown</li>
</ul>

<pre><code class="language-dockerfile">FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY dist ./dist
USER node
CMD ["node", "dist/server.js"]</code></pre>

<h2>Security Considerations</h2>

<p>Containers are not magic sandboxes. Kernel exploits can affect all containers. VMs add boundary for untrusted workloads. For Bornosoft client multi-tenant SaaS someday, isolation strategy must be threat-modeled—not assumed.</p>

<div class="callout warning"><strong>Warning:</strong> Never run <code>docker run --privileged</code> on production hosts because a tutorial said so.</div>

<h2>Performance and I/O</h2>

<p>Containers near native CPU/memory for CPU-bound Node APIs. Disk I/O on macOS Docker Desktop can feel slow—WSL2 on Windows improved my experience. VMs add more overhead but predictable for monolithic databases in labs.</p>

<h2>Learning Lab Progression I Recommend</h2>

<ol>
<li>Install Ubuntu in VirtualBox—understand SSH, systemd, apt</li>
<li>Deploy a Node app manually on that VM</li>
<li>Containerize the same app</li>
<li>Compare deploy time, size, logs</li>
<li>Introduce docker compose with database</li>
</ol>

<h2>Kubernetes Enters the Chat</h2>

<p>Kubernetes orchestrates containers across clusters—not replacement for understanding VMs or Docker. DIU advanced DevOps: K8s on top of VM worker nodes in cloud accounts. Learn Docker Compose first.</p>

<h2>Cost Implications for Bangladeshi Students</h2>

<p>Running three VMs on a laptop kills battery; a compose stack of three containers is lighter for daily dev. Cloud bills: smaller containers mean faster CI and cheaper registry storage—still watch free tier limits.</p>

<h2>Bornosoft Production Pattern</h2>

<p>We run containerized APIs on VM hosts (or managed container services) depending on client budget. Immutable images tagged per commit; VMs patched monthly; rollback = previous image tag.</p>

<h2>Common Exam Questions Answered</h2>

<ul>
<li><strong>Is Docker a VM?</strong> No.</li>
<li><strong>Can containers run without Docker?</strong> Yes—containerd, Podman exist.</li>
<li><strong>Do containers include the Linux kernel?</strong> No—they bundle user space.</li>
</ul>


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



<h2>Container Image Hardening Basics</h2>

<p>Run as non-root user, use minimal base images (alpine or distroless), scan with Trivy in CI, and pin image digests for production deploys. VMs need OS patching schedules; containers need image rebuild pipelines—both are operational work, not one-time setup.</p>

<p>Distroless images confuse beginners but teach dependency clarity—worth trying once on a Bornosoft side service after you are comfortable with Dockerfile debugging.</p>


<h2>Conclusion</h2>

<p><strong>Docker vs virtual machines</strong> is not either-or for serious engineers. VMs provide isolation and OS flexibility; containers provide density and dev velocity. DIU students should practice both, then choose per workload.</p>

<p>Containerize your next assignment API, then deploy the same app on a plain EC2 Ubuntu VM. Feel the difference. Document it on <a href="https://kazinayeem.site">kazinayeem.site</a>.</p>`;

export const ARTICLE_23 = `<p>Infrastructure used to mean clicking AWS console buttons until something worked—then forgetting what I clicked. <strong>Terraform</strong> changed that for me. As <strong>Mohammad Ali Nayeem</strong>, DIU Software Engineering student and <strong>Bornosoft</strong> founder in Bangladesh, I want to share <strong>Terraform basics for beginners</strong> with the same HCL files I wish I had before deleting a production security group by mistake in week one.</p>

<h2>What Is Infrastructure as Code?</h2>

<p>Infrastructure as Code (IaC) stores servers, networks, and services in version-controlled definitions. Terraform by HashiCorp uses declarative HCL: you describe desired state; Terraform plans and applies changes via providers (AWS, Azure, GCP, etc.).</p>

<ul>
<li><strong>Declarative:</strong> specify end state, not every CLI step</li>
<li><strong>Plan before apply:</strong> preview diffs</li>
<li><strong>State tracking:</strong> maps config to real resource IDs</li>
</ul>

<div class="callout tip"><strong>Tip:</strong> Run <code>terraform plan</code> like <code>git diff</code>—never skip reviewing destroys.</div>

<h2>Install and First Init</h2>

<pre><code class="language-bash">brew install terraform  # or download from hashicorp.com
mkdir bornosoft-infra && cd bornosoft-infra
terraform init</code></pre>

<p><code>terraform init</code> downloads provider plugins declared in configuration.</p>

<h2>Minimal AWS Provider Setup</h2>

<pre><code class="language-hcl">terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-southeast-1"
}</code></pre>

<p>Use named AWS profiles and billing alarms before creating resources. Bangladesh students often pick Singapore region for latency.</p>

<h2>Your First Resource: S3 Bucket</h2>

<pre><code class="language-hcl">resource "aws_s3_bucket" "logs" {
  bucket = "bornosoft-student-logs-nayeem"
  tags = {
    Project = "learning"
    Owner   = "mohammad-ali-nayeem"
  }
}</code></pre>

<pre><code class="language-bash">terraform plan
terraform apply</code></pre>

<div class="callout warning"><strong>Warning:</strong> S3 bucket names are globally unique. Append random suffixes in real modules.</div>

<h2>Variables and Outputs</h2>

<pre><code class="language-hcl">variable "environment" {
  type    = string
  default = "dev"
}

output "bucket_name" {
  value = aws_s3_bucket.logs.bucket
}</code></pre>

<p>Variables parameterize environments; outputs feed other modules or CI scripts.</p>

<h2>State: The Sensitive Brain</h2>

<p>Terraform state records real-world IDs. Losing state means orphan resources or duplicate creation.</p>

<ul>
<li>Local <code>terraform.tfstate</code> OK for solo labs</li>
<li>Remote S3 backend + DynamoDB lock for teams</li>
<li>Never commit secrets in tfvars to Git</li>
</ul>

<div class="callout note"><strong>Note:</strong> Add <code>*.tfstate*</code> to <code>.gitignore</code> day one. Use <code>terraform.tfstate.backup</code> awareness.</div>

<h2>Modules for Reuse</h2>

<pre><code class="language-hcl">module "vpc" {
  source = "./modules/vpc"
  cidr   = "10.0.0.0/16"
}</code></pre>

<p>Modules package repeated patterns—VPC, EC2 app server, security groups—for Bornosoft client templates.</p>

<h2>EC2 Example for Jenkins Lab</h2>

<pre><code class="language-hcl">resource "aws_instance" "jenkins" {
  ami           = "ami-0abcdef1234567890"
  instance_type = "t3.micro"
  tags = {
    Name = "diu-jenkins-lab"
  }
}</code></pre>

<p>Pair with security group resources limiting SSH to your IP—not <code>0.0.0.0/0</code> permanently.</p>

<h2>Plan Output Reading</h2>

<table>
<thead><tr><th>Symbol</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td>+</td><td>Create</td></tr>
<tr><td>~</td><td>Update in-place</td></tr>
<tr><td>-/+</td><td>Destroy and recreate</td></tr>
<tr><td>-</td><td>Destroy</td></tr>
</tbody>
</table>

<h2>Workspaces and Environments</h2>

<p><code>terraform workspace</code> separates dev/staging/prod state files. Alternatively use separate backend keys per environment—pick one strategy and document it.</p>

<h2>Integrating with GitHub Actions</h2>

<pre><code class="language-yaml">- uses: hashicorp/setup-terraform@v3
- run: terraform init
- run: terraform plan -no-color
  env:
    AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}</code></pre>

<p>OIDC federation to AWS is better than long-lived keys—learn after basics.</p>

<h2>Common Beginner Mistakes</h2>

<ol>
<li>Applying without plan review</li>
<li>Hardcoding AMIs that expire</li>
<li>Wide open security groups</li>
<li>No <code>terraform destroy</code> after labs—surprise bills</li>
<li>Checking secrets into Git</li>
</ol>

<h2>Terraform vs ClickOps</h2>

<p>Console clicking is fine for exploration; Terraform captures decisions. When Bornosoft rebuilds staging, a PR with HCL beats tribal memory.</p>

<h2>Learning Path After Basics</h2>

<ul>
<li>Remote state backend</li>
<li>IAM least privilege roles</li>
<li>Modules from Terraform Registry</li>
<li>Policy as code (OPA/Sentinel) in enterprise</li>
</ul>


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



<h2>Terraform Cloud and Team Collaboration</h2>

<p>Free Terraform Cloud workspaces suit student teams needing remote runs and state locking without wiring S3 yourself. Connect VCS, trigger plans on PRs, require approvals before apply to shared staging—mirrors professional workflows on a budget.</p>

<p>Practice writing meaningful PR comments from plan output: "this adds port 443 ingress from 0.0.0.0/0—intentional for public web?" Security review beats blind apply clicks.</p>


<h2>Conclusion</h2>

<p><strong>Terraform basics</strong>—providers, resources, variables, state, plan/apply—are the foundation of modern DevOps careers. DIU students pairing Terraform with AWS free tier learn more than reading slides alone.</p>

<p>Write HCL for one S3 bucket and one t3.micro this weekend. Destroy it Monday. That loop builds confidence. Share configs (without secrets) at <a href="https://kazinayeem.site">kazinayeem.site</a>.</p>`;

export const ARTICLE_24 = `<p>Tutorials end at "it works on localhost." Production begins when users, money, and 3 AM alerts enter the picture. As <strong>Mohammad Ali Nayeem</strong>, Software Engineering student at <strong>DIU</strong> and founder of <strong>Bornosoft</strong> in Bangladesh, I have shipped demos that embarrassed me and later systems I am proud to maintain. This guide covers <strong>building production-ready full stack applications</strong>—the checklist beyond tutorial happy paths.</p>

<h2>Define Production-Ready</h2>

<p>Production-ready means another engineer can deploy, observe, and fix your app without calling you—ideally. Minimum bar:</p>

<ul>
<li>Automated tests on critical paths</li>
<li>CI/CD pipeline</li>
<li>Secrets not in Git</li>
<li>Health checks and logs</li>
<li>Rollback strategy</li>
<li>Basic security headers and auth review</li>
</ul>

<div class="callout tip"><strong>Tip:</strong> Write a one-page runbook before calling anything "production." If deploy steps live only in your head, it is not ready.</div>

<h2>Architecture: Start Monolith, Modular Inside</h2>

<p>Microservices are not homework extra credit. Begin with a modular monolith:</p>

<pre><code class="language-text">next-web/     # Next.js frontend
api/          # Node.js REST API
packages/shared-types/
infra/        # Terraform or compose</code></pre>

<p>Clear module boundaries let you split services later if traffic demands—not day one.</p>

<h2>Frontend Production Concerns</h2>

<ul>
<li>Environment-specific config via build args or runtime injection</li>
<li>Error boundaries and friendly failure pages</li>
<li>Performance: Lighthouse budgets on PRs</li>
<li>Accessibility: keyboard nav and contrast</li>
</ul>

<pre><code class="language-typescript">// Example: centralize API base URL
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";</code></pre>

<h2>Backend Production Concerns</h2>

<table>
<thead><tr><th>Area</th><th>Practice</th></tr></thead>
<tbody>
<tr><td>Validation</td><td>Zod/Joi on all inputs</td></tr>
<tr><td>Auth</td><td>Short-lived tokens, refresh rotation</td></tr>
<tr><td>DB</td><td>Migrations in CI, connection pooling</td></tr>
<tr><td>Errors</td><td>Structured codes, no stack leaks</td></tr>
</tbody>
</table>

<div class="callout note"><strong>Note:</strong> Use transactions for multi-step financial or inventory operations—partial updates corrupt data silently.</div>

<h2>Testing Pyramid for Student Teams</h2>

<ol>
<li>Unit tests for pure functions and validators</li>
<li>Integration tests for API routes with test DB</li>
<li>Smoke E2E for login and checkout happy path</li>
<li>Manual exploratory before release</li>
</ol>

<pre><code class="language-typescript">describe("auth", () => {
  it("rejects weak passwords", async () => {
    const res = await request(app).post("/api/register").send({
      email: "a@diu.edu.bd",
      password: "123",
    });
    expect(res.status).toBe(422);
  });
});</code></pre>

<h2>CI/CD Gate</h2>

<p>GitHub Actions runs lint, test, build, docker push on main. Deploy to staging automatically; production via tagged release with approval.</p>

<div class="callout warning"><strong>Warning:</strong> Skipping CI because "this change is small" is how small changes take down email login for everyone.</div>

<h2>Observability</h2>

<ul>
<li><strong>Logs:</strong> JSON structured, request ID propagated</li>
<li><strong>Metrics:</strong> latency p95, error rate, queue depth</li>
<li><strong>Tracing:</strong> OpenTelemetry when microservices grow</li>
<li><strong>Errors:</strong> Sentry with release tags</li>
</ul>

<pre><code class="language-json">{"level":"error","msg":"payment_failed","orderId":"ord_12","code":"GATEWAY_TIMEOUT"}</code></pre>

<h2>Security Checklist</h2>

<ul>
<li>HTTPS everywhere</li>
<li>Helmet, CORS allowlist</li>
<li>Rate limits on auth</li>
<li>Dependency scanning (Dependabot)</li>
<li>OWASP top 10 review annually</li>
<li>Backups encrypted, restore tested</li>
</ul>

<h2>Data and Migrations</h2>

<p>Prisma migrate in CI before deploy. Never edit production DB by hand without ticket. Seed scripts separate from prod data.</p>

<h2>Performance and Scaling Path</h2>

<ol>
<li>Optimize queries and indexes first</li>
<li>Add caching (Redis) for hot reads</li>
<li>Horizontal scale stateless API behind load balancer</li>
<li>CDN for static assets</li>
<li>Only then consider service split</li>
</ol>

<h2>Documentation That Matters</h2>

<ul>
<li>README: setup in under 10 minutes</li>
<li>ARCHITECTURE.md: diagrams and tradeoffs</li>
<li>API OpenAPI spec</li>
<li>CHANGELOG for client communication</li>
</ul>

<h2>Bornosoft Lessons</h2>

<p>First client MVP skipped tests—regression cost a weekend. Second client got CI and staging; bugs caught before demo. Clients feel professionalism in stability, not feature count alone.</p>

<h2>DIU Project Upgrade Path</h2>

<p>Take any semester CRUD app:</p>

<ol>
<li>Add Docker compose</li>
<li>Add GitHub Actions test job</li>
<li>Deploy to free/cheap host</li>
<li>Add Sentry free tier</li>
<li>Write runbook</li>
</ol>

<p>Portfolio depth jumps one level.</p>


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



<h2>Staging Environments That Mirror Production</h2>

<p>Staging should use the same Docker images, environment variable shape, and database engine as production—only scaled down. Mocking Postgres with SQLite in staging hid migration bugs for me once; never again.</p>

<p>Seed staging with anonymized production-like volumes so edge cases (long unicode names, empty carts) appear before users find them.</p>


<h2>Conclusion</h2>

<p><strong>Building production-ready full stack applications</strong> is habits: tests, pipelines, logs, security, docs. Tutorials teach syntax; production teaches responsibility. As a DIU student and Bornosoft founder, I am still refining this checklist—use it as a living document on your repos.</p>

<p>Ship one project through the full checklist this semester. Tag me at <a href="https://kazinayeem.site">kazinayeem.site</a> when health checks go green in prod.</p>`;

export const ARTICLE_25 = `<p>People ask where a DIU Software Engineering student focused on AI, DevOps, and cloud plans to be in five years. I am <strong>Mohammad Ali Nayeem</strong>, founder of <strong>Bornosoft</strong> in Bangladesh, and honestly the map keeps evolving—but direction matters more than certainty. This article shares my <strong>future roadmap across AI, DevOps, and cloud computing</strong>: skills, certifications, projects, and principles guiding decisions after graduation.</p>

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



<h2>Public Accountability</h2>

<p>I publish roadmap updates on this blog partly for accountability—silent goals die. Quarterly public posts force honest reflection: what shipped, what slipped, what I learned from Bornosoft client work versus coursework.</p>

<p>If you are building a similar roadmap, consider a lightweight GitHub README career doc linked from your portfolio—not for vanity, but for mentor feedback and recruiter clarity about your direction in AI, DevOps, and cloud.</p>


<h2>Conclusion</h2>

<p>My <strong>future roadmap in AI, DevOps, and cloud</strong> is a living compass—not a contract. DIU gave foundation; Bornosoft gives practice; the cloud gives scale. I will update this path publicly as I learn, fail, and recalibrate.</p>

<p>If you are charting a similar journey from Bangladesh, connect at <a href="https://kazinayeem.site">kazinayeem.site</a>. The best roadmaps are the ones we walk together—and occasionally laugh at when plans meet Dhaka traffic reality.</p>`;
