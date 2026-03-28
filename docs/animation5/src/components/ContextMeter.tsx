import React from "react";
import { C, FONT, LAYOUT } from "../constants";
import { meterColor, glow } from "../utils";

type Props = {
  percentage: number; // 0-100
  showThreshold?: boolean;
  thresholdValue?: number;
  width?: number;
  height?: number;
  opacity?: number;
  label?: string;
  showWarningPulse?: boolean;
  pulseFrame?: number;
};

export const ContextMeter: React.FC<Props> = ({
  percentage,
  showThreshold = true,
  thresholdValue = 90,
  width = LAYOUT.meterWidth,
  height = LAYOUT.meterHeight,
  opacity = 1,
  label = "Context",
  showWarningPulse = false,
  pulseFrame = 0,
}) => {
  const pct = Math.max(0, Math.min(100, percentage));
  const color = meterColor(pct);
  const pulseOpacity = showWarningPulse
    ? 0.6 + Math.sin(pulseFrame * 0.15) * 0.4
    : 1;

  return (
    <div
      style={{
        width,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        opacity,
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 13,
            fontWeight: 600,
            color: C.textSecondary,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 18,
            fontWeight: 700,
            color,
            letterSpacing: "-0.02em",
          }}
        >
          {Math.round(pct)}%
        </div>
      </div>

      {/* Bar */}
      <div
        style={{
          width: "100%",
          height: 10,
          borderRadius: 5,
          background: C.meterTrack,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Fill */}
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            borderRadius: 5,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: showWarningPulse
              ? `0 0 12px ${color}`
              : "none",
            opacity: pulseOpacity,
          }}
        />

        {/* Threshold marker */}
        {showThreshold && (
          <div
            style={{
              position: "absolute",
              left: `${thresholdValue}%`,
              top: -2,
              bottom: -2,
              width: 2,
              background: C.textMuted,
              borderRadius: 1,
              opacity: 0.5,
            }}
          />
        )}
      </div>
    </div>
  );
};
