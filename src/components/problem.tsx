const pains = [
  {
    code: "01",
    title: "Facts only grow",
    body: "Most memory layers ADD. Preferences flip, jobs change, cities move — the old fact still sits in the prompt.",
  },
  {
    code: "02",
    title: "Agents reconcile",
    body: "When NY and SF both retrieve, the LLM covers the mess. Looks fine in a demo. Fails in production.",
  },
  {
    code: "03",
    title: "Quality decays",
    body: "Token budgets fill with contradictions. Cost climbs. Correctness slides the other way.",
  },
];

export function Problem() {
  return (
    <section
      id="problem"
      className="scroll-mt-20 border-t border-border py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="max-w-2xl">
          <p className="label">The problem</p>
          <h2 className="display-xl mt-4 text-4xl text-white sm:text-5xl">
            Append-only
            <br />
            becomes wrong
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
            Users change their minds. Agents that remember everything end up
            remembering the past louder than the present.
          </p>
        </div>

        <div className="mt-14 grid gap-px bg-border sm:grid-cols-3">
          {pains.map((p) => (
            <div
              key={p.code}
              className="bg-black/80 p-6 backdrop-blur-sm transition hover:bg-card sm:p-8"
            >
              <span className="font-mono text-[11px] tracking-[0.16em] text-accent">
                {p.code}
              </span>
              <h3 className="mt-4 text-lg font-medium tracking-tight text-white">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
