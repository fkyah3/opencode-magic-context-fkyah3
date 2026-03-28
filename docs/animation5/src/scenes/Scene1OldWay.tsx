import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { interpolate, spring } from "remotion";
import { GridBackground } from "../components/GridBackground";
import { AgentCard } from "../components/AgentCard";
import { ContextMeter } from "../components/ContextMeter";
import { CodeEditor } from "../components/CodeEditor";
import { MiniTerminal } from "../components/MiniTerminal";
import { StatusChip } from "../components/StatusChip";
import { CaptionLine } from "../components/CaptionLine";
import { ProgressBar } from "../components/ProgressBar";
import {
  C,
  FONT,
  LAYOUT,
  AGENT_STATUSES_SCENE1,
  COMPACTION_STATUSES,
  CODE_LINES,
  TERMINAL_LINES,
  FILE_TABS,
} from "../constants";
import { eased, lerp, fadeIn, fadeOut, cycleText, cycleIndex } from "../utils";

/**
 * Scene 1 — Old Way: Full-screen pain
 * Frames 0–209 (210 frames / 7.0s)
 *
 * Beat breakdown:
 *   0–50:    Agent working fast, context 34%→58%
 *   51–110:  Activity intensifies, context 58%→89%
 *   111–145: Pressure approaches threshold, 94%→99%
 *   146–160: Context hits 100%, everything freezes
 *   161–209: Blocked compaction with slow progress
 */
export const Scene1OldWay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Context meter progression ──
  const contextPct =
    frame < 51
      ? lerp(frame, [0, 50], [34, 58])
      : frame < 111
        ? lerp(frame, [51, 110], [58, 89])
        : frame < 146
          ? lerp(frame, [111, 145], [94, 99])
          : 100;

  const isFrozen = frame >= 146;
  const isCompacting = frame >= 161;
  const showWarningPulse = frame >= 111 && frame < 146;

  // ── Status text cycling ──
  const statusInterval = frame < 51 ? 12 : frame < 111 ? 8 : 6;
  const agentStatus = isFrozen
    ? isCompacting
      ? cycleText(COMPACTION_STATUSES, frame - 161, 20)
      : "Context limit reached"
    : cycleText(AGENT_STATUSES_SCENE1, frame, statusInterval);

  // ── Code editor state ──
  const visibleCodeLines = isFrozen ? 12 : Math.min(12, 6 + Math.floor(frame / 12));
  const cursorLine = isFrozen ? undefined : cycleIndex(visibleCodeLines, frame, 10);
  const activeTab = FILE_TABS[cycleIndex(FILE_TABS.length, frame, 35)];

  // ── Terminal state ──
  const terminalLines = isFrozen ? 4 : Math.min(9, 2 + Math.floor(frame / 15));

  // ── Status chips ──
  const chipCount = isFrozen ? 0 : Math.min(3, Math.floor(frame / 18) + 1);
  const chips = AGENT_STATUSES_SCENE1.slice(
    cycleIndex(AGENT_STATUSES_SCENE1.length - 2, frame, 24),
    cycleIndex(AGENT_STATUSES_SCENE1.length - 2, frame, 24) + chipCount,
  );

  // ── Freeze flash ──
  const freezeFlash = frame >= 146 && frame < 152
    ? interpolate(frame, [146, 152], [0.15, 0], { extrapolateRight: "clamp" as const })
    : 0;

  // ── Compaction progress (painfully slow) ──
  const compactionProgress = isCompacting
    ? lerp(frame, [161, 209], [0, 0.18])
    : 0;

  // ── Dim on freeze ──
  const overallDim = isFrozen ? 0.85 : 1;

  // ── Blocking overlay opacity ──
  const overlayOpacity = isFrozen
    ? fadeIn(frame, 146, 10)
    : 0;

  // ── Caption ──
  const captionOpacity = fadeIn(frame, 170, 15);
  const captionY = eased(frame, [170, 185], [12, 0]);

  return (
    <AbsoluteFill>
      <GridBackground />

      {/* Main content area */}
      <div
        style={{
          position: "absolute",
          inset: LAYOUT.padding,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          opacity: overallDim,
        }}
      >
        {/* Top row: Agent card + Context meter */}
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
            active={!isFrozen}
            variant={isFrozen ? "old" : "main"}
            pulseFrame={frame}
            frozen={isFrozen && !isCompacting}
            compactingMode={isCompacting}
          />
          <ContextMeter
            percentage={contextPct}
            showWarningPulse={showWarningPulse}
            pulseFrame={frame}
          />
        </div>

        {/* Center: Code editor + terminal side-by-side */}
        <div
          style={{
            flex: 1,
            display: "flex",
            gap: 16,
            minHeight: 0,
          }}
        >
          <CodeEditor
            lines={CODE_LINES}
            visibleLines={visibleCodeLines}
            activeTab={isFrozen ? activeTab : activeTab}
            tabs={FILE_TABS.slice(0, 3)}
            cursorVisible={!isFrozen}
            cursorLine={cursorLine}
            frozen={isFrozen}
            width={undefined}
            height={undefined}
          />
          <div
            style={{
              width: 360,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <MiniTerminal
              lines={TERMINAL_LINES}
              visibleLines={terminalLines}
              frozen={isFrozen}
            />

            {/* Status chips */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {chips.map((chip, i) => (
                <StatusChip
                  key={`${chip}-${i}`}
                  text={chip}
                  variant={isFrozen ? "dim" : "active"}
                  opacity={fadeIn(frame, i * 18, 8)}
                  scale={isFrozen ? 0.98 : 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Freeze flash overlay */}
      {freezeFlash > 0 && (
        <AbsoluteFill
          style={{
            background: `rgba(245, 158, 11, ${freezeFlash})`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Blocking compaction overlay */}
      {isFrozen && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: overlayOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            padding: "32px 48px",
            borderRadius: LAYOUT.panelRadius,
            background: "rgba(11, 14, 23, 0.92)",
            border: `1px solid ${C.oldBorder}`,
            backdropFilter: "blur(8px)",
            boxShadow: "0 0 40px rgba(245, 158, 11, 0.1)",
          }}
        >
          {/* Blocking icon */}
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: `2px solid ${C.oldAmber}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONT.mono,
              fontSize: 20,
              color: C.oldAmber,
            }}
          >
            ⏸
          </div>

          <div
            style={{
              fontFamily: FONT.sans,
              fontSize: 20,
              fontWeight: 700,
              color: C.oldAmber,
              letterSpacing: "-0.02em",
            }}
          >
            {isCompacting ? "Compacting history..." : "Context limit reached"}
          </div>

          {isCompacting && (
            <>
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 14,
                  color: C.textSecondary,
                }}
              >
                {cycleText(COMPACTION_STATUSES, frame - 161, 18)}
              </div>
              <ProgressBar
                progress={compactionProgress}
                width={260}
                color={C.oldAmber}
                glow
              />
            </>
          )}
        </div>
      )}

      {/* Caption */}
      <CaptionLine
        text="Old way: the main agent hits the limit and stops to compact itself."
        opacity={captionOpacity}
        y={captionY}
      />
    </AbsoluteFill>
  );
};
