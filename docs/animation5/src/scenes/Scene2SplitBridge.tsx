import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { spring } from "remotion";
import { GridBackground } from "../components/GridBackground";
import { AgentCard } from "../components/AgentCard";
import { ContextMeter } from "../components/ContextMeter";
import { HistorianPanel } from "../components/HistorianPanel";
import { ProgressBar } from "../components/ProgressBar";
import { C, FONT, LAYOUT, COMPACTION_STATUSES, AGENT_STATUSES_SCENE3 } from "../constants";
import { eased, lerp, fadeIn, cycleText } from "../utils";

/**
 * Scene 2 — Split comparison bridge
 * Frames 0–119 (120 frames / 4.0s)
 *
 * Beat breakdown:
 *   0–35:   Transition to split-screen
 *   36–75:  Old left frozen, right panel alive
 *   76–119: Camera starts committing to right side
 */
export const Scene2SplitBridge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Split animation ──
  const splitProgress = eased(frame, [0, 30], [0, 1]);
  const leftWidth = eased(frame, [76, 119], [50, 38]); // shrinks later
  const rightWidth = 100 - leftWidth;

  // ── Left panel (old way, still frozen) ──
  const leftOpacity = eased(frame, [76, 119], [1, 0.6]);

  // ── Right panel (Magic Context) ──
  const rightOpacity = fadeIn(frame, 8, 20);
  const rightContextPct = lerp(frame, [20, 100], [52, 90]);

  // ── Historian entrance ──
  const historianEntrance = spring({
    frame: frame - 60,
    fps,
    config: { damping: 200 },
  });
  const showHistorian = frame >= 60;

  // ── Labels ──
  const labelOpacity = fadeIn(frame, 10, 15);

  // ── Divider ──
  const dividerOpacity = eased(frame, [0, 20], [0, 0.5]);

  return (
    <AbsoluteFill>
      <GridBackground />

      {/* Split container */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          overflow: "hidden",
        }}
      >
        {/* Left: Old Way */}
        <div
          style={{
            width: `${leftWidth}%`,
            position: "relative",
            opacity: leftOpacity,
            overflow: "hidden",
            padding: 32,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {/* Label */}
          <div
            style={{
              fontFamily: FONT.sans,
              fontSize: 16,
              fontWeight: 700,
              color: C.oldAmber,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              opacity: labelOpacity,
            }}
          >
            Old Way
          </div>

          {/* Frozen agent */}
          <AgentCard
            title="Main Agent"
            status={cycleText(COMPACTION_STATUSES, frame, 22)}
            active={false}
            variant="old"
            frozen={false}
            compactingMode
            pulseFrame={frame}
            width={300}
            height={120}
          />

          {/* Compaction progress */}
          <div style={{ marginTop: 8, opacity: 0.7 }}>
            <ProgressBar
              progress={lerp(frame, [0, 119], [0.18, 0.32])}
              width={220}
              color={C.oldAmber}
              label="Compacting..."
            />
          </div>

          {/* Frozen code area placeholder */}
          <div
            style={{
              flex: 1,
              borderRadius: LAYOUT.cardRadius,
              background: "#1a1b26",
              border: `1px solid ${C.border}`,
              opacity: 0.4,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 1,
            background: `linear-gradient(180deg, transparent, ${C.borderLight}, transparent)`,
            opacity: dividerOpacity,
          }}
        />

        {/* Right: Magic Context */}
        <div
          style={{
            width: `${rightWidth}%`,
            position: "relative",
            opacity: rightOpacity,
            padding: 32,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            overflow: "hidden",
          }}
        >
          {/* Label */}
          <div
            style={{
              fontFamily: FONT.sans,
              fontSize: 16,
              fontWeight: 700,
              color: C.mcCyan,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              opacity: labelOpacity,
            }}
          >
            Magic Context
          </div>

          {/* Active agent */}
          <AgentCard
            title="Main Agent"
            status={cycleText(AGENT_STATUSES_SCENE3, frame, 15)}
            active
            variant="main"
            pulseFrame={frame}
            width={300}
            height={120}
          />

          {/* Context meter */}
          <ContextMeter
            percentage={rightContextPct}
            showWarningPulse={rightContextPct > 85}
            pulseFrame={frame}
            width={260}
          />

          {/* Historian appears */}
          {showHistorian && (
            <div
              style={{
                opacity: historianEntrance,
                transform: `translateY(${(1 - historianEntrance) * 20}px)`,
                marginTop: 8,
              }}
            >
              <HistorianPanel
                status="Monitoring context pressure"
                active={false}
                pulseFrame={frame}
                width={300}
                height={110}
              />
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
