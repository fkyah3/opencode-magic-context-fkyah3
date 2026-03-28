import React from "react";
import {interpolate as remotionInterpolate} from "remotion";
import {CompartmentCard, FactChip, MemoryCard} from "../components/MemoryComponents";
import {HistorianPanel} from "../components/HistorianPanel";
import {TranscriptPane} from "../components/TranscriptPane";
import {COLORS, COMPARTMENT_EXAMPLES, FACT_EXAMPLES, MEMORY_EXAMPLES, SCENE3_TRANSCRIPT} from "../constants";
import {Eyebrow, FrostCard, MetricPill, SceneBackground, extendTranscript} from "./scene-helpers";

const finalTranscript = extendTranscript(SCENE3_TRANSCRIPT, 11);

export const Scene11Final: React.FC<{frame: number}> = ({frame}) => {
  const reveal = remotionInterpolate(frame, [0, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{width: "100%", height: "100%", position: "relative", overflow: "hidden"}}>
      <SceneBackground accent={COLORS.magicGlow} accentSecondary={COLORS.historianGlow} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            `radial-gradient(circle at 50% 52%, ${COLORS.magicGlow}14 0%, transparent 28%), ` +
            `linear-gradient(180deg, transparent 0%, rgba(10,10,15,0.66) 100%)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: 54,
          display: "grid",
          gridTemplateColumns: "1.2fr 500px",
          gridTemplateRows: "1fr auto",
          gap: 22,
          zIndex: 2,
          opacity: 0.3 + reveal * 0.7,
          transform: `scale(${0.97 + reveal * 0.03})`,
        }}
      >
        <FrostCard style={{padding: 24, display: "flex", flexDirection: "column", gap: 16}} accentColor={`${COLORS.magicAccent}66`}>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Eyebrow text="Active session" color={COLORS.magicAccent} />
            <MetricPill label="state" value="still in flow" color={COLORS.success} />
          </div>
          <div style={{flex: 1}}>
            <TranscriptPane entries={finalTranscript} visibleEntries={finalTranscript.length} scrollOffset={22} sessionName="MAIN AGENT" />
          </div>
        </FrostCard>

        <div style={{display: "flex", flexDirection: "column", gap: 18}}>
          <HistorianPanel
            status="complete"
            progress={100}
            message="Background Historian keeps rewriting the past into structured context"
          />

          <FrostCard style={{padding: 22, display: "flex", flexDirection: "column", gap: 14}} accentColor={`${COLORS.compartmentAccent}66`}>
            <Eyebrow text="Structured context" color={COLORS.compartmentAccent} />
            <CompartmentCard title={COMPARTMENT_EXAMPLES[0].title} summary={COMPARTMENT_EXAMPLES[0].summary} />
            <div style={{display: "flex", flexWrap: "wrap", gap: 10}}>
              {FACT_EXAMPLES.slice(0, 3).map((fact, index) => (
                <FactChip key={fact} text={fact} index={index} />
              ))}
            </div>
            <MemoryCard text={MEMORY_EXAMPLES[0]} />
          </FrostCard>
        </div>

        <div
          style={{
            gridColumn: "1 / span 2",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 10,
          }}
        >
          <div style={{fontSize: 18, letterSpacing: "0.18em", textTransform: "uppercase", color: COLORS.magicAccent, marginBottom: 14}}>
            opencode-magic-context
          </div>
          <div style={{fontSize: 54, fontWeight: 850, color: COLORS.textPrimary, textAlign: "center", lineHeight: 1.18, maxWidth: 1100}}>
            Keep the main agent in flow. Let Magic Context handle the past.
          </div>
        </div>
      </div>
    </div>
  );
};
