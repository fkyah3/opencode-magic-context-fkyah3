import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { SessionShell } from "../components/session/SessionShell";
import { TranscriptPane } from "../components/session/TranscriptPane";
import { ContextInspector } from "../components/session/ContextInspector";
import { UsageMeter } from "../components/session/ContextStats";
import { AssistantBlock, ActionRow } from "../components/session/TranscriptItems";
import { Activity, Edit3, Database, FileText, CheckCircle2 } from "lucide-react";

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();

  // 0-70: Compartments form
  // 71-170: Facts form
  // 171-275: Memory forms
  // 276-390: Hold outputs

  const compOpacity = spring({ frame: frame - 20, fps: 30, config: { damping: 12 } });
  const factOpacity = spring({ frame: frame - 90, fps: 30, config: { damping: 12 } });
  const memOpacity = spring({ frame: frame - 190, fps: 30, config: { damping: 12 } });

  return (
    <AbsoluteFill className="flex items-center justify-center bg-darkBg">
      <div style={{ transform: "scale(1)" }}>
        <SessionShell>
          <TranscriptPane>
            
            {/* The Live Tail continues... */}
            <div className="absolute bottom-24 left-8 right-8 flex flex-col gap-6">
              <AssistantBlock text="I will verify whether the restriction belongs in subagent-resolver.ts." />
              <ActionRow icon={<Edit3 size={14} />} text="Edit subagent-resolver.ts" />
              
              {frame > 150 && (
                <ActionRow icon={<Activity size={14} />} text="Called lsp_diagnostics" />
              )}
              {frame > 250 && (
                <AssistantBlock text="Diagnostics clean. Self-recursion is now safely gated." />
              )}
            </div>

            {/* Central overlay for Historian outputs */}
            <div className="absolute top-8 left-8 right-1/4 p-8 bg-panelBg/95 backdrop-blur-md rounded-2xl border-2 border-accentBlue/30 shadow-2xl flex flex-col gap-8 z-20">
              <div className="flex items-center gap-3 text-accentBlue pb-4 border-b border-accentBlue/20">
                <Database size={24} />
                <h2 className="text-xl font-bold">Structured Context Artifacts</h2>
              </div>

              {/* Compartments */}
              <div style={{ opacity: compOpacity, transform: `translateY(${(1 - compOpacity) * 20}px)` }}>
                <div className="text-sm text-slate-400 mb-3 font-semibold tracking-wider">COMPARTMENTS</div>
                <div className="flex gap-4">
                  <div className="flex-1 bg-slate-800/80 border border-slate-700 p-4 rounded-xl flex items-start gap-3">
                    <FileText className="text-accentBlue mt-1" size={18} />
                    <div>
                      <div className="text-slate-200 font-medium">Recursion investigation</div>
                      <div className="text-slate-500 text-xs mt-1 font-mono">msg_0..msg_42 (compressed)</div>
                    </div>
                  </div>
                  <div className="flex-1 bg-slate-800/80 border border-slate-700 p-4 rounded-xl flex items-start gap-3">
                    <FileText className="text-accentBlue mt-1" size={18} />
                    <div>
                      <div className="text-slate-200 font-medium">Delegation guard analysis</div>
                      <div className="text-slate-500 text-xs mt-1 font-mono">msg_43..msg_89 (compressed)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Session Facts */}
              <div style={{ opacity: factOpacity, transform: `translateY(${(1 - factOpacity) * 20}px)` }}>
                <div className="text-sm text-slate-400 mb-3 font-semibold tracking-wider">SESSION FACTS</div>
                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2 bg-accentTeal/10 border border-accentTeal/30 rounded-full text-accentTeal text-sm font-medium">
                    athena-junior should not spawn itself
                  </div>
                  <div className="px-4 py-2 bg-accentTeal/10 border border-accentTeal/30 rounded-full text-accentTeal text-sm font-medium">
                    guard belongs in subagent-resolver.ts
                  </div>
                  <div className="px-4 py-2 bg-accentTeal/10 border border-accentTeal/30 rounded-full text-accentTeal text-sm font-medium">
                    plan-family recursion already blocked
                  </div>
                </div>
              </div>

              {/* Memory */}
              <div style={{ opacity: memOpacity, transform: `translateY(${(1 - memOpacity) * 20}px)` }}>
                <div className="text-sm text-slate-400 mb-3 font-semibold tracking-wider">MEMORY (CROSS-SESSION)</div>
                <div className="bg-accentIndigo/10 border-l-4 border-accentIndigo p-4 rounded-r-xl">
                  <div className="flex items-center gap-2 text-accentIndigo font-medium mb-1">
                    <CheckCircle2 size={16} />
                    Agent constraint: prevent self-recursion
                  </div>
                  <div className="text-slate-400 text-sm ml-6">
                    Delegation policy enforces category-based structure.
                  </div>
                </div>
              </div>

            </div>

          </TranscriptPane>
          <ContextInspector>
            {/* The usage meter shouldn't drop yet until scene 6 */}
            <UsageMeter percentage={91} color="#f87171" />
          </ContextInspector>
        </SessionShell>
      </div>

      <div 
        className="absolute bottom-12 text-2xl font-medium text-slate-300 bg-panelBg/80 backdrop-blur px-8 py-4 rounded-full border border-borderDark shadow-xl"
        style={{ opacity: interpolate(frame, [250, 270], [0, 1], { extrapolateLeft: "clamp" }) }}
      >
        Old session weight becomes structured context: compartments, facts, and memory.
      </div>
    </AbsoluteFill>
  );
};
