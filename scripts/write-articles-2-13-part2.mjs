export const articlesPart2 = [];

// Article 4
articlesPart2.push({
  index: 4,
  file: "ecs-vs-eks-vs-ecr-explained-beginners.ts",
  meta: {
    slug: "ecs-vs-eks-vs-ecr-explained-beginners",
    title: "ECS vs EKS vs ECR Explained for Beginners",
    seoTitle: "ECS vs EKS vs ECR Explained for Beginners | Mohammad Ali Nayeem",
    subtitle: "A DIU student's plain-English guide to three AWS services that confused me for weeks",
    description: "Mohammad Ali Nayeem breaks down AWS ECS, EKS, and ECR for beginners—what each does, when to use it, and how Bornosoft projects picked the right container stack on a student budget.",
    category: "AWS",
    tags: ["AWS", "ECS", "EKS", "ECR", "Docker", "Cloud"],
    keywords: ["ECS vs EKS vs ECR", "AWS containers beginner", "when to use EKS", "ECR docker registry AWS"],
    coverImageAlt: "Diagram comparing AWS ECS EKS and ECR container services",
    relatedSlugs: ["learning-docker-from-scratch", "kubernetes-explained-simply", "deploying-nextjs-aws-ec2-nginx-pm2"],
    faqs: [
      { question: "Do I need EKS if I already use Docker on EC2?", answer: "No. EKS adds value when you need Kubernetes APIs, multi-team orchestration, or portable manifests. A single app on one EC2 instance often needs only Docker or ECS Fargate." },
      { question: "Is ECR free on AWS?", answer: "ECR charges for storage and data transfer. The AWS free tier includes limited storage months for new accounts. Delete unused image tags to control costs as a student." },
      { question: "Which is easiest for beginners: ECS or EKS?", answer: "ECS with Fargate is simpler—no cluster nodes to patch. EKS teaches industry-standard Kubernetes but has a steeper learning curve and control plane cost." },
      { question: "Can I use ECR without ECS or EKS?", answer: "Yes. Push images to ECR and pull them on EC2, GitHub Actions runners, or local development machines. ECR is just a private Docker registry." },
    ],
  },
  content: `<p>The first time I opened the AWS console hunting for a place to run Docker images, I found three acronyms that looked interchangeable: <strong>ECS</strong>, <strong>EKS</strong>, and <strong>ECR</strong>. I am <strong>Mohammad Ali Nayeem</strong>, a Software Engineering student at <strong>Daffodil International University (DIU)</strong> and founder of <strong>Bornosoft</strong> in Bangladesh. This article is the guide I wish existed before I accidentally provisioned resources I did not need on a student AWS budget.</p>

<p>All three services relate to containers, but they solve different problems. Mixing them up is like confusing a garage (where cars park), a highway system (how traffic flows), and a factory (where cars are built). Let us unpack each one with examples from my coursework, Bornosoft deployments, and late-night lab experiments.</p>

<h2>ECR: Your Private Docker Image Registry</h2>

<p><strong>Amazon Elastic Container Registry (ECR)</strong> stores Docker images privately in AWS. Think GitHub for container layers instead of source code. When you run <code>docker build</code> locally or in CI, you push the resulting image to ECR so servers can pull a known version.</p>

<h3>What ECR Does</h3>

<ul>
<li>Hosts image repositories per project or microservice.</li>
<li>Integrates with IAM for access control.</li>
<li>Scans images for vulnerabilities (basic tiers included).</li>
<li>Works with ECS, EKS, Lambda, and plain EC2 docker pull.</li>
</ul>

<pre><code class="language-bash"># Authenticate Docker to ECR
aws ecr get-login-password --region ap-southeast-1 | \\
  docker login --username AWS --password-stdin 123456789.dkr.ecr.ap-southeast-1.amazonaws.com

# Tag and push
docker tag bornosoft-api:latest 123456789.dkr.ecr.ap-southeast-1.amazonaws.com/bornosoft-api:latest
docker push 123456789.dkr.ecr.ap-southeast-1.amazonaws.com/bornosoft-api:latest</code></pre>

<div class="callout tip"><strong>Tip:</strong> Tag images with git SHA, not only <code>latest</code>. Rollbacks become one command instead of archaeology.</div>

<h2>ECS: AWS-Native Container Orchestration</h2>

<p><strong>Amazon Elastic Container Service (ECS)</strong> runs containers without you managing Kubernetes. You define tasks (CPU, memory, image URI from ECR), and ECS schedules them on EC2 instances or <strong>Fargate</strong> (serverless workers).</p>

<h3>ECS Core Concepts</h3>

<table>
<thead><tr><th>Concept</th><th>Meaning</th><th>Analogy</th></tr></thead>
<tbody>
<tr><td>Cluster</td><td>Logical grouping of capacity</td><td>Parking lot</td></tr>
<tr><td>Task Definition</td><td>Blueprint for containers</td><td>Recipe card</td></tr>
<tr><td>Service</td><td>Keeps N tasks running</td><td>Always-on shift schedule</td></tr>
<tr><td>Fargate</td><td>AWS manages servers</td><td>Ride-hailing vs owning a car</td></tr>
</tbody>
</table>

<p>For a Bornosoft internal dashboard API, ECS Fargate was enough: push to ECR, update service, watch health checks pass. No kubectl, no node groups—just task definitions in Terraform I learned during DevOps labs at DIU.</p>

<div class="callout note"><strong>Note:</strong> ECS uses AWS-specific APIs. Skills transfer conceptually to Kubernetes, but YAML looks different. That trade-off favors speed on AWS-only stacks.</div>

<h2>EKS: Managed Kubernetes on AWS</h2>

<p><strong>Amazon Elastic Kubernetes Service (EKS)</strong> runs upstream-compatible Kubernetes. If your team already writes Deployments, Services, and Ingress manifests—or wants portable skills—EKS is the AWS path.</p>

<h3>When EKS Makes Sense</h3>

<ul>
<li>Multiple microservices with complex networking and autoscaling policies.</li>
<li>Teams standardized on Helm charts and GitOps (Argo CD, Flux).</li>
<li>Hybrid or multi-cloud strategy requiring Kubernetes APIs.</li>
<li>Advanced patterns: service mesh, operators, custom controllers.</li>
</ul>

<h3>When EKS Is Overkill</h3>

<ul>
<li>One Next.js app and one Postgres instance.</li>
<li>Hackathon weekend with two developers.</li>
<li>Tight budget—control plane hourly cost adds up for students.</li>
</ul>

<div class="callout warning"><strong>Warning:</strong> EKS bills for the control plane even when idle. As a DIU student, set billing alarms before experimenting. I learned this after a surprise invoice email.</div>

<h2>Side-by-Side Comparison</h2>

<table>
<thead><tr><th>Question</th><th>ECR</th><th>ECS</th><th>EKS</th></tr></thead>
<tbody>
<tr><td>Primary job</td><td>Store images</td><td>Run containers on AWS</td><td>Run Kubernetes on AWS</td></tr>
<tr><td>Learner curve</td><td>Low</td><td>Medium</td><td>High</td></tr>
<tr><td>Portable to other clouds</td><td>Docker-standard</td><td>AWS-specific</td><td>Kubernetes-standard</td></tr>
<tr><td>Good first project</td><td>Push any Docker app</td><td>Fargate web API</td><td>After learning K8s basics locally</td></tr>
</tbody>
</table>

<h2>How They Work Together</h2>

<p>A typical Bornosoft pipeline looks like this:</p>

<ol>
<li>Developer merges to <code>main</code> on GitHub.</li>
<li>GitHub Actions builds Docker image and pushes to <strong>ECR</strong>.</li>
<li>Deployment updates <strong>ECS</strong> service or <strong>EKS</strong> Deployment to pull new tag.</li>
<li>Load balancer health checks confirm rollout.</li>
</ol>

<pre><code class="language-yaml"># Simplified ECS task definition fragment
family: bornosoft-api
containerDefinitions:
  - name: api
    image: 123456789.dkr.ecr.ap-southeast-1.amazonaws.com/bornosoft-api:abc123
    portMappings:
      - containerPort: 8080
    logConfiguration:
      logDriver: awslogs</code></pre>

<p>Same image URI works in Kubernetes:</p>

<pre><code class="language-yaml">spec:
  containers:
    - name: api
      image: 123456789.dkr.ecr.ap-southeast-1.amazonaws.com/bornosoft-api:abc123
      ports:
        - containerPort: 8080</code></pre>

<h2>My Learning Path at DIU</h2>

<p>I progressed deliberately to avoid overwhelm:</p>

<ol>
<li><strong>Week 1–2:</strong> Docker on local machine + push to ECR from laptop.</li>
<li><strong>Week 3–4:</strong> ECS Fargate service with one container and CloudWatch logs.</li>
<li><strong>Month 2:</strong> Minikube and kind locally before touching EKS.</li>
<li><strong>Month 3:</strong> Small EKS cluster for coursework comparing HPA behavior.</li>
</ol>

<p>Skipping straight to EKS would have hidden fundamentals—images, registries, health checks—behind kubectl abstractions.</p>

<h2>Cost Tips for Bangladeshi Students</h2>

<ul>
<li>Use <strong>ap-southeast-1</strong> or regions close to users; watch data transfer.</li>
<li>Delete stale ECR tags weekly—storage accumulates silently.</li>
<li>Stop ECS services and scale EKS node groups to zero when not demoing.</li>
<li>Apply for AWS Educate or startup credits when available.</li>
</ul>

<h2>Common Beginner Mistakes</h2>

<ul>
<li>Confusing ECR repository URI with ECS service name—they link but are not the same.</li>
<li>Forgetting IAM permissions for ECS task execution role to pull from ECR.</li>
<li>Launching EKS before understanding Deployments—debugging becomes painful.</li>
<li>Running production traffic on <code>latest</code> tags without immutable deploy strategy.</li>
</ul>

<h2>Conclusion</h2>

<p><strong>ECR</strong> stores images. <strong>ECS</strong> runs containers the AWS way. <strong>EKS</strong> runs Kubernetes when you need its ecosystem. None replaces learning Docker first—containers are the shared foundation.</p>

<p>As a DIU student building Bornosoft services from Dhaka, I still choose ECS Fargate for simple APIs and reserve EKS for assignments and clients who explicitly need Kubernetes. Start with ECR pushes from CI, add ECS when you outgrow single EC2 docker-compose, and graduate to EKS when manifests—not hype—justify the control plane.</p>

<p>Questions about AWS bills or architecture sketches? Reach me at <a href="https://kazinayeem.site">kazinayeem.site</a>.</p>`,
});

