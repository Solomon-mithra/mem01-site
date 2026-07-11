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
    "LoCoMo self-run methodology: mem01 v0.2 vs v0.3, models, category scores, and caveats.",
};

function GrainBar({
  value,
  variant,
}: {
  value: number;
  variant: "baseline" | "current";
}) {
  const pct = Math.min(100, Math.max(2, value));
  return (
    <div className="relative h-9 flex-1 overflow-hidden rounded-sm border border-white/10 bg-white/[0.03]">
      <div
        className={
          variant === "current"
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
        <main className="flex-1 pt-28 pb-20 sm:pt-36 sm:pb-28">
          <article className="mx-auto max-w-6xl px-5 sm:px-6">
            <Link
              href="/#benchmarks"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/60 transition hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to benchmarks
            </Link>

            {/* Hero — same scale as main page sections */}
            <div className="mt-10 max-w-3xl">
              <p className="label">Research</p>
              <h1 className="display-xl mt-4 text-4xl text-white sm:text-5xl md:text-6xl">
                LoCoMo self-run
                <br />
                notes
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white sm:text-xl">
                v0.2 vs v0.3 on the same LoCoMo-10 set. Numbers verified against
                result JSON from{" "}
                <span className="font-mono text-base text-accent">
                  {meta.date}
                </span>
                .
              </p>
            </div>

            {/* Headline scores */}
            <section className="mt-16 border-t border-border pt-14 sm:mt-20 sm:pt-16">
              <p className="label">Headline</p>
              <h2 className="display-xl mt-4 text-3xl text-white sm:text-4xl">
                Overall accuracy
              </h2>
              <div className="mt-10 grid gap-px bg-border sm:grid-cols-2">
                <div className="bg-black/80 p-6 sm:p-8">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
                    v0.2 · prior
                  </p>
                  <p className="mt-3 font-mono text-5xl font-bold tabular-nums text-white/40 sm:text-6xl">
                    {overall.baseline.pct}
                    <span className="text-2xl">%</span>
                  </p>
                  <p className="mt-2 font-mono text-sm text-white/40">
                    {overall.baseline.frac} correct
                  </p>
                </div>
                <div className="relative overflow-hidden bg-black/80 p-6 sm:p-8">
                  <div className="bench-grain pointer-events-none absolute inset-0 opacity-35" />
                  <div className="relative">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                      v0.3 · current
                    </p>
                    <p className="mt-3 font-mono text-5xl font-bold tabular-nums text-accent sm:text-6xl">
                      {overall.current.pct}
                      <span className="text-2xl">%</span>
                    </p>
                    <p className="mt-2 font-mono text-sm text-white/60">
                      {overall.current.frac} · +{overall.deltaPts} pts
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-white sm:text-lg">
                {meta.v03Notes} Same question set and judge stack as v0.2 — not
                a different dataset.
              </p>
            </section>

            {/* Method */}
            <section className="mt-16 border-t border-border pt-14 sm:mt-20 sm:pt-16">
              <p className="label">Method</p>
              <h2 className="display-xl mt-4 text-3xl text-white sm:text-4xl">
                How we measured
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white sm:text-lg">
                Fixed stack, disclosed end to end — so numbers can be compared
                fairly across our own releases.
              </p>
              <dl className="mt-10 max-w-3xl space-y-0 border border-border">
                {[
                  ["Dataset", meta.dataset],
                  [
                    "Questions",
                    `${meta.questions} (adversarial category excluded)`,
                  ],
                  ["Harness", meta.framework],
                  ["Extract", meta.extractModel],
                  ["Answer", meta.answerModel],
                  ["Judge", meta.judgeModel],
                  ["Embeddings", meta.embedModel],
                  ["Recall budget", meta.recall],
                  ["v0.2 store", meta.storeV02],
                  ["v0.3 store", meta.storeV03],
                ].map(([k, v], i) => (
                  <div
                    key={k}
                    className={
                      i === 0
                        ? "grid gap-2 border-b border-border bg-black/60 px-5 py-4 sm:grid-cols-[160px_1fr] sm:gap-6 sm:px-6 sm:py-5"
                        : "grid gap-2 border-b border-border px-5 py-4 last:border-b-0 sm:grid-cols-[160px_1fr] sm:gap-6 sm:px-6 sm:py-5"
                    }
                  >
                    <dt className="font-mono text-xs uppercase tracking-[0.12em] text-white/45 sm:text-sm">
                      {k}
                    </dt>
                    <dd className="text-base leading-relaxed text-white sm:text-lg">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Telemetry */}
            <section className="mt-16 border-t border-border pt-14 sm:mt-20 sm:pt-16">
              <p className="label">Telemetry</p>
              <h2 className="display-xl mt-4 text-3xl text-white sm:text-4xl">
                v0.3 on Postgres
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white sm:text-lg">
                {meta.v03Telemetry}
              </p>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
                Packed context stays well under the 6,500 cap (mean ~1.3k tokens
                vs mem0 published mean ~7k) while accuracy moves up — useful for
                cost, not just score.
              </p>
            </section>

            {/* Categories */}
            <section className="mt-16 border-t border-border pt-14 sm:mt-20 sm:pt-16">
              <p className="label">Categories</p>
              <h2 className="display-xl mt-4 text-3xl text-white sm:text-4xl">
                By question type
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white sm:text-lg">
                Grey = v0.2 · Red = v0.3.
              </p>
              <div className="mt-10 grid gap-6 lg:grid-cols-2">
                {categories.map((c) => (
                  <div
                    key={c.key}
                    className="border border-border bg-black/70 p-5 sm:p-6"
                  >
                    <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-lg font-medium text-white sm:text-xl">
                        {c.label}
                      </h3>
                      <span className="font-mono text-xs text-white/45 sm:text-sm">
                        v0.2 {c.baselineFrac} · v0.3 {c.currentFrac}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="w-12 font-mono text-xs text-white/40">
                          v0.2
                        </span>
                        <GrainBar value={c.baseline} variant="baseline" />
                        <span className="w-14 text-right font-mono text-sm tabular-nums text-white/50">
                          {c.baseline}%
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-12 font-mono text-xs text-accent">
                          v0.3
                        </span>
                        <GrainBar value={c.current} variant="current" />
                        <span className="w-14 text-right font-mono text-sm tabular-nums text-accent">
                          {c.current}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Product suite */}
            <section className="mt-16 border-t border-border pt-14 sm:mt-20 sm:pt-16">
              <p className="label">Product suite</p>
              <h2 className="display-xl mt-4 text-3xl text-white sm:text-4xl">
                Our wedge
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white sm:text-lg">
                Staleness/conflict harness:{" "}
                <span className="text-accent">
                  mem01 {meta.productSuite.mem01}
                </span>
                . Same harness, mem0 OSS scored {meta.productSuite.mem0Oss}.
              </p>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
                {meta.productSuite.note} Not LoCoMo — the failure mode we
                optimize for.
              </p>
            </section>

            {/* Caveats */}
            <section className="mt-16 border-t border-border pt-14 sm:mt-20 sm:pt-16">
              <p className="label">Honesty</p>
              <h2 className="display-xl mt-4 text-3xl text-white sm:text-4xl">
                What we are not
                <br />
                claiming
              </h2>
              <ul className="mt-8 max-w-3xl space-y-5">
                <li className="border-l-2 border-accent/50 pl-5 text-base leading-relaxed text-white sm:text-lg">
                  {meta.publishedNote}
                </li>
                <li className="border-l-2 border-white/15 pl-5 text-base leading-relaxed text-white/85 sm:text-lg">
                  Single full run per version; LLM judge noise is roughly ±2
                  points on 1,540 questions.
                </li>
                <li className="border-l-2 border-white/15 pl-5 text-base leading-relaxed text-white/85 sm:text-lg">
                  Two conversations dipped slightly vs v0.2 while eight improved
                  — overall still +{overall.deltaPts} pts.
                </li>
                <li className="border-l-2 border-white/15 pl-5 text-base leading-relaxed text-white/85 sm:text-lg">
                  v0.2 used in-memory store; v0.3 used Postgres. Accuracy is
                  treated as store-independent; latency claims are from the
                  Postgres path only.
                </li>
              </ul>
            </section>

            {/* Bottom line */}
            <section className="mt-16 border border-border bg-black/60 px-6 py-10 sm:mt-20 sm:px-10 sm:py-12">
              <p className="label">Bottom line</p>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white sm:text-xl">
                Under a fixed, disclosed stack (gpt-4o-mini everywhere), mem01
                moved from {overall.baseline.pct}% → {overall.current.pct}% on
                LoCoMo-10 with multi-signal retrieval and a production store
                shape. Gains are across all four non-adversarial categories.
                Stronger published vendor numbers with gpt-4o-class judges are a
                different comparison — we keep our model choice public.
              </p>
              <Link
                href="/#benchmarks"
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 bg-white px-7 text-[13px] font-semibold uppercase tracking-[0.08em] text-black transition hover:bg-accent"
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
