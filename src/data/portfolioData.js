// ============================================================
//  Portfolio Configuration
//  Edit everything about this site from this single file.
//  Drop your real photos into /public and update the paths below.
// ============================================================

export const profile = {
  name: "Philip Iorwua Kizito",
  firstName: "Philip",
  lastName: "Iorwua Kizito",
  role: "Full-Stack Engineer",
  location: "Benue, Nigeria · Remote Worldwide",
  email: "terhemeniorwua@gmail.com",
  avatar: "/profile.png",
  status: "Available for Opportunities",
  headline: "Full-Stack Engineer — Crafting Fluid Front-Ends & Scalable Back-Ends.",
  greeting: "Hi, I'm",
  bio: [
    "I design and build end-to-end digital products — pixel-perfect React interfaces on the front, resilient Node.js services and APIs on the back.",
    "With a strong grasp of system architecture, I turn ambiguous ideas into fast, secure, observable platforms that scale without drama.",
  ],
  focus: ["React / Next.js", "Node.js / APIs", "System Architecture"],
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const stats = [
  { value: 6, suffix: "+", label: "Years of Experience" },
  { value: 48, suffix: "+", label: "Projects Completed" },
  { value: 27, suffix: "+", label: "APIs Engineered" },
  { value: 99, suffix: "%", label: "Uptime Ship Rate" },
];

// ------------------------------------------------------------
// Skills — exact set rendered by SkillsSection.jsx (bento grid)
// ------------------------------------------------------------
export const skills = [
  { name: "HTML", category: "Front-end" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "JavaScript", category: "Language" },
  { name: "React", category: "Front-end" },
  { name: "Next.js", category: "Framework" },
  { name: "Node.js", category: "Back-end" },
  { name: "Express", category: "Back-end" },
  { name: "API", category: "Architecture" },
  { name: "Git", category: "Version Control" },
  { name: "GitHub", category: "Platform" },
  { name: "Vercel", category: "Deployment" },
];

// ------------------------------------------------------------
// Tech stack — grouped by category, rendered as animated chips
// ------------------------------------------------------------
export const stack = {
  frontend: {
    label: "Front-End",
    icon: "layout",
    items: ["HTML", "Tailwind CSS", "JavaScript", "React", "Next.js"],
  },
  backend: {
    label: "Back-End",
    icon: "server",
    items: ["Node.js", "Express", "API"],
  },
  tools: {
    label: "Tools & Platforms",
    icon: "wrench",
    items: ["Git", "GitHub", "Vercel"],
  },
};

// ------------------------------------------------------------
// Experience timeline
// ------------------------------------------------------------
export const experience = [
  {
    role: "Senior Full-Stack Engineer",
    company: "Nimbus Labs",
    period: "2023 — Present",
    location: "Remote",
    points: [
      "Own the architecture of a multi-tenant SaaS dashboard serving 40k+ monthly users.",
      "Cut p95 API latency by 62% through query tuning, caching layers and edge deployment.",
      "Mentor a team of 5 engineers; run architecture reviews and hiring loops.",
    ],
  },
  {
    role: "Full-Stack Engineer",
    company: "Paystream",
    period: "2021 — 2023",
    location: "Lagos, NG",
    points: [
      "Built a fintech payment gateway processing $3M+ in monthly volume.",
      "Designed idempotent REST + webhook APIs used by 120+ merchant integrations.",
      "Introduced CI/CD pipelines that cut release time from days to minutes.",
    ],
  },
  {
    role: "Front-End Engineer",
    company: "Craftly Studio",
    period: "2019 — 2021",
    location: "Remote",
    points: [
      "Delivered 20+ high-performance marketing sites and interactive web apps.",
      "Built a shared React component library adopted across 5 product lines.",
      "Improved Lighthouse performance scores from 60s to 95+ on key surfaces.",
    ],
  },
];

// ------------------------------------------------------------
// Featured projects — cards render a live iframe with a
// screenshot fallback. Swap iframeUrl / screenshot per project.
// ------------------------------------------------------------
export const projects = [
  {
    id: "nexora",
    title: "Nexora Analytics",
    description:
      "Real-time analytics platform with streaming dashboards, anomaly detection and role-based multi-workspace access for product teams.",
    tags: ["Next.js", "Node.js", "Express", "PostgreSQL", "Redis"],
    url: "https://nexora.example.com",
    github: "https://github.com/philip/nexora",
    iframeUrl: "https://nexora.example.com",
    screenshot: "/projects/nexora-dashboard.jpg",
    accent: "#06B6D4",
    architecture: [
      "Next.js edge front-end behind a CDN; RSC streaming for dashboard grids.",
      "Microservices: Auth (JWT + refresh rotation), Ingestion (Redis Streams), Query API (read replicas).",
      "Event-sourced analytics events, materialized into pre-aggregated rollup tables by a worker fleet.",
    ],
    endpoints: [
      { method: "POST", path: "/api/v1/events/ingest", desc: "Idempotent event ingestion (batched)" },
      { method: "GET", path: "/api/v1/workspaces/:id/overview", desc: "Aggregated KPI snapshot" },
      { method: "GET", path: "/api/v1/events/stream", desc: "SSE stream for live charts" },
      { method: "PUT", path: "/api/v1/workspaces/:id/members", desc: "Role / membership updates" },
    ],
    schema: [
      { table: "events", columns: ["id", "workspace_id", "type", "payload jsonb", "created_at"] },
      { table: "rollups_hour", columns: ["workspace_id", "dimension", "bucket", "count", "sum"] },
      { table: "workspace_members", columns: ["workspace_id", "user_id", "role", "joined_at"] },
    ],
  },
  {
    id: "flowpay",
    title: "FlowPay Gateway",
    description:
      "PCI-compliant payment orchestration layer connecting 12+ PSPs behind one unified, idempotent API with webhooks and billing automation.",
    tags: ["Node.js", "Express", "PostgreSQL", "Redis", "Stripe"],
    url: "https://flowpay.example.com",
    github: "https://github.com/philip/flowpay",
    iframeUrl: "https://flowpay.example.com",
    screenshot: "/projects/flowpay-api.jpg",
    accent: "#8B5CF6",
    architecture: [
      "Mediator pattern over PSP adapters — one internal model, pluggable providers.",
      "Idempotency keys + outbox pattern guarantee exactly-once side effects.",
      "Webhook dispatcher with per-event retry, exponential backoff and signature validation.",
    ],
    endpoints: [
      { method: "POST", path: "/api/v1/payments", desc: "Create payment intent (idempotency-key)" },
      { method: "GET", path: "/api/v1/payments/:id", desc: "Fetch payment state" },
      { method: "POST", path: "/api/v1/webhooks/psp", desc: "Provider webhook receiver" },
      { method: "POST", path: "/api/v1/refunds", desc: "Idempotent refund against capture" },
    ],
    schema: [
      { table: "payments", columns: ["id", "merchant_id", "amount", "currency", "status", "psp"] },
      { table: "outbox", columns: ["id", "topic", "payload jsonb", "status", "attempts"] },
      { table: "merchants", columns: ["id", "name", "live_key_enc", "webhook_url"] },
    ],
  },
  {
    id: "synthwave",
    title: "Synthwave Store",
    description:
      "Headless commerce storefront with edge rendering, cart micro-engine and one-click checkout — 96 Lighthouse, sub-100ms TTFB.",
    tags: ["Next.js", "Tailwind", "PostgreSQL", "Stripe", "Vercel"],
    url: "https://synthwave.example.com",
    github: "https://github.com/philip/synthwave",
    iframeUrl: "https://synthwave.example.com",
    screenshot: "/projects/synthwave-store.jpg",
    accent: "#EC4899",
    architecture: [
      "Edge-rendered storefront (RSC + partial hydration) backed by a headless catalog API.",
      "Cart keyed by client token in Redis; Stripe Payment Intents for checkout.",
      "Order pipeline via serverless queue: stock reserve → charge → fulfillment webhook.",
    ],
    endpoints: [
      { method: "GET", path: "/api/catalog/products", desc: "Paginated + filterable catalog" },
      { method: "POST", path: "/api/cart/add", desc: "Upsert line item" },
      { method: "POST", path: "/api/checkout/intent", desc: "Create Stripe PaymentIntent" },
      { method: "POST", path: "/api/webhooks/stripe", desc: "Charge succeeded handler" },
    ],
    schema: [
      { table: "products", columns: ["id", "slug", "name", "price_cents", "inventory"] },
      { table: "carts", columns: ["token", "items jsonb", "updated_at"] },
      { table: "orders", columns: ["id", "cart_token", "total", "status", "paid_at"] },
    ],
  },
  {
    id: "dispatch",
    title: "Dispatch Grid",
    description:
      "Ops platform for scheduling field teams — live fleet map, shift auto-rostering and conflict-free assignment via constraint solver.",
    tags: ["Next.js", "NestJS", "GraphQL", "PostgreSQL", "Mapbox"],
    url: "https://dispatch.example.com",
    github: "https://github.com/philip/dispatch",
    iframeUrl: "https://dispatch.example.com",
    screenshot: "/projects/dispatch-grid.jpg",
    accent: "#10B981",
    architecture: [
      "GraphQL BFF aggregating fleet, roster and ticketing microservices.",
      "Constraint-solver job (Redis queue) proposes optimal assignments; managers approve.",
      "Live positions over WebSocket; offline sync via IndexedDB + conflict merge on reconnect.",
    ],
    endpoints: [
      { method: "POST", path: "/graphql", desc: "Queries: fleet, rosters, tickets" },
      { method: "POST", path: "/api/v1/solve", desc: "Trigger roster solver job" },
      { method: "GET", path: "/api/v1/positions/:fleetId", desc: "WS upgrade — live positions" },
    ],
    schema: [
      { table: "agents", columns: ["id", "name", "skillset []", "zone"] },
      { table: "shifts", columns: ["id", "agent_id", "start", "end", "status"] },
      { table: "tickets", columns: ["id", "priority", "zone", "assigned_shift_id"] },
    ],
  },
  {
    id: "lumen",
    title: "Lumen Chat",
    description:
      "Realtime collaboration + chat SDK with presence, typing indicators, read receipts and granular channel permissions.",
    tags: ["React", "Node.js", "WebSockets", "MongoDB", "Redis"],
    url: "https://lumen.example.com",
    github: "https://github.com/philip/lumen",
    iframeUrl: "https://lumen.example.com",
    screenshot: "/projects/lumen-chat.jpg",
    accent: "#3B82F6",
    architecture: [
      "Pub/sub rooms over Redis; WebSocket gateway with backpressure-aware fan-out.",
      "Exactly-once message log in MongoDB with TTL for ephemeral channels.",
      "Presence/typing via ephemeral state, permission checks at the edge config.",
    ],
    endpoints: [
      { method: "POST", path: "/api/v1/channels", desc: "Create channel with options" },
      { method: "GET", path: "/api/v1/channels/:id/messages", desc: "Cursor-paginated history" },
      { method: "GET", path: "/ws", desc: "Socket join: sub, presence, ack" },
    ],
    schema: [
      { table: "channels", columns: ["id", "kind", "config jsonb", "owner_id"] },
      { table: "messages", columns: ["id", "channel_id", "author_id", "body", "ts"] },
      { table: "memberships", columns: ["channel_id", "user_id", "role"] },
    ],
  },
  {
    id: "orbit",
    title: "Orbit HR",
    description:
      "HRIS with payroll automation, leave workflows and an analytics suite — role-scoped dashboards for every department.",
    tags: ["Next.js", "Express", "PostgreSQL", "Prisma", "Docker"],
    url: "https://orbit.example.com",
    github: "https://github.com/philip/orbit",
    iframeUrl: "https://orbit.example.com",
    screenshot: "/projects/orbit-hr.jpg",
    accent: "#A855F7",
    architecture: [
      "Modular monolith with clear bounded contexts: people, payroll, leave, reports.",
      "Workflow engine (state machine) drives approvals with audit trails on every transition.",
      "Idempotent payroll runs; payslips generated as PDFs and streamed to object storage.",
    ],
    endpoints: [
      { method: "POST", path: "/api/v1/employees", desc: "Create employee", },
      { method: "POST", path: "/api/v1/leave/requests", desc: "Open leave request" },
      { method: "POST", path: "/api/v1/payroll/runs", desc: "Trigger idempotent payroll" },
      { method: "GET", path: "/api/v1/reports/headcount", desc: "Headcount analytics" },
    ],
    schema: [
      { table: "employees", columns: ["id", "name", "email", "dept_id", "salary_cents"] },
      { table: "leave_requests", columns: ["id", "emp_id", "type", "from", "to", "state"] },
      { table: "payroll_runs", columns: ["id", "period", "status", "total", "run_at"] },
    ],
  },
];

// ------------------------------------------------------------
// Socials — icon key maps to a renderer in SocialLinks.jsx.
// Gmail uses type:"email" (click-to-copy + mailto).
// ------------------------------------------------------------
export const socials = [
  { key: "x", name: "X (Twitter)", handle: "@philipdev", url: "https://x.com/PIorwua12080", color: "#0f1419" },
  { key: "facebook", name: "Facebook", handle: "philip.johnson", url: "https://www.facebook.com/philip.iorwua.9", color: "#1877F2" },
  { key: "gmail", name: "Gmail", handle: profile.email, url: `mailto:${profile.email}`, type: "email", color: "#EA4335" },
  { key: "whatsapp", name: "WhatsApp", handle: "+234 800 000 0000", url: "https://wa.me/09166354571", color: "#25D366" },
  { key: "telegram", name: "Telegram", handle: "@philipdev", url: "https://web.telegram.org/k/", color: "#26A5E4" },
  { key: "github", name: "GitHub", handle: "philip", url: "https://github.com/terhemeniorwua-png", color: "#ffffff" },
  { key: "linkedin", name: "LinkedIn", handle: "philip-iorwua", url: "https://www.linkedin.com/in/terhemen-iorwua-0b3bb23a9/", color: "#0A66C2" },
];

// ------------------------------------------------------------
// Terminal commands (see TerminalDrawer.jsx)
// ------------------------------------------------------------
export const terminal = {
  prompt: "visitor@philipportfolio",
  cwd: "~",
};

// Health endpoint consumed by the footer status widget.
export const health = {
  endpoint: "/api/health",
  label: "Node.js API",
};