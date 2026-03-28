import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS, FONT, FONT_SIZE, MAGIC_TRANSCRIPT, RAW_MESSAGES } from "../constants";
import { SessionShell } from "../components/SessionShell";
import { SessionHeader } from "../components/SessionHeader";
import { TranscriptPane } from "../components/TranscriptPane";
import { AssistantBlock } from "../components/AssistantBlock";
import { ActionRow } from "../components/ActionRow";
import { InputBar } from "../components/InputBar";
import { ContextInspector } from "../components/ContextInspector";
import { ContextStat } from "../components/ContextStat";
import { ContextBreakdownBar } from "../components/ContextBreakdownBar";
import { RawMessageRow } from "../components/RawMessageRow";
import { CaptionLine } from "../components/CaptionLine";
import { fadeIn, ease, getUsageColor, formatTokens } from "../helpers";

/**
 * Scene 6: Payoff — pressure drops, flow intact.
 * Duration: 210 frames (7.0s)
 *
 * f0–70: Usage drops 91%→56%. Payload lighter. Raw Messages reduced.
 * f71–140: Transcript active. New work appears.
 * f141–209: Hold healthy system state.
 */
export const Scene6Payoff: React.FC = () => {
  const frame = useCurrentFrame();

  // ─── Usage drop animation ─────────────────────────────────────────────
  const usage = interpolate(
    frame,
    [0, 70, 209],
    [91, 56, 54],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );
  const totalTokens = Math.round(
    interpolate(frame, [0, 70], [116000, 72000], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    })
  );

  // ─── Relief glow ──────────────────────────────────────────────────────
  const reliefGlow = interpolate(frame, [30, 70, 110], [0, 0.6, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // ─── Raw messages: fewer old ones visible ─────────────────────────────
  const visibleRawMessages = RAW_MESSAGES.filter((rm) => {
    if (rm.age === "old" && frame > 40) return false; // compacted away
    return true;
  });

  // ─── New transcript entries appearing ─────────────────────────────────
  const wrapUpEntries = [
    {
      id: "payoff-a1",
      type: "assistant" as const,
      content:
        "Self-recursion guard is in place and verified. Both direct and category-based paths are protected.",
    },
    {
      id: "payoff-act1",
      type: "action" as const,
      content: "Edit subagent-resolver.ts +8 -0",
      actionKind: "edit" as const,
    },
    {
      id: "payoff-act2",
      type: "action" as const,
      content: "Called lsp_diagnostics",
      actionKind: "call" as const,
    },
  ];

  const visibleWrapUp = Math.min(
    wrapUpEntries.length,
    Math.floor(
      interpolate(frame, [75, 135], [0, wrapUpEntries.length], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
      })
    )
  );

  // ─── Caption ──────────────────────────────────────────────────────────
  const captionOpacity = fadeIn(frame, 160, 20);

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
        <TranscriptPane>
          {/* Show a few existing entries as context */}
          <AssistantBlock
            text="Category-based delegation does not route back to athena-junior. The guard is sufficient."
            opacity={0.6}
            dimmed
          />

          {/* New wrap-up entries */}
          {wrapUpEntries.slice(0, visibleWrapUp).map((entry, i) => {
            const opacity = fadeIn(frame, 80 + i * 20, 15);
            const ty = interpolate(
              frame,
              [80 + i * 20, 80 + i * 20 + 15],
              [10, 0],
              { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
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
      </div>

      {/* Right: Context Inspector showing relief */}
      <ContextInspector
        glowColor={reliefGlow > 0 ? COLORS.successGreen : undefined}
      >
        <ContextStat label="Session" value="ATHENA" mono={false} />
        <ContextStat label="Model" value="claude-opus-4" />
        <ContextStat
          label="Context Limit"
          value={formatTokens(128000)}
        />
        <ContextStat
          label="Total Tokens"
          value={formatTokens(totalTokens)}
          valueColor={getUsageColor(usage)}
        />
        <ContextBreakdownBar
          percent={usage}
          barColor={
            frame > 50 ? COLORS.contextSafe : undefined
          }
        />
        <ContextStat
          label="Cache Tokens"
          value={formatTokens(Math.round(totalTokens * 0.4))}
        />
        <ContextStat label="Assistant Msgs" value={14} />
        <ContextStat label="User Messages" value={4} />

        <div
          style={{
            height: 1,
            background: COLORS.panelBorder,
            margin: "4px 16px",
          }}
        />

        {/* Compaction result hint */}
        {frame > 30 && (
          <div
            style={{
              padding: "4px 16px",
              opacity: fadeIn(frame, 30, 20),
            }}
          >
            <div
              style={{
                padding: "6px 10px",
                borderRadius: 4,
                background: `${COLORS.successGreen}11`,
                border: `1px solid ${COLORS.successGreen}33`,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 10, color: COLORS.successGreen }}>
                ✓
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: COLORS.successGreen,
                  fontFamily: FONT.mono,
                }}
              >
                Historian pass complete
              </span>
            </div>
          </div>
        )}

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
        {visibleRawMessages.map((rm) => (
          <RawMessageRow
            key={rm.id}
            label={rm.label}
            tokens={rm.tokens}
            age={rm.age}
          />
        ))}
      </ContextInspector>

      {/* Caption */}
      {frame >= 160 && (
        <CaptionLine
          text="The main agent never stopped. Flow stayed intact."
          opacity={captionOpacity}
        />
      )}
    </SessionShell>
  );
};
