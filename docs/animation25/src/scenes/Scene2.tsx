import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { SessionShell } from "../components/session/SessionShell";
import { TranscriptPane } from "../components/session/TranscriptPane";
import { ContextInspector } from "../components/session/ContextInspector";
import { UserBubble, AssistantBlock, ActionRow } from "../components/session/TranscriptItems";
import { ContextStat, UsageMeter, RawMessageList } from "../components/session/ContextStats";
import { Activity, Search, Edit3 } from "lucide-react";

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();

  const splitProgress = spring({
    frame: frame - 10,
    fps: 30,
    config: { damping: 14 }
  });

  const zoomProgress = spring({
    frame: frame - 76,
    fps: 30,
    config: { damping: 14 }
  });

  const leftScale = interpolate(splitProgress, [0, 1], [1, 0.45]);
  const leftX = interpolate(splitProgress, [0, 1], [0, -480]);
  const leftOpacity = interpolate(zoomProgress, [0, 1], [1, 0]);

  const rightScale = interpolate(splitProgress, [0, 1], [0.8, 0.45]);
  const rightFinalScale = interpolate(zoomProgress, [0, 1], [0.45, 1]);
  const rightX = interpolate(splitProgress, [0, 1], [400, 480]);
  const rightFinalX = interpolate(zoomProgress, [0, 1], [480, 0]);
  const rightOpacity = interpolate(splitProgress, [0, 1], [0, 1]);

  const currentRightScale = frame > 76 ? rightFinalScale : rightScale;
  const currentRightX = frame > 76 ? rightFinalX : rightX;

  const rightUsage = interpolate(frame, [0, 120], [72, 90]);

  return (
    <AbsoluteFill className="flex items-center justify-center bg-darkBg">
      
      {/* LEFT: Old Way */}
      <div 
        style={{ 
          position: "absolute",
          transform: `translateX(${leftX}px) scale(${leftScale})`,
          opacity: leftOpacity
        }}
      >
        <div className="absolute -top-16 left-0 right-0 text-center text-2xl font-bold text-slate-400">Old Way</div>
        <SessionShell>
          <TranscriptPane>
            <div className="flex flex-col gap-6" style={{ transform: "translateY(-100px)" }}>
              <UserBubble text="Currently we have a new problem..." />
              <AssistantBlock text="The user is saying that athena-junior..." />
              <ActionRow icon={<Search size={14} />} text="Explored 1 read, 2 searches" />
              <AssistantBlock text="I see the issue. There are guards..." />
            </div>
            <div className="absolute inset-0 bg-darkBg/60 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="bg-panelBg border border-accentRed/50 shadow-2xl rounded-xl p-8 flex flex-col items-center gap-4 text-center">
                <div className="w-12 h-12 rounded-full bg-accentRed/20 flex items-center justify-center mb-2">
                  <Activity className="text-accentRed" />
                </div>
                <h2 className="text-xl font-semibold text-slate-100">Context Limit Reached</h2>
                <div className="w-64 h-2 bg-slate-800 rounded-full mt-4 overflow-hidden">
                  <div className="h-full bg-accentRed" style={{ width: "40%" }} />
                </div>
              </div>
            </div>
          </TranscriptPane>
          <ContextInspector>
            <UsageMeter percentage={100} color="#f87171" />
            <div className="mt-8">
              <RawMessageList count={115} items={8} />
            </div>
          </ContextInspector>
        </SessionShell>
      </div>

      {/* RIGHT: Magic Context */}
      <div 
        style={{ 
          position: "absolute",
          transform: `translateX(${currentRightX}px) scale(${currentRightScale})`,
          opacity: rightOpacity
        }}
      >
        <div className="absolute -top-16 left-0 right-0 text-center text-2xl font-bold text-accentTeal" style={{ opacity: 1 - zoomProgress }}>Magic Context</div>
        <SessionShell>
          <TranscriptPane>
            <div className="flex flex-col gap-6">
              <UserBubble text="I detect fix intent. Let me trace where sub-agent spawning is gated." />
              <AssistantBlock text="The issue is clear. A self-recursion guard is missing." />
              {frame > 40 && (
                 <ActionRow icon={<Search size={14} />} text="Explored 1 read, 2 searches" />
              )}
            </div>
          </TranscriptPane>
          <ContextInspector>
             <UsageMeter percentage={rightUsage} />
             <div className="mt-8 relative">
               <RawMessageList count={Math.floor(rightUsage * 1.2)} items={8} />
             </div>
             
             {/* Historian indicator appears */}
             <div 
               className="absolute bottom-6 left-6 right-6 p-4 rounded-xl border border-accentBlue/30 bg-accentBlue/10 flex items-center gap-4 transition-opacity"
               style={{ opacity: interpolate(frame, [36, 50], [0, 1], { extrapolateLeft: "clamp" }) }}
             >
               <div className="w-2 h-2 rounded-full bg-accentBlue animate-pulse" />
               <span className="text-accentBlue font-medium text-sm">Historian (background)</span>
             </div>
          </ContextInspector>
        </SessionShell>
      </div>

    </AbsoluteFill>
  );
};
