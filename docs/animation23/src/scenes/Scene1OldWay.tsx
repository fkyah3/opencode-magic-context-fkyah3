import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import {
  COLORS,
  SCENE1_TRANSCRIPT,
  RAW_MESSAGES,
  type TranscriptEntry,
} from "../constants";
import { SessionShell } from "../components/SessionShell";
import { SessionHeader } from "../components/SessionHeader";
import { TranscriptPane } from "../components/TranscriptPane";
import { UserBubble } from "../components/UserBubble";
import { AssistantBlock } from "../components/AssistantBlock";
import { ActionRow } from "../components/ActionRow";
import { InputBar } from "../components/InputBar";
import { ContextInspector } from "../components/ContextInspector";
import { ContextStat } from "../components/ContextStat";
import { RawMessageRow } from "../components/RawMessageRow";
import { ContextBreakdownBar } from "../components/ContextBreakdownBar";
import { CaptionLine } from "../components/CaptionLine";
import { fadeIn, ease, pulse, getUsageColor, formatTokens } from "../helpers";

/**
 * Scene 1: Old Way — Full-screen OpenCode session pain.
 * Duration: 210 frames (7.0s)
 *
 * f0–50: Active session growth. Usage 34%→55%.
 * f51–110: More growth. Usage 55%→88%. Warm urgency.
 * f111–145: Pressure hard. Usage 94%→99%.
 * f146–160: BLOCKING. Usage 100%. Transcript freezes.
 * f161–209: Hold blocked. Slow compaction. Caption.
 */
