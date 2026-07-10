const snippet = `# remember
curl -s localhost:8080/v1/remember \\
  -H 'Content-Type: application/json' \\
  -d '{
    "user_id": "user_1",
    "messages": [
      {"role": "user", "content": "I live in San Francisco."}
    ]
  }'

# recall — no LLM on this path
curl -s localhost:8080/v1/recall \\
  -H 'Content-Type: application/json' \\
  -d '{
    "user_id": "user_1",
    "query": "Where does the user live?",
    "max_memory_tokens": 800
  }'`;

export function CodeBlock() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="label">API</p>
            <h2 className="display-xl mt-4 text-4xl text-white sm:text-5xl">
              Two endpoints
              <br />
              to ship
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white">
              HTTP + Python SDK.{" "}
              <code className="rounded bg-black/50 px-1.5 py-0.5 font-mono text-sm text-accent">
                remember
              </code>{" "}
              extracts beliefs;{" "}
              <code className="rounded bg-black/50 px-1.5 py-0.5 font-mono text-sm text-accent">
                recall
              </code>{" "}
              returns a budgeted context string. Also{" "}
              <code className="rounded bg-black/50 px-1.5 py-0.5 font-mono text-sm text-white/80">
                correct
              </code>{" "}
              and{" "}
              <code className="rounded bg-black/50 px-1.5 py-0.5 font-mono text-sm text-white/80">
                forget
              </code>{" "}
              when humans need to fix the model.
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
            <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-relaxed text-muted sm:text-[13px]">
              <code>{snippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
