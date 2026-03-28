import React from "react";
import { COLORS, FONT, FONT_SIZE, LAYOUT } from "../constants";

type Props = {
  title: string;
  lineCount?: number;
  opacity?: number;
  translateY?: number;
  /** Scale for merge animation */
  scale?: number;
  /** Merged/archive appearance */
  merged?: boolean;
};

/**
 * Compartment result card. Compact, structured, durable-looking.
 * Emerald/green accent.
 */
export const CompartmentCard: React.FC<Props> = ({
  title,
  lineCount,
  opacity = 1,
  translateY = 0,
  scale = 1,
  merged = false,
}) => {
  const accent = merged ? COLORS.cacheAccent : COLORS.compartmentAccent;
  const bg = merged ? COLORS.cacheBg : COLORS.compartmentBg;
  const border = merged ? COLORS.cacheBorder : COLORS.compartmentBorder;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 14px",
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: LAYOUT.borderRadiusSm,
        boxShadow: `0 0 12px ${accent}11`,
      }}
    >
      <div
        style={{
          width: 4,
          height: 20,
          borderRadius: 2,
          background: accent,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span
          style={{
            fontSize: FONT_SIZE.xs,
            fontWeight: 600,
            color: accent,
            fontFamily: FONT.sans,
          }}
        >
          {title}
        </span>
        {lineCount !== undefined && (
          <span
            style={{
              fontSize: 10,
              color: COLORS.textDim,
              fontFamily: FONT.mono,
            }}
          >
            {lineCount} lines
          </span>
        )}
      </div>
    </div>
  );
};
