import React from "react";
import {interpolate as remotionInterpolate} from "remotion";
import {CaptionLine, SceneLabel} from "../components/CaptionLine";
import {ContextInspector} from "../components/ContextInspector";
import {HistorianPanel} from "../components/HistorianPanel";
import {SessionHeader, SessionShell} from "../components/SessionShell";
import {TranscriptPane} from "../components/TranscriptPane";
import {COLORS, SCENE3_TRANSCRIPT} from "../constants";
import {extendTranscript, FlowLine, MetricPill, SceneBackground} from "./scene-helpers";

const transcript = extendTranscript(SCENE3_TRANSCRIPT, 12);
const contextLimit = 128000;

export const Scene3HistorianActivation: React.FC<{frame: number}> = ({frame}) => {
  const usage = remotionInterpolate(frame, [0, 269], [64, 86], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const visibleEntries = Math.round(
    remotionInterpolate(frame, [0, 120, 269], [4, 8, transcript.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const scrollOffset = Math.max(0, (visibleEntries - 7) * 38);
  const reveal = remotionInterpolate(frame, [36, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const historianStatus = frame < 72 ? "monitoring" : frame < 132 ? "selecting" : frame < 204 ? "processing" : "complete";
  const historianProgress =
    historianStatus === "monitoring"
      ? 18
      : historianStatus === "selecting"
        ? remotionInterpolate(frame, [72, 132], [24, 48], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        : historianStatus === "processing"
          ? remotionInterpolate(frame, [132, 204], [50, 84], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          : 100;

  return (
    <div style={{width: "100%", height: "100%", position: "relative"}}>
      <SceneBackground accent={COLORS.magicAccent} accentSecondary={COLORS.historianDeep} />

      <SessionShell style={{position: "relative", zIndex: 2}}>
        <SessionHeader
          title="Magic Context"
          subtitle="Background Historian activates before the context wall"
          badge="live session"
          badgeColor={COLORS.magicAccent}
        />

        <div style={{display: "flex", flex: 1, gap: 24}}>
          <div style={{flex: 1.5, position: "relative"}}>
            <TranscriptPane
              entries={transcript}
              visibleEntries={visibleEntries}
              scrollOffset={scrollOffset}
              sessionName="MAIN AGENT"
            />
          </div>

          <div style={{width: 420, display: "flex", flexDirection: "column", gap: 16}}>
            <MetricPill label="context pressure" value={`${usage.toFixed(0)}%`} color={COLORS.magicAccent} />
            <MetricPill label="historian state" value={historianStatus} color={COLORS.historianAccent} />
            <ContextInspector
              usage={usage}
              totalTokens={Math.round((usage / 100) * contextLimit)}
              contextLimit={contextLimit}
              cacheTokens={Math.round(remotionInterpolate(frame, [0, 269], [16800, 32400], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}))}
              assistantMessages={Math.max(3, visibleEntries - 2)}
              userMessages={Math.max(1, Math.floor(visibleEntries / 4))}
              rawMessagesCount={visibleEntries + 2}
              isMagicContext
            />
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 52,
            bottom: 48,
            width: 520,
            transform: `translateY(${(1 - reveal) * 32}px) scale(${0.94 + reveal * 0.06})`,
            opacity: reveal,
          }}
        >
          <HistorianPanel
            status={historianStatus as "monitoring" | "selecting" | "processing" | "complete"}
            progress={historianProgress}
            message="Selecting older transcript blocks without interrupting the active session"
          />
          <FlowLine color={COLORS.historianAccent} style={{marginTop: 12, width: 440}} />
        </div>
      </SessionShell>

      <SceneLabel text="Scene 03" subText="Historian activation" visible position="top-left" accentColor={COLORS.historianAccent} />
      <CaptionLine
        visible
        accentColor={COLORS.historianAccent}
        text="Magic Context: before the session blocks, a background Historian starts working."
      />
    </div>
  );
};
