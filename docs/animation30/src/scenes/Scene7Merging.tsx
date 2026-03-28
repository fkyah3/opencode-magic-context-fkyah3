import React from "react";
import {interpolate as remotionInterpolate} from "remotion";
import {CaptionLine, SceneLabel} from "../components/CaptionLine";
import {CompartmentCard} from "../components/MemoryComponents";
import {COLORS, COMPARTMENT_EXAMPLES} from "../constants";
import {BudgetBar, Eyebrow, FlowLine, FrostCard, SceneBackground} from "./scene-helpers";

const mergeCards = [
  ...COMPARTMENT_EXAMPLES,
  {
    title: "Follow-up cleanup",
    summary: "Bundled adjacent resolver findings into the same historical slice",
  },
];

export const Scene7Merging: React.FC<{frame: number}> = ({frame}) => {
  const budget = remotionInterpolate(frame, [0, 269], [62, 34], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const mergeProgress = remotionInterpolate(frame, [80, 220], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{width: "100%", height: "100%", position: "relative"}}>
      <SceneBackground accent={COLORS.compartmentAccent} accentSecondary={COLORS.magicAccent} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: 54,
          display: "grid",
          gridTemplateColumns: "1fr 140px 1.1fr",
          gap: 24,
          zIndex: 2,
        }}
      >
        <FrostCard style={{padding: 24, display: "flex", flexDirection: "column", gap: 16}} accentColor={`${COLORS.compartmentAccent}66`}>
          <Eyebrow text="Older compartments" color={COLORS.compartmentAccent} />
          <BudgetBar label="History budget" value={budget} color={COLORS.compartmentAccent} />
          <div style={{display: "grid", gap: 14, marginTop: 8}}>
            {mergeCards.map((item, index) => {
              const delay = index * 14;
              const progress = remotionInterpolate(frame, [40 + delay, 188 + delay], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const slideX = remotionInterpolate(frame, [92 + delay, 220 + delay], [0, 250], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const slideY = remotionInterpolate(frame, [92 + delay, 220 + delay], [0, -46 + index * 12], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <div
                  key={item.title}
                  style={{
                    opacity: progress * (1 - mergeProgress * 0.72),
                    transform: `translate(${slideX}px, ${slideY}px) scale(${0.98 + progress * 0.02})`,
                  }}
                >
                  <CompartmentCard title={item.title} summary={item.summary} index={index} />
                </div>
              );
            })}
          </div>
        </FrostCard>

        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16}}>
          <Eyebrow text="merge" color={COLORS.magicAccent} />
          <FlowLine color={COLORS.magicAccent} style={{width: 110}} />
          <div style={{fontSize: 42, color: COLORS.magicAccent}}>⟶</div>
        </div>

        <FrostCard style={{padding: 28, display: "flex", flexDirection: "column", justifyContent: "center", gap: 18}} accentColor={`${COLORS.magicAccent}66`}>
          <Eyebrow text="Merged historical compartment" color={COLORS.magicAccent} />
          <div style={{fontSize: 32, fontWeight: 800, color: COLORS.textPrimary, lineHeight: 1.2}}>
            Consolidated resolver guard history
          </div>
          <div style={{fontSize: 15, lineHeight: 1.7, color: COLORS.textSecondary}}>
            Older, already-compressed compartments can be merged again so the history layer keeps shrinking as the session ages.
          </div>
          <div
            style={{
              padding: 16,
              borderRadius: 14,
              backgroundColor: `${COLORS.magicAccent}10`,
              border: `1px solid ${COLORS.magicAccent}30`,
              fontSize: 13,
              color: COLORS.textPrimary,
              lineHeight: 1.6,
            }}
          >
            Older bug analysis + follow-up scans + final verification collapse into one durable historical segment.
          </div>
        </FrostCard>
      </div>

      <SceneLabel text="Scene 07" subText="Long session merging" visible position="top-left" accentColor={COLORS.compartmentAccent} />
      <CaptionLine
        visible
        accentColor={COLORS.compartmentAccent}
        text="As sessions grow, older compartments can be merged again to save even more space."
      />
    </div>
  );
};
