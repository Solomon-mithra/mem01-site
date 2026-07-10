const features = [
  {
    code: "A1",
    title: "Belief lifecycle",
    body: "ADD · UPDATE · SUPERSEDE · INVALIDATE · MERGE — not just store another string.",
  },
  {
    code: "A2",
    title: "Zero-LLM recall",
    body: "Vector search, scope filters, conflict rules, token packer. Fast hot path.",
  },
  {
    code: "A3",
    title: "Token discipline",
    body: "Budgeted packing keeps memory blocks tight so agents stay cheap.",
  },
  {
    code: "B1",
    title: "Postgres + pgvector",
    body: "Production store in dev and deploy. Neon or any Postgres with vectors.",
  },
  {
    code: "B2",
    title: "Self-hosted first",
    body: "docker compose up. Your network, your keys, your compliance boundary.",
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
        <div className="max-w-2xl">
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
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
