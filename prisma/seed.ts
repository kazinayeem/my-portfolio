import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedDatabase() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  await prisma.$transaction([
    prisma.skill.deleteMany(),
    prisma.skillCategory.deleteMany(),
    prisma.project.deleteMany(),
    prisma.education.deleteMany(),
    prisma.experience.deleteMany(),
    prisma.achievement.deleteMany(),
  ]);

  console.log("✨ Cleared existing data");

  // Create Skill Categories
  const frontendCategory = await prisma.skillCategory.create({
    data: {
      name: "Frontend",
      color: "from-blue-500 to-cyan-500",
      icon: "Globe",
      order: 1,
      skills: {
        create: [
          { name: "React.js", order: 1 },
          { name: "Next.js", order: 2 },
          { name: "TypeScript", order: 3 },
          { name: "Tailwind CSS", order: 4 },
          { name: "JavaScript", order: 5 },
          { name: "Redux", order: 6 },
        ],
      },
    },
  });

  const backendCategory = await prisma.skillCategory.create({
    data: {
      name: "Backend",
      color: "from-green-500 to-emerald-500",
      icon: "Server",
      order: 2,
      skills: {
        create: [
          { name: "Node.js", order: 1 },
          { name: "Express.js", order: 2 },
          { name: "Prisma ORM", order: 3 },
          { name: "REST APIs", order: 4 },
          { name: "GraphQL", order: 5 },
        ],
      },
    },
  });

  const databaseCategory = await prisma.skillCategory.create({
    data: {
      name: "Database",
      color: "from-orange-500 to-red-500",
      icon: "Database",
      order: 3,
      skills: {
        create: [
          { name: "PostgreSQL", order: 1 },
          { name: "MongoDB", order: 2 },
          { name: "MySQL", order: 3 },
          { name: "Redis", order: 4 },
        ],
      },
    },
  });

  const devopsCategory = await prisma.skillCategory.create({
    data: {
      name: "DevOps & Cloud",
      color: "from-purple-500 to-pink-500",
      icon: "Cloud",
      order: 4,
      skills: {
        create: [
          { name: "Docker", order: 1 },
          { name: "AWS", order: 2 },
          { name: "Git & GitHub", order: 3 },
          { name: "Linux", order: 4 },
          { name: "CI/CD", order: 5 },
        ],
      },
    },
  });

  // Create Sample Projects
  console.log("📦 Creating projects...");
  
  await prisma.project.create({
    data: {
      title: "☕ Cafe POS System",
      shortDescription: "A modern Point of Sale (POS) system for cafés with real-time order management, role-based access, and reporting dashboards.",
      fullDescription: "A full-featured Point of Sale (POS) system built with the MERN stack and TypeScript, designed to streamline café operations. It includes real-time order management, detailed dashboard analytics, and role-based permissions for Admin, Barista, and Cashier. Key functionalities include inventory and menu management, staff roles, sales reports, PDF receipt generation, loyalty program tracking, and printer support. The app features an intuitive, responsive UI for smooth order handling and efficient café management.",
      imageSrc: "/cafe-pos-cover.png",
      githubLink: "https://github.com/kazinayeem/-cafe-sync",
      youtubeDemoLink: "https://www.youtube.com/watch?v=JgM4OJIKdkY",
      isFeatured: true,
      isTeamProject: false,
      order: 1,
      technologies: ["React", "TypeScript", "Redux", "Vite", "Tailwind CSS", "Lucide React", "Node.js", "Express.js", "MongoDB", "Mongoose", "Socket.io", "JWT"],
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
    },
  });

  await prisma.project.create({
    data: {
      title: "Impact Explorer 2025 – Meteor Madness Frontend",
      shortDescription: "NASA Space Apps 2025 project for asteroid impact simulation and visualization using real NASA NEO data.",
      fullDescription: "Impact Explorer 2025 is an interactive simulation and visualization platform developed for the Meteor Madness challenge at NASA Space Apps 2025. It addresses the urgent need for an integrated planetary defense tool that combines asteroid data, hazard physics, and Earth datasets into one accessible interface. Using NASA's Near-Earth Object APIs and JPL Small-Body Database, the platform models asteroid trajectories and impact footprints. Users can adjust parameters such as asteroid size, velocity, and entry angle, instantly visualizing cascading effects like blast waves, seismic activity, and tsunamis. Hazard zones are overlaid with global population maps (SEDAC GPWv4), highlighting potential human exposure and enabling what-if mitigation scenarios. Impact Explorer empowers policymakers with actionable evacuation strategies, educators with engaging learning tools, and citizens with awareness and preparedness insights. Hosted on Vercel, it is scalable, open-source, and globally accessible. By bridging scientific rigor with storytelling, the project delivers real-world defense value and public education impact.",
      imageSrc: "/impact-explorer-2025.png",
      githubLink: "https://github.com/Idba1/meteor-madness",
      youtubeDemoLink: "https://youtu.be/xuDei3eb9hY",
      isFeatured: true,
      isTeamProject: true,
      order: 2,
      technologies: ["React.js", "CesiumJS", "Three.js", "D3.js", "Chart.js", "Framer Motion", "SCSS", "Python", "Flask", "FastAPI", "Pandas", "NumPy", "Poliastro", "MongoDB", "PostGIS", "Vercel"],
      features: [
        "Real-time Near-Earth Object (NEO) feed and trajectory visualization",
        "Interactive asteroid simulation with adjustable parameters",
        "3D Solar System and Earth view using CesiumJS and Three.js",
        "Cascading hazard modeling (blast, tsunami, seismic effects)",
        "Population exposure and infrastructure analysis using SEDAC GPWv4 data",
        "Scenario-based mitigation and evacuation simulation",
        "Data visualization with D3.js and Chart.js",
        "Responsive UI with SCSS and Framer Motion animations",
        "PDF and GeoJSON report export",
        "AI-assisted documentation, design, and storytelling (ChatGPT, Copilot, Gemini)",
        "Hosted on Vercel with global scalability and PWA support",
      ],
    },
  });

  await prisma.project.create({
    data: {
      title: "Edemy – AI-Powered Online Learning Platform",
      shortDescription: "Agency platform with job posting, AI chatbot, and secure application system.",
      fullDescription: "A comprehensive online learning platform with AI-generated course descriptions and secure payment integration. This full-stack agency platform includes AI-powered features, a secure job application flow, and role-based dashboards for Admin and Users. Key features include: Teacher/Student/Admin dashboards, AI-generated course descriptions (Gemini AI), Secure SSLCommerz payments, Course creation, analytics, review system, Role-based dashboards for Admin and Users, Secure job application system with email verification (OTP), AI chatbot for answering queries, User management and team collaboration tools, Blog and service section management, and Image uploads integrated with AWS S3.",
      imageSrc: "/edemyimage.png",
      githubLink: "https://github.com/kazinayeem/udemy-clone",
      youtubeDemoLink: "https://www.youtube.com/watch?v=your-edemy-demo",
      isFeatured: true,
      isTeamProject: true,
      order: 3,
      technologies: ["Next.js", "Prisma", "Express.js", "PostgreSQL", "SSLCommerz", "JWT", "Gemini AI", "AWS"],
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
    },
  });

  await prisma.project.create({
    data: {
      title: "MyShop 2.0 – Full-featured E-commerce Platform",
      shortDescription: "A robust e-commerce solution including web frontend, mobile app, and admin dashboard.",
      fullDescription: "A robust e-commerce solution including web frontend, mobile app (React Native), and admin dashboard. Features a Node.js + MongoDB backend with multiple payment methods, order management, and POS integration. Key features include: Web frontend, mobile app (React Native), and admin dashboard, Node.js + MongoDB backend, Multiple payment methods, order management, POS integration.",
      imageSrc: "/myshow2.png",
      githubLink: "https://github.com/kazinayeem/myshop-2",
      isFeatured: true,
      isTeamProject: false,
      order: 4,
      technologies: ["Node.js", "MongoDB", "React Native", "Express.js"],
      features: [
        "Web frontend, mobile app (React Native), and admin dashboard",
        "Node.js + MongoDB backend",
        "Multiple payment methods, order management, POS integration",
      ],
    },
  });

  await prisma.project.create({
    data: {
      title: "E-commerce Frontend | React Native",
      shortDescription: "A responsive and modern e-commerce user interface.",
      fullDescription: "A responsive and modern e-commerce user interface with product listing, shopping cart, and user authentication. Key features include: Product listing and detail pages, Shopping cart functionality, User authentication.",
      imageSrc: "/mobile-ecomapp.png",
      githubLink: "https://github.com/kazinayeem/e-commerce-frontend",
      liveLink: "https://your-ecommerce-frontend.vercel.app",
      isFeatured: true,
      isTeamProject: false,
      order: 5,
      technologies: ["React.js", "Tailwind CSS"],
      features: [
        "Product listing and detail pages",
        "Shopping cart functionality",
        "User authentication",
      ],
    },
  });

  await prisma.project.create({
    data: {
      title: "PriceNinja BD",
      shortDescription: "A tool for comparing product prices from various online stores in Bangladesh.",
      fullDescription: "A tool for comparing product prices from various online stores in Bangladesh. Key features include: Real-time price comparisons, Product search and filtering, Alerts for price drops.",
      imageSrc: "/priceninja.png",
      githubLink: "https://github.com/kazinayeem/priceninjabd",
      isFeatured: true,
      isTeamProject: false,
      order: 6,
      technologies: ["Python", "Web Scraping", "Flask"],
      features: [
        "Real-time price comparisons",
        "Product search and filtering",
        "Alerts for price drops",
      ],
    },
  });

  await prisma.project.create({
    data: {
      title: "Media Link Extractor (Chrome Extension)",
      shortDescription: "A browser extension to extract media links from web pages.",
      fullDescription: "A browser extension to extract media links from web pages. Key features include: One-click link extraction, Supports various media types, User-friendly interface.",
      imageSrc: "/medialinkextractor.png",
      githubLink: "https://github.com/kazinayeem/media-link-extractor",
      isFeatured: true,
      isTeamProject: false,
      order: 7,
      technologies: ["JavaScript", "Chrome API"],
      features: [
        "One-click link extraction",
        "Supports various media types",
        "User-friendly interface",
      ],
    },
  });

  await prisma.project.create({
    data: {
      title: "Swipe Onboarding (React Native)",
      shortDescription: "A customizable swipe-through onboarding screen for React Native applications.",
      fullDescription: "A customizable swipe-through onboarding screen for React Native applications. Key features include: Smooth swipe animations, Customizable content and styling, Indicator dots for progress.",
      imageSrc: "/onboarding.png",
      githubLink: "https://github.com/kazinayeem/swipe-onboarding",
      isFeatured: true,
      isTeamProject: false,
      order: 8,
      technologies: ["React Native"],
      features: [
        "Smooth swipe animations",
        "Customizable content and styling",
        "Indicator dots for progress",
      ],
    },
  });

  await prisma.project.create({
    data: {
      title: "QR Code Scanner (React Native)",
      shortDescription: "A simple and efficient QR code scanner built with React Native.",
      fullDescription: "A simple and efficient QR code scanner built with React Native. Key features include: Fast scanning capabilities, Flashlight toggle, History of scanned codes.",
      imageSrc: "/qrcode1.png",
      githubLink: "https://github.com/kazinayeem/qr-code-scanner-rn",
      isFeatured: true,
      isTeamProject: false,
      order: 9,
      technologies: ["React Native"],
      features: [
        "Fast scanning capabilities",
        "Flashlight toggle",
        "History of scanned codes",
      ],
    },
  });

  await prisma.project.create({
    data: {
      title: "E-food UI",
      shortDescription: "A modern and intuitive user interface for a food delivery application.",
      fullDescription: "A modern and intuitive user interface for a food delivery application. Key features include: Browse restaurants and menus, Order tracking, User reviews and ratings.",
      imageSrc: "/food-rn.png",
      githubLink: "https://github.com/kazinayeem/e-food-ui",
      isFeatured: true,
      isTeamProject: false,
      order: 10,
      technologies: ["React.js", "Tailwind CSS"],
      features: [
        "Browse restaurants and menus",
        "Order tracking",
        "User reviews and ratings",
      ],
    },
  });

  await prisma.project.create({
    data: {
      title: "E-commerce UI RN",
      shortDescription: "A clean and functional e-commerce user interface for React Native.",
      fullDescription: "A clean and functional e-commerce user interface for React Native. Key features include: Product display and categories, Shopping cart integration, Responsive design for mobile devices.",
      imageSrc: "/e-com-rn.png",
      githubLink: "https://github.com/kazinayeem/e-commerce-ui-rn",
      isFeatured: true,
      isTeamProject: false,
      order: 11,
      technologies: ["React Native"],
      features: [
        "Product display and categories",
        "Shopping cart integration",
        "Responsive design for mobile devices",
      ],
    },
  });

  // Create Education Entries
  console.log("🎓 Creating education entries...");
  
  await prisma.education.create({
    data: {
      school: "Daffodil International University",
      degree: "Bachelor of Science in Software Engineering",
      year: "2023 - 2027",
      description: "Pursuing a degree focused on software development, design patterns, algorithms, data structures, and advanced programming concepts. Active member of DIU Robotics Club.",
      gpa: "Current Student",
      order: 1,
    },
  });

  await prisma.education.create({
    data: {
      school: "Milestone College",
      degree: "Higher Secondary Certificate (HSC)",
      year: "Completed February 2023",
      description: "Completed higher secondary education with excellent academic performance in Science group. Strong foundation in Mathematics and Computer Science.",
      gpa: "GPA: 5.00",
      order: 2,
    },
  });

  // Create Experience Entries
  console.log("💼 Creating experience entries...");
  
  await prisma.experience.create({
    data: {
      title: "Full Stack Developer",
      company: "BornoSoftware (bornosoftnr.com)",
      year: "July 2025 - Present",
      description: "Building modern web applications using React, Next.js, Node.js, and PostgreSQL. Developing full-stack solutions with focus on user experience, performance optimization, and scalability.",
      order: 1,
    },
  });

  await prisma.experience.create({
    data: {
      title: "Web Executive (Former)",
      company: "DIU Robotics Club",
      year: "2025 - Present",
      description: "Led web development initiatives for the robotics club. Built and maintained club website, managed online presence, and mentored junior members in web technologies.",
      order: 2,
    },
  });

  // Create Achievements
  console.log("🏆 Creating achievements...");
  
  await prisma.achievement.create({
    data: {
      title: "Portfolio Projects",
      description: "Created 5+ full-stack projects demonstrating proficiency in modern web development",
      order: 1,
    },
  });

  await prisma.achievement.create({
    data: {
      title: "Tech Stack Expertise",
      description: "Proficient in JavaScript, TypeScript, React, Next.js, Node.js, MongoDB, PostgreSQL, Docker",
      order: 2,
    },
  });

  await prisma.achievement.create({
    data: {
      title: "Problem Solving",
      description: "Strong analytical skills with experience in algorithm optimization and system design",
      order: 3,
    },
  });

  await prisma.achievement.create({
    data: {
      title: "Continuous Learning",
      description: "Always exploring new technologies and best practices in web development",
      order: 4,
    },
  });

  console.log("✅ Database seeded successfully!");
}

seedDatabase()
  .catch((err) => {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
