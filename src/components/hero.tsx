import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mx-auto max-w-3xl text-center text-on-stage">
          <div className="mb-8 inline-flex items-center gap-3 border border-border-bright bg-black/60 px-3 py-1.5 font-mono text-[11px] tracking-[0.16em] uppercase text-white/80 backdrop-blur-sm">
            <span className="signal" />
            Self-hosted · Belief memory · Open source
          </div>

          <p className="mb-4 font-mono text-[12px] tracking-[0.2em] uppercase text-white/90">
            mem01 · memory for AI agents
          </p>

          <h1 className="display-xl text-balance text-[2.75rem] text-white sm:text-6xl md:text-7xl">
            Memory that
            <br />
            stays{" "}
            <span className="relative inline-block">
              correct
              <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-accent" />
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-white sm:text-lg">
            Open-source, self-hosted memory for AI agents that updates when the
            truth changes — so they don&apos;t keep acting on yesterday&apos;s
            facts. Built for long-term agent memory that stays correct.
          </p>
        </div>

        {/* Two-part product split */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 lg:grid-cols-2">
          <article className="flex flex-col border border-border-bright bg-black/70 p-6 text-left backdrop-blur-md sm:p-7">
            <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-white/55">
              Engine · self-hosted
            </p>
            <h2 className="mt-3 text-2xl font-medium text-white">mem01</h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">
              Belief lifecycle, multi-signal recall, and Postgres / pgvector.
              Run the engine with Docker or call it from Python when you own
              the agent loop.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <a
                href={site.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 border border-white/25 bg-black/40 px-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:border-white hover:bg-white/5"
              >
                <GitHubIcon className="h-3.5 w-3.5 shrink-0" />
                <span>Engine on GitHub</span>
              </a>
              <a
                href={site.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 border border-white/15 px-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-white/80 transition-colors hover:border-white/40 hover:text-white"
              >
                <Terminal className="h-3.5 w-3.5 shrink-0" />
                <span>Quick start</span>
              </a>
            </div>
            <p className="mt-4 font-mono text-[10px] tracking-wide text-white/50">
              $ {site.dockerOneLiner}
            </p>
          </article>

          <article className="flex flex-col border border-accent/50 bg-black/80 p-6 text-left backdrop-blur-md sm:p-7">
            <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-accent">
              Package · OpenAI Agents SDK
            </p>
            <h2 className="mt-3 text-2xl font-medium text-white">Mem01Session</h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">
              One Session object for the Agents SDK: keep each chat separate,
              recall durable user beliefs across conversations.{" "}
              <span className="text-white/90">pip install mem01session</span>
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Link
                href={site.mem01sessionPath}
                className="inline-flex h-11 items-center justify-center gap-2 bg-white px-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-black transition-colors hover:bg-accent"
              >
                <span>Get started</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0" />
              </Link>
              <a
                href={site.mem01sessionGithubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 border border-white/25 px-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:border-white/50"
              >
                <GitHubIcon className="h-3.5 w-3.5 shrink-0" />
                <span>Package repo</span>
              </a>
            </div>
            <p className="mt-4 font-mono text-[10px] tracking-wide text-white/50">
              from mem01session import memSession
            </p>
          </article>
        </div>

        {/* Dual panel demo */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="frame overflow-hidden bg-black/70 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted-dim">
                demo · location_update
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] uppercase text-accent">
                <span className="signal h-1.5 w-1.5" />
                live
              </span>
            </div>
            <div className="grid sm:grid-cols-2">
              <div className="border-b border-border p-5 sm:border-b-0 sm:border-r">
                <p className="mb-4 font-mono text-[10px] tracking-[0.16em] uppercase text-muted">
                  bag of facts
                </p>
                <ul className="space-y-3 font-mono text-[12px] leading-relaxed text-muted">
                  <li className="flex gap-3">
                    <span className="text-white/40">×</span>
                    <span>User lives in New York City</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-white/40">×</span>
                    <span>User moved NYC → San Francisco</span>
                  </li>
                </ul>
                <p className="mt-5 font-mono text-[10px] leading-relaxed tracking-wide text-muted-dim">
                  Both active. Agent invents a cover story.
                </p>
              </div>
              <div className="relative bg-white/[0.03] p-5">
                <div className="glyph-dots-dense pointer-events-none absolute inset-0 opacity-40" />
                <div className="relative">
                  <p className="mb-4 font-mono text-[10px] tracking-[0.16em] uppercase text-white">
                    mem01 · recall (now)
                  </p>
                  <ul className="space-y-3 font-mono text-[12px] leading-relaxed">
                    <li className="flex items-start gap-3 text-muted-dim">
                      <span>—</span>
                      <span className="line-through">
                        User lives in New York City
                      </span>
                      <span className="ml-auto shrink-0 text-[9px] tracking-[0.12em] uppercase text-muted-dim">
                        out of prompt
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-white">
                      <span className="text-accent">●</span>
                      <span>User lives in San Francisco</span>
                      <span className="ml-auto shrink-0 text-[9px] tracking-[0.12em] uppercase text-accent">
                        active
                      </span>
                    </li>
                  </ul>
                  <p className="mt-5 font-mono text-[10px] leading-relaxed tracking-wide text-muted">
                    Default: one truth for the agent.
                  </p>
                </div>
              </div>
            </div>
            <div className="border-t border-border bg-black/40 p-5">
              <p className="mb-3 font-mono text-[10px] tracking-[0.16em] uppercase text-accent">
                mem01 · history / include_history
              </p>
              <p className="mb-3 font-mono text-[11px] text-muted-dim">
                “Where did we live before SF?”
              </p>
              <ul className="space-y-2 font-mono text-[12px] leading-relaxed">
                <li className="text-white">
                  <span className="text-accent">●</span>{" "}
                  <span className="text-muted-dim">[active]</span> User lives in
                  San Francisco
                </li>
                <li className="text-muted">
                  <span className="text-white/40">○</span>{" "}
                  <span className="text-muted-dim">[superseded]</span> User lives
                  in New York City
                </li>
              </ul>
              <p className="mt-4 font-mono text-[10px] leading-relaxed tracking-wide text-muted-dim">
                Previous facts stay in the DB and can be recalled on purpose —
                labeled so the agent never confuses past with present.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
