import React from "react";
import {interpolate as remotionInterpolate} from "remotion";
import {CaptionLine, SceneLabel} from "../components/CaptionLine";
import {HistorianPanel} from "../components/HistorianPanel";
import {CompartmentCard, FactChip, MemoryCard} from "../components/MemoryComponents";
import {SessionHeader, SessionShell} from "../components/SessionShell";
import {TranscriptPane} from "../components/TranscriptPane";
import {
  COLORS,
  COMPARTMENT_EXAMPLES,
  FACT_EXAMPLES,
  MEMORY_EXAMPLES,
  SCENE3_TRANSCRIPT,
} from "../constants";
import {Eyebrow, FlowLine, FrostCard, MetricPill, SceneBackground, extendTranscript} from "./scene-helpers";

const transcript = extendTranscript(SCENE3_TRANSCRIPT, 10);

export const Scene5Outputs: React.FC<{frame: number}> = ({frame}) => {
  const compartmentReveal = remotionInterpolate(frame, [24, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const factsReveal = remotionInterpolate(frame, [110, 230], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const memoryReveal = remotionInterpolate(frame, [200, 330], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{width: "100%", height: "100%", position: "relative"}}>
      <SceneBackground accent={COLORS.compartmentAccent} accentSecondary={COLORS.memoryAccent} />

      <SessionShell style={{position: "relative", zIndex: 2}}>
        <SessionHeader
          title="Historian outputs"
          subtitle="Raw transcript weight becomes compact, reusable artifacts"
          badge="structured context"
          badgeColor={COLORS.compartmentAccent}
        />

        <div style={{display: "flex", flex: 1, gap: 24}}>
          <div style={{width: 470, display: "flex", flexDirection: "column", gap: 16}}>
            <MetricPill label="source" value="older session weight" color={COLORS.historianAccent} />
            <div style={{position: "relative", flex: 1}}>
              <TranscriptPane
                entries={transcript}
                visibleEntries={transcript.length}
                scrollOffset={0}
                highlightRange={{start: 0, end: 4}}
                sessionName="HEAD SLICE"
              />
            </div>
            <HistorianPanel
              status="complete"
              progress={100}
              message="Compartment, fact, and memory artifacts emitted"
            />
          </div>

          <div style={{width: 120, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 18}}>
            <Eyebrow text="rewrite" color={COLORS.historianAccent} />
            <FlowLine color={COLORS.historianAccent} style={{width: 100}} />
            <FlowLine color={COLORS.factAccent} style={{width: 86}} />
            <FlowLine color={COLORS.memoryAccent} style={{width: 100}} />
          </div>

          <div style={{flex: 1, display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 18}}>
            <FrostCard style={{padding: 22, display: "flex", flexDirection: "column", gap: 16}} accentColor={`${COLORS.compartmentAccent}66`}>
              <Eyebrow text="Compartments" color={COLORS.compartmentAccent} />
              <div style={{display: "grid", gap: 12, marginTop: 4}}>
                {COMPARTMENT_EXAMPLES.map((item, index) => {
                  const progress = remotionInterpolate(frame, [24 + index * 26, 96 + index * 26], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  });
                  return (
                    <div
                      key={item.title}
                      style={{
                        opacity: progress * compartmentReveal,
                        transform: `translateY(${(1 - progress) * 22}px) scale(${0.96 + progress * 0.04})`,
                      }}
                    >
                      <CompartmentCard title={item.title} summary={item.summary} index={index} />
                    </div>
                  );
                })}
              </div>
            </FrostCard>

            <FrostCard style={{padding: 22, display: "flex", flexDirection: "column", gap: 18}} accentColor={`${COLORS.factAccent}66`}>
              <Eyebrow text="Facts" color={COLORS.factAccent} />
              <div style={{display: "flex", flexWrap: "wrap", gap: 10}}>
                {FACT_EXAMPLES.map((fact, index) => {
                  const progress = remotionInterpolate(frame, [110 + index * 18, 186 + index * 18], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  });
                  return (
                    <div
                      key={fact}
                      style={{
                        opacity: progress * factsReveal,
                        transform: `translateY(${(1 - progress) * 18}px)`,
                      }}
                    >
                      <FactChip text={fact} index={index} />
                    </div>
                  );
                })}
              </div>

              <Eyebrow text="Memory" color={COLORS.memoryAccent} style={{marginTop: 8}} />
              <div style={{display: "grid", gap: 10}}>
                {MEMORY_EXAMPLES.map((item, index) => {
                  const progress = remotionInterpolate(frame, [212 + index * 20, 300 + index * 20], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  });
                  return (
                    <div
                      key={item}
                      style={{
                        opacity: progress * memoryReveal,
                        transform: `translateX(${(1 - progress) * 24}px)`,
                      }}
                    >
                      <MemoryCard text={item} index={index} />
                    </div>
                  );
                })}
              </div>
            </FrostCard>
          </div>
        </div>
      </SessionShell>

      <SceneLabel text="Scene 05" subText="Historian outputs" visible position="top-left" accentColor={COLORS.compartmentAccent} />
      <CaptionLine
        visible
        accentColor={COLORS.compartmentAccent}
        text="Old session weight becomes structured context: compartments, facts, and memory."
      />
    </div>
  );
};
