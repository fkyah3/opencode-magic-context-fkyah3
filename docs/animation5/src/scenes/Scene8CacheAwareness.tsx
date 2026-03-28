import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { spring } from "remotion";
import { GridBackground } from "../components/GridBackground";
import { QueueBadge } from "../components/QueueBadge";
import { CaptionLine } from "../components/CaptionLine";
import { C, FONT, LAYOUT, QUEUED_REDUCTIONS } from "../constants";
import { eased, lerp, fadeIn, stagger } from "../utils";

/**
 * Scene 8 — Cache awareness
 * Frames 0–269 (270 frames / 9.0s)
 *
 * Beat breakdown:
 *   0–70:    Show queued reductions (not immediately applied)
 *   71–150:  Show why: cache prefix still valid
 *   151–220: Trigger condition, reductions apply
 *   221–269: Result: less waste, cache respected
 */
export const Scene8CacheAwareness: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Queued items entrance ──
  const queueEntrance = (i: number) => stagger(frame, 10, i, 18, 14);

  // ── Cache prefix indicator ──
  const cacheValid = frame < 160;
  const cacheOpacity = fadeIn(frame, 40, 12);

  // ── Apply trigger ──
  const triggerActive = frame >= 155 && frame < 195;
  const triggerOpacity = triggerActive ? fadeIn(frame, 155, 10) : 0;

  // ── Applied state ──
  const applied = frame >= 195;
  const applyProgress = applied ? eased(frame, [195, 225], [0, 1]) : 0;

  // ── Caption ──
  const captionOpacity = fadeIn(frame, 230, 15);
  const captionY = eased(frame, [230, 245], [12, 0]);

  return (
    <AbsoluteFill>
      <GridBackground />

      <div
        style={{
          position: "absolute",
          inset: LAYOUT.padding,
          display: "flex",
          flexDirection: "column",
          gap: 32,
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
          Cache-Aware Reductions
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            gap: 48,
          }}
        >
          {/* Left: Queued reductions */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div
              style={{
                fontFamily: FONT.sans,
                fontSize: 14,
                fontWeight: 600,
                color: C.oldAmber,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Queued Reductions
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {QUEUED_REDUCTIONS.map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    opacity: queueEntrance(i),
                    transform: `translateX(${(1 - queueEntrance(i)) * 20}px)`,
                  }}
                >
                  <QueueBadge
                    label={item.label}
                    active={!applied}
                    applied={applied}
                    opacity={applied ? 1 - applyProgress * 0.3 : 1}
                  />
                </div>
              ))}
            </div>

            {/* Not applied yet explanation */}
            {!applied && frame > 50 && (
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 13,
                  color: C.textMuted,
                  opacity: fadeIn(frame, 50, 12),
                  lineHeight: 1.5,
                  maxWidth: 380,
                }}
              >
                These reductions are queued, not applied yet.
                <br />
                The system waits for optimal timing.
              </div>
            )}
          </div>

          {/* Right: Cache state */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div
              style={{
                fontFamily: FONT.sans,
                fontSize: 14,
                fontWeight: 600,
                color: cacheValid ? C.mcCyan : C.textMuted,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Cache Prefix Status
            </div>

            {/* Cache indicator */}
            <div
              style={{
                padding: "20px 24px",
                borderRadius: LAYOUT.panelRadius,
                background: C.bgPanel,
                border: `1px solid ${cacheValid ? C.mcBorder : C.border}`,
                opacity: cacheOpacity,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: cacheValid ? C.mcCyan : C.textMuted,
                    boxShadow: cacheValid ? `0 0 8px ${C.mcCyan}` : "none",
                  }}
                />
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 14,
                    color: cacheValid ? C.mcCyan : C.textMuted,
                  }}
                >
                  {cacheValid ? "Cached prefix valid" : "Cache TTL expired"}
                </span>
              </div>

              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 12,
                  color: C.textSecondary,
                  lineHeight: 1.5,
                }}
              >
                {cacheValid
                  ? "Preserving cache efficiency — reductions queued"
                  : "Optimal apply point reached"}
              </div>
            </div>

            {/* Trigger event */}
            {triggerActive && (
              <div
                style={{
                  padding: "12px 20px",
                  borderRadius: LAYOUT.chipRadius,
                  background: "rgba(245, 158, 11, 0.08)",
                  border: `1px solid ${C.oldBorder}`,
                  fontFamily: FONT.mono,
                  fontSize: 14,
                  color: C.oldAmber,
                  opacity: triggerOpacity,
                }}
              >
                ⚡ Cache TTL expired — applying queued reductions
              </div>
            )}

            {/* Applied result */}
            {applied && (
              <div
                style={{
                  padding: "12px 20px",
                  borderRadius: LAYOUT.chipRadius,
                  background: "rgba(52, 211, 153, 0.08)",
                  border: `1px solid ${C.compBorder}`,
                  fontFamily: FONT.mono,
                  fontSize: 14,
                  color: C.success,
                  opacity: fadeIn(frame, 200, 12),
                }}
              >
                ✓ Reductions applied — no unnecessary churn
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Caption */}
      <CaptionLine
        text="Cache-aware reductions: queue first, apply when timing actually makes sense."
        opacity={captionOpacity}
        y={captionY}
      />
    </AbsoluteFill>
  );
};
