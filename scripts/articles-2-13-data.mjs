/** Full article data for blog posts 2-13 */

function p(t) {
  return `<p>${t}</p>`;
}
function h2(t) {
  return `<h2>${t}</h2>`;
}
function h3(t) {
  return `<h3>${t}</h3>`;
}
function ul(items) {
  return `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
}
function ol(items) {
  return `<ol>${items.map((i) => `<li>${i}</li>`).join("")}</ol>`;
}
function code(lang, body) {
  return `<pre><code class="language-${lang}">${body}</code></pre>`;
}
function note(t) {
  return `<div class="callout note"><strong>Note:</strong> ${t}</div>`;
}
function tip(t) {
  return `<div class="callout tip"><strong>Tip:</strong> ${t}</div>`;
}
function warn(t) {
  return `<div class="callout warning"><strong>Warning:</strong> ${t}</div>`;
}
function table(rows) {
  const [head, ...body] = rows;
  return `<table><thead><tr>${head.map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>${body.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}
function join(...parts) {
  return parts.filter(Boolean).join("\n\n");
}

export const articles = [
  {
    slug: "my-first-machine-learning-project-yolo-robotics",
    title: "My First Machine Learning Project: YOLO and Robotics",
    seoTitle: "My First Machine Learning Project: YOLO and Robotics | Mohammad Ali Nayeem",
    subtitle: "How a DIU robotics club project taught me real computer vision beyond classroom slides",
    description:
      "Mohammad Ali Nayeem recounts building his first YOLO-based object detection system for a robotics project at Daffodil International University, covering dataset labeling, training on limited hardware, and deploying inference on a Raspberry Pi.",
    category: "Machine Learning",
    tags: ["YOLO", "Robotics", "Computer Vision", "Raspberry Pi", "DIU"],
    keywords: ["YOLO robotics project", "first machine learning project student", "object detection Raspberry Pi", "DIU robotics club"],
    publishedAt: "2024-08-18",
    updatedAt: "2024-09-20",
    featured: true,
    popular: true,
    coverImageAlt: "Student robotics workspace with Raspberry Pi camera running YOLO object detection",
    relatedSlugs: ["how-i-got-cursor-pro-free-as-diu-student", "kubernetes-explained-simply", "my-devops-roadmap-software-engineering-student"],
    faqs: [
      { question: "Can you run YOLO on a Raspberry Pi 4?", answer: "Yes. Use YOLOv8n, export to ONNX, reduce input resolution to 416px, and expect roughly 3–8 FPS depending on preprocessing and cooling." },
      { question: "How many images do you need for a first YOLO project?", answer: "For 3–5 classes in a controlled environment, 800–1,500 well-labeled images with lighting diversity is a realistic student starting point." },
      { question: "Should students use YOLOv8n or YOLOv8s for robotics?", answer: "Start with nano for edge deployment. Move to small only if latency requirements still pass on your robot computer." },
      { question: "What is the hardest part of a first ML robotics project?", answer: "Dataset labeling and deployment integration—not picking the model." },
    ],
    content: join(
      p("My first real encounter with machine learning did not happen in a lecture hall at <strong>Daffodil International University (DIU)</strong>. It happened on a dusty workbench in the robotics club room, surrounded by half-assembled chassis, borrowed webcams, and a Raspberry Pi 4 that overheated whenever we ran inference for more than ten minutes. We wanted our robot to <em>see</em> obstacles and colored markers—not simulate vision in a Jupyter notebook, but react in real time on a budget build."),
      p("That project became my introduction to <strong>YOLO (You Only Look Once)</strong>, and it changed how I think about software engineering. Before YOLO, I treated ML as a black box other people use. After YOLO, I understood datasets, latency trade-offs, and why deployment matters as much as accuracy."),
      h2("Why We Chose YOLO for a Student Robotics Project"),
      p("Our club had three constraints every Bangladeshi student builder recognizes: <strong>limited budget</strong>, <strong>limited GPU access</strong>, and <strong>limited time</strong> before an inter-department showcase."),
      ul([
        "<strong>Classical OpenCV color tracking</strong> — Fast on Pi, but useless under changing light in the campus corridor.",
        "<strong>TensorFlow object detection API</strong> — Powerful, but heavy to train and slow on edge hardware.",
        "<strong>YOLOv8 from Ultralytics</strong> — Good balance of accuracy, community tutorials, and export options for edge devices.",
      ]),
      tip("For your first ML project, pick a model family with clear train → validate → export → deploy docs."),
      h2("Project Goal: Detect Campus Markers and Obstacles"),
      p("We defined a narrow scope on purpose. The robot had to detect red and green floor markers for path following, cardboard boxes as static obstacles, and human legs at knee height for basic safety stopping."),
      ol([
        "<strong>Red and green floor markers</strong> for path following in the practice arena.",
        "<strong>Cardboard boxes</strong> as static obstacles.",
        "<strong>Human legs</strong> at knee height for basic safety stopping.",
      ]),
      h3("Hardware We Actually Used"),
      table([
        ["Component", "Model", "Notes"],
        ["Single-board computer", "Raspberry Pi 4 (4GB)", "Added heatsink and small fan"],
        ["Camera", "Pi Camera Module v2", "Fixed focus, decent indoors"],
        ["Motor driver", "L298N", "Controlled DC gear motors"],
        ["Training machine", "Friend's gaming laptop", "GTX 1660 Ti, 6GB VRAM"],
      ]),
      h2("Building the Dataset: The Unsexy Foundation"),
      p("Everyone wants to train models. Nobody wants to label images. We captured around <strong>1,200 images</strong> with the Pi camera at different times of day—morning sun through windows, fluorescent evening lab light, and cloudy afternoon practice runs."),
      p("We used <strong>Roboflow</strong> for labeling and augmentation. Augmentations included horizontal flip, slight rotation, and brightness jitter. We split 80/10/10 for train/val/test and exported in YOLO format."),
      warn("Do not leak test images into training through duplicate frames from video."),
      h3("Labeling Guidelines We Wrote Down"),
      ul([
        "Tight boxes around markers, not the entire floor region.",
        "If a box is more than 40% occluded, skip the label for that frame.",
        "Label human legs only when both legs are partially visible.",
      ]),
      h2("Training YOLOv8 on Limited Hardware"),
      p("We started from <code>yolov8n.pt</code> (nano) because speed on Pi mattered more than winning a Kaggle competition."),
      code("bash", `yolo detect train \\
  data=campus_robot.yaml \\
  model=yolov8n.pt \\
  epochs=100 \\
  imgsz=640 \\
  batch=16 \\
  patience=20 \\
  project=runs/campus_robot \\
  name=v1_nano`),
      code("yaml", `path: ./datasets/campus_robot
train: images/train
val: images/val
test: images/test

names:
  0: red_marker
  1: green_marker
  2: obstacle_box
  3: human_legs`),
      p("Training took roughly four hours on the laptop. We stopped early twice when validation mAP plateaued and started overfitting—<code>patience=20</code> helped the final run."),
      h3("Metrics That Mattered to Us"),
      ul([
        "<strong>Inference FPS on Pi</strong> — Target: 5+ FPS at 416px input after export.",
        "<strong>False positives on chairs</strong> — Leg class confused wooden chair legs constantly at first.",
        "<strong>Latency from detection to motor stop</strong> — Under 300ms end-to-end for safety stops.",
      ]),
      note("mAP is a guide, not a mission score. A model with lower mAP but stable FPS beat our medium model that ran at 2 FPS."),
      h2("Deploying Inference on Raspberry Pi"),
      p("Training on a laptop is easy. Running on Pi is where student projects die. We exported to ONNX first, then used OpenCV DNN backend for inference in a Python control loop."),
      code("python", `import cv2

net = cv2.dnn.readNetFromONNX("campus_robot_v1.onnx")

def detect(frame):
    blob = cv2.dnn.blobFromImage(
        frame, 1/255.0, (416, 416), swapRB=True, crop=False
    )
    net.setInput(blob)
    outputs = net.forward()
    return parse_yolo_output(outputs, frame.shape)

def motor_command(detections):
    if any(d["cls"] == "human_legs" and d["conf"] > 0.6 for d in detections):
        return "STOP"
    return "FORWARD"`),
      h2("Integration with the Robotics Stack"),
      p("Our architecture was deliberately simple—no ROS on Pi for v1. A single Python process read camera frames, ran detection, and published motor commands through GPIO. For debugging, we streamed annotated frames to a laptop over Wi-Fi using Flask and MJPEG."),
      h3("Failures We Hit on Demo Day"),
      ol([
        "<strong>Sun glare on polished floor</strong> — Green marker false negatives. Fix: retrained with glare images.",
        "<strong>Crowd legs near robot</strong> — Safety stop triggered too aggressively. Fix: raised confidence threshold.",
        "<strong>USB power sag</strong> — Pi brownout when motors accelerated. Fix: separate power rails.",
      ]),
      h2("What This Project Taught Me About Machine Learning"),
      ul([
        "<strong>Data is code.</strong> Version datasets like you version Git branches.",
        "<strong>Edge deployment is a requirement,</strong> not a stretch goal.",
        "<strong>Start pretrained.</strong> Training from scratch as a student is rarely right.",
        "<strong>Demo environments lie.</strong> Test in the actual venue lighting.",
      ]),
      h2("Tools and Resources I Still Recommend"),
      ul([
        "<strong>Ultralytics YOLOv8 docs</strong> — Start here for train/export.",
        "<strong>Roboflow</strong> — Free tier is enough for small academic datasets.",
        "<strong>Google Colab</strong> — Backup when no local GPU exists.",
        "<strong>Netron</strong> — Visualize exported ONNX graphs when debugging.",
      ]),
      h2("Conclusion"),
      p("My first machine learning project was not a Kaggle medal. It was a wheezing Raspberry Pi robot that could follow colored markers and stop when it saw legs—usually. That humbling experience with <strong>YOLO and robotics</strong> gave me confidence to tackle bigger stacks at Bornosoft."),
      p("If you are a student in Bangladesh wondering whether ML is too hard without expensive hardware, start small, label honestly, export early, and test on the device you will demo on. Questions? Reach out via <a href=\"https://kazinayeem.site\">kazinayeem.site</a>.")
    ),
  },
  {
    slug: "from-nodejs-to-golang-learning-journey",
    title: "From Node.js to Golang: My Learning Journey",
    seoTitle: "From Node.js to Golang: My Learning Journey | Mohammad Ali Nayeem",
    subtitle: "Why a DIU student and Bornosoft founder added Go to a JavaScript-first stack—and how I learned it without restarting my career",
    description: "Mohammad Ali Nayeem shares his transition from Node.js to Golang as a Software Engineering student at DIU, including mental model shifts, first production services, and practical study resources for Bangladeshi developers.",
    category: "Golang",
    tags: ["Golang", "Node.js", "Backend", "Learning", "Bornosoft"],
    keywords: ["learn golang from nodejs", "golang learning journey student", "nodejs to go backend", "golang Bangladesh developer"],
    publishedAt: "2024-09-03",
    updatedAt: "2024-10-01",
    featured: true,
    popular: true,
    coverImageAlt: "Split-screen code editor showing Node.js Express API and equivalent Go HTTP handler",
    relatedSlugs: ["why-i-chose-golang-backend-development", "my-first-cicd-pipeline-github-actions", "deploying-nextjs-aws-ec2-nginx-pm2"],
    faqs: [
      { question: "How long does it take to learn Go coming from Node.js?", answer: "With prior backend experience, you can build simple production APIs in 6–10 weeks of consistent part-time study tied to real projects." },
      { question: "Should I learn Go or stick with Node.js for freelancing in Bangladesh?", answer: "Node.js still dominates client-facing MVPs. Go is valuable for performance-sensitive services and cloud-native stacks." },
      { question: "Is Go harder than Node.js for beginners?", answer: "Go has less magic and stricter typing, which feels harder initially but reduces runtime surprises." },
      { question: "What Go framework should students use?", answer: "Start with net/http or chi for routing. Add Gin or Echo if you want batteries included." },
    ],
    content: join(
      p("For my first two years at <strong>Daffodil International University (DIU)</strong>, <strong>Node.js</strong> was home. Express routes, async/await, npm scripts, Prisma, JWT middleware—I could ship Bornosoft prototypes fast because the JavaScript ecosystem rewarded speed. Then I hit walls that had nothing to do with syntax: CPU-heavy report generation blocking the event loop, memory growth on long-running workers, and concurrency bugs that only appeared under client traffic spikes."),
      p("That is when I started learning <strong>Golang</strong>. Not to abandon Node—I still use it for many frontends and BFF layers—but to build services where predictable performance and simple deployment mattered."),
      h2("Why I Did Not Drop Node.js Overnight"),
      p("At <strong>Bornosoft</strong>, our client projects already had Node APIs, React dashboards, and shared TypeScript types. Rewriting everything in Go would have been resume-driven development, not client value."),
      ul(["<strong>Stay on Node</strong> for CRUD APIs, webhooks, and rapid MVPs.", "<strong>Reach for Go</strong> for file processors, PDF pipelines, background workers, and internal tools needing low memory footprint on small EC2 instances."]),
      tip("Learn a second backend language to expand your toolbox, not to win arguments on Twitter."),
      h2("The Mental Model Shift: From Event Loop to Goroutines"),
      p("Node taught me async thinking: never block the thread, push work to the event loop, await promises. Go taught me a different sentence: write straightforward code and let the runtime schedule concurrency."),
      h3("Side-by-Side: A Simple HTTP Handler"),
      code("javascript", `import express from "express";
const app = express();
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "bornosoft-api" });
});
app.listen(3000);`),
      code("go", `func healthHandler(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode(map[string]string{
    "status": "ok", "service": "bornosoft-api",
  })
}
func main() {
  http.HandleFunc("/health", healthHandler)
  log.Fatal(http.ListenAndServe(":8080", nil))
}`),
      h2("My 90-Day Go Learning Plan as a Student"),
      table([
        ["Phase", "Weeks", "Focus"],
        ["Foundations", "1–3", "Syntax, structs, interfaces, error handling"],
        ["Web & APIs", "4–6", "net/http, chi router, JSON, middleware"],
        ["Concurrency", "7–9", "Goroutines, channels, context cancellation"],
        ["Production", "10–12", "Testing, Docker, deploy to EC2, pprof basics"],
      ]),
      h3("Resources That Actually Helped"),
      ol(["<strong>A Tour of Go</strong> — Official, concise, free.", "<strong>Go by Example</strong> — Quick reference when implementing Bornosoft tasks.", "<strong>Effective Go</strong> — Read after building something real.", "<strong>Ardan Labs blog</strong> — Practical concurrency guidance."]),
      note("I avoided tutorial hell by reimplementing one small Bornosoft internal tool in Go each month."),
      h2("Error Handling: The Culture Shock"),
      code("go", `func loadConfig(path string) (Config, error) {
  data, err := os.ReadFile(path)
  if err != nil {
    return Config{}, fmt.Errorf("read config: %w", err)
  }
  var cfg Config
  if err := json.Unmarshal(data, &cfg); err != nil {
    return Config{}, fmt.Errorf("parse config: %w", err)
  }
  return cfg, nil
}`),
      p("Wrapping errors with context became a habit. When a Bornosoft staging deploy failed at 1 AM, wrapped errors pointed to the exact file read—not a generic 500 with no story."),
      h2("First Real Go Service: Webhook Retry Worker"),
      p("Our Node API accepted payments and forwarded webhooks to client endpoints. Under load, transient failures piled up in a database table. The retry worker in Node worked but consumed noticeable memory when batch sizes grew."),
      ul(["Read pending webhooks from PostgreSQL in batches.", "Spawn worker pool with bounded concurrency.", "Respect exponential backoff and max attempts.", "Expose /metrics for basic counters."]),
      warn("Do not rewrite working Node services in Go without measuring pain."),
      h2("Testing and Tooling: Where Go Wins for Solo Developers"),
      code("bash", "go fmt ./...\ngo test ./... -race\ngo build -o bin/worker ./cmd/worker"),
      h2("Where I Still Prefer Node.js"),
      ul(["The team is JavaScript-native and sharing types with React matters.", "NPM libraries solve 80% of integrations.", "Serverless functions with short cold-start needs fit the platform.", "Velocity beats raw throughput for a two-week MVP deadline."]),
      h2("Deploying Go on AWS: Student-Friendly Path"),
      ol(["Cross-compile: GOOS=linux GOARCH=amd64 go build -o worker", "SCP binary and systemd unit file to EC2.", "Run behind Nginx reverse proxy if exposing HTTP.", "Add GitHub Actions to build and deploy on tag push."]),
      h2("Common Mistakes I Made Learning Go"),
      ol(["<strong>Overusing goroutines</strong> — Unbounded concurrency recreated Node problems.", "<strong>Ignoring context.Context</strong> — HTTP handlers must respect cancellation.", "<strong>Pointer obsession</strong> — Not every struct needs pointers.", "<strong>Skipping interfaces until needed</strong> — Define them at consumption sites."]),
      h2("How Go Changed My DIU Coursework Approach"),
      p("Even when assignments allowed any language, I sometimes implemented algorithms in Go for clarity—especially OS and networking labs where concurrency maps cleanly. Explaining goroutines in a viva was a differentiator when peers only discussed Java and Python."),
      h2("Conclusion"),
      p("My journey <strong>from Node.js to Golang</strong> was not a replacement story—it was an upgrade path for specific problems at Bornosoft. Start with one painful Node service. Profile it. If the pain is real, rebuild the smallest slice in Go."),
      p("Want my webhook worker patterns? Connect via <a href=\"https://kazinayeem.site\">kazinayeem.site</a>.")
    ),
  },
  {
    slug: "ecs-vs-eks-vs-ecr-explained-beginners",
    title: "ECS vs EKS vs ECR Explained for Beginners",
    seoTitle: "ECS vs EKS vs ECR Explained for Beginners | Mohammad Ali Nayeem",
    subtitle: "A DIU student's plain-English guide to three AWS services that confused me until I deployed Bornosoft apps",
    description: "Mohammad Ali Nayeem breaks down AWS ECS, EKS, and ECR for beginners—what each service does, when to use which, and how he learned them while building projects at Daffodil International University.",
    category: "AWS",
    tags: ["AWS", "ECS", "EKS", "ECR", "Docker", "Cloud"],
    keywords: ["ECS vs EKS vs ECR", "AWS containers beginners", "when to use ECS or EKS", "ECR docker registry AWS"],
    publishedAt: "2024-09-22",
    updatedAt: "2024-10-15",
    featured: true,
    popular: false,
    coverImageAlt: "Diagram-style illustration of AWS container services ECS EKS and ECR workflow",
    relatedSlugs: ["learning-docker-from-scratch", "kubernetes-explained-simply", "my-devops-roadmap-software-engineering-student"],
    faqs: [
      { question: "Do I need ECR if I use Docker Hub?", answer: "No, but ECR integrates tightly with AWS IAM and often provides faster pulls inside the same region as your ECS or EKS workloads." },
      { question: "Is ECS easier than EKS for beginners?", answer: "Generally yes. ECS abstracts Kubernetes complexity and fits smaller apps well." },
      { question: "How much does EKS cost for students?", answer: "EKS charges for the managed control plane per cluster hour plus worker infrastructure. Delete clusters when not actively learning." },
      { question: "Can ECS and EKS use the same ECR images?", answer: "Yes. Build once, push to ECR, reference the same image URI in ECS task definitions and Kubernetes Deployment manifests." },
    ],
    content: join(
      p("The first time I opened the AWS console to deploy a Dockerized Bornosoft API, I saw three acronyms that sounded like the same thing: <strong>ECS</strong>, <strong>EKS</strong>, and <strong>ECR</strong>. Containers were supposed to simplify deployment—why did AWS need an alphabet soup to run them?"),
      p("Months later, after coursework at <strong>Daffodil International University (DIU)</strong>, AWS free-tier experiments, and a painful Sunday where I pushed an image to the wrong repository, the picture finally cleared."),
      h2("The One-Sentence Summary of Each Service"),
      table([
        ["Service", "What it is", "Analogy"],
        ["ECR", "Elastic Container Registry — stores Docker images", "Your private Docker Hub inside AWS"],
        ["ECS", "Elastic Container Service — runs containers without managing Kubernetes", "AWS-managed container orchestrator"],
        ["EKS", "Elastic Kubernetes Service — managed Kubernetes control plane", "Kubernetes cluster AWS operates for you"],
      ]),
      tip("Learn ECR first. If you cannot push and pull images reliably, neither ECS nor EKS will save you."),
      h2("ECR: Where Your Docker Images Live"),
      p("When I dockerized a Node API for a Bornosoft client demo, my laptop had the image. AWS needed a copy in-region for fast pulls. <strong>Amazon ECR</strong> is that copy—a private registry integrated with IAM permissions."),
      h3("Typical ECR Workflow"),
      ol(["Create an ECR repository (e.g., bornosoft/api).", "Authenticate Docker to ECR with AWS CLI.", "Tag local image with the ECR URI.", "Push image.", "Reference image URI in ECS task definition or EKS deployment."]),
      code("bash", `aws ecr get-login-password --region ap-southeast-1 | \\
  docker login --username AWS --password-stdin 123456789.dkr.ecr.ap-southeast-1.amazonaws.com
docker build -t bornosoft-api .
docker tag bornosoft-api:latest 123456789.dkr.ecr.ap-southeast-1.amazonaws.com/bornosoft/api:latest
docker push 123456789.dkr.ecr.ap-southeast-1.amazonaws.com/bornosoft/api:latest`),
      note("Choose your AWS region deliberately. I used ap-southeast-1 (Singapore) for lower latency from Dhaka."),
      h2("ECS: AWS-Native Container Orchestration"),
      p("<strong>Amazon ECS</strong> schedules containers on infrastructure you define—EC2 instances or AWS Fargate. You do not manage Kubernetes masters or etcd."),
      h3("ECS Concepts That Finally Made Sense"),
      ul(["<strong>Cluster</strong> — Logical grouping of capacity.", "<strong>Task definition</strong> — Blueprint for your container(s).", "<strong>Service</strong> — Keeps desired task count running.", "<strong>Fargate</strong> — Run tasks without managing EC2 instances."]),
      code("json", `{
  "family": "bornosoft-api",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [{
    "name": "api",
    "image": "123456789.dkr.ecr.ap-southeast-1.amazonaws.com/bornosoft/api:latest",
    "portMappings": [{ "containerPort": 8080 }]
  }]
}`),
      h2("EKS: Managed Kubernetes on AWS"),
      p("<strong>Amazon EKS</strong> runs the Kubernetes control plane for you. You still manage worker nodes, networking plugins, and Kubernetes objects."),
      warn("EKS has a control plane hourly cost even when idle. Spin clusters down aggressively as a student."),
      h3("My First EKS Lesson: Networking Is the Boss Fight"),
      ol(["VPC and subnet tagging for ELB discovery.", "IAM OIDC provider for service accounts.", "Security groups and health check paths."]),
      h2("ECS vs EKS: Decision Framework for Students"),
      table([
        ["Question", "Lean ECS", "Lean EKS"],
        ["First container deploy ever?", "Yes", "No"],
        ["Need Kubernetes on resume?", "Less urgent", "Yes"],
        ["Budget-sensitive experiments?", "Fargate tasks often simpler", "Watch control plane cost"],
      ]),
      h2("How ECR Connects ECS and EKS"),
      code("text", "Code → Docker build → Push to ECR → Deploy to ECS task or EKS Deployment"),
      h2("Real Student Project: Portfolio API on ECS Fargate"),
      ol(["Created ECR repo portfolio/api.", "Built Next.js API routes in a standalone Docker image.", "Defined ECS Fargate service with 0.25 vCPU.", "Attached Application Load Balancer with HTTPS via ACM.", "Shipped logs to CloudWatch for debugging."]),
      h2("Common Beginner Mistakes"),
      ul(["Wrong image tag discipline — Always :latest in production invites surprise deploys.", "Forgetting IAM permissions — ECS task execution role needs ECR pull rights.", "Region mismatch — Image in Singapore, cluster in Mumbai = pull failures.", "Skipping health checks — Tasks restart loops look like AWS is broken."]),
      h2("Learning Path I Recommend at DIU"),
      ol(["Dockerize a app locally.", "Push to ECR manually from laptop.", "Run one ECS Fargate task with public IP (lab only).", "Add ALB + HTTPS when comfortable.", "Install minikube/kind and deploy same image.", "Create EKS cluster for final-year capstone if job targets DevOps."]),
      h2("Conclusion"),
      p("<strong>ECR</strong> stores images. <strong>ECS</strong> runs containers the AWS way. <strong>EKS</strong> runs containers the Kubernetes way. Start with ECR and ECS Fargate this weekend."),
      p("Questions about IAM roles or Fargate networking? Reach me at <a href=\"https://kazinayeem.site\">kazinayeem.site</a>.")
    ),
  },
  {
    slug: "my-first-cicd-pipeline-github-actions",
    title: "My First CI/CD Pipeline with GitHub Actions",
    seoTitle: "My First CI/CD Pipeline with GitHub Actions | Mohammad Ali Nayeem",
    subtitle: "How a DIU student automated Bornosoft deploys and stopped FTP-uploading builds at midnight",
    description: "Mohammad Ali Nayeem walks through building his first CI/CD pipeline with GitHub Actions—testing, Docker builds, ECR pushes, and EC2 deploys—for projects at Daffodil International University and Bornosoft.",
    category: "GitHub Actions",
    tags: ["GitHub Actions", "CI/CD", "Docker", "AWS", "DevOps"],
    keywords: ["first CI/CD pipeline GitHub Actions", "github actions deploy EC2", "student devops pipeline", "bornosoft deployment automation"],
    publishedAt: "2024-10-08",
    updatedAt: "2024-11-02",
    featured: true,
    popular: true,
    coverImageAlt: "GitHub Actions workflow diagram showing test build and deploy stages",
    relatedSlugs: ["jenkins-master-agent-setup-aws-ec2", "learning-docker-from-scratch", "deploying-nextjs-aws-ec2-nginx-pm2"],
    faqs: [
      { question: "Is GitHub Actions free for student projects?", answer: "Public repositories get generous Actions minutes. Private repos have a monthly free tier usually sufficient for small student projects if you cache dependencies." },
      { question: "Should my first pipeline deploy to EC2 or ECS?", answer: "EC2 with Docker Compose is simpler for first-time CD. ECS adds orchestration concepts worth learning later." },
      { question: "How do I store secrets in GitHub Actions?", answer: "Use repository or environment secrets in GitHub settings, never commit .env files. Prefer OIDC federation to AWS when ready." },
      { question: "What should run in CI before deploy?", answer: "At minimum: install dependencies, lint, and unit tests. Add integration tests and migration dry-runs as the project matures." },
    ],
    content: join(
      p("Before CI/CD, my deploy process at <strong>Bornosoft</strong> was embarrassingly manual: build on my laptop, zip artifacts, SCP to an EC2 instance, SSH in, restart PM2, pray nothing broke. I did this after DIU classes, often past midnight."),
      p("My first real <strong>CI/CD pipeline with GitHub Actions</strong> was a YAML file that ran tests, built a Docker image, pushed to ECR, and SSH-deployed to a small EC2 box. That modest pipeline changed how I ship software."),
      h2("What CI/CD Meant to Me Before and After"),
      p("<strong>Before:</strong> Deployment was an event—a risky ceremony tied to my laptop state.<br/><strong>After:</strong> Deployment was a repeatable workflow triggered by git push with logs I could screenshot for professors and clients."),
      tip("Your first pipeline does not need Kubernetes and Terraform. It needs consistency more than glamour."),
      h2("Project Context: Bornosoft Client Dashboard API"),
      ul(["Express API with PostgreSQL", "Dockerfile multi-stage build", "ECR for images", "Single EC2 t3.small with Docker Compose in staging"]),
      h2("Pipeline Architecture Overview"),
      code("text", "PR opened → lint + test job\nmerge to main → build image → push ECR → deploy staging\ntag v* → deploy production (manual approval)"),
      table([["Stage", "Trigger", "Outcome"], ["CI", "pull_request", "Confidence before merge"], ["Build", "push to main", "Immutable image in ECR"], ["Deploy staging", "after build", "Running container on EC2"]]),
      h2("Step 1: CI Job on Pull Requests"),
      code("yaml", `name: CI
on:
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
      - run: npm run lint
      - run: npm test`),
      note("GitHub Actions free minutes are enough for student repos if you cache dependencies."),
      h2("Step 2: Secrets and Environments"),
      ul(["AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY (IAM user scoped to ECR + minimal deploy)", "EC2_HOST, EC2_USER, EC2_SSH_KEY", "DATABASE_URL per environment via GitHub Environments"]),
      warn("Never print secrets in logs. Mask values and rotate keys if leaked."),
      h2("Step 3: Build and Push Docker Image to ECR"),
      code("yaml", `  build-push:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: aws-actions/configure-aws-credentials@v4
      - uses: aws-actions/amazon-ecr-login@v2
      - run: |
          IMAGE=$REGISTRY/bornosoft/dashboard-api
          docker build -t $IMAGE:${{ github.sha }} .
          docker push $IMAGE:${{ github.sha }}`),
      h2("Step 4: Deploy to EC2 via SSH"),
      code("yaml", `  deploy-staging:
    needs: build-push
    environment: staging
    steps:
      - uses: appleboy/ssh-action@v1.0.3
        with:
          script: |
            cd /opt/bornosoft/dashboard-api
            docker compose pull
            docker compose up -d`),
      h2("What Broke the First Three Times"),
      ol(["AMD64 vs ARM — Built on Apple Silicon locally once; EC2 failed until building on ubuntu-latest runners only.", "Missing ECR pull permissions on EC2 instance role.", "Health check race — Compose restarted old container because new one was slow to boot.", "Database migrations — Pipeline did not run migrations until I added a guarded step."]),
      h2("Adding Database Migrations Safely"),
      p("I only ran migrations on staging automatically; production migrations required approval and backup confirmation from the client."),
      h2("How This Pipeline Helped My DIU DevOps Coursework"),
      p("Professors wanted diagrams and reproducibility. I submitted workflow YAML with comments, architecture diagram, screenshot of green checks on a real Bornosoft PR, and rollback story: redeploy previous SHA tag."),
      h2("GitHub Actions vs Jenkins for Students"),
      p("Jenkins still matters for enterprises, but GitHub Actions won for Bornosoft because of zero server maintenance, native GitHub integration, readable YAML in-repo history, and enough free minutes for student scale."),
      h2("Improvements I Added in Month Two"),
      ul(["Slack notifications on deploy failure.", "Concurrency groups to cancel outdated runs.", "OIDC to AWS instead of long-lived access keys.", "Staging smoke test curling /health after deploy."]),
      h2("Conclusion"),
      p("My first <strong>CI/CD pipeline with GitHub Actions</strong> replaced midnight manual uploads with audited automation. Start smaller than this article: one test job on pull requests. Then add build. Then add deploy."),
      p("Want a sanitized workflow template? Message me through <a href=\"https://kazinayeem.site\">kazinayeem.site</a>.")
    ),
  },
  {
    slug: "jenkins-master-agent-setup-aws-ec2",
    title: "Jenkins Master-Agent Setup on AWS EC2",
    seoTitle: "Jenkins Master-Agent Setup on AWS EC2 | Mohammad Ali Nayeem",
    subtitle: "Building a distributed Jenkins lab on EC2 for DIU DevOps coursework and Bornosoft experiments",
    description: "Mohammad Ali Nayeem documents setting up Jenkins master-agent architecture on AWS EC2, including security groups, agent connections, and pipeline lessons from a Software Engineering student in Bangladesh.",
    category: "Jenkins",
    tags: ["Jenkins", "AWS", "EC2", "CI/CD", "DevOps"],
    keywords: ["Jenkins master agent setup EC2", "Jenkins agent AWS tutorial", "distributed Jenkins student lab", "Jenkins SSH agent EC2"],
    publishedAt: "2024-10-25",
    updatedAt: "2024-11-18",
    featured: false,
    popular: false,
    coverImageAlt: "Jenkins dashboard showing master server connected to EC2 build agent node",
    relatedSlugs: ["my-first-cicd-pipeline-github-actions", "my-devops-roadmap-software-engineering-student", "learning-docker-from-scratch"],
    faqs: [
      { question: "Why not run Jenkins builds on the master node?", answer: "Running builds on the controller risks stability and security issues. Agents isolate build workloads and mirror production Jenkins architectures." },
      { question: "SSH agent or JNLP agent for EC2?", answer: "SSH agents are straightforward for Linux EC2 labs—no inbound ports on agents beyond SSH from master." },
      { question: "What EC2 size do I need for Jenkins agents?", answer: "t3.small works for light jobs; Docker builds benefit from t3.medium or larger with adequate disk." },
      { question: "Is Jenkins still worth learning with GitHub Actions?", answer: "Yes for enterprise literacy. Many organizations maintain Jenkins for custom plugins or gradual migration." },
    ],
    content: join(
      p("GitHub Actions became my daily driver for Bornosoft deploys, but my Cloud Computing courses at <strong>Daffodil International University (DIU)</strong> kept pointing at <strong>Jenkins</strong>. Professors wanted us to understand controllers, agents, plugins, and Groovy pipelines."),
      p("So I built a lab: Jenkins master on one EC2 instance, a separate EC2 agent for builds, and SSH-based agent connection because it mirrored coursework requirements."),
      h2("Why Master-Agent Instead of All-in-One?"),
      ul(["<strong>Master (controller)</strong> — Schedules jobs, serves UI, stores configuration.", "<strong>Agent (node)</strong> — Executes build steps with specific tools and capacity."]),
      tip("Label agents clearly (docker, node20, linux) so pipelines target the right capacity."),
      h2("Architecture Overview"),
      code("text", "Internet → (443) ALB or public IP → Jenkins Master EC2\nJenkins Master → (22 SSH) → Agent EC2\nAgent → Docker builds → optional ECR push via IAM role"),
      table([["Instance", "Role", "Instance type"], ["jenkins-master", "Controller UI + orchestration", "t3.small"], ["jenkins-agent-1", "Build executor", "t3.medium"]]),
      h2("Step 1: Launch EC2 Instances and Security Groups"),
      p("Master security group: SSH from my home IP only; HTTP 8080 temporarily for setup, later restricted behind Nginx on 443. Agent security group: SSH from master security group ID only."),
      warn("Never expose Jenkins on port 8080 to the entire internet without authentication hardening."),
      h2("Step 2: Install Jenkins on the Master"),
      code("bash", `sudo apt update && sudo apt install -y openjdk-17-jre
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | \\
  sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null
sudo apt update && sudo apt install -y jenkins
sudo systemctl enable jenkins && sudo systemctl start jenkins`),
      h2("Step 3: Prepare the Agent EC2 Instance"),
      code("bash", `sudo apt install -y openjdk-17-jre-headless git docker.io
sudo usermod -aG docker jenkins-agent
sudo systemctl enable docker && sudo systemctl start docker`),
      h2("Step 4: Connect Agent via SSH"),
      p("On master, generate deploy key for jenkins user. Add public key to agent authorized_keys. In Jenkins UI: Manage Jenkins → Nodes → New Node with Launch agents via SSH."),
      h2("Step 5: Declarative Pipeline Using the Agent"),
      code("groovy", `pipeline {
  agent { label 'docker' }
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Test') { steps { sh 'npm ci && npm test' } }
    stage('Docker Build') {
      steps { sh 'docker build -t bornosoft/sample:${BUILD_NUMBER} .' }
    }
  }
}`),
      note("Use Jenkins credentials store for GitHub PATs and AWS keys—never hardcode secrets in Jenkinsfile."),
      h2("IAM Role for ECR Push from Agent"),
      p("Attaching an IAM instance profile to the agent EC2 with ECR push/pull policy let pipelines push images without static keys on disk."),
      h2("Hardening Steps I Added After the Lab Grade"),
      ol(["Nginx reverse proxy with TLS in front of Jenkins UI.", "Disabled anonymous access.", "Restricted SSH to known IPs via bastion pattern.", "Automated EBS snapshots for Jenkins home volume weekly.", "Plugin updates on a calendar schedule."]),
      h2("Common Failures Troubleshooting Guide"),
      table([["Symptom", "Likely cause"], ["Agent offline", "SSH key mismatch or security group blocking 22"], ["Docker permission denied", "Agent user not in docker group"], ["Out of disk", "Docker images not pruned on agent"]]),
      h2("Cost Management for Bangladeshi Students"),
      ul(["Stop instances when not in active coursework weeks.", "Use AWS Budgets alerts at $5 and $10 thresholds.", "Share a lab agent among study group members with separate Jenkins folders."]),
      h2("Conclusion"),
      p("Setting up <strong>Jenkins master-agent on AWS EC2</strong> gave me hands-on distributed CI architecture I still reference when reading Bornosoft client infrastructure diagrams."),
      p("Stuck on agent connection errors? Reach out via <a href=\"https://kazinayeem.site\">kazinayeem.site</a>.")
    ),
  },
  {
    slug: "my-devops-roadmap-software-engineering-student",
    title: "My DevOps Roadmap as a Software Engineering Student",
    seoTitle: "My DevOps Roadmap as a Software Engineering Student | Mohammad Ali Nayeem",
    subtitle: "A practical semester-by-semester path from DIU coursework to Bornosoft production deploys",
    description: "Mohammad Ali Nayeem shares the DevOps learning roadmap he followed as a Software Engineering student at Daffodil International University—Linux, Docker, CI/CD, AWS, and Kubernetes in realistic order.",
    category: "DevOps",
    tags: ["DevOps", "Career", "DIU", "Roadmap", "Student"],
    keywords: ["devops roadmap software engineering student", "learn devops as student Bangladesh", "DIU devops learning path", "student devops career guide"],
    publishedAt: "2024-11-10",
    updatedAt: "2024-12-05",
    featured: false,
    popular: true,
    coverImageAlt: "Roadmap infographic style view of DevOps skills from Linux to Kubernetes",
    relatedSlugs: ["ecs-vs-eks-vs-ecr-explained-beginners", "kubernetes-explained-simply", "my-first-cicd-pipeline-github-actions"],
    faqs: [
      { question: "Should software engineering students learn DevOps?", answer: "Yes. Even if you aim for application development, understanding deploy pipelines, containers, and cloud basics makes you far more employable." },
      { question: "Kubernetes or Docker first for students?", answer: "Docker first. Learn to build images, run containers, and use Compose locally before Kubernetes." },
      { question: "How many hours per week should I spend on DevOps?", answer: "5–8 focused hours weekly alongside coursework is realistic and compounding." },
      { question: "Do I need AWS certifications as a student?", answer: "Certifications help but do not replace projects. Build deployable portfolio apps first." },
    ],
    content: join(
      p("When I searched DevOps roadmap as a second-year student at <strong>Daffodil International University (DIU)</strong>, I found beautiful infographics with forty logos and zero guidance on what to learn this month while also passing Data Structures and shipping <strong>Bornosoft</strong> client work."),
      p("This article is my personal <strong>DevOps roadmap as a Software Engineering student</strong>: the order that worked, what I deferred, and how Bangladeshi students can build employable skills without pretending to be senior SREs."),
      h2("DevOps Means Different Things to Different People"),
      p("I define DevOps for students as: the discipline of shipping and operating software reliably—version control, automated testing, infrastructure, observability, and collaboration culture."),
      tip("Tie every DevOps skill to a project artifact: a pipeline YAML, a Dockerfile, a Terraform module, a runbook."),
      h2("Phase 0: Foundations (Before Calling It DevOps)"),
      ul(["<strong>Git</strong> — Branching, rebasing, meaningful commits, PR reviews.", "<strong>Linux CLI</strong> — ssh, grep, chmod, systemd, logs in /var/log.", "<strong>Networking intuition</strong> — DNS, HTTP, ports, TLS handshake conceptually.", "<strong>One backend stack</strong> — For me, Node.js; environment variables and config separation."]),
      h2("Phase 1: Single-Server Deploys (Month 1–2)"),
      ol(["Launch EC2, configure security groups minimally.", "Install Nginx reverse proxy + Let's Encrypt.", "Run Node/Go app with PM2 or systemd.", "Configure PostgreSQL (managed RDS later)."]),
      table([["Milestone", "Proof"], ["HTTPS live site", "URL in portfolio"], ["Restart survives reboot", "systemd unit file in repo"], ["Env secrets not in Git", ".env.example only"]]),
      h2("Phase 2: Docker (Month 3–4)"),
      p("Containerize one service. Understand images vs containers, layers, volumes, and compose for local multi-service dev. Why Docker before Kubernetes? Because pods are containers with orchestration sugar."),
      h2("Phase 3: CI with GitHub Actions (Month 5–6)"),
      p("Add pipeline: lint, test, build image, push to ECR. CD to staging EC2 via SSH initially. Automation replaced midnight SCP rituals."),
      h2("Phase 4: AWS Services Breadth (Month 7–9)"),
      ul(["EC2 + VPC — Subnets, security groups, key pairs.", "S3 + CloudFront — Static sites and asset hosting.", "ECR — Image registry.", "ECS Fargate — First managed orchestration step.", "RDS — Managed Postgres backups.", "IAM — Least privilege, roles vs users."]),
      warn("Enable billing alerts on day one. Free tier surprises hurt classmates who left NAT gateways running."),
      h2("Phase 5: Jenkins Lab (Parallel Elective)"),
      p("For coursework requiring Jenkins, I built master-agent EC2 lab—not production Bornosoft path, but interview vocabulary."),
      h2("Phase 6: Kubernetes Basics (Month 10–12)"),
      ul(["Pods, Deployments, Services, ConfigMaps, Secrets", "Ingress + LoadBalancer patterns", "Liveness/readiness probes", "Horizontal Pod Autoscaler conceptually"]),
      h2("Phase 7: Observability and Operations Culture"),
      ul(["Structured logging (JSON logs to CloudWatch)", "Basic metrics—request latency, error rate", "Uptime checks (UptimeRobot free tier)", "Runbooks in repo docs"]),
      h2("How DIU Coursework Mapped to This Roadmap"),
      table([["Course theme", "DevOps reinforcement"], ["Software Engineering", "Git workflow, testing culture"], ["Networking", "VPC, DNS, TLS"], ["Cloud Computing", "AWS labs, ECS/EKS reports"], ["Operating Systems", "Linux processes, systemd"]]),
      h2("What I Intentionally Deferred"),
      ul(["Terraform at scale — Touched basics; deep multi-module repos later.", "Service mesh — Overkill for student MVPs.", "Multi-region HA — Academic reading only.", "Certification cram — Studied for understanding first."]),
      h2("Bornosoft Founder Lens: DevOps as Business Risk Reduction"),
      ol(["Automated tests before fancy infra", "Staging environment before production auto-deploy", "Backups before autoscaling", "Clear rollback before blue-green complexity"]),
      h2("Weekly Habits That Compounded"),
      ul(["One hour reading official docs—not only YouTube summaries.", "One infra improvement ticket per week in personal or Bornosoft repos.", "Monthly cost review of AWS bill.", "Pair sessions with DIU classmates on labs."]),
      h2("Job Market Reality in Bangladesh"),
      p("Local roles increasingly mention Docker, AWS, and CI/CD even for junior full-stack posts. Demonstrable pipelines in GitHub and architecture README in portfolio matter more than logo collection."),
      h2("Conclusion"),
      p("My DevOps roadmap was phases tied to Bornosoft ships and DIU labs: Linux, single-server deploys, Docker, CI/CD, AWS, Jenkins literacy, Kubernetes basics, then observability."),
      p("Pick one project this month. Add one automation. Document it publicly. Want feedback? Contact me at <a href=\"https://kazinayeem.site\">kazinayeem.site</a>.")
    ),
  },
];
