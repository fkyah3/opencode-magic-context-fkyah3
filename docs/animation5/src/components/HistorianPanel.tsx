import React from "react";
import { C, FONT, LAYOUT } from "../constants";
import { glow, panelShadow } from "../utils";

type Props = {
  status: string;
  active?: boolean;
  opacity?: number;
  scale?: number;
  pulseFrame?: number;
  showConnector?: boolean;
  width?: number;
  height?: number;
};

export const HistorianPanel: React.FC<Props> = ({
  status,
  active = false,
  opacity = 1,
  scale = 1,
  pulseFrame = 0,
  showConnector = false,
  width = LAYOUT.historianPanelWidth,
  height = LAYOUT.historianPanelHeight,
}) => {
  const ledPulse = active ? 0.6 + Math.sin(pulseFrame * 0.1) * 0.4 : 0.2;
  const borderGlow = active ? C.histBorder : C.border;
  const scanWidth = active
    ? 30 + Math.sin(pulseFrame * 0.06) * 20
    : 0;

  return (
    <div
      style={{
        width,
        height,
        borderRadius: LAYOUT.panelRadius,
        background: active ? C.histBg : C.bgPanel,
        border: `1px solid ${borderGlow}`,
        boxShadow: active
          ? `${panelShadow(0.4)}, ${glow(C.histViolet, 16, 0)}`
          : panelShadow(0.3),
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        opacity,
        transform: `scale(${scale})`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Title row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: active ? C.histViolet : C.textMuted,
            boxShadow: active ? `0 0 8px ${C.histViolet}` : "none",
            opacity: ledPulse,
          }}
        />
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 18,
            fontWeight: 700,
            color: C.textPrimary,
            letterSpacing: "-0.02em",
          }}
        >
          Historian
        </div>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 12,
            color: C.textMuted,
            marginLeft: 4,
          }}
        >
          (background)
        </div>
      </div>

      {/* Status */}
      <div
        style={{
          fontFamily: FONT.mono,
          fontSize: 14,
          color: active ? C.histViolet : C.textMuted,
          letterSpacing: "-0.01em",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {status}
      </div>

      {/* Scan line when active */}
      {active && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${C.histViolet}, transparent)`,
            opacity: 0.5,
          }}
        />
      )}
    </div>
  );
};
