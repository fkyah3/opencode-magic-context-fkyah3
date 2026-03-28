import React from "react";
import {interpolate as remotionInterpolate} from "remotion";
import {CaptionLine, SceneLabel} from "../components/CaptionLine";
import {ContextInspector} from "../components/ContextInspector";
import {HistorianPanel} from "../components/HistorianPanel";
import {SessionHeader, SessionShell} from "../components/SessionShell";
import {TranscriptPane} from "../components/TranscriptPane";
import {COLORS, SCENE3_TRANSCRIPT} from "../constants";
import {FrostCard, MetricPill, SceneBackground, extendTranscript} from "./scene-helpers";

const transcript = extendTranscript(SCENE3_TRANSCRIPT, 13);
const contextLimit = 128000;

export const Scene6Payoff: React.FC<{frame: number}> = ({frame}) => {
  const usage = remotionInterpolate(frame, [0, 70, 130, 209], [91, 80, 64, 56], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const visibleEntries = Math.round(
    remotionInterpolate(frame, [0, 209], [9, transcript.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <div style={{width: "100%", height: "100%", position: "relative"}}>
      <SceneBackground accent={COLORS.success} accentSecondary={COLORS.magicAccent} />

      <SessionShell style={{position: "relative", zIndex: 2}}>
        <SessionHeader
          title="Payoff"
          subtitle="The active session keeps shipping work while pressure falls away"
          badge="flow intact"
          badgeColor={COLORS.success}
        />

        <div style={{display: "flex", gap: 24, flex: 1}}>
          <div style={{flex: 1.5, position: "relative"}}>
            <TranscriptPane
              entries={transcript}
              visibleEntries={visibleEntries}
              scrollOffset={Math.max(0, (visibleEntries - 8) * 34)}
              sessionName="MAIN AGENT"
            />

            {Array.from({length: 3}).map((_, index) => {
              const progress = remotionInterpolate(frame, [58 + index * 24, 140 + index * 24], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    left: 58,
                    right: 72,
                    bottom: 120 - index * 44,
                    height: 28,
                    borderRadius: 999,
                    background: `linear-gradient(90deg, ${COLORS.success}22 0%, rgba(10,10,15,0) 100%)`,
                    border: `1px solid ${COLORS.success}33`,
                    opacity: progress,
                    transform: `translateY(${(1 - progress) * 20}px)`,
                  }}
                />
              );
            })}
          </div>

          <div style={{width: 470, display: "flex", flexDirection: "column", gap: 18}}>
            <FrostCard style={{padding: 24, display: "grid", gap: 16}} accentColor={`${COLORS.success}66`}>
              <MetricPill label="usage drop" value={`${usage.toFixed(0)}%`} color={COLORS.success} />
              <div style={{display: "flex", alignItems: "center", gap: 18}}>
                <div style={{fontSize: 54, fontWeight: 800, color: COLORS.textPrimary}}>91%</div>
                <div style={{fontSize: 34, color: COLORS.textTertiary}}>→</div>
                <div style={{fontSize: 54, fontWeight: 800, color: COLORS.success}}>56%</div>
              </div>
              <div style={{fontSize: 15, lineHeight: 1.6, color: COLORS.textSecondary}}>
                No stop-the-world compaction. The main agent keeps working while Historian sheds old weight behind the scenes.
              </div>
            </FrostCard>

            <ContextInspector
              usage={usage}
              totalTokens={Math.round((usage / 100) * contextLimit)}
              contextLimit={contextLimit}
              cacheTokens={Math.round(remotionInterpolate(frame, [0, 209], [25200, 41800], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}))}
              assistantMessages={9}
              userMessages={3}
              rawMessagesCount={13}
              isMagicContext
            />

            <HistorianPanel
              status="complete"
              progress={100}
              message="Flow preserved — structured context now carries the past"
            />
          </div>
        </div>
      </SessionShell>

      <SceneLabel text="Scene 06" subText="Payoff" visible position="top-left" accentColor={COLORS.success} />
      <CaptionLine
        visible
        accentColor={COLORS.success}
        text="The main agent never stopped. Flow stayed intact."
      />
    </div>
  );
};
