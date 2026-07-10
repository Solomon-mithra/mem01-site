import type { Metadata } from "next";
import Link from "next/link";
import { GitHubIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { SiteBackground } from "@/components/site-background";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "mem01 — Benchmarks",
  description:
    "mem01 measured on LoCoMo with mem0's open-sourced methodology: 77.9% overall, 100% on staleness and conflict handling, zero LLM calls on reads.",
};

const headline = [
  { value: "77.9%", label: "LoCoMo, 1,540 questions" },
  { value: "100%", label: "staleness suite (mem0 OSS: 40%)" },
  { value: "0", label: "LLM calls on the read path" },
];

const categories = [
  { name: "Multi-hop", v0: "13.8%", v02: "83.3%", detail: "235/282" },
  { name: "Temporal", v0: "39.6%", v02: "74.5%", detail: "239/321" },
  { name: "Open-domain", v0: "12.5%", v02: "74.0%", detail: "71/96" },
  { name: "Single-hop", v0: "36.9%", v02: "77.9%", detail: "655/841" },
];

const changes = [
  {
    change: "Adopted mem0's published answer and judge prompts",
    layer: "eval harness",
    why: "71% of baseline failures were refusals under a one-line answerer, graded by a stricter judge than any published score uses",
  },
  {
    change: "Recall envelope raised to 6,500 tokens",
    layer: "eval config",
    why: "published systems retrieve ~7k tokens per query; multi-hop questions need many beliefs visible at once",
  },
  {
    change: "Extractor preserves concrete specifics",
    layer: "mem01 core",
    why: "names, places, titles, and dates were being abstracted away ('Sweden' stored as 'her home country')",
  },
  {
    change: "Episodes are dated ADDs, never superseded",
    layer: "mem01 core",
    why: "repeated activities were collapsing into one belief that kept only the latest date; supersede now applies to state, not events",
  },
  {
    change: "Extraction retries once on malformed JSON",
    layer: "mem01 core",
    why: "one bad model sample should drop a batch at worst, never crash an ingestion",
  },
];

