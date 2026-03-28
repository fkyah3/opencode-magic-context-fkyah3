# Scene-by-Scene Implementation Spec

FPS=30, Total=2730 frames. All frame numbers are local to each scene (useCurrentFrame returns 0-based within Sequence).

## Scene 1 — Old Way: Full-Screen Session Pain
**Global frames 0–209 | Duration: 210 frames (7.0s)**

Full-screen OpenCode session. Left: transcript. Right: context inspector.

### Beats
- **f0–50**: Session active. Transcript appends entries from SCENE1_TRANSCRIPT (first 6 items). Usage rises 34%→55%. Raw messages stack. Assistant Messages count rises.
- **f51–110**: More transcript entries append (items 7-12). Transcript scrolls up gently. Usage 55%→76%→88%. Raw Messages grow. Context Breakdown bar fills. Subtle warm urgency highlights.
- **f111–145**: Pressure hard. Usage 94%→97%→99%. Context stats pulse/glow. Transcript still continues briefly.
- **f146–160**: BLOCKING. Usage hits 100%. Transcript freezes. Dimming overlay. Status: "Context limit reached" then "Compacting history..."
- **f161–209**: Hold blocked state. Slow compaction progress. Labels: "Summarizing previous steps", "Rebuilding session context", "Compressing raw history". Right panel stalled. No new work.

**Caption (f161–209):** "Old way: the main agent hits the limit and stops to compact itself."

---

## Scene 2 — Split Comparison Bridge
**Global frames 210–329 | Duration: 120 frames (4.0s)**

Split screen: left = old way frozen, right = Magic Context active.

### Beats
- **f0–35**: Transform old UI into left panel. Bring fresh Magic Context session on right. Left: stalled compaction, dimmed. Right: active transcript, entries appearing.
- **f36–75**: Contrast clear. Left blocked, right moving. Right usage 72%→84%→90%. A distinct "Historian (background)" label appears on the right side.
- **f76–119**: Camera commits to right side. Right enlarges. Left fades.

---

## Scene 3 — Historian Activation
**Global frames 330–599 | Duration: 270 frames (9.0s)**

Full-screen Magic Context. Historian panel appears subtly (floating, lower area).

### Beats
- **f0–60**: Session active. Transcript appends from MAGIC_TRANSCRIPT (first few items). Usage 68%→81%. Raw messages increase.
- **f61–130**: Usage 81%→88%→91%. No stall. Historian panel transitions idle→active: "Monitoring context pressure", "Preparing background compaction". Faint connector lines from older transcript. Light scan sweep over upper history.
- **f131–269**: Historian fully wakes. Session continues (new entries at bottom, input area live, no freeze). Historian cycles: "Selecting older session history", "Tracing related raw messages", "Preparing compaction pass".

**Caption (f200–269):** "Magic Context: before the session blocks, a background Historian starts working."

---

## Scene 4 — Hero Shot: Historian Takes from Head, Tail Keeps Growing
**Global frames 600–959 | Duration: 360 frames (12.0s)**

THE most important scene. Historian operates on old/head. Live tail keeps growing.

Transcript has visible age structure: upper/older = head, lower/new = tail.

### Beats
- **f0–60**: Historian selects older region. Bracket/highlight over cluster of older assistant blocks near top. Related Raw Messages on right also highlighted. Label: "Selected history range". New entries continue at bottom.
- **f61–160**: Historian pulls old material out. Selected older transcript blocks lift slightly, matching raw messages from right pull into Historian processing lane. Blocks shrink/flow into Historian. Bottom transcript continues: new entries, action rows, user follow-up.
- **f161–260**: Historian processing the chunk. Status: "Compartmentalizing session history", "Extracting durable facts", "Promoting stable memory". Session tail keeps growing: new assistant conclusion, action row, transcript scrolls. CORE SIMULTANEITY SHOT.
- **f261–359**: Hold the architecture. Make visual relationship unmistakable: head being rewritten, tail still being written.

**Caption (f280–359):** "Historian rewrites the head. The live session keeps moving on the tail."

---

## Scene 5 — Historian Outputs: Compartments, Facts, Memory
**Global frames 960–1349 | Duration: 390 frames (13.0s)**

Structured outputs zone appears (lower-right or center-right). Three destinations: Compartments, Session Facts, Memory.

### Beats
- **f0–70**: Historian transforms extracted history into Compartments. Raw blocks collapse into titled cards from COMPARTMENTS data.
- **f71–170**: Fact chips peel off into Session Facts. Use FACTS data. Animate as extracted nuggets from noisy history.
- **f171–275**: Facts subset promoted to Memory. Use MEMORIES data. Memory looks more permanent/stable. Animate as higher-trust retention.
- **f276–389**: Hold all three outputs together. Compartments organized, facts retained, memory stored. Live tail shows modest ongoing activity.

**Caption (f310–389):** "Old session weight becomes structured context: compartments, facts, and memory."

---

## Scene 6 — Payoff: Pressure Drops
**Global frames 1350–1559 | Duration: 210 frames (7.0s)**

Usage drops. Old raw weight replaced by compact structure. Session never paused.

### Beats
- **f0–70**: Usage drops 91%→56%. Total payload lighter. Raw Messages density reduced. Context Breakdown breathes back. Drop feels earned.
- **f71–140**: Transcript active. New assistant wrap-up. Action: "Edit subagent-resolver.ts +8 -0", "Called lsp_diagnostics". Session continued through the whole process.
- **f141–209**: Hold healthy state. Usage safe, transcript live, Historian pass complete, structured outputs visible.

