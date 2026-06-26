import { createPost } from "../article-builder";

const post = createPost({
  slug: "my-first-machine-learning-project-yolo-robotics",
  title: "My First Machine Learning Project: YOLO and Robotics",
  seoTitle: "My First Machine Learning Project: YOLO and Robotics | Mohammad Ali Nayeem",
  subtitle:
    "How a DIU robotics club project taught me real computer vision beyond classroom slides",
  description:
    "Mohammad Ali Nayeem recounts building his first YOLO-based object detection system for a robotics project at Daffodil International University, covering dataset labeling, training on limited hardware, and deploying inference on a Raspberry Pi.",
  category: "Machine Learning",
  tags: ["YOLO", "Robotics", "Computer Vision", "Raspberry Pi", "DIU"],
  keywords: [
    "YOLO robotics project",
    "first machine learning project student",
    "object detection Raspberry Pi",
    "DIU robotics club",
  ],
  publishedAt: "2024-08-18",
  updatedAt: "2024-09-20",
  featured: true,
  popular: false,
  coverImageAlt:
    "Student robotics workspace with Raspberry Pi camera running YOLO object detection",
  content: `<p>My first real encounter with machine learning did not happen in a lecture hall at <strong>Daffodil International University (DIU)</strong>. It happened on a dusty workbench in the robotics club room, surrounded by half-assembled chassis, borrowed webcams, and a Raspberry Pi 4 that overheated whenever we ran inference for more than ten minutes. We wanted our robot to <em>see</em> obstacles and colored markers—not simulate vision in a Jupyter notebook, but react in real time on a budget build.</p>

<p>That project became my introduction to <strong>YOLO (You Only Look Once)</strong>, and it changed how I think about software engineering. Before YOLO, I treated ML as a black box other people use. After YOLO, I understood datasets, latency trade-offs, and why deployment matters as much as accuracy. This article is the story of that first project—and the practical lessons I wish someone had told me before I labeled my thousandth bounding box by hand.</p>

<h2>Why We Chose YOLO for a Student Robotics Project</h2>

<p>Our club had three constraints every Bangladeshi student builder will recognize: <strong>limited budget</strong>, <strong>limited GPU access</strong>, and <strong>limited time</strong> before an inter-department showcase. We evaluated a few paths:</p>

<ul>
<li><strong>Classical OpenCV color tracking</strong> — Fast on Pi, but useless under changing light in the campus corridor.</li>
<li><strong>TensorFlow object detection API</strong> — Powerful, but heavy to train and slow to run on edge hardware.</li>
<li><strong>YOLOv8 from Ultralytics</strong> — Good balance of accuracy, community tutorials, and export options for edge devices.</li>
</ul>

<p>YOLO won because the ecosystem in 2024 was student-friendly. Pretrained weights existed. Fine-tuning on a small custom dataset was documented. And most importantly, we could demo something that <em>looked</em> like AI to visitors—even when our mAP was humble.</p>

<div class="callout tip"><strong>Tip:</strong> For your first ML project, pick a model family with clear train → validate → export → deploy docs. Fancy architectures mean nothing if you cannot ship a demo.</div>

<h2>Project Goal: Detect Campus Markers and Obstacles</h2>

<p>We defined a narrow scope on purpose. The robot had to detect:</p>

<ol>
<li><strong>Red and green floor markers</strong> for path following in the practice arena.</li>
<li><strong>Cardboard boxes</strong> as static obstacles.</li>
<li><strong>Human legs</strong> at knee height for basic safety stopping (not full pedestrian detection—that was out of scope).</li>
</ol>

<p>Narrow scope saved us. Students often fail first ML projects by trying to detect "everything." We had three classes plus background. That is enough to learn labeling, training loops, and failure modes.</p>

<h3>Hardware We Actually Used</h3>

<table>
<thead><tr><th>Component</th><th>Model</th><th>Notes</th></tr></thead>
<tbody>
<tr><td>Single-board computer</td><td>Raspberry Pi 4 (4GB)</td><td>Added heatsink and small fan</td></tr>
<tr><td>Camera</td><td>Pi Camera Module v2</td><td>Fixed focus, decent indoors</td></tr>
<tr><td>Motor driver</td><td>L298N</td><td>Controlled DC gear motors</td></tr>
<tr><td>Training machine</td><td>Friend's gaming laptop</td><td>GTX 1660 Ti, 6GB VRAM</td></tr>
</tbody>
</table>

<p>No cloud GPU budget. No university lab cluster. Just borrowed hardware and late nights at Bornosoft office when I needed a stable desk.</p>

<h2>Building the Dataset: The Unsexy Foundation</h2>

<p>Everyone wants to train models. Nobody wants to label images. I learned that dataset quality dominates model choice for small projects. We captured around <strong>1,200 images</strong> with the Pi camera at different times of day—morning sun through windows, fluorescent evening lab light, and cloudy afternoon practice runs.</p>

<p>We used <strong>Roboflow</strong> for labeling and augmentation. Augmentations included horizontal flip, slight rotation, and brightness jitter. We split 80/10/10 for train/val/test and exported in YOLO format.</p>

<div class="callout warning"><strong>Warning:</strong> Do not leak test images into training through duplicate frames from video. We nearly did this by extracting every frame from a single walk-through video. Use diverse captures instead.</div>

<h3>Labeling Guidelines We Wrote Down</h3>

<p>Consistency matters more than speed. Our one-page guideline said:</p>

<ul>
<li>Tight boxes around markers, not the entire floor region.</li>
<li>If a box is more than 40% occluded, skip the label for that frame.</li>
<li>Label human legs only when both legs are partially visible—reduces false positives on chairs.</li>
</ul>

<p>Two club members labeled separately for a week, then we reviewed disagreements together. That review taught me more about precision/recall intuition than any slide deck.</p>

<h2>Training YOLOv8 on Limited Hardware</h2>

<p>We started from <code>yolov8n.pt</code> (nano) because speed on Pi mattered more than winning a Kaggle competition. Training command looked like this:</p>

<pre><code class="language-bash">yolo detect train \\
  data=campus_robot.yaml \\
  model=yolov8n.pt \\
  epochs=100 \\
  imgsz=640 \\
  batch=16 \\
  patience=20 \\
  project=runs/campus_robot \\
  name=v1_nano</code></pre>

<p>Our <code>campus_robot.yaml</code> was minimal:</p>

<pre><code class="language-yaml">path: ./datasets/campus_robot
train: images/train
val: images/val
test: images/test

names:
  0: red_marker
  1: green_marker
  2: obstacle_box
  3: human_legs</code></pre>

<p>Training took roughly four hours on the laptop. We stopped early twice when validation mAP plateaued and started overfitting—<code>patience=20</code> helped the final run.</p>

<h3>Metrics That Mattered to Us</h3>

<p>Academic metrics are not robot metrics. We cared about:</p>

<ul>
<li><strong>Inference FPS on Pi</strong> — Target: 5+ FPS at 416px input after export.</li>
<li><strong>False positives on chairs</strong> — Leg class confused wooden chair legs constantly at first.</li>
<li><strong>Latency from detection to motor stop</strong> — Under 300ms end-to-end for safety stops.</li>
</ul>

<p>Our best nano model reached about <strong>0.71 mAP@0.5</strong> on validation—not impressive on paper, but good enough for controlled indoor demos when combined with simple logic filters (ignore detections below confidence 0.55).</p>

<div class="callout note"><strong>Note:</strong> mAP is a guide, not a mission score. A model with lower mAP but stable FPS beat our "accurate" medium model that ran at 2 FPS and made the robot feel drunk.</div>

<h2>Deploying Inference on Raspberry Pi</h2>

<p>Training on a laptop is easy. Running on Pi is where student projects die. We exported to ONNX first, then used OpenCV DNN backend for inference in a Python control loop:</p>

<pre><code class="language-python">import cv2
import numpy as np

net = cv2.dnn.readNetFromONNX("campus_robot_v1.onnx")

def detect(frame):
    blob = cv2.dnn.blobFromImage(
        frame, 1/255.0, (416, 416), swapRB=True, crop=False
    )
    net.setInput(blob)
    outputs = net.forward()
  # post-process: NMS, scale boxes to frame size
    return parse_yolo_output(outputs, frame.shape)

def motor_command(detections):
    if any(d["cls"] == "human_legs" and d["conf"] > 0.6 for d in detections):
        return "STOP"
    # path logic for red/green markers...
    return "FORWARD"</code></pre>

<p>We threaded inference and motor control carefully. Inference ran in the main loop; motor PWM updates happened only when commands changed to reduce jitter.</p>

<h2>Integration with the Robotics Stack</h2>

<p>Our architecture was deliberately simple—no ROS on Pi for v1. A single Python process read camera frames, ran detection, and published motor commands through GPIO. For debugging, we streamed annotated frames to a laptop over Wi-Fi using Flask and MJPEG. That stream saved us during showcase rehearsal when judges asked "what is the robot seeing?"</p>

<h3>Failures We Hit on Demo Day</h3>

<ol>
<li><strong>Sun glare on polished floor</strong> — Green marker false negatives. Fix: diffused lighting and retrained with glare images.</li>
<li><strong>Crowd legs near robot</strong> — Safety stop triggered too aggressively. Fix: raised confidence threshold and required bbox center in lower third of frame.</li>
<li><strong>USB power sag</strong> — Pi brownout when motors accelerated. Fix: separate power rails for motors and Pi.</li>
</ol>

<p>Each failure was a systems lesson—not just an ML lesson. That mindset later helped me at Bornosoft when deploying client MVPs under real-world constraints.</p>

<h2>What This Project Taught Me About Machine Learning</h2>

<p>After three months, I did not become an ML researcher. I became an engineer who respects the full pipeline:</p>

<ul>
<li><strong>Data is code.</strong> Version datasets like you version Git branches.</li>
<li><strong>Edge deployment is a requirement,</strong> not a stretch goal—define hardware early.</li>
<li><strong>Start pretrained.</strong> Training from scratch as a student is rarely the right move.</li>
<li><strong>Demo environments lie.</strong> Test in the actual venue lighting and floor surface.</li>
</ul>

<p>This project also connected to my later work: portfolio blog posts about DevOps, Docker for reproducible training environments, and even CI for model artifact storage. ML without engineering discipline becomes a science fair trick. ML with engineering discipline becomes a product skill.</p>

<h2>Tools and Resources I Still Recommend</h2>

<p>If you are a DIU student starting similar work in 2025:</p>

<ul>
<li><strong>Ultralytics YOLOv8 docs</strong> — Start here for train/export.</li>
<li><strong>Roboflow</strong> — Free tier is enough for small academic datasets.</li>
<li><strong>Google Colab</strong> — Backup when no local GPU exists.</li>
<li><strong>Netron</strong> — Visualize exported ONNX graphs when debugging.</li>
</ul>

<p>Join a club or find one partner who cares about hardware. Robotics ML is lonely if you only stare at loss curves alone.</p>

<h2>Conclusion</h2>

<p>My first machine learning project was not a Kaggle medal. It was a wheezing Raspberry Pi robot that could follow colored markers and stop when it saw legs—usually. That humbling experience with <strong>YOLO and robotics</strong> gave me confidence to tackle bigger stacks: Bornosoft client features, cloud deployments, and later Kubernetes jobs for batch inference.</p>

<p>If you are a student in Bangladesh wondering whether ML is "too hard" without expensive hardware, start small, label honestly, export early, and test on the device you will demo on—not just your laptop. The gap between notebook accuracy and real-world behavior is where real engineers are made.</p>

<p>Have questions about our dataset or Pi deployment loop? Reach out via <a href="https://kazinayeem.site">kazinayeem.site</a>. I am happy to help the next DIU robotics team avoid our chair-leg false positive era.</p>`,
  faqs: [
    {
      question: "Can you run YOLO on a Raspberry Pi 4?",
      answer:
        "Yes. Use a small model like YOLOv8n, export to ONNX or TensorRT-compatible formats, reduce input resolution (416px works well), and expect roughly 3–8 FPS depending on preprocessing and cooling. It is sufficient for many educational robotics demos.",
    },
    {
      question: "How many images do you need for a first YOLO project?",
      answer:
        "For 3–5 classes in a controlled environment, 800–1,500 well-labeled images with diversity in lighting and angles is a realistic student starting point. Quality and consistency beat raw volume.",
    },
    {
      question: "Should students use YOLOv8n or YOLOv8s for robotics?",
      answer:
        "Start with nano (n) for edge deployment. Move to small (s) only if you have GPU headroom and latency requirements still pass on your robot computer. Demo reliability matters more than leaderboard mAP.",
    },
    {
      question: "What is the hardest part of a first ML robotics project?",
      answer:
        "Dataset labeling and deployment integration—not picking the model. Most student teams underestimate labeling consistency and power/hardware issues on demo day.",
    },
  ],
  relatedSlugs: [
    "how-i-got-cursor-pro-free-as-diu-student",
    "kubernetes-explained-simply",
    "my-devops-roadmap-software-engineering-student",
  ],
});

export default post;
