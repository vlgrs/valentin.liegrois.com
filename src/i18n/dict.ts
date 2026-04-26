export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const dict = {
  en: {
    nav: {
      switchLang: "FR",
    },
    hero: {
      beat1: {
        name: "Valentin Liegrois",
        sub: "Building agentic AI systems.",
      },
      beat2: ["Multi-agent.", "Memory-grounded.", "Production-ready."],
      beat3: "From idea to production in weeks.",
    },
    identity: {
      role: "AI systems engineer",
      line: "10+ years across cloud, security and product. Available for independent consulting.",
    },
    trustedBy: {
      heading: "Worked with",
      brands: ["Iris Galerie", "XBTO", "Treezor", "Alter Way", "Axicom", "Spallian"],
    },
    capabilities: {
      heading: "Capabilities",
      sub: "Five surfaces, one engineer.",
      buckets: [
        {
          title: "AI & Agentic Systems",
          lead: "Multi-agent orchestration, memory, and tools — production-grade.",
          pills: [
            "Anthropic Claude",
            "OpenAI",
            "Gemini",
            "MCP",
            "RAG",
            "Embeddings",
            "Vector DBs",
            "Multi-agent",
            "Memory engineering",
            "Skills / Tools",
            "Eval-driven dev",
            "OpenClaw",
          ],
        },
        {
          title: "Product Engineering",
          lead: "Full-stack TypeScript, edge-first.",
          pills: [
            "TypeScript",
            "React",
            "Next.js",
            "React Router v7",
            "Hono",
            "Drizzle",
            "Tailwind",
            "ShadcnUI",
            "Zod",
            "TanStack",
          ],
        },
        {
          title: "Cloud & Infrastructure",
          lead: "From AWS networking to Cloudflare Workers — IaC throughout.",
          pills: [
            "AWS",
            "Azure",
            "GCP",
            "Cloudflare Workers",
            "D1",
            "R2",
            "KV",
            "Kubernetes",
            "Terraform",
            "Docker",
            "Proxmox",
          ],
        },
        {
          title: "Data",
          lead: "Data platforms for retail, finance, and operations.",
          pills: [
            "BigQuery",
            "GCP Data",
            "PostgreSQL",
            "D1",
            "DynamoDB",
            "Pipelines",
            "Dashboards",
            "Prometheus",
            "Grafana",
          ],
        },
        {
          title: "Security & DevOps",
          lead: "Zero Trust, identity, and CI/CD as a single fabric.",
          pills: [
            "Zero Trust",
            "Cloudflare Access",
            "Okta",
            "Wazuh",
            "CrowdStrike",
            "IAM",
            "IaC",
            "GitHub Actions",
            "GitLab CI",
          ],
        },
      ],
    },
    work: {
      heading: "Selected work",
      sub: "Shipped, in production.",
      projects: [
        {
          title: "OpenClaw",
          line: "Multi-agent gateway with shared memory, skills, and a real-time 3D visualization of agent activity.",
          tags: ["Multi-agent", "Memory", "Skills", "Gemini", "WhatsApp", "3D viz"],
        },
        {
          title: "Edge Invoicing",
          line: "French Factur-X compliant invoicing on the edge.",
          tags: ["React Router v7", "CF Workers", "D1", "Drizzle", "Factur-X"],
        },
        {
          title: "Iris Pricing Manager",
          line: "Replaces a 30-tab spreadsheet for 15+ countries.",
          tags: ["Hono", "CF Workers", "D1", "CF Access SSO"],
        },
        {
          title: "Iris Data Platform",
          line: "Unified data platform for 179 stores across 23 countries.",
          tags: ["BigQuery", "GCP", "Pipelines", "Dashboards"],
        },
      ],
    },
    contact: {
      heading: "Open for engagements.",
      cta: "valentin@liegrois.com",
      sub: "Reply within 24h.",
    },
    footer: {
      tagline: "Paris · LinkedIn · © 2026",
    },
  },
  fr: {
    nav: {
      switchLang: "EN",
    },
    hero: {
      beat1: {
        name: "Valentin Liegrois",
        sub: "Je conçois des systèmes d'IA agentique.",
      },
      beat2: ["Multi-agents.", "Mémoire ancrée.", "Prêt pour la production."],
      beat3: "De l'idée à la production en quelques semaines.",
    },
    identity: {
      role: "AI systems engineer",
      line: "10+ ans en cloud, sécurité et produit. Disponible en consulting indépendant.",
    },
    trustedBy: {
      heading: "Ils m'ont fait confiance",
      brands: ["Iris Galerie", "XBTO", "Treezor", "Alter Way", "Axicom", "Spallian"],
    },
    capabilities: {
      heading: "Compétences",
      sub: "Cinq surfaces, un seul ingénieur.",
      buckets: [
        {
          title: "IA & Systèmes agentiques",
          lead: "Orchestration multi-agents, mémoire, et tools — qualité production.",
          pills: [
            "Anthropic Claude",
            "OpenAI",
            "Gemini",
            "MCP",
            "RAG",
            "Embeddings",
            "Vector DBs",
            "Multi-agents",
            "Memory engineering",
            "Skills / Tools",
            "Eval-driven dev",
            "OpenClaw",
          ],
        },
        {
          title: "Ingénierie produit",
          lead: "Full-stack TypeScript, orienté edge.",
          pills: [
            "TypeScript",
            "React",
            "Next.js",
            "React Router v7",
            "Hono",
            "Drizzle",
            "Tailwind",
            "ShadcnUI",
            "Zod",
            "TanStack",
          ],
        },
        {
          title: "Cloud & Infrastructure",
          lead: "Du réseau AWS aux Cloudflare Workers — IaC partout.",
          pills: [
            "AWS",
            "Azure",
            "GCP",
            "Cloudflare Workers",
            "D1",
            "R2",
            "KV",
            "Kubernetes",
            "Terraform",
            "Docker",
            "Proxmox",
          ],
        },
        {
          title: "Data",
          lead: "Plateformes data pour retail, finance et opérations.",
          pills: [
            "BigQuery",
            "GCP Data",
            "PostgreSQL",
            "D1",
            "DynamoDB",
            "Pipelines",
            "Dashboards",
            "Prometheus",
            "Grafana",
          ],
        },
        {
          title: "Sécurité & DevOps",
          lead: "Zero Trust, identité et CI/CD en un seul fabric.",
          pills: [
            "Zero Trust",
            "Cloudflare Access",
            "Okta",
            "Wazuh",
            "CrowdStrike",
            "IAM",
            "IaC",
            "GitHub Actions",
            "GitLab CI",
          ],
        },
      ],
    },
    work: {
      heading: "Réalisations",
      sub: "En production.",
      projects: [
        {
          title: "OpenClaw",
          line: "Gateway multi-agents avec mémoire partagée, skills, et visualisation 3D temps réel de l'activité des agents.",
          tags: ["Multi-agents", "Mémoire", "Skills", "Gemini", "WhatsApp", "3D viz"],
        },
        {
          title: "Edge Invoicing",
          line: "Facturation conforme Factur-X sur edge.",
          tags: ["React Router v7", "CF Workers", "D1", "Drizzle", "Factur-X"],
        },
        {
          title: "Iris Pricing Manager",
          line: "Remplace un Google Sheet de 30 onglets pour 15+ pays.",
          tags: ["Hono", "CF Workers", "D1", "CF Access SSO"],
        },
        {
          title: "Iris Data Platform",
          line: "Plateforme data unifiée pour 179 boutiques dans 23 pays.",
          tags: ["BigQuery", "GCP", "Pipelines", "Dashboards"],
        },
      ],
    },
    contact: {
      heading: "Disponible pour des missions.",
      cta: "valentin@liegrois.com",
      sub: "Réponse sous 24h.",
    },
    footer: {
      tagline: "Paris · LinkedIn · © 2026",
    },
  },
} as const;

export type Dict = typeof dict.en;
