import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Nav } from "@/components/nav";
import { SiteBackground } from "@/components/site-background";
import { Footer } from "@/components/footer";
import { GitHubIcon } from "@/components/icons";
import scalingEvidence from "@/data/prepared-input-scaling.json";
import { absoluteUrl, site } from "@/lib/site";
import styles from "./mem01session.module.css";

const title = "Session Memory for the OpenAI Agents SDK | Mem01Session";
const description =
  "Start every conversation fresh without making your OpenAI agent forget the user. Mem01Session keeps chats separate and remembers useful facts between them.";
const ogImage = absoluteUrl("/mem01session/opengraph-image.png");

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "openai agents sdk memory",
    "agents sdk long term memory",
    "custom agents sdk session",
    "sqlitesession long term memory",
    "agents sdk remember users",
    "Mem01Session",
    "mem01session",
    "pip install mem01session",
  ],
  alternates: { canonical: absoluteUrl("/mem01session/") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/mem01session/"),
    siteName: site.name,
    title,
    description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Session memory for the OpenAI Agents SDK with Mem01Session",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

const pipInstall = `pip install mem01session`;

const environment = `# Required
OPENAI_API_KEY=...
DATABASE_URL=postgresql://...

# Optional defaults
MEM01_LLM_MODEL=gpt-5.6-sol
MEM01_EMBEDDING_MODEL=text-embedding-3-small`;

const heroSnippet = `from mem01session import memSession

session = memSession(
    session_id="chat-friday",
    user_id="alex",
)

# Required for long-term recall on every run:
# run_config=session.run_config()`;

const quickstart = `from agents import Agent, Runner
from mem01session import memSession

agent = Agent(
    name="Assistant",
    instructions="Use supplied memory as evidence and acknowledge unknown personal facts.",
    model="gpt-5.6-sol",
)
session = memSession(
    session_id="chat-friday",
    user_id="alex",
)

try:
    result = await Runner.run(
        agent,
        "Where do I live now?",
        session=session,
        run_config=session.run_config(),
    )
finally:
    await session.close()`;

const management = `beliefs = await session.memory_history(
    include_invalidated=True,
)
if beliefs:
    await session.correct_memory(
        beliefs[0].id,
        "Lives in San Francisco",
    )
await session.forget_memory(
    "belief-to-remove",
    reason="user requested deletion",
)

# Explicit barrier when your application needs durable completion now.
await session.flush_memory()

# Separate scopes: chat transcript vs durable user memory
await session.clear_session()  # this chat's SQLite only
await session.clear_memory()   # all durable beliefs for this user_id`;

const sourceInstall = `# Optional: develop from sibling source checkouts
cd mem01session
python -m venv .venv
source .venv/bin/activate
pip install -e "../mem01[openai]" -e "."`;

const strategyLabels = {
  fresh_stock: "Fresh stock Session",
  reused_stock: "Reused stock Session",
  mem01session: "Mem01Session",
} as const;
const conversations = [1, 10, 40] as const;

function evidenceRow(strategy: keyof typeof strategyLabels, conversation: number) {
  const row = scalingEvidence.find(
    (candidate) =>
      candidate.strategy === strategy && candidate.conversation === conversation,
  );
  if (!row) throw new Error(`Missing scaling evidence: ${strategy}/${conversation}`);
  return row;
}

const comparison = [
  {
    name: "Agents SDK Sessions",
    href: "https://openai.github.io/openai-agents-python/sessions/",
    integration: "Framework Session",
    memory: "Raw history for one session ID",
    lifecycle: "Backend history operations",
  },
  {
    name: "mem0 Agents SDK integration",
    href: "https://docs.mem0.ai/integrations/openai-agents-sdk",
    integration: "Memory tools",
    memory: "Semantic memory",
    lifecycle: "Product-specific",
  },
  {
    name: "Hindsight Agents SDK guide",
    href: "https://hindsight.vectorize.io/blog/2026/04/17/openai-agents-persistent-memory",
    integration: "Memory tools",
    memory: "Persistent memory",
    lifecycle: "Product-specific",
  },
  {
    name: "Mem01Session",
    href: "#architecture",
    integration: "Session plus framework hooks",
    memory: "Raw current chain plus beliefs",
    lifecycle: "Supersede, correct, forget",
  },
];

const architectureHighlights = [
  "Framework Session plus per-run hooks — not a model-selected memory tool.",
  "Current chat stays in the internal SDK SQLiteSession; durable beliefs use your Postgres / pgvector.",
  "Eligible user/assistant turns queue extraction after the answer is ready; recall and lifecycle reads wait for that user's unfinished writes.",
  "Authority order: current user turn, then active recalled beliefs, then older SQLite claims. Commands inside records stay untrusted.",
];

const architectureDetails = [
  "Version 0.1 officially supports only the internally created SDK SQLiteSession for short-term storage.",
  "inner= remains a dependency-injection hook, not an official support guarantee for other Session backends.",
  "Reads retrieve active beliefs; superseded and invalidated beliefs are excluded by default.",
  "Recall uses embeddings and database retrieval, with no memory-specific generative LLM call.",
  "Provenance and abstention wording guide the answering model; they are not deterministic output validation.",
];

const faqs = [
  {
    q: "Why not start a fresh SQLiteSession?",
    a: "A new session ID does not inherit another Session's history. Mem01Session keeps each current chain separate while recalling durable beliefs for the same user.",
  },
  {
    q: "Why not reuse one Session?",
    a: "That can be reasonable for shorter histories, and the SDK also offers limits and compaction. Mem01Session adds semantic user beliefs, provenance, and explicit fact lifecycle across separate conversations.",
  },
  {
    q: "Is memory a tool?",
    a: "No. Session operations and the per-run model-input filter are framework-owned; the answering model does not decide whether to invoke a memory-search tool.",
  },
  {
    q: "Does recall call a generative LLM?",
    a: "No memory-specific generative call is used for recall. Reads still embed the query and perform database retrieval. Eligible writes queue extraction and embedding after the answer is ready; the next same-user read waits for unfinished work, so writes are not free.",
  },
  {
    q: "What wins when an old chat conflicts with a correction?",
    a: "The current user turn wins first, then the user's active recalled belief, then an older claim in that chat. Assistant replies remain context, not authoritative evidence of the user's facts.",
  },
  {
    q: "Does provenance guarantee abstention?",
    a: "No. The memory block supplies evidence and safety instructions, but deterministic enforcement would require application-level output validation.",
  },
  {
    q: "Where is data stored?",
    a: "Raw current-conversation items use the package's internal SDK SQLiteSession. Durable user beliefs use your Postgres database with pgvector.",
  },
  {
    q: "Is mem01 on PyPI?",
    a: "The engine distribution is mem01-engine; pip install mem01session pulls it automatically. The import path remains import mem01.",
  },
  {
    q: "Is it OpenAI-only?",
    a: "Yes. Version 0.1 intentionally supports OpenAI extraction, embeddings, and the OpenAI Agents SDK path.",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="label">{children}</p>;
}

function SectionHeading({
  eyebrow,
  title: sectionTitle,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-3xl text-on-stage">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="display-xl mt-4 text-4xl text-white sm:text-5xl">
        {sectionTitle}
      </h2>
      {intro ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
          {intro}
        </p>
      ) : null}
    </div>
  );
}

export default function Mem01SessionPage() {
  return (
    <>
      <SiteBackground />
      <div className="relative z-10 flex min-h-full flex-1 flex-col">
        <Nav />
        <main className="flex-1 pt-16">
          <section className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
            <div className="max-w-4xl text-on-stage">
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 border border-white/20 bg-black/70 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/75 backdrop-blur-sm">
                  <span className="signal" aria-hidden />
                  For the OpenAI Agents SDK
                </div>
                <div className="inline-flex items-center border border-white/20 bg-black/70 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/75 backdrop-blur-sm">
                  Open source · MIT
                </div>
                <div className="inline-flex items-center border border-accent/40 bg-black/70 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-accent backdrop-blur-sm">
                  pip install mem01session
                </div>
              </div>
              <div className="mt-7">
                <Eyebrow>The third option for agent memory</Eyebrow>
              </div>
              <h1 className="display-xl mt-7 text-5xl text-white sm:text-6xl lg:text-8xl">
                Session memory for the OpenAI Agents SDK
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/80 sm:text-xl">
                Start every conversation fresh without making your agent forget the
                user. Mem01Session remembers useful facts between chats and brings
                back only what matters now.
              </p>
            </div>

            <pre className={`${styles.code} mt-10 max-w-3xl`} tabIndex={0}>
              <code>{heroSnippet}</code>
            </pre>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#quickstart"
                className="inline-flex h-12 items-center gap-2 bg-white px-6 text-sm font-semibold uppercase tracking-[0.08em] text-black transition-colors hover:bg-accent"
              >
                Install with pip <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href={site.mem01sessionGithubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex h-12 items-center gap-2 border border-white/25 bg-black/50 px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:border-accent ${styles.accentTextHover}`}
              >
                <GitHubIcon className="h-4 w-4" /> Package on GitHub
              </a>
              <a
                href={site.mem01sessionPypiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex h-12 items-center gap-2 border border-white/15 px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white/80 transition-colors hover:border-white/40 hover:text-white ${styles.accentTextHover}`}
              >
                PyPI <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
              <a
                href={site.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex h-12 items-center gap-2 border border-white/15 px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white/70 transition-colors hover:border-white/30 hover:text-white ${styles.accentTextHover}`}
              >
                Prior mem01 engine
              </a>
            </div>
            <p className="mt-8 max-w-4xl border-t border-white/15 pt-5 font-mono text-[11px] leading-6 tracking-[0.06em] text-white/60">
              One Session object. Current-chat history stays in SQLite. Long-term
              memory stays in your Postgres database. Installing mem01session pulls
              the mem01-engine distribution; the import path remains{" "}
              <code className="text-white/80">import mem01</code>.
            </p>
          </section>

          <section id="problem" className={styles.section}>
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
              <SectionHeading
                eyebrow="Choose the memory behavior"
                title="Three reasonable ways to start the next chat."
                intro="The right choice depends on whether your app needs to remember a person across separate conversations."
              />
              <div className="mt-10 grid gap-5 lg:grid-cols-3">
                <article className={`${styles.panel} p-6`}>
                  <h3 className="text-2xl text-white">Start fresh. The agent forgets.</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/68">
                    A new <code className="font-mono text-white">session_id</code> gives
                    the agent a clean conversation, but nothing the same user said in
                    an earlier chat comes with it.
                  </p>
                </article>
                <article className={`${styles.panel} p-6`}>
                  <h3 className="text-2xl text-white">Reuse one Session. The history keeps growing.</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/68">
                    The agent can see earlier facts because every old message stays in
                    the same conversation history. Limits and compaction can help, but
                    this is still raw chat history.
                  </p>
                </article>
                <article className={`${styles.panel} border-accent/50 p-6`}>
                  <h3 className="text-2xl text-white">
                    Use Mem01Session. Each chat stays separate, but the user is remembered.
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/68">
                    Give each chat its own <code className="font-mono text-white">session_id</code>{" "}
                    and keep one stable <code className="font-mono text-white">user_id</code>.
                    Relevant facts can follow the user without replaying every previous
                    conversation.
                  </p>
                </article>
              </div>
              <p className="mt-7 max-w-3xl text-sm leading-relaxed text-white/58">
                Fresh and reused Sessions remain reasonable choices when an app does
                not need cross-conversation user memory.
              </p>
            </div>
          </section>

          <section id="quickstart" className={styles.section}>
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
              <SectionHeading
                eyebrow="Quickstart"
                title="Add memory to a normal Runner call."
                intro="Install from PyPI, set two environment variables, and pass a fresh run_config() on every Runner.run so long-term recall can inject."
              />

              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Python", "3.11+ declared"],
                  ["Install", "pip install mem01session"],
                  ["OpenAI", "OPENAI_API_KEY"],
                  ["Store", "Postgres + pgvector"],
                ].map(([label, value]) => (
                  <div key={label} className={`${styles.panel} p-4`}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
                      {label}
                    </p>
                    <p className="mt-2 font-mono text-sm text-white">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                <pre className={styles.code} tabIndex={0} aria-label="PyPI installation">
                  <code>{pipInstall}</code>
                </pre>
                <pre className={styles.code} tabIndex={0} aria-label="Environment configuration">
                  <code>{environment}</code>
                </pre>
              </div>

              <div className={`${styles.panel} mt-5 border-accent/40 p-5 sm:p-6`}>
                <h3 className={`font-mono text-sm uppercase tracking-[0.12em] ${styles.accentText}`}>
                  Required: fresh run_config() on every Runner run
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  Pass a fresh <code className="font-mono text-white">session.run_config()</code>{" "}
                  on every <code className="font-mono text-white">Runner.run</code>.{" "}
                  <code className="font-mono text-white">session=</code> alone keeps short-term
                  SQLite history; it does not inject long-term beliefs. The merge callback
                  captures the current query without creating persisted items. A later
                  model-input filter injects bounded recalled memory into model input only.
                </p>
              </div>

              <pre className={`${styles.code} mt-5`} tabIndex={0} aria-label="Runner integration">
                <code>{quickstart}</code>
              </pre>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div className={`${styles.panel} p-6`}>
                  <h3 className={`font-mono text-sm uppercase tracking-[0.12em] ${styles.accentText}`}>
                    session_id separates conversations
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/68">
                    Use a new value when the same user starts a new chat. SQLite
                    stores exact messages for that conversation.
                  </p>
                </div>
                <div className={`${styles.panel} p-6`}>
                  <h3 className={`font-mono text-sm uppercase tracking-[0.12em] ${styles.accentText}`}>
                    user_id connects the user
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/68">
                    Keep it stable across chats. Mem01Session uses it for relevant
                    long-term memories.
                  </p>
                </div>
              </div>

              <div className="mt-6 max-w-4xl space-y-3 text-sm leading-relaxed text-white/58">
                <p>
                  Synthetic memory is not saved to SQLite or sent back through
                  extraction. There is no separate memory API service, container, port,
                  or HTTP hop in the default path.
                </p>
                <p>
                  Optional source install for package development (editable siblings):
                </p>
              </div>
              <pre
                className={`${styles.code} mt-3 max-w-3xl opacity-90`}
                tabIndex={0}
                aria-label="Optional source installation"
              >
                <code>{sourceInstall}</code>
              </pre>
            </div>
          </section>

          <section id="try" className={styles.section}>
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
              <SectionHeading
                eyebrow="Get hands-on"
                title="Install, run, and inspect the package."
                intro="Use the published wheel for normal work, run the key-free deterministic demo when you want offline evidence, and browse the public source anytime."
              />
              <ol className="mt-10 grid gap-4 md:grid-cols-2">
                {[
                  ["1. Install", "pip install mem01session"],
                  [
                    "2. Configure",
                    "Set OPENAI_API_KEY and DATABASE_URL for live runs. The deterministic demo needs neither.",
                  ],
                  [
                    "3. Deterministic demo",
                    "mem01session-demo  (or python -m mem01session.demo) — key-free prepared-input evidence",
                  ],
                  [
                    "4. Source",
                    "Public MIT repos: mem01session package and the mem01 engine it builds on",
                  ],
                ].map(([label, copy]) => (
                  <li key={label} className={`${styles.panel} p-5`}>
                    <p className={`font-mono text-xs uppercase tracking-[0.14em] ${styles.accentText}`}>
                      {label}
                    </p>
                    <p className="mt-3 font-mono text-sm leading-relaxed text-white/75">{copy}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={site.mem01sessionGithubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 border border-white/25 px-5 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:border-accent"
                >
                  <GitHubIcon className="h-4 w-4" /> mem01session
                </a>
                <a
                  href={site.mem01sessionPypiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 border border-white/25 px-5 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:border-accent"
                >
                  PyPI package
                </a>
                <a
                  href={site.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 border border-white/15 px-5 text-sm font-semibold uppercase tracking-[0.08em] text-white/75 transition-colors hover:border-white/40"
                >
                  Prior engine
                </a>
              </div>
            </div>
          </section>

          <section id="architecture" className={styles.section}>
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
              <SectionHeading
                eyebrow="How it works"
                title="One chat stays exact. Useful facts can outlive it."
                intro="The Runner talks to one Session object; there is no separate memory API service, container, port, or HTTP hop in the default path."
              />
              <div className={`${styles.architecture} mt-10`}>
                <div className={styles.architectureCell}>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/55">
                    Step 1
                  </p>
                  <h3 className="mt-3 text-xl font-medium text-white">
                    Run a normal conversation.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    The SDK reads and writes current-chat items through the internal SDK
                    SQLiteSession.
                  </p>
                </div>
                <div className={styles.architectureCell}>
                  <p className={`font-mono text-xs uppercase tracking-[0.14em] ${styles.accentText}`}>
                    Step 2
                  </p>
                  <h3 className="mt-3 text-xl font-medium text-white">
                    Remember what may matter later.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    After a complete user and assistant exchange, Mem01Session queues
                    useful-fact extraction automatically in the embedded mem01 runtime.
                    The answer can render while that user&apos;s FIFO write finishes in
                    Postgres / pgvector.
                  </p>
                </div>
                <div className={styles.architectureCell}>
                  <p className={`font-mono text-xs uppercase tracking-[0.14em] ${styles.accentText}`}>
                    Step 3
                  </p>
                  <h3 className="mt-3 text-xl font-medium text-white">
                    Start a new chat without starting from zero.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    A stable user_id recalls relevant active memories as bounded model
                    input. Synthetic memory is not copied into SQLite.
                  </p>
                </div>
              </div>

              <ul className="mt-10 grid gap-px bg-border md:grid-cols-2">
                {architectureHighlights.map((item) => (
                  <li
                    key={item}
                    className="bg-black/75 p-5 text-sm leading-relaxed text-white/68 sm:p-6"
                  >
                    <span className={`mr-3 font-mono ${styles.accentText}`} aria-hidden>
                      +
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <details className="mt-6 border border-border-bright bg-black/60 p-5">
                <summary className="cursor-pointer font-mono text-xs uppercase tracking-[0.14em] text-white/70">
                  Deep detail · v0.1 support limits
                </summary>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-white/60">
                  {architectureDetails.map((item) => (
                    <li key={item}>
                      <span className={`mr-2 font-mono ${styles.accentText}`} aria-hidden>
                        ·
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          </section>

          <section id="demo-evidence" className={styles.section}>
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
              <SectionHeading
                eyebrow="Concrete proof"
                title="A move from NYC to San Francisco, remembered across chats."
                intro="Pass/fail is about prepared state and belief lifecycle. Model wording is an observation, not a product guarantee about every response."
              />
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {[
                  ["Chat 1", "The user lives in NYC and pays $2,400 in monthly rent."],
                  ["Chat 2", "The same user says they moved to San Francisco."],
                  [
                    "New chat",
                    "A fresh session_id asks where the user lives and what their earlier rent was.",
                  ],
                ].map(([label, copy]) => (
                  <article key={label} className={`${styles.panel} p-6`}>
                    <p
                      className={`font-mono text-xs uppercase tracking-[0.14em] ${styles.accentText}`}
                    >
                      {label}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-white/68">{copy}</p>
                  </article>
                ))}
              </div>

              <div className={`${styles.panel} mt-5 border-accent/50 p-6 sm:p-8`}>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/55">
                  Deterministic state (what must hold)
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/80">
                  <li>
                    <strong className="text-white">NYC is superseded</strong> in durable
                    history; <strong className="text-white">San Francisco is active</strong>.
                  </li>
                  <li>
                    The earlier <strong className="text-white">rent fact remains active</strong>{" "}
                    with provenance.
                  </li>
                  <li>
                    No sister-name belief exists; the run declined to invent a
                    sister&apos;s name when asked.
                  </li>
                </ul>
                <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-white/45">
                  Example live-model wording (observation only)
                </p>
                <blockquote className="mt-3 text-lg leading-relaxed text-white/85 sm:text-xl">
                  “You now live in San Francisco. Your prior monthly rent was $2,400.”
                </blockquote>
                <blockquote className="mt-3 text-base leading-relaxed text-white/65">
                  “I don&apos;t have your sister&apos;s name stored.”
                </blockquote>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-3">
                <p className={`${styles.panel} p-5 text-sm leading-relaxed text-white/65`}>
                  <strong className="text-white">Fresh stock Session:</strong> a new session
                  has no earlier-chat facts.
                </p>
                <p className={`${styles.panel} p-5 text-sm leading-relaxed text-white/65`}>
                  <strong className="text-white">Reused stock Session:</strong> the answer can
                  use all retained raw history.
                </p>
                <p className={`${styles.panel} p-5 text-sm leading-relaxed text-white/65`}>
                  <strong className="text-white">Mem01Session with a fresh session_id:</strong>{" "}
                  the answer uses relevant active memory for the same user.
                </p>
              </div>
            </div>
          </section>

          <section id="scaling" className={styles.section}>
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
              <SectionHeading
                eyebrow="Generated scaling artifact"
                title="See what reaches the model as conversations add up."
                intro="These are local deterministic fake, offline prepared model input measurements. The estimator is a UTF-8 bytes upper bound, not provider usage or billed tokens."
              />
              <div
                className={`${styles.tableWrap} mt-10`}
                tabIndex={0}
                aria-label="Generated prepared-input scaling evidence"
              >
                <table className={styles.table}>
                  <caption className="sr-only">
                    Prepared input items and UTF-8 upper-bound estimates
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Strategy</th>
                      {conversations.map((conversation) => (
                        <th scope="col" key={conversation}>
                          Conversation {conversation}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(Object.keys(strategyLabels) as Array<keyof typeof strategyLabels>).map(
                      (strategy) => (
                        <tr key={strategy}>
                          <th scope="row">{strategyLabels[strategy]}</th>
                          {conversations.map((conversation) => {
                            const row = evidenceRow(strategy, conversation);
                            return (
                              <td key={conversation}>
                                <span
                                  data-evidence={`${strategy}-${conversation}-${row.prepared_input_items}-${row.estimated_tokens}`}
                                >
                                  {row.prepared_input_items} items · {row.estimated_tokens}{" "}
                                  UTF-8 bytes upper bound
                                </span>
                              </td>
                            );
                          })}
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
              <p className="mt-6 max-w-3xl font-mono text-xs leading-6 text-white/55">
                Agents SDK 0.18.2 · answer model local-deterministic-fake · extraction
                local-deterministic-fixture-extractor · memory budget 800 bytes
              </p>
            </div>
          </section>

          <section id="lifecycle" className={styles.section}>
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
              <SectionHeading
                eyebrow="Keep users in control"
                title="Inspect, correct, or forget remembered facts."
                intro="Developers can show what was remembered and respond to corrections or deletion requests. Raw chat history and long-term memory are separate, so clearing SQLite items does not reverse facts already extracted."
              />
              <pre
                className={`${styles.code} mt-10`}
                tabIndex={0}
                aria-label="Long-term memory management"
              >
                <code>{management}</code>
              </pre>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <div className={`${styles.panel} p-6`}>
                  <h3 className="text-xl text-white">
                    Choose how memory failures affect the run
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/68">
                    Memory is failure-open by default after raw persistence, with a
                    sanitized error available for inspection. Set{" "}
                    <code className="font-mono text-white">strict=True</code> to raise
                    enqueue failures immediately and background failures at the next
                    same-user read or explicit flush.
                  </p>
                </div>
                <div className={`${styles.panel} p-6`}>
                  <h3 className="text-xl text-white">Release what the package owns</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/68">
                    Call <code className="font-mono text-white">await session.close()</code>{" "}
                    to drain accepted writes and release package-owned resources.
                    Explicitly injected runtime or inner Session objects remain
                    caller-owned.
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-white/55">
                    Python 3.11+ is declared. This workspace is verified on macOS, Apple
                    silicon, and Python 3.14.4; no broader platform matrix is claimed yet.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="receipts" className={styles.section}>
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
              <SectionHeading
                eyebrow="Evidence you can audit"
                title="Know which results prove the engine and which prove this package."
                intro="The engine and the Agents SDK package answer different questions. Keep their measurements separate when you evaluate either surface."
              />
              <div className="mt-10 grid gap-5 lg:grid-cols-2">
                <div className={`${styles.panel} p-6`}>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/55">
                    Engine evidence
                  </p>
                  <h3 className="mt-3 text-2xl text-white">mem01 belief engine</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/68">
                    LoCoMo runs, the five-case staleness suite, Postgres recall latency,
                    and packed-memory measurements describe the engine (mem01-engine).
                    They are not the same as package integration tests for Mem01Session.
                  </p>
                  <Link
                    href="/research/"
                    className={`mt-5 inline-flex items-center gap-2 text-sm underline underline-offset-4 ${styles.accentText}`}
                  >
                    See engine research <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
                <div className={`${styles.panel} p-6`}>
                  <p
                    className={`font-mono text-xs uppercase tracking-[0.14em] ${styles.accentText}`}
                  >
                    Package evidence
                  </p>
                  <h3 className="mt-3 text-2xl text-white">mem01session integration</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/68">
                    Published on PyPI as mem01session with dependency mem01-engine.
                    Public GitHub, automated tests, wheel builds, a deterministic
                    three-way demo, generated scaling artifact, and live GPT-5.6 runs
                    on the Agents SDK Session path.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={site.mem01sessionGithubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 text-sm underline underline-offset-4 ${styles.accentText}`}
                    >
                      Package repo <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                    <a
                      href={site.mem01sessionPypiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 text-sm underline underline-offset-4 ${styles.accentText}`}
                    >
                      PyPI <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="comparison" className={styles.section}>
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
              <SectionHeading
                eyebrow="Integration comparison · reviewed 2026-07-12"
                title="Different integration shapes solve different jobs."
                intro="Rows summarize the linked vendor or framework documentation as reviewed on the stated date; they are not universal performance rankings. Mem01Session’s differentiator is Session protocol plus belief lifecycle, not generic vector search alone."
              />
              <div
                className={`${styles.tableWrap} mt-10`}
                tabIndex={0}
                aria-label="Dated memory integration comparison"
              >
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>System / source</th>
                      <th>Integration</th>
                      <th>Memory shape</th>
                      <th>Lifecycle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row) => (
                      <tr key={row.name}>
                        <th scope="row">
                          <a
                            href={row.href}
                            target={row.href.startsWith("http") ? "_blank" : undefined}
                            rel={
                              row.href.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className={`inline-flex items-center gap-1.5 underline decoration-white/30 underline-offset-4 ${styles.accentTextHover}`}
                          >
                            {row.name}
                            {row.href.startsWith("http") ? (
                              <ExternalLink className="h-3 w-3" aria-hidden />
                            ) : null}
                          </a>
                        </th>
                        <td>{row.integration}</td>
                        <td>{row.memory}</td>
                        <td>{row.lifecycle}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="faq" className={styles.section}>
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
              <SectionHeading eyebrow="FAQ" title="Scope and trade-offs." />
              <dl className="mt-10 border border-border-bright bg-black/75 backdrop-blur-sm">
                {faqs.map((faq) => (
                  <div
                    key={faq.q}
                    className="border-b border-border p-5 last:border-b-0 sm:p-7"
                  >
                    <dt className="text-lg font-medium text-white">{faq.q}</dt>
                    <dd className="mt-3 max-w-4xl text-sm leading-relaxed text-white/65 sm:text-base">
                      {faq.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <section className="border-t border-border py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
              <div className="border border-border-bright bg-black/80 p-7 backdrop-blur-sm sm:p-10 lg:flex lg:items-end lg:justify-between lg:gap-10">
                <div className="max-w-3xl">
                  <Eyebrow>Open source</Eyebrow>
                  <h2 className="display-xl mt-4 text-4xl text-white sm:text-5xl">
                    Session memory on top of the mem01 engine.
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65">
                    Install the package from PyPI, browse the session repository, and
                    open the engine repo when you want the underlying belief-memory
                    system.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3 lg:mt-0">
                  <a
                    href={site.mem01sessionPypiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center gap-2 bg-white px-6 text-sm font-semibold uppercase tracking-[0.08em] text-black transition-colors hover:bg-accent"
                  >
                    pip install mem01session
                  </a>
                  <a
                    href={site.mem01sessionGithubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex h-12 items-center gap-2 border border-white/25 px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:border-accent ${styles.accentTextHover}`}
                  >
                    <GitHubIcon className="h-4 w-4" /> Package repo
                  </a>
                  <a
                    href={site.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex h-12 items-center border border-white/15 px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white/75 transition-colors hover:border-white/40 ${styles.accentTextHover}`}
                  >
                    Prior engine
                  </a>
                  <Link
                    href="/"
                    className={`inline-flex h-12 items-center border border-white/15 px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white/75 transition-colors hover:border-white/40 ${styles.accentTextHover}`}
                  >
                    mem01 home
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
