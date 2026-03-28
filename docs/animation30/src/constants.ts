// ─── Core Composition Settings ─────────────────────────────────────────────
export const FPS = 30;
export const COMP_WIDTH = 1920;
export const COMP_HEIGHT = 1080;
export const TOTAL_FRAMES = 2730; // 91 seconds at 30fps

// ─── Scene Boundaries (Frame Accurate) ─────────────────────────────────────
export const SCENE_1_START = 0;      // 0–209 (7.0s) - Old way pain
export const SCENE_2_START = 210;    // 210–329 (4.0s) - Split comparison
export const SCENE_3_START = 330;    // 330–599 (9.0s) - Historian activation
export const SCENE_4_START = 600;    // 600–959 (12.0s) - Hero shot
export const SCENE_5_START = 960;    // 960–1349 (13.0s) - Historian outputs
export const SCENE_6_START = 1350;   // 1350–1559 (7.0s) - Payoff
export const SCENE_7_START = 1560;   // 1560–1829 (9.0s) - Long session merging
export const SCENE_8_START = 1830;   // 1830–2099 (9.0s) - Cache awareness
export const SCENE_9_START = 2100;   // 2100–2369 (9.0s) - Dreamer
export const SCENE_10_START = 2370;  // 2370–2579 (7.0s) - Sidekick
export const SCENE_11_START = 2580;  // 2580–2729 (5.0s) - Final card

export const SCENE_DURATIONS = {
  scene1: 210,   // frames 0-209
  scene2: 120,   // frames 210-329
  scene3: 270,   // frames 330-599
  scene4: 360,   // frames 600-959
  scene5: 390,   // frames 960-1349
  scene6: 210,   // frames 1350-1559
  scene7: 270,   // frames 1560-1829
  scene8: 270,   // frames 1830-2099
  scene9: 270,   // frames 2100-2369
  scene10: 210,  // frames 2370-2579
  scene11: 150,  // frames 2580-2729
} as const;

// ─── Color Palette ─────────────────────────────────────────────────────────
export const COLORS = {
  // Backgrounds
  bg: "#0a0a0f",                    // Deep near-black
  bgPanel: "#0d1117",               // GitHub-dark style
  bgCard: "#161b22",                // Slightly elevated
  bgElevated: "#1c2128",            // Elevated surface
  
  // Borders
  border: "#30363d",                // Subtle borders
  borderHover: "#3d444d",           // Hover state
  borderAccent: "#58a6ff",          // Accent borders
  
  // Text
  textPrimary: "#f0f6fc",           // Primary text
  textSecondary: "#8b949e",         // Secondary/muted
  textTertiary: "#6e7681",          // Very muted
  
  // Old Way Accents (amber/orange/warm)
  oldAccent: "#f0883e",             // Warm orange
  oldWarning: "#d29922",            // Amber warning
  oldDanger: "#da3633",             // Red danger
  
  // Magic Context Accents (cyan/teal/blue-green)
  magicAccent: "#39d0d8",           // Cyan
  magicGlow: "#22d3ee",             // Bright cyan
  
  // Historian Accents (blue-violet/teal-blue)
  historianAccent: "#7dd3fc",       // Sky blue
  historianGlow: "#38bdf8",         // Light blue
  historianDeep: "#0ea5e9",         // Deeper blue
  
  // Dreamer Accents (indigo/moonlit blue)
  dreamerAccent: "#818cf8",         // Indigo
  dreamerGlow: "#6366f1",           // Deep indigo
  
  // Sidekick Accents (cyan/mint)
  sidekickAccent: "#34d399",        // Emerald mint
  sidekickGlow: "#10b981",          // Deep mint
  
  // Memory/Facts (controlled cool)
  memoryAccent: "#a78bfa",          // Violet
  factAccent: "#60a5fa",            // Blue
  compartmentAccent: "#22d3ee",     // Cyan
  
  // Context bar colors
  contextGreen: "#238636",
  contextYellow: "#d29922",
  contextRed: "#da3633",
  contextTrack: "#21262d",
  
  // Status colors
  success: "#3fb950",
  warning: "#d29922",
  error: "#f85149",
  info: "#58a6ff",
} as const;

// ─── Typography ────────────────────────────────────────────────────────────
export const FONT_FAMILY = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";
export const FONT_FAMILY_MONO = "'JetBrains Mono', 'Fira Code', 'SF Mono', Monaco, monospace";

// ─── Layout Tokens ─────────────────────────────────────────────────────────
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const BORDER_RADIUS = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  full: 9999,
} as const;

// ─── Transcript Content Types ──────────────────────────────────────────────
export interface TranscriptEntry {
  id: string;
  type: 'user' | 'assistant' | 'action';
  content: string;
  subContent?: string;
  timestamp?: string;
}

