import { createPost } from "../article-builder";

const post = createPost({
  slug: "ecs-vs-eks-vs-ecr-explained-beginners",
  title: "ECS vs EKS vs ECR Explained for Beginners",
  seoTitle: "ECS vs EKS vs ECR Explained for Beginners | Mohammad Ali Nayeem",
  subtitle:
    "A DIU student's plain-English guide to three AWS services that confused me until I deployed Bornosoft apps",
  description:
    "Mohammad Ali Nayeem breaks down AWS ECS, EKS, and ECR for beginners—what each service does, when to use which, and how he learned them while building projects at Daffodil International University.",
  category: "AWS",
  tags: ["AWS", "ECS", "EKS", "ECR", "Docker", "Cloud"],
  keywords: [
    "ECS vs EKS vs ECR",
    "AWS containers beginners",
    "when to use ECS or EKS",
    "ECR docker registry AWS",
  ],
  publishedAt: "2024-09-22",
  updatedAt: "2024-10-15",
  featured: true,
  popular: false,
  coverImageAlt:
    "Diagram-style illustration of AWS container services ECS EKS and ECR workflow",
  content: `<p>The first time I opened the AWS console to deploy a Dockerized Bornosoft API, I saw three acronyms that sounded like the same thing: <strong>ECS</strong>, <strong>EKS</strong>, and <strong>ECR</strong>. I clicked each service, read fragments of documentation, and closed the tab more confused than when I started. Containers were supposed to simplify deployment—why did AWS need an alphabet soup to run them?</p>

<p>Months later, after coursework at <strong>Daffodil International University (DIU)</strong>, AWS free-tier experiments, and a painful Sunday where I pushed an image to the wrong repository, the picture finally cleared. This article is the explanation I needed as a beginner: what each service does, how they fit together, and when a student builder in Bangladesh should choose one path over another.</p>

<h2>The One-Sentence Summary of Each Service</h2>

<table>
<thead><tr><th>Service</th><th>What it is</th><th>Analogy</th></tr></thead>
<tbody>
<tr><td><strong>ECR</strong></td><td>Elastic Container Registry — stores Docker images</td><td>Your private Docker Hub inside AWS</td></tr>
<tr><td><strong>ECS</strong></td><td>Elastic Container Service — runs containers without you managing Kubernetes</td><td>AWS-managed container orchestrator</td></tr>
<tr><td><strong>EKS</strong></td><td>Elastic Kubernetes Service — managed Kubernetes control plane</td><td>Kubernetes cluster AWS operates for you</td></tr>
</tbody>
</table>

<p>ECR is about <em>images</em>. ECS and EKS are about <em>running</em> those images. Beginners often conflate all three because tutorials jump from <code>docker build</code> to YAML manifests without naming the storage layer.</p>

<div class="callout tip"><strong>Tip:</strong> Learn ECR first. If you cannot push and pull images reliably, neither ECS nor EKS will save you.</div>

<h2>ECR: Where Your Docker Images Live</h2>

<p>When I dockerized a Node API for a Bornosoft client demo, my laptop had the image. AWS needed a copy in-region for fast pulls. <strong>Amazon ECR</strong> is that copy— a private registry integrated with IAM permissions.</p>

<h3>Typical ECR Workflow</h3>

<ol>
<li>Create an ECR repository (e.g., <code>bornosoft/api</code>).</li>
<li>Authenticate Docker to ECR with AWS CLI.</li>
<li>Tag local image with the ECR URI.</li>
<li>Push image.</li>
<li>Reference image URI in ECS task definition or EKS deployment.</li>
</ol>

<pre><code class="language-bash">aws ecr get-login-password --region ap-southeast-1 | \\
  docker login --username AWS --password-stdin 123456789.dkr.ecr.ap-southeast-1.amazonaws.com

docker build -t bornosoft-api .
docker tag bornosoft-api:latest \\
  123456789.dkr.ecr.ap-southeast-1.amazonaws.com/bornosoft/api:latest
docker push 123456789.dkr.ecr.ap-southeast-1.amazonaws.com/bornosoft/api:latest</code></pre>

<p>ECR pricing includes storage per GB-month and data transfer. For student projects with a few small images, costs stay tiny—especially if you delete old tags during spring cleaning.</p>

<div class="callout note"><strong>Note:</strong> Choose your AWS region deliberately. I used <code>ap-southeast-1</code> (Singapore) for lower latency from Dhaka than US regions, balancing cost and speed.</div>

<h2>ECS: AWS-Native Container Orchestration</h2>

<p><strong>Amazon ECS</strong> schedules containers on infrastructure you define—EC2 instances or AWS Fargate (serverless tasks). You do not manage Kubernetes masters or etcd. You write task definitions: which image, CPU, memory, ports, environment variables, and logging.</p>

<h3>ECS Concepts That Finally Made Sense</h3>

<ul>
<li><strong>Cluster</strong> — Logical grouping of capacity.</li>
<li><strong>Task definition</strong> — Blueprint for your container(s).</li>
<li><strong>Service</strong> — Keeps desired task count running, handles restarts.</li>
<li><strong>Fargate</strong> — Run tasks without managing EC2 instances.</li>
</ul>

<p>For a DIU cloud computing assignment, I deployed a simple Go health-check API on Fargate. No nodes to SSH into. The trade-off: less control, slightly higher per-task cost than a well-packed EC2 host—but glorious for demos and low-traffic MVPs.</p>

<pre><code class="language-json">{
  "family": "bornosoft-api",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "api",
      "image": "123456789.dkr.ecr.ap-southeast-1.amazonaws.com/bornosoft/api:latest",
      "portMappings": [{ "containerPort": 8080, "protocol": "tcp" }],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/bornosoft-api",
          "awslogs-region": "ap-southeast-1",
          "awslogs-stream-prefix": "api"
        }
      }
    }
  ]
}</code></pre>

<h3>When ECS Was the Right Choice for Me</h3>

<p>I picked ECS Fargate when:</p>

<ul>
<li>I had one or two containers per app, not fifty microservices.</li>
<li>I did not need Kubernetes APIs or Helm charts yet.</li>
<li>I wanted AWS console visibility for professors reviewing my project.</li>
<li>Team skill was Docker + AWS, not kubectl culture.</li>
</ul>

<h2>EKS: Managed Kubernetes on AWS</h2>

<p><strong>Amazon EKS</strong> runs the Kubernetes control plane for you. You still manage worker nodes (or use Fargate profiles), networking plugins, and Kubernetes objects—Deployments, Services, Ingress, ConfigMaps, Secrets.</p>

<p>EKS shines when you need portable Kubernetes skills, multi-service architectures, advanced rollout strategies, or ecosystem tools (Argo CD, Prometheus operators, service meshes). It also shines on resumes—Kubernetes appears everywhere in DevOps job posts from Dhaka to Singapore.</p>

<div class="callout warning"><strong>Warning:</strong> EKS has a control plane hourly cost even when idle. As a student, I spun clusters down aggressively and used local kind/minikube for daily practice instead of leaving EKS running overnight.</div>

<h3>My First EKS Lesson: Networking Is the Boss Fight</h3>

<p>Getting pods running was easy. Getting a LoadBalancer Service to route traffic correctly with AWS Load Balancer Controller took longer than building the container. EKS beginners underestimate:</p>

<ol>
<li>VPC and subnet tagging for ELB discovery.</li>
<li>IAM OIDC provider for service accounts.</li>
<li>Security groups and health check paths.</li>
</ol>

<p>That pain was valuable—it forced me to read AWS networking docs instead of copy-pasting Helm one-liners.</p>

<h2>ECS vs EKS: Decision Framework for Students</h2>

<table>
<thead><tr><th>Question</th><th>Lean ECS</th><th>Lean EKS</th></tr></thead>
<tbody>
<tr><td>First container deploy ever?</td><td>Yes</td><td>No</td></tr>
<tr><td>Need Kubernetes on resume?</td><td>Less urgent</td><td>Yes</td></tr>
<tr><td>Microservices + GitOps later?</td><td>Maybe migrate later</td><td>Yes</td></tr>
<tr><td>Budget-sensitive experiments?</td><td>Fargate tasks often simpler</td><td>Watch control plane cost</td></tr>
<tr><td>Team knows kubectl?</td><td>Not required</td><td>Helpful</td></tr>
</tbody>
</table>

<p>I tell DIU juniors: <strong>start ECS to learn images, tasks, logs, and IAM.</strong> Move to EKS when Kubernetes vocabulary becomes a goal, not a buzzword. Bornosoft client prototypes almost always stopped at ECS or plain EC2 until product-market fit justified orchestration complexity.</p>

<h2>How ECR Connects ECS and EKS</h2>

<p>Both orchestrators pull from ECR (or public registries). The flow I use repeatedly:</p>

<pre><code class="language-text">Code → Docker build → Push to ECR → Deploy to ECS task or EKS Deployment</code></pre>

<p>GitHub Actions can automate this pipeline—build on merge, push tag with git SHA, update task definition or kubectl set image. Same ECR image can feed staging ECS and production EKS during migrations.</p>

<h2>Real Student Project: Portfolio API on ECS Fargate</h2>

<p>For an early portfolio backend experiment (later simplified to static hosting), I:</p>

<ol>
<li>Created ECR repo <code>portfolio/api</code>.</li>
<li>Built Next.js API routes in a standalone Docker image.</li>
<li>Defined ECS Fargate service with 0.25 vCPU.</li>
<li>Attached Application Load Balancer with HTTPS via ACM.</li>
<li>Shipped logs to CloudWatch for debugging.</li>
</ol>

<p>Total monthly cost on low traffic stayed within student budget. The architecture diagram impressed course instructors more than another EC2 PM2 screenshot.</p>

<h2>Common Beginner Mistakes with ECS, EKS, and ECR</h2>

<ul>
<li><strong>Wrong image tag discipline</strong> — Always `:latest` in production invites surprise deploys. Use immutable tags.</li>
<li><strong>Forgetting IAM permissions</strong> — ECS task execution role needs ECR pull rights.</li>
<li><strong>Region mismatch</strong> — Image in Singapore, cluster in Mumbai = pull failures and confusion.</li>
<li><strong>Skipping health checks</strong> — Tasks restart loops look like "AWS is broken" when the app crashes on boot.</li>
<li><strong>Jumping to EKS for a static site</strong> — S3 + CloudFront exists; use the right tool.</li>
</ul>

<h2>Learning Path I Recommend at DIU</h2>

<ol>
<li>Dockerize a app locally.</li>
<li>Push to ECR manually from laptop.</li>
<li>Run one ECS Fargate task with public IP (lab only).</li>
<li>Add ALB + HTTPS when comfortable.</li>
<li>Install minikube/kind and deploy same image.</li>
<li>Create EKS cluster for final-year portfolio capstone if job targets DevOps.</li>
</ol>

<div class="callout tip"><strong>Tip:</strong> Document every ARN, role, and subnet ID in a README. Future you at 2 AM will not remember which security group worked.</div>

<h2>Conclusion</h2>

<p><strong>ECR</strong> stores images. <strong>ECS</strong> runs containers the AWS way. <strong>EKS</strong> runs containers the Kubernetes way with AWS managing the control plane. They are complementary, not interchangeable synonyms.</p>

<p>As a Software Engineering student and Bornosoft founder, I wasted time treating them as a single mystery box. Once I separated storage from orchestration—and ECS from EKS—AWS containers became teachable, deployable, and interview-ready skills.</p>

<p>Start with ECR and ECS Fargate this weekend. Push one Bornosoft or coursework image. Watch it run. Then decide if Kubernetes deserves your next semester—not your next sleepless Tuesday.</p>

<p>Questions about IAM roles or Fargate networking? Reach me at <a href="https://kazinayeem.site">kazinayeem.site</a>.</p>`,
  faqs: [
    {
      question: "Do I need ECR if I use Docker Hub?",
      answer:
        "No, but ECR integrates tightly with AWS IAM and often provides faster pulls inside the same region as your ECS or EKS workloads. For student AWS projects, ECR keeps everything in one console and teaches AWS-native patterns.",
    },
    {
      question: "Is ECS easier than EKS for beginners?",
      answer:
        "Generally yes. ECS abstracts Kubernetes complexity and fits smaller apps well. EKS is better when you specifically need Kubernetes portability, ecosystem tools, or job-market Kubernetes experience.",
    },
    {
      question: "How much does EKS cost for students?",
      answer:
        "EKS charges for the managed control plane per cluster hour plus worker infrastructure. Costs add up if clusters run 24/7. Use minikube locally for practice and delete EKS clusters when not actively learning.",
    },
    {
      question: "Can ECS and EKS use the same ECR images?",
      answer:
        "Yes. Build once, push to ECR, reference the same image URI in ECS task definitions and Kubernetes Deployment manifests. This is a common migration pattern.",
    },
  ],
  relatedSlugs: [
    "learning-docker-from-scratch",
    "kubernetes-explained-simply",
    "my-devops-roadmap-software-engineering-student",
  ],
});

export default post;
