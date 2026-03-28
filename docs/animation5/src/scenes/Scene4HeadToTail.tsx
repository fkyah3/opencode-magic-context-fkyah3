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
  AGENT_STATUSES_SCENE4,
  HISTORIAN_STATUSES_ACTIVE,
  RAIL_MESSAGES_OLD,
  RAIL_MESSAGES_NEW,
} from "../constants";
import { eased, lerp, fadeIn, cycleText } from "../utils";

/**
 * Scene 4 — Head-to-tail simultaneous motion (HERO SCENE)
 * Frames 0–359 (360 frames / 12.0s)
 *
 * THE MOST IMPORTANT SHOT IN THE ENTIRE ANIMATION.
 *
 * Beat breakdown:
 *   0–60:    Historian selects chunk from head (#001–#036)
 *   61–160:  Head chunk moves toward historian, tail keeps growing
 *   161–260: Extracted chunk in historian pipeline, tail continues
 *   261–359: Full clarity: two processes at once
 */
export const Scene4HeadToTail: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── All messages ──
  const allMessages = [...RAIL_MESSAGES_OLD, ...RAIL_MESSAGES_NEW];
  const HEAD_CHUNK_END = 8; // first 8 messages are "old head"

  // ── Tail growth: new messages keep appearing ──
  const tailGrowth = Math.min(
    RAIL_MESSAGES_NEW.length,
    4 + Math.floor(frame / 22),
  );
  const visibleCount = Math.min(
    allMessages.length,
    RAIL_MESSAGES_OLD.length + tailGrowth,
  );
  const displayMessages = allMessages.slice(0, visibleCount);

  // ── Head highlight (select chunk 0-7) ──
  const highlightActive = frame >= 0;
  const highlightOpacity = lerp(frame, [0, 30], [0, 1]);

  // ── Extraction progress (cards float up) ──
  const extractProgress =
    frame < 30
      ? 0
      : frame < 160
        ? eased(frame, [30, 160], [0, 1])
        : 1;

  // ── After extraction, remove from rail ──
  const postExtract = extractProgress >= 0.95;

  // ── Rail with or without extracted cards ──
  const railMessages = postExtract
    ? displayMessages.slice(HEAD_CHUNK_END)
    : displayMessages;

  const highlightRange: [number, number] | undefined =
    highlightActive && !postExtract ? [0, HEAD_CHUNK_END] : undefined;

  // ── Scroll offset grows with tail ──
  const scrollOffset = postExtract
    ? Math.max(0, (railMessages.length - 10) * (LAYOUT.railCardWidth + LAYOUT.railGap))
    : Math.max(0, (visibleCount - 12) * (LAYOUT.railCardWidth + LAYOUT.railGap));

  // ── Context meter stays alive ──
  const contextPct = lerp(frame, [0, 359], [91, 88]);

  // ── Agent status (NEVER pauses) ──
  const agentStatus = cycleText(AGENT_STATUSES_SCENE4, frame, 16);

  // ── Historian status ──
  const historianStatus =
    frame < 30
      ? "Selecting older messages"
      : frame < 160
        ? "Extracting head chunk #001–#036"
        : cycleText(HISTORIAN_STATUSES_ACTIVE.slice(2, 5), frame - 160, 20);

  // ── Status chips for agent activity ──
  const chipIdx = Math.floor(frame / 20) % AGENT_STATUSES_SCENE4.length;

  // ── Caption ──
  const captionOpacity = fadeIn(frame, 280, 15);
  const captionY = eased(frame, [280, 295], [12, 0]);

  // ── Extraction visual: floating cards indicator ──
  const extractIndicatorOpacity =
    frame >= 40 && frame < 200
      ? lerp(frame, [40, 60], [0, 0.8])
      : frame >= 200
        ? lerp(frame, [200, 220], [0.8, 0])
        : 0;

  return (
    <AbsoluteFill>
      <GridBackground />

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
            pulseFrame={frame}
          />
        </div>

        {/* Center: Conversation Rail (THE HERO ELEMENT) */}
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
            messages={railMessages}
            scrollOffset={scrollOffset}
            highlightRange={highlightRange}
            extractProgress={extractProgress}
            showZoneLabels
            headZoneEnd={postExtract ? 0 : HEAD_CHUNK_END}
          />

          {/* Extraction flow indicator: cards moving to historian */}
          {extractIndicatorOpacity > 0 && (
            <div
              style={{
                position: "absolute",
                left: 40,
                bottom: -30,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                opacity: extractIndicatorOpacity,
              }}
            >
              {/* Arrow down */}
              <div
                style={{
                  width: 2,
                  height: 30,
                  background: `linear-gradient(180deg, ${C.histViolet}60, ${C.histViolet})`,
                }}
              />
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 10,
                  color: C.histViolet,
                  opacity: 0.8,
                }}
              >
                #001–#036 → Historian
              </div>
            </div>
          )}

          {/* Tail growth indicator */}
          <div
            style={{
              position: "absolute",
              right: 60,
              top: -24,
              fontFamily: FONT.mono,
              fontSize: 10,
              color: C.mcCyan,
              opacity: 0.6,
            }}
          >
            ● new activity flowing in
          </div>
        </div>

        {/* Bottom row: Historian + Agent chips */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <HistorianPanel
            status={historianStatus}
            active
            pulseFrame={frame}
          />

          {/* Live status chips showing agent still working */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              alignItems: "flex-end",
            }}
          >
            <StatusChip
              text={AGENT_STATUSES_SCENE4[chipIdx]}
              variant="active"
            />
            <StatusChip
              text={
                AGENT_STATUSES_SCENE4[
                  (chipIdx + 1) % AGENT_STATUSES_SCENE4.length
                ]
              }
              variant="active"
              opacity={0.5}
            />
            {frame > 180 && (
              <StatusChip
                text="Tests passing 18/18"
                variant="success"
                opacity={fadeIn(frame, 180, 10)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Hero caption */}
      <CaptionLine
        text="Historian rewrites the head. The main agent keeps moving on the tail."
        opacity={captionOpacity}
        y={captionY}
        bold
      />
    </AbsoluteFill>
  );
};
