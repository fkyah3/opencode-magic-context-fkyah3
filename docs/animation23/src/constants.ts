// ─── Composition ─────────────────────────────────────────────────────────────
export const COMP_WIDTH = 1920;
export const COMP_HEIGHT = 1080;
export const FPS = 30;
export const TOTAL_FRAMES = 2730;

// ─── Scene boundaries (frame ranges) ────────────────────────────────────────
export const SCENE_1_START = 0;
export const SCENE_2_START = 210;
export const SCENE_3_START = 330;
export const SCENE_4_START = 600;
export const SCENE_5_START = 960;
export const SCENE_6_START = 1350;
export const SCENE_7_START = 1560;
export const SCENE_8_START = 1830;
export const SCENE_9_START = 2100;
export const SCENE_10_START = 2370;
export const SCENE_11_START = 2580;

export const SCENE_1_DURATION = 210; // 7.0s
export const SCENE_2_DURATION = 120; // 4.0s
export const SCENE_3_DURATION = 270; // 9.0s
export const SCENE_4_DURATION = 360; // 12.0s
export const SCENE_5_DURATION = 390; // 13.0s
export const SCENE_6_DURATION = 210; // 7.0s
export const SCENE_7_DURATION = 270; // 9.0s
export const SCENE_8_DURATION = 270; // 9.0s
export const SCENE_9_DURATION = 270; // 9.0s
export const SCENE_10_DURATION = 210; // 7.0s
export const SCENE_11_DURATION = 150; // 5.0s

// ─── Colors ──────────────────────────────────────────────────────────────────
export const COLORS = {
  // Backgrounds
  bg: "#0b0e17",
  bgSubtle: "#0f1320",
  panelBg: "#111827",
  panelBgElevated: "#161d2e",
  panelBorder: "#1e293b",
  panelBorderSubtle: "#263044",

  // Text
  textPrimary: "#f1f5f9",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
  textDim: "#475569",

  // User / Assistant
  userBubbleBg: "#1e3a5f",
  userBubbleBorder: "#2563eb33",
  userBubbleAccent: "#3b82f6",
  assistantBg: "#151c2c",
  assistantBorder: "#1e293b",

  // Action rows
  actionBg: "#111827",
  actionBorder: "#1e293b",
  actionIcon: "#64748b",
  actionExplore: "#8b5cf6",
  actionEdit: "#f59e0b",
  actionCall: "#06b6d4",

  // Context / pressure
  contextSafe: "#22c55e",
  contextWarning: "#f59e0b",
  contextDanger: "#ef4444",
  contextCritical: "#dc2626",
  contextTrack: "#1e293b",

  // Old way accents
  oldWayAmber: "#f59e0b",
  oldWayOrange: "#f97316",
  oldWayRed: "#ef4444",
  oldWayDim: "#78350f",

  // Magic Context accents
  magicCyan: "#06b6d4",
  magicTeal: "#14b8a6",
  magicBlueGreen: "#0d9488",

  // Historian
  historianAccent: "#7c3aed",
  historianLight: "#a78bfa",
  historianBg: "#1a1033",
  historianBorder: "#2e1065",
  historianGlow: "#7c3aed33",

  // Compartments
  compartmentAccent: "#34d399",
  compartmentBg: "#062320",
  compartmentBorder: "#064e3b",

  // Facts
  factAccent: "#06b6d4",
  factBg: "#0c1a2e",
  factBorder: "#164e63",

  // Memory
  memoryAccent: "#3b82f6",
  memoryBg: "#0c1a2e",
  memoryBorder: "#1e3a5f",

  // Dreamer
  dreamerAccent: "#818cf8",
  dreamerBg: "#0c0f24",
  dreamerBorder: "#312e81",
  dreamerGlow: "#818cf833",

  // Sidekick
  sidekickAccent: "#2dd4bf",
  sidekickBg: "#0d2927",
  sidekickBorder: "#115e59",
  sidekickGlow: "#2dd4bf33",

  // Cache
  cacheAccent: "#a78bfa",
  cacheBg: "#1a1033",
  cacheBorder: "#2e1065",

  // Queue/ghosted
  queuedBg: "#111827aa",
  queuedBorder: "#1e293b88",

  // Success/active
  successGreen: "#34d399",
  activePulse: "#3b82f6",
} as const;

// ─── Typography ──────────────────────────────────────────────────────────────
export const FONT = {
  sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', 'SF Mono', Monaco, Consolas, monospace",
} as const;

export const FONT_SIZE = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  xxl: 32,
  hero: 40,
} as const;