// Article 5
articlesPart2.push({
  index: 5,
  file: "my-first-cicd-pipeline-github-actions.ts",
  meta: {
    slug: "my-first-cicd-pipeline-github-actions",
    title: "My First CI/CD Pipeline with GitHub Actions",
    seoTitle: "My First CI/CD Pipeline with GitHub Actions | Mohammad Ali Nayeem",
    subtitle: "From manual FTP deploys to automated test-and-ship workflows for a DIU student's portfolio and Bornosoft repos",
    description: "Mohammad Ali Nayeem walks through building his first GitHub Actions CI/CD pipeline—linting, testing, Docker builds, and deployment lessons from Bangladesh.",
    category: "GitHub Actions",
    tags: ["GitHub Actions", "CI/CD", "DevOps", "Docker", "Automation"],
    keywords: ["first CI/CD pipeline GitHub Actions", "github actions tutorial student", "deploy nextjs github actions", "CI/CD beginner guide"],
    coverImageAlt: "GitHub Actions workflow run showing green checkmarks",
    relatedSlugs: ["jenkins-master-agent-setup-aws-ec2", "deploying-nextjs-aws-ec2-nginx-pm2", "my-devops-roadmap-software-engineering-student"],
    faqs: [
      { question: "Is GitHub Actions free for students?", answer: "Public repositories get generous free minutes. Private repos include a monthly minute quota on free plans—enough for small portfolio and class projects if you cache dependencies and avoid redundant jobs." },
      { question: "What should a first pipeline include?", answer: "At minimum: checkout, install dependencies, lint, test, and build. Add deploy only after tests are trustworthy. Secrets go in GitHub repository or environment settings—never in YAML plaintext." },
      { question: "GitHub Actions vs Jenkins for beginners?", answer: "GitHub Actions wins for repos already on GitHub—zero server maintenance. Jenkins teaches classic CI/CD and helps when you need on-prem agents, which is why I learned both at DIU." },
      { question: "How do I deploy to AWS from GitHub Actions?", answer: "Use OIDC federation instead of long-lived AWS keys when possible. Store role ARNs in secrets, assume role in workflow, then run AWS CLI or Terraform apply steps." },
    ],
  },
  content: `<p>Before <strong>CI/CD</strong>, my deploy process was embarrassing: run tests locally (sometimes), build on my laptop, zip files, upload via SCP, pray nothing broke on production. As a <strong>Software Engineering student at DIU</strong> and founder of <strong>Bornosoft</strong>, I knew manual deploys would not scale—especially when juggling coursework and client deadlines from Dhaka.</p>

<p><strong>GitHub Actions</strong> became my first real pipeline platform. No Jenkins server to patch at 2 AM—just YAML beside my code. I am <strong>Mohammad Ali Nayeem</strong>, and this is how I went from zero automation to shipping portfolio and API updates with confidence.</p>

<h2>Why GitHub Actions First</h2>

<p>Our repos already lived on GitHub. Actions integrated pull request checks, deployment environments, and secrets without a separate VM cost for small projects:</p>

<ul>
<li><strong>Co-location:</strong> Workflow files versioned with application code.</li>
<li><strong>Marketplace actions:</strong> Reusable steps for Node, Go, Docker, AWS.</li>
<li><strong>PR feedback:</strong> Red X on broken tests before merge—culture shift for student teams.</li>
</ul>

<div class="callout tip"><strong>Tip:</strong> Start CI (continuous integration) before CD (continuous deployment). Green builds on every push matter more than auto-deploying broken artifacts.</div>

<h2>Pipeline Goals for Portfolio v1</h2>

<p>I defined success criteria before writing YAML:</p>

<ol>
<li>Run ESLint and TypeScript check on every pull request.</li>
<li>Execute unit tests with coverage threshold.</li>
<li>Build Next.js production bundle to catch compile errors.</li>
<li>Deploy to staging on merge to <code>develop</code>, production on tagged releases.</li>
</ol>

<h3>Repository Layout</h3>

<pre><code class="language-text">.github/
  workflows/
    ci.yml
    deploy-staging.yml
    deploy-production.yml
src/
package.json</code></pre>

<h2>My First ci.yml</h2>

<pre><code class="language-yaml">name: CI

on:
  pull_request:
  push:
    branches: [main, develop]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run lint
      - run: npm run test -- --coverage
      - run: npm run build</code></pre>

<p>The first green run felt like a grade A on a lab I had been skipping in my head for months.</p>

<div class="callout note"><strong>Note:</strong> <code>npm ci</code> instead of <code>npm install</code> ensures reproducible CI installs from package-lock.json.</div>

<h2>Adding Docker Build and ECR Push</h2>

<p>Bornosoft API repos needed container artifacts. I extended the pipeline after tests passed:</p>

<pre><code class="language-yaml">  docker:
    needs: build-and-test
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: actions/checkout@v4
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: \${{ secrets.AWS_ROLE_ARN }}
          aws-region: ap-southeast-1
      - uses: aws-actions/amazon-ecr-login@v2
      - run: |
          docker build -t bornosoft-api:\${{ github.sha }} .
          docker tag bornosoft-api:\${{ github.sha }} \$ECR_REGISTRY/bornosoft-api:\${{ github.sha }}
          docker push \$ECR_REGISTRY/bornosoft-api:\${{ github.sha }}</code></pre>

<p>OIDC role assumption eliminated long-lived AWS access keys in GitHub—a security win I highlighted in a DIU presentation on DevSecOps basics.</p>

<h2>Deployment Job to EC2</h2>

<p>Early Bornosoft deploys targeted a single EC2 host with Docker Compose. Simplicity beat Kubernetes for MVPs:</p>

<pre><code class="language-yaml">  deploy:
    needs: docker
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: SSH deploy
        uses: appleboy/ssh-action@v1
        with:
          host: \${{ secrets.EC2_HOST }}
          username: ubuntu
          key: \${{ secrets.EC2_SSH_KEY }}
          script: |
            cd /opt/bornosoft-api
            export IMAGE_TAG=\${{ github.sha }}
            docker compose pull
            docker compose up -d</code></pre>

<div class="callout warning"><strong>Warning:</strong> SSH deploy is fine for learning and tiny fleets. Migrate to SSM, ECS rolling updates, or blue-green strategies before serious traffic.</div>

<h2>Secrets and Environments</h2>

<table>
<thead><tr><th>Secret</th><th>Where Used</th><th>Rotation</th></tr></thead>
<tbody>
<tr><td>AWS_ROLE_ARN</td><td>ECR push</td><td>IAM policy review quarterly</td></tr>
<tr><td>EC2_SSH_KEY</td><td>Deploy script</td><td>Replace key pair semesterly</td></tr>
<tr><td>NEXT_PUBLIC_*</td><td>Build-time env</td><td>Non-secret but versioned</td></tr>
</tbody>
</table>

<p>GitHub Environments let me require manual approval before production deploy—useful when tired students might merge late at night.</p>

<h2>Failures That Taught Me DevOps</h2>

<ul>
<li><strong>Flaky tests:</strong> CI red on main froze deploys until we quarantined timing-sensitive tests.</li>
<li><strong>Missing cache:</strong> npm ci every run burned minutes; setup-node cache fixed it.</li>
<li><strong>Wrong Node version:</strong> Local Node 22 vs CI Node 18 caused cryptic build errors.</li>
<li><strong>Secret typo:</strong> Three hours debugging deploy only to find <code>EC2_HOST</code> had trailing space.</li>
</ul>

<h2>How CI/CD Changed Bornosoft Workflow</h2>

<p>Clients noticed fewer Friday-night hotfixes. Interns could open PRs knowing robots would catch eslint violations. I spent review time on architecture instead of asking did you run the tests.</p>

<p>Academically, CI/CD bridged Software Engineering theory—version control, testing, release management—to tools employers list in job posts across Dhaka and remote roles.</p>

<h2>Next Steps After Your First Pipeline</h2>

<ol>
<li>Add branch protection requiring CI pass before merge.</li>
<li>Introduce preview deployments for Next.js via Vercel or ephemeral ECS tasks.</li>
<li>Scan dependencies with Dependabot and container images with ECR scanning.</li>
<li>Compare with Jenkins on EC2 to understand agent models—not religious debates.</li>
</ol>

<h2>Conclusion</h2>

<p>My first <strong>CI/CD pipeline with GitHub Actions</strong> was not glamorous YAML poetry—it was lint, test, build, push, deploy repeated until boring. That boredom is the point. Reliable automation freed hours I reinvested into Bornosoft features and DIU labs.</p>

<p>If you host code on GitHub, open your repo today, add a ten-line workflow, and protect your main branch. Future you—grading deadlines and client demos—will thank present you.</p>

<p>Pipeline questions? <a href="https://kazinayeem.site">kazinayeem.site</a> has my contact links.</p>`,
});

