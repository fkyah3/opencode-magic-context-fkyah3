import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";
import { COLORS, FONT, FONT_SIZE, DREAMER_TASKS, FACTS, MEMORIES } from "../constants";
import { DreamerPanel } from "../components/DreamerPanel";
import { FactChip } from "../components/FactChip";
import { MemoryCard } from "../components/MemoryCard";
import { CaptionLine } from "../components/CaptionLine";
import { fadeIn, fadeOut, staggerSlideUp } from "../helpers";

/**
 * Scene 9: Dreamer — off-session overnight maintenance.
 * Duration: 270 frames (9.0s)
 *
 * f0–60: Transition to dormant mode. Indigo palette.
 * f61–145: Dreamer activates. Maintenance tasks.
 * f146–225: Effects: merge, archive, clean.
 * f226–269: Hold clean state.
 */
export const Scene9Dreamer: React.FC = () => {
  const frame = useCurrentFrame();

  // ─── Night mode transition ────────────────────────────────────────────
  const nightOverlay = interpolate(frame, [0, 50], [0, 0.3], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // ─── Dormant transcript fade ──────────────────────────────────────────
  const transcriptDim = interpolate(frame, [0, 40], [0.6, 0.15], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // ─── Dreamer panel ────────────────────────────────────────────────────
  const dreamerOpacity = fadeIn(frame, 40, 25);
  const dreamerActive = frame > 61;

  // ─── Maintenance task animations ──────────────────────────────────────
  const visibleTasks = Math.min(
    DREAMER_TASKS.length,
    Math.floor(
      interpolate(frame, [65, 130], [0, DREAMER_TASKS.length], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
      })
    )
  );

  // ─── Knowledge artifact animations ────────────────────────────────────
  // Facts: some stale, some merge
  const factStaleIndex = frame > 160 ? 2 : -1; // Third fact becomes stale
  const factMergeOpacity =
    frame > 180
      ? interpolate(frame, [180, 210], [1, 0], {
          extrapolateRight: "clamp",
          extrapolateLeft: "clamp",
        })
      : 1;

  // Memory: entries get cleaner (visual refresh)
  const memoryRefreshPulse = interpolate(
    frame,
    [170, 190, 210],
    [0, 0.5, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // ─── Caption ──────────────────────────────────────────────────────────
  const captionOpacity = fadeIn(frame, 240, 20);

  return (
    <AbsoluteFill
      style={{
        background: COLORS.dreamerBg,
        fontFamily: FONT.sans,
        padding: 40,
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {/* Night overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 30%, ${COLORS.dreamerAccent}08 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, transparent 0%, ${COLORS.bg}${Math.round(nightOverlay * 80)
            .toString(16)
            .padStart(2, "0")} 100%)`,
          pointerEvents: "none",
        }}
      />

      {/* Dormant session hint */}
      <div
        style={{
          opacity: transcriptDim,
          padding: "12px 16px",
          background: COLORS.panelBg,
          borderRadius: 8,
          border: `1px solid ${COLORS.panelBorder}`,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: COLORS.textDim,
          }}
        />
        <span
          style={{
            fontSize: FONT_SIZE.xs,
            color: COLORS.textDim,
            fontFamily: FONT.mono,
          }}
        >
          Session ATHENA — dormant
        </span>
      </div>

      {/* Main content: Dreamer + knowledge artifacts */}
      <div
        style={{
          display: "flex",
          gap: 24,
          flex: 1,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left: Dreamer panel */}
        <div style={{ width: "40%", opacity: dreamerOpacity }}>
          <DreamerPanel active={dreamerActive}>
            {/* Maintenance task list */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {DREAMER_TASKS.slice(0, visibleTasks).map((task, i) => {
                const anim = staggerSlideUp(
                  Math.max(0, frame - 65),
                  i,
                  15,
                  12,
                  10
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
                    <span style={{ fontSize: 12 }}>{task.icon}</span>
                    <span
                      style={{
                        fontSize: FONT_SIZE.xs,
                        color: COLORS.textSecondary,
                        fontFamily: FONT.sans,
                      }}
                    >
                      {task.label}
                    </span>
                    {frame > 120 + i * 20 && (
                      <span
                        style={{
                          fontSize: 10,
                          color: COLORS.successGreen,
                          fontFamily: FONT.mono,
                          opacity: fadeIn(frame, 120 + i * 20, 15),
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </DreamerPanel>
        </div>

        {/* Right: Knowledge artifacts */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Facts */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span
              style={{
                fontSize: FONT_SIZE.xs,
                fontWeight: 600,
                color: COLORS.factAccent,
                textTransform: "uppercase",
                letterSpacing: 1,
                fontFamily: FONT.mono,
                opacity: fadeIn(frame, 30, 15),
              }}
            >
              Session Facts
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {FACTS.map((f, i) => (
                <FactChip
                  key={f.id}
                  text={f.text}
                  stale={i === factStaleIndex}
                  opacity={
                    i === factStaleIndex && frame > 190
                      ? factMergeOpacity
                      : fadeIn(frame, 30, 15)
                  }
                />
              ))}
            </div>
          </div>

          {/* Memory */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span
              style={{
                fontSize: FONT_SIZE.xs,
                fontWeight: 600,
                color: COLORS.memoryAccent,
                textTransform: "uppercase",
                letterSpacing: 1,
                fontFamily: FONT.mono,
                opacity: fadeIn(frame, 30, 15),
              }}
            >
              Memory
            </span>
            {MEMORIES.map((m) => (
              <div
                key={m.id}
                style={{
                  boxShadow:
                    memoryRefreshPulse > 0
                      ? `0 0 ${memoryRefreshPulse * 12}px ${COLORS.dreamerAccent}33`
                      : undefined,
                  borderRadius: 6,
                }}
              >
                <MemoryCard
                  category={m.category}
                  text={m.text}
                  opacity={fadeIn(frame, 30, 15)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Caption */}
      {frame >= 240 && (
        <CaptionLine
          text="Dreamer keeps the knowledge layer healthy between active sessions."
          opacity={captionOpacity}
        />
      )}
    </AbsoluteFill>
  );
};
