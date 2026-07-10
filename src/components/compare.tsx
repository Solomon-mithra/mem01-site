import { Check, Minus, X } from "lucide-react";
import { cn } from "@/lib/cn";

type Cell = "yes" | "partial" | "no";

const rows: {
  feature: string;
  mem01: Cell;
  mem0: Cell;
  zep: Cell;
}[] = [
  {
    feature: "Belief lifecycle (supersede / invalidate)",
    mem01: "yes",
    mem0: "partial",
    zep: "yes",
  },
  {
    feature: "Stale facts retired on conflict",
    mem01: "yes",
    mem0: "no",
    zep: "yes",
  },
  {
    feature: "Recall without LLM by default",
    mem01: "yes",
    mem0: "yes",
    zep: "partial",
  },
  {
    feature: "Token-budgeted context packing",
    mem01: "yes",
    mem0: "yes",
    zep: "yes",
  },
  {
    feature: "Self-hosted first (your Postgres)",
    mem01: "yes",
    mem0: "partial",
    zep: "partial",
  },
  {
    feature: "Light model — no full knowledge graph",
    mem01: "yes",
    mem0: "yes",
    zep: "no",
  },
  {
    feature: "Open-source MIT core",
    mem01: "yes",
    mem0: "yes",
    zep: "partial",
  },
];

function CellIcon({ value }: { value: Cell }) {
  if (value === "yes") {
    return <Check className="h-4 w-4 text-accent" strokeWidth={2.25} />;
  }
  if (value === "no") {
    return <X className="h-4 w-4 text-white/35" strokeWidth={2} />;
  }
  return <Minus className="h-4 w-4 text-muted-dim" strokeWidth={2} />;
}

const examples = [
  {
    code: "vs mem0",
    title: "The append problem",
    claim: "Best-in-class ease and fact extraction.",
    gap: "After NYC → SF, search often returns both. Store stays dirty; agent covers it.",
    win: "SUPERSEDE retires NYC. One active belief. Product suite: mem01 5/5 vs mem0 2/5 on conflict cases.",
  },
  {
    code: "vs zep",
    title: "Graph power, heavier path",
    claim: "Temporal graphs, enterprise packaging, multi-hop context.",
    gap: "Graph materialization trades simplicity and cost. Overkill for “two cities in the prompt.”",
    win: "Belief ops + budgeted packing. Evolution correctness without a full temporal graph.",
  },
  {
    code: "vs diy",
    title: "Vectors alone",
    claim: "You control embeddings and filters.",
    gap: "No extraction policy, no conflict model, no packer. Every agent reinvents hygiene.",
    win: "remember / recall / correct / forget over Postgres. Lifecycle is the product.",
  },
];

export function Compare() {
  return (
    <section
      id="compare"
      className="scroll-mt-20 border-t border-border py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="max-w-2xl">
          <p className="label">Compare</p>
          <h2 className="display-xl mt-4 text-4xl text-white sm:text-5xl">
            Why mem01
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            mem0 wins on cloud polish. Zep wins on graph depth. mem01 wins when
            you need{" "}
            <span className="text-white">correct beliefs under evolution</span>
            , self-hosted, lean recall.
          </p>
        </div>

        <div className="mt-12 overflow-x-auto border border-border">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-card">
                <th className="px-5 py-4 font-mono text-[10px] font-normal tracking-[0.14em] uppercase text-muted">
                  Capability
                </th>
                <th className="px-5 py-4 font-mono text-[10px] font-normal tracking-[0.14em] uppercase text-white">
                  mem01
                </th>
                <th className="px-5 py-4 font-mono text-[10px] font-normal tracking-[0.14em] uppercase text-muted">
                  mem0
                </th>
                <th className="px-5 py-4 font-mono text-[10px] font-normal tracking-[0.14em] uppercase text-muted">
                  Zep
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={cn(
                    "border-b border-border last:border-0",
                    i % 2 === 0 ? "bg-black" : "bg-card/60",
                  )}
                >
                  <td className="px-5 py-3.5 text-[13px] text-white/90">
                    {row.feature}
                  </td>
                  <td className="px-5 py-3.5">
                    <CellIcon value={row.mem01} />
                  </td>
                  <td className="px-5 py-3.5">
                    <CellIcon value={row.mem0} />
                  </td>
                  <td className="px-5 py-3.5">
                    <CellIcon value={row.zep} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 font-mono text-[10px] tracking-wide text-muted-dim">
          ● yes · — partial · × no · from public docs / positioning
        </p>

        <div className="mt-10 grid gap-px bg-border lg:grid-cols-3">
          {examples.map((ex) => (
            <article
              key={ex.code}
              className="flex flex-col bg-black/80 p-6 backdrop-blur-sm sm:p-7"
            >
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-accent">
                {ex.code}
              </p>
              <h3 className="mt-3 text-lg font-medium tracking-tight text-white">
                {ex.title}
              </h3>
              <p className="mt-4 text-sm text-muted">
                <span className="text-white/70">They do well: </span>
                {ex.claim}
              </p>
              <p className="mt-2 text-sm text-muted">
                <span className="text-white/40">Gap: </span>
                {ex.gap}
              </p>
              <p className="mt-auto pt-5 text-sm text-muted">
                <span className="text-accent">Why mem01: </span>
                {ex.win}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
