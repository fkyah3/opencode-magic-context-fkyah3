import React from "react";
import { COLORS, FONT_SIZE, LAYOUT } from "../constants";
import { getUsageColor } from "../helpers";

type Props = {
  percent: number;
  opacity?: number;
  /** Override bar color */
  barColor?: string;
  /** Show percentage label */
  showLabel?: boolean;
  /** Pulse intensity (0-1) for critical state */
  pulse?: number;
};

/**
 * Horizontal usage bar that fills left-to-right.
 * Color transitions safe→warning→danger based on percentage.
 */
export const ContextBreakdownBar: React.FC<Props> = ({
  percent,
  opacity = 1,
  barColor,
  showLabel = true,
  pulse: pulseIntensity = 0,
}) => {
  const color = barColor || getUsageColor(percent);
  const clampedPercent = Math.min(100, Math.max(0, percent));

  return (
    <div
      style={{
        opacity,
        padding: "6px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {showLabel && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: FONT_SIZE.xs,
              color: COLORS.textMuted,
            }}
          >
            Context Usage
          </span>
          <span
            style={{
              fontSize: FONT_SIZE.xs,
              fontWeight: 700,
              color,
            }}
          >
            {Math.round(clampedPercent)}%
          </span>
        </div>
      )}
      <div
        style={{
          height: 6,
          borderRadius: 3,
          background: COLORS.contextTrack,
          overflow: "hidden",
          boxShadow:
            pulseIntensity > 0
              ? `0 0 ${8 + pulseIntensity * 8}px ${color}${Math.round(pulseIntensity * 60).toString(16).padStart(2, "0")}`
              : undefined,
        }}
      >
        <div
          style={{
            width: `${clampedPercent}%`,
            height: "100%",
            borderRadius: 3,
            background: color,
            boxShadow: `0 0 8px ${color}44`,
          }}
        />
      </div>
    </div>
  );
};
