import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import {
  COLORS,
  FONT,
  FONT_SIZE,
  COMPARTMENTS,
  FACTS,
  MEMORIES,
  MAGIC_TRANSCRIPT,
} from "../constants";
import { SessionShell } from "../components/SessionShell";
import { SessionHeader } from "../components/SessionHeader";
import { TranscriptPane } from "../components/TranscriptPane";
import { AssistantBlock } from "../components/AssistantBlock";
import { ActionRow } from "../components/ActionRow";
import { InputBar } from "../components/InputBar";
import { HistorianPanel } from "../components/HistorianPanel";
import { CompartmentCard } from "../components/CompartmentCard";
import { FactChip } from "../components/FactChip";
import { MemoryCard } from "../components/MemoryCard";
import { CaptionLine } from "../components/CaptionLine";
import { fadeIn, staggerSlideUp } from "../helpers";

/**
 * Scene 5: Historian outputs — compartments, facts, memory.
 * Duration: 390 frames (13.0s)
 *
 * f0–70: Old blocks → Compartments.
 * f71–170: Fact chips peel off.
 * f171–275: Facts promote to Memory.
 * f276–389: Hold all three outputs.
 */
export const Scene5HistorianOutputs: React.FC = () => {
  const frame = useCurrentFrame();

  // ─── Phase tracking ───────────────────────────────────────────────────
  const compartmentPhase = frame >= 0 && frame < 170;
  const factPhase = frame >= 71;
  const memoryPhase = frame >= 171;
  const holdPhase = frame >= 276;

  // ─── Historian status ─────────────────────────────────────────────────
  const historianStatus =
    frame < 70
      ? "Generating compartments..."
      : frame < 170
        ? "Extracting session facts..."
        : frame < 275
          ? "Promoting to memory..."
          : "Compaction complete";

  const historianOpacity = interpolate(frame, [276, 340], [1, 0.4], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // ─── Compartments animation ───────────────────────────────────────────
  const compartmentStagger = 15;
  const visibleCompartments = Math.min(
    COMPARTMENTS.length,
    Math.floor(
      interpolate(frame, [10, 10 + COMPARTMENTS.length * compartmentStagger], [0, COMPARTMENTS.length], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
      })
    )
  );

  // ─── Facts animation ──────────────────────────────────────────────────
  const factStagger = 18;
  const visibleFacts = Math.min(
    FACTS.length,
    Math.floor(
      interpolate(frame, [80, 80 + FACTS.length * factStagger], [0, FACTS.length], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
      })
    )
  );

  // ─── Memory animation ─────────────────────────────────────────────────
  const memoryStagger = 25;
  const visibleMemories = Math.min(
    MEMORIES.length,
    Math.floor(
      interpolate(frame, [180, 180 + MEMORIES.length * memoryStagger], [0, MEMORIES.length], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
      })
    )
  );

  // ─── Live tail activity ───────────────────────────────────────────────
  const tailEntries = MAGIC_TRANSCRIPT.slice(-4);
  const visibleTail = Math.min(
    tailEntries.length,
    Math.floor(
      interpolate(frame, [50, 350], [1, tailEntries.length], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
      })
    )
  );

  // ─── Caption ──────────────────────────────────────────────────────────
  const captionOpacity = fadeIn(frame, 310, 20);

  return (
    <SessionShell>
      {/* Left column: transcript + historian */}
      <div
        style={{
          width: "42%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 1,
        }}
      >
        <SessionHeader sessionName="ATHENA" status="active" />
        <TranscriptPane width="100%">
          {/* Modest live tail activity */}
          {tailEntries.slice(0, visibleTail).map((entry, i) => {
            const opacity = fadeIn(frame, 50 + i * 50, 15);
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
              <AssistantBlock
                key={entry.id}
                text={entry.content}
                opacity={opacity}
              />
            );
          })}
        </TranscriptPane>
        <InputBar />

        {/* Historian panel */}
        <div
          style={{
            position: "absolute",
            bottom: 56,
            left: 12,
            zIndex: 20,
          }}
        >
          <HistorianPanel
            status={historianStatus}
            active={frame < 276}
            opacity={historianOpacity}
          />
        </div>
      </div>

      {/* Right column: Structured outputs */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          padding: "16px 0",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {/* Compartments section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 4px",
              opacity: fadeIn(frame, 5, 15),
            }}
          >
            <div
              style={{
                width: 4,
                height: 14,
                borderRadius: 2,
                background: COLORS.compartmentAccent,
              }}
            />
            <span
              style={{
                fontSize: FONT_SIZE.xs,
                fontWeight: 600,
                color: COLORS.compartmentAccent,
                textTransform: "uppercase",
                letterSpacing: 1,
                fontFamily: FONT.mono,
              }}
            >
              Compartments
            </span>
          </div>
          {COMPARTMENTS.slice(0, visibleCompartments).map((c, i) => {
            const anim = staggerSlideUp(frame, i, compartmentStagger, 15, 14);
            return (
              <CompartmentCard
                key={c.id}
                title={c.title}
                lineCount={c.lineCount}
                opacity={anim.opacity}
                translateY={anim.translateY}
              />
            );
          })}
        </div>

        {/* Facts section */}
        {frame >= 71 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              opacity: fadeIn(frame, 71, 15),
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "0 4px",
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 14,
                  borderRadius: 2,
                  background: COLORS.factAccent,
                }}
              />
              <span
                style={{
                  fontSize: FONT_SIZE.xs,
                  fontWeight: 600,
                  color: COLORS.factAccent,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontFamily: FONT.mono,
                }}
              >
                Session Facts
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {FACTS.slice(0, visibleFacts).map((f, i) => {
                const anim = staggerSlideUp(
                  frame - 80,
                  i,
                  factStagger,
                  12,
                  10
                );
                return (
                  <FactChip
                    key={f.id}
                    text={f.text}
                    opacity={anim.opacity}
                    translateY={anim.translateY}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Memory section */}
        {frame >= 171 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              opacity: fadeIn(frame, 171, 15),
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "0 4px",
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 14,
                  borderRadius: 2,
                  background: COLORS.memoryAccent,
                }}
              />
              <span
                style={{
                  fontSize: FONT_SIZE.xs,
                  fontWeight: 600,
                  color: COLORS.memoryAccent,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontFamily: FONT.mono,
                }}
              >
                Memory
              </span>
            </div>
            {MEMORIES.slice(0, visibleMemories).map((m, i) => {
              const anim = staggerSlideUp(
                frame - 180,
                i,
                memoryStagger,
                15,
                12
              );
              return (
                <MemoryCard
                  key={m.id}
                  category={m.category}
                  text={m.text}
                  opacity={anim.opacity}
                  translateY={anim.translateY}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Caption */}
      {frame >= 310 && (
        <CaptionLine
          text="Old session weight becomes structured context: compartments, facts, and memory."
          opacity={captionOpacity}
        />
      )}
    </SessionShell>
  );
};