export interface ContextStat {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface RawMessage {
  id: string;
  type: 'user' | 'assistant' | 'tool';
  tokens: number;
  preview: string;
}

// ─── Scene Content Data ────────────────────────────────────────────────────

// Scene 1: Realistic OpenCode session transcript
export const SCENE1_TRANSCRIPT: TranscriptEntry[] = [
  {
    id: '1',
    type: 'user',
    content: 'Currently we have a new problem, athena-junior is able to spawn another athena-junior inside which normally shouldn\'t happen',
  },
  {
    id: '2',
    type: 'assistant',
    content: 'The user is saying that athena-junior can spawn another athena-junior as a sub-agent, which shouldn\'t be allowed. Let me investigate where task delegation is enforced.',
  },
  {
    id: '3',
    type: 'action',
    content: 'Explored',
    subContent: '1 read, 2 searches',
  },
  {
    id: '4',
    type: 'assistant',
    content: 'I see the issue. There are guards for plan-family recursion and direct invocation, but no self-recursion guard for athena-junior.',
  },
  {
    id: '5',
    type: 'action',
    content: 'Edit',
    subContent: 'subagent-resolver.ts',
  },
  {
    id: '6',
    type: 'action',
    content: 'Called',
    subContent: 'lsp_diagnostics',
  },
  {
    id: '7',
    type: 'user',
    content: 'Also check if there are similar issues in other resolver files',
  },
  {
    id: '8',
    type: 'assistant',
    content: 'Good point. Let me search for similar delegation patterns across the codebase to ensure we haven\'t missed anything.',
  },
  {
    id: '9',
    type: 'action',
    content: 'Explored',
    subContent: '3 searches, 4 reads',
  },
  {
    id: '10',
    type: 'assistant',
    content: 'Found two additional resolver files that might need similar guards. Let me examine them.',
  },
  {
    id: '11',
    type: 'action',
    content: 'Edit',
    subContent: 'task-resolver.ts',
  },
];

// Scene 3-4: Historian scene content
export const SCENE3_TRANSCRIPT: TranscriptEntry[] = [
  {
    id: '1',
    type: 'assistant',
    content: 'I detect fix intent. Let me trace where sub-agent spawning is gated.',
  },
  {
    id: '2',
    type: 'action',
    content: 'Explored',
    subContent: '1 read, 2 searches',
  },
  {
    id: '3',
    type: 'assistant',
    content: 'The issue is clear. A self-recursion guard is missing.',
  },
  {
    id: '4',
    type: 'action',
    content: 'Edit',
    subContent: 'subagent-resolver.ts',
  },
  {
    id: '5',
    type: 'action',
    content: 'Called',
    subContent: 'lsp_diagnostics',
  },
];

// Scene 10: Sidekick content
export const SCENE10_USER_PROMPT = 'Continue the auth refactor and preserve the retry behavior.';

export const SIDEKICK_BRIEFING = [
  'Relevant memory found',
  'Prior constraint restored',
  'Previous decisions loaded',
];

// ─── Raw Message Examples ─────────────────────────────────────────────────
export const RAW_MESSAGES: RawMessage[] = [
  { id: '1', type: 'user', tokens: 142, preview: 'Currently we have a new problem...' },
  { id: '2', type: 'assistant', tokens: 312, preview: 'The user is saying that athena-junior...' },
  { id: '3', type: 'tool', tokens: 892, preview: 'Exploration results: 3 files found...' },
  { id: '4', type: 'assistant', tokens: 256, preview: 'I see the issue. There are guards...' },
  { id: '5', type: 'user', tokens: 98, preview: 'Also check if there are similar...' },
  { id: '6', type: 'tool', tokens: 1247, preview: 'grep results: 15 matches found...' },
  { id: '7', type: 'assistant', tokens: 189, preview: 'Found two additional resolver files...' },
  { id: '8', type: 'tool', tokens: 543, preview: 'file contents: task-resolver.ts...' },
  { id: '9', type: 'assistant', tokens: 278, preview: 'I\'ll add the guard here as well...' },
  { id: '10', type: 'tool', tokens: 721, preview: 'edit: subagent-resolver.ts...' },
];

// ─── Historian Outputs ─────────────────────────────────────────────────────
export const COMPARTMENT_EXAMPLES = [
  { title: 'Recursion investigation', summary: 'Traced delegation patterns, identified missing self-recursion guard' },
  { title: 'Delegation guard analysis', summary: 'Found 3 resolver files needing similar guards' },
  { title: 'Self-recursion fix', summary: 'Added guard in subagent-resolver.ts, verified with diagnostics' },
];

export const FACT_EXAMPLES = [
  'athena-junior should not spawn itself',
  'guard belongs in subagent-resolver.ts',
  'plan-family recursion already blocked',
  'suggest category-based delegation',
];

export const MEMORY_EXAMPLES = [
  'Agent constraint: prevent self-recursion',
  'Delegation rule: category-based alternative',
  'Architecture note: guard at subagent resolver layer',
];

// ─── Animation Timing Helpers ──────────────────────────────────────────────
export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
export const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

// Frame interpolation helper
export const interpolate = (frame: number, start: number, end: number, from: number, to: number, easing?: (t: number) => number) => {
  if (frame < start) return from;
  if (frame > end) return to;
  const progress = (frame - start) / (end - start);
  const eased = easing ? easing(progress) : progress;
  return from + (to - from) * eased;
};

// Clamp helper
export const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);
