import React from "react";
import { C, FONT, LAYOUT } from "../constants";
import type { RailMessageDef } from "../constants";

type Props = {
  message: RailMessageDef;
  highlighted?: boolean;
  extractY?: number; // vertical offset for extraction animation
  opacity?: number;
  scale?: number;
  glowColor?: string;
  width?: number;
  height?: number;
  ghosted?: boolean; // for queued reductions
};

const TYPE_COLORS: Record<string, string> = {
  tool: C.mcCyan,
  edit: C.mcGreen,
  test: C.success,
  search: C.mcBlue,
  note: C.textSecondary,
  decision: C.histViolet,
};

export const MessageCard: React.FC<Props> = ({
  message,
  highlighted = false,
  extractY = 0,
  opacity = 1,
  scale = 1,
  glowColor,
  width = LAYOUT.railCardWidth,
  height = LAYOUT.railCardHeight,
  ghosted = false,
}) => {
  const typeColor = TYPE_COLORS[message.type] || C.textSecondary;
  const borderColor = highlighted
    ? glowColor || C.histViolet
    : ghosted
      ? "rgba(245, 158, 11, 0.2)"
      : C.border;

  return (
    <div
      style={{
        width,
        height,
        minWidth: width,
        borderRadius: LAYOUT.chipRadius,
        background: ghosted
          ? "rgba(26, 34, 54, 0.5)"
          : highlighted
            ? C.histBg
            : C.bgCard,
        border: `1px solid ${borderColor}`,
        boxShadow: highlighted
          ? `0 0 12px ${glowColor || C.histViolet}40`
          : "none",
        padding: "8px 12px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 4,
        opacity: ghosted ? 0.4 : opacity,
        transform: `translateY(${extractY}px) scale(${scale})`,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* ID */}
      <div
        style={{
          fontFamily: FONT.mono,
          fontSize: 10,
          color: C.textMuted,
          letterSpacing: "0.02em",
        }}
      >
        {message.id}
      </div>

      {/* Text */}
      <div
        style={{
          fontFamily: FONT.mono,
          fontSize: 11,
          color: ghosted ? C.textMuted : C.textSecondary,
          lineHeight: 1.3,
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          textDecoration: ghosted ? "line-through" : "none",
        }}
      >
        {message.text}
      </div>

      {/* Type indicator */}
      <div
        style={{
          width: "100%",
          height: 2,
          borderRadius: 1,
          background: typeColor,
          opacity: ghosted ? 0.2 : 0.5,
        }}
      />
    </div>
  );
};