export default function Benchmarks() {
  return (
    <>
      <SiteBackground />
      <div className="relative z-10 flex min-h-full flex-1 flex-col">
        <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-black/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
            <Link href="/" className="flex items-center" aria-label="mem01 home">
              <Logo size="lg" />
            </Link>
            <nav className="hidden items-center gap-8 md:flex">
              <Link
                href="/"
                className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted transition-colors hover:text-white"
              >
                Home
              </Link>
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-white">
                Benchmarks
              </span>
            </nav>
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center gap-2 border border-white/20 bg-transparent px-3.5 font-mono text-[11px] tracking-[0.12em] uppercase text-white transition-colors hover:border-accent hover:text-accent"
            >
              <GitHubIcon className="h-3.5 w-3.5 shrink-0" />
              <span>GitHub</span>
            </a>
          </div>
        </header>

        <main className="flex-1 pt-16">
          {/* Hero */}
          <section className="border-b border-border py-20 sm:py-24">
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
              <p className="label">Benchmarks</p>
              <h1 className="display-xl mt-4 max-w-3xl text-4xl text-white sm:text-5xl">
                Measured, not marketed
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white">
                mem01 run on LoCoMo using{" "}
                <span className="font-medium">
                  mem0&apos;s own open-sourced evaluation methodology
                </span>{" "}
                (answer prompts, judge, and scoring rules from
                mem0ai/memory-benchmarks), unmodified. Every number below is
                from a single measured run with its configuration stated.
              </p>

              <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-3">
                {headline.map((h) => (
                  <div key={h.label} className="bg-black p-6 sm:p-7">
                    <p className="display-xl text-4xl text-accent">{h.value}</p>
                    <p className="mt-2 font-mono text-[10px] tracking-[0.14em] uppercase text-muted">
                      {h.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Story */}
          <section className="border-b border-border py-16 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
              <p className="label">v0 to v0.2</p>
              <h2 className="display-xl mt-4 text-3xl text-white sm:text-4xl">
                31.7% to 77.9% in three measured iterations
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
                The v0 baseline scored 31.7%. Failure analysis attributed most
                of the gap to the evaluation pipeline, not the memory store: a
                harsher judge than the published rubric, an answering layer
                that refused when the correct memory was already in context,
                and an 800-token recall budget against the ~7,000 that
                published systems use. Two real defects in mem01 also
                surfaced and were fixed: the extractor abstracted away
                specifics, and the belief lifecycle collapsed repeated events
                into a single belief. The staleness suite stayed at 100%
                through every change.
              </p>

              <div className="mt-10 overflow-x-auto border border-border">
                <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-card">
                      <th className="px-5 py-4 font-mono text-[10px] font-normal tracking-[0.14em] uppercase text-muted">
                        Change
                      </th>
                      <th className="px-5 py-4 font-mono text-[10px] font-normal tracking-[0.14em] uppercase text-muted">
                        Layer
                      </th>
                      <th className="px-5 py-4 font-mono text-[10px] font-normal tracking-[0.14em] uppercase text-muted">
                        Why
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {changes.map((row, i) => (
                      <tr
                        key={row.change}
                        className={cn(
                          "border-b border-border last:border-0",
                          i % 2 === 0 ? "bg-black" : "bg-card/60",
                        )}
                      >
                        <td className="px-5 py-3.5 text-[13px] text-white/90">
                          {row.change}
                        </td>
                        <td className="px-5 py-3.5 font-mono text-[11px] uppercase tracking-wide text-accent">
                          {row.layer}
                        </td>
                        <td className="px-5 py-3.5 text-[13px] text-muted">
                          {row.why}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Category results */}
          <section className="border-b border-border py-16 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
              <p className="label">Results by category</p>
              <h2 className="display-xl mt-4 text-3xl text-white sm:text-4xl">
                LoCoMo, 1,540 non-adversarial questions
              </h2>

              <div className="mt-10 overflow-x-auto border border-border">
                <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-card">
                      <th className="px-5 py-4 font-mono text-[10px] font-normal tracking-[0.14em] uppercase text-muted">
                        Category
                      </th>
                      <th className="px-5 py-4 font-mono text-[10px] font-normal tracking-[0.14em] uppercase text-muted">
                        v0 baseline
                      </th>
                      <th className="px-5 py-4 font-mono text-[10px] font-normal tracking-[0.14em] uppercase text-white">
                        v0.2
                      </th>
                      <th className="px-5 py-4 font-mono text-[10px] font-normal tracking-[0.14em] uppercase text-muted">
                        Questions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((row, i) => (
                      <tr
                        key={row.name}
                        className={cn(
                          "border-b border-border last:border-0",
                          i % 2 === 0 ? "bg-black" : "bg-card/60",
                        )}
                      >
                        <td className="px-5 py-3.5 text-[13px] text-white/90">
                          {row.name}
                        </td>
                        <td className="px-5 py-3.5 font-mono text-[13px] text-muted">
                          {row.v0}
                        </td>
                        <td className="px-5 py-3.5 font-mono text-[13px] text-accent">
                          {row.v02}
                        </td>
                        <td className="px-5 py-3.5 font-mono text-[13px] text-muted">
                          {row.detail}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 font-mono text-[10px] tracking-wide text-white/70">
                overall 1200/1540 = 77.9% · category 5 (adversarial) excluded,
                matching mem0&apos;s published setup
              </p>
            </div>
          </section>

          {/* Methodology + caveats */}
          <section className="py-16 sm:py-20">
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
              <p className="label">Methodology and caveats</p>
              <h2 className="display-xl mt-4 text-3xl text-white sm:text-4xl">
                The fine print, up front
              </h2>
              <div className="mt-8 grid gap-px border border-border bg-border lg:grid-cols-2">
                <div className="bg-black p-6 sm:p-7">
                  <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-accent">
                    Configuration
                  </p>
                  <ul className="mt-4 space-y-2.5 text-sm text-muted">
                    <li>
                      Models: gpt-4o-mini for extraction, answering, and
                      judging; text-embedding-3-small for vectors.
                    </li>
                    <li>
                      Recall: capped at 6,500 tokens per query, zero LLM calls
                      on the read path. mem0&apos;s published run averages
                      6,956 tokens.
                    </li>
                    <li>
                      Writes: one LLM call per message batch, with a single
                      retry on malformed output. Zero ingestion errors across
                      all 10 conversations.
                    </li>
                    <li>
                      Data: LoCoMo-10 (Snap Research, ACL 2024), sessions
                      ingested in order with their real timestamps.
                    </li>
                  </ul>
                </div>
                <div className="bg-black p-6 sm:p-7">
                  <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-accent">
                    Honest caveats
                  </p>
                  <ul className="mt-4 space-y-2.5 text-sm text-muted">
                    <li>
                      mem0&apos;s published 92.5 uses gpt-4o-class answer and
                      judge models; this run used gpt-4o-mini throughout. Part
                      of the gap is model tier, not memory quality.
                    </li>
                    <li>
                      Single run; LLM-judge noise is roughly plus or minus 2
                      points at this sample size.
                    </li>
                    <li>
                      Accuracy was measured on the in-process store. Latency
                      claims for the deployed Postgres stack are deliberately
                      not made here until measured on it.
                    </li>
                    <li>
                      The staleness suite is authored by us and targets the
                      failure mode mem01 is designed for; it is small (5
                      scenarios) and published with the harness.
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">
                The premise of mem01 is that an agent should never invent the
                numbers. The same rule applies to its own benchmarks: one
                protocol, stated models, stated budgets, and the losing
                categories reported next to the winning ones.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
