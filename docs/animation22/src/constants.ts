// ─── Composition ─────────────────────────────────────────────────────────────
export const COMP_WIDTH = 1920;
export const COMP_HEIGHT = 1080;
export const FPS = 30;
export const TOTAL_FRAMES = 2730;

// ─── Scene boundaries (frame-accurate at 30fps) ───────────────────────────────
export const SCENE_1_START = 0;
export const SCENE_1_END = 209;
export const SCENE_2_START = 210;
export const SCENE_2_END = 329;
export const SCENE_3_START = 330;
export const SCENE_3_END = 599;
export const SCENE_4_START = 600;
export const SCENE_4_END = 959;
export const SCENE_5_START = 960;
export const SCENE_5_END = 1349;
export const SCENE_6_START = 1350;
export const SCENE_6_END = 1559;
export const SCENE_7_START = 1560;
export const SCENE_7_END = 1829;
export const SCENE_8_START = 1830;
export const SCENE_8_END = 2099;
export const SCENE_9_START = 2100;
export const SCENE_9_END = 2369;
export const SCENE_10_START = 2370;
export const SCENE_10_END = 2579;
export const SCENE_11_START = 2580;
export const SCENE_11_END = 2729;

// Scene durations
export const SCENE_1_DURATION = SCENE_1_END - SCENE_1_START + 1; // 210 frames (7s)
export const SCENE_2_DURATION = SCENE_2_END - SCENE_2_START + 1; // 120 frames (4s)
export const SCENE_3_DURATION = SCENE_3_END - SCENE_3_START + 1; // 270 frames (9s)
export const SCENE_4_DURATION = SCENE_4_END - SCENE_4_START + 1; // 360 frames (12s)
export const SCENE_5_DURATION = SCENE_5_END - SCENE_5_START + 1; // 390 frames (13s)
export const SCENE_6_DURATION = SCENE_6_END - SCENE_6_START + 1; // 210 frames (7s)
export const SCENE_7_DURATION = SCENE_7_END - SCENE_7_START + 1; // 270 frames (9s)
export const SCENE_8_DURATION = SCENE_8_END - SCENE_8_START + 1; // 270 frames (9s)
export const SCENE_9_DURATION = SCENE_9_END - SCENE_9_START + 1; // 270 frames (9s)
export const SCENE_10_DURATION = SCENE_10_END - SCENE_10_START + 1; // 210 frames (7s)
export const SCENE_11_DURATION = SCENE_11_END - SCENE_11_START + 1; // 150 frames (5s)

// ─── Layout ───────────────────────────────────────────────────────────────────
export const SESSION_WIDTH = 1100;
export const SESSION_HEIGHT = 880;
export const CONTEXT_PANEL_WIDTH = 380;
export const TRANSCRIPT_WIDTH = SESSION_WIDTH - CONTEXT_PANEL_WIDTH - 24;

// ─── Colors (Dark Theme - Premium Dev Tool Aesthetic) ─────────────────────────
export const COLORS = {
  // Backgrounds
  bg: "#0a0e17",                  // near-black deep navy
  panelBg: "#0f1419",             // deep charcoal
  panelBorder: "#1c2128",         // subtle border
  cardBg: "#161b22",              // card background
  cardBorder: "#21262d",          // card border
  
  // Text
  textPrimary: "#e6edf3",         // bright white
  textSecondary: "#8b949e",       // muted gray
  textMuted: "#484f58",           // dim gray
  
  // Session UI
  sessionHeader: "#0d1117",       // session header bg
  userBubble: "#1f6feb",          // blue for user messages
  userBubbleBg: "rgba(31,111,235,0.15)",
  assistantBlock: "#21262d",      // dark for assistant blocks
  actionRow: "#161b22",           // action row background
  inputBar: "#0d1117",            // input bar background
  
  // Context Inspector
  contextGreen: "#3fb950",        // healthy usage
  contextAmber: "#d29922",        // warning usage
  contextRed: "#f85149",          // critical usage
  contextTrack: "#21262d",        // progress track
  
  // Old Way (problematic)
  oldWayAccent: "#f85149",        // red/orange for problems
  oldWayBg: "rgba(248,81,73,0.08)",
  
  // Magic Context (solution)
  magicAccent: "#58a6ff",         // cyan/blue for magic
  magicBg: "rgba(88,166,255,0.08)",
  
  // Historian
  historianAccent: "#a371f7",      // purple/violet
  historianBg: "#1a1033",
  historianBorder: "#2e1065",
  
  // Compartment
  compartmentAccent: "#3fb950",    // emerald green
  compartmentBg: "#0d2818",
  compartmentBorder: "#196c2e",
  
  // Facts
  factAccent: "#79c0ff",           // light blue
  factBg: "rgba(121,192,255,0.12)",
  
  // Memory
  memoryAccent: "#d2a8ff",         // purple
  memoryBg: "rgba(210,168,255,0.08)",
  
  // Dreamer
  dreamerAccent: "#8b949e",        // muted moonlight
  dreamerBg: "#0d1117",
  
  // Sidekick
  sidekickAccent: "#56d4dd",       // cyan/mint
  sidekickBg: "rgba(86,212,221,0.08)",
  
  // Queue
  queueAccent: "#d29922",          // amber
  queueBg: "rgba(210,153,34,0.08)",
  
  // Selection/highlight
  selectionOutline: "#58a6ff",
  selectionBg: "rgba(88,166,255,0.1)",
  
  // Success
  successText: "#3fb950",
  
  // Chrome
  chromeButton: "#21262d",
  chromeButtonHover: "#30363d",
} as const;

