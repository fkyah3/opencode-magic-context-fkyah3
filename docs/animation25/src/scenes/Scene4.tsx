import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { SessionShell } from "../components/session/SessionShell";
import { TranscriptPane } from "../components/session/TranscriptPane";
import { ContextInspector } from "../components/session/ContextInspector";
import { UserBubble, AssistantBlock, ActionRow } from "../components/session/TranscriptItems";
import { UsageMeter, RawMessageList } from "../components/session/ContextStats";
import { Activity, Edit3, Loader2 } from "lucide-react";

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();

  // 0-60: bracket select old history
  // 61-160: pull old material out
  // 161-260: processing old chunk
  // 261-360: hold architecture shot

  const selectOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: "clamp" });
  
  const pullProgress = spring({ frame: frame - 60, fps: 30, config: { damping: 14 } });
  
  const oldChunkScale = interpolate(pullProgress, [0, 1], [1, 0.8]);
  const oldChunkX = interpolate(pullProgress, [0, 1], [0, 200]);
  const oldChunkY = interpolate(pullProgress, [0, 1], [0, 100]);
  const oldChunkOpacity = interpolate(pullProgress, [0, 1], [1, 0.2]);

  return (
    <AbsoluteFill className="flex items-center justify-center bg-darkBg">
      <div style={{ transform: "scale(1)" }}>
        <SessionShell>
          
          {/* Main Transcript Pane */}
          <TranscriptPane>
            
            {/* The Head (Older history) */}
            <div 
              className="absolute top-8 left-8 right-8 flex flex-col gap-6"
              style={{
                transform: `translate(${oldChunkX}px, ${oldChunkY}px) scale(${oldChunkScale})`,
                opacity: oldChunkOpacity,
                transformOrigin: "left top"
              }}
            >
              {/* Highlight Bracket */}
              <div 
                className="absolute -inset-4 border-2 border-accentBlue/50 rounded-xl bg-accentBlue/5 pointer-events-none"
                style={{ opacity: selectOpacity }}
              >
                <div className="absolute -top-3 right-4 bg-accentBlue text-darkBg px-2 py-0.5 rounded text-xs font-bold">
                  Selected history range
                </div>
              </div>

              <UserBubble text="Currently we have a new problem, athena-junior is able to spawn another..." />
              <AssistantBlock text="The user is saying that athena-junior can spawn another athena-junior..." />
              <ActionRow icon={<Activity size={14} />} text="Explored 1 read, 2 searches" />
              <AssistantBlock text="I see the issue. There are guards for plan-family recursion..." />
            </div>

            {/* The Tail (Live history) */}
            <div 
              className="absolute bottom-24 left-8 right-8 flex flex-col gap-6"
              style={{
                transform: `translateY(${interpolate(frame, [150, 250], [80, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`
              }}
            >
              <AssistantBlock text="I detect fix intent. Let me trace where sub-agent spawning is gated." />
              <AssistantBlock text="The issue is clear. A self-recursion guard is missing." />
              <ActionRow icon={<Activity size={14} />} text="Explored 1 read, 2 searches" />
              
              {frame > 150 && (
                <AssistantBlock text="I will verify whether the restriction belongs in subagent-resolver.ts." />
              )}
              {frame > 200 && (
                <ActionRow icon={<Edit3 size={14} />} text="Edit subagent-resolver.ts" />
              )}
            </div>
            
          </TranscriptPane>

          <ContextInspector>
            <UsageMeter percentage={91} color="#f87171" />
            
            <div className="mt-8 flex-1 flex flex-col gap-4">
              {/* Raw Messages with select highlight */}
              <div className="relative">
                <RawMessageList count={136} items={6} />
                <div 
                  className="absolute top-8 left-0 right-0 h-24 border-2 border-accentBlue/50 rounded-lg bg-accentBlue/10"
                  style={{ 
                    opacity: selectOpacity,
                    transform: `translate(${oldChunkX * 0.5}px, ${oldChunkY * 0.5}px) scale(${oldChunkScale})`
                  }}
                />
              </div>

              {/* Historian Background Processing Lane */}
              <div 
                className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-accentBlue/20 border-2 border-accentBlue shadow-[0_0_30px_rgba(96,165,250,0.2)] flex flex-col gap-3 z-50"
                style={{ 
                  transform: `translateY(${interpolate(frame, [0, 40], [100, 0], { extrapolateRight: "clamp" })}px)`,
                  opacity: interpolate(frame, [0, 40], [0, 1], { extrapolateRight: "clamp" })
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Loader2 className="animate-spin text-accentBlue" size={18} />
                    <span className="text-accentBlue font-bold tracking-wide">HISTORIAN</span>
                  </div>
                  <span className="text-xs text-accentBlue font-mono">RUNNING</span>
                </div>

                <div className="text-sm text-slate-200 flex flex-col gap-1 font-mono bg-darkBg/50 p-3 rounded border border-accentBlue/20">
                  {frame < 160 ? (
                    <>
                      <span className="text-accentBlue">Pulling chunk msg_4f2..msg_8a1</span>
                      <span className="opacity-50">Isolating relevant context</span>
                    </>
                  ) : (
                    <>
                      <span className="text-accentBlue">Compartmentalizing session history</span>
                      <span className="text-slate-300">Extracting durable facts...</span>
                      {frame > 200 && <span className="text-accentTeal">Promoting stable memory...</span>}
                    </>
                  )}
                </div>
              </div>
            </div>
          </ContextInspector>
        </SessionShell>
      </div>

      <div 
        className="absolute bottom-12 text-2xl font-medium text-slate-300 bg-panelBg/80 backdrop-blur px-8 py-4 rounded-full border border-borderDark shadow-xl"
        style={{ opacity: interpolate(frame, [260, 280], [0, 1], { extrapolateLeft: "clamp" }) }}
      >
        Historian rewrites the head. The live session keeps moving on the tail.
      </div>
    </AbsoluteFill>
  );
};
