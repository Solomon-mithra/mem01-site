import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/nav";
import { SiteBackground } from "@/components/site-background";
import { Footer } from "@/components/footer";
import { categories, overall, meta } from "@/lib/benchmarks";

export const metadata: Metadata = {
  title: "Research · mem01 LoCoMo",
  description:
    "LoCoMo self-run methodology, models, category scores, and caveats for mem01 v0 and v0.2.",
};

function GrainBar({
  value,
  variant,
}: {
  value: number;
  variant: "v0" | "v02";
}) {
  const pct = Math.min(100, Math.max(2, value));
  return (
    <div className="relative h-8 flex-1 overflow-hidden rounded-sm border border-white/10 bg-white/[0.03]">
      <div
        className={
          variant === "v02"
            ? "absolute inset-y-0 left-0 bg-[#8a1218] opacity-85"
            : "absolute inset-y-0 left-0 bg-[#3a3a3a] opacity-85"
        }
        style={{ width: `${pct}%` }}
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
  );
}

export default function ResearchPage() {
  return (
    <>
      <SiteBackground />
      <div className="relative z-10 flex min-h-full flex-1 flex-col">
        <Nav />
        <main className="flex-1 pt-24 pb-16">
          <article className="mx-auto max-w-3xl px-5 sm:px-6">
            <Link
              href="/#benchmarks"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/60 transition hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to benchmarks
            </Link>

            <p className="label mt-8">Research</p>
            <h1 className="display-xl mt-4 text-4xl text-white sm:text-5xl">
              LoCoMo self-run
              <br />
              notes
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white">
              What we measured, how we measured it, and what we are not claiming.
              Numbers verified against the raw result JSON from{" "}
              <span className="font-mono text-sm text-accent">{meta.date}</span>.
            </p>

            {/* Headline */}
            <section className="mt-14 border-t border-border pt-10">
              <h2 className="font-mono text-sm tracking-[0.12em] uppercase text-accent">
                Headline
              </h2>
              <div className="mt-6 grid gap-px bg-border sm:grid-cols-2">
                <div className="bg-black/80 p-6">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-white/45">
                    v0
                  </p>
                  <p className="mt-2 font-mono text-4xl font-bold text-white/40">
                    {overall.v0.pct}%
                  </p>
                  <p className="mt-1 font-mono text-xs text-white/40">
                    {overall.v0.frac}
                  </p>
                </div>
                <div className="relative overflow-hidden bg-black/80 p-6">
                  <div className="bench-grain pointer-events-none absolute inset-0 opacity-35" />
                  <div className="relative">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-accent">
                      v0.2
                    </p>
                    <p className="mt-2 font-mono text-4xl font-bold text-accent">
                      {overall.v02.pct}%
                    </p>
                    <p className="mt-1 font-mono text-xs text-white/60">
                      {overall.v02.frac}
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-white/80">
                Same dataset and question set both runs. Jump is methodology
                parity with the open eval stack plus extractor fixes — not a
                different dataset.
              </p>
            </section>

            {/* Method */}
            <section className="mt-14 border-t border-border pt-10">
              <h2 className="font-mono text-sm tracking-[0.12em] uppercase text-accent">
                Method
              </h2>
              <dl className="mt-6 space-y-4 font-mono text-sm">
                {[
                  ["Dataset", meta.dataset],
                  ["Questions", `${meta.questions} (adversarial category excluded)`],
                  ["Harness", meta.framework],
                  ["Extract", meta.extractModel],
                  ["Answer", meta.answerModel],
                  ["Judge", meta.judgeModel],
                  ["Embeddings", meta.embedModel],
                  ["Recall budget", meta.recall],
                  ["Store", meta.store],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="grid gap-1 border-b border-white/5 pb-3 sm:grid-cols-[140px_1fr] sm:gap-4"
                  >
                    <dt className="text-white/45">{k}</dt>
                    <dd className="text-white">{v}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Categories */}
            <section className="mt-14 border-t border-border pt-10">
              <h2 className="font-mono text-sm tracking-[0.12em] uppercase text-accent">
                By category
              </h2>
              <p className="mt-3 text-sm text-white/70">
                Grey = v0 · Red = v0.2. Fractions are correct / total in that
                category.
              </p>
              <div className="mt-8 space-y-6">
                {categories.map((c) => (
                  <div key={c.key}>
                    <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-mono text-sm text-white">
                        {c.label}
                      </span>
                      <span className="font-mono text-[11px] text-white/45">
                        v0 {c.v0Frac} · v0.2 {c.v02Frac}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="w-10 font-mono text-[10px] text-white/40">
                          v0
                        </span>
                        <GrainBar value={c.v0} variant="v0" />
                        <span className="w-12 text-right font-mono text-xs text-white/50">
                          {c.v0}%
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-10 font-mono text-[10px] text-accent">
                          v0.2
                        </span>
                        <GrainBar value={c.v02} variant="v02" />
                        <span className="w-12 text-right font-mono text-xs text-accent">
                          {c.v02}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Product suite — strength, keep honest */}
            <section className="mt-14 border-t border-border pt-10">
              <h2 className="font-mono text-sm tracking-[0.12em] uppercase text-accent">
                Product suite (our wedge)
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white">
                On a separate, small harness aimed at staleness and conflict
                (location update, preference flip, job change, multi-fact, scope
                isolation):{" "}
                <span className="text-accent">mem01 {meta.productSuite.mem01}</span>
                . Same harness, mem0 OSS scored {meta.productSuite.mem0Oss}.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                {meta.productSuite.note} This is not LoCoMo; it is the failure
                mode we optimize for.
              </p>
            </section>

            {/* Honesty */}
            <section className="mt-14 border-t border-border pt-10">
              <h2 className="font-mono text-sm tracking-[0.12em] uppercase text-accent">
                What we are not claiming
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-white/80">
                <li className="border-l-2 border-accent/50 pl-4">
                  {meta.publishedNote}
                </li>
                <li className="border-l-2 border-white/15 pl-4">
                  Single full run; LLM judge noise is roughly ±2 points on 1,540
                  questions.
                </li>
                <li className="border-l-2 border-white/15 pl-4">
                  In-memory store for this accuracy run — we do not claim
                  production latency numbers from it.
                </li>
                <li className="border-l-2 border-white/15 pl-4">
                  Per-query token/latency telemetry was not recorded for this
                  run (backlog).
                </li>
              </ul>
            </section>

            <section className="mt-14 border border-border bg-black/60 p-6 sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
                Bottom line
              </p>
              <p className="mt-3 text-base leading-relaxed text-white">
                Under a fixed, disclosed stack (gpt-4o-mini everywhere), mem01
                moved from {overall.v0.pct}% → {overall.v02.pct}% on LoCoMo-10.
                Gains show up across multi-hop, temporal, open-domain, and
                single-hop. Headline vendor numbers with stronger models are a
                different comparison — we keep our model choice public.
              </p>
              <Link
                href="/#benchmarks"
                className="mt-6 inline-flex h-11 items-center justify-center gap-2 bg-white px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-black transition hover:bg-accent"
              >
                Back to site
              </Link>
            </section>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}
