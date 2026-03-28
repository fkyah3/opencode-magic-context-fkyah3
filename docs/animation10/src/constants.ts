import {Easing, interpolate, spring} from 'remotion';

export const WIDTH = 1280;
export const HEIGHT = 720;
export const FPS = 30;
export const TOTAL_FRAMES = 2730;

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

export const SCENE_1_DURATION = 210;
export const SCENE_2_DURATION = 120;
export const SCENE_3_DURATION = 270;
export const SCENE_4_DURATION = 360;
export const SCENE_5_DURATION = 390;
export const SCENE_6_DURATION = 210;
export const SCENE_7_DURATION = 270;
export const SCENE_8_DURATION = 270;
export const SCENE_9_DURATION = 270;
export const SCENE_10_DURATION = 210;
export const SCENE_11_DURATION = 150;

export const SCENE_STARTS = [
  SCENE_1_START,
  SCENE_2_START,
  SCENE_3_START,
  SCENE_4_START,
  SCENE_5_START,
  SCENE_6_START,
  SCENE_7_START,
  SCENE_8_START,
  SCENE_9_START,
  SCENE_10_START,
  SCENE_11_START,
] as const;

export const FONT_FAMILY =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Helvetica, Arial, sans-serif';
export const FONT_MONO =
  '"SF Mono", "JetBrains Mono", "Fira Code", Menlo, Monaco, monospace';

export const COLORS = {
  bg: '#060912',
  bg2: '#0b1220',
  surface: 'rgba(12, 17, 29, 0.78)',
  surfaceSoft: 'rgba(13, 20, 34, 0.56)',
  surfaceElevated: 'rgba(17, 25, 40, 0.92)',
  line: 'rgba(255,255,255,0.08)',
  lineStrong: 'rgba(255,255,255,0.16)',
  text: '#f5f8ff',
  textDim: 'rgba(228, 236, 255, 0.72)',
  textMuted: 'rgba(174, 186, 215, 0.48)',
  old: '#ff9a52',
  oldSoft: 'rgba(255, 154, 82, 0.18)',
  oldHot: '#ff6d4d',
  magic: '#62d9ff',
  magicSoft: 'rgba(98, 217, 255, 0.18)',
  teal: '#59f3c3',
  tealSoft: 'rgba(89, 243, 195, 0.18)',
  violet: '#7d8cff',
  violetSoft: 'rgba(125, 140, 255, 0.18)',
  dreamer: '#8ea6ff',
  mint: '#89ffd4',
  success: '#6dffb4',
  warning: '#ffb86a',
  danger: '#ff6f74',
  shadow: 'rgba(0,0,0,0.45)',
} as const;

export type RailRole = 'user' | 'assistant' | 'tool' | 'system';

export type RailCardData = {
  id: string;
  text: string;
  role: RailRole;
  width: number;
};

export const RAIL_MESSAGES: RailCardData[] = [
  {id: '#001', text: 'Investigated stale token path', role: 'assistant', width: 168},
  {id: '#012', text: 'Cache mismatch observed', role: 'tool', width: 160},
  {id: '#020', text: 'Retry branch preserved', role: 'assistant', width: 158},
  {id: '#036', text: 'Integration fixture updated', role: 'tool', width: 176},
  {id: '#041', text: 'Observed auth timeout edge case', role: 'assistant', width: 194},
  {id: '#052', text: 'Session refresh path traced', role: 'tool', width: 178},
  {id: '#067', text: 'Refined error boundary response', role: 'assistant', width: 198},
  {id: '#084', text: 'Focused suite passed locally', role: 'tool', width: 182},
  {id: '#102', text: 'Prepared clean patch set', role: 'assistant', width: 172},
] as const;

export const TAIL_MESSAGES = [
  'Patch applied',
  'Re-running tests',
  'Inspecting timeout behavior',
  'Fixed token refresh path',
  'Updated integration fixtures',
  'Tests passing 18/18',
  'Finalizing clean diff',
] as const;

export const OLD_WAY_STATUSES = [
  'Searching auth.ts',
  'Tracing cache path',
  'Updating tests',
  'Running build',
  'Inspecting retry logic',
  'Following stale token branch',
] as const;

export const MAGIC_MAIN_STATUSES = [
  'Reading project files',
  'Fixing auth edge case',
  'Updating integration tests',
  'Running focused test set',
  'Patch applied',
  'Re-running tests',
  'Inspecting timeout behavior',
  'Finalizing patch',
  'Creating clean diff',
] as const;

export const HEALTHY_STATUSES = [
  'Finalizing patch',
  'Running full suite',
  'Creating clean diff',
  'Preparing handoff summary',
] as const;

export const HISTORIAN_STATUSES = [
  'Monitoring context pressure',
  'Preparing background compaction',
  'Compartmentalizing history',
  'Extracting durable facts',
  'Promoting stable memory',
  'Pass complete — context restored',
] as const;

export const COMPARTMENTS = [
  'Compartment A — Auth debugging',
  'Compartment B — Cache decision trail',
  'Compartment C — Test repair session',
] as const;

export const FACTS = [
  'Uses Redis for cache',
  'Retry behavior must remain',
  'Auth bug caused by stale token branch',
  'Integration tests updated',
  'Preserve timeout backoff',
] as const;

export const MEMORIES = [
  'Project constraint: preserve retry semantics',
  'Architecture decision: Redis-backed session cache',
  'Naming pattern: auth / session / token split',
  'Preference: keep integration tests explicit',
] as const;

export const DREAMER_TASKS = [
  'Consolidating memory',
  'Verifying retained facts',
  'Archiving stale knowledge',
  'Improving summaries',
] as const;

export const SIDEKICK_SOURCES = [
  'Relevant memory found',
  'Constraint restored',
  'Previous decisions loaded',
  'Continuity briefing assembled',
] as const;

export const CODE_LINES = [
  'const session = await loadSession(userId);',
  'if (cacheHit && !isExpired(session)) return session;',
  'const refreshed = await refreshToken(session.token);',
  'const nextRetry = preserveRetryWindow(state, refreshed);',
  'await writeAuditEvent("auth.refresh", refreshed.id);',
  'return buildResponse(refreshed, nextRetry);',
] as const;

export const TERMINAL_LINES = [
  '> pnpm test auth/session.spec.ts',
  'PASS auth/session.spec.ts',
  'PASS auth/refresh.spec.ts',
  'build: optimized 14 modules',
  'diff: 6 files changed',
] as const;

export const clamp = (value: number) => Math.max(0, Math.min(1, value));

export const progress = (
  frame: number,
  start: number,
  end: number,
  easing = Easing.inOut(Easing.cubic),
) => {
  if (end <= start) {
    return frame >= end ? 1 : 0;
  }

  return interpolate(frame, [start, end], [0, 1], {
    easing,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

export const springProgress = (
  frame: number,
  start: number,
  durationInFrames = 28,
  config: {damping?: number; stiffness?: number; mass?: number} = {damping: 200},
) => {
  return clamp(
    spring({
      frame: frame - start,
      fps: FPS,
      durationInFrames,
      config,
    }),
  );
};

export const ping = (frame: number, speed = 22, offset = 0) => {
  return 0.5 + 0.5 * Math.sin((frame + offset) / speed);
};

export const cycle = <T,>(items: readonly T[], frame: number, every: number) => {
  return items[Math.floor(frame / every) % items.length];
};
