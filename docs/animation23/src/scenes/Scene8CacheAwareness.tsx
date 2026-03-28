import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS, FONT, FONT_SIZE, QUEUED_REDUCTIONS, RAW_MESSAGES } from "../constants";
import { SessionShell } from "../components/SessionShell";
import { SessionHeader } from "../components/SessionHeader";
import { TranscriptPane } from "../components/TranscriptPane";
import { AssistantBlock } from "../components/AssistantBlock";
import { InputBar } from "../components/InputBar";
import { ContextInspector } from "../components/ContextInspector";
import { ContextStat } from "../components/ContextStat";
import { ContextBreakdownBar } from "../components/ContextBreakdownBar";
import { RawMessageRow } from "../components/RawMessageRow";
import { QueueBadge } from "../components/QueueBadge";
import { CaptionLine } from "../components/CaptionLine";
import { fadeIn, ease, getUsageColor, formatTokens } from "../helpers";

/**
 * Scene 8: Cache awareness — queue first, apply when timing makes sense.
 * Duration: 270 frames (9.0s)
 *
 * f0–70: Mark old ranges as queued (ghosted).
 * f71–150: Why deferred: cache efficiency.
 * f151–220: Trigger → queued reductions apply.
 * f221–269: Hold result.
 */
export const Scene8CacheAwareness: React.FC = () => {
  const frame = useCurrentFrame();

  // ─── Queue phase ──────────────────────────────────────────────────────
  const queuedItems = QUEUED_REDUCTIONS.map((item, i) => {
    const ghostStart = 15 + i * 15;
    const ghosted = frame >= ghostStart;
    const applied = frame >= 160 + i * 15;
    return { ...item, ghosted, applied };
  });

  // ─── Cache preservation label ─────────────────────────────────────────
  const cachePreservationOpacity = interpolate(
    frame,
    [75, 95, 150, 160],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // ─── Trigger event ────────────────────────────────────────────────────
  const triggerOpacity = interpolate(
    frame,
    [151, 165, 200, 220],
    [0, 1, 1, 0.6],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // ─── Usage animation ──────────────────────────────────────────────────
  const usage = interpolate(
    frame,
    [0, 70, 150, 220, 269],
    [72, 74, 76, 52, 50],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  const totalTokens = Math.round(
    interpolate(frame, [0, 150, 220], [92000, 97000, 64000], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    })
  );

  // ─── Cache tokens highlighted ─────────────────────────────────────────
  const cacheHighlight = interpolate(
    frame,
    [75, 95, 150, 160],
    [0, 1, 1, 0.3],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // ─── Caption ──────────────────────────────────────────────────────────
  const captionOpacity = fadeIn(frame, 235, 20);

  return (
    <SessionShell>
      {/* Left: Transcript (minimal activity, emphasis on context panel) */}
      <div
        style={{
          width: "45%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 1,
        }}
      >
        <SessionHeader sessionName="ATHENA" status="active" />
        <TranscriptPane width="100%">
          <AssistantBlock
            text="Continuing work on the session. The context management layer handles optimization transparently."
            opacity={0.6}
            dimmed
          />
        </TranscriptPane>
        <InputBar />
      </div>

      {/* Right: Context inspector + cache awareness */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          zIndex: 1,
        }}
      >
        <ContextInspector width="100%">
          <ContextStat label="Session" value="ATHENA" mono={false} />
          <ContextStat label="Model" value="claude-opus-4" />
          <ContextStat
            label="Total Tokens"
            value={formatTokens(totalTokens)}
            valueColor={getUsageColor(usage)}
          />
          <ContextBreakdownBar percent={usage} />
          <ContextStat
            label="Cache Tokens"
            value={formatTokens(Math.round(totalTokens * 0.4))}
            valueColor={
              cacheHighlight > 0.5
                ? COLORS.cacheAccent
                : undefined
            }
            pulse={cacheHighlight * 0.3}
          />
        </ContextInspector>

        {/* Queued reductions section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "0 4px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              opacity: fadeIn(frame, 10, 15),
            }}
          >
            <span
              style={{
                fontSize: FONT_SIZE.xs,
                fontWeight: 600,
                color: COLORS.cacheAccent,
                textTransform: "uppercase",
                letterSpacing: 1,
                fontFamily: FONT.mono,
              }}
            >
              Queued Reductions
            </span>
          </div>

          {queuedItems.map((item) => (
            <QueueBadge
              key={item.id}
              label={item.label}
              tokens={item.tokens}
              ghosted={item.ghosted}
              applied={item.applied}
              opacity={item.applied ? 0.3 : 1}
            />
          ))}
        </div>

        {/* Cache preservation explanation */}
        {frame >= 75 && frame < 160 && (
          <div
            style={{
              padding: "10px 14px",
              background: `${COLORS.cacheAccent}11`,
              border: `1px solid ${COLORS.cacheAccent}33`,
              borderRadius: 6,
              opacity: cachePreservationOpacity,
            }}
          >
            <div
              style={{
                fontSize: FONT_SIZE.xs,
                color: COLORS.cacheAccent,
                fontFamily: FONT.sans,
                lineHeight: 1.5,
              }}
            >
              ⟡ Preserving cache efficiency — waiting for optimal apply point
            </div>
          </div>
        )}

        {/* Trigger event */}
        {frame >= 151 && (
          <div
            style={{
              padding: "8px 14px",
              background: `${COLORS.successGreen}11`,
              border: `1px solid ${COLORS.successGreen}33`,
              borderRadius: 6,
              opacity: triggerOpacity,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 12, color: COLORS.successGreen }}>
              ↯
            </span>
            <span
              style={{
                fontSize: FONT_SIZE.xs,
                color: COLORS.successGreen,
                fontFamily: FONT.mono,
              }}
            >
              Cache TTL expired — applying queued reductions
            </span>
          </div>
        )}
      </div>

      {/* Caption */}
      {frame >= 235 && (
        <CaptionLine
          text="Cache-aware reductions: queue first, apply when timing actually makes sense."
          opacity={captionOpacity}
        />
      )}
    </SessionShell>
  );
};
