import React from "react";
import { C, LAYOUT } from "../constants";

type Props = {
  progress: number; // 0-1
  width?: number;
  height?: number;
  color?: string;
  trackColor?: string;
  glow?: boolean;
  label?: string;
};

export const ProgressBar: React.FC<Props> = ({
  progress: pct,
  width = 280,
  height = 8,
  color = C.mcCyan,
  trackColor = C.meterTrack,
  glow: showGlow = false,
  label,
}) => {
  const clampedPct = Math.max(0, Math.min(1, pct));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && (
        <div
          style={{
            fontFamily:
              "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: 12,
            color: C.textMuted,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
      )}
      <div
        style={{
          width,
          height,
          borderRadius: height / 2,
          background: trackColor,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${clampedPct * 100}%`,
            height: "100%",
            borderRadius: height / 2,
            background: color,
            boxShadow: showGlow ? `0 0 12px ${color}` : "none",
            transition: "none",
          }}
        />
      </div>
    </div>
  );
};
