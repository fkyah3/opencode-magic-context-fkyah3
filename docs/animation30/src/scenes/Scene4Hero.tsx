import React from "react";
import {interpolate as remotionInterpolate} from "remotion";
import {CaptionLine, SceneLabel} from "../components/CaptionLine";
import {ContextInspector} from "../components/ContextInspector";
import {HistorianPanel} from "../components/HistorianPanel";
import {SessionHeader, SessionShell} from "../components/SessionShell";
import {TranscriptPane} from "../components/TranscriptPane";
import {COLORS, SCENE3_TRANSCRIPT} from "../constants";
import {Eyebrow, FlowLine, FrostCard, MetricPill, SceneBackground, extendTranscript} from "./scene-helpers";

const transcript = extendTranscript(SCENE3_TRANSCRIPT, 14);
const extractedBlocks = [
  "Initial bug report and recursion symptom",
  "Resolver guard analysis and cross-file scan",
  "Verification passes and follow-up constraints",
];
const contextLimit = 128000;

export const Scene4Hero: React.FC<{frame: number}> = ({frame}) => {
  const visibleEntries = Math.round(
    remotionInterpolate(frame, [0, 80, 180, 359], [8, 9, 11, transcript.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const usage = remotionInterpolate(frame, [0, 359], [82, 86], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const historianProgress = remotionInterpolate(frame, [0, 359], [28, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headGlow = remotionInterpolate(frame, [24, 120], [0.22, 0.85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{width: "100%", height: "100%", position: "relative"}}>
      <SceneBackground accent={COLORS.historianAccent} accentSecondary={COLORS.magicAccent} gridOpacity={0.1} />

      <SessionShell style={{position: "relative", zIndex: 2, overflow: "visible"}}>
        <SessionHeader
          title="Magic Context hero shot"
          subtitle="Historian rewrites the head while the main agent keeps advancing"
          badge="simultaneity"
          badgeColor={COLORS.historianAccent}
        />

        <div style={{display: "flex", flex: 1, gap: 24, position: "relative", overflow: "visible"}}>
          <div style={{flex: 1.42, position: "relative", overflow: "visible"}}>
            <TranscriptPane
              entries={transcript}
              visibleEntries={visibleEntries}
              scrollOffset={0}
              highlightRange={{start: 0, end: 4}}
              sessionName="MAIN AGENT"
            />

            <div
              style={{
                position: "absolute",
                top: 86,
                left: 20,
                right: 20,
                height: 260,
                borderRadius: 18,
                border: `1px dashed ${COLORS.historianAccent}`,
                boxShadow: `0 0 40px rgba(125,211,252,${headGlow * 0.28})`,
                backgroundColor: `rgba(125,211,252,${headGlow * 0.05})`,
              }}
            />

            <div style={{position: "absolute", top: 52, left: 24}}>
              <MetricPill label="head" value="selected for rewrite" color={COLORS.historianAccent} />
            </div>
            <div style={{position: "absolute", bottom: 96, left: 24}}>
              <MetricPill label="tail" value="live session continues" color={COLORS.magicAccent} />
            </div>

            {Array.from({length: 3}).map((_, index) => {
              const delay = index * 28;
              const progress = remotionInterpolate(frame, [44 + delay, 176 + delay], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const left = remotionInterpolate(frame, [44 + delay, 176 + delay], [30, 825], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const top = remotionInterpolate(frame, [44 + delay, 176 + delay], [112 + index * 70, 132 + index * 72], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const rotate = remotionInterpolate(frame, [44 + delay, 176 + delay], [-2.5, 1.2], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <FrostCard
                  key={index}
                  accentColor={`${COLORS.historianAccent}88`}
                  style={{
                    position: "absolute",
                    left,
                    top,
                    width: 340,
                    padding: 18,
                    opacity: 0.15 + progress * 0.85,
                    transform: `rotate(${rotate}deg) scale(${0.96 + progress * 0.04})`,
                    zIndex: 12 + index,
                  }}
                >
                  <Eyebrow text={`Head block ${index + 1}`} color={COLORS.historianAccent} />
                  <div
                    style={{
                      marginTop: 10,
                      fontSize: 15,
                      lineHeight: 1.5,
                      color: COLORS.textPrimary,
                    }}
                  >
                    {extractedBlocks[index]}
                  </div>
                </FrostCard>
              );
            })}

            {Array.from({length: 3}).map((_, index) => {
              const delay = index * 38;
              const progress = remotionInterpolate(frame, [138 + delay, 230 + delay], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={`tail-${index}`}
                  style={{
                    position: "absolute",
                    left: 58,
                    right: 64,
                    bottom: 132 - index * 46,
                    height: 30,
                    borderRadius: 999,
                    background: `linear-gradient(90deg, ${COLORS.magicAccent}22 0%, rgba(10,10,15,0) 100%)`,
                    border: `1px solid ${COLORS.magicAccent}35`,
                    opacity: progress,
                    transform: `translateY(${(1 - progress) * 24}px)`,
                    boxShadow: `0 0 24px ${COLORS.magicAccent}22`,
                  }}
                />
              );
            })}
          </div>

          <div style={{width: 540, display: "flex", flexDirection: "column", gap: 18}}>
            <HistorianPanel
              status="processing"
              progress={historianProgress}
              message="Older transcript weight is being rewritten into structured context"
            />

            <FrostCard style={{padding: 22, display: "flex", flexDirection: "column", gap: 16}} accentColor={`${COLORS.historianAccent}55`}>
              <Eyebrow text="rewrite pipeline" color={COLORS.historianAccent} />
              <div style={{display: "grid", gap: 14}}>
                {[
                  ["Select head", "Pick older, stable transcript blocks"],
                  ["Rewrite", "Turn raw sequence into compressed narrative"],
                  ["Emit context", "Compartment, facts, and memory artifacts"],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    style={{
                      padding: 14,
                      borderRadius: 12,
                      backgroundColor: COLORS.bgCard,
                      border: `1px solid ${COLORS.border}`,
                    }}
                  >
                    <div style={{fontSize: 13, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 6}}>{title}</div>
                    <div style={{fontSize: 12, lineHeight: 1.5, color: COLORS.textSecondary}}>{text}</div>
                  </div>
                ))}
              </div>
              <FlowLine color={COLORS.historianAccent} />
            </FrostCard>

            <ContextInspector
              usage={usage}
              totalTokens={Math.round((usage / 100) * contextLimit)}
              contextLimit={contextLimit}
              cacheTokens={31840}
              assistantMessages={9}
              userMessages={3}
              rawMessagesCount={14}
              isMagicContext
            />
          </div>
        </div>
      </SessionShell>

      <SceneLabel text="Scene 04" subText="Hero shot" visible position="top-left" accentColor={COLORS.historianAccent} />
      <CaptionLine
        visible
        accentColor={COLORS.historianAccent}
        text="Historian rewrites the head. The live session keeps moving on the tail."
      />
    </div>
  );
};
