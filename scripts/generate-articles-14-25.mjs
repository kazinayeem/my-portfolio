#!/usr/bin/env node
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "../content/blogs/articles");
mkdirSync(OUT_DIR, { recursive: true });

function writeArticle(meta, content) {
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
  publishedAt: "${meta.publishedAt}",
  updatedAt: "${meta.updatedAt}",
  featured: ${meta.featured},
  popular: ${meta.popular},
  coverImageAlt: "${meta.coverImageAlt}",
  content: \`${content}\`,
  faqs: ${JSON.stringify(meta.faqs, null, 4).replace(/\n/g, "\n  ")},
  relatedSlugs: ${JSON.stringify(meta.relatedSlugs)},
});

export default post;
`;
  const path = join(OUT_DIR, meta.filename);
  writeFileSync(path, file, "utf8");
  const words = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(Boolean).length;
  console.log(`✓ ${meta.filename} (${words} words)`);
  return { filename: meta.filename, words };
}

const AUTHOR = "Mohammad Ali Nayeem";
const results = [];

results.push(writeArticle(
  {
    filename: "my-journey-robotics-raspberry-pi.ts",
    slug: "my-journey-robotics-raspberry-pi",
    title: "My Journey Into Robotics With Raspberry Pi",
    seoTitle: "My Journey Into Robotics With Raspberry Pi | Mohammad Ali Nayeem",
    subtitle: "How a DIU Software Engineering student turned a credit-card computer into a robotics learning platform",
    description: "Mohammad Ali Nayeem shares his hands-on journey learning robotics with Raspberry Pi as a Software Engineering student at DIU and founder of Bornosoft in Bangladesh.",
    category: "Raspberry Pi",
    tags: ["Raspberry Pi", "Robotics", "GPIO", "Python", "DIU", "Bangladesh"],
    keywords: ["raspberry pi robotics beginner", "DIU robotics project", "GPIO python tutorial", "raspberry pi bangladesh student"],
    publishedAt: "2025-02-28",
    updatedAt: "2025-03-15",
    featured: false,
    popular: false,
    coverImageAlt: "Raspberry Pi board connected to motors and sensors on a robotics workbench",
    relatedSlugs: ["my-first-machine-learning-project-yolo-robotics", "yolo-object-detection-explained-beginners", "how-i-built-smart-road-monitoring-system"],
    faqs: [
      { question: "Which Raspberry Pi model is best for robotics beginners?", answer: "The Raspberry Pi 4 Model B with 4GB RAM is an excellent starting point. It handles camera modules, GPIO control, and lightweight Python scripts comfortably. For battery-powered bots, consider Pi Zero 2 W for smaller form factors." },
      { question: "Do I need electronics knowledge before starting?", answer: "Basic understanding of voltage, current, and breadboard wiring helps, but you can learn alongside GPIO tutorials. Start with LEDs and buttons before attaching motor drivers." },
      { question: "Can DIU students afford Raspberry Pi projects in Bangladesh?", answer: "Yes. A Pi board, power supply, and starter sensor kit cost less than many textbooks. Buy from reputable local sellers, share kits with lab partners, and reuse components across semesters." },
      { question: "Should I use Python or C++ for Pi robotics?", answer: "Python with libraries like RPi.GPIO, gpiozero, and OpenCV is ideal for learning speed. Move to C++ only when you need hard real-time performance on microcontrollers paired with the Pi." },
    ],
  },
  `<p>My name is <strong>${AUTHOR}</strong>, a Software Engineering student at <strong>Daffodil International University (DIU)</strong> in Dhaka and founder of <strong>Bornosoft</strong>. Most people assume robotics starts with expensive industrial arms or university research labs. My story started differently: a <strong>Raspberry Pi</strong> sitting on my desk next to a half-finished assignment on data structures, a cheap motor driver from Old Dhaka's electronics market, and a stubborn belief that hardware and software should be learned together—not in separate semesters.</p>

<p>This article documents my robotics journey with Raspberry Pi: the mistakes, the breakthroughs, and the practical lessons I wish someone had told me before I fried my first GPIO pin. If you are a student in Bangladesh trying to bridge the gap between coursework and real-world engineering, I wrote this for you.</p>

<h2>Why Raspberry Pi Instead of Arduino First</h2>

<p>Arduino dominates introductory robotics courses worldwide, and for good reason—it is excellent for timing-critical motor control. I chose Raspberry Pi first because my background was already in <strong>Python</strong>, <strong>Linux</strong>, and web backends. The Pi runs a full operating system, which means I could SSH from my laptop, install OpenCV, stream camera frames, and eventually connect inference pipelines to <strong>YOLO</strong> models without switching ecosystems.</p>

<p>The trade-off is real: Linux is not a hard real-time OS, so precise PWM servo control can jitter under load. I learned to offload time-sensitive tasks to an Arduino Nano communicating over serial when needed. That hybrid architecture—Pi for brain, microcontroller for reflexes—became a pattern I still use in Bornosoft prototypes.</p>

<div class="callout tip"><strong>Tip:</strong> Treat Raspberry Pi as a small Linux server with GPIO pins. If you can deploy a Node.js API, you can SSH into a Pi and treat robotics like edge computing.</div>

<h2>My First Hardware Shopping List</h2>

<p>Budget matters for DIU students. Here is what I actually bought for my first mobile robot base:</p>

<ul>
<li><strong>Raspberry Pi 4 (4GB)</strong> — Enough RAM for camera capture and lightweight CV scripts.</li>
<li><strong>Official 15W USB-C power supply</strong> — Cheap adapters cause brownouts and corrupt SD cards.</li>
<li><strong>32GB Class 10 microSD</strong> — Flash Raspberry Pi OS with the Imager tool.</li>
<li><strong>L298N motor driver</strong> — Classic dual H-bridge for DC gear motors.</li>
<li><strong>HC-SR04 ultrasonic sensor</strong> — Simple obstacle detection before vision.</li>
<li><strong>Pi Camera Module v2</strong> — Unlocks computer vision projects.</li>
<li><strong>Portable power bank</strong> — For demos outside the lab.</li>
</ul>

<table>
<thead><tr><th>Component</th><th>Purpose</th><th>Skill Learned</th></tr></thead>
<tbody>
<tr><td>GPIO LEDs</td><td>Hello World hardware</td><td>Output pins, resistors</td></tr>
<tr><td>Ultrasonic sensor</td><td>Distance measurement</td><td>Timing, input pins</td></tr>
<tr><td>Motor driver</td><td>Movement</td><td>Power isolation, PWM</td></tr>
<tr><td>Camera module</td><td>Vision</td><td>OpenCV, streaming</td></tr>
</tbody>
</table>

<h2>Setting Up the Development Environment</h2>

<p>I flashed <strong>Raspberry Pi OS Lite</strong> headless, enabled SSH, and connected over Wi-Fi from my hostel room. My workflow mirrored remote server administration—exactly the DevOps mindset I later applied to cloud deployments.</p>

<pre><code class="language-bash"># On the Pi after first boot
sudo apt update && sudo apt upgrade -y
sudo apt install python3-pip python3-venv git -y
python3 -m venv ~/robot-env
source ~/robot-env/bin/activate
pip install gpiozero opencv-python-headless numpy</code></pre>

<p>I version-controlled robot code in a GitHub repo named <code>diu-robotics-lab</code>, with branches for each experiment. Committing wiring diagrams as README images saved me hours when I reassembled the chassis after transport home for semester break.</p>

<h3>GPIO Safety Lessons I Learned the Hard Way</h3>

<p>GPIO pins operate at 3.3V logic. Connecting 5V directly can damage the Pi. I once connected a sensor incorrectly and lost a pin group until I replaced the board. Always read datasheets, use level shifters when required, and power motors from a separate supply with shared ground.</p>

<div class="callout warning"><strong>Warning:</strong> Never power motors directly from Pi 5V pins. Motor back-EMF can reset or destroy your board. Use a motor driver with external power.</div>

<h2>Project 1: Line-Following Robot</h2>

<p>My first autonomous behavior was line following using infrared reflectance sensors. The algorithm was simple: read left and right sensors, adjust motor speeds. But implementation taught me about calibration, ambient light interference, and PID control basics.</p>

<pre><code class="language-python">from gpiozero import Motor
from time import sleep

left_motor = Motor(forward=17, backward=18)
right_motor = Motor(forward=22, backward=23)

def follow_line(left_on_line, right_on_line):
    if left_on_line and not right_on_line:
        left_motor.backward(0.4)
        right_motor.forward(0.6)
    elif right_on_line and not left_on_line:
        left_motor.forward(0.6)
        right_motor.backward(0.4)
    else:
        left_motor.forward(0.5)
        right_motor.forward(0.5)</code></pre>

<p>Tuning motor speeds on uneven DIU lab floors was humbling. Robotics is not only code—it is physics, friction, and battery voltage curves.</p>

<h2>Project 2: Camera Streaming and OpenCV</h2>

<p>Adding the Pi Camera transformed the platform. I built a Flask app that streamed MJPEG to my browser, then added OpenCV filters to detect colored objects. This bridge from embedded Linux to computer vision led directly to my YOLO experiments documented in other articles.</p>

<div class="callout note"><strong>Note:</strong> Use <code>libcamera</code> stack on modern Pi OS. Legacy <code>raspistill</code> tutorials may confuse beginners.</div>

<h2>Integrating With University Coursework</h2>

<p>DIU Software Engineering covers algorithms, databases, and software design—not always hands-on robotics. I mapped Pi projects to course concepts deliberately:</p>

<ol>
<li><strong>Data Structures</strong> — Graph search for maze solving with ultrasonic maps.</li>
<li><strong>Operating Systems</strong> — Process scheduling analogies between robot tasks.</li>
<li><strong>Networking</strong> — MQTT telemetry from Pi to a laptop dashboard.</li>
<li><strong>Software Engineering</strong> — Modular packages for sensors, actuators, and planners.</li>
</ol>

<p>Presenting these connections in viva sessions impressed faculty more than copying slides from textbooks.</p>

<h2>Connecting Robotics to Bornosoft</h2>

<p>As Bornosoft founder, I explored whether edge devices could support client use cases—inventory counting, basic surveillance analytics, agricultural monitoring. Raspberry Pi proved that MVPs do not require cloud GPUs on day one. A Pi with a coral USB accelerator or optimized ONNX model can demo value before scaling infrastructure.</p>

<h2>Common Failures and Debugging Checklist</h2>

<ul>
<li><strong>SD card corruption</strong> — Use quality cards; enable read-only root when possible.</li>
<li><strong>Insufficient power</strong> — Undervoltage lightning bolt icon means stop and fix supply.</li>
<li><strong>Permission errors on GPIO</strong> — Add user to <code>gpio</code> group or use gpiozero defaults.</li>
<li><strong>Wi-Fi dropouts</strong> — Use static IP or mDNS (<code>raspberrypi.local</code>) consistently.</li>
<li><strong>Overheating</strong> — Add heatsinks or a fan for sustained CV workloads.</li>
</ul>

<h2>What I Would Do Differently</h2>

<p>I spent two weeks on messy jumper wires before learning proper chassis design. I would buy a modular robot kit earlier, document pin mappings in a single spreadsheet, and invest in a logic analyzer sooner. I also would pair with electronics-focused teammates earlier—robotics is interdisciplinary, and DIU has talented EEE students who complement software builders.</p>

<h2>Recommended Learning Path for Bangladeshi Students</h2>

<ol>
<li>Flash Pi OS and master SSH headless setup.</li>
<li>Blink LEDs, read buttons, understand pull-up/down resistors.</li>
<li>Build a sensor project (distance, temperature, or IMU).</li>
<li>Add motors and implement teleop control from keyboard.</li>
<li>Integrate camera + OpenCV before jumping to deep learning.</li>
<li>Deploy a small web dashboard for monitoring.</li>
</ol>

<h2>Conclusion</h2>

<p>My Raspberry Pi robotics journey transformed how I think as a software engineer. Hardware constraints force clarity. GPIO timing teaches humility. Camera pipelines connect embedded systems to modern AI. As a DIU student and Bornosoft founder in Bangladesh, the Pi proved that world-class learning does not require world-class budgets—it requires curiosity, documentation, and consistent weekend hours.</p>

<p>If you are starting today, buy one sensor, make one LED blink, and commit your code to GitHub. The robot you imagine is built one verified commit at a time. Reach out via <a href="https://kazinayeem.site">kazinayeem.site</a> if you want wiring reviews or project ideas—I am always happy to help fellow builders.</p>`
));

