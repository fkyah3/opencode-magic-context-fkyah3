import React from "react";
import { COLORS, FONT, FONT_SIZE, LAYOUT } from "../constants";

type Props = {
  children?: React.ReactNode;
  opacity?: number;
  active?: boolean;
  title?: string;
  subtitle?: string;
};

/**
 * Dreamer overlay panel. Indigo tones, calmer night-mode atmosphere.
 */
export const DreamerPanel: React.FC<Props> = ({
  children,
  opacity = 1,
  active = false,
  title = "Dreamer",
  subtitle = "Off-session maintenance",
}) => {
  return (
    <div
      style={{
        opacity,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: 20,
        background: COLORS.dreamerBg,
        border: `1px solid ${active ? COLORS.dreamerAccent : COLORS.dreamerBorder}`,
        borderRadius: LAYOUT.borderRadiusLg,
        boxShadow: active
          ? `0 0 32px ${COLORS.dreamerGlow}, inset 0 0 16px ${COLORS.dreamerGlow}`
          : undefined,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: FONT_SIZE.md, color: COLORS.dreamerAccent }}>
            ☾
          </span>
          <span
            style={{
              fontSize: FONT_SIZE.lg,
              fontWeight: 600,
              color: COLORS.textPrimary,
              fontFamily: FONT.sans,
            }}
          >
            {title}
          </span>
        </div>
        <span
          style={{
            fontSize: FONT_SIZE.xs,
            color: COLORS.textMuted,
            fontFamily: FONT.sans,
          }}
        >
          {subtitle}
        </span>
      </div>
      {children}
    </div>
  );
};
