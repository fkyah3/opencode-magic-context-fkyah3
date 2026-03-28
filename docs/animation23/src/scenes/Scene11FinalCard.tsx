import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";
import { COLORS, FONT, FONT_SIZE } from "../constants";
import { fadeIn } from "../helpers";

/**
 * Scene 11: Final payoff / end card.
 * Duration: 150 frames (5.0s)
 *
 * f0–60: Assemble system tableau.
 * f61–149: Final text resolves. Product wordmark.
 */
export const Scene11FinalCard: React.FC = () => {
  const frame = useCurrentFrame();

  // ─── Background fade in ───────────────────────────────────────────────
  const bgOpacity = fadeIn(frame, 0, 30);

  // ─── System components fade in ────────────────────────────────────────
  const componentsOpacity = fadeIn(frame, 10, 25);

  // ─── Text animations ─────────────────────────────────────────────────
  const line1Opacity = fadeIn(frame, 50, 20);
  const line1Y = interpolate(frame, [50, 70], [15, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const line2Opacity = fadeIn(frame, 70, 20);
  const line2Y = interpolate(frame, [70, 90], [15, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const wordmarkOpacity = fadeIn(frame, 95, 25);
  const wordmarkY = interpolate(frame, [95, 120], [10, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.quad),
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        fontFamily: FONT.sans,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        opacity: bgOpacity,
      }}
    >
      {/* Subtle background radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 40%, ${COLORS.magicCyan}06 0%, transparent 50%)`,
          pointerEvents: "none",
        }}
      />

      {/* System component indicators (subtle, decorative) */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          display: "flex",
          gap: 40,
          opacity: componentsOpacity * 0.5,
        }}
      >
        {[
          { label: "Session", color: COLORS.textMuted, icon: "◉" },
          { label: "Historian", color: COLORS.historianLight, icon: "⟐" },
          { label: "Memory", color: COLORS.memoryAccent, icon: "◆" },
          { label: "Dreamer", color: COLORS.dreamerAccent, icon: "☾" },
          { label: "Sidekick", color: COLORS.sidekickAccent, icon: "⟡" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              opacity: fadeIn(frame, 15 + i * 8, 15),
            }}
          >
            <span style={{ fontSize: 18, color: item.color }}>
              {item.icon}
            </span>
            <span
              style={{
                fontSize: 9,
                color: item.color,
                fontFamily: FONT.mono,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Main text */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            fontSize: FONT_SIZE.xl,
            fontWeight: 500,
            color: COLORS.textPrimary,
            textAlign: "center",
          }}
        >
          Keep the main agent in flow.
        </div>
        <div
          style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            fontSize: FONT_SIZE.xl,
            fontWeight: 500,
            color: COLORS.textSecondary,
            textAlign: "center",
          }}
        >
          Let Magic Context handle the past.
        </div>
      </div>

      {/* Product wordmark */}
      <div
        style={{
          opacity: wordmarkOpacity,
          transform: `translateY(${wordmarkY}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            height: 1,
            width: 60,
            background: `linear-gradient(90deg, transparent, ${COLORS.panelBorder}, transparent)`,
            marginBottom: 8,
          }}
        />
        <span
          style={{
            fontSize: FONT_SIZE.lg,
            fontWeight: 600,
            color: COLORS.magicCyan,
            fontFamily: FONT.mono,
            letterSpacing: 1.5,
          }}
        >
          opencode-magic-context
        </span>
        <span
          style={{
            fontSize: FONT_SIZE.xs,
            color: COLORS.textDim,
            fontFamily: FONT.sans,
          }}
        >
          Async history compaction and memory for uninterrupted agents.
        </span>
      </div>
    </AbsoluteFill>
  );
};
