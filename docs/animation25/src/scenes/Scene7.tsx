import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { SessionShell } from "../components/session/SessionShell";
import { TranscriptPane } from "../components/session/TranscriptPane";
import { ContextInspector } from "../components/session/ContextInspector";
import { UsageMeter } from "../components/session/ContextStats";
import { Archive, Layers } from "lucide-react";

export const Scene7: React.FC = () => {
  const frame = useCurrentFrame();

  // 0-80: History Budget glowing
  // 81-180: Cards merge
  // 181-270: Result

  const glowOpacity = interpolate(frame, [20, 40, 60, 80], [0, 1, 0.5, 1], { extrapolateRight: "clamp" });
  
  const mergeProgress = spring({ frame: frame - 80, fps: 30, config: { damping: 14 } });
  
  const card1Y = interpolate(mergeProgress, [0, 1], [0, 60]);
  const card3Y = interpolate(mergeProgress, [0, 1], [0, -60]);
  const cardsOpacity = interpolate(mergeProgress, [0, 1], [1, 0]);
  
  const archiveScale = interpolate(mergeProgress, [0, 1], [0.8, 1]);
  const archiveOpacity = interpolate(mergeProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill className="flex items-center justify-center bg-darkBg">
      <div style={{ transform: "scale(1)" }}>
        <SessionShell>
          <TranscriptPane>
            
            <div className="absolute top-8 left-8 right-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-slate-400 font-semibold tracking-wider text-sm flex items-center gap-2">
                  <Layers size={16} /> HISTORICAL COMPARTMENTS
                </h3>
                
                {/* History Budget Indicator */}
                <div 
                  className="px-3 py-1 bg-accentRed/10 border border-accentRed/30 text-accentRed rounded text-xs font-bold font-mono transition-opacity"
                  style={{ opacity: frame < 80 ? glowOpacity : interpolate(frame, [80, 100], [1, 0]) }}
                >
                  Budget nearing threshold
                </div>
              </div>

              <div className="relative h-64">
                {/* Pre-merge cards */}
                <div style={{ opacity: cardsOpacity }} className="absolute inset-0 flex flex-col gap-4">
                  <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center justify-between" style={{ transform: `translateY(${card1Y}px)` }}>
                    <span className="text-slate-200 font-medium">Recursion investigation</span>
                    <span className="text-slate-500 text-xs font-mono">1.2kb</span>
                  </div>
                  <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center justify-between relative z-10">
                    <span className="text-slate-200 font-medium">Delegation analysis</span>
                    <span className="text-slate-500 text-xs font-mono">2.1kb</span>
                  </div>
                  <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center justify-between" style={{ transform: `translateY(${card3Y}px)` }}>
                    <span className="text-slate-200 font-medium">Fix application & validation</span>
                    <span className="text-slate-500 text-xs font-mono">1.8kb</span>
                  </div>
                </div>

                {/* Post-merge Archive Card */}
                <div 
                  className="absolute inset-0 top-14"
                  style={{ 
                    opacity: archiveOpacity,
                    transform: `scale(${archiveScale})`
                  }}
                >
                  <div className="bg-accentBlue/10 border-2 border-accentBlue/30 p-6 rounded-2xl flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Archive className="text-accentBlue" size={20} />
                        <span className="text-accentBlue font-bold text-lg">Merged Archive</span>
                      </div>
                      <span className="bg-accentBlue/20 text-accentBlue px-2 py-1 rounded text-xs font-mono">1.4kb (Total)</span>
                    </div>
                    <p className="text-slate-400 text-sm">
                      Contains: Recursion investigation, Delegation analysis, Fix application & validation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </TranscriptPane>
          <ContextInspector>
            <UsageMeter percentage={56} />
            <div className="mt-8 flex-1 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
              <div className="text-slate-400 text-sm mb-4">Compartment Budget</div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accentTeal" 
                  style={{ width: `${interpolate(mergeProgress, [0, 1], [85, 35])}%` }} 
                />
              </div>
              <div className="mt-2 text-right text-xs text-slate-500 font-mono">
                {Math.floor(interpolate(mergeProgress, [0, 1], [5.1, 1.4]))}kb / 6.0kb
              </div>
            </div>
          </ContextInspector>
        </SessionShell>
      </div>

      <div 
        className="absolute bottom-12 text-2xl font-medium text-slate-300 bg-panelBg/80 backdrop-blur px-8 py-4 rounded-full border border-borderDark shadow-xl"
        style={{ opacity: interpolate(frame, [150, 170], [0, 1], { extrapolateLeft: "clamp" }) }}
      >
        As sessions grow, older compartments can be merged again to save even more space.
      </div>
    </AbsoluteFill>
  );
};
