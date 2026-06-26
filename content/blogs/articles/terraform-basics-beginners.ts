import { createPost } from "../article-builder";

const post = createPost({
  slug: "terraform-basics-beginners",
  title: "Terraform Basics for Beginners",
  seoTitle: "Terraform Basics for Beginners | Mohammad Ali Nayeem",
  subtitle: "Infrastructure as Code fundamentals with AWS examples from a student DevOps lab",
  description: "Learn Terraform basics with Mohammad Ali Nayeem: providers, state, modules, and safe workflows for provisioning AWS resources as a Software Engineering student in Bangladesh.",
  category: "Terraform",
  tags: ["Terraform","Infrastructure as Code","AWS","DevOps","HCL","Cloud"],
  keywords: ["terraform basics beginners","terraform aws tutorial student","infrastructure as code guide","terraform state management"],
  publishedAt: "2025-05-29",
  updatedAt: "2025-06-10",
  featured: false,
  popular: true,
  coverImageAlt: "Terraform configuration file alongside AWS architecture diagram on a monitor",
  content: `<p>Infrastructure used to mean clicking AWS console buttons until something worked—then forgetting what I clicked. <strong>Terraform</strong> changed that for me. As <strong>Mohammad Ali Nayeem</strong>, DIU Software Engineering student and <strong>Bornosoft</strong> founder in Bangladesh, I want to share <strong>Terraform basics for beginners</strong> with the same HCL files I wish I had before deleting a production security group by mistake in week one.</p>

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
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}</code></pre>

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


<h2>Conclusion</h2>

<p><strong>Terraform basics</strong>—providers, resources, variables, state, plan/apply—are the foundation of modern DevOps careers. DIU students pairing Terraform with AWS free tier learn more than reading slides alone.</p>

<p>Write HCL for one S3 bucket and one t3.micro this weekend. Destroy it Monday. That loop builds confidence. Share configs (without secrets) at <a href="https://kazinayeem.site">kazinayeem.site</a>.</p>`,
  faqs: [
      {
          "question": "Terraform vs CloudFormation—which first?",
          "answer": "Terraform is multi-cloud and popular in job postings. CloudFormation is AWS-native. Students benefit from Terraform's broader community tutorials; learn CloudFormation if your internship is AWS-only."
      },
      {
          "question": "Where should Terraform state live?",
          "answer": "Never commit state files with secrets to Git. Use remote backends like S3 with DynamoDB locking for team projects; local state is fine for solo labs until you collaborate."
      },
      {
          "question": "How do I avoid huge AWS bills while learning?",
          "answer": "Set billing alarms, use t3.micro instances, destroy resources with terraform destroy after labs, and tag everything with student/project names for accountability."
      },
      {
          "question": "Do I need to memorize every HCL attribute?",
          "answer": "No. Understand resource blocks, variables, outputs, and modules. Provider docs and terraform plan are your daily references—just like language standard library docs."
      }
  ],
  relatedSlugs: ["my-future-roadmap-ai-devops-cloud","docker-vs-virtual-machines","complete-guide-github-actions"],
});

export default post;
