import React from "react";
import { COLORS, FONT, FONT_SIZE, LAYOUT } from "../constants";

type ActionKind = "explore" | "edit" | "call";

type Props = {
  text: string;
  kind: ActionKind;
  opacity?: number;
  translateY?: number;
};

const ICONS: Record<ActionKind, string> = {
  explore: "⊕",
  edit: "✎",
  call: "→",
};

const ACCENT_COLORS: Record<ActionKind, string> = {
  explore: COLORS.actionExplore,
  edit: COLORS.actionEdit,
  call: COLORS.actionCall,
};

/**
 * Action/tool row (e.g., "Explored 1 read, 2 searches", "Edit file.ts").
 * Color-coded by action kind.
 */
export const ActionRow: React.FC<Props> = ({
  text,
  kind,
  opacity = 1,
  translateY = 0,
}) => {
  const accent = ACCENT_COLORS[kind];
  const icon = ICONS[kind];

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        display: "flex",
        alignItems: "center",
        gap: 8,
        height: LAYOUT.actionRowHeight,
        padding: "0 12px",
        borderRadius: LAYOUT.borderRadiusSm,
        background: COLORS.actionBg,
        border: `1px solid ${COLORS.actionBorder}`,
      }}
    >
      <span
        style={{
          fontSize: FONT_SIZE.xs,
          color: accent,
          fontFamily: FONT.mono,
          width: 16,
          textAlign: "center",
        }}
      >
        {icon}
      </span>
      <span
        style={{
          fontSize: FONT_SIZE.xs,
          color: accent,
          fontFamily: FONT.mono,
          fontWeight: 500,
        }}
      >
        {text}
      </span>
    </div>
  );
};
