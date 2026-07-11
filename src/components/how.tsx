const steps = [
  {
    n: "01",
    title: "remember",
    body: "Send messages. One extraction pass classifies belief ops: ADD, UPDATE, SUPERSEDE, INVALIDATE, MERGE — then embeds and writes to Postgres + pgvector.",
  },
  {
    n: "02",
    title: "beliefs evolve",
    body: "New truths replace old ones. Superseded and invalidated beliefs stay for audit; default recall only packs what is active now.",
  },
  {
    n: "03",
    title: "recall",
    body: "Vector + lexical/entity search, RRF fusion, conflict filter, MMR diversity, then pack to a token budget. Multi-signal by default. Still zero LLM on the hot path.",
  },
];

export function How() {
  return (
    <section
      id="how"
      className="scroll-mt-20 border-t border-border py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="max-w-2xl text-on-stage">
          <p className="label">System</p>
          <h2 className="display-xl mt-4 text-4xl text-white sm:text-5xl">
            Three calls.
            <br />
            One truth.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white">
            Plus{" "}
            <code className="rounded bg-black/50 px-1.5 py-0.5 font-mono text-sm text-accent">
              history
            </code>
            ,{" "}
            <code className="rounded bg-black/50 px-1.5 py-0.5 font-mono text-sm text-accent">
              correct
            </code>
            , and{" "}
            <code className="rounded bg-black/50 px-1.5 py-0.5 font-mono text-sm text-accent">
              forget
            </code>{" "}
            when you need audit, human fix, or hard delete.
          </p>
        </div>

        <div className="mt-14 grid gap-px bg-border md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="bg-black/80 p-6 backdrop-blur-sm sm:p-8">
              <span className="font-mono text-3xl font-medium tracking-tighter text-white/15">
                {s.n}
              </span>
              <h3 className="mt-4 font-mono text-sm tracking-[0.08em] text-accent">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
