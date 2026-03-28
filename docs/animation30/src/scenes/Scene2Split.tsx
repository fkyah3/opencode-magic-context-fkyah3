import React from "react";
import {interpolate as remotionInterpolate} from "remotion";
import {CaptionLine, SceneLabel} from "../components/CaptionLine";
import {ContextInspector} from "../components/ContextInspector";
import {HistorianPanel} from "../components/HistorianPanel";
import {BlockedOverlay, TranscriptPane} from "../components/TranscriptPane";
import {COLORS, SCENE1_TRANSCRIPT, SCENE3_TRANSCRIPT} from "../constants";
import {extendTranscript, Eyebrow, FlowLine, FrostCard, SceneBackground} from "./scene-helpers";

const oldTranscript = extendTranscript(SCENE1_TRANSCRIPT, 12);
const magicTranscript = extendTranscript(SCENE3_TRANSCRIPT, 10);
const contextLimit = 128000;

export const Scene2Split: React.FC<{frame: number}> = ({frame}) => {
  const zoom = remotionInterpolate(frame, [0, 40, 119], [1, 1.03, 1.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateX = remotionInterpolate(frame, [0, 40, 119], [0, -70, -260], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const historianProgress = remotionInterpolate(frame, [28, 119], [16, 82], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const historianStatus = frame < 45 ? "monitoring" : frame < 78 ? "selecting" : "processing";

  return (
    <div style={{width: "100%", height: "100%", position: "relative", overflow: "hidden"}}>
      <SceneBackground accent={COLORS.magicAccent} accentSecondary={COLORS.oldAccent} gridOpacity={0.1} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: 56,
          display: "flex",
          gap: 28,
          transform: `translateX(${translateX}px) scale(${zoom})`,
          transformOrigin: "center center",
        }}
      >
        <FrostCard style={{flex: 1, padding: 24, display: "flex", flexDirection: "column", gap: 18}} accentColor={`${COLORS.oldWarning}55`}>
          <Eyebrow text="Old way stalled" color={COLORS.oldWarning} />
          <div style={{flex: 1, position: "relative"}}>
            <TranscriptPane entries={oldTranscript} visibleEntries={oldTranscript.length} scrollOffset={128} dimmed sessionName="ATHENA" />
            <BlockedOverlay visible />
          </div>
          <ContextInspector
            usage={100}
            totalTokens={contextLimit}
            contextLimit={contextLimit}
            cacheTokens={0}
            assistantMessages={8}
            userMessages={3}
            rawMessagesCount={18}
            isBlocked
          />
        </FrostCard>

        <FrostCard style={{flex: 1.12, padding: 24, display: "flex", flexDirection: "column", gap: 18}} accentColor={`${COLORS.magicAccent}55`}>
          <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <Eyebrow text="Magic Context active" color={COLORS.magicAccent} />
            <div
              style={{
                padding: "8px 12px",
                borderRadius: 999,
                backgroundColor: `${COLORS.magicAccent}14`,
                border: `1px solid ${COLORS.magicAccent}35`,
                fontSize: 12,
                color: COLORS.textPrimary,
              }}
            >
              main session keeps moving
            </div>
          </div>
          <div style={{display: "flex", gap: 16, flex: 1}}>
            <div style={{flex: 1, minWidth: 0}}>
              <TranscriptPane
                entries={magicTranscript}
                visibleEntries={magicTranscript.length}
                scrollOffset={34}
                sessionName="MAGIC CONTEXT"
              />
            </div>
            <div style={{width: 310, display: "flex", flexDirection: "column", gap: 16}}>
              <HistorianPanel
                status={historianStatus as "monitoring" | "selecting" | "processing"}
                progress={historianProgress}
                message="Historian wakes before the limit is hit"
              />
              <FlowLine color={COLORS.historianAccent} style={{marginTop: 2}} />
              <ContextInspector
                usage={72}
                totalTokens={92160}
                contextLimit={contextLimit}
                cacheTokens={24200}
                assistantMessages={6}
                userMessages={2}
                rawMessagesCount={9}
                isMagicContext
              />
            </div>
          </div>
        </FrostCard>
      </div>

      <div
        style={{
          position: "absolute",
          top: 110,
          bottom: 110,
          left: "50%",
          width: 1,
          background: `linear-gradient(180deg, transparent 0%, ${COLORS.border} 20%, ${COLORS.border} 80%, transparent 100%)`,
          opacity: 0.6,
        }}
      />

      <SceneLabel text="Scene 02" subText="Split comparison" visible position="top-left" accentColor={COLORS.magicAccent} />
      <CaptionLine
        visible
        accentColor={COLORS.magicAccent}
        text="Old way stalls on the left. Magic Context stays live on the right as Historian activates in the background."
      />
    </div>
  );
};