// Article 6
articlesPart2.push({
  index: 6,
  file: "jenkins-master-agent-setup-aws-ec2.ts",
  meta: {
    slug: "jenkins-master-agent-setup-aws-ec2",
    title: "Jenkins Master-Agent Setup on AWS EC2",
    seoTitle: "Jenkins Master-Agent Setup on AWS EC2 | Mohammad Ali Nayeem",
    subtitle: "Building a distributed Jenkins lab on EC2 for DIU DevOps coursework and Bornosoft automation experiments",
    description: "Step-by-step Jenkins master-agent architecture on AWS EC2 from Mohammad Ali Nayeem—security groups, SSH agents, pipelines, and student budget tips from Bangladesh.",
    category: "Jenkins",
    tags: ["Jenkins", "AWS", "EC2", "CI/CD", "DevOps"],
    keywords: ["jenkins master agent setup", "jenkins on AWS EC2", "jenkins agent ec2 tutorial", "distributed jenkins build"],
    coverImageAlt: "Jenkins dashboard showing connected EC2 build agents",
    relatedSlugs: ["my-first-cicd-pipeline-github-actions", "my-devops-roadmap-software-engineering-student", "learning-docker-from-scratch"],
    faqs: [
      { question: "Why use Jenkins agents instead of building on the master?", answer: "The master should orchestrate jobs, not compile heavy projects. Agents isolate build environments, scale horizontally, and prevent a runaway job from crashing the controller." },
      { question: "How much does Jenkins on EC2 cost for students?", answer: "A t3.small master plus t3.medium agent running part-time can fit AWS free tier or a few dollars monthly if you stop instances after labs. Always set billing alarms." },
      { question: "SSH agent vs JNLP agent?", answer: "SSH agents are simpler for Linux EC2—Jenkins SSHes into the agent and starts worker processes. JNLP is common for Windows or dynamic Kubernetes agents." },
      { question: "Is Jenkins still worth learning with GitHub Actions?", answer: "Yes. Many enterprises run Jenkins on-prem. Understanding masters, agents, plugins, and Groovy pipelines helps you navigate real workplaces—not only greenfield startups." },
    ],
  },
  content: `<p>GitHub Actions solved CI for my Git-hosted side projects, but my <strong>DevOps</strong> course at <strong>Daffodil International University (DIU)</strong> demanded <strong>Jenkins</strong>. Professors wanted us to understand controllers, agents, plugins, and Groovy pipelines—the vocabulary still printed on job descriptions across Dhaka tech parks. I am <strong>Mohammad Ali Nayeem</strong>, Software Engineering student and <strong>Bornosoft</strong> founder, and this is how I built a Jenkins <strong>master-agent</strong> setup on <strong>AWS EC2</strong> without melting my student budget.</p>

<h2>Architecture Overview</h2>

<p>Distributed Jenkins splits responsibilities:</p>

<ul>
<li><strong>Master (controller):</strong> UI, job scheduling, credentials, pipeline orchestration.</li>
<li><strong>Agent (node):</strong> Executes build steps—compile, test, Docker build, deploy scripts.</li>
</ul>

<table>
<thead><tr><th>Instance</th><th>Role</th><th>Instance Type</th><th>Storage</th></tr></thead>
<tbody>
<tr><td>jenkins-master</td><td>Controller</td><td>t3.small</td><td>30 GB gp3</td></tr>
<tr><td>jenkins-agent-1</td><td>Linux builder</td><td>t3.medium</td><td>40 GB gp3</td></tr>
</tbody>
</table>

<div class="callout tip"><strong>Tip:</strong> Never run experimental Gradle or Docker builds on the master. One OOM crash during finals week is enough to learn this rule.</div>

<h2>Provisioning EC2 Instances</h2>

<p>I launched both instances in <strong>ap-southeast-1</strong> (Singapore) for reasonable latency from Bangladesh. Ubuntu 22.04 LTS AMI, same VPC, private subnets optional for advanced labs—for learning, public subnets with tight security groups worked.</p>

<h3>Security Group Rules</h3>

<ul>
<li>Master: 8080 from my IP only (Jenkins UI), 22 from my IP (admin SSH).</li>
<li>Agent: 22 from master security group (SSH agent connection).</li>
<li>Outbound: HTTPS for package installs and git clone.</li>
</ul>

<div class="callout warning"><strong>Warning:</strong> Do not expose Jenkins port 8080 to 0.0.0.0/0. Bots will find it within hours. Use VPN, SSM port forwarding, or Nginx with auth if you need remote access.</div>

<h2>Installing Jenkins Master</h2>

<pre><code class="language-bash">sudo apt update &amp;&amp; sudo apt install -y openjdk-17-jdk
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | \\
  sudo tee /usr/share/keyrings/jenkins-keyring.asc &gt; /dev/null
echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \\
  https://pkg.jenkins.io/debian-stable binary/" | \\
  sudo tee /etc/apt/sources.list.d/jenkins.list
sudo apt update &amp;&amp; sudo apt install -y jenkins
sudo systemctl enable jenkins &amp;&amp; sudo systemctl start jenkins</code></pre>

<p>Initial admin password lives in <code>/var/lib/jenkins/secrets/initialAdminPassword</code>. Complete setup wizard, install suggested plugins, create admin user—not anonymous admin on the internet.</p>

<h2>Preparing the Agent EC2</h2>

<p>Agents need build tooling matching your projects:</p>

<pre><code class="language-bash">sudo apt install -y git docker.io nodejs npm
sudo usermod -aG docker ubuntu
# Jenkins SSH user will connect as ubuntu or dedicated jenkins user</code></pre>

<p>Generate SSH key pair on master for agent auth:</p>

<pre><code class="language-bash">sudo -u jenkins ssh-keygen -t ed25519 -f /var/lib/jenkins/.ssh/jenkins_agent -N ""
# Copy public key to agent authorized_keys</code></pre>

<h2>Connecting Agent via SSH</h2>

<ol>
<li>Jenkins UI → Manage Nodes → New Node → Permanent Agent.</li>
<li>Remote root directory: <code>/home/ubuntu/jenkins-agent</code>.</li>
<li>Launch method: Launch agents via SSH.</li>
<li>Host: agent private IP, credentials: SSH username + private key.</li>
<li>Labels: <code>linux docker nodejs</code> for pipeline targeting.</li>
</ol>

<div class="callout note"><strong>Note:</strong> First connection downloads agent.jar automatically. If firewall blocks, check agent security group allows SSH from master SG.</div>

<h2>Sample Declarative Pipeline</h2>

<pre><code class="language-groovy">pipeline {
  agent { label 'linux' }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Install') {
      steps { sh 'npm ci' }
    }
    stage('Test') {
      steps { sh 'npm test' }
    }
    stage('Docker') {
      steps {
        sh 'docker build -t bornosoft-app:\${BUILD_NUMBER} .'
      }
    }
  }
  post {
    always { cleanWs() }
  }
}</code></pre>

<p>Running this on the agent kept master CPU graphs flat during Bornosoft prototype builds.</p>

<h2>Credentials and Plugins</h2>

<ul>
<li><strong>Credentials Binding:</strong> Inject AWS keys or API tokens without echoing in logs.</li>
<li><strong>Pipeline:</strong> Jenkinsfile in repo for versioned CI logic.</li>
<li><strong>Blue Ocean</strong> (optional): Friendlier UI for demos to DIU classmates.</li>
<li><strong>EC2 Plugin</strong> (advanced): Auto-scale agents—save for later when budget allows.</li>
</ul>

<h2>Backup and Recovery</h2>

<p>Jenkins state lives on master disk—jobs, credentials, plugins. I snapshot EBS weekly during active coursework and export job XML before major plugin upgrades. Losing credentials hurts worse than losing build history.</p>

<h2>Comparing to GitHub Actions Mentally</h2>

<table>
<thead><tr><th>Concept</th><th>Jenkins</th><th>GitHub Actions</th></tr></thead>
<tbody>
<tr><td>Controller</td><td>Master EC2</td><td>GitHub-hosted</td></tr>
<tr><td>Agent</td><td>EC2 SSH node</td><td>runs-on ubuntu-latest</td></tr>
<tr><td>Pipeline</td><td>Jenkinsfile Groovy</td><td>workflow YAML</td></tr>
<tr><td>Maintenance</td><td>You patch Java/plugins</td><td>Managed by GitHub</td></tr>
</tbody>
</table>

<p>Understanding both made me dangerous in internship interviews—I could explain trade-offs instead of fanboying one tool.</p>

<h2>Cost Control for Students</h2>

<ul>
<li>Stop agent when not building; master can stay small if only scheduling.</li>
<li>Use Spot instances for agents in advanced labs—with retry logic.</li>
<li>Schedule office hours builds only during demo weeks.</li>
</ul>

<h2>Conclusion</h2>

<p>A <strong>Jenkins master-agent setup on AWS EC2</strong> taught me infrastructure ownership: patching, SSH trust chains, and why enterprises still pay for maintainable CI clusters. GitHub Actions ships faster for Bornosoft today, but Jenkins knowledge decoded legacy client environments and DIU lab rubrics.</p>

<p>Build your two-instance lab, break it, snapshot it, rebuild it—that loop is DevOps. Reach out via <a href="https://kazinayeem.site">kazinayeem.site</a> if your agent shows offline mysteriously; I have debugged that log many times.</p>`,
});

