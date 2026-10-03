// ============================================================
//  Portfolio Configuration — Philip Iorwua Kizito
//  Single source of truth. Edit here, reflects everywhere.
// ============================================================

export const profile = {
  name: "Philip Iorwua Kizito",
  firstName: "Philip",
  lastName: "Iorwua",
  role: "Full-Stack Web Developer",
  location: "Benue, Nigeria · Remote Available",
  email: "terhemeniorwua@gmail.com",
  avatar: "/profile.png",
  status: "Open to Opportunities",
  headline: "Building modern web experiences from interface to infrastructure.",
  subheadline:
    "I build complete web applications — React frontends, Node.js APIs, JWT authentication, PostgreSQL databases, and everything in between.",
  greeting: "Hi, I'm",
  bio: [
    "I'm a full-stack web developer who builds complete, working web applications. That means React interfaces people actually enjoy using, Node.js APIs that are structured and secure, and PostgreSQL databases that stay reliable.",
    "I learned by building — real projects, real problems, real code. Every project in this portfolio is something I designed, built, and deployed.",
  ],
  githubUrl: "https://github.com/terhemeniorwua-png",
  linkedinUrl: "https://www.linkedin.com/in/terhemen-iorwua-0b3bb23a9/",
};

// ------------------------------------------------------------
// Navigation
// ------------------------------------------------------------
export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

// ------------------------------------------------------------
// Skills — four accurate categories
// ------------------------------------------------------------
export const skillCategories = [
  {
    id: "frontend",
    number: "01",
    label: "Frontend",
    description: "Building interfaces people actually use — responsive, accessible, and fast.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
    icon: "layout",
  },
  {
    id: "backend",
    number: "02",
    label: "Backend",
    description: "REST APIs, authentication, authorization, validation, and business logic.",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT", "bcrypt", "Middleware", "Validation"],
    icon: "server",
  },
  {
    id: "database",
    number: "03",
    label: "Database",
    description: "Relational and document databases — schema design, queries, and ORMs.",
    skills: ["PostgreSQL", "SQL", "Sequelize", "MongoDB"],
    icon: "database",
  },
  {
    id: "tools",
    number: "04",
    label: "Tools",
    description: "The workflow, deployment, and testing tools that keep projects shipping.",
    skills: ["Git", "GitHub", "Postman", "Thunder Client", "Vercel", "Render"],
    icon: "wrench",
  },
];

// ------------------------------------------------------------
// Tech stack — interconnected system display
// ------------------------------------------------------------
export const stackLayers = [
  { label: "React / Next.js", sublabel: "UI Layer", color: "cobalt" },
  { label: "Node.js / Express", sublabel: "API Layer", color: "charcoal" },
  { label: "JWT / bcrypt", sublabel: "Auth Layer", color: "charcoal" },
  { label: "PostgreSQL / MongoDB", sublabel: "Data Layer", color: "charcoal" },
  { label: "Vercel / Render", sublabel: "Deploy Layer", color: "sand" },
];

// ------------------------------------------------------------
// Projects — only real projects with real links
// ------------------------------------------------------------
export const projects = [
  {
    id: "kwaye",
    title: "Kwaye Foundation",
    category: "Frontend",
    tagline: "A modern NGO platform for community impact.",
    description:
      "A redesigned and improved frontend for the Kwaye Foundation — a non-governmental organisation focused on community development. Built with Next.js and Tailwind CSS for performance and accessibility.",
    tags: ["Next.js", "Tailwind CSS", "JavaScript", "Vercel"],
    url: "https://kwaye-foundation.vercel.app/",
    github: "https://github.com/terhemeniorwua-png/_kwayeFoundation_.git",
    screenshot: "/kwaye.png",
    accent: "#2457D6",
    featured: false,
    highlights: [
      "Responsive design across all device sizes",
      "Clean information architecture for NGO content",
      "Deployed on Vercel with optimized performance",
    ],
  },
  {
    id: "pcp",
    title: "PCP Party",
    category: "Frontend",
    tagline: "A modern political party web presence.",
    description:
      "A modern website for a fictional Nigerian political party. Built with Next.js, Tailwind CSS, and JavaScript, featuring a localStorage-powered admin dashboard for content management.",
    tags: ["Next.js", "Tailwind CSS", "JavaScript", "localStorage"],
    url: "https://pcp-party.vercel.app/",
    github: "https://github.com/terhemeniorwua-png/pcp_party.git",
    screenshot: "/pcp.png",
    accent: "#173B91",
    featured: false,
    highlights: [
      "Client-side admin dashboard using localStorage",
      "Fully responsive layout for political party use case",
      "Clean navigation and content presentation",
    ],
  },
  {
    id: "mediconnect",
    title: "MediConnect",
    category: "Frontend",
    tagline: "A telehealth and healthcare platform frontend.",
    description:
      "A healthcare/telehealth frontend built with Next.js. Designed to communicate trust and accessibility — featuring appointment flows, service presentation, and a clean medical UI.",
    tags: ["Next.js", "Tailwind CSS", "JavaScript", "Vercel"],
    url: "https://mediconnect-sage-nine.vercel.app/",
    github: "https://github.com/terhemeniorwua-png/_mediconnect_.git",
    screenshot: "/medi.png",
    accent: "#2457D6",
    featured: false,
    highlights: [
      "Healthcare-focused UI with appropriate trust signals",
      "Service listing and appointment presentation",
      "Responsive across mobile and desktop",
    ],
  },
];

