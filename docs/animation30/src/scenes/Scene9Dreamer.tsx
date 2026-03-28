import React from "react";
import {interpolate as remotionInterpolate} from "remotion";
import {CaptionLine, SceneLabel} from "../components/CaptionLine";
import {CompartmentCard, FactChip, MemoryCard} from "../components/MemoryComponents";
import {COLORS, COMPARTMENT_EXAMPLES, FACT_EXAMPLES, MEMORY_EXAMPLES} from "../constants";
import {DotMatrix, Eyebrow, FlowLine, FrostCard, MetricPill, SceneBackground} from "./scene-helpers";

const maintenanceTasks = [
  "merge overlapping facts",
  "refresh stale memory links",
  "archive old compartments",
  "normalize knowledge edges",
];

export const Scene9Dreamer: React.FC<{frame: number}> = ({frame}) => {
  const sweep = remotionInterpolate(frame, [0, 269], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{width: "100%", height: "100%", position: "relative"}}>
      <SceneBackground accent={COLORS.dreamerAccent} accentSecondary={COLORS.dreamerGlow} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            `radial-gradient(circle at 80% 22%, ${COLORS.dreamerGlow}20 0%, transparent 26%), ` +
            `linear-gradient(180deg, rgba(99,102,241,0.06) 0%, transparent 38%)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: 54,
          display: "grid",
          gridTemplateColumns: "430px 1fr 500px",
          gap: 22,
          zIndex: 2,
        }}
      >
        <FrostCard style={{padding: 24, display: "flex", flexDirection: "column", gap: 18}} accentColor={`${COLORS.dreamerAccent}66`}>
          <Eyebrow text="Dreamer night cycle" color={COLORS.dreamerAccent} />
          <MetricPill label="mode" value="off-hours maintenance" color={COLORS.dreamerAccent} />
          <div style={{display: "grid", gap: 12}}>
            {maintenanceTasks.map((task, index) => {
              const progress = remotionInterpolate(frame, [20 + index * 22, 120 + index * 22], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={task}
                  style={{
                    padding: 14,
                    borderRadius: 12,
                    backgroundColor: `${COLORS.dreamerAccent}10`,
                    border: `1px solid ${COLORS.dreamerAccent}28`,
                    color: COLORS.textPrimary,
                    opacity: progress,
                    transform: `translateX(${(1 - progress) * -22}px)`,
                  }}
                >
                  {task}
                </div>
              );
            })}
          </div>
          <DotMatrix count={24} columns={6} activeCount={Math.round(8 + sweep * 16)} color={COLORS.dreamerAccent} />
        </FrostCard>

        <FrostCard style={{padding: 24, position: "relative", overflow: "hidden"}} accentColor={`${COLORS.dreamerGlow}66`}>
          <Eyebrow text="knowledge layer maintenance" color={COLORS.dreamerGlow} />
          <div style={{position: "absolute", top: 98, left: 34, right: 34, bottom: 34}}>
            {[0, 1, 2].map((lane) => {
              const y = 82 + lane * 116;
              const dotX = remotionInterpolate(frame + lane * 18, [0, 269], [20, 820], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <React.Fragment key={lane}>
                  <FlowLine color={COLORS.dreamerAccent} style={{position: "absolute", top: y, left: 0, right: 0}} />
                  <div
                    style={{
                      position: "absolute",
                      top: y - 10,
                      left: dotX,
                      width: 22,
                      height: 22,
                      borderRadius: 999,
                      backgroundColor: COLORS.dreamerGlow,
                      boxShadow: `0 0 28px ${COLORS.dreamerGlow}`,
                    }}
                  />
                </React.Fragment>
              );
            })}

            {[0, 1, 2, 3].map((column) => {
              const x = 70 + column * 190;
              return (
                <div
                  key={column}
                  style={{
                    position: "absolute",
                    top: 24 + (column % 2) * 86,
                    left: x,
                    width: 82,
                    height: 82,
                    borderRadius: 18,
                    border: `1px solid ${COLORS.dreamerAccent}30`,
                    backgroundColor: `${COLORS.bgCard}`,
                    boxShadow: `0 0 26px rgba(99,102,241,${0.12 + column * 0.03})`,
                  }}
                />
              );
            })}
          </div>
        </FrostCard>

        <FrostCard style={{padding: 24, display: "flex", flexDirection: "column", gap: 16}} accentColor={`${COLORS.memoryAccent}66`}>
          <Eyebrow text="healthy knowledge outputs" color={COLORS.memoryAccent} />
          <CompartmentCard title={COMPARTMENT_EXAMPLES[1].title} summary={COMPARTMENT_EXAMPLES[1].summary} />
          <div style={{display: "flex", flexWrap: "wrap", gap: 10}}>
            {FACT_EXAMPLES.slice(0, 3).map((fact, index) => (
              <FactChip key={fact} text={fact} index={index} />
            ))}
          </div>
          <MemoryCard text={MEMORY_EXAMPLES[1]} />
          <MemoryCard text="Dreamer maintenance: link memory to future session briefings" index={1} />
        </FrostCard>
      </div>

      <SceneLabel text="Scene 09" subText="Dreamer" visible position="top-left" accentColor={COLORS.dreamerAccent} />
      <CaptionLine
        visible
        accentColor={COLORS.dreamerAccent}
        text="Dreamer keeps the knowledge layer healthy between active sessions."
      />
    </div>
  );
};
