"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/cn";

const faqs = [
  {
    q: "Is this a mem0 clone?",
    a: "Same job — long-term agent memory — different model. mem01 is belief-centric: lifecycle ops, conflict filtering, and self-hosted Postgres as the default story.",
  },
  {
    q: "Do I need a knowledge graph?",
    a: "No. v1 avoids full temporal graphs. You get validity windows and supersede chains without multi-hop search on every request.",
  },
  {
    q: "What runs on my machine?",
    a: "Docker Compose: FastAPI + PostgreSQL with pgvector. Point OPENAI_API_KEY (or compatible) at extraction/embeddings. Data stays in your DB.",
  },
  {
    q: "Is recall free of LLM calls?",
    a: "Yes. Recall is multi-signal (vector + lexical/entity, RRF, MMR), conflict filter, and pack — no LLM on the hot path. Writes may call an LLM once per batch for extraction.",
  },
  {
    q: "How do you claim better than mem0?",
    a: "On conflict and staleness — location/job/preference flips — not every public benchmark. Product suite: mem01 5/5 vs mem0 2/5 when old values must not reappear. LoCoMo self-runs use gpt-4o-mini throughout; see Research for numbers and caveats.",
  },
  {
    q: "If NY is superseded, is history gone?",
    a: "No. Default recall is active-only so agents stay correct. For “before SF?” or audit, call recall with include_history=true, or POST /v1/history for a full timeline. Past beliefs stay labeled, not mixed in as active truth.",
  },
  {
    q: "What is multi-signal retrieval?",
    a: "v0.3 fuses embedding search with a lexical/entity pass (RRF), then applies MMR diversity before packing. Same zero-LLM constraint — better hit rate when names and exact phrases matter.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="scroll-mt-20 border-t border-border py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <div className="text-on-stage">
            <p className="label">FAQ</p>
            <h2 className="display-xl mt-4 text-4xl text-white sm:text-5xl">
              Straight
              <br />
              answers
            </h2>
          </div>
          <div className="divide-y divide-border border border-border">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q} className="bg-black/85 backdrop-blur-sm">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-white transition hover:bg-card"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-muted-dim">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.q}
                    </span>
                    {isOpen ? (
                      <Minus className="h-4 w-4 shrink-0 text-muted" />
                    ) : (
                      <Plus className="h-4 w-4 shrink-0 text-muted" />
                    )}
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-200",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-4 pl-12 text-sm leading-relaxed text-white/75">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
