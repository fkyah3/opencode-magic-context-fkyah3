import React from "react";
import { COLORS, FONT, FONT_SIZE, LAYOUT } from "../constants";

type Props = {
  text: string;
  opacity?: number;
  translateY?: number;
  /** Optional dim/muted appearance for older blocks */
  dimmed?: boolean;
  /** Optional highlight border color */
  highlightColor?: string;
};

/**
 * Assistant reasoning/work-log block with left border accent.
 */
export const AssistantBlock: React.FC<Props> = ({
  text,
  opacity = 1,
  translateY = 0,
  dimmed = false,
  highlightColor,
}) => {
  return (
    <div
      style={{
        opacity: dimmed ? opacity * 0.6 : opacity,
        transform: `translateY(${translateY}px)`,
        display: "flex",
        flexDirection: "row",
        borderRadius: LAYOUT.borderRadiusSm,
        background: COLORS.assistantBg,
        border: `1px solid ${highlightColor || COLORS.assistantBorder}`,
        overflow: "hidden",
      }}
    >
      {/* Left accent border */}
      <div
        style={{
          width: 3,
          background: highlightColor || COLORS.textMuted,
          flexShrink: 0,
          opacity: 0.5,
        }}
      />
      <div
        style={{
          padding: "10px 14px",
          fontSize: FONT_SIZE.sm,
          color: dimmed ? COLORS.textMuted : COLORS.textSecondary,
          lineHeight: 1.55,
          fontFamily: FONT.sans,
        }}
      >
        {text}
      </div>
    </div>
  );
};
