import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories, overall } from "@/lib/benchmarks";

function GrainBar({
  value,
  variant,
  label,
}: {
  value: number;
  variant: "v0" | "v02";
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-14 shrink-0 font-mono text-[10px] uppercase tracking-wider text-white/50">
        {label}
      </span>
      <div className="relative h-7 flex-1 overflow-hidden border border-white/10 bg-black/40">
        <div
          className={
            variant === "v02" ? "bench-bar bench-bar-v02" : "bench-bar bench-bar-v0"
          }
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      <span className="w-14 shrink-0 text-right font-mono text-sm tabular-nums text-white">
        {value.toFixed(1)}%
      </span>
    </div>
  );
}

export function Benchmarks() {
  return (
    <section
      id="benchmarks"
      className="scroll-mt-20 border-t border-border py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="max-w-2xl">
          <p className="label">Benchmarks</p>
          <h2 className="display-xl mt-4 text-4xl text-white sm:text-5xl">
            LoCoMo
            <br />
            v0 → v0.2
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white">
            Self-run on LoCoMo-10 (1,540 questions) with the same open eval
            style as mem0&apos;s public harness. Same models for extract,
            answer, and judge:{" "}
            <span className="font-mono text-accent">gpt-4o-mini</span>.
          </p>
        </div>

        {/* Overall scores */}
        <div className="mt-12 grid gap-px bg-border sm:grid-cols-2">
          <div className="bg-black/80 p-6 backdrop-blur-sm sm:p-8">
            <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-white/45">
              v0 · baseline
            </p>
            <p className="mt-3 font-mono text-5xl font-bold tabular-nums text-white/40 sm:text-6xl">
              {overall.v0.pct}
              <span className="text-2xl">%</span>
            </p>
            <p className="mt-2 font-mono text-xs text-white/40">
              {overall.v0.frac} correct
            </p>
          </div>
          <div className="relative overflow-hidden bg-black/80 p-6 backdrop-blur-sm sm:p-8">
            <div className="bench-grain pointer-events-none absolute inset-0 opacity-40" />
            <div className="relative">
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-accent">
                v0.2 · current
              </p>
              <p className="mt-3 font-mono text-5xl font-bold tabular-nums text-accent sm:text-6xl">
                {overall.v02.pct}
                <span className="text-2xl">%</span>
              </p>
              <p className="mt-2 font-mono text-xs text-white/60">
                {overall.v02.frac} correct · +46.2 pts
              </p>
            </div>
          </div>
        </div>

        {/* Per-category charts */}
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {categories.map((c) => (
            <div
              key={c.key}
              className="border border-border bg-black/70 p-5 backdrop-blur-sm sm:p-6"
            >
              <div className="mb-4 flex items-baseline justify-between gap-3">
                <h3 className="font-mono text-sm tracking-wide text-white">
                  {c.label}
                </h3>
                <span className="font-mono text-[10px] text-white/40">
                  cat {c.key}
                </span>
              </div>
              <div className="space-y-2.5">
                <GrainBar value={c.v0} variant="v0" label="v0" />
                <GrainBar value={c.v02} variant="v02" label="v0.2" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border border-border bg-black/50 p-5 sm:flex-row sm:items-center sm:p-6">
          <p className="max-w-xl text-sm leading-relaxed text-white/75">
            Full methodology, models, and caveats on the research page — including
            why this is not a copy of every published headline number.
          </p>
          <Link
            href="/research/"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 bg-white px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-black transition-colors hover:bg-accent"
          >
            Research details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
