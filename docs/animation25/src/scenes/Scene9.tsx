import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { Moon, RefreshCw, Layers, Database } from "lucide-react";

export const Scene9: React.FC = () => {
  const frame = useCurrentFrame();

  // 0-60: Shift to dormant mode (darker, indigo)
  // 61-145: Dreamer tasks activate
  // 146-225: Effects (cleaner knowledge)
  // 226-270: Hold

  const bgOpacity = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: "clamp" });
  
  const showTask1 = frame > 60;
  const showTask2 = frame > 80;
  const showTask3 = frame > 100;
  
  const finishProgress = spring({ frame: frame - 150, fps: 30, config: { damping: 14 } });
  
  const duplicateOpacity = interpolate(finishProgress, [0, 1], [1, 0]);
  const combinedScale = interpolate(finishProgress, [0, 1], [0.95, 1]);

  return (
    <AbsoluteFill className="flex items-center justify-center bg-darkBg">
      {/* Night mode overlay */}
      <div 
        className="absolute inset-0 bg-accentIndigo/5 pointer-events-none transition-opacity duration-1000"
        style={{ opacity: bgOpacity }}
      />
      
      <div className="w-[1600px] h-[900px] flex flex-col relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center mt-16 mb-16" style={{ opacity: interpolate(frame, [20, 60], [0, 1]) }}>
          <div className="w-16 h-16 rounded-full bg-accentIndigo/20 flex items-center justify-center mb-6">
            <Moon className="text-accentIndigo" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-slate-100 tracking-wide mb-3">Dreamer</h1>
          <p className="text-xl text-accentIndigo/80 uppercase tracking-widest font-semibold">Off-Session Maintenance</p>
        </div>

        {/* Content */}
        <div className="flex flex-1 gap-12 px-24">
          
          {/* Active Maintenance Tasks */}
          <div className="flex-1 flex flex-col gap-6" style={{ opacity: interpolate(frame, [60, 90], [0, 1]) }}>
            <h3 className="text-sm font-bold text-slate-500 tracking-widest mb-2 border-b border-slate-800 pb-2">BACKGROUND JOBS</h3>
            
            {showTask1 && (
              <div className="flex items-center gap-4 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
                <RefreshCw className="text-accentIndigo animate-spin-slow" size={20} />
                <span className="text-slate-300 font-medium">Consolidating memory structures</span>
              </div>
            )}
            {showTask2 && (
              <div className="flex items-center gap-4 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
                <Layers className="text-accentIndigo" size={20} />
                <span className="text-slate-300 font-medium">Merging duplicate session facts</span>
              </div>
            )}
            {showTask3 && (
              <div className="flex items-center gap-4 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
                <Database className="text-accentIndigo" size={20} />
                <span className="text-slate-300 font-medium">Archiving stale historical compartments</span>
              </div>
            )}
          </div>

          {/* Visualization of Knowledge Base */}
          <div className="flex-[1.5] relative" style={{ opacity: interpolate(frame, [40, 80], [0, 1]) }}>
            <h3 className="text-sm font-bold text-slate-500 tracking-widest mb-6 border-b border-slate-800 pb-2">KNOWLEDGE LAYER</h3>
            
            <div className="absolute top-16 left-0 right-0 flex flex-col gap-4">
              
              <div style={{ opacity: duplicateOpacity }}>
                <div className="bg-slate-800/60 border border-slate-700 p-4 rounded-lg flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-slate-500" />
                   <span className="text-slate-300">Fact: UI uses Tailwind</span>
                </div>
              </div>
              
              <div style={{ opacity: duplicateOpacity, transform: `translateY(-10px)` }}>
                <div className="bg-slate-800/60 border border-slate-700 p-4 rounded-lg flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-slate-500" />
                   <span className="text-slate-300">Fact: We are using Tailwind CSS</span>
                </div>
              </div>

              {/* Combined Result */}
              <div 
                className="absolute top-0 left-0 right-0 bg-accentIndigo/10 border-2 border-accentIndigo/30 p-5 rounded-xl flex items-center gap-4 shadow-[0_0_30px_rgba(129,140,248,0.15)]"
                style={{ 
                  opacity: finishProgress,
                  transform: `scale(${combinedScale})`
                }}
              >
                <div className="w-3 h-3 rounded-full bg-accentIndigo shadow-[0_0_10px_rgba(129,140,248,0.8)]" />
                <span className="text-slate-200 font-medium text-lg">Architecture standard: Tailwind CSS</span>
                <span className="ml-auto text-xs font-mono text-accentIndigo bg-accentIndigo/20 px-2 py-1 rounded">Consolidated</span>
              </div>
              
            </div>
          </div>
        </div>

      </div>

      <div 
        className="absolute bottom-12 text-2xl font-medium text-slate-300 bg-panelBg/80 backdrop-blur px-8 py-4 rounded-full border border-borderDark shadow-xl"
        style={{ opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: "clamp" }) }}
      >
        Dreamer keeps the knowledge layer healthy between active sessions.
      </div>
    </AbsoluteFill>
  );
};
