import React from "react";

export const ContextInspector: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => {
  return (
    <div className="w-[400px] bg-panelBg flex flex-col relative" style={style}>
      <div className="h-16 border-b border-borderDark flex items-center px-6 font-semibold tracking-wide text-slate-100">
        Context
      </div>
      <div className="flex-1 p-6 flex flex-col gap-6 overflow-hidden relative">
        {children}
      </div>
    </div>
  );
};