results.push(writeArticle(
  {
    filename: "yolo-object-detection-explained-beginners.ts",
    slug: "yolo-object-detection-explained-beginners",
    title: "YOLO Object Detection Explained for Beginners",
    seoTitle: "YOLO Object Detection Explained for Beginners | Mohammad Ali Nayeem",
    subtitle: "A clear introduction to You Only Look Once—from theory to training your first model as a student",
    description: "Mohammad Ali Nayeem breaks down YOLO object detection for beginners, covering architecture, training workflows, and practical tips from DIU robotics and computer vision projects.",
    category: "YOLO",
    tags: ["YOLO", "Object Detection", "Computer Vision", "Deep Learning", "Python"],
    keywords: ["YOLO explained beginners", "object detection tutorial", "train YOLO model", "YOLOv8 student project"],
    publishedAt: "2025-03-14",
    updatedAt: "2025-04-01",
    featured: false,
    popular: true,
    coverImageAlt: "Bounding boxes drawn around detected objects in a street scene image",
    relatedSlugs: ["my-first-machine-learning-project-yolo-robotics", "my-journey-robotics-raspberry-pi", "how-i-built-smart-road-monitoring-system"],
    faqs: [
      { question: "What does YOLO stand for?", answer: "YOLO stands for You Only Look Once. Unlike two-stage detectors that propose regions then classify them, YOLO predicts bounding boxes and class probabilities in a single forward pass—making it fast enough for real-time video." },
      { question: "Which YOLO version should beginners use?", answer: "YOLOv8 or YOLOv11 from Ultralytics are beginner-friendly with excellent documentation, CLI tools, and export options for edge deployment on Raspberry Pi or NVIDIA Jetson." },
      { question: "How much data do I need to train YOLO?", answer: "Start with 100–300 labeled images per class for proof-of-concept. Real production models need more diversity—lighting, angles, occlusions. Use augmentation aggressively when data is limited." },
      { question: "Can YOLO run on a laptop without GPU?", answer: "Training is painfully slow on CPU. Use Google Colab free GPU, Kaggle notebooks, or university lab machines. Inference on CPU is feasible for small models and low FPS requirements." },
    ],
  },
  `<p>When I first heard <strong>YOLO</strong> mentioned in a DIU lab discussion, half the room thought it was a meme and the other half thought it required a PhD in mathematics. I was somewhere in the middle—a Software Engineering student at <strong>Daffodil International University</strong>, building robotics experiments with a Raspberry Pi, trying to understand how computers see objects in real time. This guide is the explanation I needed back then: practical, honest, and grounded in projects I actually shipped at <strong>Bornosoft</strong>.</p>

<p><strong>You Only Look Once (YOLO)</strong> revolutionized object detection by treating it as a single regression problem over an image grid. Instead of scanning an image thousands of times with sliding windows, YOLO divides the image into cells and predicts bounding boxes and class probabilities simultaneously. That design choice is why YOLO powers everything from drone surveillance demos to my smart road monitoring prototype.</p>

<h2>The Object Detection Problem</h2>

<p>Image classification answers: what is in this image? Object detection answers: what objects are present, and where are they? The output is a set of bounding boxes with class labels and confidence scores. Applications include autonomous vehicles, retail analytics, safety monitoring on construction sites, and robotics navigation.</p>

<p>Traditional pipelines used region proposal networks (RPN) followed by classifiers—accurate but slow. YOLO trades some localization precision for dramatic speed gains, which matters when your Raspberry Pi camera streams 15 frames per second and you need inference under 100 milliseconds.</p>

<div class="callout tip"><strong>Tip:</strong> Define your classes narrowly at first. Detecting vehicle is easier than simultaneously distinguishing sedan, truck, rickshaw, and CNG in Dhaka traffic without sufficient labeled data.</div>

<h2>How YOLO Works Conceptually</h2>

<h3>Grid-Based Prediction</h3>

<p>YOLO resizes input images (commonly 640×640) and passes them through a convolutional backbone—often CSPDarknet or similar architectures in modern versions. The network outputs a tensor where each cell predicts multiple bounding boxes. Each box includes coordinates (x, y, width, height), objectness score, and class probabilities.</p>

<h3>Non-Max Suppression (NMS)</h3>

<p>Cells near object centers may all fire predictions. NMS removes duplicate boxes by keeping the highest-confidence detection and suppressing overlapping lower-confidence boxes. Tuning NMS IoU threshold affects precision vs recall.</p>

<table>
<thead><tr><th>Concept</th><th>Meaning</th><th>Student Mistake</th></tr></thead>
<tbody>
<tr><td>IoU</td><td>Overlap between predicted and ground truth boxes</td><td>Ignoring IoU when evaluating models</td></tr>
<tr><td>mAP</td><td>Mean average precision across classes</td><td>Chasing mAP without checking real-world FPS</td></tr>
<tr><td>Confidence</td><td>Model certainty for a detection</td><td>Setting threshold too low → false positives</td></tr>
<tr><td>Anchor boxes</td><td>Prior box shapes (older YOLO)</td><td>Confusion with anchor-free modern heads</td></tr>
</tbody>
</table>

<h2>YOLO Versions: A Quick Timeline</h2>

<ul>
<li><strong>YOLOv1–v3</strong> — Pioneered real-time unified detection; foundational papers worth skimming.</li>
<li><strong>YOLOv4/v5</strong> — Community and commercial adoption exploded; v5 especially approachable.</li>
<li><strong>YOLOv8</strong> — Ultralytics rewrite with clean CLI, segmentation, and pose variants.</li>
<li><strong>YOLOv9–v11</strong> — Architecture improvements; check Ultralytics docs for current defaults.</li>
</ul>

<div class="callout note"><strong>Note:</strong> Paper names and version numbers move fast. Anchor your learning on the Ultralytics Python API and export tooling rather than memorizing every architectural tweak.</div>

<h2>Training Your First YOLO Model</h2>

<p>My first successful training run used a custom dataset of campus walkway images—pedestrians, bicycles, and backpacks. Here is the workflow I recommend:</p>

<ol>
<li><strong>Collect images</strong> — Phone camera is fine; prioritize diverse lighting and angles.</li>
<li><strong>Label with Roboflow or CVAT</strong> — Export in YOLO format (normalized xywh labels).</li>
<li><strong>Organize dataset</strong> — train/val/test splits; keep leakage out of validation.</li>
<li><strong>Train with Ultralytics</strong> — Start from pretrained COCO weights (transfer learning).</li>
<li><strong>Evaluate</strong> — Review confusion matrices and failure cases manually.</li>
<li><strong>Export</strong> — ONNX or TensorRT for deployment targets.</li>
</ol>

<pre><code class="language-python">from ultralytics import YOLO

model = YOLO("yolov8n.pt")  # nano model for edge devices
results = model.train(
    data="campus.yaml",
    epochs=50,
    imgsz=640,
    batch=16,
    patience=10,
    device=0,
)
metrics = model.val()
print(metrics.box.map50)</code></pre>

<h2>Data Labeling Best Practices</h2>

<p>Garbage labels produce garbage detectors. Tight boxes around objects matter. Include hard negatives—images with no objects of interest. For Bangladeshi street scenes, label auto-rickshaws, informal roadside stalls, and low-light conditions representative of evening traffic in Dhaka.</p>

<div class="callout warning"><strong>Warning:</strong> Respect privacy when collecting surveillance-style datasets. Blur faces if your project is public, and follow university ethics guidelines for human subjects.</div>

<h2>Evaluation Beyond mAP</h2>

<p>Academic metrics are necessary but insufficient. On my road monitoring prototype, a model with decent mAP still failed during heavy rain because training data lacked weather augmentation. I added synthetic rain overlays and brightness jitter, which improved recall in monsoon-season tests.</p>

<h3>Metrics I Track on Real Projects</h3>

<ul>
<li>Inference latency (ms) on target hardware</li>
<li>False positives per hour on static camera feeds</li>
<li>Miss rate on critical classes (e.g., pedestrians)</li>
<li>Model size (MB) for edge deployment</li>
</ul>

<h2>Deploying YOLO on Edge Devices</h2>

<p>After training, I exported to ONNX and ran inference on a Raspberry Pi 4 with reduced input resolution. FPS was modest—acceptable for monitoring, not for high-speed tracking. For Bornosoft demos, we sometimes paired edge capture with cloud inference when bandwidth allowed.</p>

<pre><code class="language-bash">yolo export model=runs/detect/train/weights/best.pt format=onnx opset=12
python inference_edge.py --model best.onnx --source pi_camera</code></pre>

<h2>Common Beginner Errors</h2>

<ol>
<li>Training on duplicated images across train and val splits.</li>
<li>Using too-large models (yolov8x) when yolov8n suffices on Pi.</li>
<li>Skipping learning rate and augmentation tuning.</li>
<li>Expecting COCO-pretrained classes to magically detect local vehicles without fine-tuning.</li>
<li>Ignoring class imbalance—rare classes get ignored by the loss.</li>
</ol>

<h2>Connecting YOLO to Robotics</h2>

<p>On my Pi rover, YOLO detections fed a simple state machine: stop if person detected within two meters, otherwise continue lane following. The fusion of classical robotics and learned perception is where modern embedded AI gets exciting—and employable.</p>

<h2>Learning Resources That Helped Me</h2>

<ul>
<li>Ultralytics documentation and Colab notebooks</li>
<li>Original YOLO papers (skim architecture diagrams)</li>
<li>Roboflow blog tutorials on dataset health</li>
<li>DIU peer study groups sharing GPU Colab slots</li>
</ul>

<h2>Conclusion</h2>

<p>YOLO is not magic—it is a well-engineered convolutional detector optimized for speed. As a DIU Software Engineering student and Bornosoft founder, YOLO bridged my web development skills and robotics ambitions. Start small: one class, one hundred images, one trained nano model. Review failures, improve data, retrain. That loop is how real computer vision engineers grow.</p>

<p>Questions about datasets or deployment? Connect via <a href="https://kazinayeem.site">kazinayeem.site</a>. I am happy to help fellow Bangladeshi students ship their first detector responsibly.</p>`
));

