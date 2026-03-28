import React from "react";
import { COLORS, FONT, FONT_SIZE, LAYOUT } from "../constants";

type Props = {
  sessionName: string;
  status?: string;
  statusColor?: string;
  modelInfo?: string;
  opacity?: number;
};

/**
 * Top bar of the session showing session name, status dot, and model info.
 */
export const SessionHeader: React.FC<Props> = ({
  sessionName,
  status = "active",
  statusColor,
  modelInfo = "claude-opus-4",
  opacity = 1,
}) => {
  const dotColor =
    statusColor ||
    (status === "active"
      ? COLORS.successGreen
      : status === "blocked"
        ? COLORS.contextDanger
        : COLORS.textMuted);

  return (
    <div
      style={{
        opacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: LAYOUT.headerHeight,
        padding: "0 16px",
        background: COLORS.panelBg,
        borderRadius: `${LAYOUT.borderRadius}px ${LAYOUT.borderRadius}px 0 0`,
        borderBottom: `1px solid ${COLORS.panelBorder}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Status dot */}
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: dotColor,
            boxShadow: `0 0 6px ${dotColor}66`,
          }}
        />
        <span
          style={{
            fontSize: FONT_SIZE.md,
            fontWeight: 600,
            color: COLORS.textPrimary,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            fontFamily: FONT.mono,
          }}
        >
          {sessionName}
        </span>
      </div>
      <span
        style={{
          fontSize: FONT_SIZE.xs,
          color: COLORS.textMuted,
          fontFamily: FONT.mono,
        }}
      >
        {modelInfo}
      </span>
    </div>
  );
};
