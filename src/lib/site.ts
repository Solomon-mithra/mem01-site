/** Site-wide config — update when custom domain / public repo changes. */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://solomon-mithra.github.io/mem01-site";

/**
 * Absolute URL under the site base (keeps /mem01-site on GitHub Pages).
 * Do not use `new URL('/path', base)` — a leading slash drops the base path.
 */
export function absoluteUrl(path = "/"): string {
  const base = siteUrl.replace(/\/$/, "");
  if (!path || path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export const site = {
  name: "mem01",
  tagline: "Belief memory for AI agents",
  /** Primary SERP title — keyword-led */
  title: "mem01 — Memory for AI Agents That Stays Correct",
  description:
    "Best open-source memory for AI agents when facts change. Self-hosted belief memory that supersedes stale facts instead of stacking contradictions. Docker + Postgres + multi-signal recall.",
  /** Live GitHub Pages URL (includes base path) */
  url: siteUrl,
  /** Primary CTA — hero + nav (pre-existing engine) */
  githubUrl:
    process.env.NEXT_PUBLIC_GITHUB_URL ??
    "https://github.com/Solomon-mithra/mem01",
  docsUrl:
    process.env.NEXT_PUBLIC_DOCS_URL ??
    "https://github.com/Solomon-mithra/mem01#readme",
  /** Agents SDK Session product package */
  mem01sessionPath: "/mem01session/",
  mem01sessionGithubUrl:
    process.env.NEXT_PUBLIC_MEM01SESSION_GITHUB_URL ??
    "https://github.com/Solomon-mithra/mem01session",
  mem01sessionPypiUrl:
    process.env.NEXT_PUBLIC_MEM01SESSION_PYPI_URL ??
    "https://pypi.org/project/mem01session/",
  mem01EnginePypiUrl:
    process.env.NEXT_PUBLIC_MEM01_ENGINE_PYPI_URL ??
    "https://pypi.org/project/mem01-engine/",
  dockerOneLiner: "docker compose up -d --build",
  /** Target queries — metadata keywords + JSON-LD */
  keywords: [
    "memory for AI agents",
    "AI agent memory",
    "best memory for AI agents",
    "agent memory open source",
    "self-hosted agent memory",
    "LLM agent memory",
    "long-term memory for agents",
    "belief memory",
    "mem0 alternative",
    "multi-signal retrieval",
    "LoCoMo benchmark",
    "Postgres agent memory",
    "pgvector memory",
    "stale memory agents",
    "mem01",
  ],
  ogImage: {
    path: "/og.png",
    width: 1200,
    height: 630,
    alt: "mem01 — Memory that stays correct. Belief memory for AI agents.",
  },
} as const;
