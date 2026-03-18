# Magic Context

Your AI coding agent forgets everything the moment a conversation gets long enough. Context windows fill up, old messages get dropped, and the agent loses track of decisions it made twenty minutes ago. Magic Context fixes this.

It's an [OpenCode](https://github.com/anomalyco/opencode) plugin that runs a background historian — a separate, lightweight model that compresses older conversation into structured summaries and durable facts while the main agent keeps working. The agent never stops to summarize its own history. It never notices the rewriting happening beneath it. And because every mutation is cache-aware, nothing gets invalidated until the provider's cached prefix expires, so you're not paying to throw away work that's already cached.

Across sessions, architecture decisions, constraints, and preferences persist in a cross-session memory system. A new conversation starts with everything the previous one learned, without replaying old transcripts.

---

## Installation

```sh
npm install @cortexkit/magic-context-opencode
```

Add it to your OpenCode config (`opencode.json` or `opencode.jsonc`):

```jsonc
{
  "plugins": ["@cortexkit/magic-context-opencode"]
}
```

Magic Context replaces OpenCode's built-in compaction — the two cannot run together:

```jsonc
{
  "compaction": {
    "auto": false,
    "prune": false
  }
}
```

---

## Quick Start

Create `magic-context.jsonc` in your project root (or `.opencode/magic-context.jsonc`):

```jsonc
{
  "enabled": true,

  // Optional: which model the historian uses
  "historian": {
    "model": "anthropic/claude-haiku-4",
    "fallback_models": ["anthropic/claude-3-5-haiku"]
  }
}
```

That's it. Everything else has sensible defaults. For user-wide settings, put the config at `~/.config/opencode/magic-context.jsonc` — project config merges on top.

---

## What Your Agent Gets

Magic Context gives the agent four tools and injects structured context automatically. Here's what each tool is for in practice.

### `ctx_reduce` — Shed weight

After a tool-heavy turn (large grep results, file reads, bash output), the agent calls `ctx_reduce` to mark stale content for removal. Drops aren't applied immediately — they're queued until the cache expires or context pressure forces it. This means the agent can drop freely without worrying about cache invalidation timing.

```
ctx_reduce(drop="3-5,12")     // Drop tags 3, 4, 5, and 12
```

Recent tags (last 5 by default) are protected. Drops targeting them stay queued until they age out.

### `ctx_note` — Scratch notes that survive compression

Session notes are the agent's scratchpad for durable goals, constraints, and reminders. The historian reads these notes during compression, deduplicates them, and carries them forward — so a note written early in a session survives even after the raw history around it gets replaced by compartments.

```
ctx_note(action="write", content="Always run tests before committing on this repo.")
ctx_note(action="read")
```

### `ctx_memory` — Persistent cross-session knowledge

Architecture decisions, naming conventions, user preferences — anything that should survive across conversations. Memories are categorized and can be scoped to a project or shared globally. The historian automatically promotes qualifying session facts to memories, but the agent can also write them explicitly.

```
ctx_memory(action="write", category="ARCHITECTURE_DECISIONS", content="Event sourcing for the orders domain.")
ctx_memory(action="list")
ctx_memory(action="delete", id=42)
ctx_memory(action="promote", id=7)     // Pin as permanent
```

### `ctx_recall` — Search past knowledge

Semantic search over the memory store. Results are ranked by a blend of embedding similarity and full-text matching. Use this when the agent needs to find a decision or preference from a previous session.

```
ctx_recall(query="authentication approach", category="CONSTRAINTS")
```

### Automatic context injection

Every turn, Magic Context injects a `<session-history>` block into the conversation containing:

- **Project memories** — cross-session decisions, constraints, and preferences
- **Compartments** — structured summaries replacing older raw history
- **Session facts** — durable categorized facts from the current session
- **Session notes** — maintained `ctx_note` content

This block is stable between historian runs. When the agent writes new memories via `ctx_memory`, the write is persisted to the database immediately but the injected block doesn't change until the next historian run — so writes never bust the cache mid-conversation.

---

## How It Works

### Tagging

Every message, tool output, and file attachment gets a monotonically increasing `§N§` tag. The agent sees these inline and uses them to reference specific content when calling `ctx_reduce`. Tags persist in the database and resume across restarts.

### Queued reductions

When the agent calls `ctx_reduce`, drops go into a pending queue — not applied immediately. Two conditions trigger execution:

