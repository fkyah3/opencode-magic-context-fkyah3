import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { SessionShell } from "../components/session/SessionShell";
import { TranscriptPane } from "../components/session/TranscriptPane";
import { ContextInspector } from "../components/session/ContextInspector";
import { UsageMeter } from "../components/session/ContextStats";
import { Clock, Zap } from "lucide-react";

export const Scene8: React.FC = () => {
  const frame = useCurrentFrame();

  // 0-70: queue reductions (ghosted)
  // 71-150: explain cache TTL wait
  // 151-220: trigger & apply
  // 221-270: hold

  const queueOpacity = interpolate(frame, [10, 40], [0, 1], { extrapolateRight: "clamp" });
  
  const applyProgress = spring({ frame: frame - 160, fps: 30, config: { damping: 14 } });
  
  const ghostedOpacity = interpolate(applyProgress, [0, 1], [0.6, 0]);
  const ghostedScale = interpolate(applyProgress, [0, 1], [1, 0.9]);
  
  const activeColor = frame < 150 ? "#64748b" : "#2dd4bf"; // slate to teal
  
  return (
    <AbsoluteFill className="flex items-center justify-center bg-darkBg">
      <div style={{ transform: "scale(1)" }}>
        <SessionShell>
          <TranscriptPane>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-8 text-center max-w-md">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-500"
                style={{ backgroundColor: `${activeColor}20`, color: activeColor }}
              >
                {frame < 150 ? <Clock size={32} /> : <Zap size={32} />}
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-slate-100 mb-2">
                  {frame < 150 ? "Preserving Cache Efficiency" : "Cache TTL Expired"}
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  {frame < 150 
                    ? "Reductions are queued but deferred to avoid destroying the active context cache prefix."
                    : "Optimal point reached. Applying queued reductions to context payload."}
                </p>
              </div>
            </div>

          </TranscriptPane>

          <ContextInspector>
            <UsageMeter percentage={60} />
            
            <div className="mt-8 flex-1 flex flex-col gap-3 relative">
              <div className="text-sm font-medium text-slate-300 pb-2 border-b border-slate-700">Raw Messages Payload</div>
              
              {/* Active Messages */}
              <div className="flex flex-col gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-8 rounded bg-slate-800 border border-slate-700 flex items-center px-3 text-xs text-slate-400">
                    msg_active_0{i + 1}
                  </div>
                ))}
              </div>

              {/* Queued Reductions */}
              <div 
                className="flex flex-col gap-2 mt-4 transition-all"
                style={{ 
                  opacity: queueOpacity,
                }}
              >
                <div className="text-xs font-bold text-accentRed tracking-wider flex items-center gap-2">
                  <Clock size={12} /> QUEUED FOR REDUCTION
                </div>
                
                <div 
                  className="flex flex-col gap-2 transform-gpu"
                  style={{ opacity: ghostedOpacity, transform: `scale(${ghostedScale})`, transformOrigin: "top center" }}
                >
                  <div className="h-8 rounded bg-slate-800/30 border border-accentRed/30 border-dashed flex items-center px-3 text-xs text-slate-500">
                    msg_old_trace_1
                  </div>
                  <div className="h-8 rounded bg-slate-800/30 border border-accentRed/30 border-dashed flex items-center px-3 text-xs text-slate-500">
                    msg_stale_scratch
                  </div>
                  <div className="h-8 rounded bg-slate-800/30 border border-accentRed/30 border-dashed flex items-center px-3 text-xs text-slate-500">
                    msg_temp_diag
                  </div>
                </div>
              </div>
            </div>
          </ContextInspector>
        </SessionShell>
      </div>

      <div 
        className="absolute bottom-12 text-2xl font-medium text-slate-300 bg-panelBg/80 backdrop-blur px-8 py-4 rounded-full border border-borderDark shadow-xl"
        style={{ opacity: interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: "clamp" }) }}
      >
        Cache-aware reductions: queue first, apply when timing actually makes sense.
      </div>
    </AbsoluteFill>
  );
};
