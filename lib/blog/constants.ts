import type { BlogAuthor, BlogCategory } from "./types";

export const SITE_URL = "https://kazinayeem.site";

export const BLOG_AUTHOR: BlogAuthor = {
  name: "Mohammad Ali Nayeem",
  title: "Founder of Bornosoft",
  roles: [
    "Software Engineer",
    "AI Engineer",
    "DevOps Engineer",
    "Full Stack Developer",
    "Robotics Enthusiast",
  ],
  bio: "Software Engineering student at Daffodil International University (DIU), founder of Bornosoft, and passionate builder exploring AI, DevOps, cloud infrastructure, and robotics. I write about lessons from real projects, student developer journeys, and practical engineering guides.",
  avatar: "/myimage.png",
  email: "nayeem2305341022@diu.edu.bd",
  github: "https://github.com/kazinayeem",
  linkedin: "https://linkedin.com/in/mohammad-ali-nayeem",
  portfolio: SITE_URL,
  company: "Bornosoft",
  location: "Dhaka, Bangladesh",
  skills: [
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
    "Golang",
    "Docker",
    "Kubernetes",
    "AWS",
    "YOLO",
    "Machine Learning",
    "CI/CD",
    "Terraform",
  ],
};

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Artificial Intelligence",
  "Machine Learning",
  "Computer Vision",
  "YOLO",
  "Robotics",
  "Raspberry Pi",
  "Next.js",
  "React",
  "Node.js",
  "Golang",
  "DevOps",
  "Docker",
  "Kubernetes",
  "AWS",
  "Terraform",
  "CI/CD",
  "Jenkins",
  "GitHub Actions",
  "Cloud Computing",
  "Career",
  "Software Engineering",
  "Programming",
  "Student Journey",
  "Open Source",
  "Tutorials",
  "Project Showcase",
];

export const POSTS_PER_PAGE = 9;

export const INTERNAL_LINKS = {
  about: "/#about",
  skills: "/#skills",
  projects: "/#projects",
  experience: "/#experience",
  contact: "/#contact",
  blog: "/blog",
  bornosoft: "https://bornosoftnr.com",
  portfolio: SITE_URL,
} as const;
