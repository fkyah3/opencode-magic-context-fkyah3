import React from "react";
import { COLORS, FONT, FONT_SIZE, LAYOUT } from "../constants";

type Props = {
  status: string;
  active?: boolean;
  opacity?: number;
  translateY?: number;
  /** Additional detail lines */
  details?: string[];
};

/**
 * Floating Historian status panel.
 * Violet-accented, shows current historian operation.
 */
export const HistorianPanel: React.FC<Props> = ({
  status,
  active = false,
  opacity = 1,
  translateY = 0,
  details = [],
}) => {
  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: "12px 16px",
        background: COLORS.historianBg,
        border: `1px solid ${active ? COLORS.historianAccent : COLORS.historianBorder}`,
        borderRadius: LAYOUT.borderRadiusSm,
        boxShadow: active
          ? `0 0 24px ${COLORS.historianGlow}, inset 0 0 12px ${COLORS.historianGlow}`
          : undefined,
        minWidth: 220,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: active ? COLORS.historianLight : COLORS.textMuted,
            boxShadow: active
              ? `0 0 6px ${COLORS.historianLight}`
              : undefined,
          }}
        />
        <span
          style={{
            fontSize: FONT_SIZE.xs,
            fontWeight: 600,
            color: COLORS.historianLight,
            textTransform: "uppercase",
            letterSpacing: 1,
            fontFamily: FONT.mono,
          }}
        >
          Historian
        </span>
        <span
          style={{
            fontSize: 10,
            color: COLORS.textMuted,
            fontFamily: FONT.mono,
          }}
        >
          background
        </span>
      </div>
      {/* Status */}
      <div
        style={{
          fontSize: FONT_SIZE.xs,
          color: COLORS.textSecondary,
          fontFamily: FONT.sans,
          lineHeight: 1.4,
        }}
      >
        {status}
      </div>
      {/* Details */}
      {details.map((d, i) => (
        <div
          key={i}
          style={{
            fontSize: 10,
            color: COLORS.textDim,
            fontFamily: FONT.mono,
          }}
        >
          {d}
        </div>
      ))}
    </div>
  );
};