// ─── Layout ──────────────────────────────────────────────────────────────────
export const LAYOUT = {
  padding: 24,
  panelGap: 16,
  borderRadius: 10,
  borderRadiusSm: 6,
  borderRadiusLg: 14,
  transcriptWidth: 0.62, // fraction of container
  contextWidth: 0.35,    // fraction of container
  headerHeight: 48,
  inputBarHeight: 44,
  statRowHeight: 32,
  rawMessageHeight: 28,
  actionRowHeight: 36,
  transcriptEntryGap: 10,
} as const;

// ─── Shared types ────────────────────────────────────────────────────────────
export type TranscriptEntryType = "user" | "assistant" | "action";

export type TranscriptEntry = {
  id: string;
  type: TranscriptEntryType;
  content: string;
  /** For action rows: "explore" | "edit" | "call" */
  actionKind?: "explore" | "edit" | "call";
};

export type ContextStats = {
  session: string;
  provider: string;
  model: string;
  contextLimit: number;
  totalTokens: number;
  usagePercent: number;
  cacheTokens: number;
  assistantMessages: number;
  userMessages: number;
};

export type RawMessage = {
  id: string;
  label: string;
  tokens: number;
  age: "old" | "recent" | "live";
};

export type CompartmentDef = {
  id: string;
  title: string;
  lineCount?: number;
};

export type FactDef = {
  id: string;
  text: string;
};

export type MemoryDef = {
  id: string;
  category: string;
  text: string;
};

// ─── Scene 1 content: Old way transcript ────────────────────────────────────
export const SCENE1_TRANSCRIPT: TranscriptEntry[] = [
  {
    id: "s1-u1",
    type: "user",
    content:
      "Currently we have a new problem, athena-junior is able to spawn another athena-junior inside which normally shouldn't happen",
  },
  {
    id: "s1-a1",
    type: "assistant",
    content:
      "The user is saying that athena-junior can spawn another athena-junior as a sub-agent, which shouldn't be allowed. Let me investigate where task delegation is enforced.",
  },
  {
    id: "s1-act1",
    type: "action",
    content: "Explored 1 read, 2 searches",
    actionKind: "explore",
  },
  {
    id: "s1-a2",
    type: "assistant",
    content:
      "I see the issue. There are guards for plan-family recursion and direct invocation, but no self-recursion guard for athena-junior.",
  },
  {
    id: "s1-act2",
    type: "action",
    content: "Edit subagent-resolver.ts",
    actionKind: "edit",
  },
  {
    id: "s1-act3",
    type: "action",
    content: "Called lsp_diagnostics",
    actionKind: "call",
  },
  // Additional entries for continued growth
  {
    id: "s1-a3",
    type: "assistant",
    content:
      "I've added the self-recursion guard. Let me verify there are no other delegation paths that could bypass this check.",
  },
  {
    id: "s1-act4",
    type: "action",
    content: "Explored 1 search",
    actionKind: "explore",
  },
  {
    id: "s1-a4",
    type: "assistant",
    content:
      "Found another potential path through the task() helper. The category-based delegation could also route back to athena-junior indirectly.",
  },
  {
    id: "s1-act5",
    type: "action",
    content: "Edit task-router.ts",
    actionKind: "edit",
  },
  {
    id: "s1-a5",
    type: "assistant",
    content:
      "Both paths are now guarded. Running full diagnostics to confirm no type errors were introduced.",
  },
  {
    id: "s1-act6",
    type: "action",
    content: "Called lsp_diagnostics",
    actionKind: "call",
  },
];

// ─── Scene 3-4 content: Magic Context transcript ────────────────────────────
export const MAGIC_TRANSCRIPT: TranscriptEntry[] = [
  {
    id: "mc-a1",
    type: "assistant",
    content:
      "I detect fix intent. Let me trace where sub-agent spawning is gated.",
  },
  {
    id: "mc-act1",
    type: "action",
    content: "Explored 1 read, 2 searches",
    actionKind: "explore",
  },
  {
    id: "mc-a2",
    type: "assistant",
    content:
      "The issue is clear. A self-recursion guard is missing in subagent-resolver.ts.",
  },
  {
    id: "mc-act2",
    type: "action",
    content: "Edit subagent-resolver.ts",
    actionKind: "edit",
  },
  {
    id: "mc-act3",
    type: "action",
    content: "Called lsp_diagnostics",
    actionKind: "call",
  },
  {
    id: "mc-a3",
    type: "assistant",
    content:
      "I will verify whether the restriction belongs in subagent-resolver.ts or needs a higher-level guard.",
  },
  {
    id: "mc-act4",
    type: "action",
    content: "Explored 1 search",
    actionKind: "explore",
  },
  {
    id: "mc-u1",
    type: "user",
    content: "Also check the category-based delegation path.",
  },
  {
    id: "mc-a4",
    type: "assistant",
    content:
      "Good point. Checking the category-based delegation path for indirect recursion.",
  },
  {
    id: "mc-act5",
    type: "action",
    content: "Explored 2 reads, 1 search",
    actionKind: "explore",
  },
  {
    id: "mc-a5",
    type: "assistant",
    content:
      "Category-based delegation does not route back to athena-junior. The guard in subagent-resolver.ts is sufficient.",
  },
  {
    id: "mc-act6",
    type: "action",
    content: "Edit subagent-resolver.ts +8 -0",
    actionKind: "edit",
  },
  {
    id: "mc-act7",
    type: "action",
    content: "Called lsp_diagnostics",
    actionKind: "call",
  },
];

