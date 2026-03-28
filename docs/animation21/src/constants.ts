// Animation Constants for OpenCode Magic Context
// Frame-accurate timeline at 30 fps, Total: 2730 frames (~91 seconds)

export const FPS = 30;
export const TOTAL_FRAMES = 2730;
export const DURATION_SECONDS = 91;

// Scene boundaries (frame numbers)
export const SCENES = {
  SCENE_1_START: 0,      // Old way: full-screen session pain
  SCENE_1_END: 209,
  SCENE_2_START: 210,    // Split comparison bridge
  SCENE_2_END: 329,
  SCENE_3_START: 330,    // Historian activation
  SCENE_3_END: 599,
  SCENE_4_START: 600,    // Hero shot: Historian takes from head
  SCENE_4_END: 959,
  SCENE_5_START: 960,    // Historian outputs
  SCENE_5_END: 1349,
  SCENE_6_START: 1350,   // Payoff: pressure drops
  SCENE_6_END: 1559,
  SCENE_7_START: 1560,   // Long-session sustainability
  SCENE_7_END: 1829,
  SCENE_8_START: 1830,   // Cache awareness
  SCENE_8_END: 2099,
  SCENE_9_START: 2100,   // Dreamer
  SCENE_9_END: 2369,
  SCENE_10_START: 2370,  // Sidekick
  SCENE_10_END: 2579,
  SCENE_11_START: 2580,  // Final payoff
  SCENE_11_END: 2729,
} as const;

// Scene durations in frames
export const SCENE_DURATIONS = {
  SCENE_1: 210,   // 7.0s
  SCENE_2: 120,   // 4.0s
  SCENE_3: 270,   // 9.0s
  SCENE_4: 360,   // 12.0s
  SCENE_5: 390,   // 13.0s
  SCENE_6: 210,   // 7.0s
  SCENE_7: 270,   // 9.0s
  SCENE_8: 270,   // 9.0s
  SCENE_9: 270,   // 9.0s
  SCENE_10: 210,  // 7.0s
  SCENE_11: 150,  // 5.0s
} as const;

// Color palette - Dark premium technical aesthetic
export const COLORS = {
  // Backgrounds
  bgPrimary: '#0a0a0f',
  bgSecondary: '#111118',
  bgTertiary: '#1a1a24',
  bgCard: '#15151d',
  bgPanel: '#12121a',
  bgOverlay: 'rgba(0, 0, 0, 0.6)',
  
  // Accents - Old way (warm/urgent)
  oldWay: {
    primary: '#f59e0b',    // amber
    secondary: '#ea580c',  // orange
    tertiary: '#dc2626',   // red
    glow: 'rgba(245, 158, 11, 0.3)',
  },
  
  // Accents - Magic Context (cool/flowing)
  magicContext: {
    primary: '#06b6d4',    // cyan
    secondary: '#14b8a6',  // teal
    tertiary: '#0ea5e9',   // sky blue
    glow: 'rgba(6, 182, 212, 0.3)',
  },
  
  // Accents - Historian (cool blue-violet)
  historian: {
    primary: '#6366f1',    // indigo
    secondary: '#8b5cf6',  // violet
    tertiary: '#06b6d4',   // cyan-teal
    glow: 'rgba(99, 102, 241, 0.3)',
  },
  
  // Accents - Dreamer (indigo/moonlit)
  dreamer: {
    primary: '#4f46e5',    // indigo
    secondary: '#3730a3',  // deep indigo
    tertiary: '#818cf8',   // light indigo
    glow: 'rgba(79, 70, 229, 0.3)',
  },
  
  // Accents - Sidekick (cyan/mint)
  sidekick: {
    primary: '#06b6d4',    // cyan
    secondary: '#10b981',  // emerald
    tertiary: '#34d399',   // mint
    glow: 'rgba(6, 182, 212, 0.3)',
  },
  
  // Text
  textPrimary: '#f8fafc',
  textSecondary: '#94a3b8',
  textTertiary: '#64748b',
  textMuted: '#475569',
  
  // Borders
  borderPrimary: 'rgba(148, 163, 184, 0.15)',
  borderSecondary: 'rgba(148, 163, 184, 0.08)',
  borderAccent: 'rgba(6, 182, 212, 0.3)',
  
  // Semantic
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
} as const;

// Typography
export const TYPOGRAPHY = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontFamilyMono: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", monospace',
  
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
} as const;

// Border radius
export const RADIUS = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  full: 9999,
} as const;

// Shadows
export const SHADOWS = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
  md: '0 4px 6px rgba(0, 0, 0, 0.4)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.5)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.6)',
  glow: '0 0 20px rgba(6, 182, 212, 0.2)',
  glowAmber: '0 0 20px rgba(245, 158, 11, 0.2)',
  glowIndigo: '0 0 20px rgba(99, 102, 241, 0.2)',
} as const;

// Layout dimensions
export const LAYOUT = {
  width: 1920,
  height: 1080,
  transcriptWidth: 1100,
  inspectorWidth: 600,
  gap: 40,
  padding: 48,
} as const;

// Animation timing functions
export const EASINGS = {
  linear: (t: number) => t,
  easeIn: (t: number) => t * t,
  easeOut: (t: number) => 1 - (1 - t) * (1 - t),
  easeInOut: (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
  easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  easeOutExpo: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  spring: (t: number) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
} as const;

// Helper to interpolate between two values
export const interpolate = (start: number, end: number, progress: number): number => {
  return start + (end - start) * progress;
};

// Helper to clamp a value between min and max
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

// Helper to get progress within a frame range
export const getProgress = (frame: number, startFrame: number, endFrame: number): number => {
  if (frame < startFrame) return 0;
  if (frame > endFrame) return 1;
  return (frame - startFrame) / (endFrame - startFrame);
};

// Helper to check if frame is within range
export const isInRange = (frame: number, startFrame: number, endFrame: number): boolean => {
  return frame >= startFrame && frame <= endFrame;
};
