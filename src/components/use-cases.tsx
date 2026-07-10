/**
 * Use cases where mem01's wedge actually matters —
 * belief lifecycle, scopes, self-host, lean recall.
 * Not generic "healthcare / e‑commerce" filler.
 */

const cases = [
  {
    code: "01",
    title: "Coding agents that share project memory",
    leverage:
      "Stack, monorepo tools, and “we use light mode now” change over a repo’s life. Append-only memory keeps old toolchains in the prompt.",
    how: "Scope by user + project. SUPERSEDE when the project switches package manager, model, or conventions. Cursor / Claude / custom agents hit the same HTTP API.",
    not: "One-shot scripts with no shared state — skip a memory layer.",
  },
  {
    code: "02",
    title: "Long-running agents when user state flips",
    leverage:
      "Location, job, plan tier, and preferences are single-slot truths. Stacked facts force the model to guess which one is current.",
    how: "Default recall is active-only. Opt into history when the question is temporal (“before SF?”) without poisoning every turn.",
    not: "Pure multi-hop “who works with whom across orgs” — a temporal graph fits better.",
  },
  {
    code: "03",
    title: "Self-hosted / data-boundary teams",
    leverage:
      "Agent memory often includes code context, internal names, and PII. SaaS memory is a non-starter for many shops.",
    how: "docker compose · Postgres + pgvector on your network. Same remember / recall shape as a managed API, under your keys.",
    not: "Zero-ops hobby demos that only need a cloud key and never leave the laptop.",
  },
  {
    code: "04",
    title: "Multi-tool agents without memory cross-talk",
    leverage:
      "One user, several agents: a coder, a support bot, a research runner. Shared user prefs should travel; agent scratch should not.",
    how: "user / project / agent / session scopes. Share what’s meant to be shared; isolate the rest.",
    not: "A single chat window with no second agent or project boundary.",
  },
];

export function UseCases() {
  return (
    <section
      id="use-cases"
      className="scroll-mt-20 border-t border-border py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="max-w-2xl">
          <p className="label">Use cases</p>
          <h2 className="display-xl mt-4 text-4xl text-white sm:text-5xl">
            Where we have
            <br />
            leverage
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white">
            Not every product needs belief memory. These are the jobs where
            staleness, scopes, and self-host actually change the outcome.
          </p>
        </div>

        <div className="mt-14 grid gap-px bg-border lg:grid-cols-2">
          {cases.map((c) => (
            <article
              key={c.code}
              className="flex flex-col bg-black/80 p-6 backdrop-blur-sm sm:p-8"
            >
              <span className="font-mono text-[11px] tracking-[0.16em] text-accent">
                {c.code}
              </span>
              <h3 className="mt-3 text-lg font-medium tracking-tight text-white sm:text-xl">
                {c.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/80">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                  Why here ·{" "}
                </span>
                {c.leverage}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent/80">
                  How mem01 ·{" "}
                </span>
                {c.how}
              </p>
              <p className="mt-auto pt-5 text-sm leading-relaxed text-white/45">
                <span className="font-mono text-[10px] uppercase tracking-wider">
                  Skip if ·{" "}
                </span>
                {c.not}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
