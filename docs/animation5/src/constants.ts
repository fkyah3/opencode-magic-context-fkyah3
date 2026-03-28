// ─── Composition ─────────────────────────────────────────────────────────────
export const COMP_WIDTH = 1920;
export const COMP_HEIGHT = 1080;
export const FPS = 30;
export const TOTAL_FRAMES = 2730;

// ─── Scene frame boundaries ─────────────────────────────────────────────────
export const SCENE_1_START = 0;
export const SCENE_1_END = 209;
export const SCENE_1_DURATION = 210; // 7.0s — Old Way

export const SCENE_2_START = 210;
export const SCENE_2_END = 329;
export const SCENE_2_DURATION = 120; // 4.0s — Split Bridge

export const SCENE_3_START = 330;
export const SCENE_3_END = 599;
export const SCENE_3_DURATION = 270; // 9.0s — Historian Activation

export const SCENE_4_START = 600;
export const SCENE_4_END = 959;
export const SCENE_4_DURATION = 360; // 12.0s — Head-to-Tail

export const SCENE_5_START = 960;
export const SCENE_5_END = 1349;
export const SCENE_5_DURATION = 390; // 13.0s — Historian Outputs

export const SCENE_6_START = 1350;
export const SCENE_6_END = 1559;
export const SCENE_6_DURATION = 210; // 7.0s — Healthy Payoff

export const SCENE_7_START = 1560;
export const SCENE_7_END = 1829;
export const SCENE_7_DURATION = 270; // 9.0s — Long Session

export const SCENE_8_START = 1830;
export const SCENE_8_END = 2099;
export const SCENE_8_DURATION = 270; // 9.0s — Cache Awareness

export const SCENE_9_START = 2100;
export const SCENE_9_END = 2369;
export const SCENE_9_DURATION = 270; // 9.0s — Dreamer

export const SCENE_10_START = 2370;
export const SCENE_10_END = 2579;
export const SCENE_10_DURATION = 210; // 7.0s — Sidekick

export const SCENE_11_START = 2580;
export const SCENE_11_END = 2729;
export const SCENE_11_DURATION = 150; // 5.0s — End Card

// ─── Colors ─────────────────────────────────────────────────────────────────
export const C = {
  // Base
  bg: "#0B0E17",
  bgSubtle: "#0F1420",
  bgPanel: "#131A2B",
  bgCard: "#1A2236",
  bgCardHover: "#1F2A40",

  // Text
  textPrimary: "#E8EDF5",
  textSecondary: "#8B95A8",
  textMuted: "#4A5568",
  textDim: "#2D3748",

  // Old Way
  oldAmber: "#F59E0B",
  oldOrange: "#EA580C",
  oldRed: "#DC2626",
  oldGlow: "rgba(245, 158, 11, 0.15)",
  oldBorder: "rgba(245, 158, 11, 0.3)",

  // Magic Context
  mcCyan: "#22D3EE",
  mcBlue: "#3B82F6",
  mcTeal: "#14B8A6",
  mcGreen: "#10B981",
  mcGlow: "rgba(34, 211, 238, 0.12)",
  mcBorder: "rgba(34, 211, 238, 0.25)",

  // Historian
  histViolet: "#8B5CF6",
  histBlue: "#6366F1",
  histGlow: "rgba(139, 92, 246, 0.15)",
  histBorder: "rgba(139, 92, 246, 0.3)",
  histBg: "#15102B",

  // Dreamer
  dreamIndigo: "#6366F1",
  dreamMoon: "#818CF8",
  dreamGlow: "rgba(99, 102, 241, 0.12)",
  dreamBorder: "rgba(99, 102, 241, 0.25)",

  // Sidekick
  sideLight: "#67E8F9",
  sideMint: "#6EE7B7",
  sideGlow: "rgba(103, 232, 249, 0.12)",
  sideBorder: "rgba(103, 232, 249, 0.25)",

  // Context meter
  meterSafe: "#22C55E",
  meterWarn: "#F59E0B",
  meterDanger: "#EF4444",
  meterTrack: "#1E293B",

  // Shared
  border: "#1E293B",
  borderLight: "#334155",
  success: "#34D399",
  gridLine: "rgba(255, 255, 255, 0.03)",
  gridLineBright: "rgba(255, 255, 255, 0.06)",

  // Compartments
  compGreen: "#34D399",
  compBg: "#0C1F1A",
  compBorder: "rgba(52, 211, 153, 0.3)",

  // Facts
  factCyan: "#22D3EE",
  factBg: "rgba(34, 211, 238, 0.08)",
  factBorder: "rgba(34, 211, 238, 0.2)",

  // Memory
  memBlue: "#60A5FA",
  memBg: "rgba(96, 165, 250, 0.08)",
  memBorder: "rgba(96, 165, 250, 0.25)",
  memGlow: "rgba(96, 165, 250, 0.15)",
} as const;

