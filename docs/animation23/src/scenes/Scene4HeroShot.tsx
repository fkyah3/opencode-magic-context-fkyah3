import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS, FONT, FONT_SIZE, MAGIC_TRANSCRIPT, RAW_MESSAGES } from "../constants";
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
import { fadeIn, fadeOut, ease, getUsageColor, formatTokens, pulse } from "../helpers";

/**
 * Scene 4: HERO SHOT — Historian takes from head while tail keeps growing.
 * Duration: 360 frames (12.0s)
 *
 * THE most important scene.
 *
 * f0–60: Historian selects older region. Bracket over older blocks.
 * f61–160: Historian pulls old material out. Blocks lift/flow into Historian.
 * f161–260: Historian processing. "Compartmentalizing", "Extracting facts", "Promoting memory".
 * f261–359: Hold architecture. Head rewritten, tail still written.
 */
export const Scene4HeroShot: React.FC = () => {
  const frame = useCurrentFrame();

  // ─── Age structure: older entries at top, newer at bottom ─────────────
  // We show a longer transcript with clear age bands
  const olderEntries = MAGIC_TRANSCRIPT.slice(0, 5);
  const newerEntries = MAGIC_TRANSCRIPT.slice(5);

  // ─── Selection bracket animation (f0–60) ──────────────────────────────
  const selectionOpacity = interpolate(
    frame,
    [10, 40, 160, 180],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // ─── Older blocks lift animation (f61–160) ────────────────────────────
  const liftProgress = interpolate(frame, [61, 140], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const olderOpacity = interpolate(frame, [61, 160], [1, 0.15], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const olderScale = interpolate(frame, [61, 140], [1, 0.85], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const olderTranslateX = interpolate(frame, [80, 160], [0, -40], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // ─── Raw message highlighting and pull ────────────────────────────────
  const rawMsgPullProgress = interpolate(frame, [80, 160], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  // ─── New entries continue at tail ─────────────────────────────────────
  const newEntryCount = Math.min(
    newerEntries.length,
    Math.floor(
      interpolate(frame, [0, 300], [2, newerEntries.length], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
      })
    )
  );

  // ─── Usage stays alive but doesn't spike ──────────────────────────────
  const usage = interpolate(
    frame,
    [0, 100, 200, 359],
    [91, 92, 90, 88],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  const totalTokens = Math.round(
    interpolate(frame, [0, 359], [116000, 113000], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    })
  );

  // ─── Historian status cycle ───────────────────────────────────────────
  const historianStatus =
    frame < 60
      ? "Selected history range"
      : frame < 120
        ? "Pulling older session material"
        : frame < 200
          ? "Compartmentalizing session history"
          : frame < 250
            ? "Extracting durable facts"
            : "Promoting stable memory";

  const historianActive = frame > 30;

  // ─── Processing lane visual ───────────────────────────────────────────
  const processingLaneOpacity = interpolate(
    frame,
    [60, 90, 260, 300],
    [0, 0.8, 0.8, 0.4],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // ─── Caption ──────────────────────────────────────────────────────────
  const captionOpacity = fadeIn(frame, 280, 20);

  // ─── Scroll for new entries ───────────────────────────────────────────
  const scrollOffset = interpolate(frame, [100, 300], [0, 60], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <SessionShell>
      {/* Left: Transcript with age structure */}
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
          {/* Age band: HEAD (older) */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {/* Selection bracket */}
            {frame >= 10 && (
              <div
                style={{
                  position: "absolute",
                  top: -4,
                  left: -8,
                  bottom: -4,
                  width: 3,
                  borderRadius: 2,
                  background: COLORS.historianLight,
                  opacity: selectionOpacity,
                  boxShadow: `0 0 8px ${COLORS.historianLight}`,
                }}
              />
            )}

            {/* "Selected history range" label */}
            {frame >= 20 && frame < 180 && (
              <div
                style={{
                  position: "absolute",
                  top: -18,
                  left: 4,
                  fontSize: 9,
                  color: COLORS.historianLight,
                  fontFamily: "'JetBrains Mono', monospace",
                  opacity: selectionOpacity,
                  textTransform: "uppercase" as const,
                  letterSpacing: 0.8,
                }}
              >
                Selected history range
              </div>
            )}

            {/* Older entries that get pulled */}
            {olderEntries.map((entry, i) => {
              const itemOpacity =
                frame > 61
                  ? olderOpacity
                  : fadeIn(frame, 0, 10);
              const itemScale = frame > 61 ? olderScale : 1;
              const tx = frame > 61 ? olderTranslateX : 0;

              const content = (
                <div
                  key={entry.id}
                  style={{
                    opacity: itemOpacity,
                    transform: `scale(${itemScale}) translateX(${tx}px)`,
                    transformOrigin: "left center",
                  }}
                >
                  {entry.type === "user" ? (
                    <UserBubble text={entry.content} />
                  ) : entry.type === "action" ? (
                    <ActionRow
                      text={entry.content}
                      kind={entry.actionKind || "explore"}
                    />
                  ) : (
                    <AssistantBlock text={entry.content} dimmed={frame > 100} />
                  )}
                </div>
              );
              return content;
            })}

            {/* Age divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "4px 0",
                opacity: 0.5,
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: `linear-gradient(90deg, ${COLORS.panelBorder}, transparent)`,
                }}
              />
              <span
                style={{
                  fontSize: 9,
                  color: COLORS.textDim,
                  fontFamily: "'JetBrains Mono', monospace",
                  textTransform: "uppercase" as const,
                  letterSpacing: 1,
                }}
              >
                older ↑ · newer ↓
              </span>
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: `linear-gradient(90deg, transparent, ${COLORS.panelBorder})`,
                }}
              />
            </div>
          </div>

          {/* Age band: TAIL (newer/live) — keeps growing */}
          {newerEntries.slice(0, newEntryCount).map((entry, i) => {
            const start = 30 + i * 30;
            const opacity = fadeIn(frame, start, 15);
            const ty = interpolate(
              frame,
              [start, start + 15],
              [12, 0],
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

        {/* Processing lane overlay (bottom) */}
        {frame >= 60 && (
          <div
            style={{
              position: "absolute",
              bottom: 56,
              left: 16,
              right: 16,
              zIndex: 20,
            }}
          >
            <HistorianPanel
              status={historianStatus}
              active={historianActive}
              opacity={processingLaneOpacity}
              details={
                frame > 120
                  ? [
                      `Processing ${olderEntries.length} older entries`,
                      `${RAW_MESSAGES.filter((r) => r.age === "old").length} related raw messages`,
                    ]
                  : undefined
              }
            />
          </div>
        )}
      </div>

      {/* Right: Context Inspector */}
      <ContextInspector>
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
        <ContextBreakdownBar percent={usage} />
        <ContextStat
          label="Cache Tokens"
          value={formatTokens(Math.round(totalTokens * 0.35))}
        />
        <ContextStat
          label="Assistant Msgs"
          value={Math.round(
            interpolate(frame, [0, 300], [10, 14], {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            })
          )}
        />

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
        {RAW_MESSAGES.map((rm, i) => {
          const isOldMessage = rm.age === "old";
          const pulling = isOldMessage && frame > 80;
          const pullOpacity = pulling
            ? interpolate(frame, [80, 160], [1, 0.3], {
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp",
              })
            : 1;

          return (
            <RawMessageRow
              key={rm.id}
              label={rm.label}
              tokens={rm.tokens}
              age={rm.age}
              highlighted={isOldMessage && frame >= 20 && frame < 160}
              opacity={pullOpacity}
            />
          );
        })}
      </ContextInspector>

      {/* Caption */}
      {frame >= 280 && (
        <CaptionLine
          text="Historian rewrites the head. The live session keeps moving on the tail."
          opacity={captionOpacity}
        />
      )}
    </SessionShell>
  );
};