- **Cache expired** — enough time has passed that the cached prefix is likely stale (configurable, default 5 minutes)
- **Threshold reached** — context usage hits `execute_threshold_percentage` (default 65%), at which point waiting risks running out of space

Between those triggers, the conversation continues unchanged. The agent doesn't need to think about timing.

### Background historian

When local drops aren't buying enough headroom, Magic Context starts a historian — a separate lightweight model that reads an eligible prefix of raw history and produces:

- **Compartments** — chronological blocks that replace older raw messages
- **Facts** — durable decisions, constraints, and preferences (categorized)
- **Notes** — rewritten and deduplicated `ctx_note` content

The historian runs asynchronously. The main agent never waits for it. When the historian finishes, its output is materialized into the conversation on the next transform pass.

### Nudging

As context usage grows, Magic Context sends rolling reminders to the agent suggesting it reduce. Reminder cadence tightens as usage approaches the threshold. If the agent has recently called `ctx_reduce`, reminders are suppressed — it already knows. An emergency nudge at 80% always fires regardless of cooldown.

### Cross-session memory

After each historian run, qualifying facts are promoted to the persistent memory store. On every subsequent turn, active memories are injected alongside compartments in the `<session-history>` block. When a new session starts, it inherits all project and global memories from previous sessions.

Memories are searchable via `ctx_recall` using semantic embeddings (local by default) with full-text search as a fallback.

---

## Cache Awareness

LLM providers cache conversation prefixes server-side. The cache window depends on your provider and subscription tier — Claude Pro offers 5 minutes, Max offers 1 hour, and pricing for cached vs. uncached tokens differs between API and subscription usage.

Magic Context defers all mutations until the cached prefix expires. The default `cache_ttl` of `"5m"` matches most providers. You can tune it:

```jsonc
{
  "cache_ttl": "5m"
}
```

Per-model overrides for mixed-model workflows:

```jsonc
{
  "cache_ttl": {
    "default": "5m",
    "anthropic/claude-opus-4-6": "60m"
  }
}
```

Supported formats: `"30s"`, `"5m"`, `"1h"`.

---

## Configuration Reference

All settings are flat top-level keys in `magic-context.jsonc`.

### Core

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | `boolean` | `false` | Master toggle. |
| `cache_ttl` | `string` or `object` | `"5m"` | Time after a response before applying pending ops. String or per-model map. |
| `protected_tags` | `number` (1–20) | `5` | Last N active tags immune from immediate dropping. |
| `nudge_interval_tokens` | `number` | `10000` | Minimum token growth between rolling nudges. |
| `execute_threshold_percentage` | `number` (35–95) or `object` | `65` | Context usage that forces queued ops to execute. Supports per-model map. |
| `auto_drop_tool_age` | `number` | `100` | Auto-drop tool outputs older than N tags during execution. |
| `clear_reasoning_age` | `number` | `50` | Clear thinking/reasoning blocks older than N tags. |
| `iteration_nudge_threshold` | `number` | `15` | Consecutive assistant turns without user input before an iteration nudge. |
| `compartment_token_budget` | `number` | `20000` | Token budget for historian input chunks. |
| `historian_timeout_ms` | `number` | `300000` | Timeout per historian call (ms). |

### `historian`

Configures the background historian. Optional — the plugin has a built-in default chain.