results.push(writeArticle(
  {
    filename: "how-i-built-smart-road-monitoring-system.ts",
    slug: "how-i-built-smart-road-monitoring-system",
    title: "How I Built a Smart Road Monitoring System",
    seoTitle: "How I Built a Smart Road Monitoring System | Mohammad Ali Nayeem",
    subtitle: "From YOLO detection to dashboards—a DIU student's end-to-end project breakdown",
    description: "Mohammad Ali Nayeem details how he built a smart road monitoring system using YOLO, Raspberry Pi, Node.js APIs, and real-time dashboards as a DIU student and Bornosoft founder.",
    category: "Project Showcase",
    tags: ["Computer Vision", "YOLO", "IoT", "Node.js", "Project"],
    keywords: ["smart road monitoring system", "YOLO traffic detection", "DIU project showcase", "computer vision bangladesh"],
    publishedAt: "2025-03-30",
    updatedAt: "2025-04-18",
    featured: false,
    popular: false,
    coverImageAlt: "Traffic camera feed with AI bounding boxes on a monitoring dashboard",
    relatedSlugs: ["yolo-object-detection-explained-beginners", "my-journey-robotics-raspberry-pi", "building-rest-apis-nodejs"],
    faqs: [
      { question: "What hardware is needed for a road monitoring prototype?", answer: "A Raspberry Pi 4 or NVIDIA Jetson, IP or USB camera, stable power, and optional 4G router for remote sites. Prototypes work indoors pointing at recorded traffic footage before field deployment." },
      { question: "Can this system count vehicles accurately?", answer: "Yes, with a well-placed camera and line-crossing logic. Accuracy depends on occlusion, angle, and model fine-tuning on local vehicle types including CNG, buses, and rickshaws." },
      { question: "Is real-time processing possible on student budgets?", answer: "YOLO nano models achieve usable FPS on Pi at reduced resolution. For higher throughput, use Jetson or send frames to a cloud GPU sparingly." },
      { question: "What backend stack did you use?", answer: "Node.js with Express for ingestion APIs, WebSocket for live updates, PostgreSQL for event storage, and a React dashboard for visualization." },
    ],
  },
  `<p>Traffic congestion in Dhaka is not an abstract statistic—it is a daily reality for every DIU student commuting to campus. As <strong>Mohammad Ali Nayeem</strong>, Software Engineering student and <strong>Bornosoft</strong> founder, I wanted to build something that combined my growing skills in <strong>YOLO</strong>, <strong>Raspberry Pi</strong> edge computing, and <strong>Node.js</strong> backends into a single demonstrable system: a <strong>smart road monitoring platform</strong> that detects vehicles, counts traffic flow, and surfaces alerts on a live dashboard.</p>

<p>This article is a complete project showcase—not a marketing brochure. I cover architecture decisions, failures during monsoon testing, and the code patterns I would reuse in production.</p>

<h2>Problem Statement and Goals</h2>

<p>Municipal-scale solutions cost millions. My student-scale goals were deliberately narrow:</p>

<ul>
<li>Detect and classify vehicles in a fixed camera view.</li>
<li>Count entries/exits using a virtual line across the roadway.</li>
<li>Flag unusual congestion (vehicle count threshold over time).</li>
<li>Stream annotated frames to a web dashboard.</li>
<li>Log events for hourly analytics charts.</li>
</ul>

<div class="callout tip"><strong>Tip:</strong> Scope your MVP to one intersection or one campus gate. Success on a constrained scene beats failure on city-wide ambition.</div>

<h2>System Architecture</h2>

<p>The system follows classic edge-to-cloud patterns simplified for student infrastructure:</p>

<ol>
<li><strong>Edge node</strong> — Raspberry Pi captures frames, runs YOLO inference, computes counts.</li>
<li><strong>Ingestion API</strong> — Node.js Express receives JSON events and optional frame thumbnails.</li>
<li><strong>Database</strong> — PostgreSQL stores timestamped counts and alert records.</li>
<li><strong>Realtime layer</strong> — WebSocket pushes updates to the dashboard.</li>
<li><strong>Frontend</strong> — React chart components and live MJPEG or canvas overlay.</li>
</ol>

<table>
<thead><tr><th>Layer</th><th>Technology</th><th>Why</th></tr></thead>
<tbody>
<tr><td>Detection</td><td>YOLOv8n</td><td>Fast enough on Pi, easy Ultralytics tooling</td></tr>
<tr><td>Edge runtime</td><td>Python + OpenCV</td><td>Mature camera pipelines</td></tr>
<tr><td>API</td><td>Node.js / Express</td><td>Matches my Bornosoft stack</td></tr>
<tr><td>Storage</td><td>PostgreSQL</td><td>Reliable analytics queries</td></tr>
<tr><td>Dashboard</td><td>React + Recharts</td><td>Component ecosystem</td></tr>
</tbody>
</table>

<h2>Dataset and Model Training</h2>

<p>I recorded hours of traffic footage near a campus-adjacent road (with permissions and privacy considerations). Frames were extracted every two seconds, labeled in Roboflow with classes: car, bus, CNG, motorcycle, bicycle, pedestrian.</p>

<p>Training used transfer learning from COCO weights. The critical insight for Bangladeshi roads was adding local vehicle diversity—especially CNG green bodies and mixed lane discipline that western datasets underrepresent.</p>

<pre><code class="language-yaml"># dataset.yaml
path: ./road-dataset
train: images/train
val: images/val
names:
  0: car
  1: bus
  2: cng
  3: motorcycle
  4: bicycle
  5: pedestrian</code></pre>

<div class="callout note"><strong>Note:</strong> Label pedestrians carefully if your analytics influence safety decisions. False negatives matter more than false positives in those classes.</div>

<h2>Edge Inference Pipeline</h2>

<p>The Pi script loads ONNX-exported weights, reads camera frames, runs inference, applies NMS, and tracks objects across frames with a simple IOU-based tracker. When a tracked object crosses a defined line, an event fires.</p>

<pre><code class="language-python">import cv2
from ultralytics import YOLO
import requests

model = YOLO("best.onnx")
cap = cv2.VideoCapture(0)
COUNT_LINE_Y = 320
counts = {"in": 0, "out": 0}

while True:
    ret, frame = cap.read()
    if not ret:
        break
    results = model(frame, imgsz=416, conf=0.45)
    for box in results[0].boxes:
        x1, y1, x2, y2 = map(int, box.xyxy[0])
        cls = int(box.cls[0])
        cy = (y1 + y2) // 2
        if crossed_line(prev_y, cy, COUNT_LINE_Y):
            publish_event(cls, direction="in")
    cv2.imshow("monitor", frame)</code></pre>

<h2>Backend API Design</h2>

<p>Express endpoints were intentionally minimal—student projects become unmaintainable when APIs sprawl.</p>

<pre><code class="language-javascript">import express from "express";
import { WebSocketServer } from "ws";

const app = express();
app.use(express.json({ limit: "2mb" }));

app.post("/api/events", async (req, res) => {
  const { cameraId, className, direction, confidence, ts } = req.body;
  await db.events.insert({ cameraId, className, direction, confidence, ts });
  wss.broadcast(JSON.stringify({ type: "count", className, direction }));
  res.status(201).json({ ok: true });
});

app.get("/api/analytics/hourly", async (req, res) => {
  const rows = await db.events.hourlyBuckets(req.query.date);
  res.json(rows);
});</code></pre>

<div class="callout warning"><strong>Warning:</strong> Secure ingestion endpoints before exposing Pis to the public internet. Use API keys, VPN, or MQTT with TLS—even for demos.</div>

<h2>Dashboard and Alerting</h2>

<p>The React dashboard shows live counts, a rolling 24-hour chart, and alert banners when vehicles-per-minute exceeds a threshold for five consecutive minutes. WebSocket reconnect logic handled flaky dorm Wi-Fi during development.</p>

<h2>Challenges and How I Solved Them</h2>

<h3>Rain and Low Light</h3>

<p>Monsoon evenings degraded detections. I added brightness augmentation during training and a physical camera hood to reduce water droplets on the lens.</p>

<h3>Occlusion at Busy Hours</h3>

<p>Overlapping vehicles confused the line counter. I switched from center-point crossing to bounding-box edge crossing and increased camera elevation in the prototype mount.</p>

<h3>Pi Thermal Throttling</h3>

<p>Sustained inference triggered CPU throttling. A small fan and lowering resolution from 640 to 416 stabilized FPS.</p>

<h2>Testing Strategy</h2>

<ul>
<li>Unit tests for line-crossing geometry functions.</li>
<li>Integration tests for API validation middleware.</li>
<li>Recorded video replay tests for detector consistency.</li>
<li>Manual field tests with ground-truth manual counts for one hour.</li>
</ul>

<h2>What I Would Improve Next</h2>

<ol>
<li>Multi-camera synchronization with NTP.</li>
<li>Kubernetes deployment for API scaling (overkill for MVP but good practice).</li>
<li>Grafana dashboards instead of custom charts.</li>
<li>Edge TPU or Jetson for higher FPS.</li>
<li>Formal ethics review for public camera placement.</li>
</ol>

<h2>Lessons for DIU Project Showcases</h2>

<p>Faculty and employers respond to systems, not notebooks. Document architecture diagrams, show live demos, explain trade-offs, and quantify accuracy. My viva improved dramatically when I presented failure videos alongside success metrics—honesty signals engineering maturity.</p>

<h2>Conclusion</h2>

<p>Building this smart road monitoring system connected every skill I cultivated at DIU and Bornosoft: labeling data patiently, training YOLO responsibly, writing APIs that survive real payloads, and designing dashboards humans understand. It is not city infrastructure yet—it is a foundation.</p>

<p>If you are building a similar showcase, start with recorded video before live roads, and ship the dashboard early. Stakeholders forgive imperfect mAP when they see live counts moving. Reach me at <a href="https://kazinayeem.site">kazinayeem.site</a> for architecture feedback.</p>`
));

