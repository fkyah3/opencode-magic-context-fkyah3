import React from "react";
import { C, FONT, LAYOUT } from "../constants";
import { glow } from "../utils";

type Props = {
  text: string;
  opacity?: number;
  scale?: number;
  promoted?: boolean;
  pulseFrame?: number;
};

export const MemoryCard: React.FC<Props> = ({
  text,
  opacity = 1,
  scale = 1,
  promoted = false,
  pulseFrame = 0,
}) => {
  const glowIntensity = promoted
    ? 0.3 + Math.sin(pulseFrame * 0.06) * 0.15
    : 0;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "10px 16px",
        borderRadius: LAYOUT.chipRadius,
        background: C.memBg,
        border: `1px solid ${C.memBorder}`,
        boxShadow: promoted
          ? `0 0 16px rgba(96, 165, 250, ${glowIntensity})`
          : "none",
        fontFamily: FONT.mono,
        fontSize: 12,
        color: C.textPrimary,
        opacity,
        transform: `scale(${scale})`,
        letterSpacing: "-0.01em",
        lineHeight: 1.4,
        maxWidth: 340,
      }}
    >
      <span
        style={{
          color: C.memBlue,
          fontSize: 12,
          marginTop: 1,
          flexShrink: 0,
        }}
      >
        ◈
      </span>
      {text}
    </div>
  );
};