// ─── Typography ──────────────────────────────────────────────────────────────
export const FONT = {
  sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', 'SF Mono', Monaco, 'Consolas', monospace",
} as const;

// ─── Layout ──────────────────────────────────────────────────────────────────
export const LAYOUT = {
  padding: 48,
  panelRadius: 16,
  cardRadius: 12,
  chipRadius: 8,
  railHeight: 180,
  railCardWidth: 140,
  railCardHeight: 72,
  railGap: 12,
  agentPanelWidth: 380,
  agentPanelHeight: 160,
  meterWidth: 320,
  meterHeight: 48,
  historianPanelWidth: 380,
  historianPanelHeight: 160,
  outputAreaWidth: 500,
} as const;

// ─── Agent status texts ──────────────────────────────────────────────────────
export const AGENT_STATUSES_SCENE1 = [
  "Searching auth.ts",
  "Tracing cache path",
  "Updating tests",
  "Running build",
  "Inspecting retry logic",
  "Reading config files",
  "Analyzing imports",
  "Checking type constraints",
];

export const AGENT_STATUSES_SCENE3 = [
  "Reading project files",
  "Fixing auth edge case",
  "Updating integration tests",
  "Running focused test set",
  "Tracing call graph",
  "Analyzing error paths",
];

export const AGENT_STATUSES_SCENE4 = [
  "Patch applied",
  "Re-running tests",
  "Inspecting timeout behavior",
  "Fixed token refresh path",
  "Updated integration fixtures",
  "Tests passing 18/18",
];

export const AGENT_STATUSES_SCENE6 = [
  "Finalizing patch",
  "Running full suite",
  "Creating clean diff",
  "All tests passing",
];

export const HISTORIAN_STATUSES_IDLE = [
  "Standby",
  "Monitoring context pressure",
];

export const HISTORIAN_STATUSES_ACTIVE = [
  "Preparing background compaction",
  "Selecting older messages",
  "Compartmentalizing history",
  "Extracting durable facts",
  "Promoting stable memory",
  "Compaction pass complete",
];

export const COMPACTION_STATUSES = [
  "Summarizing previous steps",
  "Rebuilding working context",
  "Compressing 2,143 messages",
];

// ─── Conversation rail messages ──────────────────────────────────────────────
export type RailMessageDef = {
  id: string;
  text: string;
  type: "tool" | "edit" | "test" | "search" | "note" | "decision";
};

export const RAIL_MESSAGES_OLD: RailMessageDef[] = [
  { id: "#001", text: "Investigated stale token path", type: "search" },
  { id: "#004", text: "Read auth middleware", type: "tool" },
  { id: "#008", text: "Checked session expiry logic", type: "search" },
  { id: "#012", text: "Adjusted timeout guard", type: "edit" },
  { id: "#015", text: "Ran integration tests", type: "test" },
  { id: "#018", text: "Cache mismatch observed", type: "note" },
  { id: "#021", text: "Retry branch preserved", type: "decision" },
  { id: "#024", text: "Fixed connection pooling", type: "edit" },
  { id: "#028", text: "Updated error handlers", type: "edit" },
  { id: "#031", text: "Traced Redis timeout", type: "search" },
  { id: "#034", text: "Applied backoff strategy", type: "decision" },
  { id: "#036", text: "Re-ran focused tests", type: "test" },
];

