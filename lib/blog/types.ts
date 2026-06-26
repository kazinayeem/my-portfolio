export type BlogCategory =
  | "Artificial Intelligence"
  | "Machine Learning"
  | "Computer Vision"
  | "YOLO"
  | "Robotics"
  | "Raspberry Pi"
  | "Next.js"
  | "React"
  | "Node.js"
  | "Golang"
  | "DevOps"
  | "Docker"
  | "Kubernetes"
  | "AWS"
  | "Terraform"
  | "CI/CD"
  | "Jenkins"
  | "GitHub Actions"
  | "Cloud Computing"
  | "Career"
  | "Software Engineering"
  | "Programming"
  | "Student Journey"
  | "Open Source"
  | "Tutorials"
  | "Project Showcase";

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  subtitle: string;
  description: string;
  category: BlogCategory;
  tags: string[];
  keywords: string[];
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  popular: boolean;
  coverImage: string;
  coverImageAlt: string;
  content: string;
  faqs: BlogFAQ[];
  relatedSlugs?: string[];
}

export interface BlogAuthor {
  name: string;
  title: string;
  roles: string[];
  bio: string;
  avatar: string;
  email: string;
  github: string;
  linkedin: string;
  portfolio: string;
  company: string;
  location: string;
  skills: string[];
}
