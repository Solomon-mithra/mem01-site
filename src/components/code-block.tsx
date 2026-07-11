const snippet = `# remember — extract beliefs (1 LLM batch)
curl -s http://localhost:8080/v1/remember \\
  -H 'Content-Type: application/json' \\
  -d '{
    "user_id": "user_1",
    "project_id": "proj_acme",
    "messages": [
      {"role": "user", "content": "I live in San Francisco."}
    ]
  }'

# recall — multi-signal, 0 LLM (active beliefs only)
curl -s http://localhost:8080/v1/recall \\
  -H 'Content-Type: application/json' \\
  -d '{
    "user_id": "user_1",
    "project_id": "proj_acme",
    "query": "Where does the user live?",
    "max_memory_tokens": 800,
    "k": 20,
    "include_history": false
  }'

# history — full timeline for audit / "before SF?"
curl -s http://localhost:8080/v1/history \\
  -H 'Content-Type: application/json' \\
  -d '{
    "user_id": "user_1",
    "project_id": "proj_acme",
    "include_invalidated": true,
    "limit": 50
  }'

# correct / forget — human fix or hard invalidate
# POST /v1/correct  { "memory_id": "bel_...", "new_value": "..." }
# POST /v1/forget   { "memory_id": "bel_...", "reason": "optional" }`;

export function CodeBlock() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div className="text-on-stage">
            <p className="label">API</p>
            <h2 className="display-xl mt-4 text-4xl text-white sm:text-5xl">
              Endpoints
              <br />
              that ship
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white sm:text-lg">
              HTTP + Python SDK. Core path is{" "}
              <code className="rounded bg-black/50 px-1.5 py-0.5 font-mono text-sm text-accent">
                remember
              </code>{" "}
              /{" "}
              <code className="rounded bg-black/50 px-1.5 py-0.5 font-mono text-sm text-accent">
                recall
              </code>
              . Scope with{" "}
              <code className="rounded bg-black/50 px-1.5 py-0.5 font-mono text-sm text-white/90">
                user_id
              </code>
              {" + optional "}
              <code className="rounded bg-black/50 px-1.5 py-0.5 font-mono text-sm text-white/90">
                project_id
              </code>
              , session, agent.
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-white/90 sm:text-base">
              <li>
                <span className="font-mono text-accent">POST /v1/remember</span>{" "}
                — extract &amp; apply belief ops
              </li>
              <li>
                <span className="font-mono text-accent">POST /v1/recall</span> —
                multi-signal pack;{" "}
                <span className="font-mono text-white/70">include_history</span>{" "}
                for labeled past
              </li>
              <li>
                <span className="font-mono text-accent">POST /v1/history</span> —
                chronological audit timeline
              </li>
              <li>
                <span className="font-mono text-accent">POST /v1/correct</span> ·{" "}
                <span className="font-mono text-accent">/v1/forget</span> — human
                supersede or invalidate
              </li>
              <li>
                <span className="font-mono text-accent">GET /health</span> —
                liveness
              </li>
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-white/70">
              Defaults shown (k=20, 800 tokens) are the product hot path. LoCoMo
              evals use a larger envelope for fair open-harness comparison —
              see Research.
            </p>
          </div>
          <div className="border border-border bg-black/80 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted-dim">
                shell
              </span>
              <span className="font-mono text-[10px] tracking-wide text-muted-dim">
                :8080
              </span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[11px] leading-relaxed text-white/70 sm:text-[12px]">
              <code>{snippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
