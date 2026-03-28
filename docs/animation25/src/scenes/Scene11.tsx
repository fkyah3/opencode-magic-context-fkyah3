import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";

export const Scene11: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [20, 60], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [20, 60], [20, 0], { extrapolateRight: "clamp" });

  const subtitleOpacity = interpolate(frame, [60, 100], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center bg-darkBg text-center">
      
      {/* Subtle background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full bg-accentBlue/5 blur-[100px]" />
      </div>

      <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }} className="z-10">
        <h1 className="text-5xl font-bold text-slate-100 mb-6 tracking-tight">
          Keep the main agent in flow.
        </h1>
        <h1 className="text-5xl font-bold text-slate-100 mb-12 tracking-tight">
          Let Magic Context handle the past.
        </h1>
      </div>

      <div style={{ opacity: subtitleOpacity }} className="z-10 mt-12 flex flex-col items-center gap-4">
        <div className="text-xl text-accentTeal font-medium tracking-widest uppercase">
          OpenCode Magic Context
        </div>
        <div className="text-slate-400 text-lg">
          Async history compaction and memory for uninterrupted agents.
        </div>
      </div>

    </AbsoluteFill>
  );
};
