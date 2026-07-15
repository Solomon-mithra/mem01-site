# Mem01Session Developer-First Page Copy Design

**Date:** 2026-07-13
**Status:** Approved direction; local and uncommitted
**Scope:** Rewrite and reorder the existing `/mem01session` page copy. Do not add product functionality, video, deployment, publication, or unsupported claims.

## Goal

A developer who has never used a memory product should understand Mem01Session within the first screen:

1. it is a Session implementation for the OpenAI Agents SDK;
2. a fresh Session forgets prior conversations;
3. one reused Session carries an expanding raw history; and
4. Mem01Session keeps conversations separate while remembering useful facts about the same user.

The page should explain outcomes before implementation vocabulary. Terms such as *belief*, *provenance*, *extraction*, and *embedding* belong in later technical sections, not in the primary explanation.

## Positioning

Mem01Session is the third option for agent memory:

- **Fresh Session:** a clean conversation that does not know what the user said in earlier conversations.
- **Reused Session:** remembers through raw conversation history, which keeps accumulating unless the application limits or compacts it.
- **Mem01Session:** starts a separate conversation while recalling relevant facts previously learned about the same user.

This is a category explanation, not a universal superiority claim. The page must acknowledge that fresh and reused Sessions are valid choices for applications that do not need cross-conversation user memory.

## Hero

**Eyebrow:** `The third option for agent memory`

**H1:** `Session memory for the OpenAI Agents SDK`

**Primary explanation:**

> Start every conversation fresh without making your agent forget the user. Mem01Session remembers useful facts between chats and brings back only what matters now.

**Technical grounding line:**

> One Session object. Current-chat history stays in SQLite. Long-term memory stays in your Postgres database.

Keep the minimal `memSession` constructor example and current source-install CTA. Do not imply that the package is published.

## Page Narrative

### 1. The three choices

Lead with the problem in plain language:

- `Start fresh. The agent forgets.`
- `Reuse one Session. The history keeps growing.`
- `Use Mem01Session. Each chat stays separate, but the user is remembered.`

Use short examples rather than abstract phrases such as “semantic user beliefs” in this section.

### 2. How it works

Explain the product in three steps:

1. The current conversation behaves like a normal OpenAI Agents SDK Session.
2. After a coherent user-and-assistant exchange, Mem01Session stores useful user facts as long-term memory.
3. When the same user starts a later conversation, Mem01Session supplies only relevant active memories to the model.

Then state the implementation details: SDK SQLiteSession for current-chat items, embedded mem01 runtime, and user-owned Postgres/pgvector for long-term memory. State that the default path has no memory service, container, port, or HTTP hop.

### 3. Quickstart

Move working usage ahead of deep internal details. The example must show:

- `from mem01session import memSession`;
- separate `session_id` and stable `user_id` values;
- `session=session` and `run_config=session.run_config()` on every `Runner.run` call; and
- `await session.close()`.

Explain each required concept beside the example in ordinary developer language.

### 4. Concrete proof

Use one continuous example:

- the user first says they live in NYC and pay $2,400 rent;
- the user later moves to San Francisco;
- a fresh conversation recalls San Francisco and the earlier rent;
- an old NYC memory becomes superseded; and
- the agent says it does not know the user's sister's name.

Label model outputs as observed results, not deterministic guarantees.

### 5. Memory controls

Explain that developers can inspect, correct, and forget long-term memories. Keep raw conversation-history operations distinct from long-term memory management. Explain `strict=True`, failure-open behavior, and resource ownership only after the primary value is clear.

### 6. Evidence and honest limits

Retain the generated three-lane scaling artifact, dated comparison sources, prior-work boundary, and platform/package status. Improve labels so a new developer can distinguish:

- prepared model input from provider billing;
- deterministic fake evidence from the live GPT-5.6 observation;
- pre-existing mem01 engine evidence from Build Week package evidence; and
- guidance supplied to the model from deterministic output enforcement.

Advanced detail and limitations should support the product story rather than interrupt it.

## Editing Rules

- Prefer one idea per paragraph.
- Define a technical term the first time it is necessary.
- Replace feature labels with consequences for the developer.
- Remove repeated explanations instead of adding more sections.
- Preserve precise caveats where a simpler sentence would become misleading.
- Do not claim publication, deployment, guaranteed recall, guaranteed abstention, zero total LLM calls, or universal superiority.
- Keep the page OpenAI-specific and use the exact product name `OpenAI Agents SDK`.

## Files in Scope

- `src/app/mem01session/page.tsx`
- `scripts/check-mem01session.mjs`
- `scripts/og-mem01session.html` and generated OG assets if hero copy appears there
- `openai_hackathon_build_idea_docs/09_website_mem01session_route.md`
- Other hackathon documents only when they repeat the superseded public-page copy

## Verification

- A manual first-screen read must answer “what is this?”, “what problem does it solve?”, and “why is it different?” without scrolling into architecture.
- The page must retain all current technical truthfulness and package-status boundaries.
- Run lint, production export, artifact synchronization, route acceptance checks, and desktop/mobile accessibility checks.
- Confirm `/mem01session` remains the only package route and `/openaisdk` is not regenerated.