export const Scene1OldWay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ─── Usage animation ───────────────────────────────────────────────────
  const usage = interpolate(
    frame,
    [0, 50, 110, 145, 155],
    [34, 55, 88, 99, 100],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // ─── Token count ───────────────────────────────────────────────────────
  const totalTokens = Math.round(
    interpolate(frame, [0, 145], [42000, 128000], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    })
  );
  const contextLimit = 128000;
  const cacheTokens = Math.round(totalTokens * 0.35);
  const assistantMsgCount = Math.round(
    interpolate(frame, [0, 145], [4, 14], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    })
  );

  // ─── Transcript entry stagger ──────────────────────────────────────────
  const entryStagger = 8;
  const visibleEntries = Math.min(
    SCENE1_TRANSCRIPT.length,
    Math.floor(
      interpolate(frame, [0, 110], [1, SCENE1_TRANSCRIPT.length], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
      })
    )
  );

  // Scroll offset increases as entries appear
  const scrollOffset = interpolate(
    frame,
    [30, 110],
    [0, Math.max(0, (visibleEntries - 5) * 56)],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // ─── Blocking state ────────────────────────────────────────────────────
  const isBlocked = frame >= 146;
  const blockOverlay = fadeIn(frame, 146, 15);
  const compactionProgress = interpolate(frame, [161, 209], [0, 0.6], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // ─── Pressure visuals ─────────────────────────────────────────────────
  const pressurePulse = frame > 111 ? pulse(frame, 20) : 0;
  const usageColor = getUsageColor(usage);
  const glowColor = usage > 90 ? COLORS.contextDanger : undefined;

  // ─── Raw messages visible ──────────────────────────────────────────────
  const visibleRawMessages = Math.min(
    RAW_MESSAGES.length,
    Math.floor(
      interpolate(frame, [0, 110], [3, RAW_MESSAGES.length], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
      })
    )
  );

  // ─── Header status ────────────────────────────────────────────────────
  const headerStatus = isBlocked ? "blocked" : "active";
  const statusColor = isBlocked ? COLORS.contextDanger : undefined;

  // ─── Caption ──────────────────────────────────────────────────────────
  const captionOpacity = fadeIn(frame, 165, 20);

  // ─── Compaction labels ────────────────────────────────────────────────
  const compactionLabel =
    frame < 175
      ? "Context limit reached"
      : frame < 190
        ? "Summarizing previous steps..."
        : "Compressing raw history...";

  const renderTranscriptEntry = (entry: TranscriptEntry, index: number) => {
    const entryStart = index * entryStagger;
    const opacity = fadeIn(frame, entryStart, 10);
    const ty = interpolate(
      frame,
      [entryStart, entryStart + 10],
      [12, 0],
      { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
    );

    if (entry.type === "user") {
      return (
        <UserBubble
          key={entry.id}
          text={entry.content}
          opacity={isBlocked ? opacity * 0.5 : opacity}
          translateY={ty}
        />
      );
    }
    if (entry.type === "action") {
      return (
        <ActionRow
          key={entry.id}
          text={entry.content}
          kind={entry.actionKind || "explore"}
          opacity={isBlocked ? opacity * 0.5 : opacity}
          translateY={ty}
        />
      );
    }
    return (
      <AssistantBlock
        key={entry.id}
        text={entry.content}
        opacity={isBlocked ? opacity * 0.5 : opacity}
        translateY={ty}
      />
    );
  };

  return (
    <SessionShell>
      {/* Left: Transcript */}
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
          sessionName="ATHENA"
          status={headerStatus}
          statusColor={statusColor}
        />
        <TranscriptPane scrollOffset={scrollOffset}>
          {SCENE1_TRANSCRIPT.slice(0, visibleEntries).map((entry, i) =>
            renderTranscriptEntry(entry, i)
          )}
        </TranscriptPane>
        <InputBar />

        {/* Blocking overlay */}
        {isBlocked && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `${COLORS.bg}88`,
              borderRadius: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              opacity: blockOverlay,
              zIndex: 10,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: COLORS.contextDanger,
                fontFamily:
                  "'JetBrains Mono', 'Fira Code', monospace",
              }}
            >
              {compactionLabel}
            </div>
            {frame >= 161 && (
              <div
                style={{
                  width: 200,
                  height: 4,
                  borderRadius: 2,
                  background: COLORS.contextTrack,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${compactionProgress * 100}%`,
                    height: "100%",
                    background: COLORS.oldWayAmber,
                    borderRadius: 2,
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right: Context Inspector */}
      <ContextInspector glowColor={glowColor}>
        <ContextStat label="Session" value="ATHENA" mono={false} />
        <ContextStat label="Provider" value="Anthropic" mono={false} />
        <ContextStat label="Model" value="claude-opus-4" />
        <ContextStat
          label="Context Limit"
          value={formatTokens(contextLimit)}
        />
        <ContextStat
          label="Total Tokens"
          value={formatTokens(totalTokens)}
          valueColor={usageColor}
        />
        <ContextBreakdownBar
          percent={usage}
          pulse={pressurePulse}
        />
        <ContextStat
          label="Cache Tokens"
          value={formatTokens(cacheTokens)}
        />
        <ContextStat
          label="Assistant Messages"
          value={assistantMsgCount}
          valueColor={usage > 90 ? COLORS.contextWarning : undefined}
        />
        <ContextStat label="User Messages" value={3} />

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: COLORS.panelBorder,
            margin: "4px 16px",
          }}
        />

        {/* Raw Messages */}
        <div
          style={{
            padding: "0 0 4px",
            fontSize: 10,
            color: COLORS.textMuted,
            paddingLeft: 16,
            fontWeight: 600,
            textTransform: "uppercase" as const,
            letterSpacing: 1,
          }}
        >
          Raw Messages
        </div>
        {RAW_MESSAGES.slice(0, visibleRawMessages).map((rm, i) => (
          <RawMessageRow
            key={rm.id}
            label={rm.label}
            tokens={rm.tokens}
            age={rm.age}
            opacity={fadeIn(frame, i * 5, 8)}
          />
        ))}
      </ContextInspector>

      {/* Caption */}
      {frame >= 165 && (
        <CaptionLine
          text="Old way: the main agent hits the limit and stops to compact itself."
          opacity={captionOpacity}
        />
      )}
    </SessionShell>
  );
};
