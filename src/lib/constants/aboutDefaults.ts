/**
 * Default content for the public /about page.
 *
 * Used as:
 *  - seed data when the Firestore settings document does not exist yet
 *  - fallback when an existing settings document has no `aboutPage` / `careerTimeline` data
 *
 * Everything here is editable from Admin → Settings → "About Page" (and "Profile" for the timeline).
 */

export const ABOUT_ICON_NAMES = [
  "Terminal",
  "Layers",
  "Database",
  "Cog",
  "Box",
  "Wrench",
  "ShieldCheck",
  "Zap",
  "Code",
  "Server",
  "Cpu",
  "Globe",
  "Smartphone",
  "PenTool",
  "Rocket",
  "Lock",
] as const;

export type AboutIconName = (typeof ABOUT_ICON_NAMES)[number];

export const DEFAULT_ABOUT_PAGE = {
  profileEyebrow: { id: "01 // PROFIL PRIBADI", en: "01 // PERSONAL PROFILE" },
  architecturePrinciple: "Sovereign • Deterministic",

  capabilitiesEyebrow: { id: "02 // KAPABILITAS INTI", en: "02 // CORE CAPABILITIES" },
  capabilitiesTitle: {
    id: "Disiplin yang Dirancang untuk Keandalan Harian.",
    en: "Disciplines Engineered for Daily Reliability.",
  },
  capabilitiesSubtitle: {
    id: "Matriks kapabilitas seimbang yang menggabungkan pengembangan aplikasi cepat, pemodelan data yang tangguh, dan delivery produk yang disiplin.",
    en: "A balanced capability matrix combining high-velocity application development, resilient data modeling, and rigorous product delivery.",
  },
  capabilities: [
    {
      icon: "Terminal",
      title: { id: "Aplikasi Web Full-Stack", en: "Full-Stack Web Applications" },
      description: {
        id: "Arsitektur produksi dengan Next.js App Router, React Server Components, TypeScript strict mode, dan hidrasi data yang presisi untuk responsivitas maksimal.",
        en: "Production architectures using Next.js App Router, React Server Components, TypeScript strict mode, and fine-grained data hydration for peak responsiveness.",
      },
      tags: ["Next.js", "TypeScript", "Server Actions"],
    },
    {
      icon: "Layers",
      title: { id: "UI/UX & Design System", en: "UI/UX & Design Systems" },
      description: {
        id: "Fondasi design token yang sistematis, primitive aksesibilitas headless dengan Radix UI, utilitas Tailwind CSS, dan nol perbedaan visual antara desain dan kode.",
        en: "Systematic design token foundations, headless accessibility primitives with Radix UI, Tailwind CSS utilities, and zero visual drift between design and code.",
      },
      tags: ["Tailwind CSS", "shadcn/ui", "Radix UI"],
    },
    {
      icon: "Database",
      title: { id: "Data & Sistem Informasi", en: "Data & Information Systems" },
      description: {
        id: "Koleksi NoSQL (Firestore) dan skema relasional (Postgres) yang teroptimasi. Migrasi data batch, optimasi biaya query, dan audit logging yang solid.",
        en: "Optimized NoSQL collections (Firestore) and relational schemas (Postgres). Batch data migrations, query cost optimization, and robust audit logging.",
      },
      tags: ["Firestore", "PostgreSQL", "Zod Schemas"],
    },
    {
      icon: "Cog",
      title: { id: "Internal Tools & Admin", en: "Internal Tools & Admin" },
      description: {
        id: "Workflow engine birokrasi, manajemen siklus dokumen kepegawaian, kontrol akses berbasis peran (RBAC), dan kalkulasi penilaian kinerja ASN.",
        en: "Bureaucratic workflow engines, employee dossier lifecycle management, granular role-based access controls (RBAC), and civil-service appraisal calculations.",
      },
      tags: ["SIMPEG Tools", "Audit Trails", "RBAC Security"],
    },
    {
      icon: "Box",
      title: { id: "Produk Software Siap Pakai", en: "Packaged Software Products" },
      description: {
        id: "Software turnkey yang dikirim sebagai paket single-tenant siap pakai. Deployment Docker yang mudah, harga transparan, dan kepemilikan source code terjamin.",
        en: "Turnkey software delivered as pre-configured single-tenant packages. Easy Docker container deployment with transparent pricing and guaranteed source sovereignty.",
      },
      tags: ["Docker", "Self-Hosted", "Single-Tenant"],
    },
    {
      icon: "Wrench",
      title: { id: "Pemecahan Masalah Teknis", en: "Technical Problem Solving" },
      description: {
        id: "Merapikan codebase legacy yang berantakan, reverse-engineering format data, optimasi query SQL yang lambat, dan migrasi database tanpa downtime.",
        en: "Untangling messy legacy codebases, reverse-engineering unverified data formats, optimizing slow SQL queries, and zero-downtime database migrations.",
      },
      tags: ["Data Cutovers", "Refactoring", "Performance"],
    },
  ],

  timelineEyebrow: { id: "03 // PERJALANAN KARIER", en: "03 // CAREER TIMELINE" },
  timelineTitle: { id: "Pengalaman Profesional & Peran.", en: "Professional Experience & Roles." },
  timelineStackLabel: { id: "Stack Utama", en: "Key Stack" },
  timelineCurrentLabel: { id: "Saat Ini", en: "Current" },

  ctaEyebrow: { id: "MULAI DISKUSI", en: "INITIATE DIALOGUE" },
  ctaTitle: {
    id: "Punya Sistem, Workflow, atau Bottleneck Operasional yang Perlu Diselesaikan?",
    en: "Have a System, Workflow, or Operational Bottleneck to Solve?",
  },
  ctaDescription: {
    id: "Baik Anda butuh platform web administratif custom, workflow engine yang dapat diaudit, atau ingin men-deploy salah satu produk digital saya—mari bahas kebutuhan Anda secara langsung.",
    en: "Whether you need a custom administrative web platform, an auditable workflow engine, or want to deploy one of my packaged digital products—let's examine your requirements directly.",
  },
  ctaButtonLabel: { id: "Mulai Konsultasi", en: "Start Consultation" },
  ctaButtonHref: "/contact",
};

