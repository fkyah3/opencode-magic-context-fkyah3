// OpenCode Magic Context Animation - Design System Constants
// Frame-accurate timeline at 30fps, total 91 seconds = 2730 frames

export const FPS = 30;
export const TOTAL_DURATION_SECONDS = 91;
export const TOTAL_FRAMES = FPS * TOTAL_DURATION_SECONDS; // 2730

// Scene boundaries (frame-accurate)
export const SCENES = {
  SCENE_1_START: 0,      // Old way: full-screen pain
  SCENE_1_END: 209,      // 210 frames / 7.0s
  
  SCENE_2_START: 210,    // Split comparison bridge
  SCENE_2_END: 329,      // 120 frames / 4.0s
  
  SCENE_3_START: 330,    // Historian activation: no blocking
  SCENE_3_END: 599,      // 270 frames / 9.0s
  
  SCENE_4_START: 600,    // Head-to-tail simultaneous motion
  SCENE_4_END: 959,      // 360 frames / 12.0s
  
  SCENE_5_START: 960,    // Historian outputs: compartments, facts, memory
  SCENE_5_END: 1349,     // 390 frames / 13.0s
  
  SCENE_6_START: 1350,   // Healthy-context payoff
  SCENE_6_END: 1559,     // 210 frames / 7.0s
  
  SCENE_7_START: 1560,   // Long-session compression
  SCENE_7_END: 1829,     // 270 frames / 9.0s
  
  SCENE_8_START: 1830,   // Cache awareness
  SCENE_8_END: 2099,     // 270 frames / 9.0s
  
  SCENE_9_START: 2100,   // Dreamer
  SCENE_9_END: 2369,     // 270 frames / 9.0s
  
  SCENE_10_START: 2370,  // Sidekick
  SCENE_10_END: 2579,    // 210 frames / 7.0s
  
  SCENE_11_START: 2580,  // Final payoff / end card
  SCENE_11_END: 2729,    // 150 frames / 5.0s
} as const;

// Video dimensions
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;

// Color palette - Dark, refined, modern infrastructure aesthetic
export const COLORS = {
  // Base
  background: '#0a0a0f',
  backgroundSecondary: '#111118',
  backgroundTertiary: '#1a1a24',
  
  // Accents - Old way (warm amber/orange/muted red)
  oldWay: {
    primary: '#f59e0b',      // amber-500
    secondary: '#ea580c',    // orange-600
    tertiary: '#dc2626',       // red-600
    glow: 'rgba(245, 158, 11, 0.3)',
    muted: 'rgba(245, 158, 11, 0.1)',
  },
  
  // Accents - Magic Context (cyan/blue/teal/green)
  magicContext: {
    primary: '#06b6d4',      // cyan-500
    secondary: '#3b82f6',    // blue-500
    tertiary: '#14b8a6',     // teal-500
    quaternary: '#22c55e',   // green-500
    glow: 'rgba(6, 182, 212, 0.3)',
    muted: 'rgba(6, 182, 212, 0.1)',
  },
  
  // Accents - Historian (cool violet-blue/teal-blue)
  historian: {
    primary: '#6366f1',      // indigo-500
    secondary: '#0ea5e9',    // sky-500
    tertiary: '#8b5cf6',     // violet-500
    glow: 'rgba(99, 102, 241, 0.3)',
    muted: 'rgba(99, 102, 241, 0.1)',
  },
  
  // Accents - Dreamer (indigo/moonlit blue)
  dreamer: {
    primary: '#4f46e5',      // indigo-600
    secondary: '#1e40af',    // blue-800
    tertiary: '#312e81',     // indigo-900
    glow: 'rgba(79, 70, 229, 0.3)',
    muted: 'rgba(79, 70, 229, 0.1)',
  },
  
  // Accents - Sidekick (lighter cyan/mint)
  sidekick: {
    primary: '#22d3ee',      // cyan-400
    secondary: '#34d399',    // emerald-400
    glow: 'rgba(34, 211, 238, 0.3)',
    muted: 'rgba(34, 211, 238, 0.1)',
  },
  
  // Text
  text: {
    primary: '#f8fafc',      // slate-50
    secondary: '#94a3b8',    // slate-400
    tertiary: '#64748b',     // slate-500
    muted: '#475569',        // slate-600
  },
  
  // UI elements
  border: '#27272a',         // zinc-800
  borderLight: '#3f3f46',    // zinc-700
  card: '#18181b',           // zinc-900
  cardHover: '#27272a',      // zinc-800
  
  // Status
  success: '#22c55e',        // green-500
  warning: '#f59e0b',        // amber-500
  error: '#ef4444',          // red-500
  info: '#3b82f6',           // blue-500
} as const;

// Typography
export const TYPOGRAPHY = {
  fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
  fontFamilyMono: '"JetBrains Mono", "Fira Code", "SF Mono", monospace',
  
  sizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px',
  },
  
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// Spacing and layout
export const LAYOUT = {
  margin: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
  
  padding: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
  },
  
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '9999px',
  },
  
  card: {
    width: 320,
    height: 180,
    padding: 16,
    borderRadius: 12,
  },
  
  rail: {
    height: 120,
    cardWidth: 140,
    cardHeight: 80,
    cardGap: 8,
  },
} as const;