results.push(writeArticle(
  {
    filename: "complete-guide-github-actions.ts",
    slug: "complete-guide-github-actions",
    title: "Complete Guide to GitHub Actions for Developers",
    seoTitle: "Complete Guide to GitHub Actions | Mohammad Ali Nayeem",
    subtitle: "CI/CD workflows, secrets, and deployment patterns from a student shipping Bornosoft projects",
    description: "Mohammad Ali Nayeem's complete GitHub Actions guide covering workflows, jobs, secrets, matrix builds, Docker publishing, and deployment for student and startup projects.",
    category: "GitHub Actions",
    tags: ["GitHub Actions", "CI/CD", "DevOps", "Automation", "Docker"],
    keywords: ["github actions tutorial", "CI/CD github actions", "github actions deploy", "github actions docker"],
    publishedAt: "2025-04-12",
    updatedAt: "2025-05-02",
    featured: false,
    popular: true,
    coverImageAlt: "GitHub Actions workflow diagram with build test and deploy stages",
    relatedSlugs: ["docker-vs-virtual-machines", "terraform-basics-beginners", "building-production-ready-full-stack-applications"],
    faqs: [
      { question: "Is GitHub Actions free for students?", answer: "Public repositories get generous free minutes. Private repos include a monthly free tier on GitHub Free and more on Pro. Student Developer Pack perks may add credits—check your account usage page." },
      { question: "What is the difference between a workflow and a job?", answer: "A workflow is the YAML file triggered by events. Jobs run on runners inside the workflow, often in parallel. Steps are individual tasks within a job." },
      { question: "How do I store API keys safely?", answer: "Use GitHub Secrets and repository environments. Never commit .env files. Reference secrets as ${{ secrets.MY_KEY }} in workflows." },
      { question: "Can GitHub Actions deploy to AWS?", answer: "Yes. Use OIDC federation for keyless AWS auth, or store IAM credentials as secrets. Popular patterns deploy to ECS, S3 static sites, or Lambda." },
    ],
  },
  `<p>Every Bornosoft repository I ship passes through <strong>GitHub Actions</strong>. As <strong>Mohammad Ali Nayeem</strong>, a Software Engineering student at <strong>DIU</strong> in Dhaka, I treat CI/CD not as enterprise luxury but as homework insurance—if tests fail, merges stop; if Docker builds break, I know before my client does. This complete guide captures what I use daily: workflow structure, caching, matrices, deployments, and the mistakes that wasted my free minutes.</p>

<h2>What Is GitHub Actions?</h2>

<p>GitHub Actions is GitHub's integrated automation platform. You define workflows in YAML under <code>.github/workflows/</code>, triggered by events like push, pull_request, schedule, or release. Runners—GitHub-hosted or self-hosted—execute jobs that checkout code, install dependencies, run tests, build artifacts, and deploy.</p>

<p>For student developers, Actions replaces manual "works on my laptop" demos with reproducible pipelines professors and employers trust.</p>

<div class="callout tip"><strong>Tip:</strong> Start with one workflow file named <code>ci.yml</code> that runs on every pull request. Expand to deploy only after CI is stable.</div>

<h2>Core Concepts</h2>

<table>
<thead><tr><th>Term</th><th>Description</th></tr></thead>
<tbody>
<tr><td>Workflow</td><td>Automated process defined in YAML</td></tr>
<tr><td>Event</td><td>Trigger like push, tag, workflow_dispatch</td></tr>
<tr><td>Job</td><td>Parallelizable unit of work on a runner</td></tr>
<tr><td>Step</td><td>Individual command or action within a job</td></tr>
<tr><td>Action</td><td>Reusable step from marketplace</td></tr>
<tr><td>Artifact</td><td>Uploaded build output between jobs</td></tr>
</tbody>
</table>

<h2>Your First Workflow</h2>

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

<p>This workflow installs dependencies with <code>npm ci</code> for reproducibility, runs tests, and verifies production builds. I use it on my portfolio and Bornosoft Node APIs.</p>

<h2>Secrets and Environments</h2>

<p>Never hardcode credentials. Store secrets in repository Settings → Secrets and variables → Actions. For staging vs production, use environments with protection rules requiring manual approval—excellent practice before internship teams trust you with deploy keys.</p>

<pre><code class="language-yaml">jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - run: echo "Deploying with protected secret"
        env:
          API_TOKEN: \${{ secrets.API_TOKEN }}</code></pre>

<div class="callout warning"><strong>Warning:</strong> Forked pull requests do not receive secrets by default—this prevents exfiltration attacks. Design workflows accordingly.</div>

<h2>Matrix Builds</h2>

<p>Test across Node versions or operating systems with a matrix strategy:</p>

<pre><code class="language-yaml">strategy:
  matrix:
    node-version: [18, 20, 22]
steps:
  - uses: actions/setup-node@v4
    with:
      node-version: \${{ matrix.node-version }}</code></pre>

<p>Matrices catch compatibility issues early. I caught a Node 22 fetch regression in a Bornosoft client library this way.</p>

<h2>Docker Build and Push</h2>

<p>Containerized services should publish images from CI, not laptops.</p>

<pre><code class="language-yaml">- name: Login to GHCR
  uses: docker/login-action@v3
  with:
    registry: ghcr.io
    username: \${{ github.actor }}
    password: \${{ secrets.GITHUB_TOKEN }}

- name: Build and push
  uses: docker/build-push-action@v5
  with:
    push: true
    tags: ghcr.io/kazinayeem/api:latest</code></pre>

<h2>Deployment Patterns</h2>

<h3>Static Sites to GitHub Pages</h3>

<p>Next.js static exports and Vite apps deploy cleanly with <code>peaceiris/actions-gh-pages</code> or official Pages workflows.</p>

<h3>SSH Deploy to VPS</h3>

<p>Budget-friendly for Bangladeshi startups: CI SSH into a DigitalOcean or local VPS, pull latest image, restart compose stack.</p>

<h3>AWS with OIDC</h3>

<p>Configure IAM role trust for GitHub OIDC—no long-lived AWS keys in secrets. This is the pattern I study for Bornosoft production maturity.</p>

<div class="callout note"><strong>Note:</strong> OIDC setup feels complex once but dramatically improves security posture on resumes and interviews.</div>

<h2>Caching and Performance</h2>

<ul>
<li>Use <code>actions/setup-node</code> with <code>cache: npm</code> or explicit <code>actions/cache</code>.</li>
<li>Layer Docker builds with BuildKit cache backends.</li>
<li>Split jobs: lint fast, integration tests slower.</li>
<li>Cancel redundant runs with concurrency groups.</li>
</ul>

<pre><code class="language-yaml">concurrency:
  group: ci-\${{ github.ref }}
  cancel-in-progress: true</code></pre>

<h2>Reusable Workflows and Composite Actions</h2>

<p>When maintaining multiple Bornosoft repos, extract common CI into reusable workflows called with <code>workflow_call</code>. Composite actions bundle repeated steps—lint, test, audit—in one local action directory.</p>

<h2>Security Best Practices</h2>

<ol>
<li>Pin third-party actions to commit SHAs for critical pipelines.</li>
<li>Run <code>npm audit</code> or <code>osv-scanner</code> in CI.</li>
<li>Limit <code>GITHUB_TOKEN</code> permissions explicitly.</li>
<li>Require PR reviews before deploy workflows on main.</li>
<li>Never echo secrets in logs.</li>
</ol>

<h2>Debugging Failed Runs</h2>

<p>Enable debug logging with secrets <code>ACTIONS_RUNNER_DEBUG</code> and <code>ACTIONS_STEP_DEBUG</code>. Re-run failed jobs with SSH debugging (beta) or insert temporary <code>tmate</code> steps—remove before merging.</p>

<h2>Real Bornosoft Pipeline Example</h2>

<p>Our typical API pipeline: lint → unit tests → integration tests with Postgres service container → Docker build → push to GHCR → deploy to staging on main merges. Production deploys trigger on version tags with changelog validation.</p>

<h2>Common Student Mistakes</h2>

<ul>
<li>Running expensive jobs on every commit without path filters.</li>
<li>Skipping lockfiles so CI installs different versions than local.</li>
<li>Deploying on PR branches accidentally.</li>
<li>Ignoring workflow minutes until billing surprises hit.</li>
</ul>

<h2>Conclusion</h2>

<p>GitHub Actions turned my DIU assignments into professional engineering artifacts. Whether you build portfolios, Bornosoft-style startups, or open source, CI/CD is the multiplier. Start small, iterate weekly, and treat every failed workflow as a free lesson before users encounter bugs.</p>

<p>Explore my other DevOps articles on Docker and Terraform, or reach out at <a href="https://kazinayeem.site">kazinayeem.site</a> for workflow reviews.</p>`
));

