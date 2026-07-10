/** Site-wide config — update the GitHub URL when the public repo is ready. */
export const site = {
  name: "mem01",
  tagline: "Belief memory for AI agents",
  description:
    "Self-hosted agent memory that supersedes stale facts instead of stacking contradictions. Remembers what matters, forgets what's wrong.",
  url: "https://mem01.dev",
  /** Primary CTA — hero + nav */
  githubUrl:
    process.env.NEXT_PUBLIC_GITHUB_URL ??
    "https://github.com/Solomon-mithra/mem01",
  docsUrl:
    process.env.NEXT_PUBLIC_DOCS_URL ??
    "https://github.com/Solomon-mithra/mem01#readme",
  dockerOneLiner: "docker compose up -d --build",
} as const;
