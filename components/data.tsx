import { ArrowRight, ExternalLink } from "lucide-react";
import {
  SiNextdotjs,
  SiPrisma,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiReactivex as SiReactnative,
  SiReact,
  SiTailwindcss,
  SiPython,
  SiDocker,
  SiAmazon as SiAmazonaws,
  SiJavascript,
} from "react-icons/si";
// Interface
export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  tech: string[];
  githubLink: string;
  youtubeDemoLink?: string;
  liveLink?: string;
  features: string[];
  imageSrc: string;
  isTeamProject: boolean;
}

export const techIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "Next.js": SiNextdotjs,
  Prisma: SiPrisma,
  "Express.js": SiExpress,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  "React Native": SiReactnative,
  "React.js": SiReact,
  "Tailwind CSS": SiTailwindcss,
  Python: SiPython,
  Docker: SiDocker,
  AWS: SiAmazonaws,
  JavaScript: SiJavascript,
  "Chrome API": SiJavascript,
  SSLCommerz: ExternalLink,
  JWT: ArrowRight,
  "Gemini AI": ArrowRight,
  "Web Scraping": ArrowRight,
  Flask: SiPython,
};

export const projectsData: Project[] = [
  {
    id: "cafe-pos-system",
    title: "☕ Cafe POS System",
    shortDescription:
      "A modern Point of Sale (POS) system for cafés with real-time order management, role-based access, and reporting dashboards.",
    fullDescription:
      "A full-featured Point of Sale (POS) system built with the MERN stack and TypeScript, designed to streamline café operations. It includes real-time order management, detailed dashboard analytics, and role-based permissions for Admin, Barista, and Cashier. Key functionalities include inventory and menu management, staff roles, sales reports, PDF receipt generation, loyalty program tracking, and printer support. The app features an intuitive, responsive UI for smooth order handling and efficient café management.",
    tech: [
      "React",
      "TypeScript",
      "Redux",
      "Vite",
      "Tailwind CSS",
      "Lucide React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Socket.io",
      "JWT",
    ],
    githubLink: "https://github.com/kazinayeem/-cafe-sync",
    youtubeDemoLink: "https://www.youtube.com/watch?v=JgM4OJIKdkY",
    features: [
      "Real-Time Order Management with Socket.io",
      "Role-Based Access (Admin, Barista, Cashier)",
      "Menu & Inventory Management",
      "Customizable Menu with Categories & Subcategories",
      "Table & Order Status Tracking",
      "Comprehensive Sales Reports & Analytics",
      "PDF Generation for Receipts and Sales Summaries",
      "Payment & Discount Management",
      "Customer Loyalty Program",
      "Search & Filtering for Orders and Reports",
      "Staff Management with Role Assignment",
      "Responsive, Intuitive User Interface",
      "Printer Support for Receipts and Kitchen Tickets",
    ],
    imageSrc: "/cafe-pos-cover.png",
    isTeamProject: false,
  },
  {
    id: "edemy-ai",
    title: "Edemy – AI-Powered Online Learning Platform",
    shortDescription:
      "Agency platform with job posting, AI chatbot, and secure application system.",
    fullDescription:
      "A comprehensive online learning platform with AI-generated course descriptions and secure payment integration. This full-stack agency platform includes AI-powered features, a secure job application flow, and role-based dashboards for Admin and Users. Key features include: Teacher/Student/Admin dashboards, AI-generated course descriptions (Gemini AI), Secure SSLCommerz payments, Course creation, analytics, review system, Role-based dashboards for Admin and Users, Secure job application system with email verification (OTP), AI chatbot for answering queries, User management and team collaboration tools, Blog and service section management, and Image uploads integrated with AWS S3.",
    tech: [
      "Next.js",
      "Prisma",
      "Express.js",
      "PostgreSQL",
      "SSLCommerz",
      "JWT",
      "Gemini AI",
      "AWS",
    ],
    githubLink: "https://github.com/kazinayeem/udemy-clone",
    youtubeDemoLink: "https://www.youtube.com/watch?v=your-edemy-demo",
    features: [
      "Teacher/Student/Admin dashboards",
      "AI-generated course descriptions (Gemini AI)",
      "Secure SSLCommerz payments",
      "Course creation, analytics, review system",
      "Role-based dashboards for Admin and Users",
      "Secure job application system with email verification (OTP)",
      "AI chatbot for answering queries",
      "User management and team collaboration tools",
      "Blog and service section management",
      "Image uploads integrated with AWS S3",
    ],
    imageSrc: "/edemyimage.png",
    isTeamProject: true,
  },
  {
    id: "myshop-2",
    title: "MyShop 2.0 – Full-featured E-commerce Platform",
    shortDescription:
      "A robust e-commerce solution including web frontend, mobile app, and admin dashboard.",
    fullDescription:
      "A robust e-commerce solution including web frontend, mobile app (React Native), and admin dashboard. Features a Node.js + MongoDB backend with multiple payment methods, order management, and POS integration. Key features include: Web frontend, mobile app (React Native), and admin dashboard, Node.js + MongoDB backend, Multiple payment methods, order management, POS integration.",
    tech: ["Node.js", "MongoDB", "React Native", "Express.js"],
    githubLink: "https://github.com/kazinayeem/myshop-2",
    features: [
      "Web frontend, mobile app (React Native), and admin dashboard",
      "Node.js + MongoDB backend",
      "Multiple payment methods, order management, POS integration",
    ],
    imageSrc: "/myshow2.png",
    isTeamProject: false,
  },
  {
    id: "ecommerce-frontend",
    title: "E-commerce Frontend | React Native",
    shortDescription: "A responsive and modern e-commerce user interface.",
    fullDescription:
      "A responsive and modern e-commerce user interface with product listing, shopping cart, and user authentication. Key features include: Product listing and detail pages, Shopping cart functionality, User authentication.",
    tech: ["React.js", "Tailwind CSS"],
    githubLink: "https://github.com/kazinayeem/e-commerce-frontend",
    liveLink: "https://your-ecommerce-frontend.vercel.app",
    features: [
      "Product listing and detail pages",
      "Shopping cart functionality",
      "User authentication",
    ],
    imageSrc: "/mobile-ecomapp.png",
    isTeamProject: false,
  },
  {
    id: "priceninjabd",
    title: "PriceNinja BD",
    shortDescription:
      "A tool for comparing product prices from various online stores in Bangladesh.",
    fullDescription:
      "A tool for comparing product prices from various online stores in Bangladesh. Key features include: Real-time price comparisons, Product search and filtering, Alerts for price drops.",
    tech: ["Python", "Web Scraping", "Flask"],
    githubLink: "https://github.com/kazinayeem/priceninjabd",
    features: [
      "Real-time price comparisons",
      "Product search and filtering",
      "Alerts for price drops",
    ],
    imageSrc: "/priceninja.png",
    isTeamProject: false,
  },
  {
    id: "media-link-extractor-chrome-extension",
    title: "Media Link Extractor (Chrome Extension)",
    shortDescription:
      "A browser extension to extract media links from web pages.",
    fullDescription:
      "A browser extension to extract media links from web pages. Key features include: One-click link extraction, Supports various media types, User-friendly interface.",
    tech: ["JavaScript", "Chrome API"],
    githubLink: "https://github.com/kazinayeem/media-link-extractor",
    features: [
      "One-click link extraction",
      "Supports various media types",
      "User-friendly interface",
    ],
    imageSrc: "/medialinkextractor.png",
    isTeamProject: false,
  },
  {
    id: "swipe-onboarding-react-native",
    title: "Swipe Onboarding (React Native)",
    shortDescription:
      "A customizable swipe-through onboarding screen for React Native applications.",
    fullDescription:
      "A customizable swipe-through onboarding screen for React Native applications. Key features include: Smooth swipe animations, Customizable content and styling, Indicator dots for progress.",
    tech: ["React Native"],
    githubLink: "https://github.com/kazinayeem/swipe-onboarding",
    features: [
      "Smooth swipe animations",
      "Customizable content and styling",
      "Indicator dots for progress",
    ],
    imageSrc: "/onboarding.png", // Placeholder image
    isTeamProject: false,
  },
  {
    id: "qr-code-scanner-rn",
    title: "QR Code Scanner (React Native)",
    shortDescription:
      "A simple and efficient QR code scanner built with React Native.",
    fullDescription:
      "A simple and efficient QR code scanner built with React Native. Key features include: Fast scanning capabilities, Flashlight toggle, History of scanned codes.",
    tech: ["React Native"],
    githubLink: "https://github.com/kazinayeem/qr-code-scanner-rn",
    features: [
      "Fast scanning capabilities",
      "Flashlight toggle",
      "History of scanned codes",
    ],
    imageSrc: "/qrcode1.png", // Placeholder image
    isTeamProject: false,
  },
  {
    id: "e-food-ui",
    title: "E-food UI",
    shortDescription:
      "A modern and intuitive user interface for a food delivery application.",
    fullDescription:
      "A modern and intuitive user interface for a food delivery application. Key features include: Browse restaurants and menus, Order tracking, User reviews and ratings.",
    tech: ["React.js", "Tailwind CSS"],
    githubLink: "https://github.com/kazinayeem/e-food-ui",
    features: [
      "Browse restaurants and menus",
      "Order tracking",
      "User reviews and ratings",
    ],
    imageSrc: "/food-rn.png", // Placeholder image
    isTeamProject: false,
  },
  {
    id: "e-commerce-ui-rn",
    title: "E-commerce UI RN",
    shortDescription:
      "A clean and functional e-commerce user interface for React Native.",
    fullDescription:
      "A clean and functional e-commerce user interface for React Native. Key features include: Product display and categories, Shopping cart integration, Responsive design for mobile devices.",
    tech: ["React Native"],
    githubLink: "https://github.com/kazinayeem/e-commerce-ui-rn",
    features: [
      "Product display and categories",
      "Shopping cart integration",
      "Responsive design for mobile devices",
    ],
    imageSrc: "/e-com-rn.png", // Placeholder image
    isTeamProject: false,
  },
];