export const RAIL_MESSAGES_NEW: RailMessageDef[] = [
  { id: "#067", text: "Patching auth refresh", type: "edit" },
  { id: "#071", text: "Tracing token flow", type: "search" },
  { id: "#075", text: "Updated test fixtures", type: "test" },
  { id: "#079", text: "Verified retry semantics", type: "note" },
  { id: "#083", text: "Running full suite", type: "test" },
  { id: "#087", text: "Clean diff prepared", type: "tool" },
  { id: "#091", text: "Inspecting edge cases", type: "search" },
  { id: "#095", text: "All tests passing", type: "test" },
  { id: "#099", text: "Session refactor stable", type: "decision" },
  { id: "#103", text: "Updating API contract", type: "edit" },
  { id: "#107", text: "Integration verified", type: "test" },
  { id: "#111", text: "Cache layer confirmed", type: "note" },
  { id: "#115", text: "Final validation pass", type: "test" },
  { id: "#119", text: "Submitting clean patch", type: "tool" },
  { id: "#124", text: "Tests passing 18/18", type: "test" },
  { id: "#129", text: "Build succeeded", type: "tool" },
];

// ─── Compartment data ────────────────────────────────────────────────────────
export const COMPARTMENTS = [
  { title: "Auth debugging", tags: ["auth", "token", "session"], density: 0.7 },
  { title: "Cache decision trail", tags: ["redis", "cache", "ttl"], density: 0.6 },
  { title: "Test repair session", tags: ["tests", "fixtures", "ci"], density: 0.5 },
];

// ─── Fact chips ──────────────────────────────────────────────────────────────
export const FACTS = [
  "Uses Redis for cache",
  "Retry behavior must remain",
  "Auth bug: stale token branch",
  "Integration tests updated",
  "Preserve timeout backoff",
];

// ─── Memory entries ──────────────────────────────────────────────────────────
export const MEMORIES = [
  "Project constraint: preserve retry semantics",
  "Architecture: Redis-backed session cache",
  "Naming: auth/session/token split",
  "Preference: keep integration tests explicit",
];

// ─── Cache awareness data ────────────────────────────────────────────────────
export const QUEUED_REDUCTIONS = [
  { label: "Queued: #041–#052", type: "range" as const },
  { label: "Queued: stale scratchpad", type: "stale" as const },
  { label: "Queued: temporary trace", type: "temp" as const },
];

// ─── Dreamer tasks ───────────────────────────────────────────────────────────
export const DREAMER_TASKS = [
  { text: "Consolidating memory", icon: "merge" as const },
  { text: "Verifying retained facts", icon: "check" as const },
  { text: "Archiving stale knowledge", icon: "archive" as const },
  { text: "Improving summaries", icon: "edit" as const },
];

// ─── Sidekick briefing items ─────────────────────────────────────────────────
export const SIDEKICK_ITEMS = [
  "Relevant memory found",
  "Constraint restored",
  "Previous decisions loaded",
];

// ─── Code editor mock lines ──────────────────────────────────────────────────
export const CODE_LINES = [
  "async function refreshToken(session: Session) {",
  "  const token = await cache.get(session.id);",
  "  if (!token || isExpired(token)) {",
  "    const newToken = await auth.refresh(session);",
  "    await cache.set(session.id, newToken, TTL);",
  "    return newToken;",
  "  }",
  "  return token;",
  "}",
  "",
  "export async function validateAuth(req: Request) {",
  "  const session = extractSession(req);",
  "  const token = await refreshToken(session);",
  "  if (!verifySignature(token)) {",
  "    throw new AuthError('Invalid token');",
  "  }",
  "  return { session, token };",
  "}",
];

// ─── Terminal mock output ────────────────────────────────────────────────────
export const TERMINAL_LINES = [
  "$ npm run test:auth",
  "  ✓ token refresh on expiry (12ms)",
  "  ✓ session validation (8ms)",
  "  ✓ cache fallback path (15ms)",
  "  ✓ retry on connection drop (22ms)",
  "  ✓ stale token rejection (6ms)",
  "",
  "  Tests: 5 passed, 5 total",
  "  Time:  0.42s",
];

// ─── File tabs ───────────────────────────────────────────────────────────────
export const FILE_TABS = [
  "auth.ts",
  "session.ts",
  "cache.ts",
  "retry.ts",
  "auth.test.ts",
];
