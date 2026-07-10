import { ArrowRight, Terminal } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex items-center gap-3 border border-border-bright bg-black/50 px-3 py-1.5 font-mono text-[11px] tracking-[0.16em] uppercase text-muted backdrop-blur-sm">
            <span className="signal" />
            Self-hosted · Belief memory · Open source
          </div>

          <p className="mb-4 font-mono text-[12px] tracking-[0.2em] uppercase text-muted-dim">
            mem01 ( agent memory )
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

          <p className="mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Self-hosted memory for AI agents that updates when the truth
            changes — so they don&apos;t keep acting on yesterday&apos;s facts.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-2 bg-white px-7 text-[13px] font-semibold uppercase tracking-[0.08em] text-black transition-colors hover:bg-accent sm:w-auto"
            >
              <GitHubIcon className="h-4 w-4 shrink-0" />
              <span>Start on GitHub</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </a>
            <a
              href={site.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-2 border border-white/25 bg-black/40 px-7 text-[13px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/5 sm:w-auto"
            >
              <Terminal className="h-4 w-4 shrink-0" />
              <span>Quick start</span>
            </a>
          </div>

          <p className="mt-5 font-mono text-[11px] tracking-wide text-muted-dim">
            $ {site.dockerOneLiner}
          </p>
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