```jsonc
{
  "historian": {
    "model": "anthropic/claude-haiku-4",
    "fallback_models": ["anthropic/claude-3-5-haiku"],
    "temperature": 0.1,
    "maxTokens": 4096
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `model` | `string` | Primary model. |
| `fallback_models` | `string` or `string[]` | Models to try if the primary fails or is rate-limited. |
| `temperature` | `number` (0–2) | Sampling temperature. |
| `maxTokens` | `number` | Max tokens per response. |
| `variant` | `string` | Agent variant. |
| `prompt` | `string` | Custom system prompt override. |

### `embedding`

Controls semantic search for cross-session memories.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `provider` | `"local"` \| `"openai-compatible"` \| `"off"` | `"local"` | `"local"` runs `Xenova/all-MiniLM-L6-v2` in-process. |
| `model` | `string` | `"Xenova/all-MiniLM-L6-v2"` | Embedding model. |
| `endpoint` | `string` | — | Required for `"openai-compatible"`. |
| `api_key` | `string` | — | Optional API key for remote endpoints. |

```jsonc
{
  "embedding": {
    "provider": "openai-compatible",
    "model": "text-embedding-3-small",
    "endpoint": "https://api.openai.com/v1",
    "api_key": "sk-..."
  }
}
```

### `memory`

Cross-session memory settings.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `enabled` | `boolean` | `true` | Enable cross-session memory. |
| `injection_budget_tokens` | `number` (500–20000) | `4000` | Token budget for memory injection. |
| `auto_promote` | `boolean` | `true` | Promote eligible session facts to memory automatically. |
| `retrieval_count_promotion_threshold` | `number` | `3` | Retrievals needed before a memory is auto-promoted to permanent. |

### `sidekick`

Optional lightweight local agent for memory retrieval augmentation. Disabled by default.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `enabled` | `boolean` | `false` | Enable sidekick. |
| `endpoint` | `string` | `"http://localhost:1234/v1"` | OpenAI-compatible endpoint. |
| `model` | `string` | `"qwen3.5-9b"` | Model for sidekick queries. |
| `api_key` | `string` | `""` | API key if needed. |
| `max_tool_calls` | `number` | `3` | Max tool calls per retrieval. |
| `timeout_ms` | `number` | `30000` | Timeout per run (ms). |
| `system_prompt` | `string` | — | Custom system prompt override. |

### `dreaming`

Background memory maintenance on a schedule (typically overnight). Requires a local LLM.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `enabled` | `boolean` | `false` | Enable dreaming. |
| `schedule` | `string` | `"02:00-06:00"` | Time window (24h format). |
| `max_runtime_minutes` | `number` | `120` | Max runtime per session. |
| `endpoint` | `string` | `"http://localhost:1234/v1"` | OpenAI-compatible endpoint. |
| `model` | `string` | `"qwen3.5-32b"` | Model for dreaming tasks. |
| `api_key` | `string` | `""` | API key if needed. |
| `tasks` | `array` | `["decay", "consolidate"]` | Tasks to run: `"decay"`, `"consolidate"`, `"mine"`, `"verify"`, `"git"`, `"map"`. |

### Full example

```jsonc
{
  "enabled": true,
  "cache_ttl": "5m",
  "protected_tags": 5,
  "execute_threshold_percentage": 65,

  "historian": {
    "model": "anthropic/claude-haiku-4",
    "fallback_models": ["anthropic/claude-3-5-haiku"]
  },

  "embedding": {
    "provider": "local"
  },

  "memory": {
    "enabled": true,
    "injection_budget_tokens": 4000,
    "auto_promote": true
  },

  "dreaming": {
    "enabled": false,
    "schedule": "02:00-06:00",
    "model": "qwen3.5-32b",
    "tasks": ["decay", "consolidate"]
  }
}
```

---

## Commands

### `/ctx-status`

Debug view of the current session: tag counts, pending drops, cache TTL, nudge state, historian progress, compartment coverage, and the last transform error. Run this when something seems stuck.

### `/ctx-flush`

Forces all queued operations to apply immediately, bypassing cache TTL. Reports what was released, skipped, or still deferred.

### `/ctx-recomp`

Rebuilds compartments, facts, and notes from raw session history. Use when stored historian state seems stale or structurally wrong.

---

## Storage

All state lives in a local SQLite database:

```
~/.local/share/opencode/storage/plugin/magic-context/context.db
```

If the database can't be opened, Magic Context disables itself.

| Table | Purpose |
|-------|---------|
| `tags` | Tag assignments — message ID, tag number, session, status |
| `pending_ops` | Queued drop operations with execution status |
| `source_contents` | Raw content snapshots for reduction |
| `compartments` | Historian-produced structured history blocks |
| `session_facts` | Categorized durable facts from historian runs |
| `session_notes` | Maintained `ctx_note` content |
| `session_meta` | Per-session state — usage, nudge flags, anchors |
| `memories` | Cross-session persistent memories |
| `memory_embeddings` | Embedding vectors for semantic search |
| `dream_state` | Dreamer scheduling, lease, and task progress |

---

## Development

### Prerequisites

- [Bun](https://bun.sh) 1.x

### Scripts

```sh
bun run build          # Build the plugin
bun run typecheck      # Type-check without emitting
bun test               # Run tests
bun run lint           # Lint
bun run lint:fix       # Lint with auto-fix
bun run format         # Format
```

### Utility scripts

```sh
bun scripts/tail-view.ts             # Tail structured log output
bun scripts/context-dump.ts          # Dump context DB for a session
bun scripts/dream.ts                 # Trigger dreaming manually
bun scripts/backfill-embeddings.ts   # Backfill missing embeddings
```

---

## License

SUL-1.0 — see [LICENSE](./LICENSE) for details.
