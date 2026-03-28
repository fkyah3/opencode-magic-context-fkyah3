import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const ContextStat: React.FC<{ label: string; value: string | number }> = ({ label, value }) => {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="text-slate-200 font-mono">{value}</span>
    </div>
  );
};

export const UsageMeter: React.FC<{ percentage: number; color?: string }> = ({ percentage, color = "#2dd4bf" }) => {
  const isDanger = percentage > 90;
  const barColor = isDanger ? "#f87171" : color;
  
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-end">
        <span className="text-slate-300 text-sm font-medium">Context Usage</span>
        <span className="text-2xl font-mono" style={{ color: barColor }}>{percentage.toFixed(0)}%</span>
      </div>
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${percentage}%`, backgroundColor: barColor }}
        />
      </div>
    </div>
  );
};

export const RawMessageList: React.FC<{ count: number; items?: number }> = ({ count, items = 10 }) => {
  return (
    <div className="flex flex-col gap-3 flex-1">
      <div className="flex justify-between items-center text-sm border-b border-borderDark pb-2">
        <span className="text-slate-300 font-medium">Raw Messages</span>
        <span className="text-slate-400 font-mono">{count}</span>
      </div>
      <div className="flex flex-col gap-2 overflow-hidden mask-bottom">
        {Array.from({ length: items }).map((_, i) => (
          <div key={i} className="h-8 rounded bg-slate-800/50 border border-slate-700/30 flex items-center px-3 text-xs text-slate-500 font-mono">
            msg_{Math.random().toString(36).substring(2, 8)}
          </div>
        ))}
      </div>
    </div>
  );
};
