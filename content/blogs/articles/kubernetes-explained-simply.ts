import { createPost } from "../article-builder";

const post = createPost({
  slug: "kubernetes-explained-simply",
  title: "Kubernetes Explained Simply",
  seoTitle: "Kubernetes Explained Simply | Mohammad Ali Nayeem",
  subtitle:
    "Pods, Deployments, and Services demystified for DIU students who just learned Docker",
  description:
    "Mohammad Ali Nayeem explains Kubernetes in plain language—core concepts, YAML manifests, Minikube practice, and when Bornosoft projects actually need K8s versus simpler options.",
  category: "Kubernetes",
  tags: ["Kubernetes", "K8s", "DevOps", "Docker", "Cloud"],
  keywords: [
    "kubernetes explained simply",
    "kubernetes beginners tutorial",
    "learn kubernetes student",
    "pods deployments services explained",
  ],
  publishedAt: "2024-12-12",
  updatedAt: "2025-01-08",
  featured: false,
  popular: true,
  coverImageAlt:
    "Simplified Kubernetes architecture diagram with control plane and worker nodes",
  content: `<p>After dockerizing Bornosoft APIs and running them on a single EC2 instance with Compose, I hit the ceiling: deploy one container update, pray PM2 or Compose restarts cleanly, manually scale when traffic spiked during a client demo. Friends kept saying "just use Kubernetes" as if typing <code>kubectl apply</code> would summon reliability. It did not—at least not until I understood what Kubernetes actually orchestrates.</p>

<p>This article is <strong>Kubernetes explained simply</strong> for Software Engineering students at <strong>Daffodil International University (DIU)</strong> and self-taught developers in Bangladesh who know Docker but find K8s docs overwhelming. No gatekeeping, no "you should have learned this in year one"—just the mental model I use when deciding whether Bornosoft workloads belong on EKS or stay on ECS and EC2.</p>

<h2>The Problem Kubernetes Solves</h2>

<p>Imagine you run ten copies of your API container across five servers. You must answer:</p>

<ul>
<li>Which server has capacity for a new instance?</li>
<li>How do you replace instances without downtime?</li>
<li>How does traffic find healthy instances?</li>
<li>What happens when a server dies at 3 AM?</li>
</ul>

<p>Kubernetes automates those decisions. It is a <strong>container orchestrator</strong>—a control plane that watches desired state (YAML manifests) and reconciles reality to match.</p>

<div class="callout tip"><strong>Tip:</strong> If one Docker Compose file on one VM handles your traffic, you probably do not need Kubernetes yet. Learn it anyway for career optionality.</div>

<h2>Core Components in Plain English</h2>

<table>
<thead><tr><th>K8s Object</th><th>What It Is</th><th>Analogy</th></tr></thead>
<tbody>
<tr><td>Cluster</td><td>Whole K8s system</td><td>The orchestra</td></tr>
<tr><td>Node</td><td>Worker machine (VM or bare metal)</td><td>Musician</td></tr>
<tr><td>Pod</td><td>Smallest deployable unit; usually one container</td><td>Sheet music stand</td></tr>
<tr><td>Deployment</td><td>Manages replicated Pods, rolling updates</td><td>Conductor ensuring enough stands</td></tr>
<tr><td>Service</td><td>Stable network endpoint to Pods</td><td>Published concert program listing</td></tr>
<tr><td>Ingress</td><td>HTTP routing from outside cluster</td><td>Ticket booth directing audience</td></tr>
<tr><td>Namespace</td><td>Logical isolation inside cluster</td><td>Rehearsal rooms</td></tr>
</tbody>
</table>

<h2>Control Plane vs Worker Nodes</h2>

<p>The <strong>control plane</strong> makes decisions: scheduling, API, etcd state store. <strong>Worker nodes</strong> run your Pods. Managed services like <strong>Amazon EKS</strong> run the control plane for you—essential for students who should not babysit etcd during finals.</p>

<h3>What kubectl Does</h3>

<p><code>kubectl</code> is your CLI to the Kubernetes API. You describe desired state in YAML; Kubernetes controllers loop until reality matches.</p>

<pre><code class="language-bash"># Cluster info
kubectl cluster-info
kubectl get nodes

# Workloads
kubectl get pods -A
kubectl describe pod my-api-7f8b9c-xyz

# Apply manifest
kubectl apply -f deployment.yaml

# Logs and debugging
kubectl logs deployment/my-api
kubectl exec -it pod/my-api-xyz -- sh</code></pre>

<h2>Your First Deployment and Service</h2>

<p>I practiced on <strong>Minikube</strong> locally before touching EKS bills:</p>

<pre><code class="language-bash">minikube start
kubectl create deployment hello-api --image=nginx
kubectl expose deployment hello-api --type=NodePort --port=80
minikube service hello-api --url</code></pre>

<p>Then I replaced imperative commands with declarative YAML—the production habit:</p>

<pre><code class="language-yaml">apiVersion: apps/v1
kind: Deployment
metadata:
  name: bornosoft-api
  labels:
    app: bornosoft-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: bornosoft-api
  template:
    metadata:
      labels:
        app: bornosoft-api
    spec:
      containers:
        - name: api
          image: ACCOUNT.dkr.ecr.ap-southeast-1.amazonaws.com/bornosoft-api:1.2.0
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: production
          resources:
            requests:
              memory: "128Mi"
              cpu: "100m"
            limits:
              memory: "256Mi"
              cpu: "500m"
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 15
            periodSeconds: 10</code></pre>

<pre><code class="language-yaml">apiVersion: v1
kind: Service
metadata:
  name: bornosoft-api
spec:
  selector:
    app: bornosoft-api
  ports:
    - port: 80
      targetPort: 3000
  type: ClusterIP</code></pre>

<div class="callout note"><strong>Note:</strong> ClusterIP is internal-only. Expose externally via Ingress or LoadBalancer Service types depending on cloud integration.</div>

<h2>Rolling Updates and Rollbacks</h2>

<p>Kubernetes shine moment: change image tag, apply, watch gradual replacement:</p>

<pre><code class="language-bash">kubectl set image deployment/bornosoft-api api=bornosoft-api:1.3.0
kubectl rollout status deployment/bornosoft-api
kubectl rollout undo deployment/bornosoft-api  # if things break</code></pre>

<p>This beat my old SSH-and-restart dance during Bornosoft releases—when I actually needed replicated instances.</p>

<h2>ConfigMaps and Secrets</h2>

<p>Do not bake config into images. I externalize non-sensitive config and secrets:</p>

<pre><code class="language-yaml">apiVersion: v1
kind: ConfigMap
metadata:
  name: api-config
data:
  LOG_LEVEL: info
  FEATURE_BILLING: "true"</code></pre>

<p>Secrets store sensitive values (base64 encoded at rest—not encryption alone). In AWS I later integrated <strong>Secrets Manager</strong> with the CSI driver for production Bornosoft staging.</p>

<div class="callout warning"><strong>Warning:</strong> Committing Kubernetes Secrets YAML with real credentials to GitHub is a career-limiting move. Use sealed-secrets, external secret operators, or cloud secret stores.</div>

<h2>Ingress and TLS</h2>

<p>For HTTP routing on EKS I used the AWS Load Balancer Controller with Ingress:</p>

<pre><code class="language-yaml">apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: bornosoft-ingress
  annotations:
    kubernetes.io/ingress.class: alb
spec:
  rules:
    - host: api.bornosoftnr.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: bornosoft-api
                port:
                  number: 80</code></pre>

<p>TLS certificates came from ACM—another layer students stack after basic Deployments work.</p>

<h2>Kubernetes vs Docker Compose vs ECS</h2>

<table>
<thead><tr><th>Tool</th><th>Best For</th><th>Complexity</th></tr></thead>
<tbody>
<tr><td>Docker Compose</td><td>Local dev, single VM</td><td>Low</td></tr>
<tr><td>AWS ECS Fargate</td><td>AWS-native containers without K8s API</td><td>Medium</td></tr>
<tr><td>Kubernetes (EKS)</td><td>Multi-service scale, portable ops</td><td>High</td></tr>
</tbody>
</table>

<p>Most Bornosoft client MVPs never needed EKS on day one. I learned K8s for skill depth and larger architecture conversations—not because every CRUD app requires a cluster.</p>

<h2>Local Learning Stack for DIU Students</h2>

<ol>
<li><strong>Minikube</strong> or <strong>kind</strong> on a laptop with 8GB+ RAM</li>
<li><strong>kubectl</strong> autocompletion and stern for log tailing</li>
<li>Official Kubernetes tutorials: deployments, services, scaling</li>
<li>Killercoda or Play with Kubernetes for browser labs</li>
<li>Weekend project: deploy your dockerized semester API to Minikube</li>
</ol>

<h2>Common Beginner Errors</h2>

<ul>
<li><strong>ImagePullBackOff</strong> — Wrong image name, missing ECR auth, or private registry credentials</li>
<li><strong>CrashLoopBackOff</strong> — App exits on boot; check <code>kubectl logs</code></li>
<li><strong>Pending Pods</strong> — Insufficient cluster CPU/memory or misconfigured node selectors</li>
<li><strong>Service not reachable</strong> — Forgot port mapping or Ingress rule</li>
</ul>

<h2>When I Choose EKS for Bornosoft</h2>

<p>Criteria before spinning a cluster:</p>

<ul>
<li>Multiple microservices needing independent scaling</li>
<li>Client requires portable Kubernetes manifests</li>
<li>Team already operates K8s elsewhere</li>
<li>Budget tolerates control plane hourly cost</li>
</ul>

<p>Otherwise ECS Fargate or even EC2 Docker Compose ships faster—velocity matters for student founders.</p>

<h2>Helm and Package Managers (Brief Intro)</h2>

<p>Raw YAML becomes unwieldy across environments. <strong>Helm</strong> packages Kubernetes manifests into charts with templated values for staging vs production. I use Helm on EKS for Bornosoft staging after mastering plain manifests—understand the underlying objects first, then templating saves duplication.</p>

<pre><code class="language-bash">helm repo add bitnami https://charts.bitnami.com/bitnami
helm install my-redis bitnami/redis --set auth.password=secret
helm list
helm upgrade my-redis bitnami/redis -f values-prod.yaml</code></pre>

<p>Helm is optional for DIU labs; <code>kubectl apply -f</code> folders remain the best teaching path.</p>

<h2>Conclusion</h2>

<p><strong>Kubernetes explained simply</strong> still means a learning curve—but the core story is consistent: declare desired state, let controllers reconcile, expose services reliably, roll forward and back with confidence. As a DIU Software Engineering student building Bornosoft in Bangladesh, that mental model opened senior-level infrastructure discussions I would have avoided a year earlier.</p>

<p>Learn Docker first. Play with Minikube second. Touch EKS when your project outgrows a single VM—or when your internship requires it. Either way, understanding Pods, Deployments, and Services makes you a better engineer even if your next deploy is plain Docker Compose.</p>

<p>Reach me at <a href="https://kazinayeem.site">kazinayeem.site</a> for K8s study group ideas.</p>`,
  faqs: [
    {
      question: "Is Kubernetes too hard for students to learn?",
      answer:
        "The basics—Pods, Deployments, Services—are learnable in a few focused weekends after Docker. Deep production expertise takes months. Start local with Minikube before paying for EKS.",
    },
    {
      question: "Do I need Kubernetes for my portfolio project?",
      answer:
        "Usually no. A well-deployed Dockerized app with CI/CD is stronger proof than a broken half-configured cluster. Add K8s when you can explain why orchestration beats a single VM.",
    },
    {
      question: "What is the difference between a Pod and a container?",
      answer:
        "A Pod wraps one or more containers that share network and storage. Most student workloads run one container per Pod. Kubernetes schedules Pods, not raw containers.",
    },
    {
      question: "EKS vs self-managed Kubernetes on EC2?",
      answer:
        "EKS manages the control plane and integrates with AWS IAM and load balancers. Self-managed is cheaper at scale but operationally heavy—poor fit for most student projects.",
    },
  ],
  relatedSlugs: [
    "ecs-vs-eks-vs-ecr-explained-beginners",
    "learning-docker-from-scratch",
    "my-devops-roadmap-software-engineering-student",
  ],
});

export default post;
