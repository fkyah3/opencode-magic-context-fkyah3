import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS, FONT, FONT_SIZE, COMPARTMENTS } from "../constants";
import { SessionShell } from "../components/SessionShell";
import { SessionHeader } from "../components/SessionHeader";
import { TranscriptPane } from "../components/TranscriptPane";
import { AssistantBlock } from "../components/AssistantBlock";
import { ActionRow } from "../components/ActionRow";
import { InputBar } from "../components/InputBar";
import { CompartmentCard } from "../components/CompartmentCard";
import { CaptionLine } from "../components/CaptionLine";
import { fadeIn, fadeOut, ease, pulse } from "../helpers";

/**
 * Scene 7: Long-session sustainability — older compartments merge.
 * Duration: 270 frames (9.0s)
 *
 * f0–80: History Budget indicator glows.
 * f81–180: Older compartments merge into denser archive block.
 * f181–269: Upper history takes less space. System sustainable.
 */
export const Scene7CompartmentMerge: React.FC = () => {
  const frame = useCurrentFrame();

  // ─── History Budget animation ─────────────────────────────────────────
  const budgetGlow = interpolate(frame, [0, 40, 80], [0, 0.8, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const budgetPulse = frame < 80 ? pulse(frame, 30) * 0.4 : 0;
  const budgetPercent = interpolate(frame, [0, 80], [78, 88], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // ─── Merge animation ──────────────────────────────────────────────────
  const mergeProgress = interpolate(frame, [90, 160], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  // Individual compartment cards collapse
  const cardScales = COMPARTMENTS.map((_, i) => {
    const start = 90 + i * 12;
    return interpolate(frame, [start, start + 30], [1, 0], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.in(Easing.quad),
    });
  });
  const cardOpacities = COMPARTMENTS.map((_, i) => {
    const start = 90 + i * 12;
    return interpolate(frame, [start, start + 30], [1, 0], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    });
  });

  // Merged card appears
  const mergedCardOpacity = fadeIn(frame, 145, 20);
  const mergedCardScale = interpolate(frame, [145, 175], [0.8, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // ─── Budget relief after merge ────────────────────────────────────────
  const postMergeBudget = interpolate(frame, [160, 200], [88, 52], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const finalBudget = frame < 160 ? budgetPercent : postMergeBudget;

  // ─── Caption ──────────────────────────────────────────────────────────
  const captionOpacity = fadeIn(frame, 200, 20);

  return (
    <SessionShell>
      {/* Left: Transcript (muted, showing system is live) */}
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
            text="The fix is verified. Self-recursion is now blocked at both delegation paths."
            dimmed
            opacity={0.5}
          />
          <ActionRow text="Called lsp_diagnostics" kind="call" opacity={0.5} />
          {frame > 200 && (
            <AssistantBlock
              text="Moving on to the next task in the session..."
              opacity={fadeIn(frame, 210, 15)}
            />
          )}
        </TranscriptPane>
        <InputBar />
      </div>

      {/* Right: Compartment history zone */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          padding: 16,
          zIndex: 1,
        }}
      >
        {/* History Budget indicator */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            padding: "12px 16px",
            background: COLORS.panelBg,
            borderRadius: 8,
            border: `1px solid ${frame < 160 ? `${COLORS.oldWayAmber}${Math.round((budgetGlow + budgetPulse) * 100)
              .toString(16)
              .padStart(2, "0")}` : COLORS.panelBorder}`,
            boxShadow:
              frame < 160
                ? `0 0 ${12 + budgetPulse * 8}px ${COLORS.oldWayAmber}22`
                : undefined,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: FONT_SIZE.xs,
                fontWeight: 600,
                color:
                  frame < 160
                    ? COLORS.oldWayAmber
                    : COLORS.successGreen,
                textTransform: "uppercase",
                letterSpacing: 1,
                fontFamily: FONT.mono,
              }}
            >
              History Budget
            </span>
            <span
              style={{
                fontSize: FONT_SIZE.xs,
                fontWeight: 700,
                color:
                  frame < 160
                    ? COLORS.oldWayAmber
                    : COLORS.successGreen,
                fontFamily: FONT.mono,
              }}
            >
              {Math.round(finalBudget)}%
            </span>
          </div>
          <div
            style={{
              height: 4,
              borderRadius: 2,
              background: COLORS.contextTrack,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${finalBudget}%`,
                height: "100%",
                borderRadius: 2,
                background:
                  frame < 160
                    ? COLORS.oldWayAmber
                    : COLORS.successGreen,
              }}
            />
          </div>
          {frame < 80 && (
            <span
              style={{
                fontSize: 10,
                color: COLORS.oldWayAmber,
                fontFamily: FONT.mono,
                opacity: budgetGlow,
              }}
            >
              History budget nearing threshold
            </span>
          )}
        </div>

        {/* Compartment cards (collapse on merge) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            position: "relative",
          }}
        >
          <span
            style={{
              fontSize: FONT_SIZE.xs,
              fontWeight: 600,
              color: COLORS.compartmentAccent,
              textTransform: "uppercase",
              letterSpacing: 1,
              fontFamily: FONT.mono,
              padding: "0 4px",
            }}
          >
            Historical Compartments
          </span>

          {/* Individual cards (fade out during merge) */}
          {COMPARTMENTS.map((c, i) => (
            <CompartmentCard
              key={c.id}
              title={c.title}
              lineCount={c.lineCount}
              opacity={cardOpacities[i]}
              scale={cardScales[i]}
            />
          ))}

          {/* Merged archive card */}
          {frame >= 145 && (
            <CompartmentCard
              title="Archive — Recursion + Delegation + Fix + Validation"
              lineCount={124}
              opacity={mergedCardOpacity}
              scale={mergedCardScale}
              merged
            />
          )}
        </div>
      </div>

      {/* Caption */}
      {frame >= 200 && (
        <CaptionLine
          text="As sessions grow, older compartments can be merged again to save even more space."
          opacity={captionOpacity}
        />
      )}
    </SessionShell>
  );
};
