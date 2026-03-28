import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { spring } from "remotion";
import { GridBackground } from "../components/GridBackground";
import { AgentCard } from "../components/AgentCard";
import { ContextMeter } from "../components/ContextMeter";
import { HistorianPanel } from "../components/HistorianPanel";
import { StatusChip } from "../components/StatusChip";
import { CaptionLine } from "../components/CaptionLine";
import { C, FONT, LAYOUT, AGENT_STATUSES_SCENE6 } from "../constants";
import { eased, lerp, fadeIn, cycleText } from "../utils";

/**
 * Scene 6 — Healthy-context payoff
 * Frames 0–209 (210 frames / 7.0s)
 *
 * Beat breakdown:
 *   0–70:    Context drops 91%→57% (satisfying)
 *   71–140:  Agent keeps operating, green status
 *   141–209: Hold healthy state
 */
export const Scene6HealthyPayoff: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Context meter: satisfying drop ──
  const contextPct =
    frame < 70
      ? eased(frame, [0, 70], [91, 54])
      : lerp(frame, [70, 209], [54, 52]);

  // ── Agent status ──
  const agentStatus = cycleText(AGENT_STATUSES_SCENE6, frame, 18);

  // ── Historian completed ──
  const historianStatus = "Compaction pass complete";

  // ── Relief pulse (green flash on drop) ──
  const reliefFlash =
    frame >= 50 && frame < 65
      ? eased(frame, [50, 58], [0, 0.08]) -
        eased(frame, [58, 65], [0, 0.08])
      : 0;

  // ── Success chips ──
  const showSuccess = frame > 90;
  const successOpacity = fadeIn(frame, 90, 12);

  // ── Caption ──
  const captionOpacity = fadeIn(frame, 155, 15);
  const captionY = eased(frame, [155, 170], [12, 0]);

  return (
    <AbsoluteFill>
      <GridBackground />

      <div
        style={{
          position: "absolute",
          inset: LAYOUT.padding,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <AgentCard
            title="Main Agent"
            status={agentStatus}
            active
            variant="main"
            pulseFrame={frame}
          />
          <ContextMeter
            percentage={contextPct}
            pulseFrame={frame}
          />
        </div>

        {/* Center: healthy system view */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
          }}
        >
          {/* Big healthy context display */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                border: `3px solid ${C.meterSafe}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 20px rgba(34, 197, 94, 0.2)`,
              }}
            >
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 24,
                  fontWeight: 700,
                  color: C.meterSafe,
                }}
              >
                {Math.round(contextPct)}%
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 20,
                  fontWeight: 700,
                  color: C.textPrimary,
                }}
              >
                Context healthy
              </div>
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 14,
                  color: C.textSecondary,
                }}
              >
                Compaction freed 37% without interruption
              </div>
            </div>
          </div>

          {/* Success status chips */}
          {showSuccess && (
            <div
              style={{
                display: "flex",
                gap: 10,
                opacity: successOpacity,
              }}
            >
              <StatusChip text="All tests passing" variant="success" />
              <StatusChip text="Clean diff ready" variant="success" />
              <StatusChip text="No flow interruption" variant="success" />
            </div>
          )}
        </div>

        {/* Bottom: Historian completed */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <HistorianPanel
            status={historianStatus}
            active={false}
            pulseFrame={frame}
            opacity={0.6}
          />
        </div>
      </div>

      {/* Relief flash */}
      {reliefFlash > 0 && (
        <AbsoluteFill
          style={{
            background: `rgba(34, 197, 94, ${reliefFlash})`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Caption */}
      <CaptionLine
        text="The main agent never stopped. Flow stayed intact."
        opacity={captionOpacity}
        y={captionY}
      />
    </AbsoluteFill>
  );
};
