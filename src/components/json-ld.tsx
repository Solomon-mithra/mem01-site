import { absoluteUrl, site } from "@/lib/site";

/** FAQ answers mirrored from components/faq.tsx for schema (keep in sync). */
const faqEntities = [
  {
    question: "Is this a mem0 clone?",
    answer:
      "Same job — long-term agent memory — different model. mem01 is belief-centric: lifecycle ops, conflict filtering, and self-hosted Postgres as the default story.",
  },
  {
    question: "Do I need a knowledge graph?",
    answer:
      "No. v1 avoids full temporal graphs. You get validity windows and supersede chains without multi-hop search on every request.",
  },
  {
    question: "What runs on my machine?",
    answer:
      "Docker Compose: FastAPI + PostgreSQL with pgvector. Point OPENAI_API_KEY (or compatible) at extraction/embeddings. Data stays in your DB.",
  },
  {
    question: "Is recall free of LLM calls?",
    answer:
      "Yes. Recall is multi-signal (vector + lexical/entity, RRF, MMR), conflict filter, and pack — no LLM on the hot path. Writes may call an LLM once per batch for extraction.",
  },
  {
    question: "How do you claim better than mem0?",
    answer:
      "On conflict and staleness — location/job/preference flips — not every public benchmark. Product suite: mem01 5/5 vs mem0 2/5 when old values must not reappear. LoCoMo self-runs use gpt-4o-mini throughout; see Research for numbers and caveats.",
  },
  {
    question: "If NY is superseded, is history gone?",
    answer:
      "No. Default recall is active-only so agents stay correct. For “before SF?” or audit, call recall with include_history=true, or POST /v1/history for a full timeline. Past beliefs stay labeled, not mixed in as active truth.",
  },
  {
    question: "What is multi-signal retrieval?",
    answer:
      "v0.3 fuses embedding search with a lexical/entity pass (RRF), then applies MMR diversity before packing. Same zero-LLM constraint — better hit rate when names and exact phrases matter.",
  },
];

export function JsonLd() {
  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Linux, macOS, Windows (Docker)",
    description: site.description,
    url: absoluteUrl("/"),
    image: absoluteUrl(site.ogImage.path),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    keywords: site.keywords.join(", "),
    codeRepository: site.githubUrl,
    license: "https://opensource.org/licenses",
    featureList: [
      "Belief lifecycle with SUPERSEDE",
      "Multi-signal recall (vector + lexical, RRF, MMR)",
      "Self-hosted Postgres + pgvector",
      "History and audit timeline APIs",
      "Zero-LLM recall path",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: absoluteUrl("/"),
    description: site.description,
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: absoluteUrl("/"),
      logo: absoluteUrl("/icon.svg"),
    },
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: absoluteUrl("/"),
    sameAs: [site.githubUrl],
    description: site.tagline,
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntities.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const graphs = [software, website, organization, faq];

  return (
    <>
      {graphs.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
