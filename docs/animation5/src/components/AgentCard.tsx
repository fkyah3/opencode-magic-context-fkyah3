import React from "react";
import { C, FONT, LAYOUT } from "../constants";
import { glow, panelShadow } from "../utils";

type Props = {
  title: string;
  status: string;
  active?: boolean;
  variant?: "main" | "historian" | "dreamer" | "sidekick" | "old";
  opacity?: number;
  scale?: number;
  width?: number;
  height?: number;
  pulseFrame?: number; // for animated LED
  frozen?: boolean;
  compactingMode?: boolean;
};

export const AgentCard: React.FC<Props> = ({
  title,
  status,
  active = true,
  variant = "main",
  opacity = 1,
  scale = 1,
  width = LAYOUT.agentPanelWidth,
  height = LAYOUT.agentPanelHeight,
  pulseFrame = 0,
  frozen = false,
  compactingMode = false,
}) => {
  const accent = {
    main: C.mcCyan,
    historian: C.histViolet,
    dreamer: C.dreamMoon,
    sidekick: C.sideLight,
    old: C.oldAmber,
  }[variant];

  const borderColor = {
    main: C.mcBorder,
    historian: C.histBorder,
    dreamer: C.dreamBorder,
    sidekick: C.sideBorder,
    old: C.oldBorder,
  }[variant];

  const ledPulse = active ? 0.6 + Math.sin(pulseFrame * 0.12) * 0.4 : 0.3;
  const ledColor = frozen ? C.oldRed : compactingMode ? C.oldAmber : accent;

  return (
    <div
      style={{
        width,
        height,
        borderRadius: LAYOUT.panelRadius,
        background: C.bgPanel,
        border: `1px solid ${borderColor}`,
        boxShadow: panelShadow(0.4),
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        opacity,
        transform: `scale(${scale})`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Top row: LED + title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        {/* Status LED */}
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: ledColor,
            boxShadow: `0 0 8px ${ledColor}`,
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
          {title}
        </div>
      </div>

      {/* Status line */}
      <div
        style={{
          fontFamily: FONT.mono,
          fontSize: 14,
          color: frozen ? C.oldAmber : C.textSecondary,
          letterSpacing: "-0.01em",
          lineHeight: 1.5,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {status}
      </div>

      {/* Activity bar (subtle animated line) */}
      {active && !frozen && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            opacity: 0.4 + Math.sin(pulseFrame * 0.08) * 0.3,
          }}
        />
      )}

      {/* Frozen overlay */}
      {frozen && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0, 0, 0, 0.2)",
            borderRadius: LAYOUT.panelRadius,
          }}
        />
      )}
    </div>
  );
};
