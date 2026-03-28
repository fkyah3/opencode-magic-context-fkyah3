import React from "react";
import { COLORS, FONT, FONT_SIZE, LAYOUT } from "../constants";

type Props = {
  text: string;
  opacity?: number;
  translateY?: number;
  /** Scale for merge/archive animations */
  scale?: number;
  /** Dimmed for stale facts */
  stale?: boolean;
};

/**
 * Small chip for a session fact.
 * Cyan accent, pill-shaped.
 */
export const FactChip: React.FC<Props> = ({
  text,
  opacity = 1,
  translateY = 0,
  scale = 1,
  stale = false,
}) => {
  return (
    <div
      style={{
        opacity: stale ? opacity * 0.5 : opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 12px",
        background: COLORS.factBg,
        border: `1px solid ${COLORS.factBorder}`,
        borderRadius: 20,
        maxWidth: 300,
      }}
    >
      <div
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: COLORS.factAccent,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: FONT_SIZE.xs,
          color: stale ? COLORS.textDim : COLORS.textSecondary,
          fontFamily: FONT.sans,
          lineHeight: 1.3,
          textDecoration: stale ? "line-through" : undefined,
        }}
      >
        {text}
      </span>
    </div>
  );
};
