import React from "react";
import { C, FONT, LAYOUT } from "../constants";

type Props = {
  title: string;
  tags?: string[];
  density?: number; // 0-1
  opacity?: number;
  scale?: number;
  merging?: boolean;
  compact?: boolean;
};

export const CompartmentCard: React.FC<Props> = ({
  title,
  tags = [],
  density = 0.5,
  opacity = 1,
  scale = 1,
  merging = false,
  compact = false,
}) => {
  const w = compact ? 160 : 200;
  const h = compact ? 80 : 110;

  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: LAYOUT.chipRadius,
        background: C.compBg,
        border: `1px solid ${C.compBorder}`,
        boxShadow: merging
          ? `0 0 16px rgba(52, 211, 153, 0.2)`
          : "none",
        padding: compact ? "8px 12px" : "12px 16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 6,
        opacity,
        transform: `scale(${scale})`,
        overflow: "hidden",
      }}
    >
      {/* Title */}
      <div
        style={{
          fontFamily: FONT.sans,
          fontSize: compact ? 11 : 13,
          fontWeight: 600,
          color: C.compGreen,
          letterSpacing: "-0.01em",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </div>

      {/* Tags */}
      {tags.length > 0 && !compact && (
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: FONT.mono,
                fontSize: 9,
                color: C.textMuted,
                padding: "2px 6px",
                borderRadius: 4,
                background: "rgba(52, 211, 153, 0.06)",
                border: "1px solid rgba(52, 211, 153, 0.1)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Density bar */}
      <div
        style={{
          width: "100%",
          height: 3,
          borderRadius: 2,
          background: "rgba(52, 211, 153, 0.1)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${density * 100}%`,
            height: "100%",
            borderRadius: 2,
            background: C.compGreen,
            opacity: 0.5,
          }}
        />
      </div>
    </div>
  );
};
