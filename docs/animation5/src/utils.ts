import { interpolate, Easing } from "remotion";

// ─── Clamped interpolation shortcuts ─────────────────────────────────────────

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

/** Fade in over `dur` frames starting at `start` */
export function fadeIn(frame: number, start: number, dur: number): number {
  return interpolate(frame, [start, start + dur], [0, 1], CLAMP);
}

/** Fade out over `dur` frames starting at `start` */
export function fadeOut(frame: number, start: number, dur: number): number {
  return interpolate(frame, [start, start + dur], [1, 0], CLAMP);
}

/** Opacity: fade in then hold then fade out */
export function fadeInOut(
  frame: number,
  inStart: number,
  inDur: number,
  outStart: number,
  outDur: number,
): number {
  const inVal = fadeIn(frame, inStart, inDur);
  const outVal = fadeOut(frame, outStart, outDur);
  return Math.min(inVal, outVal);
}

/** Smooth eased interpolation */
export function eased(
  frame: number,
  inputRange: [number, number],
  outputRange: [number, number],
): number {
  return interpolate(frame, inputRange, outputRange, {
    ...CLAMP,
    easing: Easing.inOut(Easing.quad),
  });
}

/** Ease-out interpolation */
export function easeOut(
  frame: number,
  inputRange: [number, number],
  outputRange: [number, number],
): number {
  return interpolate(frame, inputRange, outputRange, {
    ...CLAMP,
    easing: Easing.out(Easing.quad),
  });
}

/** Ease-in interpolation */
export function easeIn(
  frame: number,
  inputRange: [number, number],
  outputRange: [number, number],
): number {
  return interpolate(frame, inputRange, outputRange, {
    ...CLAMP,
    easing: Easing.in(Easing.quad),
  });
}

/** Linear clamped interpolation */
export function lerp(
  frame: number,
  inputRange: [number, number],
  outputRange: [number, number],
): number {
  return interpolate(frame, inputRange, outputRange, CLAMP);
}

// ─── Text cycling ────────────────────────────────────────────────────────────

/** Cycle through texts at a given interval (in frames) */
export function cycleText(
  texts: readonly string[],
  frame: number,
  interval: number,
): string {
  const index = Math.floor(frame / interval) % texts.length;
  return texts[index];
}

/** Get text index for cycling */
export function cycleIndex(
  count: number,
  frame: number,
  interval: number,
): number {
  return Math.floor(frame / interval) % count;
}

// ─── Progress helpers ────────────────────────────────────────────────────────

/** Map frame to 0-1 progress within a range */
export function progress(
  frame: number,
  start: number,
  end: number,
): number {
  return interpolate(frame, [start, end], [0, 1], CLAMP);
}

/** Step function: 0 before threshold, 1 at or after */
export function step(frame: number, threshold: number): number {
  return frame >= threshold ? 1 : 0;
}

/** Staggered entrance: returns 0-1 for item at `index` given stagger delay */
export function stagger(
  frame: number,
  start: number,
  index: number,
  staggerDelay: number,
  animDuration: number,
): number {
  const itemStart = start + index * staggerDelay;
  return easeOut(frame, [itemStart, itemStart + animDuration], [0, 1]);
}

// ─── Color utilities ─────────────────────────────────────────────────────────

/** Interpolate between two hex colors */
export function lerpColor(
  color1: string,
  color2: string,
  t: number,
): string {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  if (!c1 || !c2) return color1;
  const r = Math.round(c1.r + (c2.r - c1.r) * t);
  const g = Math.round(c1.g + (c2.g - c1.g) * t);
  const b = Math.round(c1.b + (c2.b - c1.b) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// ─── Style helpers ───────────────────────────────────────────────────────────

/** Glow box-shadow for accent colors */
export function glow(color: string, radius = 20, spread = 0): string {
  return `0 0 ${radius}px ${spread}px ${color}`;
}

/** Panel box-shadow (subtle depth) */
export function panelShadow(opacity = 0.3): string {
  return `0 4px 24px rgba(0, 0, 0, ${opacity})`;
}

/** Context meter color based on percentage */
export function meterColor(pct: number): string {
  if (pct < 70) return "#22C55E";
  if (pct < 90) return "#F59E0B";
  return "#EF4444";
}
