# Mem01Session Developer-First Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `/mem01session` immediately understandable to a developer who is new to agent memory, while preserving the page's verified technical claims and evidence.

**Architecture:** Keep the existing Next.js route and visual system. Change the acceptance checker first, then rewrite and reorder the page around an outcome-first story: three memory choices, three implementation steps, working usage, concrete observed behavior, controls, and advanced evidence. Synchronize only public-copy contracts in the OG template and hackathon route document.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, Node acceptance scripts, axe-core accessibility checks.

**User constraint:** Do not commit, push, deploy, publish, or create video assets. Commit steps are intentionally omitted.

---

## File Map

- `scripts/check-mem01session.mjs`: executable acceptance contract for the exported route.
- `src/app/mem01session/page.tsx`: metadata, public copy, examples, and route structure.
- `scripts/og-mem01session.html`: source template for the route's social image.
- `openai_hackathon_build_idea_docs/09_website_mem01session_route.md`: canonical page-copy specification outside the site repository.
- `docs/superpowers/specs/2026-07-13-mem01session-developer-first-copy-design.md`: approved design; read-only during implementation.

### Task 1: Make the acceptance contract express the new story

**Files:**
- Modify: `scripts/check-mem01session.mjs`
- Test: `scripts/check-mem01session.mjs`

- [ ] **Step 1: Replace the old H1 assertion and add novice-comprehension assertions**

Require the exported HTML to contain these exact public phrases:

```js
/<h1[^>]*>\s*Session memory for the OpenAI Agents SDK\s*<\/h1>/
"The third option for agent memory"
"Start every conversation fresh without making your agent forget the user."
"Start fresh. The agent forgets."
"Reuse one Session. The history keeps growing."
"Each chat stays separate, but the user is remembered."
"One Session object. Current-chat history stays in SQLite. Long-term memory stays in your Postgres database."
```

Retain assertions for the canonical import, `run_config`, environment variables, evidence artifact, lifecycle controls, `/mem01session` sitemap entry, and absence of the legacy `/openaisdk` export.

- [ ] **Step 2: Export and run the checker to verify the new contract fails**

Run:

```bash
npm run export && npm run check:mem01session
```

Expected: export succeeds and the checker fails because the old page does not contain the new hero and novice-facing three-choice copy.

### Task 2: Rewrite the route around developer outcomes

**Files:**
- Modify: `src/app/mem01session/page.tsx`

- [ ] **Step 1: Replace hero metadata and first-screen copy**

Use:

```ts
const title = "Session Memory for the OpenAI Agents SDK | Mem01Session";
const description =
  "Start every conversation fresh without making your OpenAI agent forget the user. Mem01Session keeps chats separate and remembers useful facts between them.";
```

Render the hero with:

```text
Eyebrow: The third option for agent memory
H1: Session memory for the OpenAI Agents SDK
Body: Start every conversation fresh without making your agent forget the user. Mem01Session remembers useful facts between chats and brings back only what matters now.
Grounding line: One Session object. Current-chat history stays in SQLite. Long-term memory stays in your Postgres database.
```

Keep the minimal constructor code and truthful source-install CTA.

- [ ] **Step 2: Replace the abstract problem section with the three choices**

Render three cards with exactly these headings and explanations:

```text
Start fresh. The agent forgets.
A new session_id gives the agent a clean conversation, but nothing the same user said in an earlier chat comes with it.

Reuse one Session. The history keeps growing.
The agent can see earlier facts because every old message stays in the same conversation history. Limits and compaction can help, but this is still raw chat history.

Use Mem01Session. Each chat stays separate, but the user is remembered.
Give each chat its own session_id and keep one stable user_id. Relevant facts can follow the user without replaying every previous conversation.
```

Add one honest qualifier: fresh and reused Sessions remain reasonable when an application does not need cross-conversation user memory.

- [ ] **Step 3: Put the working quickstart before architecture and explain the two IDs**

Retain the existing source-install, environment, `Runner.run`, `session.run_config()`, and `session.close()` code. Replace internal-first helper cards with:

