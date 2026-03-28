import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS, FONT, MAGIC_TRANSCRIPT, RAW_MESSAGES } from "../constants";
import { SessionShell } from "../components/SessionShell";
import { SessionHeader } from "../components/SessionHeader";
import { TranscriptPane } from "../components/TranscriptPane";
import { UserBubble } from "../components/UserBubble";
import { AssistantBlock } from "../components/AssistantBlock";
import { ActionRow } from "../components/ActionRow";
import { InputBar } from "../components/InputBar";
import { ContextInspector } from "../components/ContextInspector";
import { ContextStat } from "../components/ContextStat";
import { ContextBreakdownBar } from "../components/ContextBreakdownBar";
import { RawMessageRow } from "../components/RawMessageRow";
import { HistorianPanel } from "../components/HistorianPanel";
import { CaptionLine } from "../components/CaptionLine";
import { fadeIn, ease, getUsageColor, formatTokens } from "../helpers";

/**
 * Scene 3: Historian activation — pressure rises, flow doesn't break.
 * Duration: 270 frames (9.0s)
 *
 * f0–60: Session active. Usage 68%→81%.
 * f61–130: Usage 81%→91%. Historian transitions idle→active.
 * f131–269: Historian fully wakes. Session continues.
 */
export const Scene3HistorianActivation: React.FC = () => {
  const frame = useCurrentFrame();

  // ─── Usage animation (never hits 100%) ────────────────────────────────
  const usage = interpolate(
    frame,
    [0, 60, 130, 269],
    [68, 81, 91, 93],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  const totalTokens = Math.round(
    interpolate(frame, [0, 269], [87000, 119000], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    })
  );
  const usageColor = getUsageColor(usage);

  // ─── Transcript entries ───────────────────────────────────────────────
  const entryStagger = 15;
  const visibleEntries = Math.min(
    MAGIC_TRANSCRIPT.length,
    Math.floor(
      interpolate(frame, [0, 200], [3, MAGIC_TRANSCRIPT.length], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
      })
    )
  );
  const scrollOffset = interpolate(
    frame,
    [40, 200],
    [0, Math.max(0, (visibleEntries - 6) * 52)],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // ─── Raw messages ─────────────────────────────────────────────────────
  const visibleRawMessages = Math.min(
    RAW_MESSAGES.length,
    Math.floor(
      interpolate(frame, [0, 180], [5, RAW_MESSAGES.length], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
      })
    )
  );

  // ─── Historian state ──────────────────────────────────────────────────
  const historianOpacity = fadeIn(frame, 61, 25);
  const historianActive = frame > 100;

  const historianStatus =
    frame < 80
      ? "Monitoring context pressure"
      : frame < 120
        ? "Preparing background compaction"
        : frame < 180
          ? "Selecting older session history"
          : frame < 220
            ? "Tracing related raw messages"
            : "Preparing compaction pass";

  // ─── Scan sweep over older transcript (visual hint) ───────────────────
  const scanSweepY = interpolate(frame, [80, 160], [-20, 200], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const scanSweepOpacity = interpolate(
    frame,
    [80, 100, 140, 160],
    [0, 0.3, 0.3, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // ─── Caption ──────────────────────────────────────────────────────────
  const captionOpacity = fadeIn(frame, 200, 20);

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
        <SessionHeader sessionName="ATHENA" status="active" />
        <TranscriptPane scrollOffset={scrollOffset}>
          {MAGIC_TRANSCRIPT.slice(0, visibleEntries).map((entry, i) => {
            const start = i * entryStagger;
            const opacity = fadeIn(frame, start, 12);
            const ty = interpolate(
              frame,
              [start, start + 12],
              [10, 0],
              { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
            );

            if (entry.type === "user")
              return (
                <UserBubble
                  key={entry.id}
                  text={entry.content}
                  opacity={opacity}
                  translateY={ty}
                />
              );
            if (entry.type === "action")
              return (
                <ActionRow
                  key={entry.id}
                  text={entry.content}
                  kind={entry.actionKind || "explore"}
                  opacity={opacity}
                  translateY={ty}
                />
              );
            return (
              <AssistantBlock
                key={entry.id}
                text={entry.content}
                opacity={opacity}
                translateY={ty}
              />
            );
          })}
        </TranscriptPane>
        <InputBar />

        {/* Scan sweep overlay */}
        {frame >= 80 && frame <= 160 && (
          <div
            style={{
              position: "absolute",
              top: scanSweepY,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, transparent, ${COLORS.historianLight}${Math.round(scanSweepOpacity * 255)
                .toString(16)
                .padStart(2, "0")}, transparent)`,
              zIndex: 5,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Historian panel (bottom-left) */}
        {frame >= 61 && (
          <div
            style={{
              position: "absolute",
              bottom: 56,
              left: 16,
              zIndex: 20,
            }}
          >
            <HistorianPanel
              status={historianStatus}
              active={historianActive}
              opacity={historianOpacity}
            />
          </div>
        )}
      </div>

      {/* Right: Context Inspector */}
      <ContextInspector>
        <ContextStat label="Session" value="ATHENA" mono={false} />
        <ContextStat label="Provider" value="Anthropic" mono={false} />
        <ContextStat label="Model" value="claude-opus-4" />
        <ContextStat
          label="Context Limit"
          value={formatTokens(128000)}
        />
        <ContextStat
          label="Total Tokens"
          value={formatTokens(totalTokens)}
          valueColor={usageColor}
        />
        <ContextBreakdownBar percent={usage} />
        <ContextStat
          label="Cache Tokens"
          value={formatTokens(Math.round(totalTokens * 0.35))}
        />
        <ContextStat
          label="Assistant Messages"
          value={Math.round(
            interpolate(frame, [0, 200], [6, 12], {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            })
          )}
        />
        <ContextStat label="User Messages" value={3} />

        <div
          style={{
            height: 1,
            background: COLORS.panelBorder,
            margin: "4px 16px",
          }}
        />

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
        {RAW_MESSAGES.slice(0, visibleRawMessages).map((rm, i) => {
          // Highlight older messages when historian is scanning
          const isOld = rm.age === "old" && frame > 100;
          return (
            <RawMessageRow
              key={rm.id}
              label={rm.label}
              tokens={rm.tokens}
              age={rm.age}
              highlighted={isOld && frame > 120}
              opacity={fadeIn(frame, i * 4, 8)}
            />
          );
        })}
      </ContextInspector>

      {/* Caption */}
      {frame >= 200 && (
        <CaptionLine
          text="Magic Context: before the session blocks, a background Historian starts working."
          opacity={captionOpacity}
        />
      )}
    </SessionShell>
  );
};
