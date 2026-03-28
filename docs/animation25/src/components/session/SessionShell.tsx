import React from "react";

export const SessionShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-[1600px] h-[900px] bg-panelBg rounded-2xl border border-borderDark shadow-2xl flex overflow-hidden text-slate-300">
      {children}
    </div>
  );
};