**Caption (f160–209):** "The main agent never stopped. Flow stayed intact."

---

## Scene 7 — Long-Session: Older Compartments Merge
**Global frames 1560–1829 | Duration: 270 frames (9.0s)**

Upper history shows existing compartment cards. History Budget indicator.

### Beats
- **f0–80**: History Budget indicator glows. "History budget nearing threshold". Not alarming.
- **f81–180**: Older compartment cards merge into denser archive block: "Merged Historical Compartment" or "Archive — Recursion + Delegation + Fix".
- **f181–269**: Upper history takes less space. System sustainable. Live session faintly active at bottom.

**Caption (f200–269):** "As sessions grow, older compartments can be merged again to save even more space."

---

## Scene 8 — Cache Awareness
**Global frames 1830–2099 | Duration: 270 frames (9.0s)**

Emphasis on context panel and queued reductions.

### Beats
- **f0–70**: Mark old ranges as queued. Use QUEUED_REDUCTIONS data. Items look ghosted/tagged/pending—NOT deleted yet.
- **f71–150**: Why deferred: "Preserving cache efficiency", "Waiting for optimal apply point". Magic Context is smart about timing.
- **f151–220**: Trigger: "Cache TTL expired" or "Context threshold crossed". NOW queued reductions apply. Ghosted ranges collapse elegantly.
- **f221–269**: Hold result. Context lighter, cache respected, no wasteful churn.

**Caption (f235–269):** "Cache-aware reductions: queue first, apply when timing actually makes sense."

---

## Scene 9 — Dreamer
**Global frames 2100–2369 | Duration: 270 frames (9.0s)**

Shift to night/off-hours. Cooler indigo palette, quieter motion. Session dormant.

### Beats
- **f0–60**: Transition to dormant mode. Transcript dims. Memory/facts/archived compartments remain.
- **f61–145**: Dreamer activates. Use DREAMER_TASKS. Maintenance tasks move through knowledge: "Consolidating memory", "Verifying retained facts", etc.
- **f146–225**: Effects: duplicate facts merge, stale items archive, memory entries cleaner, knowledge more coherent.
- **f226–269**: Hold clean maintained state.

**Caption (f240–269):** "Dreamer keeps the knowledge layer healthy between active sessions."

---

## Scene 10 — Sidekick
**Global frames 2370–2579 | Duration: 210 frames (7.0s)**

Fresh new session. Cleaner, less dense.

### Beats
- **f0–60**: New session starts. Mostly empty transcript. User prompt: "Continue the auth refactor and preserve the retry behavior."
- **f61–120**: Sidekick activates. Searches Memory, Facts, Historical Compartments. Use SIDEKICK_BRIEFING. Assembles briefing card.
- **f121–175**: Briefing injected into session. Agent begins with awareness restored. Transcript starts informed.
- **f176–209**: Hold warm-start payoff. Less re-explaining, continuity preserved.

**Caption (f180–209):** "Sidekick helps new sessions start with the right context already in place."

---

## Scene 11 — Final Card
**Global frames 2580–2729 | Duration: 150 frames (5.0s)**

Polished final composite. Premium calm finish.

### Beats
- **f0–60**: Assemble system tableau: session active, Historian background, structured context, memory layer.
- **f61–149**: Final text resolves. Options:
  - "Keep the main agent in flow." / "Let Magic Context handle the past."
  - Product wordmark: "opencode-magic-context"

---

## Component List

Build in `src/components/`. Each takes props + optional style overrides. All use COLORS/FONT/LAYOUT from constants.ts.

1. **SessionShell** — Outer container. Left transcript pane + right context panel. Dark bg with noise/grid.
2. **SessionHeader** — Top bar. Session name (e.g., "ATHENA"), status dot, model info.
3. **TranscriptPane** — Left column. Scrollable area for transcript entries. Supports translateY for scroll animation.
4. **UserBubble** — User message. Blue-tinted bg, left accent bar, concise text.
5. **AssistantBlock** — Assistant reasoning block. Darker bg, left border, multi-line text.
6. **ActionRow** — Tool/action line. Icon + text. Color-coded: explore=purple, edit=amber, call=cyan.
7. **InputBar** — Bottom input field. Dark bg, subtle border, placeholder text, send icon.
8. **ContextInspector** — Right panel container. Scrollable stats + raw messages + breakdown bar.
9. **ContextStat** — Single stat row: label left, value right. Color-codeable for pressure states.
10. **RawMessageRow** — Raw message entry. Label + token count. Age-tinted (old/recent/live).
11. **ContextBreakdownBar** — Horizontal usage bar. Fills left-to-right. Color transitions safe→warning→danger.
12. **HistorianPanel** — Floating panel for Historian status. Violet accent, status text, subtle glow.
13. **CompartmentCard** — Titled card for compartments. Green/emerald accent, compact look.
14. **FactChip** — Small chip for facts. Cyan accent, pill shape.
15. **MemoryCard** — Card for memory entries. Blue accent, category label + text.
16. **QueueBadge** — Small indicator for queued items. Ghosted/pending look.
17. **DreamerPanel** — Overlay for Dreamer. Indigo tones, calmer atmosphere.
18. **SidekickPanel** — Panel for Sidekick. Cyan/mint accent.
19. **CaptionLine** — Bottom caption text. Clean, readable, appears/fades with opacity animation.
