const steps = [
  {
    n: "01",
    title: "remember",
    body: "Send messages. One extraction pass classifies belief ops: ADD, UPDATE, SUPERSEDE, INVALIDATE, MERGE — then writes to Postgres + pgvector.",
  },
  {
    n: "02",
    title: "beliefs evolve",
    body: "New truths replace old ones. Superseded and invalidated beliefs stay for audit, drop out of active recall.",
  },
  {
    n: "03",
    title: "recall",
    body: "Embed the query, filter by scope, apply conflict rules, pack to a token budget. No LLM on the hot path.",
  },
];

export function How() {
  return (
    <section
      id="how"
      className="scroll-mt-20 border-t border-border py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="max-w-2xl">
          <p className="label">System</p>
          <h2 className="display-xl mt-4 text-4xl text-white sm:text-5xl">
            Three calls.
            <br />
            One truth.
          </h2>
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
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
