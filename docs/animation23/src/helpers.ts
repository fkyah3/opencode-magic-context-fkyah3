import { interpolate, Easing } from "remotion";

/** Clamp a value between min and max */
export const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

/** Standard fade-in over a frame range */
export const fadeIn = (
  frame: number,
  start: number,
  duration: number
): number =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

/** Standard fade-out over a frame range */
export const fadeOut = (
  frame: number,
  start: number,
  duration: number
): number =>
  interpolate(frame, [start, start + duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.quad),
  });

/** Slide-up entrance: returns translateY value (starts at offset, ends at 0) */
export const slideUp = (
  frame: number,
  start: number,
  duration: number,
  offset = 20
): number =>
  interpolate(frame, [start, start + duration], [offset, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

/** Smooth interpolation with easing between two values */
export const ease = (
  frame: number,
  inputRange: [number, number],
  outputRange: [number, number]
): number =>
  interpolate(frame, inputRange, outputRange, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

/** Linear interpolation clamped */
export const linear = (
  frame: number,
  inputRange: [number, number],
  outputRange: [number, number]
): number =>
  interpolate(frame, inputRange, outputRange, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/** Pulse glow effect: 0→1→0 over duration */
export const pulse = (frame: number, period: number): number => {
  const t = (frame % period) / period;
  return Math.sin(t * Math.PI);
};

/** Staggered entrance: returns opacity for item at index */
export const stagger = (
  frame: number,
  index: number,
  staggerDelay: number,
  fadeFrames: number
): number => {
  const start = index * staggerDelay;
  return fadeIn(frame, start, fadeFrames);
};

/** Staggered slide-up: returns { opacity, translateY } */
export const staggerSlideUp = (
  frame: number,
  index: number,
  staggerDelay: number,
  fadeFrames: number,
  offset = 16
): { opacity: number; translateY: number } => ({
  opacity: stagger(frame, index, staggerDelay, fadeFrames),
  translateY: slideUp(frame, index * staggerDelay, fadeFrames, offset),
});

/** Get usage color based on percentage */
export const getUsageColor = (percent: number): string => {
  if (percent < 60) return "#22c55e";
  if (percent < 80) return "#f59e0b";
  if (percent < 95) return "#f97316";
  return "#ef4444";
};

/** Format token count for display (e.g., 12400 → "12.4k") */
export const formatTokens = (n: number): string => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return `${n}`;
};
