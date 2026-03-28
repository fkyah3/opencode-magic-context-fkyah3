import React from "react";
import { C, FONT, LAYOUT } from "../constants";

type Props = {
  text: string;
  opacity?: number;
  scale?: number;
  x?: number;
  y?: number;
};

export const FactChip: React.FC<Props> = ({
  text,
  opacity = 1,
  scale = 1,
  x = 0,
  y = 0,
}) => {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 14px",
        borderRadius: LAYOUT.chipRadius,
        background: C.factBg,
        border: `1px solid ${C.factBorder}`,
        fontFamily: FONT.mono,
        fontSize: 12,
        color: C.factCyan,
        opacity,
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
        whiteSpace: "nowrap",
        letterSpacing: "-0.01em",
      }}
    >
      <span style={{ color: C.mcCyan, fontSize: 10 }}>◆</span>
      {text}
    </div>
  );
};
