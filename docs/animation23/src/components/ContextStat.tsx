import React from "react";
import { COLORS, FONT, FONT_SIZE, LAYOUT } from "../constants";

type Props = {
  label: string;
  value: string | number;
  opacity?: number;
  /** Override value color for pressure states */
  valueColor?: string;
  /** Show a subtle pulse glow */
  pulse?: number;
  /** Mono font for the value */
  mono?: boolean;
};

/**
 * Single stat row in the context inspector: label left, value right.
 */
export const ContextStat: React.FC<Props> = ({
  label,
  value,
  opacity = 1,
  valueColor,
  pulse: pulseIntensity = 0,
  mono = true,
}) => {
  return (
    <div
      style={{
        opacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: LAYOUT.statRowHeight,
        padding: "0 16px",
        background:
          pulseIntensity > 0
            ? `rgba(239, 68, 68, ${pulseIntensity * 0.08})`
            : undefined,
      }}
    >
      <span
        style={{
          fontSize: FONT_SIZE.xs,
          color: COLORS.textMuted,
          fontFamily: FONT.sans,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: FONT_SIZE.xs,
          fontWeight: 600,
          color: valueColor || COLORS.textPrimary,
          fontFamily: mono ? FONT.mono : FONT.sans,
        }}
      >
        {value}
      </span>
    </div>
  );
};
