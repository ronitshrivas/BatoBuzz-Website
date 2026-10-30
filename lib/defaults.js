// -------------------------------------------------------------------------
// Default / seed content for the whole BatoBuzz website.
//
// Every section of the site reads from this object UNLESS Firestore has a
// saved copy (edited through /admin), in which case the saved copy wins.
// Use the "Load default content into Firebase" button in the admin panel to
// copy this into Firestore as your starting point, then edit from there.
//
// Logos reference the open-source Devicon CDN so the tech stack shows real
// framework marks. You can swap any logo URL in the admin panel.
// -------------------------------------------------------------------------

const ICON = (slug) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}.svg`;

export const defaultContent = {
  brand: {
    name: "BatoBuzz",
    sub: "BatoBuzz Technology",
    tagline: "Software, web, mobile and complete IT solutions, built in Nepal.",
  },

  hero: {
    badges: ["Based in Nepal", "Serving clients worldwide", "Full-stack studio"],
    title: "We build software, apps and digital systems that run businesses",
    lead: "BatoBuzz Technology is a full-stack product studio. From mobile and web apps to backends, networking, digital marketing and complete IT solutions, we design and ship systems that real businesses rely on every day.",
    primaryCta: { label: "Start a project", href: "#contact" },
    secondaryCta: { label: "View our work", href: "#projects" },
    chips: [
      { name: "Flutter", logo: ICON("flutter/flutter-original") },
      { name: "React Native", logo: ICON("react/react-original") },
      { name: ".NET", logo: ICON("dotnetcore/dotnetcore-original") },
      { name: "Next.js", logo: ICON("nextjs/nextjs-original") },
      { name: "Firebase", logo: ICON("firebase/firebase-plain") },
      { name: "Figma", logo: ICON("figma/figma-original") },
    ],
  },

  // Credibility / expertise / experience (the "Why BatoBuzz" band).
  credibility: {
    eyebrow: "Credibility, expertise, experience",
    title: "A team that has shipped real products, not just demos",
    lead: "We do not only write code. We plan the full system, build it end to end, and keep it running in production for real users.",
    points: [
      {
        icon: "layers",
        title: "We architect before we build",
        text: "User roles, data flows, permissions and business logic are mapped first, so what we ship holds up in the real world.",
      },
      {
        icon: "rocket",
        title: "Production, not prototypes",
        text: "Our apps are live on the Play Store and App Store and used by real customers and merchants every day.",
      },
      {
        icon: "grad",
        title: "We teach what we do",
        text: "Our team runs hands-on developer workshops for students in Nepal, so we stay sharp on the tools we ship with.",
      },
      {
        icon: "shield",
        title: "Trusted with serious work",
        text: "From multi-vendor marketplaces to security software for institutions, clients trust us with systems that matter.",
      },
      {
        icon: "web",
        title: "Full-stack, in house",
        text: "Frontend, mobile, backend, database, networking and infrastructure. One team owns the whole product.",
      },
      {
        icon: "chart",
        title: "Built for outcomes",
        text: "We focus on results, revenue, efficiency and growth, not just features that look good in a screenshot.",
      },
    ],
  },

  stats: [
    { num: "10+", label: "Products shipped" },
    { num: "4+", label: "Live apps" },
    { num: "6+", label: "Product ecosystems" },
    { num: "100%", label: "Full-stack, in house" },
  ],

  services: {
    eyebrow: "What we do",
    title: "Complete IT solutions, under one roof",
    lead: "From the first idea to launch and growth, we cover every layer a modern business needs.",
    items: [
      {
        icon: "backend",
        title: "Software Development",
        text: "Custom business software, management systems and backends built with .NET, Node.js and Firebase.",
      },
      {
        icon: "web",
        title: "Web App Development",
        text: "Fast, responsive websites and web apps built with Next.js, React and modern tooling.",
      },
      {
        icon: "mobile",
        title: "Mobile App Development",
        text: "Cross-platform iOS and Android apps with Flutter and React Native, shipped to the stores.",
      },
      {
        icon: "megaphone",
        title: "Digital Marketing",
        text: "Social media, SEO, content and campaigns that put your product in front of the right people.",
      },
      {
        icon: "cloud",
        title: "Networking & Infrastructure",
        text: "Network design, setup and maintenance, plus cloud and server infrastructure for your operations.",
      },
      {
        icon: "pen",
        title: "UI / UX Design",
        text: "Clean, user-first interfaces and design systems, planned in Figma before a line of code is written.",
      },
      {
        icon: "backend",
        title: "Backend & Cloud",
        text: "APIs, authentication, databases, realtime data and storage, built to scale with your business.",
      },
      {
        icon: "wrench",
        title: "IT Solutions & Consulting",
        text: "End-to-end IT support, system planning and technical consulting for teams of any size.",
      },
    ],
  },

  products: {
    eyebrow: "Our products",
    title: "Apps we build and run",
    lead: "Our own products, live on the stores and used by real people.",
    items: [
      {
        name: "myBaato",
        role: "Customer app",
        description:
          "The customer-facing app of our hyper-local marketplace and directory. Discover local businesses, products and services, all in one place.",
        tags: ["Flutter", "Firebase", "Marketplace"],
        playStoreLive: true,
        appStoreLive: false,
        playStoreUrl: "https://play.google.com/store/apps/details?id=com.batobuzz.user",
        appStoreUrl: "",
      },
      {
        name: "myBaato Merchant",
        role: "Merchant app",
        description:
          "The merchant side of myBaato. Businesses manage their listings, products, orders and customers from one dashboard in their pocket.",
        tags: ["Flutter", "Firebase", "Merchant tools"],
        playStoreLive: true,
        appStoreLive: true,
        playStoreUrl: "https://play.google.com/store/apps/details?id=com.batobuzz.merchant",
        appStoreUrl: "https://apps.apple.com/us/app/mybaato-merchant/id6811538118",
      },
    ],
  },

  projects: {
    eyebrow: "Selected work",
    title: "Projects by category",
    lead: "From personal brands and business websites to enterprise systems and learning platforms, each project is built with clear purpose and long-term value.",
    items: [
      {
        category: "Enterprise",
        name: "BatoBuzz",
        role: "Product ecosystem",
        description:
          "A hyper-local advertisement platform and local directory for Nepal. We designed the full product ecosystem: user app, merchant app, franchise system and super admin.",
        outcome:
          "End-to-end product ecosystem with connected platforms and a multi-role admin system.",
        tags: ["Flutter", "Firebase", "Admin dashboard", "System architecture"],
        url: "",
      },
      {
        category: "Individuals",
        name: "BeckyPinder.com.au",
        role: "Personal brand website",
        description:
          "A clean, trust-building personal brand website for an Australia-based service provider. Designed to present services, build credibility and convert visitors into clients.",
        outcome:
          "Established a professional online presence that reflects the brand and drives client enquiries.",
        tags: ["React", "Tailwind CSS", "SEO"],
        url: "https://beckypinder.com.au",
      },
      {
        category: "Businesses",
        name: "KandK Tax",
        role: "Business website",
        description:
          "A professional accounting and business services website built to present services, build trust and convert visitors into clients.",
        outcome:
          "Helped a local accounting business establish a credible online presence that generates client enquiries.",
        tags: ["React", "Tailwind CSS", "Conversion"],
        url: "",
      },
      {
        category: "Learning",
        name: "LearnCCNA.space",
        role: "Educational platform",
        description:
          "A learning platform for networking and CCNA students with structured modules, quizzes, a subnet calculator, interview prep and progress tracking for the CCNA 200-301 certification.",
        outcome:
          "Helps students prepare for networking certification with structured content and interactive tools.",
        tags: ["React", "Educational platform", "Interactive tools"],
        url: "https://learnccna.space",
      },
    ],
  },

  techStack: {
    eyebrow: "Technology",
    title: "Every tool has a purpose",
    lead: "We choose technologies based on what the product needs, not on trends. Each tool serves a specific role in the system.",
    groups: [
      {
        label: "Mobile",
        items: [
          { name: "Flutter", logo: ICON("flutter/flutter-original") },
          { name: "Dart", logo: ICON("dart/dart-original") },
          { name: "React Native", logo: ICON("react/react-original") },
          { name: "Java", logo: ICON("java/java-original") },
        ],
      },
      {
        label: "Web & Frontend",
        items: [
          { name: "React", logo: ICON("react/react-original") },
          { name: "Next.js", logo: ICON("nextjs/nextjs-original") },
          { name: "Node.js", logo: ICON("nodejs/nodejs-original") },
        ],
      },
      {
        label: "Backend & Data",
        items: [
          { name: ".NET", logo: ICON("dotnetcore/dotnetcore-original") },
          { name: "Firebase", logo: ICON("firebase/firebase-plain") },
          { name: "Supabase", logo: ICON("supabase/supabase-original") },
        ],
      },
      {
        label: "IT & Growth",
        items: [
          { name: "System Administration", logo: ICON("linux/linux-original") },
          { name: "Networking", logo: "" },
          { name: "Digital Marketing", logo: "" },
        ],
      },
    ],
  },

  process: {
    eyebrow: "Process",
    title: "From rough idea to launch-ready system",
    lead: "A clear step-by-step process. No confusion. Direct work from discovery to delivery.",
    steps: [
      { time: "1-2 days", title: "Discovery", text: "Understand the business, users and the real problem we are solving." },
      { time: "2-4 days", title: "Planning & Architecture", text: "Map roles, features, data structure, user flows and technical direction." },
      { time: "3-7 days", title: "Design", text: "Create clean UI/UX layouts, wireframes and premium interface direction." },
      { time: "2-6 weeks", title: "Development", text: "Build the product with Flutter, .NET, Firebase, Next.js and more." },
      { time: "3-7 days", title: "Testing & Refinement", text: "Review flows, fix issues and make sure the product works reliably." },
      { time: "Ongoing", title: "Launch & Support", text: "Prepare for real users, improve based on feedback and support future growth." },
    ],
  },

  team: {
    eyebrow: "Our team",
    title: "The people behind BatoBuzz",
    lead: "A small, senior team that plans, builds and ships together.",
    members: [
      {
        name: "Manish Pokharel",
        role: "Founder, System Architect & Product Planner",
        level: 1,
        bio: "Founder and system architect. He maps the full product, roles, data flows and screens before the build begins.",
        tags: ["System architecture", "Product planning", "Leadership"],
        photo: "",
        linkedin: "",
      },
      {
        name: "Prashant Sharma",
        role: "Lead Flutter Developer",
        level: 2,
        bio: "Leads Flutter development across our mobile products, from architecture through to the stores.",
        tags: ["Flutter", "Firebase", "Mobile"],
        photo: "",
        linkedin: "",
      },
      {
        name: "Ronit",
        role: "Flutter & .NET Developer",
        level: 3,
        bio: "Full-stack developer building across Flutter and .NET.",
        tags: ["Flutter", ".NET", "Full-stack"],
        photo: "",
        linkedin: "",
      },
      {
        name: "Brajesh Gupta",
        role: "Project Manager & .NET Developer",
        level: 3,
        bio: "Keeps projects on track and builds reliable .NET backends.",
        tags: ["Project management", ".NET", "Backend"],
        photo: "",
        linkedin: "",
      },
      {
        name: "Bibek Parajuli",
        role: "Sales & Marketing Head",
        level: 3,
        bio: "Leads sales and marketing, connecting our products with the right people.",
        tags: ["Sales", "Marketing", "Growth"],
        photo: "",
        linkedin: "",
      },
    ],
  },

  gallery: {
    eyebrow: "Gallery",
    title: "Moments from our work and workshops",
    lead: "Building products, teaching developers and growing the tech community in Nepal.",
    items: [
      { caption: "Developer workshop", image: "" },
      { caption: "Team planning session", image: "" },
      { caption: "Shipping day", image: "" },
      { caption: "Community meetup", image: "" },
    ],
  },

  quote: {
    text: "We do not just deliver projects. We build systems that keep working long after launch, and we grow with the businesses that trust us.",
    author: "BatoBuzz Technology",
    role: "Our promise",
  },

  faq: {
    eyebrow: "FAQ",
    title: "Questions we hear a lot",
    items: [
      { q: "What kind of projects do you take on?", a: "Mobile apps, web apps, business software, backends, networking and complete IT solutions. If it is digital and it needs to work reliably, we can build it." },
      { q: "Do you work with clients outside Nepal?", a: "Yes. We are based in Nepal and work remotely with clients worldwide, with clear communication and regular updates." },
      { q: "Can you take over an existing project?", a: "Yes. We regularly pick up existing foundations and take them to a production-ready launch." },
      { q: "How do we get started?", a: "Send us a message with what you are building. The first conversation is free and focused on understanding your idea." },
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: "Have a project in mind? Let us talk.",
    lead: "Tell us what you are building and we will tell you how we would approach it. The first consultation is free, no commitment, just a clear conversation about your idea.",
    email: "batobuzz@gmail.com",
    location: "Inaruwa, Koshi Province 56710, Nepal",
    phones: [],
    mapLat: 26.6068,
    mapLng: 87.1478,
    mapZoom: 15,
  },

  about: {
    eyebrow: "About",
    title: "We design digital systems that run businesses",
    paragraphs: [
      "BatoBuzz Technology is a full-stack product studio based in Inaruwa, Nepal. Since our start we have worked across mobile apps, web apps, business software, backends and complete IT solutions for clients in Nepal and beyond.",
      "Before development begins, we map the full system: who the users are, what roles they need, how data flows, what screens are required and how the business operates behind the interface. This is what separates a product that works from one that just looks good.",
      "We have shipped production apps to the Play Store and App Store, built multi-vendor marketplaces and management systems, and delivered security software for serious institutions. We also teach: our team runs hands-on developer workshops for students in Nepal.",
    ],
  },

  careers: {
    eyebrow: "Careers",
    title: "Build the future of tech in Nepal with us",
    lead: "We are always looking for talented people. If you do not see a role that fits right now, send us your CV and tell us what you would like to work on.",
    openLabel: "Open positions",
    jobs: [
      // Each job: { title, type, location, description }
      // Add openings here or from the admin panel. When this list is empty,
      // the section shows the open-application (send your CV) state.
    ],
    noVacancyTitle: "No open roles right now",
    noVacancyText: "We do not have open positions at the moment, but we are always happy to hear from great people. Send your CV and the role you are interested in, and we will reach out when something opens up.",
  },

  successStories: {
    eyebrow: "Success stories",
    title: "Results we are proud of",
    lead: "Real outcomes from products we have designed, built and shipped.",
    items: [
      {
        client: "myBaato",
        title: "A hyper-local marketplace, live on the stores",
        story: "We designed and shipped the myBaato customer and merchant apps end to end, from architecture to the Play Store and App Store.",
        result: "Live apps used by real customers and merchants every day.",
        image: "",
        url: "",
      },
      {
        client: "BatoBuzz ecosystem",
        title: "A connected multi-platform product",
        story: "User app, merchant app and a multi-role super admin system, planned as one coherent ecosystem.",
        result: "A single product with connected platforms and role-based access.",
        image: "",
        url: "",
      },
      {
        client: "LearnCCNA.space",
        title: "A learning platform for networking students",
        story: "Structured modules, quizzes, a subnet calculator and progress tracking for CCNA 200-301 students.",
        result: "Helps students prepare for certification with interactive tools.",
        image: "",
        url: "https://learnccna.space",
      },
    ],
  },

  testimonials: {
    eyebrow: "Testimonials",
    title: "What clients say",
    lead: "A few words from the people we have built with.",
    items: [
      { quote: "BatoBuzz took our idea and shipped a product our customers actually use. Clear communication the whole way through.", author: "Add your client name", role: "Founder, Company", photo: "" },
      { quote: "They planned the whole system first, then built it properly. It just works, and it keeps working.", author: "Add your client name", role: "Business owner", photo: "" },
      { quote: "A real partner, not just a vendor. They pushed back when it mattered and delivered on time.", author: "Add your client name", role: "Product lead", photo: "" },
    ],
  },

  footer: {
    tagline: "Flutter, .NET, Firebase and Next.js, built in Nepal.",
  },
};

export default defaultContent;
