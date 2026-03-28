import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { SessionShell } from "../components/session/SessionShell";
import { TranscriptPane } from "../components/session/TranscriptPane";
import { ContextInspector } from "../components/session/ContextInspector";
import { UserBubble } from "../components/session/TranscriptItems";
import { ContextStat, UsageMeter } from "../components/session/ContextStats";
import { CheckCircle2, Search, Cpu } from "lucide-react";

export const Scene10: React.FC = () => {
  const frame = useCurrentFrame();

  // 0-40: clean session + user prompt
  // 41-100: sidekick activates
  // 101-210: context injected

  const promptOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: "clamp" });
  const promptY = interpolate(frame, [10, 30], [20, 0], { extrapolateRight: "clamp" });

  const sidekickOpacity = interpolate(frame, [40, 60], [0, 1], { extrapolateRight: "clamp" });
  
  const injectProgress = spring({ frame: frame - 100, fps: 30, config: { damping: 14 } });
  
  const injectedOpacity = interpolate(injectProgress, [0, 1], [0, 1]);
  const injectedY = interpolate(injectProgress, [0, 1], [-20, 0]);

  return (
    <AbsoluteFill className="flex items-center justify-center bg-darkBg">
      <div style={{ transform: "scale(1)" }}>
        <SessionShell>
          <TranscriptPane>
            
            <div className="flex flex-col gap-6 relative">
              
              {/* User Prompt */}
              <div style={{ opacity: promptOpacity, transform: `translateY(${promptY}px)` }}>
                <UserBubble text="Continue the auth refactor and preserve the retry behavior." />
              </div>

              {/* Sidekick injection */}
              <div 
                className="mt-4 flex flex-col gap-4"
                style={{ 
                  opacity: injectedOpacity,
                  transform: `translateY(${injectedY}px)`
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-accentTeal/20 flex items-center justify-center">
                    <Cpu className="text-accentTeal" size={18} />
                  </div>
                  <span className="text-accentTeal font-medium tracking-wide text-sm">SIDEKICK RESTORED CONTEXT</span>
                </div>
                
                <div className="ml-11 bg-panelBg border border-slate-700 p-4 rounded-xl max-w-2xl text-sm shadow-xl">
                  <div className="text-slate-400 mb-3 font-semibold text-xs tracking-widest">FROM PREVIOUS SESSIONS</div>
                  <ul className="flex flex-col gap-2">
                    <li className="flex items-start gap-2 text-slate-200">
                      <CheckCircle2 size={16} className="text-accentBlue mt-0.5" />
                      <span><strong>Auth pattern:</strong> JWT with refresh token rotation.</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-200">
                      <CheckCircle2 size={16} className="text-accentBlue mt-0.5" />
                      <span><strong>Retry behavior:</strong> Max 3 attempts with exponential backoff.</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

          </TranscriptPane>
          <ContextInspector>
            <div className="flex flex-col gap-2 mb-4">
              <ContextStat label="Session" value="ATHENA_new" />
            </div>

            {/* Sidekick panel active */}
            <div 
              className="mt-8 p-5 rounded-xl border border-accentTeal/30 bg-accentTeal/10 flex flex-col gap-3 shadow-[0_0_20px_rgba(45,212,191,0.1)]"
              style={{ opacity: sidekickOpacity }}
            >
              <div className="flex items-center gap-3">
                <Search className="text-accentTeal animate-pulse" size={18} />
                <span className="text-accentTeal font-bold">Sidekick (Pre-flight)</span>
              </div>
              <div className="text-xs text-accentTeal/80 flex flex-col gap-1 font-mono">
                <span>Querying session memory...</span>
                <span>Searching historical facts...</span>
                {frame > 100 && <span className="text-slate-200 mt-2 border-t border-accentTeal/20 pt-2">Loaded 2 relevant context items.</span>}
              </div>
            </div>
            
            <div className="mt-8">
              <UsageMeter percentage={interpolate(injectProgress, [0, 1], [2, 12])} color="#2dd4bf" />
            </div>
          </ContextInspector>
        </SessionShell>
      </div>

      <div 
        className="absolute bottom-12 text-2xl font-medium text-slate-300 bg-panelBg/80 backdrop-blur px-8 py-4 rounded-full border border-borderDark shadow-xl"
        style={{ opacity: interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: "clamp" }) }}
      >
        Sidekick helps new sessions start with the right context already in place.
      </div>
    </AbsoluteFill>
  );
};
