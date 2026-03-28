import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { spring } from "remotion";
import { GridBackground } from "../components/GridBackground";
import { AgentCard } from "../components/AgentCard";
import { SidekickPanel } from "../components/SidekickPanel";
import { StatusChip } from "../components/StatusChip";
import { CaptionLine } from "../components/CaptionLine";
import { C, FONT, LAYOUT, SIDEKICK_ITEMS } from "../constants";
import { eased, lerp, fadeIn, stagger } from "../utils";

/**
 * Scene 10 — Sidekick
 * Frames 0–209 (210 frames / 7.0s)
 *
 * Beat breakdown:
 *   0–60:    New session starts, prompt appears
 *   61–120:  Sidekick activates, pulls from memory
 *   121–175: Briefing passed to main agent
 *   176–209: Warm-start payoff
 */
export const Scene10Sidekick: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Prompt entrance ──
  const promptOpacity = fadeIn(frame, 5, 15);
  const promptY = eased(frame, [5, 20], [10, 0]);

  // ── Sidekick panel ──
  const sidekickEntrance = spring({
    frame: frame - 50,
    fps,
    config: { damping: 200 },
  });
  const showSidekick = frame >= 50;
  const sidekickItems =
    frame < 80
      ? 0
      : frame < 100
        ? 1
        : frame < 115
          ? 2
          : 3;

  // ── Briefing pass ──
  const briefingOpacity =
    frame >= 130 ? fadeIn(frame, 130, 12) : 0;

  // ── Agent activation ──
  const agentActive = frame >= 135;
  const agentStatus =
    frame < 135
      ? "Waiting for context..."
      : frame < 155
        ? "Loaded prior constraints"
        : frame < 175
          ? "Continuing from previous context"
          : "Applying known architecture decisions";

  // ── Warm-start status chips ──
  const chipTexts = [
    "Retry semantics restored",
    "Cache architecture loaded",
    "Prior decisions active",
  ];
  const showChips = frame >= 165;

  // ── Caption ──
  const captionOpacity = fadeIn(frame, 180, 12);
  const captionY = eased(frame, [180, 192], [12, 0]);

  return (
    <AbsoluteFill>
      <GridBackground variant="fresh" />

      <div
        style={{
          position: "absolute",
          inset: LAYOUT.padding,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* Header */}
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 22,
            fontWeight: 700,
            color: C.textPrimary,
            letterSpacing: "-0.02em",
          }}
        >
          New Session
        </div>

        {/* User prompt */}
        <div
          style={{
            opacity: promptOpacity,
            transform: `translateY(${promptY}px)`,
          }}
        >
          <div
            style={{
              padding: "16px 24px",
              borderRadius: LAYOUT.cardRadius,
              background: C.bgCard,
              border: `1px solid ${C.border}`,
              fontFamily: FONT.mono,
              fontSize: 15,
              color: C.textPrimary,
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: C.textMuted, marginRight: 8 }}>›</span>
            Continue the auth refactor and preserve the retry behavior.
          </div>
        </div>

        {/* Main content: Sidekick + Agent */}
        <div
          style={{
            flex: 1,
            display: "flex",
            gap: 32,
            alignItems: "flex-start",
          }}
        >
          {/* Left: Sidekick */}
          {showSidekick && (
            <div
              style={{
                opacity: sidekickEntrance,
                transform: `translateY(${(1 - sidekickEntrance) * 16}px)`,
              }}
            >
              <SidekickPanel
                items={SIDEKICK_ITEMS}
                visibleCount={sidekickItems}
                pulseFrame={frame}
              />
            </div>
          )}

          {/* Right: Agent + briefing */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <AgentCard
              title="Main Agent"
              status={agentStatus}
              active={agentActive}
              variant={agentActive ? "main" : "old"}
              pulseFrame={frame}
              width={380}
              height={140}
            />

            {/* Briefing card */}
            {briefingOpacity > 0 && (
              <div
                style={{
                  padding: "14px 20px",
                  borderRadius: LAYOUT.chipRadius,
                  background: C.sideGlow,
                  border: `1px solid ${C.sideBorder}`,
                  fontFamily: FONT.mono,
                  fontSize: 13,
                  color: C.sideLight,
                  opacity: briefingOpacity,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span>→</span>
                Sidekick briefing loaded into context
              </div>
            )}

            {/* Warm-start chips */}
            {showChips && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                {chipTexts.map((text, i) => (
                  <div
                    key={text}
                    style={{
                      opacity: stagger(frame, 165, i, 10, 10),
                      transform: `translateX(${
                        (1 - stagger(frame, 165, i, 10, 10)) * 15
                      }px)`,
                    }}
                  >
                    <StatusChip text={text} variant="success" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Caption */}
      <CaptionLine
        text="Sidekick helps new sessions start with the right context already in place."
        opacity={captionOpacity}
        y={captionY}
      />
    </AbsoluteFill>
  );
};
