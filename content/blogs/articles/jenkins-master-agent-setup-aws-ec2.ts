import { createPost } from "../article-builder";

const post = createPost({
  slug: "jenkins-master-agent-setup-aws-ec2",
  title: "Jenkins Master-Agent Setup on AWS EC2",
  seoTitle: "Jenkins Master-Agent Setup on AWS EC2 | Mohammad Ali Nayeem",
  subtitle:
    "A step-by-step lab guide for DIU students who want distributed builds without drowning in plugin menus",
  description:
    "Mohammad Ali Nayeem explains how he configured a Jenkins master on AWS EC2 with remote build agents, SSH credentials, pipeline jobs, and security hardening for Bornosoft and university DevOps coursework.",
  category: "Jenkins",
  tags: ["Jenkins", "AWS", "EC2", "CI/CD", "DevOps"],
  keywords: [
    "jenkins master agent setup EC2",
    "jenkins agent AWS tutorial",
    "jenkins distributed builds student",
    "jenkins pipeline EC2 Bangladesh",
  ],
  publishedAt: "2024-10-25",
  updatedAt: "2024-11-18",
  featured: false,
  popular: false,
  coverImageAlt:
    "Jenkins dashboard showing master node and connected EC2 build agents",
  content: `<p>When my DevOps course at <strong>Daffodil International University (DIU)</strong> introduced <strong>Jenkins</strong>, the lecture slides made it look trivial: install Jenkins, click New Item, paste a shell script, celebrate. Reality hit when I tried to run Docker builds and Node.js test suites on the same t3.micro instance hosting the Jenkins UI. The master node froze, builds queued for twenty minutes, and I learned why production teams separate the <strong>controller (master)</strong> from <strong>agents (workers)</strong>.</p>

<p>This article documents how I set up a Jenkins master-agent architecture on <strong>AWS EC2</strong> for Bornosoft client projects and DIU lab assignments. It is not the only valid approach—Kubernetes agents and ephemeral Fargate workers exist—but it is the path that taught me distributed builds, SSH credentials, and pipeline-as-code without a six-figure cloud bill.</p>

<h2>Why Master-Agent Architecture Matters</h2>

<p>The Jenkins controller orchestrates jobs, stores configuration, and serves the web UI. Agents execute the heavy work: compiling code, running tests, building Docker images, deploying artifacts. Mixing both roles on one small EC2 instance works for hello-world demos and fails the moment three teammates push branches during finals week.</p>

<h3>Benefits I Experienced</h3>

<ul>
<li><strong>Isolation</strong> — A rogue <code>npm install</code> cannot starve the Jenkins UI.</li>
<li><strong>Scalability</strong> — Add agents when Bornosoft client load spikes.</li>
<li><strong>Specialization</strong> — One agent with Docker, another with Android SDK tools.</li>
<li><strong>Security</strong> — Limit agent credentials to build tasks only.</li>
</ul>

<div class="callout tip"><strong>Tip:</strong> Label agents clearly (<code>docker</code>, <code>node-20</code>, <code>go-1.22</code>) so pipeline stages target the right environment with <code>agent { label 'docker' }</code>.</div>

<h2>Architecture Overview</h2>

<p>My lab setup used three EC2 instances in the same VPC:</p>

<table>
<thead><tr><th>Instance</th><th>Role</th><th>Instance Type</th><th>Software</th></tr></thead>
<tbody>
<tr><td>jenkins-master</td><td>Controller + UI</td><td>t3.small</td><td>Jenkins LTS, Nginx reverse proxy</td></tr>
<tr><td>jenkins-agent-1</td><td>General builds</td><td>t3.medium</td><td>Java, Node.js, Git</td></tr>
<tr><td>jenkins-agent-2</td><td>Docker builds</td><td>t3.medium</td><td>Docker Engine, AWS CLI</td></tr>
</tbody>
</table>

<p>All instances lived in private subnets with a bastion or SSM Session Manager for admin access. The master communicated with agents over SSH on port 22 inside the VPC—no public agent IPs required.</p>

<h2>Step 1: Launch and Harden the Jenkins Master</h2>

<p>I started with Ubuntu 22.04 LTS on a t3.small instance. After SSH access:</p>

<pre><code class="language-bash"># Update packages
sudo apt update && sudo apt upgrade -y

# Install Java (Jenkins requirement)
sudo apt install -y openjdk-17-jdk

# Add Jenkins repository and install
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | \\
  sudo tee /usr/share/keyrings/jenkins-keyring.asc &gt; /dev/null
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \\
  https://pkg.jenkins.io/debian-stable binary/ | \\
  sudo tee /etc/apt/sources.list.d/jenkins.list &gt; /dev/null
sudo apt update
sudo apt install -y jenkins

# Start and enable
sudo systemctl enable jenkins
sudo systemctl start jenkins</code></pre>

<p>I retrieved the initial admin password from <code>/var/lib/jenkins/secrets/initialAdminPassword</code>, completed the setup wizard, and installed suggested plugins: Git, Pipeline, Credentials Binding, and SSH Agent.</p>

<div class="callout warning"><strong>Warning:</strong> Never expose Jenkins port 8080 directly to the internet without authentication hardening. I put Nginx with TLS in front and restricted security group ingress to my IP during setup.</div>

<h3>Nginx Reverse Proxy Snippet</h3>

<pre><code class="language-nginx">server {
    listen 443 ssl;
    server_name jenkins.bornosoft.internal;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}</code></pre>

<h2>Step 2: Prepare Agent EC2 Instances</h2>

<p>On each agent machine I created a dedicated Unix user <code>jenkins</code> and installed tooling:</p>

<pre><code class="language-bash">sudo useradd -m -s /bin/bash jenkins
sudo mkdir -p /home/jenkins/agent
sudo chown jenkins:jenkins /home/jenkins/agent

# Agent 1: Node toolchain
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git

# Agent 2: Docker
sudo apt install -y docker.io
sudo usermod -aG docker jenkins</code></pre>

<p>Agents do not need the full Jenkins WAR—only a Java runtime and the agent JAR that the master provides at connection time.</p>

<h2>Step 3: Configure SSH Credentials in Jenkins</h2>

<p>Jenkins connects to agents via SSH using a private key stored in <strong>Manage Jenkins → Credentials</strong>:</p>

<ol>
<li>On my laptop, generate a key pair: <code>ssh-keygen -t ed25519 -f jenkins-agent-key</code></li>
<li>Add the public key to each agent's <code>/home/jenkins/.ssh/authorized_keys</code></li>
<li>Upload the private key to Jenkins as <strong>SSH Username with private key</strong></li>
<li>Test SSH manually from the master: <code>ssh -i jenkins-agent-key jenkins@10.0.2.15</code></li>
</ol>

<div class="callout note"><strong>Note:</strong> Use internal VPC IPs for agent hosts. Security groups should allow SSH only from the master's security group—not from 0.0.0.0/0.</div>

<h2>Step 4: Add Permanent SSH Agents</h2>

<p>In Jenkins: <strong>Manage Jenkins → Nodes → New Node</strong></p>

<ul>
<li><strong>Name:</strong> agent-docker-01</li>
<li><strong>Type:</strong> Permanent Agent</li>
<li><strong>Remote root directory:</strong> /home/jenkins/agent</li>
<li><strong>Labels:</strong> docker aws</li>
<li><strong>Launch method:</strong> Launch agents via SSH</li>
<li><strong>Host:</strong> 10.0.2.20 (private IP)</li>
<li><strong>Credentials:</strong> jenkins-agent-ssh</li>
</ul>

<p>After saving, Jenkins connected and the node showed online with an idle executor. I repeated for the Node.js agent with label <code>node-20</code>.</p>

<h2>Step 5: Declarative Pipeline Using Labels</h2>

<p>My first multi-stage Bornosoft pipeline looked like this:</p>

<pre><code class="language-groovy">pipeline {
    agent none
    stages {
        stage('Checkout') {
            agent { label 'node-20' }
            steps {
                git branch: 'main',
                    url: 'https://github.com/kazinayeem/bornosoft-api.git'
            }
        }
        stage('Test') {
            agent { label 'node-20' }
            steps {
                sh 'npm ci'
                sh 'npm test'
            }
        }
        stage('Docker Build') {
            agent { label 'docker' }
            steps {
                sh 'docker build -t bornosoft-api:${BUILD_NUMBER} .'
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}</code></pre>

<p>Splitting stages across agents required understanding workspace persistence—each agent stage starts fresh unless you stash artifacts. For Docker images I pushed to ECR from the docker-labeled agent using IAM instance profiles.</p>

<h2>Security Lessons from My Setup</h2>

<p>Jenkins is a high-value target. Mistakes I fixed after the first lab:</p>

<ul>
<li><strong>Disabled anonymous read</strong> — Enforced login for all users.</li>
<li><strong>Role-based access</strong> — Classmates got job build permissions, not script console.</li>
<li><strong>No secrets in Jenkinsfiles</strong> — Used credentials binding with IDs.</li>
<li><strong>Regular LTS updates</strong> — Subscribed to Jenkins security advisories.</li>
<li><strong>Backup $JENKINS_HOME</strong> — Snapshotted EBS volumes weekly.</li>
</ul>

<h2>Cost Management on Student AWS Accounts</h2>

<p>Three EC2 instances running 24/7 adds up. My mitigations:</p>

<ol>
<li><strong>Stop agents nights and weekends</strong> via EventBridge schedules.</li>
<li><strong>Use Spot instances</strong> for non-critical agents with interruption tolerance.</li>
<li><strong>Right-size</strong> — t3.medium beats t3.large until Docker layer caching proves insufficient.</li>
<li><strong>Track billing alarms</strong> — AWS Budgets email at 80% of free tier exhaustion.</li>
</ol>

<h2>Jenkins vs GitHub Actions: When I Still Use Jenkins</h2>

<p>After building GitHub Actions pipelines for my portfolio, I thought Jenkins was obsolete. It is not—for DIU labs requiring on-prem simulation, custom agent images, and long-running jobs with complex orchestration, Jenkins remains excellent teaching infrastructure. Bornosoft moved greenfield repos to Actions, but legacy client VMs still run Jenkins jobs I maintain.</p>

<h2>Troubleshooting Common Agent Connection Failures</h2>

<table>
<thead><tr><th>Symptom</th><th>Likely Cause</th><th>Fix</th></tr></thead>
<tbody>
<tr><td>Agent offline immediately</td><td>Wrong SSH key or user</td><td>Verify authorized_keys and Jenkins credential ID</td></tr>
<tr><td>Connection timeout</td><td>Security group blocks port 22</td><td>Allow master SG inbound to agent SG</td></tr>
<tr><td>Docker permission denied</td><td>jenkins user not in docker group</td><td>usermod -aG docker jenkins; restart agent</td></tr>
<tr><td>Disk full on agent</td><td>Old workspace artifacts</td><td>Enable workspace cleanup in post blocks</td></tr>
</tbody>
</table>

<h2>Conclusion</h2>

<p>Setting up a <strong>Jenkins master-agent cluster on AWS EC2</strong> was more work than a single-node install, but it mirrored how real teams scale CI/CD. As a DIU Software Engineering student and Bornosoft founder, that lab paid off in interviews where I could explain executors, labels, and SSH launchers without memorizing buzzwords.</p>

<p>Start with one master and one agent. Get a pipeline green. Then add Docker specialization and cost controls. Jenkins configuration is verbose, but the mental model—controller orchestrates, agents execute—transfers directly to Kubernetes, GitHub Actions runners, and every other platform you will touch in your DevOps career.</p>

<p>Questions about your Jenkins lab? Reach out via <a href="https://kazinayeem.site">kazinayeem.site</a>.</p>`,
  faqs: [
    {
      question: "Do I need separate EC2 instances for Jenkins master and agents?",
      answer:
        "For learning and small teams, yes—separating roles prevents build workloads from crashing the controller UI. For minimal demos you can start co-located, then split when builds compete for CPU.",
    },
    {
      question: "SSH agents vs inbound agents—which should students use?",
      answer:
        "SSH launch from master to agent is simpler in VPC environments without exposing agents publicly. Inbound agents (JNLP) work when agents initiate connection—useful behind strict NAT. I preferred SSH for DIU labs.",
    },
    {
      question: "How much does a Jenkins EC2 setup cost monthly?",
      answer:
        "A master t3.small plus one t3.medium agent running continuously might cost $25–40 USD outside free tier. Stopping agents when idle and using reserved capacity reduces spend significantly.",
    },
    {
      question: "Is Jenkins still relevant compared to GitHub Actions?",
      answer:
        "Yes for enterprises with self-hosted requirements, complex agent topologies, and legacy pipelines. GitHub Actions wins for Git-centric startups. Learning both makes you adaptable.",
    },
  ],
  relatedSlugs: [
    "my-first-cicd-pipeline-github-actions",
    "my-devops-roadmap-software-engineering-student",
    "learning-docker-from-scratch",
  ],
});

export default post;