// Article 7
articlesPart2.push({
  index: 7,
  file: "my-devops-roadmap-software-engineering-student.ts",
  meta: {
    slug: "my-devops-roadmap-software-engineering-student",
    title: "My DevOps Roadmap as a Software Engineering Student",
    seoTitle: "My DevOps Roadmap as a Software Engineering Student | Mohammad Ali Nayeem",
    subtitle: "A semester-by-semester plan for DIU students who want to ship reliably—not just pass exams",
    description: "Mohammad Ali Nayeem shares his DevOps learning roadmap from DIU coursework to Bornosoft production—Linux, Docker, CI/CD, cloud, and career advice for Bangladeshi students.",
    category: "DevOps",
    tags: ["DevOps", "Career", "DIU", "Roadmap", "AWS", "CI/CD"],
    keywords: ["devops roadmap student", "software engineering devops path", "learn devops bangladesh", "devops skills for students"],
    coverImageAlt: "DevOps roadmap diagram with Linux Docker CI/CD and cloud milestones",
    relatedSlugs: ["my-first-cicd-pipeline-github-actions", "jenkins-master-agent-setup-aws-ec2", "learning-docker-from-scratch"],
    faqs: [
      { question: "When should a student start learning DevOps?", answer: "After you can build and deploy one app manually—ideally second year once Git, basic Linux, and a backend framework click. DevOps amplifies coding skills; it does not replace them." },
      { question: "Do I need certifications as a student?", answer: "Certs help for structured learning and HR filters but are not mandatory. Projects on your portfolio—CI pipelines, Dockerized apps, IaC repos—often convince technical interviewers more than badges alone." },
      { question: "What is the minimum viable DevOps stack?", answer: "Git, Linux CLI, Docker, one CI platform (GitHub Actions or Jenkins), and one cloud provider basics (AWS EC2 + IAM). Add Kubernetes after you ship containerized apps repeatedly." },
      { question: "Can DevOps help Bornosoft or freelance work?", answer: "Absolutely. Clients pay for reliability and fast delivery. Automating deploys and monitoring reduced my support burden and made retainers sustainable alongside DIU classes." },
    ],
  },
  content: `<p>DevOps was not a single course on my transcript at <strong>Daffodil International University (DIU)</strong>—it was a thread woven through labs, Bornosoft client deadlines, and 3 AM incident messages when a demo server ran out of disk. I am <strong>Mohammad Ali Nayeem</strong>, Software Engineering student and founder of <strong>Bornosoft</strong> in Dhaka, Bangladesh. This <strong>DevOps roadmap</strong> is the sequence I would repeat if I started again today, optimized for students with limited money and unlimited curiosity.</p>

<h2>What DevOps Means to Me</h2>

<p>DevOps is not a job title you collect after buying a hoodie. It is the practice of shortening the path from idea to working software while keeping systems observable and recoverable. Culture matters—blameless postmortems, code review, documentation—but students feel DevOps first through tools: terminals, containers, pipelines, clouds.</p>

<div class="callout tip"><strong>Tip:</strong> Treat every assignment as deployable. A servlet homework on Tomcat is an excuse to write a Dockerfile and push to GitHub.</div>

<h2>Semester-by-Semester Roadmap</h2>

<h3>Year 1: Foundations</h3>

<ul>
<li><strong>Git mastery:</strong> branches, rebase vs merge, conventional commits.</li>
<li><strong>Linux CLI:</strong> ssh, systemd, permissions, grep, awk basics.</li>
<li><strong>Networking literacy:</strong> DNS, HTTP, TLS, ports—debug with curl and dig.</li>
<li><strong>One deploy:</strong> Static site on Nginx or Next.js on Vercel free tier.</li>
</ul>

<h3>Year 2: Containers and CI</h3>

<ul>
<li><strong>Docker:</strong> images, volumes, compose for multi-container apps.</li>
<li><strong>CI:</strong> GitHub Actions on personal repos; fail builds on lint errors.</li>
<li><strong>Cloud intro:</strong> AWS EC2, S3, IAM users vs roles—hands-on labs only.</li>
<li><strong>Monitoring basics:</strong> CloudWatch, uptime checks, log tailing.</li>
</ul>

<h3>Year 3: Orchestration and IaC</h3>

<ul>
<li><strong>Kubernetes fundamentals:</strong> minikube/kind, Deployments, Services.</li>
<li><strong>Terraform or CloudFormation:</strong> reproducible infra for DIU projects.</li>
<li><strong>Jenkins or advanced Actions:</strong> multi-stage pipelines, secrets patterns.</li>
<li><strong>Security:</strong> OWASP top ten, dependency scanning, least privilege IAM.</li>
</ul>

<h3>Year 4: Production Mindset</h3>

<ul>
<li><strong>SRE concepts:</strong> SLIs, SLOs, error budgets—even for small apps.</li>
<li><strong>Cost optimization:</strong> right-sizing, reserved instances, cleanup automation.</li>
<li><strong>On-call simulation:</strong> break staging intentionally, write runbooks.</li>
<li><strong>Portfolio narratives:</strong> blog posts explaining incidents you fixed.</li>
</ul>

<table>
<thead><tr><th>Skill</th><th>DIU Touchpoint</th><th>Bornosoft Application</th></tr></thead>
<tbody>
<tr><td>Docker</td><td>Lab project</td><td>Client API packaging</td></tr>
<tr><td>GitHub Actions</td><td>Personal portfolio</td><td>Automated releases</td></tr>
<tr><td>AWS EC2</td><td>Cloud computing elective</td><td>Staging servers</td></tr>
<tr><td>Kubernetes</td><td>Advanced DevOps module</td><td>Future multi-tenant SaaS</td></tr>
</tbody>
</table>

<h2>Projects That Proved Skills</h2>

<p>Roadmaps without projects are wish lists. These shipped:</p>

<ol>
<li><strong>Portfolio CI/CD:</strong> Lint, test, deploy Next.js to EC2 on merge.</li>
<li><strong>Bornosoft webhook worker:</strong> Containerized Go service with health checks.</li>
<li><strong>Jenkins lab:</strong> Master-agent EC2 setup documented for classmates.</li>
<li><strong>Terraform repo:</strong> VPC + EC2 + security groups reproducible in ten minutes.</li>
</ol>

<div class="callout note"><strong>Note:</strong> Write blog posts for each project. Recruiters in Dhaka and remote roles read explanations more than star counts alone.</div>

<h2>Tools I Actually Use Weekly</h2>

<ul>
<li>VS Code / Cursor, GitHub, Docker Desktop or colima on Mac</li>
<li>GitHub Actions primary; Jenkins for coursework parity</li>
<li>AWS console + CLI; Terraform for infra</li>
<li>Grafana Cloud free tier experiments; structured logging in JSON</li>
</ul>

<div class="callout warning"><strong>Warning:</strong> Tool tourism—installing everything day one—creates fatigue. Depth on Docker + one CI beats shallow clicks on twelve platforms.</div>

<h2>Balancing DIU Coursework and DevOps Depth</h2>

<p>Time is the real constraint. Rules that kept me sane:</p>

<ul>
<li>Align DevOps experiments with current classes—OS course → Linux, Web → deploy labs.</li>
<li>Batch infra changes on weekends; weekdays for algorithms and theory.</li>
<li>Study groups at DIU—teaching Jenkins SSH agents solidified my understanding.</li>
<li>Say no to over-scoping client infra until billing is clear.</li>
</ul>

<h2>Career Outcomes in Bangladesh</h2>

<p>Local startups and outsourcing firms value engineers who deploy safely. Remote roles list Docker, AWS, and CI/CD as baseline. DevOps skills complemented my Bornosoft founder story—investors and clients trust founders who can operate what they ship.</p>

<h2>Resources That Helped</h2>

<ul>
<li>KodeKloud and free Kubernetes courses (student discounts appear seasonally)</li>
<li>AWS Skill Builder labs</li>
<li>Official Docker and GitHub Actions docs—read primary sources</li>
<li>DIU faculty office hours for cloud security questions</li>
</ul>

<h2>Conclusion</h2>

<p>My <strong>DevOps roadmap as a Software Engineering student</strong> was iterative—not a eighteen-month bootcamp brochure. Linux confidence, container habits, automated pipelines, and cloud literacy stacked until Bornosoft deploys felt routine instead of heroic.</p>

<p>Start where you are. If you have Git and a Node app, add Docker this week, CI next week, and EC2 the week after. Document the journey on your portfolio—future interview you will need those stories.</p>

<p>Roadmap feedback welcome at <a href="https://kazinayeem.site">kazinayeem.site</a>.</p>`,
});