results.push(writeArticle(
  {
    filename: "building-rest-apis-nodejs.ts",
    slug: "building-rest-apis-nodejs",
    title: "Building REST APIs With Node.js",
    seoTitle: "Building REST APIs With Node.js | Mohammad Ali Nayeem",
    subtitle: "Express, validation, auth, and production patterns for student developers in Bangladesh",
    description: "Learn to build production-quality REST APIs with Node.js and Express from Mohammad Ali Nayeem, DIU Software Engineering student and Bornosoft founder.",
    category: "Node.js",
    tags: ["Node.js", "Express", "REST API", "TypeScript", "Backend"],
    keywords: ["nodejs rest api tutorial", "express api guide", "nodejs backend bangladesh", "rest api best practices"],
    publishedAt: "2025-04-28",
    updatedAt: "2025-05-12",
    featured: false,
    popular: false,
    coverImageAlt: "Node.js Express API code on screen with Postman request panel",
    relatedSlugs: ["building-production-ready-full-stack-applications", "react-vs-nextjs", "complete-guide-github-actions"],
    faqs: [
      { question: "Should I use JavaScript or TypeScript for Node APIs?", answer: "TypeScript is worth the setup cost. Types catch contract bugs between frontend and backend, improve IDE support, and signal professionalism on internships." },
      { question: "Express vs Fastify—which should beginners pick?", answer: "Express has the largest tutorial ecosystem—ideal for DIU coursework. Fastify offers better performance and schema validation. Learn Express first, then compare." },
      { question: "How do I structure a growing API project?", answer: "Use feature folders: routes, controllers, services, repositories. Keep HTTP concerns separate from business logic for testability." },
      { question: "What database pairs well with Node REST APIs?", answer: "PostgreSQL with Prisma or Drizzle for relational data. MongoDB when document flexibility matters. Redis for caching and rate limiting." },
    ],
  },
  `<p><strong>Node.js</strong> was the first runtime that made backend development click for me at <strong>DIU</strong>. JavaScript on both sides of the stack lowered context switching while I juggled classes and <strong>Bornosoft</strong> client work. As <strong>Mohammad Ali Nayeem</strong>, I have shipped REST APIs for dashboards, mobile app backends, and internal tools—this guide distills the patterns I reuse instead of reinventing on every repository.</p>

<h2>What Makes a Good REST API?</h2>

<p>REST is an architectural style, not a framework. Good APIs are predictable: nouns for resources, HTTP verbs for actions, consistent status codes, and JSON bodies that match documented schemas. Your future self—and frontend teammates—will thank you when <code>GET /users/:id</code> always behaves the same way.</p>

<div class="callout tip"><strong>Tip:</strong> Version your API early (<code>/api/v1</code>) even for student projects. Breaking changes happen faster than you expect.</div>

<h2>Project Setup</h2>

<pre><code class="language-bash">mkdir bornosoft-api && cd bornosoft-api
npm init -y
npm install express zod helmet cors pino pino-http
npm install -D typescript @types/node @types/express tsx vitest</code></pre>

<p>I use <strong>Zod</strong> for runtime validation, <strong>helmet</strong> for security headers, and <strong>pino</strong> for structured logs—lighter than Winston for most APIs.</p>

<h2>Basic Express Server</h2>

<pre><code class="language-typescript">import express from "express";
import helmet from "helmet";
import cors from "cors";
import { pinoHttp } from "pino-http";
import { userRouter } from "./routes/users";

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json({ limit: "1mb" }));
app.use(pinoHttp());

app.use("/api/v1/users", userRouter);

app.use((err, req, res, next) => {
  req.log.error(err);
  res.status(err.status ?? 500).json({ error: err.message });
});

app.listen(3000, () => console.log("API listening on :3000"));</code></pre>

<h2>Routing and Controllers</h2>

<p>Keep routes thin. Controllers parse requests, call services, map responses.</p>

<pre><code class="language-typescript">// routes/users.ts
import { Router } from "express";
import { createUser, getUser, listUsers } from "../controllers/users";

export const userRouter = Router();
userRouter.get("/", listUsers);
userRouter.post("/", createUser);
userRouter.get("/:id", getUser);</code></pre>

<table>
<thead><tr><th>Method</th><th>Path</th><th>Status</th><th>Purpose</th></tr></thead>
<tbody>
<tr><td>GET</td><td>/api/v1/users</td><td>200</td><td>List with pagination</td></tr>
<tr><td>POST</td><td>/api/v1/users</td><td>201</td><td>Create resource</td></tr>
<tr><td>GET</td><td>/api/v1/users/:id</td><td>200/404</td><td>Fetch one</td></tr>
<tr><td>PATCH</td><td>/api/v1/users/:id</td><td>200</td><td>Partial update</td></tr>
<tr><td>DELETE</td><td>/api/v1/users/:id</td><td>204</td><td>Remove</td></tr>
</tbody>
</table>

<h2>Validation With Zod</h2>

<p>Never trust client input. Middleware validates bodies and query params before controllers execute.</p>

<pre><code class="language-typescript">import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  role: z.enum(["user", "admin"]).default("user"),
});

export function validateBody(schema) {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() });
    }
    req.validated = parsed.data;
    next();
  };
}</code></pre>

<div class="callout warning"><strong>Warning:</strong> Validation is not authorization. Always check permissions after authentication.</div>

<h2>Authentication Patterns</h2>

<p>For Bornosoft MVPs I use JWT access tokens with short expiry plus refresh tokens stored httpOnly. For session-based apps, Redis sessions work well. bcrypt hashes passwords—never store plaintext.</p>

<pre><code class="language-typescript">import jwt from "jsonwebtoken";

export function signAccessToken(userId: string) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });
}</code></pre>

<h2>Database Layer</h2>

<p>Prisma accelerates development with type-safe queries:</p>

<pre><code class="language-typescript">import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function listUsers(page = 1, limit = 20) {
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    prisma.user.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
    prisma.user.count(),
  ]);
  return { items, total, page, limit };
}</code></pre>

<h2>Error Handling and Status Codes</h2>

<ul>
<li><strong>400</strong> — Validation failures</li>
<li><strong>401</strong> — Missing or invalid auth</li>
<li><strong>403</strong> — Authenticated but forbidden</li>
<li><strong>404</strong> — Resource not found</li>
<li><strong>409</strong> — Conflict (duplicate email)</li>
<li><strong>500</strong> — Unexpected server errors (log details, return generic message)</li>
</ul>

<div class="callout note"><strong>Note:</strong> Custom error classes with <code>status</code> properties keep controllers clean.</div>

<h2>Testing APIs</h2>

<p>Vitest + supertest enables fast HTTP tests without spinning browsers:</p>

<pre><code class="language-typescript">import request from "supertest";
import { app } from "../app";

it("creates user", async () => {
  const res = await request(app)
    .post("/api/v1/users")
    .send({ email: "test@diu.edu.bd", name: "Nayeem" });
  expect(res.status).toBe(201);
  expect(res.body.email).toBe("test@diu.edu.bd");
});</code></pre>

<h2>Documentation and DX</h2>

<p>OpenAPI/Swagger via <code>@asteasolutions/zod-to-openapi</code> keeps docs synced with Zod schemas. Postman collections help Bornosoft clients test endpoints without reading code.</p>

<h2>Production Checklist</h2>

<ol>
<li>Environment variables via <code>.env</code> locally, secrets manager in prod.</li>
<li>Rate limiting with <code>express-rate-limit</code> + Redis store.</li>
<li>Health check route for load balancers.</li>
<li>Graceful shutdown on SIGTERM.</li>
<li>CI pipeline running tests and lint.</li>
</ol>

<h2>Conclusion</h2>

<p>REST APIs are the backbone of my Bornosoft deliverables and DIU team projects. Master Express fundamentals, validate aggressively, test HTTP contracts, and deploy with GitHub Actions. The combination is employable anywhere from Dhaka startups to remote internships.</p>

<p>Read my full-stack production guide next, or contact me at <a href="https://kazinayeem.site">kazinayeem.site</a>.</p>`
));

