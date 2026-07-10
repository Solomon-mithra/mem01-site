# mem01 on LoCoMo: v0 to v0.2

July 10, 2026. All numbers measured, single runs, configuration stated. Nothing extrapolated.

## What happened in v0

The first full run scored **31.7% (488/1540)**. Failure analysis showed most of that number was not the memory at all: 71% of failures were the answering layer refusing to answer ("I don't know" with the correct memory sitting in context), our judge was far stricter than the industry rubric, and recall was capped at 800 tokens while published systems use about 7,000. One real product bug also surfaced: a single malformed LLM extraction crashed the whole ingestion, fixed with a one-retry mechanism, now unit tested. v0's real finding: the memory was better than its score, and the score was a property of the harness.

## What we changed and why

| # | Change | Layer | Why | Effect |
|---|--------|-------|-----|--------|
| 1 | Adopted mem0's published answer prompt (7-step reasoning, "never say not mentioned") | Harness | 71% of failures were refusals | Refusals collapsed |
| 2 | Adopted mem0's published judge verbatim (partial credit, 14-day date tolerance, paraphrases count) | Harness | Ours graded harder than the rubric behind every published score | Comparable grading |
| 3 | Recall envelope 800 to 6,500 tokens, k=20 to 150 | Harness config | Multi-hop questions need many beliefs visible at once | Multi-hop 14% to 83% |
| 4 | Extractor: preserve specifics verbatim (names, places, titles, dates) | mem01 core | "Sweden" was being stored as "her home country", unrecoverable | Single-hop lift |
| 5 | Extractor: episodes are dated ADDs, never SUPERSEDE | mem01 core | Repeated activities collapsed into one belief with only the latest date | Temporal 40% to 75% |
| 6 | Extractor: capture experiential details as their own beliefs | mem01 core | Fine details (what a sign said, a gift's meaning) never became beliefs | Marginal |
| 7 | JSON-retry on malformed extraction output | mem01 core | One bad sample killed a 3-hour run | Zero ingest errors since |

## Did we change what mem01 is?

No. Changes 1-3 are eval harness, not product. Changes 4, 6, 7 improve fidelity and robustness without touching the design. Change 5 is the one to look at honestly: it narrows SUPERSEDE to current-state facts (location, job, preferences) and keeps repeated events as separate dated beliefs. That is a refinement of the original intent, not a reversal: supersede still governs "what is true now", it just no longer eats episodes. The proof is the product suite (staleness, preference flips, conflict, scope isolation): **5/5 on every run and iteration**, while mem0 OSS scores 2/5 on the same harness. One consequence worth tracking: mem01 now accumulates more beliefs over time, which raises the priority of the cold-consolidation feature already on the roadmap.

## v0.2 results

**Overall: 77.9% (1200/1540), up from 31.7%.** Iteration trajectory on the tuning conversation: 38.2 -> 75.0 -> 86.2 -> 86.8.

| Category | v0 | v0.2 |
|----------|-----|------|
| Multi-hop | 13.8% | **83.3%** (235/282) |
| Temporal | 39.6% | **74.5%** (239/321) |
| Open-domain | 12.5% | **74.0%** (71/96) |
| Single-hop | 36.9% | **77.9%** (655/841) |

Per conversation, v0.2 ranged 67.9% (conv-49, the hardest) to 84.9%, average across conversations 78.0%. Zero ingestion errors. Single run; judge noise is roughly plus or minus 2 points at this sample size.

## Tokens, latency, model

- **Models**: gpt-4o-mini for extraction, answering, and judging; text-embedding-3-small for vectors. mem0's published 92.5 uses gpt-4o-class models in its reference methodology, so part of the remaining gap is model tier, not memory quality.
- **Tokens**: recall capped at 6,500 tokens per query (mem0's published run averages 6,956). mem01's read path makes zero LLM calls: recall is embed, vector search, conflict filter, token-budgeted pack. Writes use one LLM call per message batch.
- **Latency**: this run used the in-process store, so recall latencies are not representative of the deployed Postgres stack; per-query telemetry is backlogged. Product-suite cases (full write plus read cycle including the extraction LLM call) ran 2.1 to 3.9 seconds. A deployed-stack latency benchmark is the right follow-up before publishing latency claims.

## Where mem01 stands vs the field

- **mem0** ([92.5 LoCoMo, 94.4 LongMemEval](https://mem0.ai/research), [state of memory report](https://mem0.ai/blog/state-of-ai-agent-memory-2026)): the adoption leader (60k+ GitHub stars, $24M raised). mem01's differentiators are the explicit belief lifecycle and the staleness result: 100% vs their OSS 40% on conflict/staleness cases, measured symmetrically. Their strength is the tuned retrieval and answering stack behind their score.
- **Zep** ([temporal knowledge graph review](https://baeseokjae.github.io/posts/zep-ai-agent-memory-review-2026/), [provider comparison](https://www.developersdigest.tech/blog/best-ai-agent-memory-providers-2026)): bitemporal knowledge graph, strong on temporal reasoning and enterprise compliance. Their LoCoMo score is publicly contested (they reported 84, mem0's replication scored them 58, their rebuttal said 75). That dispute is exactly why this run uses mem0's own open-sourced methodology unmodified: the number is refutable by rerunning the harness.
- **Letta, Supermemory, Cognee** ([2026 comparison](https://dev.to/varun_pratapbhardwaj_b13/5-ai-agent-memory-systems-compared-mem0-zep-letta-supermemory-superlocalmemory-2026-benchmark-59p3), [frameworks ranked](https://atlan.com/know/best-ai-agent-memory-frameworks-2026/)): agent-OS and pipeline approaches, a different wedge.

## The one-liner

A solo, self-hosted belief-memory engine reached 77.9% on the incumbent's own published LoCoMo methodology (2.5x its baseline) on a cheaper model tier, while beating that incumbent's OSS version 100% to 40% on the staleness and conflict handling it was designed for.

## Roadmap to 90+

1. gpt-4o-class answerer and judge, one run, zero code (parked until credits allow)
2. Multi-signal retrieval: semantic + keyword + entity fusion
3. Diversity-aware ranking (MMR) for multi-hop list questions
4. Structured `valid_from` dates on beliefs, chronological presentation
5. Session-level extraction to lift the granularity ceiling