// Article 8
articlesPart2.push({
  index: 8,
  file: "learning-docker-from-scratch.ts",
  meta: {
    slug: "learning-docker-from-scratch",
    title: "Learning Docker from Scratch",
    seoTitle: "Learning Docker from Scratch | Mohammad Ali Nayeem",
    subtitle: "From 'it works on my machine' to reproducible containers—a DIU student's Docker learning log",
    description: "Mohammad Ali Nayeem teaches Docker fundamentals from scratch—images, containers, Dockerfile, Compose, and deployment lessons from Bornosoft and DIU labs in Bangladesh.",
    category: "Docker",
    tags: ["Docker", "Containers", "DevOps", "Tutorial", "AWS"],
    keywords: ["learn docker from scratch", "docker tutorial beginner student", "dockerfile best practices", "docker compose tutorial"],
    coverImageAlt: "Terminal showing docker build and docker run commands",
    relatedSlugs: ["ecs-vs-eks-vs-ecr-explained-beginners", "kubernetes-explained-simply", "deploying-nextjs-aws-ec2-nginx-pm2"],
    faqs: [
      { question: "Do I need Docker before Kubernetes?", answer: "Yes. Kubernetes schedules containers; if images, layers, and networking confuse you, kubectl will feel like magic incantations. Master Docker first—usually two to four focused weeks." },
      { question: "Docker Desktop vs Linux engine on EC2?", answer: "Develop on Docker Desktop or colima locally for speed. Production-like practice happens on Linux EC2 where rootless and cgroup behavior match servers." },
      { question: "What is the first project to dockerize?", answer: "A simple REST API with one database. Practice multi-container Compose before microservices fantasies." },
      { question: "How big should Docker images be?", answer: "Smaller is faster to push and safer to scan. Use multi-stage builds, slim base images like alpine or distroless, and .dockerignore aggressively." },
    ],
  },
  content: `<p>I used to send Bornosoft clients a README with seventeen setup steps—Node version, Postgres extensions, phantom environment variables—and still get Slack messages saying it does not run. <strong>Docker</strong> ended that ritual. I am <strong>Mohammad Ali Nayeem</strong>, <strong>Software Engineering student at DIU</strong> and founder of <strong>Bornosoft</strong> in Bangladesh, and this is how I learned containers from zero without a corporate mentor.</p>

<h2>Why Containers Clicked</h2>

<p>Containers package your app plus dependencies into an image that runs the same on my Dhaka laptop, a classmate's Windows machine, and an AWS EC2 instance. Not virtualization of full OS kernels—shared host kernel, isolated processes—but the mental model of shipping a box instead of a wish list.</p>

<div class="callout tip"><strong>Tip:</strong> Docker solves environment consistency first. Orchestration (Kubernetes) solves scaling second. Order matters.</div>

<h2>Core Vocabulary</h2>

<table>
<thead><tr><th>Term</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td>Image</td><td>Read-only template of filesystem + metadata</td></tr>
<tr><td>Container</td><td>Running instance of an image</td></tr>
<tr><td>Dockerfile</td><td>Recipe to build an image</td></tr>
<tr><td>Registry</td><td>Storage for images (Docker Hub, ECR)</td></tr>
<tr><td>Volume</td><td>Persistent data outside container lifecycle</td></tr>
</tbody>
</table>

<h2>First Commands I Memorized</h2>

<pre><code class="language-bash">docker pull node:20-alpine
docker run -it --rm node:20-alpine node -v
docker ps
docker images
docker logs &lt;container_id&gt;
docker exec -it &lt;container_id&gt; sh</code></pre>

<p>Running Alpine Node interactively demystified layers—each command in Dockerfile adds a layer you can inspect with <code>docker history</code>.</p>

<h2>Writing My First Dockerfile</h2>

<p>I dockerized a small Express API for a DIU web engineering assignment:</p>

<pre><code class="language-dockerfile">FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
USER node
CMD ["node", "server.js"]</code></pre>

<div class="callout note"><strong>Note:</strong> Multi-stage builds separate dependency install from runtime. Final image excludes devDependencies and build tools.</div>

<h2>.dockerignore Matters</h2>

<pre><code class="language-text">node_modules
.git
.env
dist
*.md
Dockerfile*</code></pre>

<p>Without ignore rules, Docker sent gigabytes of local junk to the daemon, slowing every build on hostel Wi-Fi.</p>

<h2>Docker Compose for Multi-Container Apps</h2>

<p>API plus Postgres plus Redis became one command:</p>

<pre><code class="language-yaml">services:
  api:
    build: .
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgres://app:secret@db:5432/app
    depends_on: [db]
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: app
    volumes: [pgdata:/var/lib/postgresql/data]
volumes:
  pgdata:</code></pre>

<p><code>docker compose up --build</code> became demo day ritual for Bornosoft prototypes.</p>

<div class="callout warning"><strong>Warning:</strong> <code>depends_on</code> does not wait for database readiness. Use healthchecks or retry logic in app startup for production-minded labs.</div>

<h2>Networking Basics</h2>

<ul>
<li>Default bridge network isolates compose services by project name.</li>
<li>Service DNS names match service keys—connect to <code>db</code> not localhost from api container.</li>
<li>Published ports (<code>3000:3000</code>) expose to host—minimize attack surface on servers.</li>
</ul>

<h2>Pushing to AWS ECR</h2>

<p>Local images became deployable artifacts once tagged and pushed—bridging to ECS and EC2 deploy pipelines I documented in other posts.</p>

<pre><code class="language-bash">docker tag bornosoft-api:latest &lt;account&gt;.dkr.ecr.region.amazonaws.com/bornosoft-api:v1
docker push &lt;account&gt;.dkr.ecr.region.amazonaws.com/bornosoft-api:v1</code></pre>

<h2>Common Student Mistakes</h2>

<ol>
<li>Running containers as root in production images.</li>
<li>Baking secrets into images instead of env vars at runtime.</li>
<li>Never pruning—<code>docker system prune</code> saved my laptop disk weekly.</li>
<li>Treating Compose as production orchestration without health checks or resource limits.</li>
</ol>

<h2>Practice Projects</h2>

<ul>
<li>Dockerize portfolio Next.js app with standalone output.</li>
<li>Run Jenkins agent container mounting Docker socket (careful with security).</li>
<li>Package YOLO inference script with pinned Python dependencies.</li>
</ul>

<h2>Conclusion</h2>

<p><strong>Learning Docker from scratch</strong> upgraded me from developer to someone who can hand ops a single artifact. For DIU students and Bangladeshi founders, that skill pays rent—fewer deploy fires, faster client onboarding, cleaner path to Kubernetes later.</p>

<p>Build one Dockerfile today. Break it tomorrow. Fix it until <code>docker compose up</code> is boring—that is when you are ready for the cloud.</p>

<p>Docker questions? <a href="https://kazinayeem.site">kazinayeem.site</a>.</p>`,
});

// Article 9
articlesPart2.push({
  index: 9,
  file: "kubernetes-explained-simply.ts",
  meta: {
    slug: "kubernetes-explained-simply",
    title: "Kubernetes Explained Simply",
    seoTitle: "Kubernetes Explained Simply | Mohammad Ali Nayeem",
    subtitle: "Pods, Deployments, and Services without the overwhelm—a DIU student's plain-language guide",
    description: "Mohammad Ali Nayeem explains Kubernetes simply for beginners—core objects, local practice with minikube, and when Bornosoft apps actually need K8s.",
    category: "Kubernetes",
    tags: ["Kubernetes", "DevOps", "Docker", "Cloud", "Tutorial"],
    keywords: ["kubernetes explained simply", "kubernetes beginner guide", "pods deployments services", "learn kubernetes student"],
    coverImageAlt: "Kubernetes cluster diagram with pods services and ingress",
    relatedSlugs: ["ecs-vs-eks-vs-ecr-explained-beginners", "learning-docker-from-scratch", "my-devops-roadmap-software-engineering-student"],
    faqs: [
      { question: "What problem does Kubernetes solve?", answer: "It automates running many containers across machines—scheduling, restarting failed apps, scaling replicas, rolling updates, and service discovery—when docker-compose on one server is no longer enough." },
      { question: "Can I learn Kubernetes on a laptop?", answer: "Yes. minikube, kind, or k3d run small clusters locally. Complete Docker fundamentals first so Pods feel like familiar containers in groups." },
      { question: "Is Kubernetes required for startups?", answer: "Often no at MVP stage. Bornosoft used Docker Compose and ECS before K8s. Adopt when team size, traffic, or reliability needs justify operational complexity." },
      { question: "EKS vs self-managed Kubernetes?", answer: "EKS outsources control plane management on AWS. Self-managed teaches more but costs time. Students should learn concepts locally, then try EKS with billing alarms." },
    ],
  },
  content: `<p>Kubernetes sounded like enterprise wallpaper until my <strong>DevOps</strong> elective at <strong>DIU</strong> required a rolling update demo. Suddenly I needed vocabulary beyond docker run. I am <strong>Mohammad Ali Nayeem</strong>, Software Engineering student and <strong>Bornosoft</strong> founder from Bangladesh, and this is <strong>Kubernetes explained simply</strong>—the explanation I wanted before reading fifty-page manifests.</p>

<h2>The Elevator Pitch</h2>

<p>Kubernetes (K8s) is a container orchestrator. You declare desired state—I want three copies of this API image—and the cluster continuously reconciles reality to match. If a node dies, workloads reschedule. If traffic spikes, you scale replicas (with metrics wired up).</p>

<div class="callout tip"><strong>Tip:</strong> Think of Kubernetes as an operating system for a data center of containers, not a replacement for learning Linux or Docker.</div>

<h2>Core Objects You Must Know</h2>

<h3>Pod</h3>

<p>Smallest deployable unit—one or more containers sharing network and storage. Usually one container per pod for beginners.</p>

<h3>Deployment</h3>

<p>Manages ReplicaSets to run N pod copies, handles rolling updates and rollbacks.</p>

<h3>Service</h3>

<p>Stable network endpoint fronting pods whose IPs change. Types: ClusterIP (internal), NodePort (lab access), LoadBalancer (cloud LB).</p>

<h3>Ingress</h3>

<p>HTTP routing layer—hostnames and paths to services, often with TLS termination.</p>

<table>
<thead><tr><th>Object</th><th>Analogy</th><th>You create when</th></tr></thead>
<tbody>
<tr><td>Pod</td><td>One running app instance</td><td>Rarely directly—use Deployment</td></tr>
<tr><td>Deployment</td><td>Manager hiring N interns</td><td>Always for stateless apps</td></tr>
<tr><td>Service</td><td>Reception desk phone number</td><td>Other pods need to call you</td></tr>
<tr><td>Ingress</td><td>Building lobby directory</td><td>External users need HTTPS routes</td></tr>
</tbody>
</table>

<h2>Minimal Deployment Example</h2>

<pre><code class="language-yaml">apiVersion: apps/v1
kind: Deployment
metadata:
  name: bornosoft-api
spec:
  replicas: 2
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
          image: bornosoft/api:1.0.0
          ports:
            - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: bornosoft-api
spec:
  selector:
    app: bornosoft-api
  ports:
    - port: 80
      targetPort: 8080
  type: ClusterIP</code></pre>

<p>Apply with <code>kubectl apply -f deploy.yaml</code>, inspect with <code>kubectl get pods,svc</code>.</p>

<div class="callout note"><strong>Note:</strong> Image must be pullable by cluster nodes—push to Docker Hub or ECR and reference full URI in manifests.</div>

<h2>Local Practice Setup</h2>

<ol>
<li>Install kubectl and minikube (or kind on Linux labs).</li>
<li><code>minikube start --driver=docker</code></li>
<li>Deploy sample app, break a pod, watch it respawn.</li>
<li><code>minikube service</code> to hit NodePort during demos.</li>
</ol>

<h2>Rolling Updates and Rollbacks</h2>

<pre><code class="language-bash">kubectl set image deployment/bornosoft-api api=bornosoft/api:1.1.0
kubectl rollout status deployment/bornosoft-api
kubectl rollout undo deployment/bornosoft-api</code></pre>

<p>This trilogy impressed DIU lab evaluators more than slides about blue-green theory alone.</p>

<div class="callout warning"><strong>Warning:</strong> Changing image to <code>:latest</code> without version tags makes rollbacks guesswork. Tag semantically or by git SHA.</div>

<h2>ConfigMaps and Secrets</h2>

<p>Externalize configuration from images:</p>

<ul>
<li><strong>ConfigMap:</strong> Non-sensitive key-value or file bundles.</li>
<li><strong>Secret:</strong> Base64-encoded sensitive values—still encrypt at rest in production clusters.</li>
</ul>

<p>Bornosoft staging uses Secrets for database URLs injected as env vars—never committed to Git.</p>

<h2>When Not to Use Kubernetes</h2>

<ul>
<li>Single Next.js marketing site with zero custom backend.</li>
<li>Class deadline in 48 hours—ship Compose or PaaS first.</li>
<li>Team of one without time to learn debugging <code>CrashLoopBackOff</code>.</li>
</ul>

<h2>Kubernetes vs ECS (Quick)</h2>

<p>Both run containers. Kubernetes is portable and ecosystem-rich; ECS is AWS-native and simpler for small AWS-only fleets. I learned both to speak fluently in interviews and client calls.</p>

<h2>Study Resources</h2>

<ul>
<li>Official Kubernetes docs interactive tutorials</li>
<li>Killercoda free scenarios</li>
<li>DIU lab partners for study accountability</li>
</ul>

<h2>Conclusion</h2>

<p><strong>Kubernetes explained simply</strong> is still complex operationally—but the mental model is approachable. Pods run containers, Deployments keep counts, Services route traffic, Ingress faces users. Practice locally until manifests feel like Docker Compose with superpowers.</p>

<p>Graduate to EKS when Bornosoft-scale problems need them, not when Hacker News guilt trips you. Message me via <a href="https://kazinayeem.site">kazinayeem.site</a> with kubectl mysteries.</p>`,
});

