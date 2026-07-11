const features = [
  {
    code: "A1",
    title: "Belief lifecycle",
    body: "ADD · UPDATE · SUPERSEDE · INVALIDATE · MERGE — not just store another string.",
  },
  {
    code: "A2",
    title: "Multi-signal recall",
    body: "Vector + lexical/entity search, RRF fusion, MMR diversity. Conflict filter + token packer. Still zero LLM on read.",
  },
  {
    code: "A3",
    title: "Token discipline",
    body: "Budgeted packing keeps memory blocks tight. Eval runs pack far under a 6.5k cap when truth is clean.",
  },
  {
    code: "B1",
    title: "History when you need it",
    body: "Default recall is active-only. include_history or POST /v1/history for labeled timelines — past is not erased.",
  },
  {
    code: "B2",
    title: "Postgres + pgvector",
    body: "Production store in dev and deploy. Neon or any Postgres with vectors. Self-hosted first.",
  },
  {
    code: "B3",
    title: "Agent scopes",
    body: "User, project, agent, session. Share what should be shared; isolate the rest.",
  },
];

export function Features() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="max-w-2xl text-on-stage">
          <p className="label">Product</p>
          <h2 className="display-xl mt-4 text-4xl text-white sm:text-5xl">
            Infrastructure,
            <br />
            not a chat toy
          </h2>
        </div>
        <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.code}
              className="bg-black/80 p-6 backdrop-blur-sm sm:p-7"
            >
              <span className="font-mono text-[10px] tracking-[0.16em] text-muted-dim">
                {f.code}
              </span>
              <h3 className="mt-3 text-base font-medium text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