// ------------------------------------------------------------
// Journey milestones — authentic learning progression
// ------------------------------------------------------------
export const journey = [
  {
    id: "html-css",
    phase: "Foundation",
    title: "HTML & CSS",
    description:
      "Started with the fundamentals. Built static pages, learned layout, worked through responsive design and Flexbox/Grid.",
    skills: ["HTML", "CSS", "Responsive Design", "Flexbox", "Grid"],
  },
  {
    id: "javascript",
    phase: "Language",
    title: "JavaScript",
    description:
      "Learned the language properly — DOM manipulation, async/await, Fetch API, ES6+. Built interactive UIs without frameworks first.",
    skills: ["JavaScript", "DOM", "Fetch API", "ES6+", "Async/Await"],
  },
  {
    id: "react",
    phase: "Frontend Framework",
    title: "React",
    description:
      "Moved to component-based development. Learned state management, hooks, routing with React Router, and building real UI systems.",
    skills: ["React", "Hooks", "State", "React Router", "Components"],
  },
  {
    id: "nextjs",
    phase: "Full Framework",
    title: "Next.js",
    description:
      "Adopted Next.js for file-based routing, SSR, SSG, and API routes. Built and deployed several production-ready frontends.",
    skills: ["Next.js", "SSR", "SSG", "Tailwind CSS", "Vercel"],
  },
  {
    id: "backend",
    phase: "Backend",
    title: "Node.js & Express",
    description:
      "Moved to the server. Built REST APIs with Express, implemented middleware, handled validation, and structured backend projects properly.",
    skills: ["Node.js", "Express.js", "REST APIs", "Middleware", "Validation"],
  },
  {
    id: "auth",
    phase: "Security",
    title: "Authentication & Authorization",
    description:
      "Implemented JWT-based authentication, password hashing with bcrypt, protected routes, and role-based authorization systems.",
    skills: ["JWT", "bcrypt", "Auth Middleware", "RBAC", "Security"],
  },
  {
    id: "database",
    phase: "Data Layer",
    title: "PostgreSQL & MongoDB",
    description:
      "Learned relational and document databases. SQL queries, schema design, Sequelize ORM, and MongoDB with Mongoose.",
    skills: ["PostgreSQL", "SQL", "Sequelize", "MongoDB", "Schema Design"],
  },
  {
    id: "fullstack",
    phase: "Full-Stack",
    title: "Complete Applications",
    description:
      "Now building complete applications end to end — from UI to API to database to deployment. Every project ships with real functionality.",
    skills: ["Full-Stack", "Deployment", "Render", "Vercel", "Git"],
  },
];

// ------------------------------------------------------------
// Socials — real links only
// ------------------------------------------------------------
export const socials = [
  {
    key: "github",
    name: "GitHub",
    handle: "terhemeniorwua-png",
    url: "https://github.com/terhemeniorwua-png",
  },
  {
    key: "linkedin",
    name: "LinkedIn",
    handle: "terhemen-iorwua",
    url: "https://www.linkedin.com/in/terhemen-iorwua-0b3bb23a9/",
  },
  {
    key: "gmail",
    name: "Email",
    handle: profile.email,
    url: `mailto:${profile.email}`,
    type: "email",
  },
  {
    key: "x",
    name: "X (Twitter)",
    handle: "@PIorwua12080",
    url: "https://x.com/PIorwua12080",
  },
  {
    key: "whatsapp",
    name: "WhatsApp",
    handle: "WhatsApp",
    url: "https://wa.me/2349166354571",
  },
  {
    key: "telegram",
    name: "Telegram",
    handle: "@philipdev",
    url: "https://web.telegram.org/k/",
  },
];

// ------------------------------------------------------------
// Terminal drawer
// ------------------------------------------------------------
export const terminal = {
  prompt: "philip@portfolio",
  cwd: "~",
};

// Health endpoint
export const health = {
  endpoint: "/api/health",
  label: "API Status",
};