// Article 10
articlesPart2.push({
  index: 10,
  file: "deploying-nextjs-aws-ec2-nginx-pm2.ts",
  meta: {
    slug: "deploying-nextjs-aws-ec2-nginx-pm2",
    title: "Deploying Next.js on AWS EC2 with Nginx and PM2",
    seoTitle: "Deploying Next.js on AWS EC2 with Nginx and PM2 | Mohammad Ali Nayeem",
    subtitle: "Production-minded deployment for a student portfolio and Bornosoft apps without managed platform fees",
    description: "Mohammad Ali Nayeem documents deploying Next.js on AWS EC2 using Nginx reverse proxy and PM2 process manager—SSL, systemd, and lessons from Bangladesh.",
    category: "Next.js",
    tags: ["Next.js", "AWS", "EC2", "Nginx", "PM2", "Deployment"],
    keywords: ["deploy nextjs aws ec2", "nextjs nginx pm2 tutorial", "nextjs production deployment", "host nextjs on ec2"],
    coverImageAlt: "Server architecture diagram Next.js Nginx PM2 on EC2",
    relatedSlugs: ["my-first-cicd-pipeline-github-actions", "creating-portfolio-ranks-google", "learning-docker-from-scratch"],
    faqs: [
      { question: "Why EC2 instead of Vercel for Next.js?", answer: "Vercel is excellent for many apps. EC2 teaches server ownership, fits clients wanting AWS-only stacks, and pairs with existing Bornosoft infra when avoiding per-seat platform costs at small scale." },
      { question: "PM2 vs systemd for Next.js?", answer: "PM2 offers cluster mode and easy log tailing for Node processes. systemd can manage the same with Restart=always. I use PM2 for quick iteration and systemd unit files on some production boxes." },
      { question: "Does Next.js standalone output help on EC2?", answer: "Yes. Enable output: 'standalone' in next.config to shrink deploy artifacts and speed rsync or CI uploads." },
      { question: "How do I add HTTPS?", answer: "Use Certbot with Nginx on Ubuntu for Let's Encrypt certificates. Renewals via cron or systemd timer—document the process in your runbook." },
    ],
  },
  content: `<p>My portfolio and early <strong>Bornosoft</strong> dashboards needed a home that felt like production—not localhost:3000 on demo day. <strong>Vercel</strong> is fantastic, but I wanted to master <strong>AWS EC2</strong>, <strong>Nginx</strong>, and <strong>PM2</strong> the way many Dhaka agencies deploy client apps. I am <strong>Mohammad Ali Nayeem</strong>, <strong>DIU Software Engineering</strong> student, and this is my field-tested guide to <strong>deploying Next.js on EC2</strong>.</p>

<h2>Architecture</h2>

<ul>
<li><strong>EC2 Ubuntu 22.04</strong> — t3.small for portfolio traffic.</li>
<li><strong>PM2</strong> — Keeps <code>next start</code> alive, restarts on crash.</li>
<li><strong>Nginx</strong> — Reverse proxy, TLS termination, gzip, static caching headers.</li>
<li><strong>Route 53 + Let's Encrypt</strong> — Domain and HTTPS.</li>
</ul>

<table>
<thead><tr><th>Layer</th><th>Port</th><th>Role</th></tr></thead>
<tbody>
<tr><td>Internet</td><td>443</td><td>HTTPS to Nginx</td></tr>
<tr><td>Nginx</td><td>proxy to 3000</td><td>TLS, headers, rate limits optional</td></tr>
<tr><td>Next.js (PM2)</td><td>3000</td><td>App server</td></tr>
</tbody>
</table>

<div class="callout tip"><strong>Tip:</strong> Bind Next.js to 127.0.0.1:3000 so only Nginx faces the public internet.</div>

<h2>Build Next.js for Production</h2>

<pre><code class="language-javascript">// next.config.mjs
const nextConfig = {
  output: 'standalone',
};
export default nextConfig;</code></pre>

<pre><code class="language-bash">npm ci
npm run build
# standalone folder: .next/standalone + static assets</code></pre>

<p>Standalone output reduces server disk footprint—important on small EBS volumes.</p>

<h2>Server Bootstrap</h2>

<pre><code class="language-bash">sudo apt update
sudo apt install -y nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2</code></pre>

<p>Create deploy user, directory <code>/var/www/kazinayeem</code>, rsync or CI scp artifacts.</p>

<h2>PM2 Ecosystem File</h2>

<pre><code class="language-javascript">module.exports = {
  apps: [{
    name: 'portfolio',
    cwd: '/var/www/kazinayeem',
    script: 'server.js',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
  }],
};</code></pre>

<pre><code class="language-bash">pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd</code></pre>

<div class="callout note"><strong>Note:</strong> For standalone builds, <code>server.js</code> lives inside standalone output—copy <code>.next/static</code> and <code>public</code> per Next.js docs.</div>

<h2>Nginx Reverse Proxy</h2>

<pre><code class="language-nginx">server {
    listen 80;
    server_name kazinayeem.site;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}</code></pre>

<p>Enable site, <code>sudo nginx -t</code>, reload. Certbot adds TLS listener after HTTP validates domain.</p>

<div class="callout warning"><strong>Warning:</strong> Set <code>server_tokens off;</code> and keep Nginx patched. Shodan scans EC2 constantly.</div>

<h2>Environment Variables</h2>

<p>Store secrets in <code>/var/www/kazinayeem/.env</code> readable only by deploy user—not in Git. PM2 can load via <code>env_file</code> or export before start. Rotate keys if accidentally logged during DIU pair debugging sessions.</p>

<h2>CI/CD Integration</h2>

<p>GitHub Actions rsyncs build artifacts over SSH on tag push—pipeline detailed in my CI/CD article. Zero-downtime purists add second instance and load balancer; portfolio solo dev accepts brief restarts.</p>

<h2>Monitoring Basics</h2>

<ul>
<li>PM2 <code>pm2 logs</code> and <code>pm2 monit</code></li>
<li>Nginx access/error logs in <code>/var/log/nginx</code></li>
<li>CloudWatch agent optional for disk and CPU alarms</li>
<li>UptimeRobot external ping—free tier enough for portfolio</li>
</ul>

<h2>Troubleshooting Hits</h2>

<ol>
<li><strong>502 Bad Gateway</strong> — Next not running or wrong proxy_pass port.</li>
<li><strong>Static assets 404</strong> — Forgot copying <code>.next/static</code> in standalone deploy.</li>
<li><strong>Memory OOM</strong> — t3.micro too small; upgrade or enable swap cautiously.</li>
</ol>

<h2>Conclusion</h2>

<p><strong>Deploying Next.js on AWS EC2 with Nginx and PM2</strong> taught me more than clicking deploy on a PaaS—logs, TLS, process supervision, and cost trade-offs Bornosoft clients ask about. For DIU students building credible portfolios, owning a small production server is a resume story that survives viva questions.</p>

<p>Ship your site, point your domain, write the runbook. Details at <a href="https://kazinayeem.site">kazinayeem.site</a>.</p>`,
});

