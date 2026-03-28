// Frame-accurate timeline at 30 fps
// Total runtime: 91 seconds = 2730 frames

export const FPS = 30;
export const TOTAL_FRAMES = 2730;

// Scene boundaries
export const SCENE_1_START = 0;      // Old way: full-screen pain
export const SCENE_1_END = 209;      // 210 frames / 7.0s

export const SCENE_2_START = 210;    // Split comparison bridge
export const SCENE_2_END = 329;      // 120 frames / 4.0s

export const SCENE_3_START = 330;    // Historian activation
export const SCENE_3_END = 599;      // 270 frames / 9.0s

export const SCENE_4_START = 600;    // Head-to-tail simultaneous motion
export const SCENE_4_END = 959;      // 360 frames / 12.0s

export const SCENE_5_START = 960;    // Historian outputs
export const SCENE_5_END = 1349;     // 390 frames / 13.0s

export const SCENE_6_START = 1350;   // Healthy-context payoff
export const SCENE_6_END = 1559;     // 210 frames / 7.0s

export const SCENE_7_START = 1560;   // Long-session compression
export const SCENE_7_END = 1829;     // 270 frames / 9.0s

export const SCENE_8_START = 1830;   // Cache awareness
export const SCENE_8_END = 2099;     // 270 frames / 9.0s

export const SCENE_9_START = 2100;   // Dreamer
export const SCENE_9_END = 2369;     // 270 frames / 9.0s

export const SCENE_10_START = 2370;  // Sidekick
export const SCENE_10_END = 2579;    // 210 frames / 7.0s

export const SCENE_11_START = 2580;  // Final payoff
export const SCENE_11_END = 2729;    // 150 frames / 5.0s

// Design System - Colors
export const COLORS = {
  // Base
  bg: '#0a0a0f',
  bgElevated: '#12121a',
  bgCard: '#1a1a25',
  bgPanel: '#151520',
  
  // Accents
  oldWay: {
    primary: '#f59e0b',    // amber
    secondary: '#ea580c',  // orange
    glow: 'rgba(245, 158, 11, 0.3)',
  },
  
  magicContext: {
    primary: '#06b6d4',    // cyan
    secondary: '#0ea5e9',  // blue
    glow: 'rgba(6, 182, 212, 0.3)',
  },
  
  historian: {
    primary: '#8b5cf6',    // violet
    secondary: '#6366f1',  // indigo
    glow: 'rgba(139, 92, 246, 0.3)',
  },
  
  dreamer: {
    primary: '#6366f1',    // indigo
    secondary: '#4f46e5',  // deep indigo
    glow: 'rgba(99, 102, 241, 0.3)',
  },
  
  sidekick: {
    primary: '#14b8a6',    // teal
    secondary: '#2dd4bf',  // mint
    glow: 'rgba(20, 184, 166, 0.3)',
  },
  
  // Semantic
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  
  // Text
  textPrimary: '#f8fafc',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  
  // Borders
  border: '#27273a',
  borderHighlight: '#3f3f5a',
};

// Typography
export const TYPOGRAPHY = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  sizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

// Layout
export const LAYOUT = {
  width: 1920,
  height: 1080,
  margin: 40,
  gap: 24,
  borderRadius: 12,
  borderRadiusSm: 8,
  borderRadiusLg: 16,
};

// Animation
export const EASINGS = {
  smooth: [0.4, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  snappy: [0.25, 0.46, 0.45, 0.94],
  gentle: [0.4, 0, 0.6, 1],
};

// Helper functions
export const interpolate = (
  frame: number,
  startFrame: number,
  endFrame: number,
  startValue: number,
  endValue: number,
  easing: number[] = EASINGS.smooth
): number => {
  if (frame < startFrame) return startValue;
  if (frame > endFrame) return endValue;
  
  const progress = (frame - startFrame) / (endFrame - startFrame);
  const eased = applyEasing(progress, easing);
  return startValue + (endValue - startValue) * eased;
};

const applyEasing = (t: number, easing: number[]): number => {
  const [x1, y1, x2, y2] = easing;
  // Cubic bezier easing
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  
  const sampleCurveX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleCurveY = (t: number) => ((ay * t + by) * t + cy) * t;
  
  // Newton-Raphson iteration
  let x = t;
  for (let i = 0; i < 8; i++) {
    const x2 = sampleCurveX(x) - t;
    if (Math.abs(x2) < 0.001) return sampleCurveY(x);
    const d2 = (3 * ax * x + 2 * bx) * x + cx;
    if (Math.abs(d2) < 0.001) break;
    x = x - x2 / d2;
  }
  
  return sampleCurveY(x);
};

export const clamp = (value: number, min: number, max: number): number => 
  Math.max(min, Math.min(max, value));

export const lerp = (a: number, b: number, t: number): number => 
  a + (b - a) * t;
