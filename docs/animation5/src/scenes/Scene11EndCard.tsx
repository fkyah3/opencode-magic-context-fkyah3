import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { spring } from "remotion";
import { GridBackground } from "../components/GridBackground";
import { C, FONT, LAYOUT } from "../constants";
import { eased, fadeIn } from "../utils";

/**
 * Scene 11 — Final payoff / end card
 * Frames 0–149 (150 frames / 5.0s)
 *
 * Beat breakdown:
 *   0–60:    Assemble final polished system view
 *   61–149:  Final text resolves, product wordmark
 */
export const Scene11EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── System icons entrance ──
  const iconsOpacity = fadeIn(frame, 5, 20);
  const iconsScale = spring({
    frame: frame - 5,
    fps,
    config: { damping: 200 },
  });

  // ── Text entrance ──
  const line1Opacity = fadeIn(frame, 40, 15);
  const line1Y = eased(frame, [40, 55], [20, 0]);

  const line2Opacity = fadeIn(frame, 60, 15);
  const line2Y = eased(frame, [60, 75], [20, 0]);

  const line3Opacity = fadeIn(frame, 80, 15);
  const line3Y = eased(frame, [80, 95], [20, 0]);

  // ── Product wordmark ──
  const wordmarkOpacity = fadeIn(frame, 100, 20);
  const wordmarkY = eased(frame, [100, 120], [12, 0]);

  // ── Ambient glow ──
  const glowPulse = 0.3 + Math.sin(frame * 0.04) * 0.1;

  // ── System feature dots ──
  const features = [
    { label: "Main Agent", color: C.mcCyan },
    { label: "Historian", color: C.histViolet },
    { label: "Memory", color: C.memBlue },
    { label: "Dreamer", color: C.dreamMoon },
    { label: "Sidekick", color: C.sideLight },
  ];

  return (
    <AbsoluteFill>
      <GridBackground />

      {/* Central glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.mcGlow}, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          opacity: glowPulse,
          filter: "blur(60px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
        }}
      >
        {/* System feature dots */}
        <div
          style={{
            display: "flex",
            gap: 24,
            opacity: iconsOpacity,
            transform: `scale(${iconsScale})`,
          }}
        >
          {features.map((feat, i) => (
            <div
              key={feat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: feat.color,
                  boxShadow: `0 0 12px ${feat.color}`,
                  opacity: 0.8 + Math.sin((frame + i * 10) * 0.06) * 0.2,
                }}
              />
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 11,
                  color: C.textMuted,
                  letterSpacing: "0.02em",
                }}
              >
                {feat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Taglines */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              fontFamily: FONT.sans,
              fontSize: 28,
              fontWeight: 700,
              color: C.textPrimary,
              letterSpacing: "-0.03em",
              opacity: line1Opacity,
              transform: `translateY(${line1Y}px)`,
            }}
          >
            Background compaction.
          </div>
          <div
            style={{
              fontFamily: FONT.sans,
              fontSize: 28,
              fontWeight: 700,
              color: C.textPrimary,
              letterSpacing: "-0.03em",
              opacity: line2Opacity,
              transform: `translateY(${line2Y}px)`,
            }}
          >
            Structured memory.
          </div>
          <div
            style={{
              fontFamily: FONT.sans,
              fontSize: 28,
              fontWeight: 700,
              color: C.textPrimary,
              letterSpacing: "-0.03em",
              opacity: line3Opacity,
              transform: `translateY(${line3Y}px)`,
            }}
          >
            Better continuity for coding agents.
          </div>
        </div>

        {/* Product wordmark */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            opacity: wordmarkOpacity,
            transform: `translateY(${wordmarkY}px)`,
            marginTop: 16,
          }}
        >
          <div
            style={{
              fontFamily: FONT.sans,
              fontSize: 36,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              background: `linear-gradient(135deg, ${C.mcCyan}, ${C.mcBlue}, ${C.histViolet})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            OpenCode Magic Context
          </div>
          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 14,
              color: C.textMuted,
              letterSpacing: "0.04em",
            }}
          >
            Async history compaction and memory for uninterrupted agents
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