// Article 11
articlesPart2.push({
  index: 11,
  file: "why-i-chose-golang-backend-development.ts",
  meta: {
    slug: "why-i-chose-golang-backend-development",
    title: "Why I Chose Golang for Backend Development",
    seoTitle: "Why I Chose Golang for Backend Development | Mohammad Ali Nayeem",
    subtitle: "Performance, simplicity, and deployability—reasons a Bornosoft founder standardizes on Go for services",
    description: "Mohammad Ali Nayeem explains why he chose Golang for backend development at Bornosoft—concurrency, static binaries, hiring, and lessons from DIU systems courses.",
    category: "Golang",
    tags: ["Golang", "Backend", "Bornosoft", "Software Engineering", "API"],
    keywords: ["why golang backend", "golang for startups", "go vs node backend", "golang bangladesh developer"],
    coverImageAlt: "Go gopher mascot beside API architecture diagram",
    relatedSlugs: ["from-nodejs-to-golang-learning-journey", "my-first-cicd-pipeline-github-actions", "lessons-learned-building-saas-products"],
    faqs: [
      { question: "Is Go better than Node.js for APIs?", answer: "Neither is universally better. Go excels at CPU-bound work, predictable memory, and single-binary deploys. Node excels at rapid full-stack iteration and rich npm libraries. Bornosoft uses both intentionally." },
      { question: "Is Go good for SaaS backends?", answer: "Yes. Many infrastructure and SaaS companies use Go for core services. Pair with Postgres, Redis, and gRPC or REST as needed." },
      { question: "How hard is Go for DIU students?", answer: "Syntax is small—learnable in days. Idiomatic patterns (interfaces, error handling, project layout) take weeks of practice on real services." },
      { question: "Does Bornosoft hire Go developers?", answer: "We value engineers who learn quickly. Go experience helps for performance-sensitive services; strong fundamentals matter more than language religion." },
    ],
  },
  content: `<p>When <strong>Bornosoft</strong> graduated from prototypes to services clients depended on nightly, I faced a backend choice that would outlive semester projects. I picked <strong>Golang</strong>. I am <strong>Mohammad Ali Nayeem</strong>, <strong>Software Engineering student at DIU</strong> in Dhaka, Bangladesh—and this article explains <strong>why I chose Go for backend development</strong> without pretending other stacks failed.</p>

<h2>Context: What Bornosoft Needed</h2>

<p>Our workloads mixed public REST APIs, webhook processors, PDF batch jobs, and internal CLIs for DevOps homework turned production scripts. Requirements recurring across clients:</p>

<ul>
<li>Predictable latency under burst traffic.</li>
<li>Small deploy artifacts on modest EC2 instances.</li>
<li>Clear code review for interns from DIU.</li>
<li>Long-running processes without mysterious memory climbs.</li>
</ul>

<div class="callout tip"><strong>Tip:</strong> Choose backend language per service boundary, not once for eternity. Monorepos can host Go workers beside Next.js frontends.</div>

<h2>Reason 1: Concurrency Without Drama</h2>

<p>Go's goroutines and channels model concurrent IO—payment webhooks, email queues, file transforms—without callback pyramids. A worker pool in Go reads like the diagram on the whiteboard:</p>

<pre><code class="language-go">for i := 0; i &lt; workerCount; i++ {
    go func() {
        for job := range jobs {
            process(job)
        }
    }()
}</code></pre>

<p>Systems courses at DIU finally mapped to code I shipped the same week.</p>

<h2>Reason 2: Static Binaries Simplify Deploys</h2>

<p><code>GOOS=linux GOARCH=amd64 go build -o api ./cmd/api</code> produces one file I scp to Ubuntu, systemd restart, done. No node_modules sync rituals on 2G hostel connections.</p>

<table>
<thead><tr><th>Deploy aspect</th><th>Go service</th><th>Typical Node API</th></tr></thead>
<tbody>
<tr><td>Artifact</td><td>Single binary</td><td>node_modules + source</td></tr>
<tr><td>Cold start on t3.small</td><td>Fast</td><td>Acceptable with tuning</td></tr>
<tr><td>Docker image size</td><td>Small with distroless</td><td>Larger base layers</td></tr>
</tbody>
</table>

<h2>Reason 3: Explicit Error Handling</h2>

<p>Verbose <code>if err != nil</code> blocks force error paths visible in review—valuable when Bangladeshi clients trust Bornosoft with operational data. Panics are for truly exceptional cases, not control flow.</p>

<div class="callout note"><strong>Note:</strong> Go 1.13+ error wrapping with <code>%w</code> preserves context for structured logging downstream.</div>

<h2>Reason 4: Standard Library Strength</h2>

<p>HTTP servers, JSON, testing, and tooling ship in the standard library. Fewer dependency surprises than ecosystems where left-pad moments still haunt folklore—though we still vet modules for security.</p>

<h2>Reason 5: Industry Signal for Hiring</h2>

<p>Go appears in job posts from fintech, platform, and DevOps-heavy teams globally and in Dhaka remote markets. Learning Go opened conversations in interviews beyond CRUD in a single framework.</p>

<h2>What Go Does Not Solve</h2>

<ul>
<li>Frontend—Next.js still powers our UIs.</li>
<li>Rapid throwaway hackathon UI—Node wins hour one.</li>
<li>Heavy ML training—Python owns that lane in Bornosoft.</li>
<li>Magic scaling—bad schema design hurts in any language.</li>
</ul>

<div class="callout warning"><strong>Warning:</strong> Do not rewrite working Node services to Go without metrics proving pain. Premature rewrites killed weekend plans more than once.</div>

<h2>Bornosoft Service Layout</h2>

<pre><code class="language-text">cmd/
  api/main.go
  worker/main.go
internal/
  handlers/
  repository/
  domain/
pkg/
  logger/
go.mod</code></pre>

<p>Standard layout helps DIU interns navigate repos on day one—README points to <code>cmd/api</code> entry.</p>

<h2>Testing Culture</h2>

<p>Table-driven tests encourage edge case coverage before Bangladesh payment gateway quirks hit production Friday night:</p>

<pre><code class="language-go">func TestCalculateFee(t *testing.T) {
    tests := []struct{
        name string
        amount int64
        want int64
    }{
        {"zero", 0, 0},
        {"standard", 10000, 150},
    }
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got := CalculateFee(tt.amount)
            if got != tt.want {
                t.Fatalf("got %d want %d", got, tt.want)
            }
        })
    }
}</code></pre>

<h2>When I Still Reach for Node.js</h2>

<p>Realtime dashboards with heavy SSR, Prisma migrations tied to Next routes, and client demos where speed beats perf—all remain JavaScript territory. Bilingual architecture is a feature.</p>

<h2>Advice for DIU Students Choosing Go</h2>

<ol>
<li>Complete A Tour of Go and one small HTTP service.</li>
<li>Read <em>Effective Go</em> and code review two open source Go repos.</li>
<li>Benchmark against your Node prototype—numbers beat vibes.</li>
<li>Contribute a CLI tool to your portfolio—hire managers love usable utilities.</li>
</ol>

<h2>Conclusion</h2>

<p>I chose <strong>Golang for backend development</strong> at Bornosoft because concurrency clarity, deploy simplicity, and operational honesty matched our client reality from Dhaka. Go did not replace curiosity about other stacks—it channeled energy into services that had to stay up when I was in class.</p>

<p>Evaluate your bottlenecks, prototype in a week, measure, then commit. Debate me at <a href="https://kazinayeem.site">kazinayeem.site</a> with your benchmark charts.</p>`,
});

// Article 12
articlesPart2.push({
  index: 12,
  file: "lessons-learned-building-saas-products.ts",
  meta: {
    slug: "lessons-learned-building-saas-products",
    title: "Lessons Learned Building SaaS Products",
    seoTitle: "Lessons Learned Building SaaS Products | Mohammad Ali Nayeem",
    subtitle: "Hard-won product, technical, and founder lessons from Bornosoft while studying at DIU",
    description: "Mohammad Ali Nayeem shares lessons learned building SaaS products at Bornosoft—MVP scope, billing, support, tech debt, and student founder realities in Bangladesh.",
    category: "Software Engineering",
    tags: ["SaaS", "Startup", "Bornosoft", "Software Engineering", "Product"],
    keywords: ["building saas lessons", "student founder saas", "saas mvp tips", "bornosoft startup bangladesh"],
    coverImageAlt: "SaaS dashboard sketch with metrics and user feedback sticky notes",
    relatedSlugs: ["why-i-chose-golang-backend-development", "my-devops-roadmap-software-engineering-student", "creating-portfolio-ranks-google"],
    faqs: [
      { question: "Can a DIU student realistically build SaaS?", answer: "Yes, if scope stays small—one niche, one painful workflow, one pricing experiment. Bornosoft started as focused tools for local businesses, not a global platform day one." },
      { question: "What tech stack for student SaaS?", answer: "Boring and familiar beats exotic. Next.js, Postgres, Stripe or local payment integrations, Docker, and GitHub Actions carried most Bornosoft MVPs." },
      { question: "How do you handle support while in class?", answer: "Document FAQs, automate onboarding emails, set office hours for client chat, and under-promise response times you can sustain during exam weeks." },
      { question: "When to quit a SaaS idea?", answer: "When users will not pay or return after three honest outreach cycles—and you have no differentiated insight left to test. Pivot data, not ego." },
    ],
  },
  content: `<p>Building <strong>SaaS products</strong> while attending lectures, labs, and family obligations in Dhaka taught me lessons no textbook chapter titled. <strong>Bornosoft</strong> began as ambition; it became a catalog of mistakes, small wins, and sustainable habits. I am <strong>Mohammad Ali Nayeem</strong>, <strong>Software Engineering student at DIU</strong>, and these are the <strong>lessons learned building SaaS</strong> that I would hand to my past self.</p>

<h2>Lesson 1: Painful Problems Beat Clever Ideas</h2>

<p>Our early ideas sounded impressive in pitch sentences but solved nobody's urgent pain. Revenue followed when we interviewed shop owners about inventory chaos and built boring CRUD with reliable exports—not AI buzzword wrappers.</p>

<div class="callout tip"><strong>Tip:</strong> Ask will you pay next month before writing auth middleware for the fifteenth time.</div>

<h2>Lesson 2: MVPs Should Embarrass You Slightly</h2>

<p>Perfection delayed launches until competitors with uglier UIs won trust by showing up. Ship manual onboarding, spreadsheet imports, email alerts instead of real-time websockets if that delivers value Monday.</p>

<h3>Scope Checklist We Use Now</h3>

<ul>
<li>One persona, one job-to-be-done.</li>
<li>Login, core workflow, export or notification.</li>
<li>Stripe or local payment link—even if manual reconciliation.</li>
<li>Terms page and privacy basics—clients in Bangladesh ask.</li>
</ul>

<h2>Lesson 3: Billing Is Product</h2>

<p>Trials, invoices, failed payment emails, and downgrade paths deserve design love equal to dashboard charts. Churn often traces to billing confusion, not missing features.</p>

<table>
<thead><tr><th>Billing element</th><th>Why it matters</th></tr></thead>
<tbody>
<tr><td>Clear pricing page</td><td>Reduces pre-sales DMs</td></tr>
<tr><td>Usage limits</td><td>Prevents surprise infra bills</td></tr>
<tr><td>Dunning emails</td><td>Recovers failed cards</td></tr>
<tr><td>Annual discount</td><td>Improves cash flow for tiny teams</td></tr>
</tbody>
</table>

<h2>Lesson 4: Tech Debt Compounds Silently</h2>

<p>Skipping tests for a DIU deadline haunted us when webhook idempotency bugs duplicated client records. Now every Bornosoft service requires:</p>

<ol>
<li>CI lint and test on PR.</li>
<li>Structured logs with request IDs.</li>
<li>Migration discipline for Postgres.</li>
<li>Runbook snippet in README.</li>
</ol>

<div class="callout warning"><strong>Warning:</strong> A student founder doing heroics at 3 AM does not scale. Automate deploys before chasing enterprise features.</div>

<h2>Lesson 5: Support Load Is Real</h2>

<p>Ten active users generated more WhatsApp messages than expected. We added in-app help, Loom walkthroughs in Bangla and English, and office hours after class. Support time is COGS—price accordingly.</p>

<h2>Lesson 6: Multi-Tenancy Can Wait</h2>

<p>Single-tenant deploys for first paying clients taught ops without building complex tenant isolation prematurely. Abstract when second client forces duplication—not before.</p>

<h2>Lesson 7: Marketing While Building</h2>

<p>Portfolio SEO, LinkedIn build logs, and DIU demo days outperformed cold ads on student budgets. Documentation doubles as marketing—this blog included.</p>

<div class="callout note"><strong>Note:</strong> Bangladesh market rewards trust and referrals. Deliver one client exceptionally; ask for introduction.</div>

<h2>Lesson 8: Legal and Tax Basics Early</h2>

<p>Register business entities when revenue stabilizes. Consult local advisors on VAT and invoicing norms. Clients expect professionalism beyond GitHub green squares.</p>

<h2>Lesson 9: Team Boundaries</h2>

<p>Cofounder clarity on equity, roles, and exit scenarios prevents dorm-room fallout. Written agreements feel awkward at nineteen; lawsuits feel worse.</p>

<h2>Lesson 10: Health and Semester Rhythm</h2>

<p>Burnout killed creativity faster than missing one feature. Exam weeks mean support SLAs extend—communicate proactively.</p>

<h2>Stack Reflection</h2>

<p>Next.js admin, Go workers, Postgres, Docker on AWS, GitHub Actions—boring stack, exciting reliability improvements. Fancy microservices waited until metrics justified them.</p>

<h2>Conclusion</h2>

<p>The <strong>lessons learned building SaaS products</strong> at Bornosoft boil down to empathy, scope discipline, and operational respect. DIU gave theory; clients gave truth. If you are a student founder in Bangladesh, build small, invoice early, document loudly, sleep sometimes.</p>

<p>Founder war stories welcome at <a href="https://kazinayeem.site">kazinayeem.site</a>.</p>`,
});

