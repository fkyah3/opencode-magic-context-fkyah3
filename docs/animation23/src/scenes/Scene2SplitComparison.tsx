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
import { fadeIn, ease, getUsageColor, formatTokens } from "../helpers";

/**
 * Scene 2: Split comparison bridge.
 * Duration: 120 frames (4.0s)
 *
 * f0–35: Old UI shrinks to left panel. Magic Context appears right.
 * f36–75: Contrast: left blocked, right moving. Historian label appears.
 * f76–119: Camera commits to right side. Left fades.
 */
export const Scene2SplitComparison: React.FC = () => {
  const frame = useCurrentFrame();

  // ─── Split animation ──────────────────────────────────────────────────
  const splitProgress = interpolate(frame, [0, 35], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  // Left panel dims and shrinks
  const leftOpacity = interpolate(frame, [76, 119], [0.5, 0.15], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const leftScale = interpolate(frame, [76, 119], [1, 0.92], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Right panel grows
  const rightOpacity = interpolate(frame, [10, 40], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const rightScale = interpolate(frame, [76, 119], [1, 1.04], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // ─── Right side usage animation ───────────────────────────────────────
  const rightUsage = interpolate(frame, [36, 75], [72, 90], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const rightTokens = Math.round(
    interpolate(frame, [36, 75], [92000, 115000], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    })
  );

  // ─── Historian label appearance ───────────────────────────────────────
  const historianOpacity = fadeIn(frame, 55, 20);

  // ─── Visible Magic Context entries ────────────────────────────────────
  const visibleEntries = Math.min(
    4,
    Math.floor(interpolate(frame, [20, 70], [1, 4], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }))
  );

  // ─── Labels ──────────────────────────────────────────────────────────
  const labelOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const labelFadeOut = interpolate(frame, [90, 119], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <SessionShell>
      {/* Labels */}
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 300,
          zIndex: 50,
          opacity: labelOpacity * labelFadeOut,
        }}
      >
        <div
          style={{
            padding: "4px 16px",
            borderRadius: 4,
            background: `${COLORS.oldWayRed}22`,
            border: `1px solid ${COLORS.oldWayRed}44`,
          }}
        >
          <span
            style={{
              fontSize: FONT_SIZE.xs,
              fontWeight: 600,
              color: COLORS.oldWayAmber,
              fontFamily: FONT.mono,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Old Way
          </span>
        </div>
        <div
          style={{
            padding: "4px 16px",
            borderRadius: 4,
            background: `${COLORS.magicCyan}22`,
            border: `1px solid ${COLORS.magicCyan}44`,
          }}
        >
          <span
            style={{
              fontSize: FONT_SIZE.xs,
              fontWeight: 600,
              color: COLORS.magicCyan,
              fontFamily: FONT.mono,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Magic Context
          </span>
        </div>
      </div>

      {/* Left: Old Way (frozen/blocked) */}
      <div
        style={{
          width: `${interpolate(splitProgress, [0, 1], [100, 48])}%`,
          opacity: leftOpacity,
          transform: `scale(${leftScale})`,
          transformOrigin: "left center",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 1,
          filter: "saturate(0.5)",
        }}
      >
        <SessionHeader
          sessionName="ATHENA"
          status="blocked"
          statusColor={COLORS.contextDanger}
        />
        <TranscriptPane>
          <AssistantBlock
            text="The user is saying that athena-junior can spawn another..."
            dimmed
          />
          <ActionRow text="Explored 1 read, 2 searches" kind="explore" opacity={0.4} />
          <AssistantBlock text="I see the issue. There are guards for..." dimmed />
        </TranscriptPane>
        <InputBar />

        {/* Stalled overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `${COLORS.bg}66`,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: COLORS.contextDanger,
              fontFamily: FONT.mono,
              opacity: 0.8,
            }}
          >
            Compacting history...
          </div>
        </div>
      </div>

      {/* Right: Magic Context (active) */}
      <div
        style={{
          width: `${interpolate(splitProgress, [0, 1], [0, 48])}%`,
          opacity: rightOpacity,
          transform: `scale(${rightScale})`,
          transformOrigin: "right center",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 2,
          overflow: "hidden",
        }}
      >
        <SessionHeader sessionName="ATHENA" status="active" />
        <TranscriptPane>
          {MAGIC_TRANSCRIPT.slice(0, visibleEntries).map((entry, i) => {
            const opacity = fadeIn(frame, 25 + i * 10, 12);
            if (entry.type === "user")
              return <UserBubble key={entry.id} text={entry.content} opacity={opacity} />;
            if (entry.type === "action")
              return (
                <ActionRow
                  key={entry.id}
                  text={entry.content}
                  kind={entry.actionKind || "explore"}
                  opacity={opacity}
                />
              );
            return (
              <AssistantBlock key={entry.id} text={entry.content} opacity={opacity} />
            );
          })}
        </TranscriptPane>
        <InputBar />

        {/* Historian label */}
        {frame >= 55 && (
          <div
            style={{
              position: "absolute",
              bottom: 56,
              right: 12,
              opacity: historianOpacity,
              padding: "4px 10px",
              borderRadius: 4,
              background: COLORS.historianBg,
              border: `1px solid ${COLORS.historianBorder}`,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: COLORS.historianLight,
                boxShadow: `0 0 4px ${COLORS.historianLight}`,
              }}
            />
            <span
              style={{
                fontSize: 10,
                color: COLORS.historianLight,
                fontFamily: FONT.mono,
                fontWeight: 600,
              }}
            >
              Historian (background)
            </span>
          </div>
        )}
      </div>
    </SessionShell>
  );
};