export type AboutPageContent = typeof DEFAULT_ABOUT_PAGE;

export const DEFAULT_LONG_BIO = {
  id: "Saya membangun produk digital dan sistem administrasi praktis yang menyelesaikan bottleneck operasional nyata. Alih-alih memperlakukan kode sebagai output yang terisolasi, saya mendekati engineering lewat product thinking—mengidentifikasi akar masalah dalam operasional harian dan merancang software yang benar-benar nyaman dipakai tim.\n\nPekerjaan saya mencakup portal fakultas enterprise, validasi presensi otomatis, utility engine self-hosted, dan design system UI/UX yang komprehensif.\n\nSaya percaya software harus tenang, dapat diandalkan, dan kokoh secara struktur. Setiap baris TypeScript dirancang untuk bertahan di skala operasional tanpa overhead berlebih atau ketergantungan vendor pihak ketiga.",
  en: "I build practical digital products and administrative systems that solve real operational bottlenecks. Rather than treating code as an isolated output, I approach engineering through product thinking—identifying the root problems in daily operations and crafting software that teams actually enjoy using.\n\nMy work spans enterprise faculty portals, automated attendance validation, self-hosted utility engines, and comprehensive UI/UX design systems.\n\nI believe software should be quiet, dependable, and structurally sound. Every line of TypeScript is drafted to survive operational scale without excessive overhead or third-party vendor bloat.",
};

export const DEFAULT_CAREER_TIMELINE = [
  {
    period: "2023 — Present",
    role: {
      id: "Lead Systems Engineer & Konsultan Independen",
      en: "Lead Systems Engineer & Independent Consultant",
    },
    organization: {
      id: "Praktik Independen // Sistem Institusional",
      en: "Independent Practice // Institutional Systems",
    },
    label: "",
    isCurrent: true,
    description: {
      id: "Merancang dan mengirimkan infrastruktur administrasi dan verifikasi presensi untuk institusi pendidikan daerah dan instansi sektor publik. Membangun portal geofencing biometrik, pipeline arsip dokumen, dan software administrasi self-hosted yang patuh regulasi.",
      en: "Architecting and shipping specialized administrative and attendance verification infrastructure for regional educational institutions and public sector agencies. Engineered customized biometric geofencing portals, document archival pipelines, and self-hosted turnkey administrative software with strict regulatory compliance.",
    },
    stack: ["Next.js", "Firestore", "Docker", "PostgreSQL"],
  },
  {
    period: "2022 — 2023",
    role: { id: "Full-Stack Software Engineer", en: "Full-Stack Software Engineer" },
    organization: {
      id: "Digital Systems Group // Production Engineering",
      en: "Digital Systems Group // Production Engineering",
    },
    label: "Enterprise Services",
    isCurrent: false,
    description: {
      id: "Membangun portal web internal dengan konkurensi tinggi, aplikasi Next.js, dan pipeline sinkronisasi database. Memimpin redesain model data di Firebase Firestore, mengatasi read cascade dan menurunkan biaya query cloud hingga 40% dengan latensi tetap di bawah satu detik.",
      en: "Built high-concurrency internal web portals, Next.js applications, and database synchronization pipelines. Spearheaded complete data model redesigns on Firebase Firestore, resolving collection read cascades and reducing cloud query billing by 40% while maintaining sub-second query latency under peak load.",
    },
    stack: ["React / Next.js", "Firebase", "Node.js", "TypeScript"],
  },
  {
    period: "2021 — 2022",
    role: { id: "Frontend & UI Systems Developer", en: "Frontend & UI Systems Developer" },
    organization: { id: "Software Development Lab", en: "Software Development Lab" },
    label: "UI Architecture",
    isCurrent: false,
    description: {
      id: "Membangun library komponen terstandar, antarmuka web yang aksesibel, dan dashboard administrasi responsif menggunakan Tailwind CSS, React, dan TypeScript. Menyusun sistem tipografi, hierarki elevasi yang konsisten, dan mengurangi ukuran bundle di berbagai portal klien.",
      en: "Engineered standardized component design libraries, accessible web interfaces, and responsive administrative dashboards using Tailwind CSS, React, and TypeScript. Codified typography systems, consistent elevation hierarchies, and reduced bundle weights across client portals.",
    },
    stack: ["Tailwind CSS", "React", "Figma Tokens", "PHP"],
  },
];