results.push(writeArticle(
  {
    filename: "ai-tools-every-student-developer-should-know.ts",
    slug: "ai-tools-every-student-developer-should-know",
    title: "AI Tools Every Student Developer Should Know",
    seoTitle: "AI Tools Every Student Developer Should Know | Mohammad Ali Nayeem",
    subtitle: "Practical AI assistants, coding tools, and learning platforms for DIU students building real projects",
    description: "Mohammad Ali Nayeem recommends essential AI tools for student developers—Cursor, ChatGPT, Copilot, and more—with honest advice for DIU and Bangladesh builders.",
    category: "Artificial Intelligence",
    tags: ["AI Tools", "Cursor", "Copilot", "Student Developer", "Productivity"],
    keywords: ["AI tools for students", "coding AI assistants", "student developer tools bangladesh", "cursor copilot comparison"],
    publishedAt: "2025-05-08",
    updatedAt: "2025-05-25",
    featured: false,
    popular: true,
    coverImageAlt: "Student developer using AI coding assistant on laptop at DIU campus",
    relatedSlugs: ["how-i-got-cursor-pro-free-as-diu-student", "my-software-engineering-journey-diu", "building-production-ready-full-stack-applications"],
    faqs: [
      { question: "Are AI coding tools cheating for university assignments?", answer: "Policies vary by course. Many professors allow AI for learning if you understand and cite usage. Never submit generated work you cannot explain in a viva—that is academic dishonesty and career risk." },
      { question: "What is the best free AI tool for beginners?", answer: "ChatGPT free tier and GitHub Copilot free for verified students are strong starts. Cursor free tier adds project-aware edits when you graduate to multi-file repos." },
      { question: "Can AI replace learning programming fundamentals?", answer: "No. AI accelerates implementation but interviews, exams, and production incidents expose gaps. Use AI to explain errors and generate practice problems—not to skip DSA study." },
      { question: "Which AI tool helped Bornosoft most?", answer: "Cursor for multi-file refactors and GitHub Actions scaffolding, combined with ChatGPT for architecture brainstorming before client calls." },
    ],
  },
  `<p>When I founded <strong>Bornosoft</strong> while studying Software Engineering at <strong>DIU</strong>, I did not have a senior engineer on speed dial. What I had was a growing ecosystem of <strong>AI tools</strong> that—used responsibly—compressed weeks of googling into hours of focused building. I am <strong>Mohammad Ali Nayeem</strong>, and this is my curated list of AI tools every student developer should know, with honest notes on what each is good at, where it fails, and how to avoid the trap of looking productive without learning.</p>

<h2>The Student Developer's AI Stack</h2>

<p>Think in layers: coding assistants, chat reasoning, design generation, documentation, and ML-specific platforms. You do not need every subscription—mix free tiers strategically.</p>

<table>
<thead><tr><th>Tool</th><th>Best For</th><th>Cost Tip</th></tr></thead>
<tbody>
<tr><td>Cursor</td><td>Multi-file edits, repo context</td><td>Student Pro verification</td></tr>
<tr><td>GitHub Copilot</td><td>Inline completions in VS Code</td><td>GitHub Education pack</td></tr>
<tr><td>ChatGPT / Claude</td><td>Architecture, explanations</td><td>Free tiers for brainstorming</td></tr>
<tr><td>Perplexity</td><td>Research with citations</td><td>Free searches daily</td></tr>
<tr><td>v0 / Bolt</td><td>UI prototypes</td><td>Free credits monthly</td></tr>
<tr><td>Colab / Kaggle</td><td>GPU notebooks for YOLO</td><td>Free GPU quotas</td></tr>
</tbody>
</table>

<div class="callout tip"><strong>Tip:</strong> Pick one primary coding assistant and master its workflow. Tool-hopping wastes more time than it saves.</div>

<h2>Cursor: Project-Aware Development</h2>

<p>Cursor became my daily driver for Bornosoft repos and this portfolio. Unlike generic chat, it indexes your codebase (respecting <code>.cursorignore</code>) and proposes coherent diffs across files. I use agent mode for scaffolding Terraform modules, writing Vitest suites, and refactoring Next.js routes.</p>

<p>Student Pro access made premium models affordable—see my dedicated Cursor article for verification steps.</p>

<h2>GitHub Copilot: Inline Speed</h2>

<p>Copilot shines for boilerplate: React components, Express routes, Jest tests. It is less opinionated about whole-repo architecture than Cursor but integrates everywhere VS Code runs. I keep Copilot enabled even when using Cursor for complementary inline suggestions.</p>

<pre><code class="language-typescript">// Copilot excels at patterns like this once it sees your codebase style
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? 1);
  // Copilot suggests pagination logic matching your Prisma helpers
}</code></pre>

<h2>ChatGPT and Claude for Thinking</h2>

<p>Before client calls at Bornosoft, I whiteboard requirements with Claude or ChatGPT: data models, API contracts, risk questions. These models excel at explaining unfamiliar concepts—Kubernetes networking, SQL isolation levels, camera calibration math— in tutoring mode.</p>

<div class="callout note"><strong>Note:</strong> Ask follow-up questions that test understanding: "Why would that approach fail under load?" Treat AI as a patient TA, not an answer key.</div>

<h2>Perplexity for Research</h2>

<p>When evaluating libraries or debugging obscure errors, Perplexity's cited search beats random forum threads. I verified GitHub Actions OIDC setup steps and Ultralytics export flags this way.</p>

<h2>UI Generation Tools</h2>

<p><strong>v0</strong> and similar tools generate React + Tailwind components from prompts. I use them for rapid mockups before polishing accessibility and brand alignment manually. Never ship generated UI without reviewing responsive behavior and semantic HTML.</p>

<h2>ML and Vision Platforms</h2>

<p>For YOLO and robotics coursework:</p>

<ul>
<li><strong>Google Colab</strong> — Free GPU training with caveats on session length.</li>
<li><strong>Roboflow</strong> — Labeling, augmentation, dataset versioning.</li>
<li><strong>Hugging Face</strong> — Models, spaces, and educational notebooks.</li>
</ul>

<div class="callout warning"><strong>Warning:</strong> Do not upload confidential client data or private surveillance footage to public notebooks.</div>

<h2>Documentation and Meeting AI</h2>

<p>Tools like Notion AI and Otter help summarize lectures and client meetings. I transcribe Bornosoft discovery calls (with consent), then extract action items. This is operational AI—not coding—but it saves hours for student founders.</p>

<h2>Learning Tools vs Shortcut Tools</h2>

<p>Classify every tool:</p>

<ol>
<li><strong>Learning amplifiers</strong> — Explain errors, generate practice problems, quiz you.</li>
<li><strong>Implementation accelerators</strong> — Write boilerplate you review.</li>
<li><strong>Shortcut traps</strong> — Complete assignments you cannot defend.</li>
</ol>

<p>Stay in categories one and two during semesters you care about growth.</p>

<h2>Responsible Use at DIU</h2>

<p>Academic integrity matters. Professors increasingly run oral vivas and live coding. AI cannot hide missing fundamentals. My rule: AI may write the first draft; I must write the explanation and tests.</p>

<h2>Building an AI Budget in Bangladesh</h2>

<ul>
<li>Maximize GitHub Education benefits first.</li>
<li>Use free tiers until revenue or internships fund Pro tools.</li>
<li>Share Colab GPU slots with study groups fairly.</li>
<li>Track ROI: hours saved vs money spent monthly.</li>
</ul>

<h2>My Daily Workflow</h2>

<ol>
<li>Morning: plan tasks in Notion without AI.</li>
<li>Coding: Cursor agent for scoped features with git commits between runs.</li>
<li>Blocked: Perplexity or ChatGPT for targeted research.</li>
<li>Review: read every diff before merge—no exceptions.</li>
<li>Evening: handwritten notes on what I learned, not just shipped.</li>
</ol>

<h2>Tools to Watch</h2>

<p>Local open models via Ollama, Continue.dev, and IDE agents are improving fast—interesting for offline work or privacy-sensitive Bornosoft clients. I experiment but still rely on cloud models for complex refactors.</p>

<h2>Conclusion</h2>

<p>AI tools are not optional extras for serious student developers in 2025—they are part of the professional toolchain. Used with discipline, they helped me run Bornosoft, publish this blog, and pass DIU courses without burning out. Start with one assistant, one chat tool, and one GPU notebook. Master responsibility before chasing every new launch on Twitter.</p>

<p>Questions? I wrote about getting Cursor Pro free as a DIU student in a separate post. Reach me anytime at <a href="https://kazinayeem.site">kazinayeem.site</a>.</p>`
));

console.log(`\nTotal: ${results.length} articles, ${results.reduce((s, r) => s + r.words, 0)} words`);