// Article 13
articlesPart2.push({
  index: 13,
  file: "creating-portfolio-ranks-google.ts",
  meta: {
    slug: "creating-portfolio-ranks-google",
    title: "Creating a Portfolio That Ranks on Google",
    seoTitle: "Creating a Portfolio That Ranks on Google | Mohammad Ali Nayeem",
    subtitle: "Technical SEO, content strategy, and performance tactics behind kazinayeem.site",
    description: "Mohammad Ali Nayeem explains how he built a developer portfolio that ranks on Google—metadata, structured data, blog strategy, Core Web Vitals, and lessons from DIU and Bornosoft.",
    category: "Tutorials",
    tags: ["SEO", "Portfolio", "Next.js", "Google", "Web Development"],
    keywords: ["developer portfolio seo", "portfolio ranks google", "nextjs seo tutorial", "technical seo portfolio site"],
    coverImageAlt: "Google search results showing developer portfolio and blog articles",
    relatedSlugs: ["how-i-got-cursor-pro-free-as-diu-student", "deploying-nextjs-aws-ec2-nginx-pm2", "my-devops-roadmap-software-engineering-student"],
    faqs: [
      { question: "How long until a new portfolio ranks on Google?", answer: "Indexing can happen in days with sitemap submission and Search Console. Meaningful rankings for competitive keywords take months of consistent content, backlinks, and technical hygiene." },
      { question: "Do developers need a blog for SEO?", answer: "Not mandatory, but long-form articles targeting problems you solved attract organic traffic recruiters and clients search for—especially combined with structured data." },
      { question: "What Next.js SEO features matter most?", answer: "Metadata API, semantic HTML, fast LCP, sitemap.xml, robots.txt, canonical URLs, Open Graph tags, and JSON-LD Person/Article schema." },
      { question: "Should I buy backlinks?", answer: "No. Focus on guest posts, open source contributions, university profiles, and genuine mentions. Toxic links risk penalties." },
    ],
  },
  content: `<p>A portfolio hidden on page four of Google might as well be a PDF emailed to nobody. When I rebuilt <a href="https://kazinayeem.site">kazinayeem.site</a>, ranking was a requirement—not vanity—because <strong>Bornosoft</strong> leads and internship screens start with search. I am <strong>Mohammad Ali Nayeem</strong>, <strong>DIU Software Engineering</strong> student in Bangladesh, and this tutorial covers <strong>creating a portfolio that ranks on Google</strong> with techniques you can replicate on Next.js.</p>

<h2>SEO Goals I Defined</h2>

<ul>
<li>Rank for branded queries: Mohammad Ali Nayeem, Bornosoft founder.</li>
<li>Capture long-tail traffic: DIU student DevOps, Bangladesh Next.js developer.</li>
<li>Convert visitors via clear contact and project CTAs.</li>
<li>Pass Core Web Vitals on mid-range Android phones common locally.</li>
</ul>

<div class="callout tip"><strong>Tip:</strong> Write for humans first, search engines second. Google rewards pages that answer real questions—like the blog you are reading.</div>

<h2>Technical Foundation in Next.js App Router</h2>

<pre><code class="language-typescript">export const metadata: Metadata = {
  title: {
    default: "Mohammad Ali Nayeem | Software Engineer",
    template: "%s | Mohammad Ali Nayeem",
  },
  description:
    "Software Engineering student at DIU, Bornosoft founder...",
  metadataBase: new URL("https://kazinayeem.site"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kazinayeem.site",
    siteName: "Mohammad Ali Nayeem",
  },
  robots: { index: true, follow: true },
};</code></pre>

<p>Every blog post exports <code>generateMetadata</code> with unique title, description, canonical URL, and OG image from slug.</p>

<h2>Structured Data (JSON-LD)</h2>

<p>Person schema on homepage; Article schema on blog posts; BreadcrumbList for navigation clarity.</p>

<pre><code class="language-json">{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Mohammad Ali Nayeem",
  "jobTitle": "Software Engineer",
  "alumniOf": "Daffodil International University",
  "worksFor": { "@type": "Organization", "name": "Bornosoft" },
  "url": "https://kazinayeem.site"
}</code></pre>

<div class="callout note"><strong>Note:</strong> Validate with Google Rich Results Test before requesting indexing in Search Console.</div>

<h2>Content Strategy: Blog as SEO Engine</h2>

<p>Static portfolio pages rank for name queries; articles rank for problems—CI/CD tutorials, Docker guides, student tool reviews. Each post targets one primary keyword cluster with honest experience from DIU and Bornosoft.</p>

<table>
<thead><tr><th>Content type</th><th>SEO role</th><th>Example</th></tr></thead>
<tbody>
<tr><td>Pillar guide</td><td>Authority</td><td>DevOps roadmap</td></tr>
<tr><td>Tutorial</td><td>Long-tail</td><td>Deploy Next.js EC2</td></tr>
<tr><td>Story</td><td>Trust + shares</td><td>Cursor Pro student journey</td></tr>
</tbody>
</table>

<h2>On-Page Checklist</h2>

<ul>
<li>One H1 per page; logical H2/H3 hierarchy.</li>
<li>Descriptive alt text on images—not keyword stuffing.</li>
<li>Internal links between related blog posts.</li>
<li>FAQ sections with schema where appropriate.</li>
<li>Readable URLs: <code>/blog/deploying-nextjs-aws-ec2-nginx-pm2</code>.</li>
</ul>

<h2>Performance and Core Web Vitals</h2>

<p>Google ranks usable sites. Tactics that moved metrics:</p>

<ol>
<li><code>next/image</code> with proper sizes and WebP/AVIF.</li>
<li>Font subsetting and <code>display: swap</code>.</li>
<li>Route-level code splitting by default in App Router.</li>
<li>CDN or Nginx caching headers for static assets.</li>
<li>Lazy load below-fold sections—not hero content.</li>
</ol>

<div class="callout warning"><strong>Warning:</strong> Heavy animation libraries tank LCP. Measure on real devices, not only MacBook Pro on office Wi-Fi.</div>

<h2>Sitemap and robots.txt</h2>

<pre><code class="language-typescript">// app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://kazinayeem.site", lastModified: new Date() },
    ...posts.map((p) => ({
      url: \`https://kazinayeem.site/blog/\${p.slug}\`,
      lastModified: new Date(p.updatedAt),
    })),
  ];
}</code></pre>

<p>Submit sitemap in Google Search Console after deploy. Monitor coverage reports for crawl errors.</p>

<h2>Off-Page Signals</h2>

<ul>
<li>LinkedIn and GitHub profiles link to canonical domain.</li>
<li>DIU project showcases and dev community posts.</li>
<li>Open source README credits.</li>
<li>Guest answers on Stack Overflow with profile link—sparingly, genuinely.</li>
</ul>

<h2>Local SEO for Bangladesh</h2>

<p>Mention Dhaka and DIU naturally in about content. Google Business Profile if Bornosoft maintains a physical office—optional for pure personal brands.</p>

<h2>Metrics I Track Monthly</h2>

<ul>
<li>Search Console impressions and average position per query.</li>
<li>Organic sessions in analytics.</li>
<li>CTR from search—rewrite titles underperforming despite impressions.</li>
<li>Core Web Vitals field data when available.</li>
</ul>

<h2>Mistakes I Fixed</h2>

<ol>
<li>Duplicate titles across project pages.</li>
<li>Missing canonical on paginated blog index.</li>
<li>Blocking staging accidentally via robots—double-check environments.</li>
<li>Thin project descriptions—expanded with problem, stack, outcome.</li>
</ol>

<h2>Conclusion</h2>

<p><strong>Creating a portfolio that ranks on Google</strong> blends Next.js technical SEO, substantive blogging, performance discipline, and patience. kazinayeem.site improves monthly because I treat SEO like observability—measure, iterate, ship content from real engineering work at DIU and Bornosoft.</p>

<p>Build the site, publish ten honest articles, submit sitemap, review Search Console weekly. Your future recruiter search starts with your name—own that results page.</p>

<p>SEO questions? Contact via <a href="https://kazinayeem.site">kazinayeem.site</a>.</p>`,
});
