import React from "react";
import { COLORS, FONT, FONT_SIZE, LAYOUT } from "../constants";

type Props = {
  category: string;
  text: string;
  opacity?: number;
  translateY?: number;
  scale?: number;
};

/**
 * Memory entry card. Blue accent, more permanent/stable look.
 * Shows category label and memory text.
 */
export const MemoryCard: React.FC<Props> = ({
  category,
  text,
  opacity = 1,
  translateY = 0,
  scale = 1,
}) => {
  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: "10px 14px",
        background: COLORS.memoryBg,
        border: `1px solid ${COLORS.memoryBorder}`,
        borderRadius: LAYOUT.borderRadiusSm,
        boxShadow: `0 0 16px ${COLORS.memoryAccent}11`,
      }}
    >
      {/* Category badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: COLORS.memoryAccent,
          }}
        />
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: COLORS.memoryAccent,
            textTransform: "uppercase",
            letterSpacing: 0.8,
            fontFamily: FONT.mono,
          }}
        >
          {category}
        </span>
      </div>
      {/* Text */}
      <span
        style={{
          fontSize: FONT_SIZE.xs,
          color: COLORS.textSecondary,
          fontFamily: FONT.sans,
          lineHeight: 1.4,
        }}
      >
        {text}
      </span>
    </div>
  );
};
