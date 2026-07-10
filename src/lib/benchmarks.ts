/**
 * LoCoMo results — verified against memory-evals JSON (2026-07-10).
 * Source report: memory-evals/RESULTS.md
 * Harness: mem0ai/memory-benchmarks style LoCoMo-10, non-adversarial only.
 */

export type CategoryKey = "1" | "2" | "3" | "4";

export const categories: {
  key: CategoryKey;
  label: string;
  short: string;
  v0: number;
  v02: number;
  v0Frac: string;
  v02Frac: string;
}[] = [
  {
    key: "1",
    label: "Multi-hop",
    short: "Multi-hop",
    v0: 13.8,
    v02: 83.3,
    v0Frac: "39/282",
    v02Frac: "235/282",
  },
  {
    key: "2",
    label: "Temporal",
    short: "Temporal",
    v0: 39.6,
    v02: 74.5,
    v0Frac: "127/321",
    v02Frac: "239/321",
  },
  {
    key: "3",
    label: "Open-domain",
    short: "Open-domain",
    v0: 12.5,
    v02: 74.0,
    v0Frac: "12/96",
    v02Frac: "71/96",
  },
  {
    key: "4",
    label: "Single-hop",
    short: "Single-hop",
    v0: 36.9,
    v02: 77.9,
    v0Frac: "310/841",
    v02Frac: "655/841",
  },
];

export const overall = {
  v0: { pct: 31.7, frac: "488/1540" },
  v02: { pct: 77.9, frac: "1200/1540" },
};

export const meta = {
  date: "2026-07-10",
  questions: 1540,
  dataset: "LoCoMo-10 (non-adversarial)",
  framework: "mem0 open eval harness (memory-benchmarks-style)",
  extractModel: "gpt-4o-mini",
  answerModel: "gpt-4o-mini",
  judgeModel: "gpt-4o-mini",
  embedModel: "text-embedding-3-small",
  recall: "6,500 tokens · k=150",
  store: "InMemoryBeliefStore (accuracy focus; latency not claimed)",
  /** Honest caveat — mem0 published headline uses stronger answer/judge stack */
  publishedNote:
    "mem0’s published ~92.5% LoCoMo figure uses a stronger gpt-4o-class answer/judge stack. Our self-run uses gpt-4o-mini throughout for cost and reproducibility.",
  productSuite: {
    mem01: "5/5",
    mem0Oss: "2/5",
    note: "Internal staleness/conflict product suite (location flip, preference flip, job change, multi-fact, scope isolation).",
  },
};
