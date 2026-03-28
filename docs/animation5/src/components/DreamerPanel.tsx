import React from "react";
import { C, FONT, LAYOUT } from "../constants";
import { panelShadow, glow } from "../utils";

type TaskEntry = {
  text: string;
  icon: "merge" | "check" | "archive" | "edit";
  opacity?: number;
};

type Props = {
  tasks: TaskEntry[];
  activeIndex?: number;
  opacity?: number;
  pulseFrame?: number;
};

const ICONS: Record<string, string> = {
  merge: "⇄",
  check: "✓",
  archive: "◫",
  edit: "✎",
};

export const DreamerPanel: React.FC<Props> = ({
  tasks,
  activeIndex = -1,
  opacity = 1,
  pulseFrame = 0,
}) => {
  return (
    <div
      style={{
        width: 440,
        borderRadius: LAYOUT.panelRadius,
        background: C.bgPanel,
        border: `1px solid ${C.dreamBorder}`,
        boxShadow: `${panelShadow(0.4)}, ${glow(C.dreamIndigo, 12, 0)}`,
        padding: "24px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        opacity,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Title */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: C.dreamMoon,
            boxShadow: `0 0 8px ${C.dreamMoon}`,
            opacity: 0.6 + Math.sin(pulseFrame * 0.06) * 0.4,
          }}
        />
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 20,
            fontWeight: 700,
            color: C.textPrimary,
            letterSpacing: "-0.02em",
          }}
        >
          Dreamer
        </div>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 12,
            color: C.textMuted,
            marginLeft: 4,
          }}
        >
          off-session maintenance
        </div>
      </div>

      {/* Task list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {tasks.map((task, i) => {
          const isActive = i === activeIndex;
          const isDone = i < activeIndex;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 14px",
                borderRadius: LAYOUT.chipRadius,
                background: isActive
                  ? C.dreamGlow
                  : isDone
                    ? "rgba(99, 102, 241, 0.04)"
                    : "transparent",
                border: isActive
                  ? `1px solid ${C.dreamBorder}`
                  : "1px solid transparent",
                opacity: task.opacity ?? (isDone ? 0.5 : 1),
              }}
            >
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 14,
                  color: isDone ? C.success : isActive ? C.dreamMoon : C.textMuted,
                  width: 18,
                  textAlign: "center",
                }}
              >
                {isDone ? "✓" : ICONS[task.icon]}
              </span>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 14,
                  color: isActive ? C.textPrimary : C.textSecondary,
                  letterSpacing: "-0.01em",
                }}
              >
                {task.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          bottom: -40,
          left: "50%",
          width: 200,
          height: 80,
          borderRadius: "50%",
          background: C.dreamGlow,
          filter: "blur(40px)",
          transform: "translateX(-50%)",
          opacity: 0.6,
        }}
      />
    </div>
  );
};
