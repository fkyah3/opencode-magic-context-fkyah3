import React from "react";

export const TranscriptPane: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => {
  return (
    <div className="flex-1 border-r border-borderDark flex flex-col relative" style={style}>
      <div className="h-16 border-b border-borderDark flex items-center px-6 font-semibold tracking-wide text-slate-100">
        ATHENA
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 p-8 flex flex-col gap-6">
          {children}
        </div>
      </div>
      <div className="h-20 border-t border-borderDark flex items-center px-6">
        <div className="flex-1 h-12 bg-[#0f1115] rounded-lg border border-borderDark px-4 flex items-center text-slate-500">
          Ask OpenCode...
        </div>
      </div>
    </div>
  );
};
