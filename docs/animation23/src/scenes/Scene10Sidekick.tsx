import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS, FONT, FONT_SIZE, SIDEKICK_BRIEFING, MEMORIES, FACTS } from "../constants";
import { SessionShell } from "../components/SessionShell";
import { SessionHeader } from "../components/SessionHeader";
import { TranscriptPane } from "../components/TranscriptPane";
import { UserBubble } from "../components/UserBubble";
import { AssistantBlock } from "../components/AssistantBlock";
import { InputBar } from "../components/InputBar";
import { SidekickPanel } from "../components/SidekickPanel";
import { CaptionLine } from "../components/CaptionLine";
import { fadeIn, staggerSlideUp } from "../helpers";

/**
 * Scene 10: Sidekick — new session starts informed.
 * Duration: 210 frames (7.0s)
 *
 * f0–60: New session starts. User prompt appears.
 * f61–120: Sidekick searches knowledge. Assembles briefing.
 * f121–175: Briefing injected. Agent starts informed.
 * f176–209: Hold warm-start payoff.
 */
export const Scene10Sidekick: React.FC = () => {
  const frame = useCurrentFrame();

  // ─── New session appearance ───────────────────────────────────────────
  const sessionOpacity = fadeIn(frame, 0, 20);
  const userBubbleOpacity = fadeIn(frame, 20, 15);

  // ─── Sidekick activation ──────────────────────────────────────────────
  const sidekickOpacity = fadeIn(frame, 55, 20);
  const sidekickActive = frame > 70;

  // ─── Knowledge search animation ───────────────────────────────────────
  const searchPulse = interpolate(
    frame,
    [65, 80, 95, 110],
    [0, 0.6, 0.8, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // ─── Briefing items ───────────────────────────────────────────────────
  const visibleBriefing = Math.min(
    SIDEKICK_BRIEFING.length,
    Math.floor(
      interpolate(frame, [80, 115], [0, SIDEKICK_BRIEFING.length], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
      })
    )
  );

  // ─── Briefing injection ───────────────────────────────────────────────
  const injectionOpacity = fadeIn(frame, 125, 15);
  const assistantStartOpacity = fadeIn(frame, 145, 15);

  // ─── Caption ──────────────────────────────────────────────────────────
  const captionOpacity = fadeIn(frame, 180, 15);

  return (
    <SessionShell opacity={sessionOpacity}>
      {/* Left: Fresh transcript */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 1,
        }}
      >
        <SessionHeader
          sessionName="NEW SESSION"
          status="active"
          modelInfo="claude-opus-4"
        />
        <TranscriptPane>
          {/* User prompt */}
          {frame >= 20 && (
            <UserBubble
              text="Continue the auth refactor and preserve the retry behavior."
              opacity={userBubbleOpacity}
            />
          )}

          {/* Injected context hint */}
          {frame >= 125 && (
            <div
              style={{
                opacity: injectionOpacity,
                padding: "8px 12px",
                background: `${COLORS.sidekickAccent}08`,
                border: `1px solid ${COLORS.sidekickAccent}22`,
                borderRadius: 6,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  color: COLORS.sidekickAccent,
                  fontFamily: FONT.mono,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                }}
              >
                Sidekick context loaded
              </span>
              <span
                style={{
                  fontSize: FONT_SIZE.xs,
                  color: COLORS.textMuted,
                  fontFamily: FONT.sans,
                }}
              >
                3 memories, 2 facts, 1 compartment restored
              </span>
            </div>
          )}

          {/* Agent starts informed */}
          {frame >= 145 && (
            <AssistantBlock
              text="I have context from the previous session. The auth refactor uses JWT with refresh tokens. The retry behavior is in the middleware layer. Let me continue from where we left off."
              opacity={assistantStartOpacity}
            />
          )}
        </TranscriptPane>
        <InputBar />
      </div>

      {/* Right: Sidekick panel + knowledge sources */}
      <div
        style={{
          width: "35%",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          zIndex: 1,
        }}
      >
        {/* Sidekick panel */}
        {frame >= 55 && (
          <SidekickPanel active={sidekickActive} opacity={sidekickOpacity}>
            {/* Searching animation */}
            {frame >= 65 && frame < 120 && (
              <div
                style={{
                  fontSize: FONT_SIZE.xs,
                  color: COLORS.textMuted,
                  fontFamily: FONT.mono,
                }}
              >
                Searching knowledge base...
              </div>
            )}

            {/* Briefing results */}
            {SIDEKICK_BRIEFING.slice(0, visibleBriefing).map((item, i) => {
              const anim = staggerSlideUp(
                Math.max(0, frame - 80),
                i,
                12,
                10,
                8
              );
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    opacity: anim.opacity,
                    transform: `translateY(${anim.translateY}px)`,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      color: COLORS.sidekickAccent,
                      fontFamily: FONT.mono,
                    }}
                  >
                    ✓
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <span
                      style={{
                        fontSize: FONT_SIZE.xs,
                        color: COLORS.textSecondary,
                        fontFamily: FONT.sans,
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontSize: 9,
                        color: COLORS.textDim,
                        fontFamily: FONT.mono,
                      }}
                    >
                      from {item.source}
                    </span>
                  </div>
                </div>
              );
            })}
          </SidekickPanel>
        )}

        {/* Knowledge source indicators */}
        {frame >= 65 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              padding: "0 4px",
              opacity: fadeIn(frame, 65, 15),
            }}
          >
            {[
              { label: "Memory", color: COLORS.memoryAccent, glow: frame >= 70 && frame < 90 },
              { label: "Session Facts", color: COLORS.factAccent, glow: frame >= 80 && frame < 100 },
              { label: "Compartments", color: COLORS.compartmentAccent, glow: frame >= 90 && frame < 110 },
            ].map((source, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 8px",
                  borderRadius: 4,
                  background: source.glow ? `${source.color}11` : undefined,
                  border: source.glow
                    ? `1px solid ${source.color}33`
                    : `1px solid transparent`,
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: source.color,
                    boxShadow: source.glow
                      ? `0 0 6px ${source.color}`
                      : undefined,
                  }}
                />
                <span
                  style={{
                    fontSize: 10,
                    color: source.glow ? source.color : COLORS.textDim,
                    fontFamily: FONT.mono,
                  }}
                >
                  {source.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Caption */}
      {frame >= 180 && (
        <CaptionLine
          text="Sidekick helps new sessions start with the right context already in place."
          opacity={captionOpacity}
        />
      )}
    </SessionShell>
  );
};