// ─── Typography ────────────────────────────────────────────────────────────────
export const FONT_FAMILY =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";
export const FONT_FAMILY_MONO =
  "'JetBrains Mono', 'Fira Code', 'SF Mono', Monaco, Consolas, monospace";

// ─── Transcript content definitions ────────────────────────────────────────────
export interface TranscriptEntry {
  id: string;
  type: 'user' | 'assistant' | 'action';
  content: string;
  subContent?: string;
  timestamp?: string;
}

// Scene 1 transcript entries (old way - growing session)
export const SCENE1_TRANSCRIPT: TranscriptEntry[] = [
  {
    id: 'u1',
    type: 'user',
    content: 'Currently we have a new problem, athena-junior is able to spawn another athena-junior inside which normally shouldn\'t happen',
  },
  {
    id: 'a1',
    type: 'assistant',
    content: 'The user is saying that athena-junior can spawn another athena-junior as a sub-agent, which shouldn\'t be allowed. Let me investigate where task delegation is enforced.',
  },
  {
    id: 'act1',
    type: 'action',
    content: 'Explored 1 read, 2 searches',
  },
  {
    id: 'a2',
    type: 'assistant',
    content: 'I see the issue. There are guards for plan-family recursion and direct invocation, but no self-recursion guard for athena-junior.',
  },
  {
    id: 'act2',
    type: 'action',
    content: 'Edit subagent-resolver.ts',
  },
  {
    id: 'act3',
    type: 'action',
    content: 'Called lsp_diagnostics',
  },
  {
    id: 'u2',
    type: 'user',
    content: 'Can you also check if there are any other agents that can spawn themselves?',
  },
  {
    id: 'a3',
    type: 'assistant',
    content: 'I\'ll search for all agent types and their delegation rules to identify any other potential self-recursion issues.',
  },
  {
    id: 'act4',
    type: 'action',
    content: 'Explored 3 searches',
  },
  {
    id: 'a4',
    type: 'assistant',
    content: 'Found that prometheus, atlas, and sisyphus all have proper guards. Only athena-junior was missing the self-recursion check.',
  },
];

// Context inspector stats
export interface ContextStats {
  session: string;
  provider: string;
  model: string;
  contextLimit: number;
  totalTokens: number;
  usage: number;
  cacheTokens: number;
  assistantMessages: number;
  userMessages: number;
  rawMessages: number;
}

export const DEFAULT_CONTEXT_STATS: ContextStats = {
  session: 'ATHENA',
  provider: 'anthropic',
  model: 'claude-sonnet-4',
  contextLimit: 200000,
  totalTokens: 68000,
  usage: 34,
  cacheTokens: 12000,
  assistantMessages: 12,
  userMessages: 8,
  rawMessages: 45,
};

// Raw message types
export interface RawMessage {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  tokens: number;
  preview: string;
}

// Compartment definitions
export interface Compartment {
  id: string;
  title: string;
  messageRange: string;
  summary: string;
}

export const SAMPLE_COMPARTMENTS: Compartment[] = [
  {
    id: 'c1',
    title: 'Recursion investigation',
    messageRange: '§1§–§5§',
    summary: 'Investigated athena-junior self-spawning issue',
  },
  {
    id: 'c2',
    title: 'Delegation guard analysis',
    messageRange: '§6§–§12§',
    summary: 'Analyzed agent delegation rules and guards',
  },
  {
    id: 'c3',
    title: 'Self-recursion fix',
    messageRange: '§13§–§18§',
    summary: 'Implemented self-recursion guard in subagent-resolver',
  },
];

// Fact definitions
export interface Fact {
  id: string;
  content: string;
}

export const SAMPLE_FACTS: Fact[] = [
  { id: 'f1', content: 'athena-junior should not spawn itself' },
  { id: 'f2', content: 'guard belongs in subagent-resolver.ts' },
  { id: 'f3', content: 'plan-family recursion already blocked' },
  { id: 'f4', content: 'suggest category-based delegation' },
];

// Memory definitions
export interface Memory {
  id: string;
  type: string;
  content: string;
}

export const SAMPLE_MEMORIES: Memory[] = [
  { id: 'm1', type: 'Agent constraint', content: 'Prevent self-recursion for athena-junior' },
  { id: 'm2', type: 'Delegation policy', content: 'Category-based alternative for agent spawning' },
  { id: 'm3', type: 'Architecture note', content: 'Guard at subagent resolver layer' },
];

// Queued reduction definitions
export interface QueuedReduction {
  id: string;
  type: 'history' | 'raw' | 'stale';
  label: string;
  tokens: number;
}

export const SAMPLE_QUEUED_REDUCTIONS: QueuedReduction[] = [
  { id: 'q1', type: 'history', label: 'old investigation trace', tokens: 4500 },
  { id: 'q2', type: 'raw', label: 'stale scratch context', tokens: 2800 },
  { id: 'q3', type: 'stale', label: 'temporary diagnostics', tokens: 1200 },
];