// Animation timing
export const TIMING = {
  // Easing functions
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  spring: [0.34, 1.56, 0.64, 1],
  smooth: [0.25, 0.1, 0.25, 1],
  
  // Durations (in frames at 30fps)
  fast: 10,      // 0.33s
  normal: 20,    // 0.67s
  slow: 30,      // 1.0s
  slower: 45,    // 1.5s
  slowest: 60,   // 2.0s
} as const;

// Component-specific constants
export const COMPONENTS = {
  // AgentCard
  agentCard: {
    width: 280,
    height: 100,
    avatarSize: 40,
    statusDotSize: 8,
  },
  
  // ContextMeter
  contextMeter: {
    width: 200,
    height: 12,
    thresholdWarning: 75,
    thresholdCritical: 90,
    thresholdMax: 100,
  },
  
  // ConversationRail
  conversationRail: {
    height: 140,
    messageCardWidth: 120,
    messageCardHeight: 70,
    gap: 6,
    headZoneWidth: 0.4,  // 40% of rail is "head" (older)
    tailZoneWidth: 0.6,  // 60% of rail is "tail" (newer)
  },
  
  // MessageCard
  messageCard: {
    minWidth: 100,
    maxWidth: 160,
    height: 60,
    padding: 8,
  },
  
  // HistorianPanel
  historianPanel: {
    width: 260,
    height: 140,
  },
  
  // StructuredOutputs
  structuredOutputs: {
    width: 300,
    compartmentHeight: 80,
    factChipHeight: 28,
    memoryHeight: 50,
  },
  
  // Caption
  caption: {
    maxWidth: 800,
    fontSize: '24px',
    lineHeight: 1.4,
  },
} as const;

// Status messages for agents
export const STATUS_MESSAGES = {
  mainAgent: {
    working: [
      'Reading project files',
      'Tracing cache path',
      'Updating tests',
      'Running build',
      'Inspecting retry logic',
      'Fixing auth edge case',
      'Updating integration tests',
      'Running focused test set',
      'Patch applied',
      'Re-running tests',
      'Inspecting timeout behavior',
      'Fixed token refresh path',
      'Updated integration fixtures',
      'Tests passing 18/18',
      'Finalizing patch',
      'Running full suite',
      'Creating clean diff',
    ],
    blocked: [
      'Context limit reached',
      'Compacting history...',
    ],
    continuing: [
      'Loaded prior constraints',
      'Continuing from previous context',
      'Applying known architecture decisions',
    ],
  },
  
  historian: {
    idle: 'Standby',
    monitoring: 'Monitoring context pressure',
    preparing: 'Preparing background compaction',
    compartmentalizing: 'Compartmentalizing history',
    extracting: 'Extracting durable facts',
    promoting: 'Promoting stable memory',
    merging: 'Merging older compartments',
    complete: 'Compaction complete',
  },
  
  dreamer: {
    consolidating: 'Consolidating memory',
    verifying: 'Verifying retained facts',
    archiving: 'Archiving stale knowledge',
    improving: 'Improving summaries',
  },
  
  sidekick: {
    preparing: 'Preparing context',
    loading: 'Loading prior constraints',
    briefing: 'Assembling briefing',
  },
} as const;

// Sample conversation messages
export const SAMPLE_MESSAGES = [
  'Investigated stale token path',
  'Adjusted session timeout guard',
  'Re-ran integration tests',
  'Cache mismatch observed',
  'Retry branch preserved',
  'Auth bug traced to branch',
  'Token refresh logic fixed',
  'Session handling updated',
  'Integration tests passing',
  'Build successful',
  'Diff generated',
  'PR ready for review',
];

// Compartment labels
export const COMPARTMENT_LABELS = [
  'Auth debugging',
  'Cache decision trail',
  'Test repair session',
  'Token refresh fix',
  'Integration updates',
];

// Fact chips
export const FACT_CHIPS = [
  'Uses Redis for cache',
  'Retry behavior must remain',
  'Auth bug: stale token branch',
  'Integration tests updated',
  'Preserve timeout backoff',
  'Session cache: Redis-backed',
  'Auth/session/token split',
  'Keep integration tests explicit',
];

// Memory entries
export const MEMORY_ENTRIES = [
  'Project constraint: preserve retry semantics',
  'Architecture decision: Redis-backed session cache',
  'Naming pattern: auth/session/token split',
  'Preference: keep integration tests explicit',
];

// Captions for each scene
export const SCENE_CAPTIONS = {
  scene1: 'Old way: the main agent hits the limit and stops to compact itself.',
  scene3: 'Magic Context: before the limit blocks the session, a background Historian starts working.',
  scene4: 'Historian rewrites the head. The main agent keeps moving on the tail.',
  scene5: 'Old history becomes structured context: compartments, facts, and memory.',
  scene6: 'The main agent never stopped. Flow stayed intact.',
  scene7: 'As sessions grow, older compartments can be merged again to save even more space.',
  scene8: 'Cache-aware reductions: queue first, apply when timing actually makes sense.',
  scene9: 'Dreamer keeps the knowledge layer healthy between active sessions.',
  scene10: 'Sidekick helps new sessions start with the right context already in place.',
  scene11: [
    'Keep the main agent in flow.',
    'Let Magic Context handle the past.',
  ],
} as const;
