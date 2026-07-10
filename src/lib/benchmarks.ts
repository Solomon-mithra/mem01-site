/**
 * LoCoMo results — verified against memory-evals JSON (2026-07-10).
 * Source: memory-evals/RESULTS.md + v02/v03_full_mem01_locomo.json
 */

export type CategoryKey = "1" | "2" | "3" | "4";

/** Grey baseline = v0.2 · accent = v0.3 */
export const categories: {
  key: CategoryKey;
  label: string;
  short: string;
  /** v0.2 */
  baseline: number;
  /** v0.3 */
  current: number;
  baselineFrac: string;
  currentFrac: string;
}[] = [
  {
    key: "1",
    label: "Multi-hop",
    short: "Multi-hop",
    baseline: 83.3,
    current: 86.9,
    baselineFrac: "235/282",
    currentFrac: "245/282",
  },
  {
    key: "2",
    label: "Temporal",
    short: "Temporal",
    baseline: 74.5,
    current: 77.9,
    baselineFrac: "239/321",
    currentFrac: "250/321",
  },
  {
    key: "3",
    label: "Open-domain",
    short: "Open-domain",
    baseline: 74.0,
    current: 75.0,
    baselineFrac: "71/96",
    currentFrac: "72/96",
  },
  {
    key: "4",
    label: "Single-hop",
    short: "Single-hop",
    baseline: 77.9,
    current: 80.0,
    baselineFrac: "655/841",
    currentFrac: "673/841",
  },
];

export const overall = {
  /** v0.2 */
  baseline: { pct: 77.9, frac: "1200/1540", label: "v0.2" },
  /** v0.3 */
  current: { pct: 80.5, frac: "1240/1540", label: "v0.3" },
  deltaPts: 2.6,
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
  storeV02: "InMemoryBeliefStore (accuracy focus)",
  storeV03: "Postgres + pgvector (production store shape)",
  v03Notes:
    "Multi-signal retrieval (lexical/entity + RRF fusion + MMR), session-level extraction, evidence-aware judging.",
  v03Telemetry:
    "Recall p50 442ms / p95 913ms / mean 526ms (includes embedding API); packed context mean 1,252 tokens, max 3,213 (cap 6,500).",
  publishedNote:
    "mem0’s published ~92.5% LoCoMo figure uses a stronger gpt-4o-class answer/judge stack. Our self-run uses gpt-4o-mini throughout for cost and reproducibility.",
  productSuite: {
    mem01: "5/5",
    mem0Oss: "2/5",
    note: "Internal staleness/conflict product suite (location flip, preference flip, job change, multi-fact, scope isolation).",
  },
};
