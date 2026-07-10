import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories, overall } from "@/lib/benchmarks";
import { cn } from "@/lib/cn";

function GrainBar({
  value,
  variant,
  label,
}: {
  value: number;
  variant: "baseline" | "current";
  label: string;
}) {
  const pct = Math.min(100, Math.max(2, value));
  return (
    <div className="flex items-center gap-3">
      <span className="w-14 shrink-0 font-mono text-[10px] uppercase tracking-wider text-white/50">
        {label}
      </span>
      <div className="relative h-8 flex-1 overflow-hidden rounded-sm border border-white/10 bg-white/[0.03]">
        <div
          className={cn(
            "absolute inset-y-0 left-0",
            variant === "current" ? "bg-[#8a1218]" : "bg-[#3a3a3a]",
          )}
          style={{ width: `${pct}%`, opacity: 0.85 }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-70 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 120 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.15' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "56px 28px",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-50 mix-blend-soft-light"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 80 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n2)'/%3E%3C/svg%3E")`,
              backgroundSize: "90px 40px",
            }}
          />
        </div>
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
            v0.2 → v0.3
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white">
            Self-run on LoCoMo-10 (1,540 questions). Same open eval style as
            mem0&apos;s public harness. Extract, answer, and judge:{" "}
            <span className="font-mono text-accent">gpt-4o-mini</span>.
          </p>
        </div>

        <div className="mt-12 grid gap-px bg-border sm:grid-cols-2">
          <div className="bg-black/80 p-6 backdrop-blur-sm sm:p-8">
            <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-white/45">
              v0.2 · prior
            </p>
            <p className="mt-3 font-mono text-5xl font-bold tabular-nums text-white/40 sm:text-6xl">
              {overall.baseline.pct}
              <span className="text-2xl">%</span>
            </p>
            <p className="mt-2 font-mono text-xs text-white/40">
              {overall.baseline.frac} correct
            </p>
            <div className="mt-5 h-3 overflow-hidden rounded-sm border border-white/10 bg-white/[0.03]">
              <div
                className="relative h-full bg-[#3a3a3a] opacity-85"
                style={{ width: `${overall.baseline.pct}%` }}
              >
                <div
                  className="absolute inset-0 opacity-65 mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 80 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: "48px 20px",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden bg-black/80 p-6 backdrop-blur-sm sm:p-8">
            <div
              className="pointer-events-none absolute inset-0 opacity-30 mix-blend-soft-light"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: "100px 100px",
              }}
            />
            <div className="relative">
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-accent">
                v0.3 · current
              </p>
              <p className="mt-3 font-mono text-5xl font-bold tabular-nums text-accent sm:text-6xl">
                {overall.current.pct}
                <span className="text-2xl">%</span>
              </p>
              <p className="mt-2 font-mono text-xs text-white/60">
                {overall.current.frac} correct · +{overall.deltaPts} pts
              </p>
              <div className="mt-5 h-3 overflow-hidden rounded-sm border border-accent/20 bg-white/[0.03]">
                <div
                  className="relative h-full bg-[#8a1218] opacity-90"
                  style={{ width: `${overall.current.pct}%` }}
                >
                  <div
                    className="absolute inset-0 opacity-70 mix-blend-overlay"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 80 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                      backgroundSize: "48px 20px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

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
              <div className="space-y-3">
                <GrainBar
                  value={c.baseline}
                  variant="baseline"
                  label="v0.2"
                />
                <GrainBar
                  value={c.current}
                  variant="current"
                  label="v0.3"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border border-border bg-black/50 p-5 sm:flex-row sm:items-center sm:p-6">
          <p className="max-w-xl text-sm leading-relaxed text-white/75">
            v0.3 adds multi-signal retrieval (RRF + MMR) on Postgres. Full
            method, models, telemetry, and caveats on the research page.
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
