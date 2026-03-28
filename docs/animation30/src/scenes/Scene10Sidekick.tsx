import React from "react";
import {interpolate as remotionInterpolate} from "remotion";
import {CaptionLine, SceneLabel} from "../components/CaptionLine";
import {MemoryCard} from "../components/MemoryComponents";
import {SessionHeader, SessionShell} from "../components/SessionShell";
import {TranscriptPane} from "../components/TranscriptPane";
import {COLORS, SCENE10_USER_PROMPT, SIDEKICK_BRIEFING, TranscriptEntry} from "../constants";
import {Eyebrow, FlowLine, FrostCard, MetricPill, SceneBackground} from "./scene-helpers";

const sidekickTranscript: TranscriptEntry[] = [
  {
    id: "sidekick-user",
    type: "user",
    content: SCENE10_USER_PROMPT,
  },
  {
    id: "sidekick-action",
    type: "action",
    content: "Sidekick",
    subContent: "restored memory-backed briefing",
  },
  {
    id: "sidekick-assistant-1",
    type: "assistant",
    content: "I’ve restored the prior retry constraint and the previous auth refactor decision points before continuing.",
  },
  {
    id: "sidekick-assistant-2",
    type: "assistant",
    content: "Proceeding from the remembered state instead of rediscovering the same constraints from scratch.",
  },
];

export const Scene10Sidekick: React.FC<{frame: number}> = ({frame}) => {
  const reveal = remotionInterpolate(frame, [0, 150, 209], [1, 3, sidekickTranscript.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{width: "100%", height: "100%", position: "relative"}}>
      <SceneBackground accent={COLORS.sidekickAccent} accentSecondary={COLORS.sidekickGlow} />

      <SessionShell style={{position: "relative", zIndex: 2}}>
        <SessionHeader
          title="New session bootstrap"
          subtitle="A fresh session starts with the right constraints already loaded"
          badge="sidekick"
          badgeColor={COLORS.sidekickAccent}
        />

        <div style={{display: "flex", flex: 1, gap: 24, alignItems: "stretch"}}>
          <div style={{flex: 1.4, position: "relative"}}>
            <TranscriptPane
              entries={sidekickTranscript}
              visibleEntries={Math.round(reveal)}
              scrollOffset={0}
              sessionName="FRESH SESSION"
            />

            {SIDEKICK_BRIEFING.map((item, index) => {
              const progress = remotionInterpolate(frame, [18 + index * 24, 118 + index * 24], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <div
                  key={item}
                  style={{
                    position: "absolute",
                    right: -24,
                    top: 140 + index * 74,
                    width: 280,
                    opacity: progress,
                    transform: `translateX(${(1 - progress) * 48}px)`,
                  }}
                >
                  <MemoryCard text={item} index={index} />
                </div>
              );
            })}
          </div>

          <div style={{width: 470, display: "flex", flexDirection: "column", gap: 18}}>
            <FrostCard style={{padding: 24, display: "flex", flexDirection: "column", gap: 16}} accentColor={`${COLORS.sidekickAccent}66`}>
              <Eyebrow text="Sidekick briefing" color={COLORS.sidekickAccent} />
              <MetricPill label="startup state" value="memory-restored" color={COLORS.sidekickAccent} />
              <div style={{display: "grid", gap: 12}}>
                {SIDEKICK_BRIEFING.map((item) => (
                  <div
                    key={item}
                    style={{
                      padding: 14,
                      borderRadius: 12,
                      border: `1px solid ${COLORS.sidekickAccent}30`,
                      backgroundColor: `${COLORS.sidekickAccent}12`,
                      color: COLORS.textPrimary,
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </FrostCard>

            <FrostCard style={{padding: 24, display: "flex", flexDirection: "column", gap: 14}} accentColor={`${COLORS.sidekickGlow}66`}>
              <Eyebrow text="Why it matters" color={COLORS.sidekickGlow} />
              <div style={{fontSize: 15, lineHeight: 1.7, color: COLORS.textSecondary}}>
                New sessions don’t need to reconstruct the whole backstory. Sidekick injects the durable briefing so work resumes at the right abstraction level immediately.
              </div>
              <FlowLine color={COLORS.sidekickGlow} />
            </FrostCard>
          </div>
        </div>
      </SessionShell>

      <SceneLabel text="Scene 10" subText="Sidekick" visible position="top-left" accentColor={COLORS.sidekickAccent} />
      <CaptionLine
        visible
        accentColor={COLORS.sidekickAccent}
        text="Sidekick helps new sessions start with the right context already in place."
      />
    </div>
  );
};
