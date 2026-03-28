import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { SessionShell } from "../components/session/SessionShell";
import { TranscriptPane } from "../components/session/TranscriptPane";
import { ContextInspector } from "../components/session/ContextInspector";
import { UsageMeter, RawMessageList } from "../components/session/ContextStats";
import { AssistantBlock, ActionRow } from "../components/session/TranscriptItems";
import { Activity, Edit3 } from "lucide-react";

export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();

  // 0-70: usage drops ~91 to 56
  // transcript remains active

  const dropProgress = spring({ frame, fps: 30, config: { damping: 14 } });
  const usage = interpolate(dropProgress, [0, 1], [91, 56]);

  return (
    <AbsoluteFill className="flex items-center justify-center bg-darkBg">
      <div style={{ transform: "scale(1)" }}>
        <SessionShell>
          <TranscriptPane>
            <div className="absolute bottom-24 left-8 right-8 flex flex-col gap-6">
              <AssistantBlock text="I will verify whether the restriction belongs in subagent-resolver.ts." />
              <ActionRow icon={<Edit3 size={14} />} text="Edit subagent-resolver.ts" />
              <ActionRow icon={<Activity size={14} />} text="Called lsp_diagnostics" />
              <AssistantBlock text="Diagnostics clean. Self-recursion is now safely gated." />
              
              {frame > 60 && (
                <ActionRow icon={<Edit3 size={14} />} text="Edit src/tests/recursion.test.ts +8 -0" />
              )}
            </div>
            
            {/* Faint hint of compartments living at top */}
            <div className="absolute top-8 left-8 right-8 flex gap-4 opacity-40">
               <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-lg text-sm text-slate-300 font-medium">
                 [Compartment] Recursion investigation
               </div>
               <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-lg text-sm text-slate-300 font-medium">
                 [Compartment] Delegation guard analysis
               </div>
            </div>
          </TranscriptPane>

          <ContextInspector>
            <UsageMeter percentage={usage} />
            <div className="mt-8 flex-1">
              <RawMessageList count={Math.floor(usage * 1.5)} items={Math.floor(interpolate(dropProgress, [0, 1], [8, 4]))} />
            </div>
            
            <div className="bg-accentTeal/10 border border-accentTeal/30 p-4 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accentTeal/20 flex items-center justify-center shrink-0">
                <Activity className="text-accentTeal" size={16} />
              </div>
              <div>
                <div className="text-slate-200 font-medium text-sm">System Healthy</div>
                <div className="text-slate-400 text-xs">Compaction complete</div>
              </div>
            </div>
          </ContextInspector>
        </SessionShell>
      </div>

      <div 
        className="absolute bottom-12 text-2xl font-medium text-slate-300 bg-panelBg/80 backdrop-blur px-8 py-4 rounded-full border border-borderDark shadow-xl"
        style={{ opacity: interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: "clamp" }) }}
      >
        The main agent never stopped. Flow stayed intact.
      </div>
    </AbsoluteFill>
  );
};
