import React from "react";
import { User, TerminalSquare } from "lucide-react";

export const UserBubble: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex gap-4 max-w-3xl">
      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
        <User size={16} className="text-slate-400" />
      </div>
      <div className="bg-slate-800 rounded-2xl rounded-tl-sm px-5 py-3 text-slate-200">
        {text}
      </div>
    </div>
  );
};

export const AssistantBlock: React.FC<{ text: React.ReactNode }> = ({ text }) => {
  return (
    <div className="flex gap-4 max-w-4xl">
      <div className="w-8 h-8 rounded flex items-center justify-center shrink-0">
        <TerminalSquare size={20} className="text-accentTeal" />
      </div>
      <div className="pt-1 text-slate-300 leading-relaxed">
        {text}
      </div>
    </div>
  );
};

export const ActionRow: React.FC<{ text: string; icon?: React.ReactNode }> = ({ text, icon }) => {
  return (
    <div className="flex gap-4 max-w-4xl items-center ml-12">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800/50 border border-slate-700/50 text-slate-400 text-sm">
        {icon}
        <span>{text}</span>
      </div>
    </div>
  );
};