// ─── Raw messages for context panel ─────────────────────────────────────────
export const RAW_MESSAGES: RawMessage[] = [
  { id: "rm-1", label: "system", tokens: 4200, age: "old" },
  { id: "rm-2", label: "user:1", tokens: 180, age: "old" },
  { id: "rm-3", label: "assistant:1", tokens: 2400, age: "old" },
  { id: "rm-4", label: "tool:grep", tokens: 8600, age: "old" },
  { id: "rm-5", label: "assistant:2", tokens: 1800, age: "old" },
  { id: "rm-6", label: "tool:read", tokens: 12400, age: "old" },
  { id: "rm-7", label: "assistant:3", tokens: 3200, age: "old" },
  { id: "rm-8", label: "tool:edit", tokens: 640, age: "recent" },
  { id: "rm-9", label: "tool:lsp", tokens: 420, age: "recent" },
  { id: "rm-10", label: "assistant:4", tokens: 1600, age: "recent" },
  { id: "rm-11", label: "user:2", tokens: 120, age: "live" },
  { id: "rm-12", label: "assistant:5", tokens: 2800, age: "live" },
  { id: "rm-13", label: "tool:grep", tokens: 5400, age: "live" },
  { id: "rm-14", label: "assistant:6", tokens: 1400, age: "live" },
];

// ─── Historian outputs ──────────────────────────────────────────────────────
export const COMPARTMENTS: CompartmentDef[] = [
  { id: "c-1", title: "Recursion investigation", lineCount: 42 },
  { id: "c-2", title: "Delegation guard analysis", lineCount: 38 },
  { id: "c-3", title: "Self-recursion fix", lineCount: 26 },
  { id: "c-4", title: "Validation pass", lineCount: 18 },
];

export const FACTS: FactDef[] = [
  { id: "f-1", text: "athena-junior should not spawn itself" },
  { id: "f-2", text: "guard belongs in subagent-resolver.ts" },
  { id: "f-3", text: "plan-family recursion already blocked" },
  { id: "f-4", text: "suggest category-based delegation instead" },
  { id: "f-5", text: "task-router.ts has secondary delegation path" },
];

export const MEMORIES: MemoryDef[] = [
  {
    id: "m-1",
    category: "Agent constraint",
    text: "Prevent self-recursion in sub-agent spawning",
  },
  {
    id: "m-2",
    category: "Delegation rule",
    text: "Category-based alternative to direct agent invocation",
  },
  {
    id: "m-3",
    category: "Architecture note",
    text: "Guard at subagent resolver layer, not task router",
  },
];

// ─── Cache awareness data ───────────────────────────────────────────────────
export const QUEUED_REDUCTIONS = [
  { id: "q-1", label: "Old investigation trace", tokens: 8600 },
  { id: "q-2", label: "Stale scratch context", tokens: 5200 },
  { id: "q-3", label: "Temporary diagnostics", tokens: 2400 },
];

// ─── Dreamer maintenance tasks ──────────────────────────────────────────────
export const DREAMER_TASKS = [
  { icon: "⊕", label: "Consolidating memory", status: "active" as const },
  { icon: "✓", label: "Verifying retained facts", status: "active" as const },
  { icon: "⊘", label: "Archiving stale knowledge", status: "active" as const },
  { icon: "↻", label: "Improving summaries", status: "active" as const },
];

// ─── Sidekick briefing ──────────────────────────────────────────────────────
export const SIDEKICK_BRIEFING = [
  { label: "Relevant memory found", source: "Memory" as const },
  { label: "Prior constraint restored", source: "Facts" as const },
  { label: "Previous decisions loaded", source: "Compartments" as const },
];

// ─── Animation presets ──────────────────────────────────────────────────────
export const SPRING_SMOOTH = { damping: 200 };
export const SPRING_SNAPPY = { damping: 20, stiffness: 200 };
export const SPRING_GENTLE = { damping: 30, stiffness: 120 };
