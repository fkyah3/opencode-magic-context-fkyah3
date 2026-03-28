import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { SessionShell } from "../components/session/SessionShell";
import { TranscriptPane } from "../components/session/TranscriptPane";
import { ContextInspector } from "../components/session/ContextInspector";
import { UserBubble, AssistantBlock, ActionRow } from "../components/session/TranscriptItems";
import { ContextStat, UsageMeter, RawMessageList } from "../components/session/ContextStats";
import { Search, Edit3, Activity, ArrowRight, Loader2 } from "lucide-react";

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();

  // 0-60: usage 68->81
  // 61-130: usage 81->91
  // 131-270: 91
  const usage = interpolate(frame, [0, 60, 130], [68, 81, 91], { extrapolateRight: "clamp" });
  
  const showAction1 = frame > 20;
  const showAction2 = frame > 60;
  const showAction3 = frame > 100;
  
  const yOffset = interpolate(frame, [0, 100, 200], [0, 40, 80], { extrapolateRight: "clamp" });

  const historianState = frame < 60 ? "idle" : frame < 130 ? "preparing" : "active";

  return (
    <AbsoluteFill className="flex items-center justify-center bg-darkBg">
      <div style={{ transform: "scale(1)" }}>
        <SessionShell>
          <TranscriptPane>
            <div className="absolute inset-0 p-8 flex flex-col gap-6" style={{ transform: `translateY(-${yOffset}px)` }}>
              <div className="opacity-50 blur-[1px]">
                <UserBubble text="Currently we have a new problem..." />
                <div className="h-6" />
                <AssistantBlock text="The user is saying that athena-junior..." />
              </div>
              
              <AssistantBlock text="I detect fix intent. Let me trace where sub-agent spawning is gated." />
              <AssistantBlock text="The issue is clear. A self-recursion guard is missing." />
              
              {showAction1 && <ActionRow icon={<Search size={14} />} text="Explored 1 read, 2 searches" />}
              
              {showAction2 && (
                <>
                  <AssistantBlock text="I will verify whether the restriction belongs in subagent-resolver.ts." />
                  <ActionRow icon={<Edit3 size={14} />} text="Edit subagent-resolver.ts" />
                </>
              )}
              
              {showAction3 && <ActionRow icon={<Activity size={14} />} text="Called lsp_diagnostics" />}
            </div>

            {/* Faint scanner over old history */}
            {historianState === "active" && (
              <div 
                className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-accentBlue/10 to-transparent border-t-2 border-accentBlue/40"
                style={{ 
                  transform: `translateY(${interpolate(frame, [130, 270], [0, 200])}px)`,
                  opacity: interpolate(frame, [130, 140, 260, 270], [0, 1, 1, 0])
                }}
              />
            )}
          </TranscriptPane>

          <ContextInspector>
            <div className="flex flex-col gap-2 mb-4">
              <ContextStat label="Session" value="ATHENA_8f2a" />
              <ContextStat label="Context Limit" value="200,000" />
            </div>

            <UsageMeter percentage={usage} color={usage > 90 ? "#f87171" : "#2dd4bf"} />

            <div className="mt-8 flex-1 flex flex-col gap-4">
              <RawMessageList count={Math.floor(usage * 1.5)} items={8} />

              <div className={`p-5 rounded-xl border transition-all duration-500 flex flex-col gap-3 ${
                historianState === "idle" ? "bg-slate-800/30 border-slate-700/30 opacity-0" :
                historianState === "preparing" ? "bg-accentBlue/10 border-accentBlue/30" :
                "bg-accentBlue/20 border-accentBlue/50 shadow-[0_0_20px_rgba(96,165,250,0.15)]"
              }`}>
                <div className="flex items-center gap-3">
                  {historianState === "active" ? (
                    <Loader2 className="animate-spin text-accentBlue" size={18} />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-accentBlue animate-pulse" />
                  )}
                  <span className="text-accentBlue font-medium">Historian</span>
                </div>
                <div className="text-xs text-accentBlue/80 flex flex-col gap-1 font-mono">
                  {historianState === "idle" && "Idle"}
                  {historianState === "preparing" && (
                    <>
                      <span>Monitoring context pressure...</span>
                      <span>Preparing background compaction</span>
                    </>
                  )}
                  {historianState === "active" && (
                    <>
                      <span className="text-slate-200">Selecting older session history</span>
                      <span className="text-slate-200">Tracing related raw messages</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </ContextInspector>
        </SessionShell>
      </div>

      {frame > 130 && (
        <div 
          className="absolute bottom-12 text-2xl font-medium text-slate-300 bg-panelBg/80 backdrop-blur px-8 py-4 rounded-full border border-borderDark"
          style={{ opacity: interpolate(frame, [130, 150], [0, 1]) }}
        >
          Magic Context: before the session blocks, a background Historian starts working.
        </div>
      )}
    </AbsoluteFill>
  );
};
