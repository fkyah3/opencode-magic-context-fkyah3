import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { spring } from "remotion";
import { GridBackground } from "../components/GridBackground";
import { AgentCard } from "../components/AgentCard";
import { ContextMeter } from "../components/ContextMeter";
import { HistorianPanel } from "../components/HistorianPanel";
import { CompartmentCard } from "../components/CompartmentCard";
import { FactChip } from "../components/FactChip";
import { MemoryCard } from "../components/MemoryCard";
import { CaptionLine } from "../components/CaptionLine";
import {
  C,
  FONT,
  LAYOUT,
  AGENT_STATUSES_SCENE4,
  COMPARTMENTS,
  FACTS,
  MEMORIES,
} from "../constants";
import { eased, lerp, fadeIn, stagger, cycleText } from "../utils";

/**
 * Scene 5 — Historian outputs: compartments, facts, memory
 * Frames 0–389 (390 frames / 13.0s)
 *
 * Beat breakdown:
 *   0–70:     Raw messages → compartments
 *   71–170:   Fact chips peel off
 *   171–275:  Facts upgrade to memory
 *   276–389:  All three outputs coexisting
 */
export const Scene5HistorianOutputs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Agent still active (slightly less dominant) ──
  const agentStatus = cycleText(AGENT_STATUSES_SCENE4, frame, 20);

  // ── Historian status ──
  const historianStatus =
    frame < 71
      ? "Compartmentalizing history"
      : frame < 171
        ? "Extracting durable facts"
        : frame < 276
          ? "Promoting stable memory"
          : "Compaction pass complete";

  // ── Context meter ──
  const contextPct = lerp(frame, [0, 389], [88, 72]);

  // ── Compartment animations ──
  const compEntrance = (i: number) =>
    stagger(frame, 10, i, 20, 18);

  // ── Fact chip animations ──
  const factEntrance = (i: number) =>
    stagger(frame, 80, i, 15, 14);

  // ── Memory promotions ──
  const memEntrance = (i: number) =>
    stagger(frame, 190, i, 22, 18);

  // ── Section labels ──
  const compLabelOpacity = fadeIn(frame, 5, 10);
  const factLabelOpacity = fadeIn(frame, 75, 10);
  const memLabelOpacity = fadeIn(frame, 180, 10);

  // ── Caption ──
  const captionOpacity = fadeIn(frame, 310, 15);
  const captionY = eased(frame, [310, 325], [12, 0]);

  return (
    <AbsoluteFill>
      <GridBackground />

      <div
        style={{
          position: "absolute",
          inset: LAYOUT.padding,
          display: "flex",
          flexDirection: "column",
          gap: 20,
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
            width={340}
            height={130}
          />
          <ContextMeter
            percentage={contextPct}
            pulseFrame={frame}
            width={280}
          />
        </div>

        {/* Main content: Historian + Outputs */}
        <div
          style={{
            flex: 1,
            display: "flex",
            gap: 24,
          }}
        >
          {/* Left: Historian panel */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              width: 400,
            }}
          >
            <HistorianPanel
              status={historianStatus}
              active
              pulseFrame={frame}
              width={380}
            />

            {/* Processing indicator */}
            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 12,
                color: C.histViolet,
                opacity: 0.6,
                padding: "0 8px",
              }}
            >
              Processing extracted chunk #001–#036
            </div>
          </div>

          {/* Right: Structured outputs */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 20,
              overflow: "hidden",
            }}
          >
            {/* Section: Compartments */}
            <div>
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 14,
                  fontWeight: 700,
                  color: C.compGreen,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                  opacity: compLabelOpacity,
                }}
              >
                Compartments
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {COMPARTMENTS.map((comp, i) => (
                  <div
                    key={comp.title}
                    style={{
                      opacity: compEntrance(i),
                      transform: `translateY(${(1 - compEntrance(i)) * 16}px)`,
                    }}
                  >
                    <CompartmentCard
                      title={comp.title}
                      tags={comp.tags}
                      density={comp.density}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Session Facts */}
            <div>
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 14,
                  fontWeight: 700,
                  color: C.factCyan,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                  opacity: factLabelOpacity,
                }}
              >
                Session Facts
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                {FACTS.map((fact, i) => (
                  <div
                    key={fact}
                    style={{
                      opacity: factEntrance(i),
                      transform: `translateX(${(1 - factEntrance(i)) * 20}px)`,
                    }}
                  >
                    <FactChip text={fact} />
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Memory */}
            <div>
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 14,
                  fontWeight: 700,
                  color: C.memBlue,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                  opacity: memLabelOpacity,
                }}
              >
                Memory
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {MEMORIES.map((mem, i) => (
                  <div
                    key={mem}
                    style={{
                      opacity: memEntrance(i),
                      transform: `translateY(${(1 - memEntrance(i)) * 12}px)`,
                    }}
                  >
                    <MemoryCard
                      text={mem}
                      promoted={frame > 240 + i * 15}
                      pulseFrame={frame}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <CaptionLine
        text="Old history becomes structured context: compartments, facts, and memory."
        opacity={captionOpacity}
        y={captionY}
      />
    </AbsoluteFill>
  );
};
