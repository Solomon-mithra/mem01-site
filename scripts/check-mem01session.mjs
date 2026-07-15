import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const routePath = path.join(root, "out/mem01session/index.html");
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

try {
  await access(routePath);
} catch {
  console.error(
    `FAIL mem01session export: expected ${routePath} to exist. Run npm run export after implementing the route.`,
  );
  process.exit(1);
}

const [html, sitemap, pageSource, artifactText] = await Promise.all([
  readFile(routePath, "utf8"),
  readFile(path.join(root, "out/sitemap.xml"), "utf8"),
  readFile(path.join(root, "src/app/mem01session/page.tsx"), "utf8"),
  readFile(path.join(root, "src/data/prepared-input-scaling.json"), "utf8"),
]);
const artifact = JSON.parse(artifactText);
const normalized = html
  .replace(/&quot;/g, '"')
  .replace(/&#x27;|&#39;/g, "'")
  .replace(/<!--.*?-->/gs, "");
const description =
  "Start every conversation fresh without making your OpenAI agent forget the user. Mem01Session keeps chats separate and remembers useful facts between them.";

check(
  html.includes("<title>Session Memory for the OpenAI Agents SDK | Mem01Session</title>"),
  "metadata title must match the approved Mem01Session title",
);
check(
  normalized.includes(`content="${description}"`),
  "metadata description must match the approved developer-first description",
);
check(
  /<h1[^>]*>\s*Session memory for the OpenAI Agents SDK\s*<\/h1>/.test(html),
  "page must contain the approved H1",
);
for (const requiredCopy of [
  "The third option for agent memory",
  "Start every conversation fresh without making your agent forget the user.",
  "Start fresh. The agent forgets.",
  "Reuse one Session. The history keeps growing.",
  "Each chat stays separate, but the user is remembered.",
  "One Session object. Current-chat history stays in SQLite. Long-term memory stays in your Postgres database.",
]) {
  check(
    normalized.includes(requiredCopy),
    `page must contain developer-first copy: ${requiredCopy}`,
  );
}
check(
  normalized.includes("from mem01session import memSession") &&
    normalized.includes('session_id="chat-friday"') &&
    normalized.includes('user_id="alex"'),
  "quickstart must use the canonical mem01session import and named constructor arguments",
);
check(
  /pip install mem01session/.test(normalized) &&
    !/not (yet )?published/i.test(normalized) &&
    !/intended future command/i.test(normalized) &&
    /mem01-engine/i.test(normalized) &&
    normalized.includes('pip install -e "../mem01[openai]" -e "."'),
  "install section must lead with published pip install, name mem01-engine, and keep optional source-checkout install",
);
check(
  normalized.includes("OPENAI_API_KEY") &&
    normalized.includes("DATABASE_URL") &&
    normalized.includes("MEM01_LLM_MODEL") &&
    normalized.includes("MEM01_EMBEDDING_MODEL") &&
    normalized.includes("gpt-5.6-sol") &&
    normalized.includes("text-embedding-3-small"),
  "configuration must show the two required variables and the two optional model overrides",
);
check(
  normalized.includes("run_config=session.run_config()") &&
    /fresh[^<]{0,200}run_config\(\)/i.test(normalized) &&
    /merge callback[^<]{0,220}(captures|capture)[^<]{0,180}(query|input)/i.test(normalized) &&
    /model-input filter[^<]{0,220}(injects|inject)[^<]{0,220}(model input|model only)/i.test(normalized),
  "quickstart must require a fresh run_config and explain both non-persisting hooks",
);
check(
  /internal SDK SQLiteSession/i.test(normalized) &&
    /embedded mem01 runtime/i.test(normalized) &&
    /Postgres\s*(?:\/|and|\+)\s*pgvector/i.test(normalized) &&
    /no separate memory (?:API )?service/i.test(normalized),
  "architecture must show internal SQLite, embedded mem01, Postgres/pgvector, and no sidecar",
);
check(
  /version 0\.1[^<]{0,220}(only|officially supports)[^<]{0,160}(internal|internally created)[^<]{0,80}SQLiteSession/i.test(normalized) &&
    /inner=[^<]{0,160}(dependency-injection|injection)[^<]{0,220}not[^<]{0,100}(officially supported|support guarantee)/i.test(normalized),
  "v0.1 must limit official short-term support to internal SQLite and qualify inner=",
);
check(
  pageSource.includes("clear_session()") && pageSource.includes("clear_memory()"),
  "page must document separate clear_session and clear_memory scopes",
);
check(
  pageSource.includes("mem01sessionGithubUrl") ||
    normalized.includes("https://github.com/Solomon-mithra/mem01session"),
  "page must link the public mem01session repository",
);
check(
  pageSource.includes("memory_history(") &&
    pageSource.includes("include_invalidated=True") &&
    pageSource.includes("correct_memory(") &&
    pageSource.includes("forget_memory("),
  "page must document implemented history, correction, and forgetting methods",
);
check(
  /failure-open/i.test(normalized) &&
    /strict=True/.test(normalized) &&
    /close\(\)/.test(normalized) &&
    /package-owned resources/i.test(normalized) &&
    /injected[^<]{0,140}caller-owned/i.test(normalized),
  "page must disclose failure behavior and resource ownership",
);
check(
  /Fresh stock Session/i.test(normalized) &&
    /Reused stock Session/i.test(normalized) &&
    /Mem01Session[^<]{0,120}(fresh|new)[^<]{0,100}session_id/i.test(normalized),
  "demo evidence must contain all three truthful lanes",
);
check(
  /NYC[^<]{0,120}superseded/i.test(normalized) &&
    /San Francisco[^<]{0,120}active/i.test(normalized) &&
    /rent[^<]{0,120}active/i.test(normalized) &&
    /declined[^<]{0,180}sister(?:'s|’s) name/i.test(normalized),
  "demo must show superseded NYC, active San Francisco and rent, and the observed sister-name decline",
);
check(
  /local[^<]{0,100}(fake|deterministic)/i.test(normalized) &&
    /offline prepared model input/i.test(normalized) &&
    /UTF-8 bytes upper bound/i.test(normalized) &&
    /not[^<]{0,120}(billed|provider usage)/i.test(normalized),
  "scaling evidence must be labeled as local/offline UTF-8 upper-bound preparation, not billed tokens",
);
check(
  /Engine evidence/i.test(normalized) &&
    /Package evidence/i.test(normalized),
  "receipts must separate engine evidence from package evidence",
);
check(
  /reviewed 2026-07-12/i.test(normalized) &&
    normalized.includes("https://openai.github.io/openai-agents-python/sessions/") &&
    normalized.includes("https://docs.mem0.ai/integrations/openai-agents-sdk"),
  "comparison must remain dated and source-linked",
);
check(
  !/(MEM01_BASE_URL|localhost:8080|POST \/v1\/|GET \/v1\/|openaisdk|mem01-agents|mem01_agents)/i.test(
    pageSource,
  ),
  "page must contain no legacy route/name or HTTP sidecar configuration",
);
check(
  !/(watch demo|youtube\.com|youtu\.be|devpost\.com|view submission repository|<video|deferred video)/i.test(
    pageSource,
  ),
  "page must not advertise unavailable video or Devpost destinations",
);
check(
  !/(never hallucinates|guaranteed refusal|guaranteed abstention|guarantees abstention|invented sister|sister(?:'s|’s) name is)/i.test(
    normalized,
  ),
  "page must not promise deterministic abstention or script a sister name",
);
check(
  sitemap.includes("/mem01session/") && !sitemap.includes("/openaisdk/"),
  "sitemap must expose /mem01session/ and remove /openaisdk/",
);
check(
  pageSource.includes('from "@/data/prepared-input-scaling.json"') &&
    pageSource.includes("opengraph-image.png") &&
    pageSource.includes("openGraph") &&
    pageSource.includes("twitter"),
  "page source must import the checked artifact and configure route OG/Twitter metadata",
);

const expected = {
  fresh_stock: { 1: [1, 44], 10: [1, 56], 40: [1, 25] },
  reused_stock: { 1: [1, 44], 10: [19, 415], 40: [79, 1898] },
  mem01session: { 1: [2, 541], 10: [2, 740], 40: [2, 709] },
};
for (const [strategy, conversations] of Object.entries(expected)) {
  for (const [conversation, [items, estimatedTokens]] of Object.entries(conversations)) {
    const row = artifact.find(
      (candidate) =>
        candidate.strategy === strategy && candidate.conversation === Number(conversation),
    );
    check(
      row?.prepared_input_items === items &&
        row?.estimated_tokens === estimatedTokens &&
        row?.measurement === "offline_prepared_model_input" &&
        row?.token_estimator === "utf8_bytes_upper_bound" &&
        row?.answer_model === "local-deterministic-fake" &&
        row?.extraction_model === "local-deterministic-fixture-extractor" &&
        row?.openai_agents_version === "0.18.2" &&
        row?.max_memory_tokens === 800,
      `artifact row ${strategy}/${conversation} must match canonical prepared-input evidence`,
    );
    check(
      normalized.includes(`data-evidence="${strategy}-${conversation}-${items}-${estimatedTokens}"`),
      `rendered scaling table must consume artifact row ${strategy}/${conversation}`,
    );
  }
}

try {
  await access(path.join(root, "src/app/mem01session/opengraph-image.png"));
} catch {
  failures.push(
    "route OG file missing: src/app/mem01session/opengraph-image.png must be generated by npm run og",
  );
}
try {
  await access(path.join(root, "out/openaisdk/index.html"));
  failures.push("legacy /openaisdk export must not exist");
} catch {
  // Expected: the legacy route is removed.
}

if (failures.length > 0) {
  console.error(`FAIL mem01session acceptance (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  "PASS mem01session acceptance: route, content, artifact evidence, sitemap, and OG checks passed.",
);
