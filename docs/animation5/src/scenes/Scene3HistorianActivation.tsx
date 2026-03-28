import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { spring } from "remotion";
import { GridBackground } from "../components/GridBackground";
import { AgentCard } from "../components/AgentCard";
import { ContextMeter } from "../components/ContextMeter";
import { HistorianPanel } from "../components/HistorianPanel";
import { ConversationRail } from "../components/ConversationRail";
import { StatusChip } from "../components/StatusChip";
import { CaptionLine } from "../components/CaptionLine";
import {
  C,
  FONT,
  LAYOUT,
  AGENT_STATUSES_SCENE3,
  HISTORIAN_STATUSES_IDLE,
  HISTORIAN_STATUSES_ACTIVE,
  RAIL_MESSAGES_OLD,
  RAIL_MESSAGES_NEW,
} from "../constants";
import { eased, lerp, fadeIn, cycleText } from "../utils";

/**
 * Scene 3 — Historian activation: no blocking
 * Frames 0–269 (270 frames / 9.0s)
 *
 * Beat breakdown:
 *   0–60:    Main agent working, context 68%→81%
 *   61–130:  Context rises 81%→91%, historian wakes
 *   131–269: Historian preparing, agent keeps going
 */
export const Scene3HistorianActivation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Context pressure ──
  const contextPct =
    frame < 61
      ? lerp(frame, [0, 60], [68, 81])
      : frame < 131
        ? lerp(frame, [61, 130], [81, 91])
        : lerp(frame, [131, 269], [91, 93]);

  // ── Agent status ──
  const agentStatus = cycleText(AGENT_STATUSES_SCENE3, frame, 14);

  // ── Historian state ──
  const historianActive = frame >= 90;
  const historianStatus =
    frame < 90
      ? cycleText(HISTORIAN_STATUSES_IDLE, frame, 30)
      : cycleText(HISTORIAN_STATUSES_ACTIVE.slice(0, 2), frame - 90, 25);

  // ── Historian entrance spring ──
  const historianScale = spring({
    frame: frame - 85,
    fps,
    config: { damping: 200 },
  });

  // ── Rail messages (growing tail) ──
  const allMessages = [...RAIL_MESSAGES_OLD, ...RAIL_MESSAGES_NEW];
  const visibleCount = Math.min(
    allMessages.length,
    RAIL_MESSAGES_OLD.length + Math.floor(frame / 18),
  );
  const displayMessages = allMessages.slice(0, visibleCount);

  // ── Rail scroll ──
  const scrollOffset = Math.max(
    0,
    (visibleCount - 10) * (LAYOUT.railCardWidth + LAYOUT.railGap),
  );

  // ── Status chips ──
  const chipIndex = Math.floor(frame / 22) % AGENT_STATUSES_SCENE3.length;

  // ── Connector line animation (historian to rail head) ──
  const connectorOpacity = historianActive ? lerp(frame, [90, 110], [0, 0.5]) : 0;

  // ── Caption ──
  const captionOpacity = fadeIn(frame, 200, 15);
  const captionY = eased(frame, [200, 215], [12, 0]);

  return (
    <AbsoluteFill>
      <GridBackground />

      {/* Full-screen Magic Context layout */}
      <div
        style={{
          position: "absolute",
          inset: LAYOUT.padding,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* Top row: Agent + Meter */}
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
            showWarningPulse={contextPct > 88}
            pulseFrame={frame}
          />
        </div>

        {/* Center: Conversation Rail */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <ConversationRail
            messages={displayMessages}
            scrollOffset={scrollOffset}
            showZoneLabels
            headZoneEnd={RAIL_MESSAGES_OLD.length}
          />

          {/* Connector line from head zone to historian */}
          {historianActive && (
            <div
              style={{
                position: "absolute",
                left: 80,
                bottom: -20,
                width: 2,
                height: 40,
                background: `linear-gradient(180deg, ${C.histViolet}40, ${C.histViolet})`,
                opacity: connectorOpacity,
              }}
            />
          )}
        </div>

        {/* Bottom row: Historian + Status area */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <HistorianPanel
            status={historianStatus}
            active={historianActive}
            pulseFrame={frame}
            opacity={frame >= 85 ? historianScale : 0.4}
          />

          {/* Live status chips */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              alignItems: "flex-end",
            }}
          >
            <StatusChip
              text={AGENT_STATUSES_SCENE3[chipIndex]}
              variant="active"
              opacity={1}
            />
            <StatusChip
              text={
                AGENT_STATUSES_SCENE3[
                  (chipIndex + 1) % AGENT_STATUSES_SCENE3.length
                ]
              }
              variant="active"
              opacity={0.5}
            />
          </div>
        </div>
      </div>

      {/* Caption */}
      <CaptionLine
        text="Magic Context: before the limit blocks the session, a background Historian starts working."
        opacity={captionOpacity}
        y={captionY}
      />
    </AbsoluteFill>
  );
};