```text
session_id separates conversations
Use a new value when the same user starts a new chat. SQLite stores the exact messages for that conversation.

user_id connects the user
Keep this value stable across chats. Mem01Session uses it to find that user's relevant long-term memories.
```

- [ ] **Step 4: Explain the system as three ordinary-language steps**

Use:

```text
1. Run a normal conversation.
The OpenAI Agents SDK reads and writes current-chat items through Mem01Session's internal SQLiteSession.

2. Remember what may matter later.
After a complete user-and-assistant exchange, the embedded mem01 engine extracts useful user facts and stores them in your Postgres database.

3. Start a new chat without starting from zero.
For the same user_id, Mem01Session finds relevant active memories and supplies a bounded memory note to the model. It does not copy synthetic memory into SQLite.
```

Follow with the accurate no-sidecar statement and existing implementation limitations.

- [ ] **Step 5: Make the NYC-to-San-Francisco result the primary proof**

Before the scaling table, present this sequence:

```text
Chat 1: “I live in NYC and pay $2,400 in rent.”
Chat 2: “I moved to San Francisco.”
New chat: “Where do I live now, and what was my earlier rent?”
Observed answer: “You now live in San Francisco. Your prior monthly rent was $2,400.”
Unknown fact: “What is my sister's name?” → “I don't have your sister's name stored.”
```

State that NYC is superseded, San Francisco and rent remain active, and observed model output is not a deterministic guarantee.

- [ ] **Step 6: Simplify controls and move advanced evidence later**

Keep `memory_history`, `correct_memory`, `forget_memory`, strict/failure-open behavior, close semantics, generated scaling evidence, prior-work boundary, dated comparison, and FAQ. Rewrite headings and introductions so each first answers why a developer should care. Remove repeated explanations and introduce the terms belief, provenance, extraction, and embedding only in technical copy.

- [ ] **Step 7: Run lint and the focused acceptance checker**

Run:

```bash
npm run lint
npm run export
npm run check:mem01session
```

Expected: all commands exit zero and the exported route contains the new narrative.

### Task 3: Synchronize the public-copy contract

**Files:**
- Modify: `scripts/og-mem01session.html`
- Modify: `openai_hackathon_build_idea_docs/09_website_mem01session_route.md`
- Regenerate: `public/og.png`
- Regenerate: `src/app/mem01session/opengraph-image.png`

- [ ] **Step 1: Update the OG source copy**

Use `Session memory for the OpenAI Agents SDK` as the social-image headline and `The third option for agent memory` as its positioning line. Keep the Mem01Session product name and Build Week context visible.

- [ ] **Step 2: Replace the superseded page structure in the hackathon route document**

Record the approved hero, three choices, three-step explanation, quickstart order, concrete NYC-to-San-Francisco proof, controls, evidence, and limitations. Preserve the local-only status and all restrictions against video, publication, deployment, and unsupported guarantees.

- [ ] **Step 3: Generate assets and verify synchronization**

Run:

```bash
npm run og
npm run export
npm run check:mem01session
```

Expected: generated OG assets contain the new copy and all acceptance checks pass.

### Task 4: Final quality verification

**Files:**
- Verify: `src/app/mem01session/page.tsx`
- Verify: `out/mem01session/index.html`
- Verify: `src/app/mem01session/opengraph-image.png`

- [ ] **Step 1: Run all automated site gates**

```bash
npm run lint && npm run og && npm run export && npm run check:mem01session
```

Expected: lint, image generation, production build, artifact equality, route acceptance, sitemap, and legacy-route checks all pass.

- [ ] **Step 2: Run desktop and mobile axe checks**

Check `http://localhost:3000/mem01session/` at 1440×900 and 390×844 against WCAG A/AA. Expected: zero violations.

- [ ] **Step 3: Perform the first-screen comprehension audit**

Confirm the first screen alone answers:

```text
What is it? A Session memory implementation for the OpenAI Agents SDK.
What problem does it solve? New chats otherwise forget the user, while one reused history keeps accumulating.
Why is it different? Chats stay separate while relevant user facts carry across them.
```

- [ ] **Step 4: Audit local changes**

Run `git diff --check`, confirm `/openaisdk` appears only in negative migration assertions or historical documentation, and report that all changes remain local and uncommitted.

