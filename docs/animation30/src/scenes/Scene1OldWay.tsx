import React from "react";
import {interpolate as remotionInterpolate} from "remotion";
import {CaptionLine, SceneLabel} from "../components/CaptionLine";
import {ContextInspector} from "../components/ContextInspector";
import {SessionHeader, SessionShell} from "../components/SessionShell";
import {BlockedOverlay, TranscriptPane} from "../components/TranscriptPane";
import {COLORS, SCENE1_TRANSCRIPT} from "../constants";
import {extendTranscript, MetricPill, SceneBackground} from "./scene-helpers";

const contextLimit = 128000;
const transcript = extendTranscript(SCENE1_TRANSCRIPT, 16);

export const Scene1OldWay: React.FC<{frame: number}> = ({frame}) => {
  const usage = remotionInterpolate(
    frame,
    [0, 26, 56, 86, 116, 146, 168, 186, 209],
    [34, 55, 76, 88, 94, 97, 99, 100, 100],
    {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
  );
  const visibleEntries = Math.round(
    remotionInterpolate(frame, [0, 160, 209], [4, 12, transcript.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const scrollOffset = Math.max(0, (visibleEntries - 8) * 54);
  const blocked = frame >= 182;
  const warningOpacity = remotionInterpolate(frame, [120, 209], [0, 0.28], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const totalTokens = Math.round((usage / 100) * contextLimit);

  return (
    <div style={{width: "100%", height: "100%", position: "relative"}}>
      <SceneBackground accent={COLORS.oldAccent} accentSecondary={COLORS.oldDanger} gridOpacity={0.08} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            `radial-gradient(circle at 78% 18%, ${COLORS.oldDanger}26 0%, transparent 24%), ` +
            `linear-gradient(180deg, transparent 0%, rgba(218,54,51,${warningOpacity}) 100%)`,
          opacity: warningOpacity + 0.12,
        }}
      />

      <SessionShell style={{position: "relative", zIndex: 2}}>
        <SessionHeader
          title="OpenCode session"
          subtitle="Raw transcript and token budget keep accumulating"
          badge="old way"
          badgeColor={COLORS.oldAccent}
        />

        <div style={{display: "flex", flex: 1, gap: 24}}>
          <div style={{flex: 1.55, position: "relative"}}>
            <TranscriptPane
              entries={transcript}
              visibleEntries={visibleEntries}
              scrollOffset={scrollOffset}
              dimmed={blocked}
              sessionName="ATHENA"
            />
            <BlockedOverlay visible={blocked} />
          </div>

          <div style={{width: 420, display: "flex", flexDirection: "column", gap: 16}}>
            <MetricPill label="session state" value={blocked ? "blocked" : "active"} color={blocked ? COLORS.oldWarning : COLORS.oldAccent} />
            <MetricPill label="history growth" value={`${visibleEntries} transcript rows`} color={COLORS.oldAccent} />
            <ContextInspector
              usage={usage}
              totalTokens={totalTokens}
              contextLimit={contextLimit}
              cacheTokens={0}
              assistantMessages={Math.max(4, visibleEntries - 3)}
              userMessages={Math.max(2, Math.floor(visibleEntries / 4))}
              rawMessagesCount={visibleEntries + 6}
              isBlocked={blocked}
            />
          </div>
        </div>
      </SessionShell>

      <SceneLabel text="Scene 01" subText="Old way pain" visible position="top-left" accentColor={COLORS.oldAccent} />
      <CaptionLine
        visible
        accentColor={COLORS.oldWarning}
        text="Old way: the main agent hits the limit and stops to compact itself."
      />
    </div>
  );
};
